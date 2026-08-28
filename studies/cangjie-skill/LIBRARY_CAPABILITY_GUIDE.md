# cangjie-skill 库能力说明

更新：2026-08-28  
上游基准：`5f03a4cd8b521673f7a67ca6279330ec943bb369`  
上游仓库：<https://github.com/kangarooking/cangjie-skill>

## 一句话定位

`cangjie-skill` 是一套把高价值长内容中的程序性知识，转换为可触发、可执行、可验证 Agent Skills 的元 Skill、方法规范和模板集合。

书籍只是输入之一。上游明确把“书”泛化为书籍、长视频转写、播客文字稿、课程、访谈、演讲、长文和资料集。只要内容中存在可迁移的方法、判断、步骤和边界，就可能进入这条流水线。

## 它不是哪些系统

- 不是普通摘要器或读后感生成器；
- 不是 RAG、向量数据库或知识问答系统；
- 不是模型训练或微调框架；
- 不负责视频下载、PDF/OCR、ASR 或版权材料获取；
- 不是自带模型客户端、任务队列、状态机和遥测的自动化 SDK；
- 不负责模仿作者人格与口吻，后者更接近 `nuwa-skill`。

## 六项核心能力

1. **整体理解**：先固定来源、版本和主旨，不从局部金句直接生产 Skill。
2. **五路提取**：从框架、原则、案例、反例和术语五个角度建立候选池。
3. **三重验证**：检查跨语境佐证、预测力和独特性，保留淘汰理由。
4. **RIA++ 构造**：把方法写成来源、解释、过去案例、未来触发、执行步骤和边界六段合同。
5. **关系与组合**：记录 depends-on、contrasts-with 和 composes-with，生成索引与调用路径。
6. **测试与交付**：设计正向、诱饵、边界和兄弟 Skill 混淆题，失败回炉，再生成可安装 Skill Pack。

## 七阶段产线

```text
Stage 0  整体理解       → BOOK_OVERVIEW
Stage 1  五路提取       → candidates
Stage 1.5 三重验证      → verified / rejected
Stage 2  RIA++ 构造     → */SKILL.md
Stage 3  关系链接       → INDEX / GLOSSARY
Stage 4  压力测试       → test-prompts / test-results
Stage 5  安装交付       → DIGEST / Skill Pack
```

## 三方责任边界

| 参与方 | 负责 | 不负责 |
| --- | --- | --- |
| cangjie-skill 仓库 | 方法规范、提取器 Prompt、模板、人工质量门和目录合同 | 不直接调用模型或自动运行全流程 |
| 宿主 Agent | 阅读、分块、调度子 Agent、生成文件、盲测和安装 | 不能替代来源授权、外部事实与人工效度判断 |
| 外部工具与组织 | OCR/ASR、媒体下载、权限、事实核验、运行遥测、版本与发布治理 | 不能绕过版权、隐私或专业责任边界 |

## 什么材料值得使用

优先选择同时满足以下条件的内容：

- 方法、判断条件或检查清单在多个场景中出现；
- 有案例、反例、来源位置和时代边界；
- 未来确实会被 Agent 重复调用；
- 能写出完成标准、停止条件和不适用场景。

如果目标只是摘要、检索或问答，使用普通总结/RAG更直接。纯小说、新闻事实、情绪表达、零散短内容、不可追溯或高度敏感材料通常不适合。

## 对我们的采用判断

把它作为内部 Skill Factory 的设计底座，而不是直接当作生产依赖。优先吸收 RIA++ 合同、候选/淘汰审计、路由混淆测试和关系类型；工程化时补充机器 Schema、可重放状态机、独立评测、成本遥测、版本注册、权限和回滚。

我们的《左耳听风》实验已进一步补齐独立盲测、机器校验、Codex 仓库安装、公开真实案例、组织案例接入门和 Web 验收，但这属于本研究扩展，不应倒写成上游仓库原生能力。

## 同类产品处于不同层

同类生态不能只用“谁能生成 `SKILL.md`”比较：

- [Skill Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) 和 [Leutenegger/book-to-skill](https://github.com/Leutenegger/book-to-skill) 更强于来源解析、结构化和知识型 Skill 打包；
- [noahnan-max/book-to-skill](https://github.com/noahnan-max/book-to-skill) 与 Cangjie 的方法蒸馏理念接近，但当前项目较新且没有开源许可证；
- [skill-factory](https://github.com/kingjly/skill-factory) 更强于 Skill 构造、来源治理、评测设计和失败驱动优化；
- [agent-skill-eval](https://github.com/tardigrde/agent-skill-eval) 负责在真实 Codex、Claude Code、OpenCode 工作区执行可重放行为评测；
- [Agent Skills Standard](https://agentskills.io/) 和 [skills.sh](https://skills.sh/) 分别解决格式兼容与发现分发，不负责内容蒸馏。

因此，我们更适合把 Cangjie 保留为“方法识别与能力蒸馏核心”，而不是把它扩展成包办所有层的单体系统。完整比较、风险和研究优先级见 [Agent Skill 内容转化生态比较](ECOSYSTEM_COMPARISON.md)。

## 相关入口

- [上游中文 README](https://github.com/kangarooking/cangjie-skill/blob/5f03a4cd8b521673f7a67ca6279330ec943bb369/README.zh-CN.md)
- [上游元 Skill](https://github.com/kangarooking/cangjie-skill/blob/5f03a4cd8b521673f7a67ca6279330ec943bb369/SKILL.md)
- [RIA-TV++ 总览](https://github.com/kangarooking/cangjie-skill/blob/5f03a4cd8b521673f7a67ca6279330ec943bb369/methodology/00-overview.md)
- [上游案例目录](UPSTREAM_CASE_CATALOG.md)
- [同类库与产品生态比较](ECOSYSTEM_COMPARISON.md)
- [我们的库级研究记录](README.md)
