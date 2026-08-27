# GitHub Code Study

面向长期积累的开源项目能力研究仓库。这里不只收藏链接，而是固定上游版本、拆解真实能力、验证运行边界，并把结论整理成可以快速决策的研究记录和 Web 页面。

**统一入口：** [打开 GitHub Code Study Web 门户](https://yydshly.github.io/0827_githubcode_study/)

## 项目索引

研究状态描述“结论完成到什么程度”，页面状态描述“是否已在 GitHub Pages 上线”，两者分开维护。

| 子项目 | 核心定位 | 研究状态 | 页面状态 | 研究记录 / 页面 |
|---|---|---|---|---|
| [AIComicBuilder](https://github.com/LingyiChen-AI/AIComicBuilder) | 借助 Agent 和生成模型执行节点的短剧生产工作台；管理任务、角色、分镜、资产版本与合片流程 | `archived` | `published` | [研究结论](studies/aicomicbuilder/README.md) · [Web 页面](https://yydshly.github.io/0827_githubcode_study/aicomicbuilder/) |
| [AutoClip](https://github.com/zhouxiaoka/autoclip) | 以字幕时间轴连接 LLM 内容理解与 FFmpeg 媒体执行的自动选段和粗剪系统；适合口播类长视频，不是多模态成片工具 | `archived` | `published` | [研究结论](studies/autoclip/README.md) · [架构与原理](https://yydshly.github.io/0827_githubcode_study/autoclip/) |
| [Deep-Live-Cam](https://github.com/hacksider/Deep-Live-Cam) | 图片、视频和实时摄像头换脸技术链路均通过，但可视化验收质量很差；默认模型不建议采用 | `verified-quality-rejected` | `published` | [运行验证](studies/deep-live-cam/README.md) · [综合Web归档](https://yydshly.github.io/0827_githubcode_study/live-avatar-research/) |
| [FaceFusion](https://github.com/facefusion/facefusion) | HyperSwap 合成图片与视频画质明显优于默认 inswapper；适合离线候选，但本机约 4.27 fps 且模型许可需复核 | `verified-architecture-limited` | `published` | [运行验证](studies/facefusion/README.md) · [综合Web归档](https://yydshly.github.io/0827_githubcode_study/live-avatar-research/) |
| [Claude Code: Everything You Need to Know](https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know) | Claude Code 从入门到精通的工程化指导文档；整理 Skills、Subagents、Hooks、Workflows、MCP 与可运行样例，后续按需理解和采用 | `archived` | `published` | [研究总结](studies/claude-code-guide/README.md) · [交互指南](https://yydshly.github.io/0827_githubcode_study/claude-code-guide/) |
| [Awesome Nano Banana Pro Prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) | 生图能力地图、提示词结构、身份锚定与案例资产系统 | `verified` | `published` | [研究结论](studies/awesome-nano-banana-pro-prompts/README.md) · [能力图谱](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/) · [实验工作台](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/experiments.html) |
| [shuohao-skills](https://github.com/eternityspring/shuohao-skills) | 面向 Agent 的小说改编、角色美术、结构化剧本和 H3 分镜投产技能 | `verified` | `ready-local` | 本地：`studies/shuohao-skills/` · `docs/shuohao-skills/` |
| [Scientific Illustrator](https://github.com/icebird1998/scientific-illustrator) | 大模型通过 MCP 生成、检查并修正可编辑科研图源文件 | `verified` | `published` | [研究记录](studies/scientific-illustrator/README.md) · [完整案例](studies/scientific-illustrator/CASE-STUDY.md) · [Web 演示](https://yydshly.github.io/0827_githubcode_study/scientific-illustrator/) |
| [ChatHub](https://github.com/chathub-dev/chathub) | 以官方 API 与浏览器登录会话双路径接入模型，统一流式协议并支持模型切换和并行回答 | `verified` | `published` | [研究记录](studies/chathub/README.md) · [Web 页面](https://yydshly.github.io/0827_githubcode_study/chathub/) |
| [Modly](https://github.com/lightningpixel/modly) | 面向图生 3D 模型的本地工作流与适配平台；模型决定质量上限，电脑或云端提供算力，Modly 负责统一、编排、预览和导出 | `archived` | `published` | [研究总结](studies/modly/README.md) · [能力研究页面](https://yydshly.github.io/0827_githubcode_study/modly/) |
| [Comp AI CRM](https://github.com/trycompai/crm) | 以结构化业务数据、Evidence、持久任务和受控工具支撑长期运行 Agent 的 Agentic CRM | `researching` | `researching` | [研究记录](studies/trycompai-crm/README.md) · [架构图](studies/trycompai-crm/architecture.svg) |

## Featured：Modly 图生 3D 能力研究

**在线页面：** [Modly 图生 3D 能力研究](https://yydshly.github.io/0827_githubcode_study/modly/)

Modly 不是新的图生 3D 基础模型，而是把 Hunyuan3D、TripoSG、TRELLIS 等模型组织成统一工作流节点的本地平台。它解决模型安装、环境隔离、参数与输入输出映射、进度和取消、节点编排、3D 预览与导出；实际的几何理解、背面推断、纹理和 PBR 质量仍来自底层模型。

```text
模型        决定生成能力和质量上限
Modly       决定能力如何接入、组合与产品化
电脑 / 云端  决定本地能否运行、速度和使用成本
```

本地路线会明显依赖 NVIDIA GPU 和显存：无独显时更适合先接 Meshy、Tripo 或 Rodin 等云端 API；8GB 显存可以从 Hunyuan3D Mini、TripoSG 和部分 TRELLIS.2 GGUF 开始；12–16GB 更适合作为消费级本地主力；24GB 以上再评估官方 TRELLIS.2 4B 或更完整的高质量管线。

当前建议不是继续堆模型，而是保留三条最小通道：Hunyuan3D Mini Fast 负责快速草模，TripoSG 负责几何，TRELLIS.2 GGUF 负责本地质量；只有出现真实业务需求时，再用 30–50 个样本比较背面一致性、拓扑、UV/PBR、显存、耗时、失败率和人工清理成本。复杂自然照片成为核心输入后，再单独评估 SAM 3D Objects；本地难例可用一个商业 API 兜底。

本轮没有下载模型或执行生成质量测试，结论属于源码、扩展清单和官方模型资料层面的能力研究。重新启动前，不应把官方演示或本页整理当成生产效果证明。

[查看完整研究总结](studies/modly/README.md) · [打开可视化决策页面](https://yydshly.github.io/0827_githubcode_study/modly/)

## Featured：Comp AI CRM Agentic 架构研究

它不是“给大模型准备一张数据库表”，也不只是传统 CRM 加聊天框。它的核心参考价值，是把长期运行的业务 Agent 所需能力拆成一套可治理的系统：数据库保存事实、关系、任务与执行状态；Evidence 和规则约束事实如何被采用；大模型负责理解与规划；持久任务保证工作可恢复；受控工具负责执行外部动作；结果和审计记录再回写系统。

```mermaid
flowchart LR
    A[业务信息与外部信号] --> B[Agent-ready Database<br/>事实·关系·任务·权限]
    B --> C[Evidence / Policy<br/>证据·规则·冲突处理]
    C --> D[Durable Agent<br/>理解·规划·租约·重试]
    D --> E[Controlled Tools<br/>受控读写与外部动作]
    E --> F[执行结果与审计]
    F --> B
```

本轮源码级研究确认的关键技术价值：

- **Agent-ready 业务记忆**：沉淀的不只是文本，而是业务事实、实体关系、证据、待办任务、权限与审计状态。
- **可追溯事实治理**：Evidence 将工具观测与业务事实关联，并通过确定性规则处理应用、提案与冲突，降低模型直接改写核心事实的风险。
- **可恢复的长任务执行**：任务队列、租约、重新检查和重试机制，使 Agent 不依赖一次对话完成工作。
- **受控能力接口**：工具网关统一暴露 Agent 可调用的读写动作，便于做权限、校验、幂等与审计。
- **可演进的 Agent 配置**：Manifest、Builder 生命周期和 Action Ledger 让 Agent 的版本、行为与执行结果能够被管理和复盘。

对我们的采用建议：优先沉淀 **Evidence 模型、持久任务、工具网关、Manifest 和 Action Ledger** 这五类通用能力；下一步应通过本地运行验证 Evidence 写入链路、并发任务租约与恢复、工具调用幂等性。单租户鉴权、固定销售流程和供应商绑定不宜直接照搬，应按我们的业务边界重新设计。

当前状态为 `researching`：以上结论来自源码与结构分析，尚未完成完整运行验证。

[查看完整研究结论](studies/trycompai-crm/README.md) · [查看架构图](studies/trycompai-crm/architecture.svg)

## Featured：Awesome Nano Banana Pro Prompts 研究

**在线页面：** [能力图谱](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/) · [Prompt Lab 实验工作台](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/experiments.html)

这个上游仓库不是图像模型源码，而是一个面向 Nano Banana Pro / Gemini 图像模型的社区提示词案例库和内容资产管线。真正值得复用的不是全量收集系统，而是它暴露出的模型能力地图、提示词结构、参考图绑定方式和小步迭代方法。

本轮研究把宏观理解落成了 12 个最小实验、5 个候选提示词骨架和分层证据：

| 证据层 | 当前数量 | 能说明什么 |
| --- | ---: | --- |
| Gemini Web 实测 | 2 项任务 | E01 首次中文海报命中但居中编辑未命中；E02 高密度产品信息图首次命中 |
| Codex ImageGen 演示 | 9 项 | 提示词结构可以迁移到地图、人物、材质、复杂场景、品牌照明和编辑任务 |
| 上游参考 | 1 项 | E06 仅展示多格连续性的能力方向，本提示词尚未成功执行 |
| 稳定模板 | 0 项 | 当前实验尚未达到至少两次复测的晋级门槛 |

E01 的意义不是“生成一句漂亮语录”，而是用最低成本测试准确中文、标点、层级、对齐、强调色和禁用项是否同时可控。它直接决定工作流：稳定时可以尝试一次生成内容图；不稳定时应让模型只生成背景与构图，再由 HTML、Figma 或设计工具排字。

采用判断：

- **现在值得做：** 用案例库建立能力地图，提炼结构化提示词，按真实任务做小样本验证并保存证据。
- **暂时不做：** 复刻数据库、CMS、投稿审核、多语言发布、社区运营或自动推荐系统。
- **必须保留的边界：** 不把 Codex 演示当成 Gemini 证明；地图与事实内容需核验；人物、品牌和第三方图片需单独确认权利。

进一步阅读：[完整研究结论](studies/awesome-nano-banana-pro-prompts/README.md) · [实验矩阵](studies/awesome-nano-banana-pro-prompts/EXPERIMENT_MATRIX.md) · [Gemini 实验记录](research/01-awesome-nano-banana-pro-prompts/README.md)

## Featured：Scientific Illustrator 完整案例

**在线演示：** [LNP–mRNA 递送与 MHC-I 抗原呈递](https://yydshly.github.io/0827_githubcode_study/scientific-illustrator/)

这个子项目研究的不是“把科研图片塞进 draw.io”，也不是科研动画生成。它验证的是：大模型按照科研制图协议调用 MCP，把科学简报转成 draw.io、PowerPoint 或 WPS 中的原生可编辑对象，再通过结构检查和对象级修正交付源文件。

```mermaid
flowchart LR
  A[科学简报 / 参考图] --> B[LLM 设计与拆解]
  B --> C[MCP 编辑器适配]
  C --> D[draw.io / PPT / WPS 原生对象]
  D --> E[校验 + 检查 + 对象级修正]
  E --> F[可编辑源文件]
```

| 层级 | 当前职责 | 本次证据 |
| --- | --- | --- |
| 大模型编排层 | Designer、Drawer、Reviewer、Corrector 四角色工作流 | 固定上游 v1.5.4 的 skills 与工具协议 |
| MCP 执行层 | 创建、读取、校验和修改编辑器对象 | 6 次真实文件型 MCP 调用 |
| 产物层 | 交付可继续编辑的 draw.io/PPT 对象 | 39 vertex、19 edge、0 raster |
| Web 展示层 | 解释架构、展示终稿与验证证据 | GitHub Pages 公共页面 |

演示严格区分两种模式：

- **GitHub Pages：** 加载已经由真实 MCP 生成并校验的终稿、对象统计和调用记录；不会伪装远端浏览器正在运行 MCP。
- **本地 Node bridge：** 运行 `node studies/scientific-illustrator/demo-server.mjs` 后，可现场重新执行创建、校验、检查、修正与复检。

对我们的意义：它提供了“大模型 → 专业编辑器 → 可审计源文件”的通用连接方式，可用于论文机制图、实验流程、基金技术路线和团队图形规范。未来可以在结构化对象之上扩展动画或视频编排，但动画不是当前库的核心输出。

进一步阅读：[研究记录](studies/scientific-illustrator/README.md) · [完整案例](studies/scientific-illustrator/CASE-STUDY.md) · [验证证据](studies/scientific-illustrator/VALIDATION.md)

## 状态说明

研究状态：

- `planned`：已列入计划，尚未开始。
- `researching`：正在阅读、实验和记录。
- `verified`：关键结论已有可复现证据。
- `archived`：研究已收束，达到重新启用条件前不再投入。

页面状态：

- `published`：页面已合入 `main`，GitHub Pages 可访问。
- `ready-local`：本地页面已经形成，等待独立审阅和提交。
- `researching`：页面仍随研究变化，暂不对外发布。

## 统一目录约定

每个新研究项目使用同一个 slug，并维护两个入口：

```text
studies/<project-slug>/README.md   # 研究结论、版本、证据与采用判断
docs/<project-slug>/index.html     # 面向浏览者的 GitHub Pages 页面
```

新增或发布项目时同步完成：

1. 固定上游仓库和 commit/release。
2. 更新本 README 的项目索引与两个状态。
3. 更新 `docs/index.html` 的门户卡片。
4. 确认页面使用相对路径，不依赖本地服务和本地绝对路径。
5. 在桌面和移动端验证后，独立提交并推送。

## 仓库结构

```text
.
├── README.md                 # 对外总览、项目索引和维护约定
├── studies/                  # 各项目研究记录与固定上游源码
├── docs/
│   ├── index.html            # 整体 Web 门户
│   └── <project-slug>/       # 各研究项目独立页面
├── templates/                # 新研究项目模板
└── .github/workflows/        # GitHub Pages 发布流程
```

## GitHub Pages

推送 `docs/**` 到 `main` 后，工作流会通过 Jekyll 构建并发布整个 `docs/` 目录。门户地址保持不变，各项目页面使用 `/<project-slug>/` 路径，方便后续持续增加页面。

## License

本仓库尚未指定开源许可证。研究过程中引用第三方代码、图片或文档时，应保留原始出处，并遵守对应上游项目的许可证。
