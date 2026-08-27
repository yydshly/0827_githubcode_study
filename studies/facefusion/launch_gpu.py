from __future__ import annotations

import os
import sys
from pathlib import Path


STUDY_DIR = Path(__file__).resolve().parent
UPSTREAM_DIR = STUDY_DIR / "upstream"
CACHE_ROOT = Path("E:/AI_Cache")


def configure_environment() -> None:
	cache_paths = {
		"PIP_CACHE_DIR": CACHE_ROOT / "pip",
		"HF_HOME": CACHE_ROOT / "huggingface",
		"GRADIO_TEMP_DIR": CACHE_ROOT / "gradio",
		"TEMP": CACHE_ROOT / "tmp",
		"TMP": CACHE_ROOT / "tmp",
	}
	for name, path in cache_paths.items():
		path.mkdir(parents=True, exist_ok=True)
		os.environ[name] = str(path)

	os.environ["OMP_NUM_THREADS"] = "1"
	os.environ.setdefault("CUDA_MODULE_LOADING", "LAZY")


def main() -> None:
	configure_environment()
	sys.path.insert(0, str(UPSTREAM_DIR))
	os.chdir(UPSTREAM_DIR)

	from cuda_runtime import prepare_cuda_runtime

	prepare_cuda_runtime(STUDY_DIR)

	from facefusion import conda, core

	conda.setup()
	core.cli()


if __name__ == "__main__":
	main()
