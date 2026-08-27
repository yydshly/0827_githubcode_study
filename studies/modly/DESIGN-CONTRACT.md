# Modly 图生 3D 能力研究站：设计与交付契约

```text
Entry mode: Brief-led implementation
Request revision: 2
Target user and context: 需要判断是否继续投入图生 3D 的内部产品、技术与内容团队；以快速阅读和后续复查为主
Desired first impression: 结论明确、可信、克制，像一份可直接用于决策的技术研究简报
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 深色技术编辑风格；核心结论优先；不用外部图片、WebGL 或重型依赖；图示必须在纯 HTML/CSS 下成立
Information constraints: 区分已确认事实、能力判断和建议；不把 Modly 描述成模型；不把市场模型做成无依据的绝对排名
Operation constraints: 静态 GitHub Pages；筛选和路径推荐只在浏览器本地执行；所有关键内容无需 JavaScript 也可阅读
State constraints: 支持模型分类筛选、探索路径切换、导航当前章节；无加载、登录或真实 API 状态
Environment constraints: 复用仓库 docs/ 发布工作流；相对路径；支持现代桌面与移动浏览器；单一深色主题
Primary journey: 打开页面 → 理解官网展示页与桌面推理端的区别 → 理解 Modly 的本质与边界 → 看清本地性能依赖 → 比较可接模型与云端服务 → 得到是否以及如何继续探索的结论
User-defined phases: 汇总理解；核实官网演示依赖；整理市场能力；说明后期探索；形成网页；更新外层 README；提交并推送远端 GitHub
Required artifacts: studies/modly/README.md；docs/modly/index.html；docs/modly/styles.css；docs/modly/app.js；docs/index.html 入口；README.md 入口；studies/modly/VALIDATION.md
Autonomy authorization: 用户明确要求整理、部署、补充 README、提交并推送；允许在该范围内直接实现和验证
User-decision boundary: 不购买 API、不下载模型、不修改 GitHub Pages 仓库设置、不替用户选择商业供应商
Observable completion criteria: 页面在桌面、平板和 390px 手机可读且无横向溢出；筛选与路径推荐键盘可用；reduced-motion 有回退；来源链接清晰；README 与门户可发现；只提交本任务文件；推送后 Pages 工作流成功
```

## 设计方向

| 决策 | 选择 | 可观察约束 | 验收标准 |
|---|---|---|---|
| 信息层级 | “一句话结论”先于模型清单 | 首屏必须直接回答“它是什么、依赖什么” | 无需滚动即可读到核心判断 |
| 阅读路径 | 结论 → 原理 → 市场 → 选择 → 探索 | 每一节只回答一个决策问题 | 导航和标题顺序一致 |
| 视觉语言 | 深色研究档案 + 绿色能力层 + 橙色模型层 | 颜色同时配合文字标签，不单独承载语义 | 灰阶下仍能区分角色和状态 |
| 交互 | 模型筛选 + 探索路径切换 | 原始表格/卡片内容默认可见 | 关闭 JS 仍可完成主要阅读 |
| 响应式 | 双栏在窄屏转为单栏 | 390px 不裁切，不依赖横向滚动 | 桌面、平板、手机均完成主旅程 |
| 动效 | 仅用于进入和状态提示 | 遵守 prefers-reduced-motion | 减少动效时信息不丢失 |

## 覆盖清单

| 用户阶段 | 要求或产物 | 页面 / 状态 | 所需证据 | 负责阶段 | 状态 | 下一步 |
|---|---|---|---|---|---|---|
| 官网模型核实 | 区分官网展示层、桌面推理端与首页样例归属 | 官网判定区 | 官网文案、浏览器网络记录、官方仓库与扩展目录 | Stage 1–4 | pass | 已确认静态 GLB 展示；样例模型未公开；推理发生在桌面端 |
| 文档补充 | 将官网模型结论同步到专题页、研究 README 与外层 README | 三处文档 | 文本、链接与 diff 检查 | Stage 4–9 | pass | 三处内容已同步，模型归属与目录口径已分层 |
| 汇总理解 | Modly 本质、原理、边界、性能依赖 | 首屏与原理区 | 页面截图、文本检查 | Stage 2–3 | pass | 桌面与手机首屏已核对 |
| 市场能力 | 本地模型、可接模型、商业 API 对比 | 模型地图 | 桌面截图、筛选交互 | Stage 3–5 | pass | 12 个候选与 3 类筛选已验证 |
| 后期探索 | 给出低成本探索路线和停止条件 | 决策与路线区 | 路径切换、内容检查 | Stage 5–6 | pass | 5 条设备路线与停止条件已验证 |
| 网页交付 | 静态站完整可运行 | 默认状态 | 本地 HTTP 与浏览器证据 | Stage 1–9 | pass | 修订 2 已在 127.0.0.1:8897 真实运行与检查 |
| 多端适配 | 桌面、平板、390px 手机 | 1440 / 768 / 390 | 截图、溢出检查 | Stage 7 | pass | 修订 2 三视口截图且 overflowX=0 |
| 可访问性 | 键盘、焦点、语义、reduced-motion | 导航与交互控件 | 键盘路径、DOM/样式检查 | Stage 7 | pass | 官网导航、Escape、无 JS 与 corrected reduced-motion 已验证 |
| 文档入口 | 项目研究 README、总 README、门户 | 仓库文件 | 链接和 diff 检查 | Stage 9 | pass | 研究文档、外层 README 与门户入口已形成 |
| 远端发布 | 独立提交、推送、Pages 成功 | main / GitHub Pages | commit、push、Actions、线上 URL | Stage 9 | pass | 8e8fe85 已推送；Validate 与 Pages 成功；线上桌面和手机复检通过 |

