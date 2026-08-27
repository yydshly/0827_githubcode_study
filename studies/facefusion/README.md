# FaceFusion 3.6.1 本地验证

状态：`archived-verified-architecture-limited`

综合Web归档：<https://yydshly.github.io/0827_githubcode_study/live-avatar-research/>

## 结论

FaceFusion 的 HyperSwap 路线在同一组合成人像上，画面质量明显优于 Deep-Live-Cam 默认的 `inswapper_128`：五官边缘完整，眼睛、鼻口没有明显糊化和重影，肤色与目标画面融合也更自然。4 秒合成视频的 5 个抽样时间点没有跳脸，身份相似度波动很小。

当前可把它作为**离线图片/短视频换脸候选**继续评估，但不能直接视为实时直播方案。本机以 512 pixel boost 处理 640×640 视频时，换脸阶段约为 4.27 fps，距离 24–30 fps 实时要求仍很远。

另外，FaceFusion 主程序采用 OpenRAIL-AS，而本次 HyperSwap 模型在源码元数据中标记为 `ResearchRAIL`。本次仅进行合成素材研究验证；商业采用前必须单独复核程序、模型和输入素材的许可与肖像授权。

## 固定版本

- 上游：<https://github.com/facefusion/facefusion>
- Tag：`3.6.1`
- Commit：`5b7d145aa7659a5997f304dc059bce5005270c1d`
- Python：3.12.10
- ONNX Runtime GPU：1.24.4
- 显卡：NVIDIA GeForce RTX 4070 Laptop GPU，8GB
- 执行提供器：`CUDAExecutionProvider`

上游源码保存在 `upstream/`，Python 隔离环境保存在 `.venv/`；二者均通过本目录 `.gitignore` 排除，不提交到仓库。

## 实测配置与结果

| 项目 | 结果 |
| --- | --- |
| 换脸模型 | `hyperswap_1a_256` |
| Pixel boost | `512x512` |
| 身份权重 | `0.50`（默认） |
| 蒙版 | `box` |
| 静态图 | 1254×1254，8.16 秒 |
| 静态身份相似度 | 源/输出 0.702；目标/输出 0.158 |
| 合成视频 | 640×640，4 秒，24 fps，96 帧 |
| 视频总耗时 | 31.11 秒 |
| 换脸阶段吞吐 | 约 4.27 fps |
| 视频身份相似度 | 均值 0.695；最低 0.691；最高 0.700 |
| 目视结果 | 5 个抽样时间点无跳脸，明显优于 `inswapper_128` |

额外测试了身份权重 `0.75`：源人物相似度为 0.700，低于默认权重的 0.702，目视提升也不明显，因此保留默认 `0.50`。

人脸相似度只用于辅助判断。旧 `inswapper_128` 虽然曾得到更高的识别分数，但目视存在严重糊化和重影，因此不能把单一 embedding 分数当成画质结论。

### 公开人物来源对照：Elon Musk

为检查无明显胡须来源在带轻微胡茬目标上的表现，使用 Wikimedia Commons 的 2018 年 Elon Musk 正面肖像，替换同一个虚构成年男性目标。默认 `box` 遮罩的源/输出身份相似度为 0.780，优于 `box + region` 的 0.748；区域遮罩减少了部分下巴胡茬，但眼周、鼻翼和嘴角边界更明显，因此默认 `box` 版目视更自然。

这次对照也再次确认：HyperSwap 主要迁移内部五官与身份特征，目标的头部轮廓、下颌宽度、发型和耳朵仍会保留。来源与目标脸型差异较大时，即使身份识别分数较高，也不会自动得到完整的“马斯克头型”。测试结果仅为明确标注的合成研究素材，不代表真实影像。

## 证据文件

公开仓库保留支持结论所需的压缩证据：

- [新旧静态对比](../../docs/live-avatar-research/assets/facefusion-vs-inswapper.jpg)
- [新旧视频抽帧对比](../../docs/live-avatar-research/assets/motion-samples.jpg)
- [Musk 四图遮罩对照](../../docs/live-avatar-research/assets/musk-mask-comparison.jpg)
- [Musk 测试来源与许可说明](test-assets/README.md)

以下高分辨率图片与视频只保存在本机 `test-output/`，通过 `.gitignore` 排除：`hyperswap-1a-256-boost512.png`、`hyperswap-1a-256-boost512-weight075.png`、`hyperswap-1a-256-boost512-motion.mp4`、`musk-to-synthetic-target-box.png` 和 `musk-to-synthetic-target-region.png`。

除上述 Wikimedia Commons 的 Elon Musk 来源肖像外，其他输入人物均为此前生成的虚构成年人合成图。本轮没有使用摄像头，也没有上传本地图片或视频；所有处理均在本机完成。

## 本地启动方式

`launch_gpu.py` 会把缓存和临时目录固定到 E 盘，并在 Windows 下登记 `.venv` 中 pip 安装的 CUDA/cuDNN DLL，避免 ONNX Runtime 找不到运行库或静默回退 CPU。

查看命令帮助：

```powershell
cd E:\0827_codex_project\studies\facefusion
.\run-gpu.ps1 headless-run --help
```

复现本次静态图：

```powershell
.\run-gpu.ps1 headless-run `
  --source-paths E:\0827_codex_project\studies\deep-live-cam\test-assets\source-synthetic.png `
  --target-path E:\0827_codex_project\studies\deep-live-cam\test-assets\target-synthetic.png `
  --output-path E:\0827_codex_project\studies\facefusion\test-output\hyperswap-1a-256-boost512.png `
  --processors face_swapper `
  --face-swapper-model hyperswap_1a_256 `
  --face-swapper-pixel-boost 512x512 `
  --face-swapper-weight 0.5 `
  --face-mask-types box `
  --execution-providers cuda `
  --video-memory-strategy moderate `
  --output-image-quality 100 `
  --temp-path E:\AI_Cache\facefusion-temp `
  --jobs-path E:\AI_Cache\facefusion-jobs
```

## 磁盘占用

- FaceFusion `.venv`：约 3.44GB
- FaceFusion 基础模型与 HyperSwap：约 1.36GB
- 当前测试输出：约 0.01GB

这些内容均位于 E 盘。启动器不会修改 `USERPROFILE`，也不会改变 Codex 的历史记录目录。

## 重新启动条件

研究现已暂时归档。只有在目标重新收敛为“保留目标头型的局部换脸”，或出现许可可接受且能显著改善整头几何/实时性能的新模型时，才重新验证FaceFusion。若目标仍是完整替换头型、下颌和头发，应优先验证FasterLivePortrait、LAM/3D Gaussian Head或成熟数字人产品，不再围绕当前遮罩参数继续投入。
