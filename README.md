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
| [Scientific Illustrator](https://github.com/icebird1998/scientific-illustrator) | 可编辑科研图重建、draw.io/PowerPoint/WPS 后端和结构/渲染质量审计 | `researching` | `researching` | 本地：`studies/scientific-illustrator/` · `docs/scientific-illustrator/` |

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
