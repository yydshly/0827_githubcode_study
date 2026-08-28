# cangjie-skill 验证记录

## 基准

```text
Date: 2026-08-27 to 2026-08-28
OS: Windows
Upstream commit: 5f03a4cd8b521673f7a67ca6279330ec943bb369
Upstream commit date: 2026-08-26T13:20:17+08:00
Upstream tag: v2.0.0 available
License: MIT
Representative sample: kangarooking/buffett-letters-skill
Sample commit: 5b1fbe1d93f155fcf4acf236841bf8e1b5951c91
```

上游源码作为 Git submodule 保存在 `studies/cangjie-skill/upstream/`，没有安装到任何全局 Skills 目录。代表性样例使用 shallow clone 保存在 `tmp/cangjie-buffett-sample/`，只用于本轮对照审计。

## 1. 源码资产验证

### 文件构成

```text
Markdown                18
Output templates         5
Methodology documents    8
Extractor prompts        5
Python scripts           1
GitHub Actions           1
```

发现：

- 唯一 Python 脚本是 `scripts/generate_star_history.py`。
- 唯一 Actions 工作流只定时更新 Star History SVG。
- 不存在蒸馏主流程 CLI、模型客户端、文档解析器、任务状态机或自动评测 runner。
- 因此主能力来自宿主 Agent 对 Markdown 规范的解释和执行，而不是本仓库中的应用代码。

### Python 工具检查

执行：

```powershell
python -m py_compile scripts/generate_star_history.py
python scripts/generate_star_history.py --help
```

结果：编译和帮助命令通过。未调用 GitHub API，因为该脚本与核心蒸馏能力无关，而且完整执行需要 `GITHUB_TOKEN`。

## 2. 测试模板验证

使用 PowerShell `ConvertFrom-Json` 解析 `templates/test-prompts.json.template`。

结果：

```text
JSON parse: passed
should_trigger: 3
should_not_trigger: 2
edge_case: 1
```

这满足上游规范声明的最低测试类型数量。模板还要求至少一个 `should_not_trigger` 指向同书兄弟 Skill，但这一语义约束目前没有机器校验器。

## 3. 输出模板覆盖

根据根 `SKILL.md` 声明的交付结构，对照 `templates/`：

| 产物 | 模板存在 |
| --- | --- |
| `PIPELINE_STATE.md` | 否 |
| `BOOK_OVERVIEW.md` | 是 |
| `verified.md` | 否 |
| `INDEX.md` | 是 |
| `GLOSSARY.md` | 否 |
| `DIGEST.md` | 是 |
| `<skill>/SKILL.md` | 是 |
| `<skill>/test-prompts.json` | 是 |
| `<skill>/test-results.md` | 否 |

结论：输出合同覆盖不完整。缺少模板并不阻止 Agent 写文件，但会增加模型间和运行间格式漂移，降低自动校验与批量消费能力。

## 4. 官方代表样例审计

抽查对象：<https://github.com/kangarooking/buffett-letters-skill>

### 结构结果

```text
Skill directories: 20
SKILL.md: 20
test-prompts.json: 20
test-results.md: 0
Invalid test JSON: 0
Test type coverage failures: 0
Skills missing any R/I/A1/A2/E/B section: 0
```

根产物：

```text
PIPELINE_STATE.md: missing
BOOK_OVERVIEW.md: present
verified.md: present
INDEX.md: present
GLOSSARY.md: missing
DIGEST.md: missing
candidates/: present
rejected/: present
```

测试审计信息：

- 20 份测试文件的 `minimum_pass_rate` 都是 `0.8`。
- 2 个 Skill 明确记录“测试通过率：待阶段 4 验证”。
- 其余 18 个 Skill 有“验证通过 V1/V2/V3”，但没有测试通过率字段。
- 没有 `test-results.md`，因此无法重放或核验压力测试是否执行。

### 证据解释

已验证：

- RIA++ 六段结构可以被实际产出到一组 20 个 Skill 中。
- Skill frontmatter 包含来源、章节、标签和关联 Skill。
- 每个 Skill 都有合法的正向、负向和边界测试 JSON。
- 官方样例保留 candidates、rejected 和 verified 审计层。

未验证：

- V1/V2/V3 是否由独立 Agent 严格执行，而不只是写入“已通过”标记。
- 压力测试是否真正运行，以及实际路由通过率。
- 引用内容和年份是否逐条忠实于原始股东信。
- 20 个 Skill 在 Claude、Cursor、DeepSeek 或 Codex 中的真实自动触发精度。
- 当前 `main` 规范能否稳定生成 `PIPELINE_STATE`、`GLOSSARY`、`DIGEST` 和测试结果。

样例生成时间为 2026-04-16，早于当前上游提交约四个月。缺失项可能来自旧版流程，因此本轮只将其作为“当前公开样例不足以证明完整执行”的证据。

## 5. 初步风险登记

| 风险 | 影响 | 后续验证 |
| --- | --- | --- |
| 生成和判定使用相近模型 | 同源偏差，测试容易过拟合 | 使用独立模型与人工盲评 |
| V1 是书内多语境，不是外部证据 | 错误观点可能被稳定固化 | 增加 external evidence 层 |
| 输出多为自由 Markdown | 格式漂移和难以自动消费 | 定义 JSON Schema 并加 lint |
| synthetic prompts 由生成流程编写 | 覆盖不足、结果偏乐观 | 先冻结人工测试集再生成 |
| 五个 Agent 重复读取长内容 | Token 和时间成本高 | 记录分块缓存、成本与方差 |
| Skill 数量增长 | 路由冲突和上下文膨胀 | 建立混淆矩阵和分层路由 |
| 缺少执行器和遥测 | 无法批量运行、回归、回滚 | 自建 state machine 与 registry |

## 6. 下一轮验证设计

停止静态分析并进入实跑前，需要准备：

1. 一份版权清晰、约 1–3 万字、方法论密度适中的固定文本。
2. 一组在生成前冻结的真实用户问题。
3. 普通摘要、直接 Skill 和 RIA-TV++ 三个对照组。
4. 独立判卷模型及人工复核规则。
5. Token、耗时、文件产物、引用、路由结果和重跑方差记录器。

建议验收指标：

```text
Route precision / recall
Sibling-skill confusion rate
Execution rubric score
Citation support rate
Human usefulness score
Token and wall-clock cost
Cross-run variance
```

## 7. 受控案例与 Web 发布验证

后续用《左耳听风》公开专栏镜像建立独立的 `Column Proxy Track`。它只用于验证工作流，不等同于纸质书，第三方正文和图片也不纳入远端提交。

受控案例结果：

```text
Stage 0–1 candidates: 247
Stage 1.5 pilot: 1 candidate narrowed and confirmed
Formal skills: 1 (incident-learning-audit v0.1.1)
Stage 4 final regression: 19 / 19
Negative false positives: 0
Stage 5A repo-level installation: passed
Stage 5B public incident audit: passed
Stage 5C organization cases: 0 (intake contract ready)
```

这证明当前方法能在一个代理语料和一个 Skill 上走完“提取、淘汰、构造、盲测、安装、公开案例演示”的链路，但不能证明批量扩展、跨来源稳定性或真实组织外部有效性。

静态 Web 发布副本在 `docs/cangjie-skill/` 验证，测试地址使用与 GitHub Pages 等价的子路径 `http://127.0.0.1:4180/cangjie-skill/`。Revision 11 的浏览器回归覆盖：

- 1440 × 1000 浅色桌面；
- 768 × 1024 深色平板；
- 390 × 844 浅色移动端；
- 1024 × 768 Reduced Motion；
- 页面、8 个静态资源和结构化数据均返回 HTTP 200；
- 6 项能力、8 类来源、7 个阶段、9 个生态项目、6 个案例均与目录合同一致；
- 所有表面均无横向溢出、无控制台错误。

对应自动验证：

```powershell
npm run check
$env:DEMO_URL='http://127.0.0.1:4180/cangjie-skill'
npm run verify:browser
```

两项命令均通过。发布方式与提交边界见 [`PUBLISHING.md`](PUBLISHING.md)。
