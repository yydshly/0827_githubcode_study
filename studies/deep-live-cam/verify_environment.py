from __future__ import annotations

import os
import sys
from pathlib import Path

from cuda_runtime import configure_nvidia_dll_search_path


STUDY_ROOT = Path(__file__).resolve().parent
UPSTREAM_ROOT = STUDY_ROOT / "upstream"
MODEL_PATH = UPSTREAM_ROOT / "models" / "inswapper_128_fp16.onnx"


def main() -> int:
    os.chdir(UPSTREAM_ROOT)
    sys.path.insert(0, str(UPSTREAM_ROOT))

    configure_nvidia_dll_search_path()

    import cv2
    import onnxruntime as ort

    # Load CUDA/cuDNN DLLs installed inside this E-drive virtual environment.
    ort.preload_dlls(directory="")

    print(f"python={sys.version.split()[0]}")
    print(f"opencv={cv2.__version__}")
    print(f"onnxruntime={ort.__version__}")
    print(f"available_providers={ort.get_available_providers()}")
    print(f"model={MODEL_PATH}")

    if not MODEL_PATH.is_file():
        raise FileNotFoundError(MODEL_PATH)

    swap_session = ort.InferenceSession(
        str(MODEL_PATH),
        providers=["CUDAExecutionProvider", "CPUExecutionProvider"],
    )
    print(f"swap_session_providers={swap_session.get_providers()}")

    import modules.globals

    modules.globals.execution_providers = [
        "CUDAExecutionProvider",
        "CPUExecutionProvider",
    ]

    from modules.face_analyser import get_face_analyser

    analyser = get_face_analyser()
    analyser_models = (
        analyser.models.values()
        if isinstance(analyser.models, dict)
        else analyser.models
    )
    analyser_providers = {
        model.taskname: model.session.get_providers()
        for model in analyser_models
        if getattr(model, "session", None) is not None
    }
    print(f"face_analyser_providers={analyser_providers}")

    from modules.processors.frame.face_swapper import get_face_swapper

    swapper = get_face_swapper()
    if swapper is None:
        raise RuntimeError("Project face swapper failed to load")
    print(f"project_swapper_providers={swapper.session.get_providers()}")

    if "CUDAExecutionProvider" not in swap_session.get_providers():
        raise RuntimeError("CUDA provider was not active for the swap model")

    print("verification=PASS")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
