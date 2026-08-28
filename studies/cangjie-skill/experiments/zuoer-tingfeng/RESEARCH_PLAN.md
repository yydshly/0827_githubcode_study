# 对照实验计划

## 目标

用同一份完整正文比较三种知识加工方式，判断 cangjie-skill 是否带来可测量增益。

## 三个对照组

| 组别 | 生成方式 | 目的 |
| --- | --- | --- |
| A：摘要 | 要求模型生成整书摘要和行动建议 | 测量普通内容压缩基线 |
| B：直接 Skill | 一次性要求模型从整书生成若干 Skills | 测量没有 RIA-TV++ 质量门的基线 |
| C：Cangjie | 完整执行阶段 0–5 | 测量结构、验证、边界和测试的增益及成本 |

三个组使用相同正文、同一主模型和相近输出预算。评测题在生成前冻结，不能由负责生成 C 组的 Agent 编写全部题目。

## 评测集分层

### 路由题

- 明确应触发某个 Skill；
- 明确不应触发任何 Skill；
- 应触发同域兄弟 Skill；
- 跨域组合问题；
- 日常小问题诱饵；
- 技术事实查询诱饵；
- 含过时假设的问题。

### 执行题

- 职业成长方案；
- 技术学习路线；
- 代码质量诊断；
- 架构取舍；
- 研发效率诊断；
- 绩效、招聘和远程协作案例。

### 证据题

- 是否能定位到实际章节或页码；
- 引用是否支持推导结论；
- 是否把网络文章或极客时间专栏误写成书中证据；
- 是否标记作者观点、行业共识和当前事实之间的区别。

## 指标

```text
Route precision
Route recall
No-trigger accuracy
Sibling-skill confusion rate
Cross-domain composition success
Execution rubric score
Citation support rate
Unsupported-claim rate
Human usefulness score
Token cost
Wall-clock time
Cross-run variance
```

## 额外实验：层级路由

由于本书横跨个人、技术和组织三个主要知识域，比较两种部署方式：

```text
扁平路由：所有 Skill 在同一候选池

层级路由：
  先选 personal / engineering / organization
  再选原子 Skill
```

如果层级路由显著降低兄弟 Skill 冲突，应把领域层写入我们的 Skill Registry，而不是只依赖 `related_skills` 文档字段。

## 通过标准

Cangjie 组只有同时满足以下条件，才值得进入下一步工程化：

1. 路由 precision 和 recall 均高于两个基线组；
2. 所有负向诱饵通过；
3. 引用支持率不低于预设阈值，并可人工复查；
4. 兄弟 Skill 混淆率处于可接受范围；
5. 相对直接 Skill 组的质量提升足以解释额外 Token 和时间成本；
6. 第二次独立运行不会产生完全不同的 Skill 边界。

## 当前阻塞

缺少用户合法提供的整书正文，因此不能开始对照生成和评测。

