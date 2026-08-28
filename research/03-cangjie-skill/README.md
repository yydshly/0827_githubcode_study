# 研究项目 03：cangjie-skill

> 状态：`archived`，库级研究和首个完整受控案例已经收束  
> 页面：`published`，<https://yydshly.github.io/0827_githubcode_study/cangjie-skill/>  
> 研究日期：2026-08-28  
> 上游仓库：<https://github.com/kangarooking/cangjie-skill>  
> 固定提交：`5f03a4cd8b521673f7a67ca6279330ec943bb369`

## 一句话结论

`cangjie-skill` 不是自动跑完长内容蒸馏的软件引擎，而是一套由宿主 Agent 执行的 **Skill Factory 方法、元 Skill、提示词和交付模板**：把书籍、课程、访谈、播客等来源里的程序性知识，转换为有触发条件、执行步骤、边界和测试资产的 Agent Skills。

## 已完成的研究

- 梳理 8 类输入来源、6 项库级能力和 RIA-TV++ 七阶段流水线。
- 核查上游非单本书案例，并区分完整案例、方向参考和分发标准。
- 比较同类库与产品，形成“生产、发现、质量、运行、分发”五层生态图。
- 用《左耳听风》公开专栏镜像做独立代理语料实验；该语料不等于纸质书，也没有把正文提交进本仓库。
- 从 247 条候选中完成 `incident-learning-audit` 的构造、19 / 19 路由压力回归、Codex 仓库级安装，以及 Cloudflare 2019 公开事故案例审计。
- 形成可直接访问的库级 Web，说明能力、使用方式、案例、生态、价值和重新启动条件。

## 对我们的价值

最值得复用的不是“把一本书都变成 Skills”，而是四份工程合同：

1. 触发合同：什么问题应调用，什么相似问题不应调用。
2. 执行合同：被调用后按什么步骤产出什么结构。
3. 边界合同：证据不足、跨域或高风险时如何停下和降级。
4. 验证合同：同时覆盖正向、诱饵、边界和兄弟 Skill 冲突。

当前不建议继续抽象研究。只有出现明确产品需求、合法内容、目标宿主和真实评测集时，才值得恢复项目并扩展第二个 Skill。

## 研究入口

- [完整研究结论](../../studies/cangjie-skill/README.md)
- [库能力与落地说明](../../studies/cangjie-skill/LIBRARY_CAPABILITY_GUIDE.md)
- [同类生态比较](../../studies/cangjie-skill/ECOSYSTEM_COMPARISON.md)
- [上游案例目录](../../studies/cangjie-skill/UPSTREAM_CASE_CATALOG.md)
- [验证记录](../../studies/cangjie-skill/VALIDATION.md)
- [发布与复现说明](../../studies/cangjie-skill/PUBLISHING.md)
- [受控实验](../../studies/cangjie-skill/experiments/zuoer-tingfeng/)
