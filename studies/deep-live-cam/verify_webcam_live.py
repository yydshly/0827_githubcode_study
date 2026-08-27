from __future__ import annotations

import os
import queue
import sys
import threading
import time
from pathlib import Path

from cuda_runtime import configure_nvidia_dll_search_path


STUDY_ROOT = Path(__file__).resolve().parent
UPSTREAM_ROOT = STUDY_ROOT / "upstream"
CACHE_ROOT = Path(os.environ.get("DLC_CACHE_ROOT", r"E:\AI_Cache"))
SOURCE_PATH = STUDY_ROOT / "test-assets" / "source-synthetic.png"
BENCHMARK_SECONDS = 10.0


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
    modules.globals.source_path = str(SOURCE_PATH)
    modules.globals.target_path = None
    modules.globals.many_faces = False
    modules.globals.map_faces = False
    modules.globals.mouth_mask = False
    modules.globals.poisson_blend = False
    modules.globals.color_correction = False
    modules.globals.opacity = 1.0
    modules.globals.sharpness = 0.0

    from modules.face_analyser import (
        detect_one_face_fast,
        get_face_analyser,
        get_one_face,
    )
    from modules.processors.frame import face_swapper
    from modules.video_capture import VideoCapturer

    source_image = cv2.imread(str(SOURCE_PATH))
    if source_image is None:
        raise FileNotFoundError(SOURCE_PATH)
    get_face_analyser()
    source_face = get_one_face(source_image)
    if source_face is None:
        raise RuntimeError("No face detected in the synthetic source image")
    swapper_model = face_swapper.get_face_swapper()
    if swapper_model is None:
        raise RuntimeError("Face swapper model failed to load")

    capture = VideoCapturer(0)
    frame_queue: queue.Queue = queue.Queue(maxsize=1)
    stop_event = threading.Event()
    capture_stats = {"frames": 0, "failures": 0, "drops": 0}

    def capture_loop() -> None:
        while not stop_event.is_set():
            ok, frame = capture.read()
            if not ok or frame is None:
                capture_stats["failures"] += 1
                stop_event.set()
                break
            capture_stats["frames"] += 1
            try:
                frame_queue.put_nowait(frame)
            except queue.Full:
                capture_stats["drops"] += 1
                try:
                    frame_queue.get_nowait()
                except queue.Empty:
                    pass
                try:
                    frame_queue.put_nowait(frame)
                except queue.Full:
                    capture_stats["drops"] += 1

    started = capture.start(width=960, height=540, fps=60)
    if not started:
        print("webcam_benchmark=FAIL")
        print("reason=camera_open_failed")
        return 1

    worker = threading.Thread(target=capture_loop, name="webcam-capture", daemon=True)
    processed_frames = 0
    swapped_frames = 0
    detection_attempts = 0
    detection_successes = 0
    processing_latencies: list[float] = []
    changed_pixel_maes: list[float] = []
    cached_target_face = None
    detection_counter = 0
    detection_interval = max(1, round(capture.actual_fps * 0.08))
    benchmark_start = time.perf_counter()
    worker.start()

    try:
        while time.perf_counter() - benchmark_start < BENCHMARK_SECONDS:
            try:
                frame = frame_queue.get(timeout=0.25)
            except queue.Empty:
                if stop_event.is_set():
                    break
                continue

            frame_start = time.perf_counter()
            detection_counter += 1
            if detection_counter % detection_interval == 0:
                detection_attempts += 1
                cached_target_face = detect_one_face_fast(frame)
                if cached_target_face is not None:
                    detection_successes += 1

            if cached_target_face is not None:
                original = frame.copy()
                result = face_swapper.swap_face(source_face, cached_target_face, frame)
                bbox = cached_target_face.bbox.astype(int)
                result = face_swapper.apply_post_processing(result, [bbox])
                pixel_mae = float(
                    np.mean(
                        np.abs(
                            result.astype(np.float32) - original.astype(np.float32)
                        )
                    )
                )
                changed_pixel_maes.append(pixel_mae)
                if pixel_mae > 0.05:
                    swapped_frames += 1

            processed_frames += 1
            processing_latencies.append(time.perf_counter() - frame_start)
    finally:
        stop_event.set()
        worker.join(timeout=2.0)
        capture.release()

    elapsed = time.perf_counter() - benchmark_start
    latency_ms = np.asarray(processing_latencies, dtype=np.float64) * 1000.0
    mean_latency = float(np.mean(latency_ms)) if latency_ms.size else 0.0
    p95_latency = float(np.percentile(latency_ms, 95)) if latency_ms.size else 0.0
    mean_pixel_mae = float(np.mean(changed_pixel_maes)) if changed_pixel_maes else 0.0
    camera_released = not capture.is_running and capture.cap is None
    model_providers = swapper_model.session.get_providers()

    print(f"camera_resolution={capture.actual_width}x{capture.actual_height}")
    print(f"camera_measured_fps={capture.actual_fps:.6f}")
    print(f"detection_interval_frames={detection_interval}")
    print(f"benchmark_seconds={elapsed:.6f}")
    print(f"captured_frames={capture_stats['frames']}")
    print(f"processed_frames={processed_frames}")
    print(f"queue_dropped_frames={capture_stats['drops']}")
    print(f"capture_failures={capture_stats['failures']}")
    print(f"capture_fps={capture_stats['frames'] / elapsed:.6f}")
    print(f"processing_fps={processed_frames / elapsed:.6f}")
    print(f"detection_attempts={detection_attempts}")
    print(f"detection_successes={detection_successes}")
    print(f"swapped_frames={swapped_frames}")
    print(f"mean_processing_latency_ms={mean_latency:.6f}")
    print(f"p95_processing_latency_ms={p95_latency:.6f}")
    print(f"mean_changed_pixel_mae_0_255={mean_pixel_mae:.6f}")
    print(f"swapper_providers={model_providers}")
    print(f"camera_released={camera_released}")
    print("frames_written_to_disk=0")

    passed = (
        processed_frames > 0
        and detection_attempts > 0
        and detection_successes > 0
        and swapped_frames > 0
        and "CUDAExecutionProvider" in model_providers
        and camera_released
    )
    print(f"webcam_benchmark={'PASS' if passed else 'FAIL'}")
    return 0 if passed else 1


if __name__ == "__main__":
    raise SystemExit(main())
