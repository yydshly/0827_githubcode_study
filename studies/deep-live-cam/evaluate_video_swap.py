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
VIDEO_PATH = STUDY_ROOT / "test-output" / "swapped-synthetic-motion.mp4"


def cosine_similarity(left, right) -> float:
    import numpy as np

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

    import cv2
    import numpy as np
    import modules.globals

    modules.globals.execution_providers = [
        "CUDAExecutionProvider",
        "CPUExecutionProvider",
    ]
    modules.globals.frame_processors = ["face_swapper"]

    from modules.face_analyser import get_many_faces

    def one_embedding(image, label: str):
        faces = get_many_faces(image) or []
        if len(faces) != 1:
            raise RuntimeError(f"Expected one face in {label}, found {len(faces)}")
        return faces[0].normed_embedding

    source_image = cv2.imread(str(SOURCE_PATH))
    target_image = cv2.imread(str(TARGET_PATH))
    if source_image is None or target_image is None:
        raise FileNotFoundError("Synthetic source or target image is missing")
    source_embedding = one_embedding(source_image, "source")
    target_embedding = one_embedding(target_image, "target")

    capture = cv2.VideoCapture(str(VIDEO_PATH))
    if not capture.isOpened():
        raise RuntimeError(f"Cannot open {VIDEO_PATH}")
    frame_count = int(capture.get(cv2.CAP_PROP_FRAME_COUNT))
    fps = float(capture.get(cv2.CAP_PROP_FPS))
    sample_indices = sorted(
        {0, frame_count // 4, frame_count // 2, frame_count * 3 // 4, frame_count - 1}
    )

    source_scores: list[float] = []
    target_scores: list[float] = []
    for frame_index in sample_indices:
        capture.set(cv2.CAP_PROP_POS_FRAMES, frame_index)
        ok, frame = capture.read()
        if not ok:
            raise RuntimeError(f"Failed to decode frame {frame_index}")
        embedding = one_embedding(frame, f"frame {frame_index}")
        source_score = cosine_similarity(source_embedding, embedding)
        target_score = cosine_similarity(target_embedding, embedding)
        source_scores.append(source_score)
        target_scores.append(target_score)
        print(
            f"frame_{frame_index:03d}="
            f"source:{source_score:.6f},target:{target_score:.6f}"
        )
    capture.release()

    source_mean = float(np.mean(source_scores))
    source_min = float(np.min(source_scores))
    source_max = float(np.max(source_scores))
    target_mean = float(np.mean(target_scores))
    print(f"video_frame_count={frame_count}")
    print(f"video_fps={fps:.6f}")
    print(f"sample_count={len(sample_indices)}")
    print(f"source_similarity_mean={source_mean:.6f}")
    print(f"source_similarity_min={source_min:.6f}")
    print(f"source_similarity_max={source_max:.6f}")
    print(f"target_similarity_mean={target_mean:.6f}")
    print(f"identity_margin={source_mean - target_mean:.6f}")

    passed = (
        frame_count == 96
        and abs(fps - 24.0) < 0.01
        and source_min > 0.65
        and all(source > target for source, target in zip(source_scores, target_scores))
    )
    print(f"video_evaluation={'PASS' if passed else 'FAIL'}")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
