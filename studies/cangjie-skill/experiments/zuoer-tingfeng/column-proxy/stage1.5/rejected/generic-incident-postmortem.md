# 淘汰记录：通用线上故障复盘

~~~yaml
candidate: generic-incident-postmortem
source_primary: f06
decision: reject-as-standalone
failed_gate: V3_exclusivity
salvage: revise-to-incident-learning-audit
~~~

## 淘汰原因

原候选中的“记录时间线、分析影响、使用 5 Whys、无责复盘、形成行动项”具有明确需求，也能跨场景应用，但已经是 Google SRE、AWS Well-Architected 等公开工程体系中的常规实践。

若把它直接包装成 Skill，主要价值只是复述一份通用 postmortem 模板，Codex 本身已经具备大量同类知识，无法通过严格的 V3 独特性检验。

## 保留内容

没有删除来源候选。以下组合被收窄并转入 `incident-learning-audit`：

- 从技术诱因继续追到工程、管理和文化条件；
- 用系统治理替代个人惩罚；
- 审查整改是否增加不必要的流程和系统复杂度；
- 要求举一反三、简化系统并用复发验证关闭学习环。

这是一条“修订后保留”的审计轨迹，不代表 `f06` 及相关证据失效。
