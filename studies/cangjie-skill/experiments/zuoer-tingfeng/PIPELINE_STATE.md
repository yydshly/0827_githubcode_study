# Pipeline State

```text
Experiment: zuoer-tingfeng
Updated: 2026-08-28
Scope: whole book
Run mode: strict RIA-TV++, first controlled pilot
Book Track gate: Stage 0 source validation
Book Track status: blocked-on-authorized-full-text
Column Proxy gate: Stage 5B first Skill real public incident demonstration passed; user-organization validation and full Stage 5 pending
Column Proxy status: stage5b-first-skill-public-case-demonstration-pass
```

## 已完成

- [x] 核对正式书名、作者、出版社和 ISBN
- [x] 获取出版社公开的全书目录
- [x] 确认图书与极客时间同名专栏不能互相替代
- [x] 建立版权与来源边界
- [x] 建立前置结构假设
- [x] 建立三组对照实验设计
- [x] 用户确认以整本书为案例并按 cangjie-skill 流程执行
- [x] 核验用户提供的 119 篇 GitHub 专栏镜像，并登记为辅助对照语料
- [x] 用户确认建立独立 Column Proxy Track
- [x] 固定代理语料提交并完成 Stage 0 Adler 整体理解

## Book Track 尚未开始

- [ ] 接收用户合法提供的完整正文
- [ ] 记录正文版本、SHA-256、页码和 OCR 质量
- [ ] 阶段 0：Adler 整书理解
- [ ] 用户确认 `BOOK_OVERVIEW.md`
- [ ] 阶段 1：五路候选提取
- [ ] 阶段 1.5：三重验证和用户轻确认
- [ ] 阶段 2：RIA++ Skill 构造
- [ ] 阶段 3：关系图与词典
- [ ] 阶段 4：独立压力测试与结果文件
- [ ] 阶段 5：DIGEST 和实验交付

## Column Proxy Track

- [x] 获取并固定 119 篇代理语料
- [x] 建立语料清单、专题结构和版权边界
- [x] 阶段 0：Adler 整体理解
- [x] 用户确认 column-proxy/BOOK_OVERVIEW.md
- [x] 阶段 1：五路候选提取，共 247 条候选
- [x] 生成 column-proxy/STAGE1_REPORT.md
- [x] 阶段 1.5 受控试点：原“线上故障复盘”修订为“系统性故障学习审查”
- [x] 用户轻确认首个修订候选
- [ ] 阶段 1.5：其余候选的全量三重验证
- [x] 阶段 2 首个 Skill：`incident-learning-audit` v0.1.1 构造与静态验证
- [ ] 阶段 2：其余通过候选的全量 Skill 构造
- [ ] 阶段 3：关系图与词典
- [x] 阶段 4：三轮独立压力测试、失败修订与 19 / 19 全量回归
- [x] 阶段 5A：安装到当前仓库 `.agents/skills`，6 / 6 哈希一致，显式/隐式/负例宿主验证通过
- [x] 阶段 5B：Cloudflare 2019 WAF 全球中断公开案例的完整协议演练与 Web 验收
- [ ] 阶段 5：用户组织材料效度、至少三项核心 Skill 的关系图、DIGEST 和实验交付

## 恢复条件

当 `source/` 中出现用户合法提供的正文后：

1. 不直接开始生成 Skill；
2. 先核对版权页和目录是否对应 ISBN `9787121466809`；
3. 计算文件 SHA-256；
4. 检查是否缺页、乱码或 OCR 错序；
5. 更新 `SOURCE_MANIFEST.md`；
6. 再进入阶段 0。

## Book Track 执行决策

- 不使用模型记忆生成整书结论。
- 不使用极客时间专栏、第三方书评或网络笔记拼接代替图书正文；Column Proxy Track 始终保持独立标签。
- 不创建占位 `BOOK_OVERVIEW.md`，避免把公开目录推断误标成阶段 0 产物。
- 用户提供合法正文后，从文件校验继续，不重复前置研究。
