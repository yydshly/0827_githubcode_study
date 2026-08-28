# Stage 4 独立压力测试报告

> 范围：`incident-learning-audit` 单能力闭环；使用合成案例验证触发、路由、边界和行动质量，不涉及用户真实事故材料。

## 结论

`incident-learning-audit` 在 v0.1.0 第一轮盲测中得到 16 / 19，暴露三处路由歧义。依据真实失败做最小修订后形成 v0.1.1；聚焦复测 3 / 3，随后由三位全新独立评测代理完成全量 19 题回归，最终 **19 / 19 通过**，其中 6 个不应触发案例全部正确拒绝或转交，误触发为 0。

Stage 4 合成压力测试门因此通过。Skill 仍只位于研究仓库内，尚未安装，也尚未通过真实组织事故材料的外部效度评估。

## 测试设计

- 原 Stage 1.5 冻结案例：18 个。
- 为满足同源能力混淆硬要求，增加 1 个纯架构评审诱饵：S01。
- 最终分布：8 个 `should_trigger`、5 个 `edge_case`、6 个 `should_not_trigger`。
- 评测隔离：只给技能快照、按需参考、相邻能力目录和不带答案的提示。
- 判分分离：评测代理只返回行为；主代理按冻结 oracle 判分。
- 验收线：总通过率 100%，所有不应触发题必须通过。

## 三轮结果

| 轮次 | 版本 | 题数 | 通过 | 负例误触发 | 结论 |
| --- | --- | ---: | ---: | ---: | --- |
| Round 1 | 0.1.0 | 19 | 16 | 0 | 84.2%，允许定向修订，不需要重做 Stage 2 |
| Round 2 | 0.1.1 | 3 | 3 | — | 原失败全部纠正，但不作为最终验收 |
| Round 3 | 0.1.1 | 19 | 19 | 0 | 100%，Stage 4 合成门通过 |

## 失败如何改变了 Skill

1. **混合请求拆分**：纯处分请求继续不触发；事故整改与处分混合时，拒绝处分，但技术学习部分按证据状态继续。
2. **证据缺口判定**：提示未列日志不等于证据不存在；稳定且机制具体的事故先建账本，材料明确不可得才降级。
3. **活动事故所有权**：技能会触发并拥有 `active_handoff` 阶段门，但恢复执行由活动事故响应接管。

这些修改落在 A2、E、B 和 `evidence-and-routing.md`，没有扩大输出模板或引入未经观察的新能力。

## 可审计产物

- Oracle：`books/zuoer-tingfeng/incident-learning-audit/test-prompts.json`
- 技能内结果：`books/zuoer-tingfeng/incident-learning-audit/test-results.md`
- 首轮原始输出与评分：`round-01/evaluator-*/raw-results.json`、`round-01/grading.json`
- 聚焦复测：`round-02/evaluator-*/raw-results.json`、`round-02/grading.json`
- 最终回归：`round-03/evaluator-*/raw-results.json`、`round-03/grading.json`
- 机器校验：`validation.json`

## 边界与下一门

- 通过的是合成压力测试，不是线上事故处理认证。
- 不自动执行回滚、发布、配置、通知或生产取证。
- 不用于医疗、法律、证券或纯人员处分判断。
- 尚未安装到宿主 Skill 目录。
- 真实材料评测需要用户提供合法、脱敏且获授权的事故材料；这属于外部效度补充。
- 单个 Skill 不足以建立有意义的 Stage 3 能力关系图；Stage 3 等待第二个正式 Skill。
