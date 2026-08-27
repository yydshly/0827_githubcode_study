# GitHub Code Study

面向长期积累的开源项目能力研究仓库。这里不只收藏链接，而是固定上游版本、拆解真实能力、验证运行边界，并把结论整理成可以快速决策的研究记录和 Web 页面。

**统一入口：** [打开 GitHub Code Study Web 门户](https://yydshly.github.io/0827_githubcode_study/)

## 项目索引

研究状态描述“结论完成到什么程度”，页面状态描述“是否已在 GitHub Pages 上线”，两者分开维护。

| 子项目 | 核心定位 | 研究状态 | 页面状态 | 研究记录 / 页面 |
|---|---|---|---|---|
| [AIComicBuilder](https://github.com/LingyiChen-AI/AIComicBuilder) | 借助 Agent 和生成模型执行节点的短剧生产工作台；管理任务、角色、分镜、资产版本与合片流程 | `archived` | `published` | [研究结论](studies/aicomicbuilder/README.md) · [Web 页面](https://yydshly.github.io/0827_githubcode_study/aicomicbuilder/) |
| [Awesome Nano Banana Pro Prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) | 生图能力地图、提示词结构、身份锚定与案例资产系统 | `verified` | `ready-local` | 本地：`studies/awesome-nano-banana-pro-prompts/` · `docs/nano-banana-pro/` |
| [shuohao-skills](https://github.com/eternityspring/shuohao-skills) | 面向 Agent 的小说改编、角色美术、结构化剧本和 H3 分镜投产技能 | `verified` | `ready-local` | 本地：`studies/shuohao-skills/` · `docs/shuohao-skills/` |
| [Scientific Illustrator](https://github.com/icebird1998/scientific-illustrator) | 大模型通过 MCP 生成、检查并修正可编辑科研图源文件 | `verified` | `published` | [研究记录](studies/scientific-illustrator/README.md) · [完整案例](studies/scientific-illustrator/CASE-STUDY.md) · [Web 演示](https://yydshly.github.io/0827_githubcode_study/scientific-illustrator/) |
| [ChatHub](https://github.com/chathub-dev/chathub) | 以官方 API 与浏览器登录会话双路径接入模型，统一流式协议并支持模型切换和并行回答 | `verified` | `published` | [研究记录](studies/chathub/README.md) · [Web 页面](https://yydshly.github.io/0827_githubcode_study/chathub/) |

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
