# Design Contract Revision 2 — Experiment Track

```text
Entry mode: Revision-led implementation
Request revision: 2
Target user and context: 已理解能力地图，准备进入小样本验证的个人开发者/小团队
Desired first impression: 研究已经从“看懂能力”推进到“知道先测什么、怎样评分、何时停止”
Visual ambition: Functional + Editorial
Experience architecture: Editorial Flow
Visual constraints: 保留现有研究站的色彩、字体和信息层级；实验页面更偏工具化
Information constraints: 明确区分 planned、executed 和 verified；不得把候选模板描述为已验证模板
Operation constraints: 静态页面；不调用 Gemini、不登录、不触发生成或计费
State constraints: 能力路线筛选、实验详情、模板复制成功/失败反馈、明暗主题
Environment constraints: 原生 HTML/CSS/JS；GitHub Pages 与本地静态服务器
Primary journey: 选择实验路线 → 查看 12 条测试 → 理解评分维度 → 复制候选模板 → 到有权限的 Gemini 环境执行
User-defined phases: 确定并继续；进入 10–12 条小样本实验阶段
Required artifacts: 实验工作台、12 条实验矩阵、5 个候选模板、执行边界、浏览器验收记录
Autonomy authorization: 用户明确“确定并继续”
User-decision boundary: 提供或使用真实 Gemini API/账号、触发可能计费的生成、上传私人参考图
Observable completion criteria: 12 条实验按能力分层；5 个模板可复制；状态诚实；桌面/平板/390px 可用；无控制台错误
Coverage record: VALIDATION_REVISION_2.md
```

## Preserved evidence

- Revision 1 的首屏、能力架构、8 个案例、案例弹窗、主题与三种视口证据不受影响。
- 本轮只新增实验路线，不重新设计主站视觉系统。

## New information flow

```text
能力地图（已完成）
→ 实验工作台（本轮新增）
→ 12 条计划实验
→ 统一评分量表
→ 5 个候选模板
→ 真实 Gemini 环境执行（需后续权限）
```

## Stop boundary

本轮完成“可执行实验设计”，不声称完成 Nano Banana Pro 实测。只有获得明确的 Gemini 调用环境和可能计费授权后，才把实验状态从 planned 更新为 executed/verified。
