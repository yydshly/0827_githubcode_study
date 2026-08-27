from __future__ import annotations

import os
from pathlib import Path
from typing import Any


_DLL_HANDLES: list[Any] = []


def prepare_cuda_runtime(study_dir: Path) -> None:
	"""Expose the pip-provided CUDA and cuDNN DLLs to ONNX Runtime."""
	if os.name != "nt":
		return

	site_packages = study_dir / ".venv" / "Lib" / "site-packages"
	nvidia_root = site_packages / "nvidia"
	dll_directories = sorted(path for path in nvidia_root.glob("*/bin") if path.is_dir())

	if not dll_directories:
		raise RuntimeError(f"NVIDIA DLL directories were not found below {nvidia_root}")

	path_entries = [str(path) for path in dll_directories]
	os.environ["PATH"] = os.pathsep.join(path_entries + [os.environ.get("PATH", "")])

	for dll_directory in dll_directories:
		_DLL_HANDLES.append(os.add_dll_directory(str(dll_directory)))

	import onnxruntime

	# Empty directory tells ONNX Runtime to discover CUDA/cuDNN from the
	# NVIDIA Python packages instead of expecting a system-wide toolkit.
	onnxruntime.preload_dlls(cuda=True, cudnn=True, msvc=True, directory="")
