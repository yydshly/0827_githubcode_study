# Stage 5A 项目级安装与使用验证报告

## 结论

**Stage 5A 通过：`incident-learning-audit` v0.1.1 已安装到当前仓库，并被全新只读临时 Codex 进程真实发现。**

这证明首个从《左耳听风》公开专栏代理语料蒸馏出的 Skill，已经从“研究目录中的文件”进入“当前项目可被 Agent 调用的能力”。它还不代表完整 Stage 5：真实组织事故外部效度、三项以上核心方法的 DIGEST、Stage 3 能力网络和跨仓库分发都未完成。

## 安装范围

- 官方发现规则：Codex 从当前目录向仓库根扫描 `.agents/skills`，支持显式 `$skill-name` 和基于 description 的隐式触发。
- 安装位置：`E:\0827_codex_project\.agents\skills\incident-learning-audit`
- 范围：`REPO`，只对当前仓库及其子目录生效。
- 未执行：没有写入用户级、全局或管理员目录；没有发布插件。
- 完整性：源目录与安装目录均为 6 个文件，逐文件 SHA-256 一致。
- 行为版本：`0.1.1`；本阶段只更新审计状态，不改变方法和路由合同。

官方依据：[Build skills / Where Codex loads local skills](https://developers.openai.com/codex/skills)

## 宿主验证

所有调用都由工作区根目录启动新的 `codex exec --ephemeral --json -s read-only` 进程，不复用当前任务记忆，不允许修改文件。

| 场景 | 是否写出 Skill 名称 | 观察结果 | 判定 |
| --- | --- | --- | --- |
| 已恢复支付事故，证据未完整枚举 | 是 | 实际读取项目内 `SKILL.md` 和 `evidence-and-routing.md`；版本 `0.1.1`；路由 `full_review` | 显式发现通过 |
| 已恢复库存事故，草稿归因为操作失误，整改是培训和审批 | 否 | 自动选择 `incident-learning-audit`；实际读取项目内文件；路由 `full_review` | 隐式触发通过 |
| 尚未发生事故，比较 Kafka 与 RabbitMQ | 否 | `incident_learning_audit_used=false`；没有强套事故复盘方法 | 负例边界通过 |

### 关键输出摘录

显式调用：

~~~json
{
  "skill_name": "incident-learning-audit",
  "skill_file": "E:\\0827_codex_project\\.agents\\skills\\incident-learning-audit\\SKILL.md",
  "version": "0.1.1",
  "route": "full_review",
  "references_read": ["evidence-and-routing.md"]
}
~~~

隐式触发：

~~~json
{
  "selected_skill": "incident-learning-audit",
  "route": "full_review",
  "first_action": "建立证据账本，核验发布、告警延迟和回滚时间线，将操作失误降为直接诱因候选。"
}
~~~

负例：

~~~json
{
  "incident_learning_audit_used": false,
  "selected_skill": null,
  "reason": "事故发生前的消息队列架构选型，不涉及事故复盘、根因分析或系统学习闭环。"
}
~~~

## 能力落地演示

[DEMO_FULL_REVIEW.md](DEMO_FULL_REVIEW.md) 把一份合成的价格服务事故材料完整推进为：

1. 五态路由中的 `full_review`；
2. 事实、假设、未知和冲突分离的证据账本；
3. 用户影响时间线；
4. 从直接触发到工程控制、发现机制和责任边界的因果阶梯；
5. 对培训、主管审批和仪表盘三类表面整改的审查；
6. 带风险机制、优先级、验收证据和失败条件的行动；
7. 复查日期、复发验证和关闭条件。

示例没有把个人操作失误当作根因终点，也没有虚构负责人和日期。

## 运行时观察

两次要求嵌套 CLI 生成完整长篇复盘时，进程均已正确读取 Skill、路由协议和输出契约，但在多个连续 30 秒轮询中没有给出最终正文，最终由控制任务人工中断。短路由输出均正常完成。

这不是 Skill 发现或路由失败，但暴露了一个交付性能风险：

- 当前环境安装的 Skill / Plugin 很多，Codex 明确提示初始 Skill 描述被压缩以适应上下文预算；
- 完整模式需要读取 `SKILL.md` 和两份参考文件，嵌套运行的输入上下文明显增大；
- Stage 5A 因此把“加载与路由正确”判定为通过，把“长文本时延”登记为非阻断观察，不能冒充完整延迟验收。

后续应使用代表性真实材料建立首 token、总耗时、输入/输出 token 和成功率基线；关键生产流程宜显式调用 `$incident-learning-audit`，并减少无关 Skill/Plugin 的启用数量。

## 现在怎样使用

显式调用适合正式复盘：

~~~text
$incident-learning-audit
审查下面这份已经恢复的生产事故复盘。先判断响应模式，再建立证据账本、因果阶梯和可验收行动；缺失内容写未知，不要补写。
[粘贴脱敏材料]
~~~

隐式调用适合日常提问：

~~~text
这份故障复盘把根因写成“操作失误”，整改是培训和加审批。请判断是否治本，并给出可验收的行动。
~~~

活动事故仍在扩大时，它只做阶段门和交接，不替代止损：

~~~text
$incident-learning-audit
事故仍在扩大。只做 active_handoff：列当前风险、恢复优先级、应保全证据和进入复盘的客观条件，不展开长期整改。
~~~

## 对我们的价值

- **把知识资产变成调用协议**：不是记住书中观点，而是让 Agent 在正确问题上执行同一套证据与边界纪律。
- **减少表面复盘**：对“人为失误、培训、审批、加监控”自动追问其系统机制和验收条件。
- **可审计**：来源、版本、触发条件、参考协议、压力测试、安装位置和真实宿主输出均可追溯。
- **可迭代**：Stage 4 的失败已经反向改写 Skill；Stage 5A 又暴露上下文预算和长输出时延问题。
- **可控扩散**：先仓库级安装，不影响其他项目；验证稳定后再决定用户级安装或插件分发。

## 本阶段没有证明什么

- 没有使用获授权、脱敏的真实组织事故材料；
- 没有证明该方法能提升真实事故率、MTTD、MTTR 或组织文化；
- 没有完成 247 条候选的全量 Stage 1.5；
- 没有完成三项以上核心方法的 DIGEST；
- 没有建立多 Skill 的 Stage 3 关系图；
- 没有证明所有模型、主机和大规模 Skill 集下的延迟都可接受。

## 下一质量门

优先顺序：

1. 用 1–3 份合法、脱敏、获授权的真实事故材料做外部效度试点；
2. 固化延迟与 token 基线，确认显式调用和隐式触发在日常环境中的稳定性；
3. 从“学习能力”和“架构权衡”各推进一个 Stage 1.5 → Stage 4 Skill；
4. 有至少三个正式核心 Skill 后建立 Stage 3 关系图与完整 DIGEST；
5. 只有需要跨项目或团队分发时，才评估插件封装。

## 判定

- Stage 5A 项目级安装：**PASS**
- 安装完整性：**PASS（6 / 6）**
- 显式发现：**PASS**
- 隐式触发：**PASS**
- 负例边界：**PASS**
- 完整长输出时延：**OBSERVED / 需单独基准**
- 真实事故外部效度：**NOT STARTED**
- 完整 Stage 5：**NOT COMPLETE**
