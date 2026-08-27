const REPO = "https://github.com/wesammustafa/Claude-Code-Everything-You-Need-to-Know";

const typeMeta = {
  context: { label: "上下文", color: "#5f87a6" },
  command: { label: "Slash Skill", color: "#ff5c35" },
  skill: { label: "Agent Skill", color: "#8a74a5" },
  agent: { label: "Subagent", color: "#9a7b44" },
  hook: { label: "Hook", color: "#c63818" },
  workflow: { label: "Workflow", color: "#496f60" },
  mcp: { label: "MCP", color: "#5f87a6" },
  policy: { label: "权限与接线", color: "#6c6d66" },
};

const capabilities = [
  {
    id: "claude-md",
    type: "context",
    name: "CLAUDE.md 项目记忆",
    path: "CLAUDE.md / 子目录 CLAUDE.md",
    level: "基础",
    trigger: "会话加载 / 按目录作用域",
    purpose: "把项目规则、命令、架构事实和团队约定持续放入模型上下文。",
    mechanism: "Claude Code 在进入项目和相关目录时加载指令，模型在后续决策中参考这些规则。",
    input: "稳定、精炼、可验证的项目事实",
    tools: "无需额外工具",
    output: "影响整个会话的行为倾向",
    risk: "内容过长、含糊或过期会污染每次任务；它是软控制，不是安全边界。",
    practice: "加入 3 条明确规则，用同一任务做前后对照；再运行 /claude-md-review。",
    verify: "模型能复述规则，并在实际编辑和测试中稳定遵守，而不只是口头承诺。",
    portable: "高：可转成任何 Agent 的 system/project instructions。",
    source: `${REPO}#prompt-engineering-deep-dive`,
  },
  {
    id: "five",
    type: "command",
    name: "/five · 五问根因分析",
    path: ".claude/commands/five.md",
    level: "入门",
    trigger: "用户显式输入 /five [问题]",
    purpose: "从故障表象连续追问原因，并反向验证根因。",
    mechanism: "纯 Markdown 工作流：记录问题 → 至少五层 Why → 反向验证 → 给出针对根因的措施。",
    input: "可观察的问题或症状",
    tools: "主要依赖推理；可按需 Read / Grep / Bash",
    output: "原因链、根因判断、验证方式和改进措施",
    risk: "模型可能编造因果链；没有代码、日志或指标证据时只能算假设。",
    practice: "对一个真实但低风险的失败先裸问，再用 /five；要求每层原因附证据。",
    verify: "根因能解释全部症状，且沿因果链逆推成立。",
    portable: "极高：最简单的 Prompt-as-Workflow 样例。",
    source: `${REPO}/blob/main/.claude/commands/five.md`,
  },
  {
    id: "pr",
    type: "command",
    name: "/pr · Pull Request 自动化",
    path: ".claude/commands/pr.md",
    level: "进阶",
    trigger: "用户显式输入 /pr",
    purpose: "格式化改动、拆分逻辑提交、推送分支并生成带摘要和测试计划的 PR。",
    mechanism: "把 Git 操作顺序和提交拆分原则写进指令，由 Claude Code 调用格式化器、Git 与 GitHub 工具执行。",
    input: "当前工作树改动、仓库历史和远端信息",
    tools: "Biome、Git、GitHub CLI / API",
    output: "分支、一个或多个提交、远端 PR",
    risk: "会产生真实外部副作用；仓库默认假设 Biome 存在，也未为你的分支策略定制。",
    practice: "只在无远端的练习仓库演示到 commit plan；先要求 dry-run，不 push、不创建 PR。",
    verify: "每个提交单一职责，PR 摘要与实际 diff 一致，测试计划可执行。",
    portable: "中：流程可迁移，命令、分支与审批策略必须适配。",
    source: `${REPO}/blob/main/.claude/commands/pr.md`,
  },
  {
    id: "review",
    type: "command",
    name: "/review · 六视角 PR 评审",
    path: ".claude/commands/review.md",
    level: "进阶",
    trigger: "用户输入 /review [PR 链接或编号]",
    purpose: "从产品、开发、QA、安全、DevOps、UI/UX 六个角度检查改动。",
    mechanism: "在一个顺序 Prompt 中依次切换六种审查视角，最后要求更新 GitHub。",
    input: "PR diff、项目上下文、测试和部署信息",
    tools: "GitHub、Read、Grep、测试命令",
    output: "多视角评审意见，默认可能写回 GitHub",
    risk: "角色是顺序提示而非真正并行 Agent；‘立即修复全部建议’可能扩大范围；外部写入需审批。",
    practice: "预埋 6 类问题，要求 dry-run 输出结构化 findings，禁止修改与发布评论。",
    verify: "发现项包含 severity、file、line、evidence、fix、confidence，且重复项已合并。",
    portable: "高：适合升级成并行审查 Agent + 聚合器。",
    source: `${REPO}/blob/main/.claude/commands/review.md`,
  },
  {
    id: "tdd",
    type: "command",
    name: "/tdd · 红绿重构工作流",
    path: ".claude/commands/tdd.md",
    level: "核心",
    trigger: "用户输入 /tdd 并给出功能",
    purpose: "强制先理解、建分支和笔记，再按 Red → Green → Refactor 迭代。",
    mechanism: "阶段化指令约束文件修改顺序：Red 不改业务代码，Green 不改测试，全部通过后再重构。",
    input: "明确的行为需求与可测试验收标准",
    tools: "Read、Edit、Bash、Git、项目测试框架",
    output: "失败测试、最小实现、重构结果、笔记和提交",
    risk: "原始指令包含 main、分支、push、PR 等强假设；M3 是否严格守阶段必须实测。",
    practice: "实现 discount(total, tier)，故意观察 Red 阶段是否只写测试。",
    verify: "保存三次证据：测试先红、实现后绿、重构后仍绿；检查每阶段 diff。",
    portable: "高：阶段状态机比具体模型更重要。",
    source: `${REPO}/blob/main/.claude/commands/tdd.md`,
  },
  {
    id: "test",
    type: "command",
    name: "/test · 单元测试检查表",
    path: ".claude/commands/test.md",
    level: "核心",
    trigger: "用户输入 /test [目标]",
    purpose: "聚焦内部逻辑测试，覆盖输入、错误、并发、副作用和可维护性。",
    mechanism: "以详细 checklist 约束测试目标、Given-When-Then 结构、Mock 边界和断言深度。",
    input: "要测试的函数、服务或类",
    tools: "Read、Edit、Bash、测试运行器",
    output: "单元测试及检查结果",
    risk: "它刻意排除 API/路由测试，不代表项目不需要集成或 E2E；不要把局部规则当完整测试策略。",
    practice: "给一个含 I/O 依赖的服务，检查它是否只 Mock I/O 而保留业务逻辑真实。",
    verify: "测试可重复、无真实网络、能因业务缺陷而失败，不锁死私有实现。",
    portable: "高：适合沉淀成团队测试策略 Skill。",
    source: `${REPO}/blob/main/.claude/commands/test.md`,
  },
  {
    id: "todo",
    type: "command",
    name: "/todo · 文件化任务状态",
    path: ".claude/commands/todo.md",
    level: "入门",
    trigger: "用户输入 add / complete / remove / list / next 等子命令",
    purpose: "通过项目根目录 todos.md 持久化任务，让状态跨会话存在。",
    mechanism: "模型识别项目根、解析命令并读写约定格式的 Markdown 列表。",
    input: "动作、任务描述、可选截止日期",
    tools: "Glob / Read / Write / Edit",
    output: "todos.md 的 Active 与 Completed 状态",
    risk: "自然语言日期、排序和并发修改可能不稳定；它是文件状态，不是事务数据库。",
    practice: "依次 add 两项、设置 tomorrow、complete、undo、next，然后手工检查文件。",
    verify: "多轮会话后状态仍正确；非法编号不破坏文件；日期格式一致。",
    portable: "高：展示了最轻量的 Agent 状态模式。",
    source: `${REPO}/blob/main/.claude/commands/todo.md`,
  },
  {
    id: "ux",
    type: "command",
    name: "/ux · UX 评估与改进",
    path: ".claude/commands/ux.md",
    level: "进阶",
    trigger: "用户输入 /ux 并指定页面或流程",
    purpose: "用用户体验视角审视界面、交互、可访问性与一致性。",
    mechanism: "将 UX 审查维度组织为重复工作流；有浏览器或截图工具时可形成观察—修改—复核闭环。",
    input: "界面代码、截图、产品目标或用户流程",
    tools: "Read / Edit；可组合 Playwright MCP",
    output: "问题清单、优先级和改进方案",
    risk: "没有真实渲染、用户数据和设计规范时容易变成主观建议。",
    practice: "对练习页先只读审查，再接 Playwright 截图复核；比较有无视觉证据的差异。",
    verify: "建议能定位到具体页面状态，并用截图、可访问性或交互结果验证。",
    portable: "中高：需要与浏览器工具和组织设计规范组合。",
    source: `${REPO}/blob/main/.claude/commands/ux.md`,
  },
  {
    id: "claude-md-review",
    type: "skill",
    name: "/claude-md-review · 指令审计",
    path: ".claude/skills/claude-md-review/SKILL.md",
    level: "核心",
    trigger: "手动调用，或 description 与任务语义匹配时自动加载",
    purpose: "检查 CLAUDE.md 的含糊规则、失效路径、陈旧命令和上下文膨胀。",
    mechanism: "YAML frontmatter 提供名称、描述和工具授权；正文按审计维度读取并检查项目指令。",
    input: "项目中的 CLAUDE.md 与相关路径/命令",
    tools: "Read、Glob、Grep",
    output: "可操作的精简与修正建议",
    risk: "allowed-tools 是授权而不只是限制声明；第三方 Skill 必须像 shell 脚本一样审查。",
    practice: "故意加入不存在路径、模糊规则和重复段落，观察能否全部识别。",
    verify: "每条发现有文件证据；修改后上下文更短且行为不退化。",
    portable: "极高：SKILL.md 接近开放 Agent Skills 资产格式。",
    source: `${REPO}/blob/main/.claude/skills/claude-md-review/SKILL.md`,
  },
  {
    id: "coder-reviewer",
    type: "agent",
    name: "coder-reviewer · 代码审查员",
    path: ".claude/agents/coder-reviewer.md",
    level: "进阶",
    trigger: "主 Agent 委派独立审查子任务",
    purpose: "在隔离上下文中检查实现质量、缺陷、测试与可维护性。",
    mechanism: "Agent frontmatter 定义角色和工具，主会话只传入明确任务，子 Agent 独立返回结论。",
    input: "目标文件、diff、验收标准",
    tools: "以只读检查工具为主",
    output: "独立代码审查结果",
    risk: "如果任务边界模糊，会重复主 Agent 工作并消耗更多上下文。",
    practice: "先让主 Agent 自审，再委派 coder-reviewer；比较新增发现和重复率。",
    verify: "返回内容聚焦任务，有独立证据，不修改不在授权范围内的文件。",
    portable: "高：角色、工具和上下文隔离可抽象成 AgentSpec。",
    source: `${REPO}/blob/main/.claude/agents/coder-reviewer.md`,
  },
  {
    id: "frontend-engineer",
    type: "agent",
    name: "frontend-engineer · 前端工程师",
    path: ".claude/agents/frontend-engineer.md",
    level: "进阶",
    trigger: "主 Agent 委派界面实现或前端检查",
    purpose: "聚焦组件、状态、样式、响应式、性能与前端工程质量。",
    mechanism: "通过专业角色 Prompt 缩窄注意力和工作边界。",
    input: "需求、设计、现有前端代码与约束",
    tools: "Read / Edit / Bash；可接浏览器",
    output: "前端实现或专项建议",
    risk: "角色 Prompt 不能替代真实项目规范与浏览器验证。",
    practice: "让它只处理一个组件，同时让主 Agent 保持协调职责。",
    verify: "实现满足验收、测试和响应式检查，且没有越界重构。",
    portable: "高：适合作为组织级角色模板。",
    source: `${REPO}/blob/main/.claude/agents/frontend-engineer.md`,
  },
  {
    id: "project-manager",
    type: "agent",
    name: "project-manager · 项目经理",
    path: ".claude/agents/project-manager.md",
    level: "进阶",
    trigger: "规划、拆解、同步状态时委派",
    purpose: "把大目标拆成依赖明确、可验收的工作项，并维护交付视角。",
    mechanism: "用非编码角色视角约束输出为范围、优先级、风险和状态。",
    input: "业务目标、约束、团队与时间信息",
    tools: "通常只需 Read / 搜索",
    output: "任务分解、依赖、风险和验收口径",
    risk: "缺少真实业务数据时，计划可能形式完整但依据不足。",
    practice: "给一个模糊需求，让 PM Agent 先输出澄清点和验收标准，再交工程 Agent。",
    verify: "每项工作可独立验收，依赖和不做事项明确。",
    portable: "高：适合前置需求治理。",
    source: `${REPO}/blob/main/.claude/agents/project-manager.md`,
  },
  {
    id: "tech-lead-architect",
    type: "agent",
    name: "tech-lead-architect · 技术架构师",
    path: ".claude/agents/tech-lead-architect.md",
    level: "高级",
    trigger: "复杂设计、跨模块变更或方案复核时委派",
    purpose: "分析边界、依赖、演进成本和系统性权衡。",
    mechanism: "隔离一个专门的架构推理上下文，避免主 Agent 在实现细节里丢失全局。",
    input: "代码结构、约束、非功能目标和候选方案",
    tools: "Read、Glob、Grep；必要时查询文档",
    output: "架构判断、决策依据、风险与迁移路径",
    risk: "容易过度设计；必须给出规模、时限和当前约束。",
    practice: "让它评估两个方案，但禁止编码；要求标明假设与不可逆决策。",
    verify: "方案能追溯到约束，且最小可行路径清楚。",
    portable: "高：适合做独立设计评审门。",
    source: `${REPO}/blob/main/.claude/agents/tech-lead-architect.md`,
  },
  {
    id: "ux-designer",
    type: "agent",
    name: "ux-designer · UX 设计师",
    path: ".claude/agents/ux-designer.md",
    level: "进阶",
    trigger: "用户流程、交互和可用性任务时委派",
    purpose: "从用户目标、信息架构、状态反馈和可访问性角度独立检查。",
    mechanism: "以 UX 角色上下文处理子任务，再把发现交回主 Agent 合并。",
    input: "用户、任务、页面/流程及视觉证据",
    tools: "Read；组合 Playwright 时更有效",
    output: "用户旅程问题、交互建议和验收点",
    risk: "没有用户画像和证据时可能输出通用 UX 清单。",
    practice: "让它只分析一个关键流程的正常、空、错、加载四种状态。",
    verify: "每项建议映射到用户目标和具体界面状态。",
    portable: "中高：价值依赖组织设计系统和浏览器证据。",
    source: `${REPO}/blob/main/.claude/agents/ux-designer.md`,
  },
  {
    id: "specialized-prompts",
    type: "agent",
    name: "10 个专业角色 Prompt 库",
    path: "specialized-agents/system-prompts/",
    level: "参考",
    trigger: "复制、改造成 Agent，或作为 Agent Teams 队友提示",
    purpose: "覆盖后端、业务分析、代码审查、数据库、设计审查、前端、项目管理、安全、技术负责人和 UX。",
    mechanism: "纯角色 system prompts，提供专业关注点、职责与输出方式。",
    input: "角色相关任务与项目上下文",
    tools: "取决于宿主 Agent 的授权",
    output: "特定专业视角的分析或实现",
    risk: "这些提示词偏通用；同时加载太多角色会增加噪声和角色幻觉。",
    practice: "任选一个角色，删掉泛化描述，加入你们的规范、工具和输出 schema。",
    verify: "改造后在 5 个固定案例上的输出更一致、可评分。",
    portable: "高：但应该模板化，而非逐字复制。",
    source: `${REPO}/tree/main/specialized-agents/system-prompts`,
  },
  {
    id: "post-tool-use",
    type: "hook",
    name: "PostToolUse · 工具调用审计",
    path: ".claude/hooks/post_tool_use.py",
    level: "进阶",
    trigger: "工具执行完成后自动触发",
    purpose: "记录 Claude Code 刚刚调用了什么工具以及相关事件数据。",
    mechanism: "Claude Code 把 Hook 事件 JSON 送入 Python 脚本，脚本追加到本地日志。",
    input: "工具名、输入、输出/状态等事件载荷",
    tools: "Python / uv 与文件系统",
    output: "工具事件审计日志",
    risk: "完整 JSON 可能含路径、命令、代码甚至秘密；还需轮转、脱敏与并发写安全。",
    practice: "只在无秘密的 lab 中启用，执行 Read/Edit/Bash 后逐条对照日志。",
    verify: "事件顺序完整，敏感字段被过滤，失败调用也可追踪。",
    portable: "高：这是通用 Agent telemetry 模式。",
    source: `${REPO}/blob/main/.claude/hooks/post_tool_use.py`,
  },
  {
    id: "notification-hook",
    type: "hook",
    name: "Notification · 系统通知",
    path: ".claude/hooks/notification.py",
    level: "进阶",
    trigger: "Claude Code 发出通知事件时自动触发",
    purpose: "在需要用户注意或长任务发生状态变化时发送桌面通知。",
    mechanism: "settings.json 将 Notification 事件绑定到 Python 脚本。",
    input: "通知事件与消息内容",
    tools: "Python / uv、操作系统通知能力",
    output: "本机通知",
    risk: "示例包含作者环境相关的 uv 路径，复制后通常必须修改。",
    practice: "先核对解释器路径，再触发一次无害通知；记录失败时的错误信息。",
    verify: "通知只在预期事件出现，不泄露敏感内容，也不会高频骚扰。",
    portable: "中：事件概念通用，操作系统实现需适配。",
    source: `${REPO}/blob/main/.claude/hooks/notification.py`,
  },
  {
    id: "stop-hook",
    type: "hook",
    name: "Stop · 主任务结束检查点",
    path: ".claude/hooks/stop.py",
    level: "进阶",
    trigger: "主 Agent 准备结束响应时",
    purpose: "在任务结束边界执行记录、通知或完成检查。",
    mechanism: "Stop 生命周期事件通过 settings.json 路由到脚本。",
    input: "会话停止事件",
    tools: "Python / uv",
    output: "结束记录或自动动作",
    risk: "如果结束 Hook 再触发新的 Agent 行为，可能形成循环；必须区分 stop_hook_active。",
    practice: "先只做只读记录，验证正常结束、用户中断和失败三种情况。",
    verify: "每个会话最多记录一次正确终态，不阻塞正常退出。",
    portable: "高：适合承载完成度与验收门。",
    source: `${REPO}/blob/main/.claude/hooks/stop.py`,
  },
  {
    id: "subagent-stop-hook",
    type: "hook",
    name: "SubagentStop · 子任务终态记录",
    path: ".claude/hooks/subagent_stop.py",
    level: "高级",
    trigger: "Subagent 执行结束时",
    purpose: "观察子 Agent 的完成边界，为多 Agent 任务提供状态与审计。",
    mechanism: "监听独立的 SubagentStop 事件，而不是把所有结束都混入主 Agent Stop。",
    input: "子 Agent 停止事件与标识",
    tools: "Python / uv",
    output: "子任务结束日志或通知",
    risk: "Agent 并行时要处理关联 ID、乱序与并发写入。",
    practice: "委派两个只读子任务，对照启动、完成顺序和主任务汇总。",
    verify: "每个子任务能用 ID 对齐输入、输出和终态。",
    portable: "高：是多 Agent observability 基础。",
    source: `${REPO}/blob/main/.claude/hooks/subagent_stop.py`,
  },
  {
    id: "settings",
    type: "policy",
    name: "settings.json · 权限与事件接线",
    path: ".claude/settings.json",
    level: "关键",
    trigger: "Claude Code 启动和工具调用时生效",
    purpose: "声明允许的工具/命令，并把生命周期事件绑定到 Hook 脚本。",
    mechanism: "配置层在模型之外决定哪些动作可执行，以及事件交给哪个程序。",
    input: "权限规则、matcher 与 Hook command",
    tools: "Claude Code 配置加载器",
    output: "硬性权限边界与自动化接线",
    risk: "示例 allow 面较宽且 deny 为空；这是学习样例，不是生产安全基线。",
    practice: "不要复制原文件；自己从只读权限开始，逐个为实验添加最小授权。",
    verify: "未授权动作被拒绝，敏感路径有 deny，Hook 命令在你的系统上可解析。",
    portable: "中：策略思想通用，语法依赖具体运行时。",
    source: `${REPO}/blob/main/.claude/settings.json`,
  },
  {
    id: "stale-docs",
    type: "workflow",
    name: "stale-docs-audit · 多 Agent 文档审计",
    path: ".claude/workflows/stale-docs-audit.js",
    level: "高级",
    trigger: "运行动态工作流 / stale-docs 审计任务",
    purpose: "并行扫描文档里的日期、版本、价格和路径声明，再让独立 Agent 尝试反证。",
    mechanism: "Stage 1 扇出 reader Agents 提取候选；filter/aggregate 合并；Stage 2 skeptic Agents 查官方来源反驳；JSON Schema 约束结果。",
    input: "文档文件集合与官方来源",
    tools: "工作流运行时、Agent、Web/Read、结构化输出",
    output: "经独立反证的陈旧声明报告",
    risk: "外部来源会变化；并发增加成本；动态 npx latest 依赖需固定版本。",
    practice: "在 README 预埋 3 条陈旧声明和 1 条仍正确声明，比较单 Agent 与两阶段流程。",
    verify: "误报被 skeptic 阶段消除，最终发现包含原文、证据、来源和置信度。",
    portable: "极高：fan-out → challenge → aggregate 是通用认知架构。",
    source: `${REPO}/blob/main/.claude/workflows/stale-docs-audit.js`,
  },
  {
    id: "serena",
    type: "mcp",
    name: "Serena MCP · 语义代码工具",
    path: "mcp-servers/serena.md",
    level: "扩展",
    trigger: "Agent 需要更强的代码结构理解时调用 MCP 工具",
    purpose: "提供面向符号与代码语义的导航、查找和修改能力。",
    mechanism: "Claude Code 作为 MCP client 启动/连接服务，并把服务暴露的工具加入 Agent 工具集。",
    input: "符号、文件、项目查询",
    tools: "Serena MCP server",
    output: "结构化代码定位或编辑结果",
    risk: "外部服务新增工具权限与上下文成本；必须审查服务来源和允许范围。",
    practice: "先列出 MCP 工具，再用普通 Grep 和 Serena 完成同一符号定位，比较调用质量。",
    verify: "结果指向真实符号，作用域明确，断开 MCP 后核心流程仍可用。",
    portable: "高：MCP 是运行时之间的重要连接标准。",
    source: `${REPO}/tree/main/mcp-servers`,
  },
  {
    id: "sequential-thinking",
    type: "mcp",
    name: "Sequential Thinking MCP · 结构化推理",
    path: "mcp-servers/sequential-thinking.md",
    level: "扩展",
    trigger: "复杂问题需要显式分步推理工具时",
    purpose: "让 Agent 通过外部工具维护、修订和分叉思考步骤。",
    mechanism: "MCP 服务提供 thinking 工具，模型以多次工具调用组织问题求解。",
    input: "复杂问题、当前思考与修订信号",
    tools: "Sequential Thinking MCP server",
    output: "结构化思考轨迹和结论",
    risk: "简单任务会过度思考并增加成本；推理轨迹并不自动等于事实正确。",
    practice: "只选一个多约束架构题，对比普通计划与工具辅助计划的假设覆盖率。",
    verify: "结论引用代码/数据证据，修订能真正改变方案而非堆叠文字。",
    portable: "中高：适合复杂规划，不应默认常开。",
    source: `${REPO}/tree/main/mcp-servers`,
  },
  {
    id: "memory-mcp",
    type: "mcp",
    name: "Memory MCP · 跨会话知识",
    path: "mcp-servers/memory.md",
    level: "扩展",
    trigger: "需要存取长期实体、关系或项目事实时",
    purpose: "把会话外知识放入持久化记忆服务，而不是无限膨胀 CLAUDE.md。",
    mechanism: "Agent 通过 MCP 工具创建、查询和更新知识节点/关系。",
    input: "稳定事实、实体、关系与查询",
    tools: "Memory MCP server",
    output: "可跨会话检索的结构化记忆",
    risk: "错误事实会长期污染后续任务；需要来源、过期时间、删除与权限策略。",
    practice: "只存一条可验证项目事实，重启会话读取，再更新并检查版本。",
    verify: "记忆有来源、作用域和生命周期；不会保存秘密或短期噪声。",
    portable: "高：持久记忆是独立于模型的重要能力层。",
    source: `${REPO}/tree/main/mcp-servers`,
  },
  {
    id: "playwright-mcp",
    type: "mcp",
    name: "Playwright MCP · 浏览器执行",
    path: "mcp-servers/playwright.md",
    level: "扩展",
    trigger: "需要观察或操作真实网页时",
    purpose: "让 Agent 打开页面、操作元素、读取状态并获取浏览器证据。",
    mechanism: "MCP 服务把 Playwright 浏览器动作封装为模型可调用工具。",
    input: "URL、元素定位和预期交互",
    tools: "Playwright MCP server / Browser",
    output: "页面状态、截图、交互结果或测试证据",
    risk: "浏览器可触发真实提交、付款或消息；需要站点白名单和确认门。",
    practice: "只对本地静态页做打开、读取标题、检查链接和截图，不登录外部系统。",
    verify: "断言基于 DOM/截图证据，动作没有越过授权页面和副作用边界。",
    portable: "高：可成为 UX、E2E 和网页研究的共同工具层。",
    source: `${REPO}/tree/main/mcp-servers`,
  },
];

const archData = {
  human: { index: "01", type: "触发入口", title: "人 / Slash 命令", description: "用户直接给出自然语言任务，或输入 /five、/tdd、/review 等显式命令，是最容易观察和控制的入口。", control: "软控制", artifact: "任务上下文", observe: "同一需求在裸提示与 Skill 下的差异" },
  semantic: { index: "02", type: "触发入口", title: "Skill 语义匹配", description: "Agent Skill 只预加载名称与描述；当当前任务匹配 description 时，再按需读取完整 SKILL.md。", control: "软控制", artifact: "按需加载的工作流", observe: "自动触发是否准确，是否出现误触发" },
  event: { index: "03", type: "触发入口", title: "生命周期事件", description: "工具调用后、通知、主 Agent 停止或 Subagent 停止等事件，可以自动执行 Hook，而无需模型主动记得。", control: "硬控制", artifact: "事件 JSON", observe: "事件时序、失败和敏感字段" },
  runtime: { index: "04", type: "执行引擎", title: "Claude Code Agent Loop", description: "模型解释目标，选择工具，读取结果并继续迭代。MiniMax M3 在你的配置中替代模型层，但 Claude Code 仍提供宿主循环和工具面。", control: "运行时", artifact: "工具调用与最终结果", observe: "模型是否能稳定遵循宿主工具协议" },
  context: { index: "05", type: "持久上下文", title: "CLAUDE.md", description: "每次会话都会消费的项目规则层。适合稳定事实，不适合堆入所有知识，更不应该承担安全边界。", control: "软控制", artifact: "项目级指令", observe: "规则遵循率与上下文成本" },
  skills: { index: "06", type: "可复用流程", title: "Commands 与 Skills", description: "把重复三次以上的提示和流程做成可命名、可版本化、可触发的能力包。", control: "软控制", artifact: "Markdown 能力说明", observe: "输入输出是否稳定、流程是否漏步" },
  tools: { index: "07", type: "动作表面", title: "Read / Edit / Bash", description: "模型本身不直接改仓库，而是产生结构化工具调用；运行时执行后把观察结果返回模型。", control: "权限控制", artifact: "文件、命令与 diff", observe: "工具参数、作用域与副作用" },
  hooks: { index: "08", type: "治理层", title: "Hooks 检查点", description: "在模型之外自动记录、检查、拒绝或通知，是把‘请遵守’升级为‘程序保证’的关键。", control: "硬控制", artifact: "日志、允许/拒绝结果", observe: "是否真正阻止越权，而非只提示" },
  agents: { index: "09", type: "上下文隔离", title: "Subagents", description: "把足够大的子任务交给独立上下文和专业角色，主 Agent 只负责编排和聚合。", control: "软控制 + 工具边界", artifact: "独立子任务结果", observe: "新增发现、重复率与上下文成本" },
  workflow: { index: "10", type: "动态编排", title: "Workflow", description: "用代码显式表达并行、过滤、反证和聚合，适合超过一次对话可稳定协调的复杂任务。", control: "程序编排", artifact: "结构化阶段结果", observe: "扇出、失败恢复和聚合质量" },
  mcp: { index: "11", type: "外部工具", title: "MCP 连接层", description: "通过统一协议给 Agent 增加代码语义、记忆、浏览器或其他外部系统能力。", control: "连接器权限", artifact: "外部工具结果", observe: "新增权限、数据边界和真实副作用" },
};

const treeData = {
  claude: { label: "控制平面", title: ".claude/：可执行知识的容器", description: "把团队经验从聊天记录中抽出来，变成 Claude Code 能发现、加载和执行的项目级资产。", problem: "让操作方式可复用", drive: "显式、语义、事件、编排", value: "高：抽象可跨模型", risk: "它包含可执行指令，不能把整个目录未经审查地复制进真实项目。" },
  settings: { label: "硬控制入口", title: "settings.json：权限与 Hook 的接线板", description: "把事件 matcher、执行脚本和允许工具组织在一起。模型负责提议动作，配置决定动作是否拥有执行通道。", problem: "权限和自动化散乱", drive: "启动加载 + 事件匹配", value: "策略思想可复用", risk: "本仓库示例权限面较宽、deny 为空，必须从最小权限重新设计。" },
  commands: { label: "人工触发", title: "commands/：7 个可复用 Slash Skills", description: "/five、/pr、/review、/tdd、/test、/todo、/ux。它们本质是有名字、有固定结构的 Markdown 工作流。", problem: "重复提示与步骤漂移", drive: "用户输入 /command", value: "最容易提取", risk: "/pr 与 /review 默认涉及 GitHub 外部写入，练习必须先 dry-run。" },
  skillsdir: { label: "语义触发", title: "skills/：可被自动发现的 Agent Skill", description: "示例 /claude-md-review 使用 SKILL.md 和 frontmatter，描述决定何时匹配，正文按需加载。", problem: "能力发现与上下文节省", drive: "手动或语义匹配", value: "开放格式、可跨产品", risk: "allowed-tools 会授予工具能力；安装第三方 Skill 前应像审查脚本一样审查。" },
  agentsdir: { label: "上下文隔离", title: "agents/：5 个项目级专业 Subagents", description: "代码审查、前端、项目管理、技术架构和 UX 设计角色，可接收独立子任务并返回结果。", problem: "复杂任务互相污染", drive: "主 Agent 委派", value: "角色模板可复用", risk: "不要为很小的任务开 Agent；委派边界必须包含输入、输出和完成条件。" },
  hooksdir: { label: "事件自动化", title: "hooks/：4 个 Python 生命周期处理器", description: "覆盖 PostToolUse、Notification、Stop 和 SubagentStop，用程序观察 Agent 行为。", problem: "模型可能忘记记录和检查", drive: "运行时事件", value: "Agent 治理基础", risk: "示例日志与本机路径不具备生产安全性，需要脱敏、轮转与可移植改造。" },
  workflowsdir: { label: "程序化编排", title: "workflows/：两阶段动态 Agent 流程", description: "stale-docs-audit 先并行提取陈旧声明，再让独立 skeptic Agent 查询官方来源尝试反证。", problem: "复杂任务难以靠一轮对话协调", drive: "Pipeline / Parallel / Agent", value: "认知工作流价值最高", risk: "注意并发成本、外部来源、结构化 schema 和动态依赖版本。" },
  specialized: { label: "角色知识库", title: "specialized-agents/：10 个角色 System Prompts", description: "提供后端、业务、数据库、安全、设计等角色基线，可以改造成 subagent 或 Agent Teams 的成员。", problem: "专业关注点容易遗漏", drive: "复制到角色配置", value: "适合组织级模板", risk: "通用角色描述必须加入你们的领域规范、工具和评价标准。" },
  mcpdir: { label: "连接器说明", title: "mcp-servers/：4 类外部能力接入指南", description: "覆盖 Serena、Sequential Thinking、Memory 和 Playwright。仓库提供接入说明，不是这些服务的实现代码。", problem: "本地工具面不足", drive: "MCP client/server 协议", value: "跨运行时集成层", risk: "每接一个 MCP 都扩大数据和权限边界，必须按服务单独审计。" },
  docs: { label: "知识层", title: "docs/：从入门到高级的说明体系", description: "解释 setup、prompt engineering、skills、hooks、subagents、workflows、agent teams、MCP 与参考命令。", problem: "只看示例不理解选择条件", drive: "人工阅读与按需引用", value: "形成共同心智模型", risk: "文档会随 Claude Code 演进；使用前核对官方文档和仓库更新时间。" },
};

const scenarios = [
  {
    id: "root-cause", label: "故障根因 /five", steps: [
      { owner: "USER", title: "提交可观察症状", description: "用户输入 /five，并给出启动失败、测试不稳定或性能下降等具体问题。", observe: "输入是否是事实描述，而不是提前指定根因。" },
      { owner: "SKILL", title: "加载 five.md", description: "Claude Code 将命令正文加入当前任务上下文，获得五问法步骤与输出期望。", observe: "这是上下文注入，不是新的程序算法。" },
      { owner: "MODEL", title: "建立多层原因链", description: "M3 连续追问 Why；必要时请求读取日志、配置或代码。", observe: "每一层是证据还是猜测；不确定时是否主动取证。" },
      { owner: "TOOLS", title: "读取项目证据", description: "运行时执行 Read、Grep 或测试命令，并把结果返回给模型。", observe: "工具调用由 Claude Code 执行，模型只产生调用意图与参数。" },
      { owner: "MODEL", title: "反向验证根因", description: "从候选根因向前推演，检查它能否解释完整症状链。", observe: "是否考虑多个分支和反例。" },
      { owner: "OUTPUT", title: "给出根因与措施", description: "输出原因链、证据、置信度、验证实验和针对根因的处理建议。", observe: "措施是否针对根因，而不是只压制表象。" },
    ],
  },
  {
    id: "feature-tdd", label: "功能开发 /tdd", steps: [
      { owner: "USER", title: "定义行为与验收", description: "输入 /tdd 和一个边界清楚的小功能，例如阶梯折扣计算。", observe: "需求是否能转成输入—输出断言。" },
      { owner: "SKILL", title: "加载 TDD 状态机", description: "tdd.md 要求先理解现有代码、建立笔记，再进入 Red—Green—Refactor。", observe: "Prompt 只是软控制；模型是否严格守阶段需要验证。" },
      { owner: "RED", title: "只写失败测试", description: "模型创建测试并运行，应该看到预期失败，且不修改业务实现。", observe: "检查 git diff 和测试输出，拒绝‘测试一写就绿’。" },
      { owner: "GREEN", title: "最小实现通过测试", description: "模型只改业务实现，用最简单方案让全部测试通过。", observe: "是否偷偷修改测试来迁就实现。" },
      { owner: "REFACTOR", title: "保持行为的重构", description: "清理命名与结构，再次运行完整测试。", observe: "重构前后测试是否保持全绿，是否引入无关变更。" },
      { owner: "GOVERN", title: "Hook / Git 留下证据", description: "可选 Hook 记录工具链；Git diff 展示三个阶段的真实变化。", observe: "可追溯性来自外部证据，而不是模型的总结。" },
    ],
  },
  {
    id: "pr-review", label: "代码评审 /review", steps: [
      { owner: "USER", title: "指定 PR 与 dry-run", description: "输入 /review [PR]，明确只读，不发布评论、不修改代码。", observe: "在入口处限定副作用，是安全演示的第一道门。" },
      { owner: "PRODUCT", title: "产品与用户价值", description: "检查业务价值、体验和战略一致性。", observe: "发现是否基于需求，而不是泛化产品建议。" },
      { owner: "ENGINEERING", title: "开发与 QA", description: "检查代码质量、性能、测试、边界和回归风险。", observe: "是否定位具体 file / line 并给证据。" },
      { owner: "RISK", title: "安全与 DevOps", description: "检查数据处理、漏洞、CI/CD、配置、监控。", observe: "高风险项是否与真实攻击面和部署结构相关。" },
      { owner: "UX", title: "UI/UX 视角", description: "检查可用性、一致性、响应式和可访问性。", observe: "没有界面证据时，应降低置信度而非编造。" },
      { owner: "AGGREGATE", title: "结构化合并", description: "按 severity、category、file、line、evidence、fix、confidence 输出并去重。", observe: "仓库原始命令是顺序视角；这是你应扩展的聚合契约。" },
    ],
  },
  {
    id: "docs-audit", label: "文档审计 Workflow", steps: [
      { owner: "INPUT", title: "选择文档集合", description: "工作流获取 README 和 docs，并限制允许核查的文件范围。", observe: "输入集合和排除规则是否明确。" },
      { owner: "FAN-OUT", title: "并行 Reader Agents", description: "多个 reader 提取日期、版本、价格和路径等可能过期的事实声明。", observe: "并行带来覆盖率，也带来重复和成本。" },
      { owner: "SCHEMA", title: "结构化候选结果", description: "JSON Schema 限制每条候选的字段和格式。", observe: "Schema 约束形状，不保证内容事实正确。" },
      { owner: "FILTER", title: "过滤与聚合", description: "合并 reader 结果，去掉无关项，并为反证阶段准备任务。", observe: "稳定的 key 和去重规则决定后续质量。" },
      { owner: "SKEPTIC", title: "独立 Agent 尝试反证", description: "第二批 Agent 查询官方来源，目标不是确认第一阶段，而是尽力推翻它。", observe: "角色独立性减少自我确认偏差。" },
      { owner: "REPORT", title: "输出带来源的报告", description: "只保留经过复核的发现，附原文、证据、来源和置信度。", observe: "这就是仓库最值得提取的‘生成—质疑—聚合’模式。" },
    ],
  },
];

const labs = [
  {
    id: "lab-1", level: "LEVEL 01 · BASELINE", name: "确认模型与工具链", subtitle: "先建立裸运行基线", time: "10 MIN",
    goal: "确认请求确实走 MiniMax，并验证 Read / Write / Bash 三个基础工具循环。",
    setup: "在一个无敏感信息、无生产远端的练习目录中启动 Claude Code。先执行 /status 与 /model，确认当前 Provider、Base URL 和模型。",
    action: ["让它读取一个文本文件并准确复述", "让它创建一个 hello.txt", "让它运行查看目录的命令", "保存会话输出作为 A 组基线"],
    observe: "模型名只证明路由配置；真正的兼容性要看模型能否生成 Claude Code 期望的工具调用，并正确消费工具结果。",
    pass: "三类工具均成功；没有请求发往 api.anthropic.com；模型能根据工具返回继续完成任务。",
    prompt: `/status\n/model\n\n然后请做一个最小工具链测试：\n1. 读取当前目录中的 README.md（如果不存在就报告，不要猜）\n2. 创建 hello.txt，内容为 tool loop ok\n3. 用命令确认文件存在\n4. 最后列出你实际调用过的工具。`,
    safety: "不要在真实业务仓库验证写入；不要在输出或截图里暴露 API Key。",
  },
  {
    id: "lab-2", level: "LEVEL 02 · PROMPT AS WORKFLOW", name: "体验 /five", subtitle: "最小 Skill 的控制效果", time: "12 MIN",
    goal: "理解 Markdown 指令如何把一次普通问答变成具有步骤、验证和输出结构的工作流。",
    setup: "只复制 .claude/commands/five.md 到练习仓库对应目录。若命令未出现，重启会话或使用 /reload-skills。",
    action: ["先裸问：为什么应用启动失败？", "再用 /five 对同一问题分析", "要求每层 Why 标明 evidence / hypothesis", "比较两次输出的因果深度和可验证性"],
    observe: "Skill 不会给 M3 增加新知识；它改变的是任务分解、停止条件和输出纪律。",
    pass: "至少五层原因不是机械重复；结论包含证据缺口、反向验证和下一步实验。",
    prompt: `/five 应用启动时偶发读取不到配置，但重启后通常恢复。\n\n要求：\n- 每一层 Why 标记为“已有证据”或“待验证假设”\n- 不允许把猜测写成事实\n- 最后给出成本最低的三个验证实验`,
    safety: "不要在尚未取证时让模型直接修改配置；本关只分析。",
  },
  {
    id: "lab-3", level: "LEVEL 03 · STATE", name: "体验 /todo", subtitle: "文件就是最小持久状态", time: "12 MIN",
    goal: "观察 Agent 如何用约定格式维护跨轮次、跨会话状态。",
    setup: "复制 todo.md；确认练习目录是一个独立 Git 仓库，以便清楚观察 todos.md 的变化。",
    action: ["add 两条任务，其中一条设 tomorrow", "执行 list 与 next", "complete 第一项后再 undo", "重启 Claude Code 后再次 list"],
    observe: "这里没有数据库或内置 Todo API；状态能力来自文件格式、解析规则和工具读写。",
    pass: "todos.md 格式稳定、日期一致、重启后状态仍在，非法编号不会破坏文件。",
    prompt: `/todo add "为折扣函数增加边界测试" tomorrow\n/todo add "记录裸提示基线结果"\n/todo list\n/todo next`,
    safety: "多人同时修改同一 todos.md 时可能冲突；不要把它误当成团队项目管理系统。",
  },
  {
    id: "lab-4", level: "LEVEL 04 · QUALITY", name: "体验 /test", subtitle: "检查表如何约束测试质量", time: "18 MIN",
    goal: "验证模型是否能遵守测试边界，而不是只追求生成大量测试。",
    setup: "准备一个含纯业务逻辑和一个 I/O 依赖的小服务；使用项目现有测试框架，不额外安装依赖。",
    action: ["要求只测试内部逻辑", "检查是否只 Mock I/O", "预埋非法输入和副作用遗漏", "故意修改业务行为，确认测试会红"],
    observe: "一份长 checklist 的价值取决于关键约束是否被实际执行；统计覆盖条目而不是看输出篇幅。",
    pass: "测试可重复、无真实网络、覆盖有效/无效输入，且针对行为而非私有实现。",
    prompt: `/test 为当前 discount service 编写单元测试。\n\n限制：\n- 不测试 HTTP 路由\n- 只 Mock 外部 I/O，不 Mock 折扣规则\n- 覆盖 0、负数、阈值边界、未知会员等级\n- 先输出测试矩阵，得到矩阵后再写测试`,
    safety: "不要让命令擅自修改全局测试配置或安装新库。",
  },
  {
    id: "lab-5", level: "LEVEL 05 · STATE MACHINE", name: "体验 /tdd", subtitle: "验证 Red → Green → Refactor", time: "25 MIN",
    goal: "用真实 diff 和测试输出来判断 M3 是否遵循阶段状态机。",
    setup: "准备空的 discount.ts 与测试环境；在开始前提交一次干净基线。调整原命令中的 main、push、PR 假设，禁止本关访问远端。",
    action: ["Red：只创建失败测试", "检查 diff 确认业务代码没变", "Green：最小实现并全绿", "Refactor：改进结构后再次全绿"],
    observe: "如果 Red 阶段顺手写了实现，说明软指令未被可靠遵循；应将阶段检查升级为 Hook 或外部测试门。",
    pass: "留存三段测试结果；每阶段文件修改边界正确；最终全量测试通过且无无关改动。",
    prompt: `/tdd 实现 calculateDiscount(total, tier)。\n\n规则：\n- total < 0 抛出错误\n- regular: 0%\n- silver 且 total >= 100: 10%\n- gold 且 total >= 100: 20%\n\n本次实验禁止 push 和创建 PR。每个阶段结束后停下来，报告测试结果和 git diff，等待我输入“继续”。`,
    safety: "仓库原始 /tdd 包含建分支、push 和 PR 工作流；练习前明确关闭远端动作。",
  },
  {
    id: "lab-6", level: "LEVEL 06 · MULTI-PERSPECTIVE", name: "体验 /review", subtitle: "六视角审查与结构化输出", time: "22 MIN",
    goal: "理解‘角色切换’带来的覆盖价值，并识别它与真正多 Agent 并行的区别。",
    setup: "在本地 diff 中预埋产品、代码、测试、安全、部署和 UX 六类小问题。无需真实 GitHub PR。",
    action: ["明确 dry-run、只读", "运行六视角审查", "把结果重排成统一 finding schema", "统计发现率、重复率和无证据建议"],
    observe: "原始 /review 在同一上下文顺序切换角色，容易发生相互锚定；下一步可拆成独立 Agents 后聚合。",
    pass: "发现项能定位到 file/line，有 evidence 和 confidence；没有发布评论或擅自修复。",
    prompt: `/review 当前本地 diff。\n\n这是 dry-run：禁止修改文件、提交、push、调用 GitHub 写接口。\n请从产品、开发、QA、安全、DevOps、UX 六视角检查，并以数组输出：\n{severity, category, file, line, finding, evidence, recommended_fix, confidence}\n最后合并重复项，并单独列出“缺少上下文、无法判断”的问题。`,
    safety: "原始命令明确要求更新 GitHub；必须在入口覆盖为 dry-run，真实发布前增加人工批准。",
  },
  {
    id: "lab-7", level: "LEVEL 07 · HARD CONTROL", name: "启用 Hooks", subtitle: "从软提示到程序化检查点", time: "25 MIN",
    goal: "看到工具调用事件如何脱离模型记忆，被程序自动记录或阻止。",
    setup: "只复制一个 Hook 和最小 settings 片段。先检查 Python/uv 路径并将日志写到练习目录；不要复制完整 settings.json。",
    action: ["先启用只读 PostToolUse 日志", "依次触发 Read、Edit、Bash", "对照会话与日志事件", "加入敏感字段过滤后再测一次"],
    observe: "Hook 的价值是无论模型是否记得，事件都会经过检查点；这是脚手架从 Prompt 工程走向治理工程的分界线。",
    pass: "日志按顺序记录工具事件，API Key/完整文件内容不会落盘，脚本失败不破坏项目。",
    prompt: `请仅在当前练习仓库执行三个动作：\n1. 读取 hello.txt\n2. 把内容改为 hook observed\n3. 用命令读取文件\n\n完成后不要总结猜测，只列出你实际调用的工具及顺序。`,
    safety: "原示例可能记录完整事件 JSON，并含环境相关 uv 路径；必须先审查和脱敏。",
  },
  {
    id: "lab-8", level: "LEVEL 08 · ORCHESTRATION", name: "Workflow + MCP", subtitle: "从单 Agent 到生成—反证—聚合", time: "35 MIN",
    goal: "体验仓库最先进的能力：代码化编排多个认知阶段，并按需接入外部证据工具。",
    setup: "复制 stale-docs-audit.js 前先通读依赖与命令。准备 4 条文档声明：2 条过期、1 条错误、1 条仍正确。可先不接 MCP。",
    action: ["Stage 1 并行提取候选", "检查结构化 JSON", "Stage 2 独立尝试反证", "聚合最终报告", "可选：接 Playwright/Memory 做最小只读实验"],
    observe: "价值来自角色独立、阶段目标相反和结构化聚合，而不是简单‘多开几个 Agent’。",
    pass: "正确声明没有被误报；过期项有官方证据；单个 Agent 失败不导致无解释的错误结论。",
    prompt: `运行 stale docs audit 的 dry-run，只检查练习目录的 README.md。\n要求：\n- Stage 1 只提取候选，不下最终结论\n- Stage 2 使用独立上下文尝试推翻每个候选\n- 最终只保留有证据的发现\n- 输出原文、证据 URL、检查日期、置信度\n- 禁止修改文档和调用任何发布接口`,
    safety: "动态 npx -y @latest 有供应链漂移；正式使用前固定依赖版本。MCP 首次接入只给只读与站点白名单。",
  },
];

let activeFilter = "all";
let activeScenario = 0;
let activeSimStep = 0;
let activeLab = 0;
let completedLabs = new Set(JSON.parse(localStorage.getItem("cc-lab-progress") || "[]"));

const $ = (selector, scope = document) => scope.querySelector(selector);
const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
const escapeHtml = (value) => String(value).replace(/[&<>'"]/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" }[char]));

function initArchitecture() {
  $$("[data-arch]").forEach(button => {
    button.addEventListener("click", () => {
      $$("[data-arch]").forEach(node => node.classList.remove("active"));
      button.classList.add("active");
      const item = archData[button.dataset.arch];
      $("#archIndex").textContent = item.index;
      $("#archType").textContent = item.type;
      $("#archTitle").textContent = item.title;
      $("#archDescription").textContent = item.description;
      $("#archControl").textContent = item.control;
      $("#archArtifact").textContent = item.artifact;
      $("#archObserve").textContent = item.observe;
    });
  });
}

function initTree() {
  $$("[data-tree]").forEach(button => {
    button.addEventListener("click", () => {
      $$("[data-tree]").forEach(node => node.classList.remove("selected"));
      button.classList.add("selected");
      const item = treeData[button.dataset.tree];
      $("#treeLabel").textContent = item.label;
      $("#treeTitle").textContent = item.title;
      $("#treeDescription").textContent = item.description;
      $("#treeProblem").textContent = item.problem;
      $("#treeDrive").textContent = item.drive;
      $("#treeValue").textContent = item.value;
      $("#treeRisk").innerHTML = `<strong>注意：</strong>${escapeHtml(item.risk)}`;
    });
  });
}

function renderFilters() {
  const types = ["all", ...new Set(capabilities.map(item => item.type))];
  $("#capabilityFilters").innerHTML = types.map(type => `
    <button class="filter-button ${type === activeFilter ? "active" : ""}" data-filter="${type}">
      ${type === "all" ? "全部" : typeMeta[type].label}
    </button>`).join("");
  $$("[data-filter]").forEach(button => button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    renderFilters();
    renderCapabilities();
  }));
}

function renderCapabilities() {
  const query = $("#capabilitySearch").value.trim().toLowerCase();
  const filtered = capabilities.filter(item => {
    const matchesType = activeFilter === "all" || item.type === activeFilter;
    const haystack = `${item.name} ${item.path} ${item.purpose} ${item.trigger}`.toLowerCase();
    return matchesType && haystack.includes(query);
  });
  $("#capabilityCount").textContent = `${filtered.length} / ${capabilities.length}`;
  $("#capabilityGrid").innerHTML = filtered.length ? filtered.map(item => {
    const type = typeMeta[item.type];
    return `<button class="cap-card" data-capability="${item.id}" style="--type-color:${type.color}">
      <span class="card-top"><span class="type-tag">${type.label}</span><span class="level-tag">${item.level}</span></span>
      <h3>${escapeHtml(item.name)}</h3>
      <code>${escapeHtml(item.path)}</code>
      <p>${escapeHtml(item.purpose)}</p>
      <span class="cap-meta">
        <span><small>触发</small><strong>${escapeHtml(item.trigger)}</strong></span>
        <span><small>迁移</small><strong>${escapeHtml(item.portable)}</strong></span>
      </span>
      <span class="open-mark">↗</span>
    </button>`;
  }).join("") : `<div class="empty-state">没有匹配能力。试试“测试”“审计”或清除筛选。</div>`;
  $$("[data-capability]").forEach(card => card.addEventListener("click", () => openCapability(card.dataset.capability)));
}

function openCapability(id) {
  const item = capabilities.find(entry => entry.id === id);
  const type = typeMeta[item.type];
  $("#dialogContent").innerHTML = `<div class="dialog-inner">
    <span class="dialog-type">${type.label} · ${escapeHtml(item.level)}</span>
    <h2>${escapeHtml(item.name)}</h2>
    <code class="dialog-path">${escapeHtml(item.path)}</code>
    <p class="dialog-summary">${escapeHtml(item.purpose)}</p>
    <div class="dialog-flow">
      <div><small>TRIGGER</small><strong>${escapeHtml(item.trigger)}</strong></div>
      <div><small>INPUT</small><strong>${escapeHtml(item.input)}</strong></div>
      <div><small>TOOLS</small><strong>${escapeHtml(item.tools)}</strong></div>
      <div><small>OUTPUT</small><strong>${escapeHtml(item.output)}</strong></div>
    </div>
    <div class="dialog-sections">
      <section class="dialog-section full"><h4>内部机制</h4><p>${escapeHtml(item.mechanism)}</p></section>
      <section class="dialog-section"><h4>实践任务</h4><p>${escapeHtml(item.practice)}</p></section>
      <section class="dialog-section"><h4>通过标准</h4><p>${escapeHtml(item.verify)}</p></section>
      <section class="dialog-section full"><h4>风险与边界</h4><p>${escapeHtml(item.risk)}</p></section>
      <section class="dialog-section full"><h4>对我们的可迁移价值</h4><p>${escapeHtml(item.portable)}</p></section>
    </div>
    <div class="dialog-actions"><a class="button primary small" href="${item.source}" target="_blank" rel="noreferrer">查看源文件 ↗</a><a class="button ghost small" href="#practice" data-close-dialog>去练习</a></div>
  </div>`;
  const dialog = $("#capabilityDialog");
  dialog.showModal();
  $("[data-close-dialog]").addEventListener("click", () => dialog.close());
}

function initDialog() {
  $("#dialogClose").addEventListener("click", () => $("#capabilityDialog").close());
  $("#capabilityDialog").addEventListener("click", event => {
    if (event.target === $("#capabilityDialog")) $("#capabilityDialog").close();
  });
}

function renderScenarioTabs() {
  $("#scenarioTabs").innerHTML = scenarios.map((scenario, index) => `
    <button class="scenario-tab ${index === activeScenario ? "active" : ""}" role="tab" aria-selected="${index === activeScenario}" data-scenario="${index}">${scenario.label}</button>
  `).join("");
  $$("[data-scenario]").forEach(button => button.addEventListener("click", () => {
    activeScenario = Number(button.dataset.scenario);
    activeSimStep = 0;
    renderScenarioTabs();
    renderSimulator();
  }));
}

function renderSimulator() {
  const scenario = scenarios[activeScenario];
  const step = scenario.steps[activeSimStep];
  $("#simTrack").innerHTML = scenario.steps.map((entry, index) => `
    <div class="sim-step ${index < activeSimStep ? "done" : ""} ${index === activeSimStep ? "current" : ""}">
      <span class="sim-step-index">${index < activeSimStep ? "✓" : String(index + 1).padStart(2, "0")}</span>
      <span><strong>${escapeHtml(entry.title)}</strong><small>${escapeHtml(entry.owner)}</small></span>
    </div>`).join("");
  $("#consoleTitle").textContent = scenario.id;
  $("#simCounter").textContent = `${activeSimStep + 1} / ${scenario.steps.length}`;
  $("#simOwner").textContent = step.owner;
  $("#simTitle").textContent = step.title;
  $("#simDescription").textContent = step.description;
  $("#simObserve").textContent = step.observe;
  $("#simPrev").disabled = activeSimStep === 0;
  $("#simNext").textContent = activeSimStep === scenario.steps.length - 1 ? "重新播放 ↻" : "下一步 →";
}

function initSimulator() {
  $("#simPrev").addEventListener("click", () => {
    if (activeSimStep > 0) activeSimStep -= 1;
    renderSimulator();
  });
  $("#simNext").addEventListener("click", () => {
    const length = scenarios[activeScenario].steps.length;
    activeSimStep = activeSimStep === length - 1 ? 0 : activeSimStep + 1;
    renderSimulator();
  });
}

function renderLabs() {
  $("#labList").innerHTML = labs.map((lab, index) => `
    <button class="lab-item ${index === activeLab ? "selected" : ""} ${completedLabs.has(lab.id) ? "completed" : ""}" data-lab="${index}">
      <span class="lab-number">${completedLabs.has(lab.id) ? "✓" : String(index + 1).padStart(2, "0")}</span>
      <span class="lab-name"><strong>${escapeHtml(lab.name)}</strong><small>${escapeHtml(lab.subtitle)}</small></span>
      <span class="lab-time">${lab.time}</span>
    </button>`).join("");
  $$("[data-lab]").forEach(button => button.addEventListener("click", () => {
    activeLab = Number(button.dataset.lab);
    renderLabs();
    renderLabDetail();
  }));
}

function renderLabDetail() {
  const lab = labs[activeLab];
  const done = completedLabs.has(lab.id);
  $("#labDetail").innerHTML = `
    <div class="lab-detail-head">
      <div><span class="lab-stage-tag">${escapeHtml(lab.level)}</span><h3>${escapeHtml(lab.name)}</h3><p class="lab-goal">${escapeHtml(lab.goal)}</p></div>
      <button class="complete-toggle ${done ? "done" : ""}" id="completeLab">${done ? "✓ 已完成" : "标记完成"}</button>
    </div>
    <div class="lab-sections">
      <div class="lab-box full"><small>准备</small><p>${escapeHtml(lab.setup)}</p></div>
      <div class="lab-box"><small>操作</small><ul>${lab.action.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</ul></div>
      <div class="lab-box"><small>重点观察</small><p>${escapeHtml(lab.observe)}</p></div>
      <div class="lab-box full"><small>通过标准</small><p>${escapeHtml(lab.pass)}</p></div>
    </div>
    <div class="prompt-block">
      <div class="prompt-head"><span>CLAUDE CODE / PRACTICE PROMPT</span><button class="copy-button" id="copyPrompt">复制提示</button></div>
      <pre><code>${escapeHtml(lab.prompt)}</code></pre>
    </div>
    <p class="safety-note"><strong>安全边界：</strong>${escapeHtml(lab.safety)}</p>`;
  $("#completeLab").addEventListener("click", () => toggleLab(lab.id));
  $("#copyPrompt").addEventListener("click", () => copyText(lab.prompt));
}

function toggleLab(id) {
  if (completedLabs.has(id)) completedLabs.delete(id); else completedLabs.add(id);
  localStorage.setItem("cc-lab-progress", JSON.stringify([...completedLabs]));
  renderLabs();
  renderLabDetail();
  updateProgress();
}

function updateProgress() {
  const count = completedLabs.size;
  const percent = Math.round(count / labs.length * 100);
  $("#headerProgress").textContent = `${count} / ${labs.length}`;
  $("#headerProgressBar").style.width = `${percent}%`;
  $("#practicePercent").textContent = `${percent}%`;
  $("#practiceProgressBar").style.width = `${percent}%`;
}

async function copyText(value) {
  try {
    await navigator.clipboard.writeText(value);
  } catch {
    const textarea = document.createElement("textarea");
    textarea.value = value;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand("copy");
    textarea.remove();
  }
  const toast = $("#toast");
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 1400);
}

function initReveal() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    $$(".reveal").forEach(item => item.classList.add("visible"));
    return;
  }
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: .08 });
  $$(".reveal").forEach(item => observer.observe(item));
}

function init() {
  initArchitecture();
  initTree();
  renderFilters();
  renderCapabilities();
  $("#capabilitySearch").addEventListener("input", renderCapabilities);
  initDialog();
  renderScenarioTabs();
  renderSimulator();
  initSimulator();
  renderLabs();
  renderLabDetail();
  updateProgress();
  $("#resetProgress").addEventListener("click", () => {
    completedLabs = new Set();
    localStorage.removeItem("cc-lab-progress");
    renderLabs();
    renderLabDetail();
    updateProgress();
  });
  initReveal();
}

init();
