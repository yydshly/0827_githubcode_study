# OpenCodex 与 Agent 网关研究页验证记录

## Canonical runtime

- **Start command:** `python -m http.server 8765 --directory docs`
- **Local URL:** `http://127.0.0.1:8765/opencodex-gateway-research/`
- **Browser engine:** Playwright Chromium（Codex bundled runtime）
- **Locale:** `zh-CN`
- **Validation timestamp:** 2026-08-28 00:04:44 +08:00
- **Canonical public URL:** `https://yydshly.github.io/0827_githubcode_study/opencodex-gateway-research/`

## Local browser evidence

自动化浏览器验收共 23 项，全部通过：

| Surface | Evidence | Result |
|---|---|---|
| HTTP / runtime | `200`，标题包含 OpenCodex，正文 4238 字符，10 个 section | pass |
| Desktop | 1440×1000，`scrollWidth/clientWidth = 1440/1440` | pass |
| Tablet | 768×900，`scrollWidth/clientWidth = 768/768` | pass |
| Mobile | 390×844，`scrollWidth/clientWidth = 390/390`，主结论与链路控制可见 | pass |
| Flow interaction | 直连官方 / 接入网关切换，视图和文字反馈一致 | pass |
| Scenario interaction | 切换多租户平台后推荐内容包含 New API，`aria-pressed=true` | pass |
| Theme | 深色 → 浅色切换成功，按钮状态和 theme-color 同步 | pass |
| Keyboard | 首次 Tab 到达 skip link，保持原生焦点顺序 | pass |
| Reduced motion | `.gateway-node` 的非必要脉冲动画变为 `animation-name: none` | pass |
| No JavaScript | 390px 下核心正文 4149 字符、默认网关图可见、无横向溢出 | pass |
| Runtime errors | 无 console error / page error | pass |

最终截图保存在任务专属验证目录，未提交到产品仓库：

- `opencodex-gateway-desktop-dark.png`
- `opencodex-gateway-desktop-light.png`
- `opencodex-gateway-tablet.png`
- `opencodex-gateway-mobile.png`

人工首屏检查：桌面端主结论优先于架构图；网关责任域有明确视觉强调但不压过正文。390px 下标题、解释、两个主入口和职责图按阅读顺序堆叠，无裁切或重叠。

## Engineering checks

| Check | Result |
|---|---|
| `node --check docs/opencodex-gateway-research/app.js` | pass |
| HTML section open/close count | `10 / 10` |
| 本地绝对路径、`localhost`、`file://` 泄漏扫描 | pass |
| CSS / JS / 页面资源使用相对路径 | pass |
| 外部研究链接指向官方 GitHub 仓库或固定 commit | pass |

## Deployment evidence

- **Content commit:** `d96fd85`
- **Repository validation:** [run 33091547051](https://github.com/yydshly/0827_githubcode_study/actions/runs/33091547051) — success
- **GitHub Pages:** [run 33091546723](https://github.com/yydshly/0827_githubcode_study/actions/runs/33091546723) — build 21s、deploy 9s、success
- **Public page validation:** 2026-08-28 00:08:37 +08:00；公共 URL 返回 200，同一套 23 项浏览器检查全部通过，无控制台错误
- **Portal commit:** `9785367`
- **Portal Pages:** [run 33091916046](https://github.com/yydshly/0827_githubcode_study/actions/runs/33091916046) — build 20s、deploy 18s、success
- **Portal browser validation:** 2026-08-28 00:12:50 +08:00；10 项检查全部通过：HTTP 200、统计 `10/09/01/00`、卡片与发布状态正确、公开入口点击可进入研究页、390px 无溢出、无控制台错误
- **Non-blocking workflow annotation:** GitHub Actions 提示部分官方 action 的 Node.js 20 运行时已弃用并被强制使用 Node.js 24；本次构建与部署成功，后续可随官方 action 新版本消除此提示
