# Prompt Lab：小样本实验矩阵

## 结论先行

本轮把研究页中的宏观判断转成 12 个可执行的小样本实验，并整理 5 个候选提示词模板。E01、E02 已在 Gemini Web 执行；E03–E05、E07–E12 有 Codex ImageGen 跨模型方向演示；E06 只保留上游参考。当前没有项目被标记为 `VERIFIED`。

## 状态规则

- `READY`：输入、提示词和通过条件已经定义，可以按真实需求直接执行，但不代表模型效果已验证。
- `EXECUTED`：已在记录了模型版本与平台的环境中实际运行，并保存输入和输出。
- `DEMO`：其他模型生成的方向演示，只说明提示词结构可以驱动什么视觉，不证明目标模型效果。
- `REFERENCE`：上游案例参考，不是本研究提示词的运行结果。
- `VERIFIED`：总分达到 21/25、关键维度不低于 3，且至少两次复测稳定。

## 12 项实验

| 路线 | 编号 | 最小实验 | 主要验证点 | 当前状态 |
| --- | --- | --- | --- | --- |
| A 内容与文字 | E01 | 引语卡片 | 中文准确度与版式层级 | EXECUTED / NOT VERIFIED |
| A 内容与文字 | E02 | 产品信息图 | 高密度信息组织 | EXECUTED / NOT VERIFIED |
| A 内容与文字 | E03 | 事实型地图 | 知识约束与艺术表达分离 | CODEX DEMO / FACT CHECK PENDING |
| B 参考与一致性 | E04 | 照片转手绘头图 | 风格迁移中的结构保留 | CODEX DEMO / NOT IDENTITY VERIFIED |
| B 参考与一致性 | E05 | 商业肖像 | 人物身份保持 | CODEX DEMO / NOT IDENTITY VERIFIED |
| B 参考与一致性 | E06 | 四格叙事 | 同人同物跨格连续性 | UPSTREAM REFERENCE / PROMPT NOT RUN |
| C 视觉与资产 | E07 | 玻璃涡轮 | 材质、光学与负面约束 | CODEX DEMO / GEMINI UNVERIFIED |
| C 视觉与资产 | E08 | 机械鲸地下教堂 | 复杂场景分层与尺度 | CODEX DEMO / GEMINI UNVERIFIED |
| C 视觉与资产 | E09 | LED 商业肖像 | 灯光与品牌色控制 | CODEX DEMO / GEMINI UNVERIFIED |
| D 模板与迭代 | E10 | 短提示词对照结构化提示词 | 复现性与可诊断性 | CODEX BOARD / INDEPENDENT A/B PENDING |
| D 模板与迭代 | E11 | 本地化改版 | 只替换文字与画幅 | CODEX DEMO / GEMINI UNVERIFIED |
| D 模板与迭代 | E12 | 局部编辑 | 一次只改一个变量 | CODEX DEMO / GEMINI UNVERIFIED |

每项实验的研究意义、使用场景、完整提示词、输入要求、通过条件和当前证据在 Web Prompt Lab 中呈现；Gemini 结果见 [E01](../../research/01-awesome-nano-banana-pro-prompts/runs/E01/README.md) 与 [E02](../../research/01-awesome-nano-banana-pro-prompts/runs/E02/README.md)，Codex 演示边界见 [演示记录](../../research/01-awesome-nano-banana-pro-prompts/runs/codex-demo/README.md)。

## 统一评分量表

| 维度 | 权重 | 核心问题 |
| --- | ---: | --- |
| 指令遵循 | 25% | 主体、动作、文字和布局是否按要求出现？ |
| 一致性 | 25% | 人物、产品或场景在变体中是否稳定？ |
| 视觉控制 | 20% | 构图、镜头、光线、材质与色板是否命中？ |
| 文字与事实 | 15% | 文字是否准确，事实与数据是否可核验？ |
| 实际可用性 | 15% | 是否可进入当前内容、视频、Web 或游戏流程？ |

晋级条件：总分至少 21/25；关键维度没有低于 3；至少两次复测稳定；保留模型、平台、输入图与参数记录。

## 5 个候选模板

1. `T01` 高密度产品信息图
2. `T02` 身份保持商业肖像
3. `T03` 多格一致叙事
4. `T04` 材质驱动视觉资产
5. `T05` 单变量局部编辑

这些是从案例结构中归纳出的可复制骨架，不是从上游仓库大段复制的原提示词，也不是已经验证的模型效果。

## 执行边界

后续只在真实需求出现时继续实验，优先顺序为：E02 至少两次复测、E10 两次独立 A/B、E03 地理事实核验、ImageGen 稳定后重试 E06。每次继续都应记录模型版本、平台、输入、输出、耗时、成本和评分。当前探索阶段不建设数据库、投稿审核、多语言社区或自动推荐系统。
