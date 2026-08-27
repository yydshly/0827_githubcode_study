from __future__ import annotations

import os
import sys
from pathlib import Path


# Windows removes a DLL directory when its handle is garbage-collected, so
# these handles must stay alive for the lifetime of the process.
_DLL_DIRECTORY_HANDLES: list[object] = []


def configure_nvidia_dll_search_path() -> list[Path]:
    """Register NVIDIA wheel DLL directories for the current process."""
    if os.name != "nt":
        return []

    nvidia_root = Path(sys.prefix) / "Lib" / "site-packages" / "nvidia"
    dll_directories = sorted(
        path for path in nvidia_root.glob("*/bin") if path.is_dir()
    )
    if not dll_directories:
        raise FileNotFoundError(f"No NVIDIA wheel DLL directories under {nvidia_root}")

    existing_path = os.environ.get("PATH", "")
    os.environ["PATH"] = os.pathsep.join(
        [*(str(path) for path in dll_directories), existing_path]
    )
    for path in dll_directories:
        _DLL_DIRECTORY_HANDLES.append(os.add_dll_directory(str(path)))
    return dll_directories
