# Coverage & Validation — Revision 3

| 范围 | 验收项 | 证据 | 所属阶段 | 状态 | 遗留 |
| --- | --- | --- | --- | --- | --- |
| 首屏 | 从项目状态面板改为可用内容概览 | 桌面、手机、暗色截图 | Stage 2–3 | PASS | 无 |
| 实验卡 | 12 个可执行提示词与复制动作 | 12 张 DOM 卡片、12 个复制按钮、剪贴板读取 | Stage 3–6 | PASS | 无 |
| 真实证据 | E01 两张本地结果与结论 | 2 张 825×1024 图片加载并解码 | Stage 3/6 | PASS | 无 |
| 筛选 | 四条路线各 3 项 | 路线 B 实测显示 3/12；数据结构四路线均为 3 | Stage 4–5 | PASS | 无 |
| 模板 | 5 个候选骨架可复制 | 5 张卡、5 个按钮、剪贴板与 Toast | Stage 5–6 | PASS | 无 |
| 主题 | light/dark 双向可用 | `light → dark → light` 与暗色截图 | Stage 7 | PASS | 无 |
| 响应式 | 1440/1024/390 | 三档 `scrollWidth = innerWidth`；2/2/1 列 | Stage 7 | PASS | 无 |
| 键盘 | Enter 展开、Enter 复制、可见焦点 | `details[open]`、复制成功、outline 为 solid | Stage 7 | PASS | 无 |
| 工程 | 语法、控制台、Git 空白 | Node、Playwright、Git 检查 | Stage 9 | PASS | 无 |

## Runtime evidence

- 页面：`http://127.0.0.1:4173/nano-banana-pro/experiments.html`
- 标题：`Prompt Lab｜Nano Banana Pro Prompt Atlas`
- 实验卡：12；实验复制按钮：12
- 状态：1 个“已有真实样例”，11 个“可直接执行”
- 候选骨架：5；骨架复制按钮：5
- 路线 B 筛选：`显示 3 / 12 条可执行提示词`
- 键盘展开：通过；提示词以 `请生成一张竖版 4:5 中文引语海报` 开头
- 实验复制反馈：`E01 执行提示词已复制`
- 骨架复制反馈：`T01 复用骨架已复制`
- E01 图片：两张均成功加载，尺寸均为 825×1024
- 视口：1440、1024、390 均无横向溢出
- reduced-motion：媒体查询命中，图片过渡近似为 0 秒
- 浏览器控制台错误：0

## Visual evidence

- 1440px 浅色首屏：主任务、概览和三步路径层级清楚。
- 1440px 暗色首屏：文字、边界、按钮和状态保持可读。
- 390px 首屏：标题、说明、双按钮和概览卡顺序正确。
- E01 对比区：两张结果与成功/失败结论并列可读。
- 第一张实验卡：案例图、输入、通过条件、完整提示词和复制按钮均在同一任务上下文内。

## Terminal audit

- `node --check docs/nano-banana-pro/experiments.js`：通过
- `git diff --check`：通过
- Playwright 主要旅程：通过
- 图片滚动加载与解码：通过，HTTP 错误 0
- 本修订不调用 Gemini、不修改其他研究项目、不引入后端或新依赖。

## 范围说明

页面交付已经收口。E01 是唯一真实执行证据，并同时保留首次命中与局部编辑未命中的结果；其余 11 项是可以按真实需求使用的研究提示词，不描述为已经验证的模型效果。
