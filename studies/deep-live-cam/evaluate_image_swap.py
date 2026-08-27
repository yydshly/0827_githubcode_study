from __future__ import annotations

import os
import sys
from pathlib import Path

from cuda_runtime import configure_nvidia_dll_search_path

STUDY_ROOT = Path(__file__).resolve().parent
UPSTREAM_ROOT = STUDY_ROOT / "upstream"
CACHE_ROOT = Path(os.environ.get("DLC_CACHE_ROOT", r"E:\AI_Cache"))
SOURCE_PATH = STUDY_ROOT / "test-assets" / "source-synthetic.png"
TARGET_PATH = STUDY_ROOT / "test-assets" / "target-synthetic.png"
OUTPUT_PATH = STUDY_ROOT / "test-output" / "swapped-synthetic.png"


def cosine_similarity(left: np.ndarray, right: np.ndarray) -> float:
    import numpy as np

    left = left.astype(np.float64, copy=False)
    right = right.astype(np.float64, copy=False)
    denominator = np.linalg.norm(left) * np.linalg.norm(right)
    if denominator == 0:
        raise ValueError("Cannot compare a zero-length face embedding")
    return float(np.dot(left, right) / denominator)


def main() -> int:
    cache_paths = {
        "HF_HOME": CACHE_ROOT / "huggingface",
        "TORCH_HOME": CACHE_ROOT / "torch",
        "KERAS_HOME": CACHE_ROOT / "keras",
        "PIP_CACHE_DIR": CACHE_ROOT / "pip",
        "TEMP": CACHE_ROOT / "tmp",
        "TMP": CACHE_ROOT / "tmp",
        "USERPROFILE": CACHE_ROOT / "deep-live-cam-home",
    }
    for name, path in cache_paths.items():
        path.mkdir(parents=True, exist_ok=True)
        os.environ[name] = str(path)

    os.chdir(UPSTREAM_ROOT)
    sys.path.insert(0, str(UPSTREAM_ROOT))

    configure_nvidia_dll_search_path()

    import onnxruntime as ort

    ort.preload_dlls(directory="")

    # Match launch_gpu.py: preload CUDA/cuDNN before importing OpenCV or any
    # upstream module that may create an ONNX Runtime session.
    import cv2
    import numpy as np

    import modules.globals

    modules.globals.execution_providers = [
        "CUDAExecutionProvider",
        "CPUExecutionProvider",
    ]
    modules.globals.frame_processors = ["face_swapper"]

    from modules.face_analyser import get_many_faces

    paths = {
        "source": SOURCE_PATH,
        "target": TARGET_PATH,
        "output": OUTPUT_PATH,
    }
    images: dict[str, np.ndarray] = {}
    embeddings: dict[str, np.ndarray] = {}

    for label, path in paths.items():
        image = cv2.imread(str(path))
        if image is None:
            raise FileNotFoundError(path)
        faces = get_many_faces(image) or []
        print(f"{label}_path={path}")
        print(f"{label}_size={image.shape[1]}x{image.shape[0]}")
        print(f"{label}_face_count={len(faces)}")
        if len(faces) != 1:
            raise RuntimeError(f"Expected one face in {label}, found {len(faces)}")
        images[label] = image
        embeddings[label] = faces[0].normed_embedding

    if images["target"].shape != images["output"].shape:
        raise RuntimeError("Target and output dimensions differ")

    source_target = cosine_similarity(embeddings["source"], embeddings["target"])
    source_output = cosine_similarity(embeddings["source"], embeddings["output"])
    target_output = cosine_similarity(embeddings["target"], embeddings["output"])
    pixel_mae = float(
        np.mean(
            np.abs(
                images["output"].astype(np.float32)
                - images["target"].astype(np.float32)
            )
        )
    )
    changed_pixel_ratio = float(
        np.mean(np.any(images["output"] != images["target"], axis=2))
    )

    print(f"cosine_source_target={source_target:.6f}")
    print(f"cosine_source_output={source_output:.6f}")
    print(f"cosine_target_output={target_output:.6f}")
    print(f"source_similarity_gain={source_output - source_target:.6f}")
    print(f"pixel_mae_0_255={pixel_mae:.6f}")
    print(f"changed_pixel_ratio={changed_pixel_ratio:.6f}")

    passed = (
        source_output > source_target
        and source_output > target_output
        and pixel_mae > 0
        and changed_pixel_ratio > 0
    )
    print(f"evaluation={'PASS' if passed else 'FAIL'}")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
