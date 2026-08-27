# 实时人脸与头像替换研究归档

状态：`archived-after-local-validation`
验证日期：2026-08-27
公开页面：<https://yydshly.github.io/0827_githubcode_study/live-avatar-research/>

## 一句话结论

Deep-Live-Cam 与 FaceFusion 已证明本机能够完成图片、视频和摄像头换脸，但二者的核心仍是**目标头型中的局部人脸身份替换**。它们不能满足“来源与目标脸型差异很大时仍完整替换头型、下颌、发际线和头发”的目标；继续微调遮罩、锐化或身份权重的收益很低。

## 本轮验证对象

| 项目 | 固定版本 | 本机结果 | 采用判断 |
|---|---|---|---|
| [Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam) | commit `7ca6d0b2023ca78afecd267523dd6763fb64b2b4` | CUDA 图片、96帧视频和10秒摄像头链路均通过；摄像头换脸约18.11fps | 默认 `inswapper_128_fp16` 目视质量不通过，不作为高质量方案 |
| [FaceFusion](https://github.com/facefusion/facefusion) | 3.6.1 / `5b7d145aa7659a5997f304dc059bce5005270c1d` | HyperSwap静态和视频质量明显更好；640×640换脸约4.27fps | 可作离线候选，但非本机实时方案，也不能改变目标头型 |

验证设备：Windows、NVIDIA GeForce RTX 4070 Laptop GPU 8GB、Python 3.12；运行环境、模型与缓存均固定在 E 盘。

## 关键证据

- Deep-Live-Cam默认模型：静态来源/输出身份相似度0.839，4秒视频抽样均值0.843；量化身份迁移成立，但用户目视验收质量很差。
- FaceFusion HyperSwap：静态来源/输出相似度0.702；4秒视频均值0.695，抽样无跳脸；视觉质量明显优于InSwapper，但换脸阶段仅约4.27fps。
- Elon Musk公开肖像对照：默认box遮罩来源/输出相似度0.780；region遮罩为0.748。区域遮罩能减轻部分胡茬，却带来眼周、鼻翼和嘴角分区边界。
- 最终结构判断：HyperSwap迁移五官和内部脸部特征，目标的下颌宽度、头部轮廓、发型、耳朵、姿态和大部分光照仍然保留。

详细复现记录：

- [Deep-Live-Cam本地验证](../deep-live-cam/README.md)
- [FaceFusion 3.6.1本地验证](../facefusion/README.md)

## 代码与模型的边界

```text
视频/摄像头
  → 代码：采集、解码、队列和时间戳
  → 检测模型 + 代码：人脸、关键点、跟踪和对齐
  → 生成模型：局部换脸 / 2D肖像驱动 / 3D头像 / 整帧重绘
  → 代码：遮罩、合成、时序稳定和颜色处理
  → FFmpeg / WebRTC / OBS：文件、直播或虚拟摄像头输出
```

模型决定可生成的空间范围与身份上限；工程代码决定实时性、稳定性、输入输出和产品集成。优秀的合成代码不能让一个只训练于对齐脸部裁切的模型自动变成整头生成模型。

## 后续候选路线

研究已暂时停止，以下对象仅作为重新启动时的候选清单，不代表已经通过本机或商业验收。

| 目标 | 候选 | 当前定位 | 主要边界 |
|---|---|---|---|
| 本地摄像头驱动来源肖像 | [FasterLivePortrait](https://github.com/warmshao/FasterLivePortrait) | 下一轮最小可行验证 | 更像让来源肖像动起来；保留摄像头身体/背景仍需额外合成 |
| 单图生成可驱动3D头部 | [LAM](https://github.com/aigc3d/LAM) | 最符合整头方向的研究候选 | 公开权重CC BY-NC 4.0；8GB显存与Windows链路未验证 |
| 稳定实时3D数字人 | [MetaHuman](https://dev.epicgames.com/documentation/metahuman/realtime-animation-for-metahumans-in-unreal-engine) | 成熟的完整头像产品路线 | 需要制作3D人物，不是一张照片的无损真人克隆 |
| 商业云端实时验证 | [AKOOL Live Camera](https://akool.com/live-camera) | 快速建立商业质量上限 | 云端上传、费用、延迟和授权需评估 |
| 离线高质量表演迁移 | [Runway Act-Two](https://help.runwayml.com/hc/en-us/articles/42311337895827-Performance-Capture-with-Act-Two) | 更适合成片而非直播 | 云端非实时，时长和费用受产品限制 |
| 实时生成式视频重绘 | [Decart实时SDK](https://github.com/DecartAI/sdk) | 可改变人物和整幅画面 | 精确真人身份锁定和网络延迟需要实测 |

重新启动研究时，优先顺序为：FasterLivePortrait离线4秒样例 → 摄像头帧率与延迟 → OBS虚拟摄像头；如果仍不满足，再评估LAM/MetaHuman或商业云端产品，不再围绕FaceFusion遮罩参数继续投入。

## 归档范围

提交到GitHub：

- 两个项目的Markdown研究记录、启动器和评估脚本；
- 明确标注为虚构身份的合成测试输入与小型输出证据；
- Web页面所需的压缩对比图；
- 公开人物测试的来源、作者、许可和合成说明。

不提交：

- `.venv/` Python环境；
- `upstream/` 上游源码副本；
- ONNX/PyTorch模型、Hugging Face和InsightFace缓存；
- FaceFusion原始高分辨率输出和临时帧；
- 摄像头画面（本轮摄像头基准从未落盘）。

## 许可与合成内容

- Deep-Live-Cam上游代码为AGPL-3.0；其InsightFace预训练模型存在非商业研究限制。
- FaceFusion主程序为OpenRAIL-AS；本轮HyperSwap模型元数据标记为ResearchRAIL，商业采用前必须单独复核。
- Elon Musk来源图来自Wikimedia Commons，作者Debbie Rowe，署名The Royal Society，页面列出CC BY-SA 3.0/4.0；对比图是明确标注的合成研究内容，不是真实影像。
- 使用真人身份必须获得授权，并对外清晰标注AI/合成内容；模型许可不包含肖像权或人格权授权。
