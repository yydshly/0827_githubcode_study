# Modly 研究站验证与交接记录

## 项目与阶段

- 项目：Modly 图生 3D 能力研究站。
- 当前阶段：Stage 9，等待独立提交、远端推送与 GitHub Pages 线上复检。
- 体验架构：Editorial Flow，单一深色主题。
- 主要旅程：核心结论 → 适配原理 → 算力依赖 → 模型地图 → 选型决策 → 后期探索。

## 可复现环境

```text
Start command:
python -m http.server 8896 --directory docs --bind 127.0.0.1

Canonical local URL:
http://127.0.0.1:8896/modly/

Browser:
Bundled Playwright Chromium, headless

Validation timestamp:
2026-08-27 22:26 CST
```

当前主机没有可执行的 `agent-browser` 命令；已使用同机捆绑的 Playwright/Chromium 完成等价的真实浏览器操作与截图检查，不以源码或构建成功替代页面证据。

## 浏览器证据

| 表面 / 状态 | 结果 | 证据 |
|---|---|---|
| 桌面 1440 × 1000 | 首屏层级、模型三栏和阅读路径清楚；无横向溢出 | [desktop.png](./evidence/desktop.png) |
| 平板 768 × 1024 | 双栏按预期折叠；无横向溢出 | [tablet.png](./evidence/tablet.png) |
| 手机 390 × 844 | 单栏可读；无横向溢出；移动菜单可打开并用 Escape 收起 | [mobile.png](./evidence/mobile.png) |
| 模型筛选 | 键盘聚焦“Modly 现成”后按 Enter，显示 3 个候选，`aria-pressed=true` | Playwright DOM 与交互观察 |
| 设备路线 | 键盘切换到 12–16GB，结果更新为“以 TRELLIS.2 GGUF 为本地主力” | Playwright DOM 与交互观察 |
| 键盘焦点 | 交互后焦点保留在 BUTTON，焦点 outline 为 `solid` | computed-style 观察 |
| Reduced motion | 内容保持 `opacity: 1`，无位移动画，过渡降至 0.01ms | Playwright media emulation |
| 无 JavaScript | 标题、12 张模型卡和 5,244 字正文仍可阅读；无横向溢出 | 禁用 JavaScript 的浏览器上下文 |

三种视口共同结果：

- 标题与正文成功渲染，不是空白页。
- 12 张模型卡存在。
- 所有页内锚点都有对应目标。
- `scrollWidth - clientWidth = 0`。
- 无 4xx/5xx 资源响应。
- 无浏览器 console error、page error、运行时错误或框架错误覆盖层。

## 工程检查

- 页面使用纯静态 HTML、CSS 和 JavaScript，无运行时依赖和外部视觉资源。
- 关键内容默认存在于 HTML；JavaScript 仅增强筛选、决策切换、导航和进入提示。
- 资源路径均为相对路径，符合 `docs/` GitHub Pages 发布约定。
- 单一中文语言和单一深色主题是设计契约中的明确支持边界，不把未支持的额外主题或语言标记为遗漏。
- 没有高成本图片、视频、Canvas 或 WebGL 渲染层；性能专项不适用。

## 仓库范围

本次应提交且仅提交：

- `docs/modly/**`
- `studies/modly/**`
- `docs/index.html` 中的 Modly 卡片和对应统计增量
- `README.md` 中的 Modly 索引行与 Featured 说明

仓库内其他已修改或未跟踪的文件属于现有工作，不纳入本次提交。

## 尚待完成

- 创建独立 Modly 提交并推送 `origin/main`。
- 等待 Pages 工作流完成，复检线上 `/modly/` URL 与门户入口。
- 完成后将设计契约和本记录中的最后状态收束为 `pass`。

