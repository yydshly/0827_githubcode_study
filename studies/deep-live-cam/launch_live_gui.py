from __future__ import annotations

import os
import runpy
import sys
from pathlib import Path

from cuda_runtime import configure_nvidia_dll_search_path


STUDY_ROOT = Path(__file__).resolve().parent
UPSTREAM_ROOT = STUDY_ROOT / "upstream"
CACHE_ROOT = Path(os.environ.get("DLC_CACHE_ROOT", r"E:\AI_Cache"))
SOURCE_PATH = STUDY_ROOT / "test-assets" / "source-synthetic.png"
REAL_USERPROFILE = Path(os.environ.get("USERPROFILE", r"C:\Users\yun68"))


def main() -> None:
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

    configure_nvidia_dll_search_path()

    import onnxruntime as ort

    ort.preload_dlls(directory="")

    os.chdir(UPSTREAM_ROOT)
    sys.path.insert(0, str(UPSTREAM_ROOT))

    import modules.globals

    # Load InsightFace while USERPROFILE still points at the E-drive model
    # cache. Restore the real Windows profile before QApplication is created,
    # otherwise QFileDialog incorrectly looks for E:\...\Desktop.
    modules.globals.execution_providers = [
        "CUDAExecutionProvider",
        "CPUExecutionProvider",
    ]
    from modules.face_analyser import get_face_analyser
    from modules.processors.frame.face_swapper import get_face_swapper

    get_face_analyser()
    get_face_swapper()
    os.environ["USERPROFILE"] = str(REAL_USERPROFILE)

    from PySide6.QtCore import QTimer
    import modules.ui

    original_init = modules.ui.init

    def init_with_live_source(start, destroy, lang):
        window = original_init(start, destroy, lang)
        modules.globals.source_path = str(SOURCE_PATH)
        main_window = window._main
        main_window.source_label.setPixmap(
            modules.ui.render_image_preview(str(SOURCE_PATH), (200, 200))
        )
        main_window.source_label.setText("")
        QTimer.singleShot(1500, main_window._on_live)
        return window

    modules.ui.init = init_with_live_source
    sys.argv = [str(UPSTREAM_ROOT / "run.py"), "--execution-provider", "cuda"]
    runpy.run_path(str(UPSTREAM_ROOT / "run.py"), run_name="__main__")


if __name__ == "__main__":
    main()
