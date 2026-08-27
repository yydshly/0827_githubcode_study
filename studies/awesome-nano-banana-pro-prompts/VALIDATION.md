# Coverage & Validation

## Coverage manifest

| 用户阶段 | 要求/产物 | 表面/状态 | 证据 | 所属阶段 | 状态 | 下一步 |
|---|---|---|---|---|---|---|
| 能力总结 | 仓库定位与双层能力架构 | 桌面首屏 | 截图 + DOM | Stage 2–3 | pass | 已完成 |
| 架构划分 | 模型能力与资产系统不混淆 | 能力架构区 | 截图 + 文案检查 | Stage 3 | pass | 已完成 |
| 优秀样例 | 至少 8 个跨能力案例 | 默认/筛选/搜索 | 交互 + DOM | Stage 3–6 | pass | 8 个本地案例，筛选与搜索通过 |
| 样例拆解 | 弹窗展示能力、模式、提示词和来源 | 打开/关闭/Escape | 交互 + 焦点观察 | Stage 4–6 | pass | 打开、Escape、焦点返回通过 |
| 价值沉淀 | 提示词结构、当前价值、后续边界 | 文档流 | 截图 + 文案检查 | Stage 3 | pass | 已完成 |
| 响应式 | 桌面 | 1440×900 | 截图 + 溢出检查 | Stage 7 | pass | 无横向溢出 |
| 响应式 | 平板 | 1024×768 | 截图 + 溢出检查 | Stage 7 | pass | 无横向溢出 |
| 响应式 | 手机 | 390×844 | 截图 + 溢出检查 | Stage 7 | pass | 无横向溢出，8 个案例可访问 |
| 主题 | 深色与浅色切换 | dark → light | 状态 + 截图 | Stage 7 | pass | 主题状态切换通过 |
| 键盘 | 弹窗关闭和焦点返回 | Escape + focus | 交互观察 | Stage 7 | pass | 焦点返回触发卡片 |
| 动效 | reduced-motion | reduce | 计算样式 | Stage 7–8 | pass | transition-duration 为 1e-05s |
| 工程 | GitHub Pages 静态兼容 | 本地服务/Pages 路径 | HTTP + 控制台 | Stage 1/9 | pass | 所有本地资源 200，无控制台错误 |
| 文档 | 研究记录、来源和交接 | 仓库文件 | 文件检查 | Stage 9 | pass | 研究单元与两个首页索引已更新 |

## Runtime evidence

- 启动命令：`python -m http.server 4173 --directory docs --bind 127.0.0.1`
- Canonical URL：`http://127.0.0.1:4173/nano-banana-pro/`
- 浏览器：Playwright Chromium（headless）
- 验收时间：2026-08-27T06:14Z
- 截图：`nano-desktop.png`、`nano-tablet.png`、`nano-mobile.png`、`nano-dialog.png`、`nano-light.png`

| 检查 | 结果 |
|---|---|
| 页面标题与首屏主标题 | pass |
| 默认 8 个案例与 8 张本地图片 | pass |
| “文字/知识”筛选返回 4 条 | pass |
| 搜索“涡轮”返回 1 条 | pass |
| 案例弹窗和来源链接 | pass |
| Escape 关闭与焦点返回 | pass |
| dark → light 主题切换 | pass |
| 1440 / 1024 / 390 无横向溢出 | pass |
| reduced-motion | pass |
| 浏览器控制台错误 | 0 |

## Refinement ledger

### Stage 2–3：首屏与信息架构

- Browser environment：1440×900，dark。
- Observed evidence：主标题、核心结论和四层价值地图均在首屏；模型层与仓库层在独立架构面板中。
- Decision：`pass`。

### Stage 5–6：主要交互

- Observed evidence：筛选、搜索、案例详情、来源链接、Escape 和焦点返回均通过。
- Decision：`pass`。

### Stage 7–8：跨表面与回退

- Observed evidence：1440、1024、390 三种视口无横向溢出；主题切换、reduced-motion 和本地图片加载通过。
- Decision：`pass`。

## Terminal audit

- 无 `continue`、`defer` 或 `blocked` 项。
- 所有用户要求的产物已存在。
- JavaScript 语法检查通过。
- 浏览器证据与交付声明一致。
