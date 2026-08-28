# Web Demo Coverage Manifest

| 用户阶段 | 需求或产物 | 表面 / 状态 | 证据 | 负责阶段 | 状态 | 下一动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 展示当下进度 | 首屏显示 119 篇、247 候选与 Stage 5B 首个真实公开案例状态 | 1440 浅色 | 更新 `desktop-light.png` + DOM 文本 | 2–3 | pass | — |
| 展示整理结果 | 五路计数总和为 247 | 1440 浅色 | 39 / 108 / 50 / 30 / 20 DOM 断言 | 3 | pass | — |
| 展示整理结果 | 候选按类型筛选和关键词搜索 | populated / empty | 搜索、108 条原则筛选、空状态、重置 | 4–6 | pass | — |
| 展示整理结果 | 候选详情显示来源、短引文、摘要与类型字段 | 详情对话框 | 打开/关闭/Escape/焦点回归 | 5–7 | pass | — |
| 演示仓颉能力 | 四类真实问题映射到方法链与证据候选 | route result | 点击与方向键导航 + 候选详情 | 5–6 | pass | — |
| Stage 1.5 试点 | 原“线上故障复盘”明确显示 V3 不通过、不能原样产品化 | pilot / original | DOM：V3 fail + reject-as-standalone | 3,6 | pass | — |
| Stage 1.5 试点 | 修订候选“系统性故障学习审查”显示暂时通过 | pilot / revised | DOM：provisional pass + 新能力名 | 3,6 | pass | — |
| Stage 1.5 试点 | V1/V2/V3 与修订理由可解释 | pilot / evidence | 3 张验证卡 + 专用截图 | 3,6 | pass | — |
| Stage 1.5 试点 | 18 个冻结案例覆盖五种路由状态 | pilot / tests | DOM 总和 18；8/3/2/2/3 分布 | 3,6 | pass | — |
| 用户确认门 | 记录试点曾等待确认且用户已批准进入 Stage 2 | pilot / gate | 已确认 + 1/247 边界 | 3,6 | pass | — |
| Stage 2 构造 | 展示首个正式 Skill 的名称、版本、RIA++ 六段和静态验证状态 | stage2 / build | DOM 断言 + 专用截图 | 3,6 | pass | — |
| Stage 2 构造 | 展示五种响应路由、两个按需参考和 UI 元数据 | stage2 / anatomy | DOM 数量与标签断言 | 3,6 | pass | — |
| Stage 2 / 4 / 5A 分层 | 明确 Stage 2 是构造验证，Stage 4 是合成独立行为证据，Stage 5A 是项目级宿主发现证据 | stage2 / next gate | 页面边界文案 + DOM 断言 | 3,6 | pass | — |
| Stage 4 压力测试 | 展示 v0.1.0 首轮 16/19、三项失败和 v0.1.1 修订 | stage4 / learning loop | DOM 计数 + `stage4-test-desktop.png` | 3,6 | pass | — |
| Stage 4 最终回归 | 展示 19/19、8/8 正例、5/5 边界、6/6 负例和 0 误触发 | stage4 / final | DOM 断言 + 桌面/手机专用截图 | 3,6,7 | pass | — |
| Stage 4 盲态协议 | 展示三位全新评测 Agent、隐藏 oracle 字段和主代理独立判分 | stage4 / protocol | 页面文本 + 数据校验 | 3,6 | pass | — |
| Stage 4 边界 | 明确合成案例与真实事故材料未评测；安装事实只在 Stage 5A 证明 | stage4 / boundary | 页面文本 + DOM 断言 | 3,6 | pass | — |
| Stage 5A 安装 | 展示项目级目录、v0.1.1 与 6/6 文件哈希一致 | stage5 / install | 结构化验证 + DOM 断言 | 3,6 | pass | — |
| Stage 5A 显式调用 | 新 Codex 只读临时进程实际读取安装路径并返回 full_review | stage5 / explicit | CLI 输出摘录 + DOM 断言 | 3,6 | pass | — |
| Stage 5A 隐式触发 | 不写 Skill 名称时，事故语义自动选择 incident-learning-audit | stage5 / implicit | CLI 输出摘录 + DOM 断言 | 3,6 | pass | — |
| Stage 5A 负例边界 | 纯未来架构选型不触发 incident-learning-audit | stage5 / negative | CLI 输出摘录 + DOM 断言 | 3,6 | pass | — |
| Stage 5A 完整示例 | 复盘示例包含证据、因果、表面整改、可验收行动与学习闭环 | stage5 / output | 示例文件 + 键盘展开 8 节 | 5–7 | pass | — |
| Stage 5A 性能观察 | 分离“发现/路由成功”与嵌套 CLI 长输出延迟 | stage5 / runtime | 报告与页面诚实边界 | 3,6 | pass | — |
| 演示落地用法 | 用户输入问题并自动识别学习、故障、架构或领导力场景 | trial input / success | 四类核心域输入均路由正确 | 4–6 | pass | — |
| 演示落地用法 | 结果展示输入缺口、候选证据、交付清单和风险边界 | trial result | 4 阶段 + 4 证据 + 详情交互 | 5–6 | pass | — |
| 适用域门 | 核心域问题正常运行正式候选执行链 | fit / core | 技术场景输入 + 4 阶段 + 4 证据 | 5–6 | pass | — |
| 适用域门 | 相邻域只迁移方法并明确尚未验证 | fit / adjacent | “学习摄影” + 迁移警告 + 4 证据 | 5–6 | pass | — |
| 适用域门 | 域外或高风险问题停止路由且不展示伪证据 | fit / out | 股票问题 + 0 阶段 + 0 证据 + 推荐来源 | 5–6 | pass | — |
| 状态恢复 | 域外问题修改为核心域后完整恢复 | out → core | 连续运行后停止状态清零 | 6–7 | pass | — |
| 表单恢复 | 空输入给出可恢复错误并把焦点留在输入框 | validation error | `aria-invalid` + 焦点断言 | 5–7 | pass | — |
| 诚实边界 | 明确通用能力路由器是确定性沙盒，不是浏览器内实时 Agent；正式事故 Skill 的宿主与公开案例证据单列 | trial disclaimer | 适用域规则 + Stage 5A/5B 分层 + 域外示例 | 3,6 | pass | — |
| 展示边界 | 明确代理语料、247 非 Skill、仅完成 1 个 Stage 1.5、Stage 2 和 Stage 4 合成闭环 | 全页面 | 首屏门禁 + Stage 1.5/2/4 区 + 边界区块 | 3 | pass | — |
| 主题 | 明暗主题保持层级、边界和可读性 | light / dark | 1440 浅色 + 768 深色浏览器证据 | 2,7 | pass | — |
| 多视口 | 主旅程无裁切、重叠或不可达控件 | 1440 / 768 / 390 | 更新截图 + 无横向溢出断言 | 7 | pass | — |
| 键盘 | Tab 可达主要控件，焦点可见 | desktop | 键盘运行、状态恢复、Stage 5A 示例展开 | 7 | pass | — |
| 动效 | reduced-motion 不隐藏信息 | 1024 × 768 reduce | 媒体偏好命中且内容完整 | 7–8 | pass | — |
| 工程 | 零依赖启动、数据可重建、无控制台错误 | canonical runtime | `npm run check` + Chromium console | 1,9 | pass | — |
| 交付 | README、设计契约、覆盖清单、浏览器证据和交接记录 | files | Revision 9 验证、截图与交接记录 | 9 | pass | — |
| 完整演示 / 路由 | 五种响应模式可通过步骤实验切换，且允许/禁止输出与合同一致 | stage5b / routes / keyboard | 5 个 tab；方向键与 Home 断言 | 4–7 | pass | — |
| 完整演示 / 来源 | Cloudflare 2019 WAF 事故事实链接官方复盘，2020 后续只验证直接支持的行动 | stage5b / sources | 2 个官方域名链接 + Stage 5B 结构校验 | 3,6 | pass | — |
| 完整演示 / 输出 | `full_review` 所有模式前置项和八段输出均可逐步查看 | stage5b / audit steps | 8 步 DOM、前后导航、直选与 End 键 | 5–7 | pass | — |
| 完整演示 / 证据 | 事实、推断、未知分离并可筛选，事实带来源或时间 | stage5b / ledger | 三类结构校验；未知筛选 2 条 | 5–7 | pass | — |
| 完整演示 / 因果 | 每条因果候选包含层级、支持证据、强度和证伪方式 | stage5b / causal ladder | 6 条因果与证伪字段断言 | 3,6 | pass | — |
| 完整演示 / 整改 | 官方行动映射风险机制，并显式显示负责人、验收、失败和复查缺口 | stage5b / actions | 6 份行动合同；只有引擎迁移部分可关闭 | 3,6 | pass | — |
| 完整演示 / 闭环 | 显示复查、复发验证、可关闭/不可关闭行动和评分证据 | stage5b / closure | 86/100、结论与关闭状态断言 | 6 | pass | — |
| 完整演示 / 价值 | 对照“坏正则导致故障”与系统性多层结论 | stage5b / comparison | shallow/system 对照 DOM | 2–3 | pass | — |
| Stage 5B 多表面 | 工作台在 1440/768/390、明暗主题和 reduced-motion 下可用 | stage5b / matrix | 专用截图、无溢出、无 console error | 7–8 | pass | — |
| Stage 5B 工程 | 结构化案例验证、数据构建与浏览器回归可复现 | scripts / artifacts | `npm.cmd run check` + `npm.cmd run verify:browser` | 9 | pass | — |
| Stage 5B 交付 | 报告、结构化审计、README、设计契约、覆盖清单和交接记录一致 | files | Revision 8 终端审计 | 9 | pass | — |
| Revision 9 / 首屏 | 首屏直接表达 4 个能力方向、1 个正式 Skill 和最佳演示入口 | overview / desktop-mobile | DOM 文本、CTA 与首屏截图 | 2–3 | pass | — |
| Revision 9 / 能力总览 | 四项能力显示适用问题、输入、输出、边界和成熟度 | capability-atlas | 4 卡 DOM、字段与状态断言 | 3–6 | pass | — |
| Revision 9 / 诚实成熟度 | 事故审查为 6/6 正式 Skill，其他三项为 1/6 候选能力 | capability-atlas / maturity | 1 formal + 3 candidate 断言 | 3,6 | pass | — |
| Revision 9 / 卡片行动 | 正式能力进入真实案例，候选能力进入对应沙盒试跑 | capability-atlas / actions | 学习候选与事故正式能力行动验收通过 | 4–7 | pass | — |
| Revision 9 / 最佳路径 | 输入—路由—证据—因果—行动—闭环六站可快速导航 | stage5b / demo path | 6 按钮、步骤映射和焦点断言 | 4–7 | pass | — |
| Revision 9 / 价值快照 | 最佳演示首屏显示输入、路线、6 因果、6 行动与 86 分结论 | stage5b / snapshot | 5 项快照与结构化数据一致 | 3,6 | pass | — |
| Revision 9 / 多表面 | 新主旅程在 1440/768/390、明暗主题和 reduced-motion 可用 | full matrix | 4 表面通过、无溢出、无 console error | 7–8 | pass | — |
| Revision 9 / 工程 | 数据构建、结构校验和既有交互不回归 | scripts / runtime | `npm.cmd run check` + 两层浏览器回归 | 9 | pass | — |
| Revision 9 / 交付 | README、契约、覆盖、验证和交接同步 | docs / evidence | Revision 9 终端审计 | 9 | pass | — |
| Stage 5C / 接入门 | 最佳演示明确显示接入基础已就绪、组织案例为 0、外部效度未建立 | stage5b / next gate | 4 表面 DOM、边界文案与无溢出断言 | 3,6–8 | pass | — |
| Stage 5C / 工程 | 授权、脱敏、稳定性、时间线、证据与独立复核均可自动检查 | stage5c / validator | `validate-stage5c.mjs` 空案例诚实状态与模板合同 | 6,9 | pass | — |
| Revision 10 / 首屏定位 | 首屏把库定义为高价值长内容到 Agent Skills 的方法工厂 | overview / desktop-mobile | 标题、主张、CTA 与两视口截图 | 2–3 | pass | — |
| Revision 10 / 库能力地图 | 展示六类能力、八类输入来源、七阶段产线和三方责任边界 | library / loaded | 结构化数据、DOM 字段与桌面/手机截图 | 3,6–7 | pass | — |
| Revision 10 / 来源适用性 | 说明需要文本、方法密度、可追溯证据与重复使用价值 | library / guidance | 四项适用性检查与不适用边界 | 3 | pass | — |
| Revision 10 / 优秀案例 | 展示课程、视频合集、提示词集合、增长资料、多年信件和本地受控案例 | case-gallery / all | 6卡、产出规模、证明力、局限与外链断言 | 3–6 | pass | — |
| Revision 10 / 案例筛选 | 按全部、视频、资料集、长期文档和受控研究筛选 | case-gallery / filters | 鼠标与键盘筛选、计数和恢复断言 | 4–5,7 | pass | — |
| Revision 10 / 证据口径 | 区分上游公开结构核对与我们的受控验证 | case-gallery / evidence | 卡片徽标、边界说明与结构化数据 | 3,6 | pass | — |
| Revision 10 / 深度案例桥接 | 从库级案例进入《左耳听风》能力资产和最佳演示 | our-case / links | 锚点、焦点和原旅程不回归 | 4–5 | pass | — |
| Revision 10 / 文档 | 沉淀库能力说明和上游案例目录 | docs | 两份可追溯 Markdown 文档 | 9 | pass | — |
| Revision 10 / 多表面 | 新主旅程在1440/768/390、明暗主题和reduced-motion可用 | full matrix | 截图、无溢出、无console error | 7–8 | pass | — |
| Revision 10 / 工程交付 | 数据、语法、既有回归、文档和交接一致 | scripts / docs / runtime | `npm.cmd run check`、三层回归与终端审计 | 9 | pass | — |
| Revision 11 / 生态定位 | 说明 Cangjie 在完整 Agent Skill 生产链中的位置 | ecosystem / chain | 六层链路、代表工具与定位文案 | 3 | pass | — |
| Revision 11 / 同类目录 | 汇总 Skill Seekers、两个 book-to-skill、skill-factory、doc2skill 及相邻基础设施 | ecosystem / all | 9 卡、官方链接、差异、边界与采用建议 | 3,6 | pass | — |
| Revision 11 / 分类筛选 | 按全部、直接同类、质量与参考、标准与分发筛选 | ecosystem / filters | 9/5/2/2 分组、鼠标与键盘、计数和 aria 状态 | 4–5,7 | pass | — |
| Revision 11 / 推荐组合 | 展示五层内部 Skill Factory 建议架构 | ecosystem / adoption | 来源→蒸馏→治理→评测→标准分发五步 | 3,6 | pass | — |
| Revision 11 / 生态文档 | 沉淀同类项目能力、差异、风险和研究优先级 | docs | ECOSYSTEM_COMPARISON 与现有说明互链 | 9 | pass | — |
| Revision 11 / 多表面 | 新生态旅程在 1440/768/390、明暗主题和 reduced-motion 可用 | ecosystem / matrix | 截图、无溢出、无 console error | 7–8 | pass | — |
| Revision 11 / 既有回归 | 库能力、案例、本地能力资产和 Skill 演示不回归 | full journey | 三层既有回归 + 新生态专测 | 5–7 | pass | — |
| Revision 11 / 工程交付 | 数据、结构校验、README、验证和交接一致 | scripts / docs / runtime | `npm.cmd run check`、三脚本全回归与终端审计 | 9 | pass | — |
