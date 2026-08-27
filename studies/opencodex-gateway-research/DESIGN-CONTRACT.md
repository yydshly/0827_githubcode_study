# OpenCodex 与 Agent 网关研究页设计契约

## Contract

- **Entry mode:** brief-led
- **Request revision:** 1
- **Target user and context:** 正在评估 Codex、Claude Code 模型中转与协议适配能力的技术负责人、产品负责人和平台研发人员。
- **Desired first impression:** 先得到明确结论，再通过图示理解请求经过哪里、谁负责什么、应该选哪些开源项目。
- **Visual ambition:** Editorial
- **Experience architecture:** Editorial Flow
- **Visual constraints:** 延续仓库研究门户的深色技术感，但建立独立的蓝绿信号色；不依赖外部图片、字体或运行时资源；图示必须同时依靠文字、结构和颜色表达。
- **Information constraints:** 明确区分事实、研究判断和建议；不把 Codex / Claude Code 描述成空壳；不把配置切换、协议网关、企业网关和商业运营平台混为一谈；所有项目链接指向官方仓库。
- **Operation constraints:** 静态 GitHub Pages；核心内容无 JavaScript 也可完整阅读；主题切换、链路视角切换和场景推荐属于渐进增强。
- **State constraints:** 支持系统主题、手动浅色/深色主题、直连/网关两种链路视角、四种选型场景；所有状态必须有文字反馈和 `aria-pressed`。
- **Environment constraints:** `docs/` 由现有 GitHub Actions + Jekyll 发布；页面必须使用相对路径；桌面、平板和 390px 手机可用；尊重 `prefers-reduced-motion`。
- **Primary journey:** 读者从一句话结论进入，理解请求改道原理与能力边界，比较 OpenCodex / CC Switch / 通用网关，按自身场景得到组合建议，最后看到分阶段建设路线和风险边界。
- **User-defined phases:** 整理理解与研究；网页化展示；提交 GitHub；部署并验证。
- **Required artifacts:** 研究 README、独立 Web 页面、页面样式与交互脚本、验证记录、门户索引更新、Git 提交和在线地址。
- **Autonomy authorization:** 用户明确要求整理、网页展示、部署到 GitHub 并提交必要信息；授权范围内直接实现和发布。
- **User-decision boundary:** 不创建真实网关后端、不部署需要账号或密钥的服务、不替用户决定商业转售或规避供应商限制的策略。

## Observable completion criteria

1. 首屏直接回答“本质是不是把默认模型地址改到网关，再做适配与调度”。
2. 一张前后对比图能区分直连官方与接入网关。
3. 一张职责边界图能区分客户端 Agent、网关和模型供应商。
4. 清晰比较 OpenCodex、CC Switch、通用模型网关和运营控制面的切入点。
5. 至少覆盖 OpenCodex、Claude Code Router、LiteLLM、Higress、New API、Bifrost、TensorZero、Portkey 和 Envoy AI Gateway。
6. 给出面向编程 Agent、企业共享、多租户平台和质量优化四种场景的组合建议。
7. 页面包含上游条款、密钥安全、协议语义、双重转换和许可边界提示。
8. 页面在桌面、平板和 390px 手机无横向溢出或内容遮挡；主题和交互状态可用键盘操作。
9. GitHub Pages 线上地址可访问，页面与门户链接均通过实际浏览器验证。

## Coverage manifest

| User phase | Requirement / artifact | Surface / state | Evidence needed | Owning stage | Status | Next action |
|---|---|---|---|---:|---|---|
| 整理研究 | 研究事实与版本 | 官方仓库 | README、commit、license 元数据 | 0 | pass | 已固定 2026-08-27 研究快照 |
| 网页展示 | 可运行基线 | 本地页面 | 浏览器可访问 | 1 | pass | 本地 HTTP 200，正文与 10 个章节完整 |
| 网页展示 | 首屏结论与视觉层级 | 桌面深色 | 截图与 DOM 观察 | 2 | pass | 桌面首屏人工检查通过 |
| 网页展示 | 阅读顺序与架构图 | 桌面 / 平板 / 手机 | 截图、无溢出 | 3 | pass | 1440 / 768 / 390 三档无横向溢出 |
| 网页展示 | 链路视角切换 | 直连 / 网关 | 浏览器交互 | 4 | pass | 两种视图和文字反馈一致 |
| 网页展示 | 场景选型器 | 四种场景 | 浏览器交互 | 5 | pass | 四种推荐数据已实现，多租户场景实测通过 |
| 网页展示 | 主题状态 | 浅色 / 深色 | 浏览器截图与状态观察 | 6 | pass | 主题、按钮和 theme-color 状态一致 |
| 网页展示 | 响应式与键盘 | 1440 / 768 / 390；键盘 | 截图、焦点顺序 | 7 | pass | 跨视口无溢出，首次 Tab 到达 skip link |
| 网页展示 | reduced-motion / 无 JS 基线 | 能力边界 | 浏览器或源码证据 | 8 | pass | 动画关闭且无 JS 核心内容仍可读 |
| GitHub 提交 | 研究记录与页面文件 | Git | 精确 diff、独立 commit | 9 | pass | commit d96fd85 仅包含 6 个研究文件 |
| GitHub 部署 | 独立页面上线 | GitHub Pages | 工作流和线上浏览器 | 9 | pass | Pages run 33091546723 成功，线上 23/23 通过 |
| GitHub 部署 | 门户标记 published | README / docs index | 第二次 commit、线上浏览器 | 9 | pass | commit 9785367；Pages run 33091916046；线上门户入口 10/10 通过 |

## Design direction

| Decision | Chosen direction | Why it serves the goal | Observable constraint | Acceptance criterion |
|---|---|---|---|---|
| Focal hierarchy | “改变模型入口，不替代 Agent 内核”作为首屏主结论 | 纠正最容易混淆的认知 | 第一屏只保留一个主结论和一个链路图 | 读者无需滚动即可回答本质问题 |
| Information flow | 结论 → 原理 → 边界 → 对比 → 选型 → 路线 → 风险 | 贴合讨论中认知逐步收敛的顺序 | 不以项目清单开场 | 每一节都回答一个明确决策问题 |
| Typography | 中文无衬线正文 + 等宽微标签 | 保持技术研究感与可读性 | 不依赖远程字体 | 中英文、代码和数字均正常换行 |
| Palette | 深海军蓝背景、青绿色链路、琥珀色边界提示 | 将“可控路径”和“风险边界”语义化 | 同一语义在两主题保持一致 | 不依靠颜色单独传达状态 |
| Material / depth | 少量分层面板、细线、网格背景 | 支撑复杂架构但不过度卡片化 | 重要结构优先，装饰次要 | 移动端不出现嵌套卡片拥挤 |
| Motion | 仅链路节点和状态切换有轻量过渡 | 帮助理解请求流向 | reduced-motion 下关闭非必要动画 | 信息不依赖动画出现 |
