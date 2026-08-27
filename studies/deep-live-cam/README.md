# Deep-Live-Cam 运行验证

上游仓库：[hacksider/Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam)

- 固定提交：`7ca6d0b2023ca78afecd267523dd6763fb64b2b4`
- 验证日期：2026-08-27
- 当前状态：`archived-verified-quality-rejected`
- 验证设备：Windows、RTX 4070 Laptop 8GB、NVIDIA 驱动 576.28

综合Web归档：<https://yydshly.github.io/0827_githubcode_study/live-avatar-research/>

## 已完成验证

- Python 3.12 隔离环境创建成功，全部仓库依赖安装成功。
- 上游 5 项单元测试全部通过。
- `inswapper_128_fp16.onnx` 换脸模型加载成功。
- InsightFace `buffalo_l` 检测、识别和关键点模型加载成功。
- 换脸、检测、识别模型均实际启用了 `CUDAExecutionProvider`，未回退到纯 CPU。
- 使用两张完全虚构的成人合成人像完成了 1254×1254 图片换脸，首次处理 5.24 秒，修复后复跑 5.00 秒。
- 来源、目标和结果均检测到且只检测到 1 张脸；InsightFace 特征评估结果为 `PASS`。
- 相同输入连续两次得到相同 SHA-256，当前图片处理链路可以确定性复现。
- 使用虚构目标图生成的 4 秒运动视频完成 96 帧 CUDA 换脸，帧率、时长和静音音轨均成功保留。
- 视频首、中、尾等 5 个时间点均检测到 1 张脸，身份一致性评估为 `PASS`。
- 使用 `USB2.0 HD UVC WebCam` 完成 10 秒不落盘实时换脸基准，CUDA、检测、换脸和摄像头释放全部通过。

## 最终采用结论

2026-08-27 完成可视化实时预览后，用户肉眼验收结论为：**视觉质量很差，不通过采用门槛**。

这意味着“模型能运行、CUDA 能加速、图片/视频/摄像头链路能完成”不等于“输出可用”。当前 `inswapper_128_fp16` 的低分辨率身份生成、脸部局部贴合方式，以及实时模式下的低输入分辨率与脸框复用，共同造成身份不像、眼嘴不自然、边缘融合差、模糊和动态不稳定等问题。

当前建议：

- **不采用**该仓库的默认模型作为高质量直播、数字人或商业视频方案。
- **停止**继续围绕颜色校正、锐化、遮罩等参数做小修小补；这些不能突破 128px 模型上限。
- 可以保留其摄像头线程、FFmpeg 内存管线、ONNX Runtime CUDA 启动和模型缓存隔离方式作为工程参考。
- 只有在替换为更高分辨率、身份保持更强、具备时序一致性的换脸模型后，才值得重新进入视觉验收。
- PySide6 GUI 在隐藏冒烟测试中稳定运行 10 秒。
- Git、FFmpeg 6.1.3 和 Visual C++ 运行库均可用。

图片、合成单人视频和本机实时摄像头技术链路已经验证。摄像头测试经过用户明确授权，只在内存中处理，没有显示、录制、保存或上传画面。真人授权视频、可视化 GUI 主观质量、遮挡、极端角度和多人场景仍未验证。后续测试应只使用获得授权的素材或明确的合成人物，并在对外内容中标注为 AI/Deepfake。

## 合成图片端到端结果

- [来源人脸](test-assets/source-synthetic.png)：虚构成年女性，正面中性光。
- [目标图片](test-assets/target-synthetic.png)：虚构成年男性，轻微侧转与胡茬。
- [换脸结果](test-output/swapped-synthetic.png)：保留目标发型、姿态、背景和外轮廓，将脸部身份特征迁移为来源人物。
- [素材生成说明与完整提示词](test-assets/README.md)。

量化结果：

| 指标 | 数值 | 解释 |
|---|---:|---|
| 来源 ↔ 原目标余弦相似度 | 0.157767 | 两个合成身份原本差异明显 |
| 来源 ↔ 换脸结果余弦相似度 | 0.838835 | 结果身份明显接近来源 |
| 原目标 ↔ 换脸结果余弦相似度 | 0.172174 | 结果不再保持原目标身份 |
| 来源相似度增量 | +0.681068 | 身份迁移成立 |
| 变化像素比例 | 45.6415% | 输出不是原图复制 |

目视结论：基础 `inswapper_128_fp16` 已能清楚完成身份迁移，但 128px 换脸模型在眼周、嘴角、肤色与胡茬交界处仍有可见融合瑕疵。这足以证明能力和本机兼容性，不足以直接认定为商业成片质量。

## 合成视频端到端结果

- [目标测试视频](test-assets/target-synthetic-motion.mp4)：由虚构男性目标图在本机生成，640×640、24fps、4 秒、96 帧，包含静音 AAC 音轨。
- [视频换脸结果](test-output/swapped-synthetic-motion.mp4)：H.264、640×640、24fps、96 帧、4.01 秒，AAC 音轨正常保留，完整解码无错误。
- 运行路径：CUDA 内存视频管线，没有回退到逐帧落盘模式。

性能结果分三个口径：

| 口径 | 结果 | 含义 |
|---|---:|---|
| 纯逐帧处理进度 | 20.39fps | 低于输入 24fps，尚不能证明 24/30fps 实时能力 |
| 内存处理 + H.264 编码 | 7.70 秒 | 处理一段 4 秒视频 |
| Core 总处理 + 恢复音轨 | 9.09 秒 | 不含 Python/模型启动 |
| 完整命令墙钟时间 | 16.57 秒 | 包含 Python、模型加载、处理和输出 |

5 个抽样帧的来源身份相似度为 0.839778–0.848514，平均 0.843321；与原目标身份平均相似度为 0.175808，身份边际为 +0.667513。抽样期间没有掉脸或身份漂移，`video_evaluation=PASS`。

## 实时摄像头技术结果

2026-08-27 使用虚构女性来源脸和本机摄像头 0 进行 10 秒基准。脚本复用了上游 GUI 的关键实时策略：独立摄像头线程、单帧有界队列、约每 80ms 快速检测一次、其余帧复用目标脸框，并调用同一个 `swap_face` 与后处理函数。

| 指标 | 结果 |
|---|---:|
| 摄像头协商规格 | 640×480，启动测量 30.20fps |
| 基准持续时间 | 10.32 秒 |
| 并发取帧速度 | 20.15fps |
| 换脸处理速度 | 18.11fps |
| 平均处理延迟 | 39.12ms |
| P95 处理延迟 | 51.95ms |
| 人脸检测 | 93/93 成功 |
| 完成换脸的处理帧 | 186/187 |
| 队列丢弃旧帧 | 20 帧 |
| 摄像头读取失败 | 0 |
| 摄像头释放 | 成功 |
| 摄像头帧写盘 | 0 |

技术结论：当前 RTX 4070 Laptop 能支持本地实时换脸预览，但实际处理约 18fps，尚达不到摄像头原生约 30fps。后续可视化 GUI 已完成肉眼评审，视觉质量被判定为不通过。因此性能优化不再是首要矛盾；在替换核心换脸模型之前，不建议继续投入实时路径调优。

## 本机兼容性结论

上游最新 `requirements.txt` 使用 `onnxruntime-gpu==1.26.0`。该版本需要 CUDA 12.x 和 cuDNN 9.x；仓库 README 中 cuDNN 8.9.7 的说明已与当前依赖不一致。

本机只有支持 CUDA 12.9 的 NVIDIA 驱动，没有系统级 CUDA Toolkit。验证环境采用 ONNX Runtime 官方支持的应用内方案：

```powershell
python -m pip install "onnxruntime-gpu[cuda,cudnn]==1.26.0"
```

CUDA/cuDNN DLL 位于 E 盘虚拟环境，并由 `onnxruntime.preload_dlls(directory="")` 预加载；不需要安装系统级 `nvcc`，也没有修改全局 PATH。

Windows 下 cuDNN 9 的主库还会动态加载同目录子库。项目通过 `cuda_runtime.py` 将虚拟环境中的 `nvidia\*\bin` 显式注册到当前进程，避免重复运行时出现 `cudnn_engines_tensor_ir64_9.dll` 找不到的问题；该设置只影响启动的 Python 进程，不修改系统环境变量。

## 目录布局

```text
studies/deep-live-cam/
├── .venv/                 # E 盘 Python 环境，不提交
├── upstream/              # 固定提交的上游源码，不提交
├── cuda_runtime.py        # 当前进程的 NVIDIA DLL 搜索路径配置
├── launch_gpu.py          # GPU 启动器，负责 E 盘缓存和 DLL 预加载
├── launch_live_gui.py     # 预载合成来源脸并自动开启摄像头预览
├── run-gpu.ps1            # Windows 启动入口
├── verify_environment.py  # 可重复执行的 GPU 模型验证
├── evaluate_image_swap.py # 合成图片身份迁移量化验证
├── evaluate_video_swap.py # 合成视频抽帧身份一致性验证
├── verify_webcam_live.py  # 10 秒、不落盘的实时摄像头 CUDA 基准
├── test-assets/           # 明确为虚构身份的测试输入与生成说明
└── test-output/           # 图片端到端验证结果

E:\AI_Cache\
├── deep-live-cam-home\    # InsightFace 模型
├── huggingface\
├── keras\
├── pip\
├── torch\
└── tmp\
```

当前占用约：虚拟环境 3.94GB、上游源码及换脸模型 0.38GB、E 盘共享缓存 2.53GB。C 盘没有承载项目环境或模型。

## 启动

在仓库根目录执行：

```powershell
powershell -ExecutionPolicy Bypass -File .\studies\deep-live-cam\run-gpu.ps1
```

启动器默认追加：

```text
--execution-provider cuda
```

可视化实时预览（会打开摄像头 0，关闭窗口即停止）：

```powershell
.\studies\deep-live-cam\.venv\Scripts\pythonw.exe `
  .\studies\deep-live-cam\launch_live_gui.py
```

该入口预先载入项目内的虚构女性来源脸，并在 GUI 创建后自动点击 `Live`；不会自动录制或保存摄像头画面。它使用固定上游版本的私有 UI 方法 `_on_live`，上游升级后需要重新验证。

已确认的上游边界：直接执行 `run-gpu.ps1 -s <来源图>` 会因为“只提供来源、未提供目标”被错误判定为 headless 批处理，随后对空目标路径调用图片扩展名检查并退出。`launch_live_gui.py` 通过先正常创建 GUI、再设置来源图来绕过该问题，不修改 `upstream/`。

验证环境：

```powershell
.\studies\deep-live-cam\.venv\Scripts\python.exe .\studies\deep-live-cam\verify_environment.py
```

成功结果必须包含：

```text
swap_session_providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
project_swapper_providers=['CUDAExecutionProvider', 'CPUExecutionProvider']
verification=PASS
```

复现合成图片换脸：

```powershell
.\studies\deep-live-cam\run-gpu.ps1 `
  -s .\studies\deep-live-cam\test-assets\source-synthetic.png `
  -t .\studies\deep-live-cam\test-assets\target-synthetic.png `
  -o .\studies\deep-live-cam\test-output\swapped-synthetic.png `
  --frame-processor face_swapper
```

量化评估：

```powershell
.\studies\deep-live-cam\.venv\Scripts\python.exe `
  .\studies\deep-live-cam\evaluate_image_swap.py
```

成功结果必须包含 `evaluation=PASS`。

复现合成视频换脸：

```powershell
.\studies\deep-live-cam\run-gpu.ps1 `
  -s .\studies\deep-live-cam\test-assets\source-synthetic.png `
  -t .\studies\deep-live-cam\test-assets\target-synthetic-motion.mp4 `
  -o .\studies\deep-live-cam\test-output\swapped-synthetic-motion.mp4 `
  --frame-processor face_swapper `
  --keep-fps
```

视频身份一致性评估：

```powershell
.\studies\deep-live-cam\.venv\Scripts\python.exe `
  .\studies\deep-live-cam\evaluate_video_swap.py
```

成功结果必须包含 `video_evaluation=PASS`。

实时摄像头技术基准（会开启摄像头约 10 秒，不保存画面）：

```powershell
.\studies\deep-live-cam\.venv\Scripts\python.exe `
  .\studies\deep-live-cam\verify_webcam_live.py
```

只有在获得镜头内所有人员明确授权后才能执行。成功结果必须包含：

```text
camera_released=True
frames_written_to_disk=0
webcam_benchmark=PASS
```

## 采用边界

- 上游代码采用 AGPL-3.0；网络服务化或分发修改版本前需要进行许可证评估。
- InsightFace 提供的预训练模型包含非商业研究用途限制；不能把本次技术验证直接等同于商业使用授权。
- 产品化必须增加授权确认、明显水印/AI 标识、素材审计、输出追踪和滥用处置机制。
