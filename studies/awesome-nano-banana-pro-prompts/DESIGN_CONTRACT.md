# Design Contract — Nano Banana Pro Prompt Atlas

```text
Entry mode: Brief-led implementation
Request revision: 1
Target user and context: 正在进行 AI 能力研究与快速原型开发的个人开发者/小团队
Desired first impression: 这是可理解、可验证的能力图谱，而不是一万多条提示词的堆叠
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 强层级、克制的深色展览感；案例图片承担证据；不依赖 3D/WebGL
Information constraints: 严格区分模型能力、提示词方法、仓库内容管线；案例必须带作者和来源
Operation constraints: 静态 GitHub Pages；不引入后端、登录、真实生图 API 或构建依赖
State constraints: 分类筛选、文本搜索、无结果、样例详情弹窗、明暗主题
Environment constraints: 原生 HTML/CSS/JS；支持 GitHub Pages 和本地静态服务器
Primary journey: 阅读能力架构 → 按能力筛选 → 打开优秀案例 → 理解其证明的能力和可迁移模式
User-defined phases: 能力总结；架构划分；优秀样例演示；价值沉淀
Required artifacts: 可运行页面、正式研究记录、案例来源、设计契约、浏览器验收记录
Autonomy authorization: 用户明确要求用 Web 方式完成总结和演示，允许范围内直接实现
User-decision boundary: 新增真实生图服务、后端、账号、商业化素材授权或更换发布平台
Observable completion criteria: 页面可运行；能力层级清楚；至少 8 个跨能力案例；详情可操作；桌面/平板/390px 可用；键盘与 reduced-motion 有处理
Coverage record: 见 VALIDATION.md
```

## Design direction

| 决策 | 选择 | 服务目标 | 可观察标准 |
|---|---|---|---|
| 信息层级 | 结论 → 双层架构 → 能力地图 → 案例证据 → 提示词结构 → 价值边界 | 先建立理解框架，再看案例 | 首屏不依赖滚动即可看懂仓库定位和研究入口 |
| 视觉基调 | 编辑式研究展览，深色为默认，暖黄作为能力强调色 | 呼应 Nano Banana，但避免卡通化 | 强调色只用于焦点、标签和交互，不覆盖大面积内容 |
| 字体角色 | 中文系统无衬线正文 + 紧凑大标题 + 等宽数据标签 | 保持研究感和可读性 | 长文行宽受控，卡片标题与元数据层级明确 |
| 材质与深度 | 实线边框、低阴影、图片裁切、轻微背景纹理 | 让案例像研究证据而非营销卡片 | 无重度玻璃拟态，不依赖模糊制造层次 |
| 交互 | 筛选、搜索、弹窗详情、主题切换 | 支持快速比较和深挖一个案例 | 所有操作有选中/空状态、键盘焦点和关闭路径 |
| 响应式 | 宽屏双栏/多栏，平板折叠，手机单列 | 保持相同阅读路径 | 390px 无横向滚动、遮挡或不可达控件 |
| 动效 | 仅用于筛选、弹窗和焦点过渡 | 解释状态变化 | reduced-motion 下关闭非必要位移和过渡 |

## Scope boundary

### In scope

- 仓库与模型能力的宏观分层。
- 8 个代表性案例的本地化展示和来源归属。
- 提示词结构拆解、价值判断和研究阶段建议。
- 纯前端可访问交互与 GitHub Pages 接入。

### Out of scope

- 抓取或导入 15,000+ 全量提示词。
- 生图 API、模型调用、账号、计费或上传图片。
- CMS、数据库、投稿审核、多语言生产系统。
- 对案例结果真实性、版权或商业可用性的最终法律判断。
