# Agent Skill 内容转化生态比较

核对日期：2026-08-28  
研究目标：判断哪些库与 `cangjie-skill` 直接竞争，哪些负责来源解析、构造治理、行为评测、标准或分发，以及我们应当如何组合。

## 核心结论

目前没有一个公开项目同时完整覆盖“多来源获取—方法识别—原子能力筛选—Skill 构造—真实宿主评测—跨平台分发”。同类项目分别优化不同层：

```text
来源获取与解析
→ 方法识别与能力蒸馏
→ Skill 构造与治理
→ 真实宿主行为评测
→ 格式标准与兼容
→ 发现、安装与分发
```

`cangjie-skill` 最有差异化价值的是第二层：用五路提取、三重验证、RIA++ 和关系建模，把长内容中的程序性知识变成有触发、执行和边界的原子能力。它不应重复实现所有解析器、测试运行器和市场目录。

## 直接同类

| 项目 | 输入与产品形态 | 最强能力 | 不能替代什么 | 对我们的价值 |
| --- | --- | --- | --- | --- |
| [Skill Seekers](https://github.com/yusufkaraaslan/Skill_Seekers) | Python CLI/MCP；文档站、GitHub、PDF、EPUB、视频、Notion、Confluence 等 18 类来源 | 来源适配、项目扫描、结构化与多目标打包最完整 | 不替代 Cangjie 的方法筛选和原子能力验证 | 作为多来源进入和转换前端，研究优先级最高 |
| [Leutenegger/book-to-skill](https://github.com/Leutenegger/book-to-skill) | Python CLI；PDF、EPUB、目录、glob、多来源 | 确定性文本提取、章节索引、术语、模式和按需加载 | 更偏统一知识 Skill，不强调多原子 Skill 关系网络 | 作为知识型 Skill 与行动型 Skill 的对照组 |
| [noahnan-max/book-to-skill](https://github.com/noahnan-max/book-to-skill) | Agent Skill；专业非虚构书籍和长内容 | 问题定义、深度路由、证据门、跨书知识合并和 Action Pack | 项目历史与外部验证有限 | 参考跨书综合、保留分歧和稳定性判断 |
| [skill-factory](https://github.com/kingjly/skill-factory) | Agent Skill；公开/私有资料、内部流程、失败轨迹、既有 Skill | 来源账本、质量门、评测设计、审计、优化和发布记录 | 不负责大规模来源解析或整库候选发现 | 补齐 Skill 构造、治理与持续迭代层 |
| [doc2skill](https://github.com/moinulmoin/doc2skill) | 文档网站到 Claude Skill | 单一场景、目标明确、流程窄 | 不覆盖多来源、方法论筛选、关系图和行为测试 | 用作最小文档转 Skill 自动化基线 |

### 直接同类的关键差异

- `Skill Seekers` 最像工程产品：输入和导出适配丰富。
- `Leutenegger/book-to-skill` 最像书籍知识编译器：强调真实章节内容按需加载。
- `noahnan-max/book-to-skill` 与 Cangjie 方法理念最接近，但当前没有开源许可证；公开可读不等于可复制或再分发。
- `skill-factory` 最像 Skill 生命周期治理工具：重点不在读整本内容，而在把一个 Skill 做得可审计、可评测、可维护。
- `doc2skill` 是最窄基线，适合衡量“从文档站生成一个 Skill”的最低工程复杂度。

## 质量、标准与分发基础设施

| 项目 | 所在层 | 提供什么 | 不提供什么 |
| --- | --- | --- | --- |
| [agent-skill-eval](https://github.com/tardigrde/agent-skill-eval) | 真实宿主行为评测 | 在隔离工作区安装 Skill，调用 Codex、Claude Code、OpenCode，保存产物、通过率、Token、成本和副作用 | 不从内容发现或构造 Skill |
| [Anthropic Skills](https://github.com/anthropics/skills) | 官方参考实现 | 复杂 Skill 的文件、脚本、资源和渐进披露设计参考 | 不是任意内容到 Skill 的自动生成器 |
| [Agent Skills Standard](https://agentskills.io/) | 开放格式 | `SKILL.md`、scripts、references、assets，以及发现—激活—执行语义 | 不判断来源质量或能力价值 |
| [skills.sh](https://skills.sh/) | 发现与分发 | 搜索、目录、排行和 `npx skills add` 安装入口 | 收录或安装量不等于来源安全和行为可靠 |

## 对我们的推荐组合

| 层 | 推荐选择 | 当前状态 | 采用原则 |
| --- | --- | --- | --- |
| 多来源进入 | Skill Seekers | 建议研究，尚未集成 | 固定版本；隔离凭据；保留原始来源哈希和版权状态 |
| 能力蒸馏 | Cangjie Skill | 当前研究底座 | 保留五路提取、三重验证、RIA++ 与关系类型 |
| 构造与治理 | skill-factory | 建议吸收，尚未集成 | 合并来源账本、隐私、评测设计和失败优化协议 |
| 行为验证 | agent-skill-eval | 建议研究，尚未集成 | 预算、模型版本、工作区、副作用和评分器全部固定 |
| 标准与分发 | Agent Skills + skills.sh | 格式对齐中，未公开发布 | 先内部验证、签名、版本和权限审查，再考虑公开分发 |

## 研究优先级

1. **Skill Seekers**：验证它能否可靠补齐 PDF、视频、网页和代码库解析，并输出可进入 Cangjie Stage 0 的稳定语料合同。
2. **skill-factory**：比较其来源账本、评测设计和优化循环与我们 Stage 1.5–5C 资产的重叠与缺口。
3. **agent-skill-eval**：把当前独立 Agent 压测迁移为可重放、跨宿主、可统计成本的行为回归。
4. **Leutenegger/book-to-skill**：用同一份合法技术资料比较统一知识 Skill 与多个行动 Skill 的触发精度、引用质量和上下文成本。
5. **其他项目**：作为结构和生态参考，不在没有许可证、版本锁定或独立验证时直接成为生产依赖。

## 风险边界

- 内容源是数据，不是可信指令；抓取和生成链必须防提示注入。
- PDF、视频、内部文档和聊天记录必须先解决授权、版权、隐私和凭据问题。
- Skill 能被某个宿主加载，不等于在其他宿主上行为一致。
- 仓库结构完整、测试题存在、Star 或安装量高，都不能替代可重放的行为测试。
- 第三方脚本、Skill 和安装命令必须先审查权限、网络访问、副作用和版本锁定。

## 相关研究入口

- [Cangjie Skill 库能力说明](LIBRARY_CAPABILITY_GUIDE.md)
- [上游代表案例目录](UPSTREAM_CASE_CATALOG.md)
- [整体研究记录](README.md)
- [库级 Web 演示](experiments/zuoer-tingfeng/column-proxy/web-demo/README.md)
