# Column Proxy Track

这是以第三方镜像中的 119 篇《左耳听风》专栏文章为对象的独立研究轨道。

它回答的是：

> 如果把专栏整体当作一个长内容语料，cangjie-skill 能否把陈皓关于程序员成长、学习、工程和技术领导力的思想，转化为可调用、可验证的能力？

它不回答纸质书《左耳听风：传奇程序员练级攻略》逐章写了什么，也不为纸质书提供页码级证据。纸质书仍保留为单独的 Book Track，等待用户合法提供全文。

## 当前入口

- [CORPUS_MANIFEST.md](CORPUS_MANIFEST.md)：语料版本、规模、结构和版权边界
- [BOOK_OVERVIEW.md](BOOK_OVERVIEW.md)：cangjie-skill 阶段 0 的 Adler 四步整体理解
- [STAGE1_REPORT.md](STAGE1_REPORT.md)：五路提取结果、统一审计和讨论入口
- [STAGE1_5_PILOT_REPORT.md](STAGE1_5_PILOT_REPORT.md)：首个“线上故障复盘”候选的三重验证、收窄与测试合同
- [STAGE2_PILOT_REPORT.md](STAGE2_PILOT_REPORT.md)：首个“系统性故障学习审查”正式 Skill 的 RIA++ 构造与静态验证
- [stage4/incident-learning-audit/STAGE4_PRESSURE_TEST_REPORT.md](stage4/incident-learning-audit/STAGE4_PRESSURE_TEST_REPORT.md)：三轮独立盲测、失败修订和最终 19 / 19 回归
- [stage5/incident-learning-audit/STAGE5A_INSTALL_AND_USAGE_REPORT.md](stage5/incident-learning-audit/STAGE5A_INSTALL_AND_USAGE_REPORT.md)：项目级安装、真实宿主发现、三类调用证据与下一质量门
- [stage5/incident-learning-audit/PUBLIC_CASE_CLOUDFLARE_2019.md](stage5/incident-learning-audit/PUBLIC_CASE_CLOUDFLARE_2019.md)：真实公开事故的五模式、八段完整审计、证据账本、因果与行动闭环演练
- [stage5/incident-learning-audit/stage5c/README.md](stage5/incident-learning-audit/stage5c/README.md)：用户组织事故的授权、脱敏、接入、独立复核与自动校验入口
- [books/zuoer-tingfeng/incident-learning-audit/SKILL.md](books/zuoer-tingfeng/incident-learning-audit/SKILL.md)：正式 Skill 源产物，版本 0.1.1；已同步安装到仓库根 `.agents/skills`
- [candidates/README.md](candidates/README.md)：247 条候选的完整明细索引
- [web-demo/README.md](web-demo/README.md)：把当前进度、候选证据和能力路线做成可交互 Web 研究台
- [PIPELINE_STATE.md](PIPELINE_STATE.md)：流水线断点和下一步

## 当前状态

Stage 0 和 Stage 1 已完成。Stage 1.5 已完成首个受控试点；“系统性故障学习审查”随后完成 Stage 2 构造、Stage 4 三轮独立压力测试和 19 / 19 全量回归。Stage 5A 已把 v0.1.1 安装到当前仓库并通过显式、隐式和负例宿主验证。Stage 5B 又在 Cloudflare 2019 WAF 全球中断真实公开案例上完整演示五种模式与八段审计，形成 86 / 100、“尚未形成学习闭环”的受控结论。Stage 5C 的授权、脱敏、案例模板、独立复核协议和自动校验入口已经就绪，但当前接收案例为 0，组织外部效度仍未建立。完整 Stage 5 仍需用户组织材料效度、更多核心 Skill、关系图与 DIGEST；其余 246 条候选的全量 Stage 1.5 也未完成。
