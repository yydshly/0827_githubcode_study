from __future__ import annotations

import os
import runpy
import sys
from pathlib import Path

from cuda_runtime import configure_nvidia_dll_search_path


STUDY_ROOT = Path(__file__).resolve().parent
UPSTREAM_ROOT = STUDY_ROOT / "upstream"
CACHE_ROOT = Path(os.environ.get("DLC_CACHE_ROOT", r"E:\AI_Cache"))


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
    sys.argv[0] = str(UPSTREAM_ROOT / "run.py")
    if "--execution-provider" not in sys.argv:
        sys.argv.extend(["--execution-provider", "cuda"])
    runpy.run_path(str(UPSTREAM_ROOT / "run.py"), run_name="__main__")


if __name__ == "__main__":
    main()
