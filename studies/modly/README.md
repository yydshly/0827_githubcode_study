# Modly：图生 3D 模型的本地工作流与适配平台

上游仓库：[lightningpixel/modly](https://github.com/lightningpixel/modly)

- 研究状态：`archived`
- 页面状态：`published`
- 在线页面：[Modly 图生 3D 能力研究](https://yydshly.github.io/0827_githubcode_study/modly/)
- 结论快照：2026-08-27

## 核心结论

> **Modly 不是图生 3D 基础模型，而是面向不同 3D 生成模型的本地工作流、插件运行时与适配平台。**

它不负责学习“怎样从一张图片理解物体并生成三维结构”。真正决定几何、背面推断、纹理和 PBR 质量的是 Hunyuan3D、TripoSG、TRELLIS 等底层模型。Modly 负责把这些模型统一成可以安装、配置、组合、运行、预览和导出的工作流节点。

可以这样理解：

```text
模型       = 发动机，决定生成能力和质量上限
Modly      = 底盘、仪表盘和装配线，决定能力如何被组织和使用
电脑 / 云端 = 算力来源，决定本地能否运行、速度和成本
```

因此，我们此前的两个判断都成立：

1. **核心能力仍依赖底层模型。**Modly 不会让弱模型凭空获得更好的几何理解能力。
2. **选择本地模型就会依赖电脑性能。**其中 GPU 显存是首要门槛；使用商业云端 API 可以把主要算力需求移出本机。

## Modly 实现的能力

Modly 的主要价值属于工程与产品化层：

- 发现、安装和注册模型扩展。
- 为不同模型提供统一的参数与输入输出描述。
- 使用独立 Python 或 JavaScript 进程隔离运行环境。
- 处理加载、生成、进度、取消、卸载和错误返回。
- 将图片、文字、网格等节点连接成工作流。
- 对 GLB、OBJ、PLY 等结果进行预览、比较和导出。
- 为后续纹理、减面、重拓扑、格式转换和质量检查提供编排位置。

典型模型扩展以 `manifest.json` 描述节点、输入、输出和参数，再通过生成器实现实际推理。商业 API 也可以作为 process 扩展接入：上传输入、轮询异步任务、下载 GLB，再交还给工作流。

源码入口：

- [Modly README 与扩展列表](https://github.com/lightningpixel/modly)
- [Generator registry](https://github.com/lightningpixel/modly/blob/main/api/services/generator_registry.py)
- [Base generator](https://github.com/lightningpixel/modly/blob/main/api/services/generators/base.py)
- [Process runner](https://github.com/lightningpixel/modly/blob/main/electron/main/process-runner.ts)

## 本地与云端的性能关系

本地运行时：

```text
能否加载模型      → 主要看显存
生成速度          → 主要看 GPU 算力
能否运行高分辨率  → 看显存、实现和量化方式
环境稳定性        → 还受驱动、CUDA、内存和磁盘影响
最终效果上限      → 仍由模型和输入质量决定
```

显存档位只能作为早期选型参考，不是所有模型的统一硬门槛：

| 设备条件 | 建议路线 |
|---|---|
| 无独立显卡 | 优先使用 Meshy、Tripo、Rodin 等云端 API |
| 6GB 显存 | Mini、低显存或强量化模型；分辨率和稳定性受限 |
| 8GB 显存 | Hunyuan3D Mini、TripoSG、部分 TRELLIS.2 GGUF |
| 12–16GB 显存 | 多数消费级本地路线，质量和速度更实用 |
| 24GB+ 显存 | 官方 TRELLIS.2 4B、较完整的高质量模型管线 |

部署方式可分为：

| 方式 | 优点 | 代价 |
|---|---|---|
| 纯本地 | 离线、隐私、可定制、无单次 API 费用 | 显卡、依赖、磁盘和维护成本 |
| 纯云端 | 无需高端显卡，上手快，服务商负责升级 | 按量付费、联网、隐私和供应商依赖 |
| 本地 + 云端 | 轻量任务本地完成，难例用云端兜底 | 需要统一路由、密钥、成本和失败处理 |

## Modly 当前现成模型扩展

[Modly 官方 README](https://github.com/lightningpixel/modly) 当前列出的主要生成扩展包括：

| 扩展 | 能力定位 | 采用判断 |
|---|---|---|
| [Hunyuan3D 2 Mini](https://github.com/lightningpixel/modly-hunyuan3d-mini-extension) | 约 0.6B，Fast / Turbo / 标准版本，单图快速生成几何 | 适合草模和低门槛预览 |
| [TripoSG](https://github.com/lightningpixel/modly-triposg-extension) | 约 1.5B，强调几何和形体，约 8GB CUDA 显存起步 | 适合作为几何主模型 |
| [TRELLIS.2 GGUF](https://github.com/lightningpixel/modly-trellis2-gguf-extension) | 多档量化，包含生成与纹理节点 | 适合作为本地质量和 PBR 路线 |

如果只建立三条通道，建议：

1. 快速草模：Hunyuan3D Mini Fast。
2. 几何优先：TripoSG。
3. 本地质量：TRELLIS.2 GGUF。

## 值得进一步适配的开源模型

| 模型 | 主要优势 | 接入与使用边界 | 优先级 |
|---|---|---|---|
| [SPAR3D](https://github.com/Stability-AI/stable-point-aware-3d) | 快速单图重建、不可见背面恢复、点云条件编辑 | 默认约 10.5GB，低显存模式约 7GB；平台兼容性需实测 | 高 |
| [TRELLIS.2 4B](https://github.com/microsoft/TRELLIS.2) | O-Voxel、复杂拓扑、高质量 PBR | 官方运行环境偏 Linux、NVIDIA 24GB+ | 高端硬件条件下高 |
| [Hunyuan3D 2.1](https://github.com/Tencent-Hunyuan/Hunyuan3D-2.1) | 几何与生产型 PBR 纹理管线 | 部署较重，商业使用前需复核模型许可 | 中高 |
| [SAM 3D Objects](https://github.com/facebookresearch/sam-3d-objects) | 遮挡、杂乱场景和多物体目标恢复 | 通常还需 mask；工程和授权复核成本较高 | 场景照片为核心时高 |
| [Step1X-3D](https://github.com/stepfun-ai/Step1X-3D) | 高质量几何、纹理和多视图控制 | 推理与依赖链路较重 | 中 |

Stable Fast 3D、TripoSR、InstantMesh、CRM 和 LRM 等仍可接入，但更适合作为速度基线或研究对照，不建议成为新项目的第一批主力。

## 市场上的商业/API 能力

商业服务不需要在本地下载权重，可以通过 Modly process 扩展调用：

| 平台 | 主要强项 | 更适合的场景 |
|---|---|---|
| [Meshy](https://docs.meshy.ai/en) | 文生/图生 3D、纹理、重拓扑、绑定和动画，产品链路完整 | 游戏资产和完整工作流 |
| [Tripo API](https://developers.tripo3d.ai/en/docs/generation-image-to-model) | 速度、几何、PBR、细节纹理和自动化接口 | 快速批量生成与 UGC |
| [Hyper3D Rodin](https://docs.hyper3d.ai/en) | 文字、单图、多图、高质量 PBR 与多格式导出 | 商品和展示级资产 |
| [Stability AI SPAR3D API](https://platform.stability.ai/docs/api-reference) | 单图到 GLB，背面恢复，接入简单 | 先做云端效果验证 |

市场上没有一个在所有输入上都绝对最好的模型。商业平台的实时版本、价格和质量更新很快，必须使用自己的样本重新比较。

## 适合与不适合的场景

适合：

- 游戏、WebGL、Three.js、AR 的概念资产和背景道具。
- 商品或普通物体的快速 3D 原型。
- UGC 和批量内容生产。
- 从图片建立可继续加工的几何基础。
- 统一比较模型、组合生成与后处理节点。

不宜直接承诺：

- 需要精确尺寸、装配关系和工程约束的 CAD 建模。
- 一键得到无需人工处理的英雄级角色资产。
- 从一张图恢复绝对真实的不可见结构。
- 直接得到天然适合绑定和动画的专业拓扑。
- 未经模型、训练数据和素材授权复核的商业量产。

## 对我们的价值

Modly 值得参考的不是某一个模型，而是一个模型可替换的资产生产层：

1. **降低试错成本**：同一批输入可在多个模型间切换和对比。
2. **建立混合算力路线**：本地负责快速和隐私任务，云端负责难例和质量兜底。
3. **连接后处理**：生成结果可以继续进入减面、纹理、格式转换和检查。
4. **降低供应商耦合**：上层工作流不直接绑定某一个模型或 API。
5. **形成可评测资产管线**：保存参数、耗时、显存、成本和结果，支持后续复盘。

其边界同样明确：Modly 可以改善工程体验和生产流程，但不能替代底层模型的几何理解，也不会消除硬件、API 费用、人工清理和授权问题。

## 后续如何低成本探索

当前选择“暂时不研究”是合理的。建议保留下列重新启动条件和顺序。

### 重新启动条件

- 出现明确的 3D 资产业务需求和数量规模。
- 获得 8GB 以上 NVIDIA GPU，或有可接受的云端 API 预算。
- 新模型在背面一致性、拓扑或 PBR 上出现明显跃迁。
- 人工建模成为内容生产的明确瓶颈。

### 最小探索顺序

1. 收集 30–50 个真实业务样本，明确目标面数、格式、PBR 和清理时间。
2. 只测试三条路线：快速本地、质量本地、商业云端。
3. 记录轮廓、背面、拓扑、面数、UV/PBR、耗时、显存、失败率和清理时间。
4. 如果生成结果没有显著降低人工成本，则停止扩展模型。
5. 只有主模型被验证有价值后，再接减面、重拓扑、绑定、成本追踪和自动路由。

### 推荐的最小组合

```text
快速本地     Hunyuan3D Mini Fast
几何本地     TripoSG
质量本地     TRELLIS.2 GGUF
云端兜底     Meshy / Tripo / Rodin 三选一
复杂照片     仅在成为核心输入后评估 SAM 3D Objects
```

## 证据边界

本轮完成的是源码、扩展清单和模型官方资料层面的能力研究，以及静态决策页面整理；**没有下载模型权重，也没有在本机执行图生 3D 质量对比**。因此：

- 已确认：Modly 的定位、扩展机制、当前扩展列表和各模型官方描述。
- 当前判断：适合场景、接入优先级、部署组合和探索路线。
- 尚未验证：具体电脑上的生成速度、显存峰值、资产质量、失败率与商业 ROI。

重新启动研究时，必须用真实业务样本完成运行层验证，不能把官方演示图或本页整理当成生产效果证明。

## 本仓库整理产物

- [在线调研网页](https://yydshly.github.io/0827_githubcode_study/modly/)
- [设计与交付契约](./DESIGN-CONTRACT.md)
- [页面验证记录](./VALIDATION.md)
- [Modly 上游仓库](https://github.com/lightningpixel/modly)

