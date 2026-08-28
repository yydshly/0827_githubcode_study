# Stage 1.5 试点通过单元

> 当前只覆盖首个“线上故障复盘”候选聚类，不代表 247 条候选已完成全量 Stage 1.5。

~~~yaml
id: incident-learning-audit
title: 系统性故障学习审查
type: revised-framework
status: provisional-pass-pending-user-confirmation
source_cluster:
  primary: [f06]
  merged: [f07, p036, p037, p038, p039, p040, p041, p050, ce02, ce03, g15, g20]
  cases: [case-019, case-020, case-021, case-022]

V1_cross_domain:
  passed: true
  evidence:
    - "第 18 讲：事故材料用时间线、连续追因和整改闭环转化为组织学习"
    - "第 10 讲：领导方式决定错误被用于解决系统问题，还是用于制造畏惧"
    - "第 22 讲：分布式服务的故障暴露服务责任、协作、自动化和组织结构"
    - "第 24 讲：用户 SLA 与跨层监控决定复盘能否获得完整证据"
  independence_reason: "四处分别处理复盘流程、领导行为、分布式责任和观测系统，不是同一案例换写。"

V2_predictive_power:
  passed: true
  novel_question: "AI 助手生成的错误配置造成生产故障，整改是否应该直接禁用 AI？"
  derived_answer: "不把工具或操作者当终止根因；继续审查配置验证、发布门、金丝雀、回滚和授权机制，并用可注入的同类错误验证整改。"
  non_triviality: "结论同时保留工具来源审计，又反对用禁用工具替代系统控制。"

V3_exclusivity:
  original_candidate_passed: false
  revised_candidate_passed: true
  confidence: provisional
  common_part: "时间线、影响、根因、无责和行动项已经是通用 SRE 实践。"
  unique_increment: "把复盘变成四项审查：是否停在个人/工具归责、是否只补局部洞、是否通过审批或旁路系统增加复杂度、是否用跨层整改和复发验证关闭学习环。"

external_demand:
  status: confirmed
  evidence:
    - "Google SRE 把 postmortem 定义为事故、影响、处置、原因和防复发行动的正式学习机制。"
    - "AWS Well-Architected 要求无责、深入促成因素、标准记录、共享经验和可跟踪整改。"
    - "Microsoft Azure Well-Architected 把事故审查、演练、通信和生产监控反馈列为运维成熟度要求。"

decision: "进入用户轻确认；确认后才进入 Stage 2 构造正式 Skill。"
~~~

外部校准来源：

- [Google SRE — Postmortem Culture: Learning from Failure](https://sre.google/sre-book/postmortem-culture/)
- [AWS Well-Architected — Perform post-incident analysis](https://docs.aws.amazon.com/wellarchitected/2023-10-03/framework/rel_testing_resiliency_rca_resiliency.html)
- [Microsoft Azure Well-Architected — Operational Excellence maturity model](https://learn.microsoft.com/en-us/azure/well-architected/operational-excellence/maturity-model)
