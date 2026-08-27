# Modly 研究站验证与交接记录

## 项目与阶段

- 项目：Modly 图生 3D 能力研究站。
- 当前阶段：修订 2 已完成本地验收，等待独立提交、推送与线上复检。
- 体验架构：Editorial Flow，单一深色主题。
- 主要旅程：核心结论 → 官网演示判定 → 适配原理 → 算力依赖 → 模型地图 → 选型决策 → 后期探索。

## 可复现环境

```text
Start command:
python -m http.server 8897 --directory docs --bind 127.0.0.1

Canonical local URL:
http://127.0.0.1:8897/modly/

Browser:
Bundled Playwright Chromium, headless

Validation timestamp:
2026-08-27 22:53 CST
```

当前主机没有可执行的 `agent-browser` 命令；已使用同机捆绑的 Playwright/Chromium 完成等价的真实浏览器操作与截图检查，不以源码或构建成功替代页面证据。

## 修订 2：官网模型依赖核实

- 官方首页表述：推理全部发生在本地 NVIDIA GPU；使用流程要求先选择已安装扩展。
- 真实浏览器网络检查：首页加载静态 `cat.png`、`cat.glb` 与 Google `<model-viewer>`；没有模型权重或 3D 生成接口请求。
- 页面功能检查：首页没有图片上传或在线生成控件；它是展示、文档、下载与扩展目录。
- GLB 元数据检查：`cat.glb` 仅声明 `trimesh` 导出器，没有 Hunyuan、TripoSG 或 TRELLIS 署名。
- 结论边界：官网样例的生成模型未公开；不能根据主推模型列表推断样例归属。
- 当前扩展口径：官网目录显示 24 个已发布 model / process 扩展，含社区提交；目录收录不等于安装包内置或官方维护。

## 浏览器证据

| 表面 / 状态 | 结果 | 证据 |
|---|---|---|
| 桌面 1440 × 1000 | 官网判定区、模型三栏和阅读路径清楚；无横向溢出 | [desktop.png](./evidence/desktop.png) |
| 平板 768 × 1024 | 双栏按预期折叠；无横向溢出 | [tablet.png](./evidence/tablet.png) |
| 手机 390 × 844 | 单栏可读；无横向溢出；移动菜单可打开并用 Escape 收起 | [mobile.png](./evidence/mobile.png) |
| 官网导航 | 点击导航“官网”后到达 `#official-web`，结论与来源链接完整 | Playwright DOM 与交互观察 |
| 模型筛选 | 点击“Modly 现成”后显示 3 个候选，状态文字同步更新 | Playwright DOM 与交互观察 |
| 设备路线 | 键盘切换到 12–16GB，结果更新为“以 TRELLIS.2 GGUF 为本地主力” | Playwright DOM 与交互观察 |
| 键盘焦点 | 交互后焦点保留在 BUTTON，焦点 outline 为 `solid` | computed-style 观察 |
| Reduced motion | 内容保持 `opacity: 1`、`transform: none`，过渡降至 0.01ms | Playwright computed-style；并修正 `.visible` 选择器优先级 |
| 无 JavaScript | 官网结论、12 张模型卡和 6,117 字正文仍可阅读；无横向溢出 | 禁用 JavaScript 的浏览器上下文 |

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

本次修订应提交且仅提交：

- `docs/modly/index.html`、`docs/modly/styles.css`
- `studies/modly/README.md`、设计契约、验证记录与更新后的三视口证据截图
- `README.md` 中 Featured 的官网模型说明

仓库内其他已修改或未跟踪的文件属于现有工作，不纳入本次提交。

## 远端发布结果（修订 1 基线）

- 页面提交：`90742e2 docs: publish Modly 3D capability study`。
- 推送目标：`origin/main`，成功。
- Validate repository：[Actions run 33082966002](https://github.com/yydshly/0827_githubcode_study/actions/runs/33082966002)，`success`。
- Deploy GitHub Pages：[Actions run 33082965956](https://github.com/yydshly/0827_githubcode_study/actions/runs/33082965956)，`success`。
- 线上页面：[Modly 图生 3D 能力研究](https://yydshly.github.io/0827_githubcode_study/modly/)，HTTP 200。
- 线上复检：标题正确，模型筛选显示 3 个现成扩展，`overflowX=0`，无 console error 或 page error。
- 门户复检：[研究门户](https://yydshly.github.io/0827_githubcode_study/)，HTTP 200，存在唯一 Modly 卡片与入口。

修订 2 的本地覆盖项均已通过；远端发布项暂为 `continue`，完成推送与线上复检后关闭。

