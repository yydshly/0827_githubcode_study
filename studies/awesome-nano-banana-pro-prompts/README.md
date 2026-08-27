# Awesome Nano Banana Pro Prompts 研究记录

## 基本信息

| 项目 | 内容 |
|---|---|
| 上游仓库 | [YouMind-OpenLab/awesome-nano-banana-pro-prompts](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts) |
| 研究基准 | 中文 README 2026-08-23 快照；发布时核对上游 `main@3fe6863` |
| 开源许可证 | CC BY 4.0；第三方案例图片和人物/品牌仍需分别确认权利 |
| 研究状态 | `verified`：仓库架构、12 项最小实验、2 项 Gemini 实测、9 项 Codex 跨模型演示与 1 项上游参考已记录；当前 0 项达到稳定模板门槛 |
| 最后更新 | 2026-08-27 |
| Web 演示 | [能力图谱](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/) · [实验工作台](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/experiments.html) |

## 研究结论

这个仓库不是图像模型源码，而是一个主要面向 `Nano Banana Pro / Gemini 3 Pro Image` 的提示词案例库和内容资产管线。

当前最值得研究的是：

1. 模型能力地图：参考图、多图组合、图中文字、知识可视化、一致性、视觉控制和局部迭代。
2. 提示词结构：目标、输入绑定、主体、构图、光线、文字、约束、输出和单变量迭代。
3. 案例先验：从成功样例提炼可替换结构，减少从零试错。

CMS、数据库、投稿审核、多语言和社区运营属于规模化能力，本阶段只理解作用，不深入实现。

## 对外结论与证据

| 问题 | 当前结论 |
|---|---|
| 这个库实现什么？ | 收集、组织、审核和发布高质量提示词案例；它不负责真正的图像生成 |
| 生成能力来自哪里？ | Gemini / Nano Banana Pro 等图像模型负责理解提示词、参考图、视觉约束和编辑指令 |
| 对当前阶段最有价值的部分 | 能力地图、提示词结构、参考图职责拆分、显式约束与单变量迭代 |
| 已有真实证据 | E01、E02 在 Gemini Web 执行；E01 首次生成命中但居中编辑未命中，E02 首次信息图生成命中 |
| 跨模型演示 | E03–E05、E07–E12 由 Codex ImageGen 展示方向，不用于证明 Gemini 效果 |
| 尚未完成 | E03 地理事实核验、E06 对应提示词生成、E10 两次独立 A/B、Gemini 稳定复测 |
| 是否应复刻平台 | 当前不应；先按真实需求执行小样本，再决定是否建设模板库、检索或自动化 |

E01 不是为了沉淀一种“语录海报风格”，而是文字型生图的最小诊断任务：同时检查中文、标点、层级、对齐、强调色和禁止项。稳定时可直接用于一次性内容图；不稳定时应采用“模型生成背景与构图，HTML/Figma/设计工具负责排字”的混合流程。

## 双层架构

```text
模型能力层
文字/参考图 → 多模态理解与视觉规划 → 生成与编辑 → 多轮迭代

提示词资产层
社区案例 → 审核 → CMS 分类与本地化 → README/网页图库 → 发现与复用
```

二者的边界：

- Gemini 模型负责真正的图像生成和编辑。
- 仓库负责收集、组织、展示和传播成功经验。

## 能力地图

| 能力组 | 能力内容 | 代表案例 | 当前价值 |
|---|---|---|---:|
| 参考图理解 | 身份、产品、服装、姿势和风格绑定 | 手绘文章头图、身份保真人像 | 高 |
| 文字与知识 | 排版、信息图、地图、多语言 | 引言卡、产品信息图、德国地图 | 高 |
| 一致性与组合 | 多参考图、多场景、多面板、身份一致性 | 四格新年拼图 | 高 |
| 视觉精确控制 | 构图、镜头、光线、材质和色彩 | 薄纱礼服肖像、玻璃涡轮 | 高 |
| 专业资产生产 | 营销、电商、分镜、游戏、UI 与概念素材 | 信息图、机械鲸鱼场景 | 高 |
| 参数化复用 | 变量、保留项、禁用项和输出规格 | 引言卡、玻璃涡轮 | 高 |

## 12 个最小实验与使用场景

Web 演示没有复制全量提示词，而是按四条路线整理 12 个可诊断任务：

| 路线 | 实验 | 典型使用场景 |
|---|---|---|
| 内容与文字 | E01 中文引语卡、E02 产品信息图、E03 德国地图 | 社媒卡片、知识封面、产品说明、教育与报告图解 |
| 参考与一致性 | E04 手绘头图、E05 商业肖像、E06 四格叙事 | 采访封面、品牌肖像、故事板、漫画和教学序列 |
| 视觉与资产 | E07 玻璃涡轮、E08 机械鲸教堂、E09 LED 产品肖像 | 工业/游戏概念、世界观设计、广告与电商主视觉 |
| 模板与迭代 | E10 提示词对照、E11 本地化、E12 单变量编辑 | 团队规范、模型评测、多渠道适配和受控版本修改 |

每个实验公开显示研究意义、适用场景、输入、通过条件、当前证据和完整执行提示词。提示词是根据案例结构重新编写的研究任务，不是对上游原文的大段复制。

## 当前阶段的使用方式

```text
浏览能力地图
→ 真实需求出现时选择一条对应提示词
→ 复制到可用的图像模型环境
→ 按通过条件判断结果
→ 只有复测稳定时才沉淀为项目模板
```

本轮用 2 项 Gemini Web 实测保留真实能力边界，并用 9 项 Codex ImageGen 结果补全视觉方向；E06 因 ImageGen 网络阶段四次失败，继续使用上游参考并明确标注“本提示词未执行”；E10 当前只是单张对照板，不是两次独立运行。不同来源和证据状态在页面中分别标注，均不等于稳定复现。

当前不建设全量抓取、数据库、搜索推荐、投稿社区或自动提示词 Agent。只有模板数量、协作人数或真实调用量证明文件方式已经不足时，才进入规模化系统设计。

## 文件

- [在线能力图谱](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/)
- [在线实验工作台](https://yydshly.github.io/0827_githubcode_study/nano-banana-pro/experiments.html)
- [Web 页面源码](../../docs/nano-banana-pro/index.html)
- [12 项实验与 5 个候选模板](EXPERIMENT_MATRIX.md)
- [Revision 2 设计契约](REVISION_2_CONTRACT.md)
- [Revision 2 验收记录](VALIDATION_REVISION_2.md)
- [Revision 3 修复契约](REVISION_3_REPAIR_CONTRACT.md)
- [Revision 3 最终验收](VALIDATION_REVISION_3.md)
- [Revision 4 E02 证据更新契约](REVISION_4_E02_EVIDENCE_CONTRACT.md)
- [Revision 4 E02 验收记录](VALIDATION_REVISION_4.md)
- [Revision 5 Codex 生图补全契约](REVISION_5_CODEX_DEMO_CONTRACT.md)
- [Revision 5 Codex 生图验收](VALIDATION_REVISION_5.md)
- [E01 真实实验记录](../../research/01-awesome-nano-banana-pro-prompts/runs/E01/README.md)
- [E02 真实实验记录](../../research/01-awesome-nano-banana-pro-prompts/runs/E02/README.md)
- [Codex ImageGen 演示记录与提示词集](../../research/01-awesome-nano-banana-pro-prompts/runs/codex-demo/README.md)
- [设计契约](DESIGN_CONTRACT.md)
- [浏览器验收记录](VALIDATION.md)
- [提示词实验模板](../../research/01-awesome-nano-banana-pro-prompts/PROMPT_EXPERIMENT_TEMPLATE.md)

## 参考资料

- [上游中文 README](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts/blob/main/README_zh.md)
- [投稿与审核说明](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts/blob/main/docs/CONTRIBUTING.md)
- [README 生成脚本](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts/blob/main/scripts/generate-readme.ts)
- [CMS 同步脚本](https://github.com/YouMind-OpenLab/awesome-nano-banana-pro-prompts/blob/main/scripts/sync-approved-to-cms.ts)
- [Google Gemini 图像生成文档](https://ai.google.dev/gemini-api/docs/image-generation)
- [Gemini 3 Pro Image 模型说明](https://ai.google.dev/gemini-api/docs/models/gemini-3-pro-image)
