# Column Proxy Pipeline State

~~~text
Experiment: zuoer-tingfeng / column-proxy
Updated: 2026-08-28
Scope: 119-article column proxy corpus
Run mode: strict RIA-TV++, controlled pilot
Current gate: Stage 5C intake infrastructure ready; awaiting 1-3 authorized, redacted user-organization incidents
Status: stage5c-intake-ready-awaiting-authorized-cases
~~~

## 已完成

- [x] 固定来源仓库、子树、提交和 subtree OID
- [x] 以 sparse checkout 获取 119 篇 Markdown 与 162 张图片
- [x] 核验本地语料被 Git 忽略
- [x] 登记来源、规模、许可风险和 Book Track 边界
- [x] 建立全量文件、标题、篇幅和专题结构索引
- [x] 完成 Adler 结构、解释、批判和应用四步理解
- [x] 用 Go、Hystrix 和神经影像一手来源校验关键边界
- [x] 生成 BOOK_OVERVIEW.md
- [x] 用户确认 BOOK_OVERVIEW.md

## Stage 0 确认记录

用户于 2026-08-28 00:45:42 +08:00 确认 Stage 0，并要求先交付 Stage 1 完整报告，再讨论后续筛选。

## 当前执行

- [x] framework extractor：39 条
- [x] principle extractor：108 条
- [x] case extractor：50 条
- [x] counter-example extractor：30 条
- [x] glossary extractor：20 条
- [x] Stage 1 汇总报告与统一审计：总计 247 条
- [x] Stage 1.5 受控试点：故障复盘候选聚类、V1/V2/V3 和外部需求校准
- [x] 原“线上故障复盘”因 V3 不足记录为 reject-as-standalone
- [x] 修订候选“系统性故障学习审查”暂时通过
- [x] 冻结 18 个五态测试案例并通过结构校验
- [x] 用户确认“系统性故障学习审查”进入 Stage 2
- [x] 构造 `incident-learning-audit` v0.1.0：RIA++ 六段、8 个执行步骤、5 种路由、2 个按需参考和 UI 元数据
- [x] 通过 skill-creator 官方静态验证与项目 Stage 2 不变量验证
- [x] 将 18 个冻结案例转为 darwin 测试，并补 1 个同源架构能力混淆题
- [x] v0.1.0 第一轮三位独立 Agent 盲测：16 / 19，负例 6 / 6
- [x] 依据三个真实失败修订 A2 / E / B 与路由参考，形成 v0.1.1
- [x] 三位全新 Agent 聚焦复测：3 / 3
- [x] 三位全新 Agent 全量回归：19 / 19，负例零误触发
- [x] 生成 `test-prompts.json`、`test-results.md`、原始输出、评分和 Stage 4 机器校验
- [x] 按 Codex 官方仓库级规则安装到 `.agents/skills/incident-learning-audit`
- [x] 安装源与目标 6 / 6 文件 SHA-256 一致
- [x] 全新只读临时 Codex 显式发现与 `full_review` 路由通过
- [x] 不写 Skill 名称时事故语义隐式触发通过
- [x] 纯未来架构选型负例不触发
- [x] 生成 Stage 5A 安装/使用报告、完整复盘示例与可复跑校验
- [x] 完成 Cloudflare 2019 WAF 全球中断真实公开案例的五模式、八段输出、证据账本、因果证伪、行动合同与闭环评分演示
- [x] 建立 Stage 5C 授权脱敏门、案例模板、独立复核协议和自动就绪度校验

## 后续未开始

- [x] Stage 1：五路候选提取
- [ ] 全量合并 247 条候选并保留各路证据（故障复盘聚类已完成）
- [ ] Stage 1.5 全量三重验证（首个故障复盘试点已完成）
- [x] 用户轻确认“系统性故障学习审查”试点候选
- [x] Stage 2 首个 Skill：RIA++ 构造与静态验证
- [ ] Stage 2：其余通过候选的全量 Skill 构造
- [ ] Stage 3：关系图与术语词典
- [x] Stage 4：首个 Skill 的独立合成压力测试与结果文件
- [x] Stage 5A：首个 Skill 的项目级受控安装与宿主冒烟
- [x] Stage 5B：首个 Skill 的真实公开事故完整演练与 Web 交互验收
- [x] Stage 5C 接入基础：真实组织案例模板、授权/脱敏门、验收协议和自动校验
- [ ] Stage 5：用户组织事故效度、至少三项核心方法的 DIGEST、关系图和实验交付

Stage 3 关系图暂缓不是质量绕过，而是因为当前只有一个正式 Skill，无法建立有意义的 Skill-to-Skill 依赖、对比和组合关系。首个 Skill 已完成构造、合成压力测试、项目安装与真实公开事故演练；完整 Stage 5 仍需用户组织材料、多项核心方法和跨 Skill 组合验证。

## 不变量

- 全部输出标记为 Column Proxy，不冒充纸质书。
- 第三方镜像正文不提交、不重分发、不长篇引用。
- 稳定原则与时点技术分离；技术产品进入执行建议前重新验证。
- 职业建议先收集现实约束，不采用羞耻或单一路径叙事。
- 架构建议必须带不适用条件、代价和替代方案。
