# Coverage & Validation — Revision 2

| 用户阶段 | 要求/产物 | 表面/状态 | 证据 | 所属阶段 | 状态 | 遗留 |
|---|---|---|---|---|---|---|
| 确定并继续 | 12 条实验矩阵 | 全部/四条路线 | 12 张 DOM 卡片；各路线筛选为 3 张 | Stage 3–6 | PASS | 无 |
| 确定并继续 | 5 个候选模板 | 模板列表 | 5 张模板卡；复制内容与 Toast 均通过 | Stage 4–6 | PASS | 无 |
| 研究诚实性 | PLANNED/EXECUTED/VERIFIED 边界 | 状态与说明 | 页面显示 12/0/0，并写明进入真实调用的前提 | Stage 3/6 | PASS | 无 |
| 主要旅程 | 路线筛选 → 查看实验 → 复制模板 | 交互路径 | Playwright 实际点击与剪贴板读取 | Stage 5 | PASS | 无 |
| 响应式 | 桌面/平板/390px | 三种视口 | 1440、1024、390 均无横向溢出；截图复核 | Stage 7 | PASS | 无 |
| 主题 | dark/light | 两种状态 | DOM 从 light 切换到 dark；共享存储键 `nbp-theme` | Stage 7 | PASS | 无 |
| 工程 | 静态路由和控制台 | 本地服务器 | HTTP 页面可达；浏览器控制台错误 0 | Stage 1/9 | PASS | 无 |
| 文档 | revision 2 记录 | 研究单元 | 契约、实验矩阵和本验收表均已落盘 | Stage 9 | PASS | 无 |

## Runtime evidence

- 页面标题：`Experiment Track｜Nano Banana Pro Prompt Atlas`
- 实验总数：`12`；状态徽标：`12 × PLANNED`
- 候选模板：`5`
- 路线 B 筛选：`3 / 12`，`aria-pressed=true`
- 复制结果：剪贴板以 `目标：为[产品/主题]制作[画幅]信息图` 开头
- 复制反馈：`T01 已复制，可直接替换方括号变量`
- 主研究页实验入口：1 个，目标为 `./experiments.html`
- 视口：1440、1024、390 的 `scrollWidth` 均等于 `innerWidth`
- 浏览器错误：`[]`

## Terminal audit

- `node --check docs/nano-banana-pro/experiments.js`：通过
- `git diff --check`：通过
- Playwright 主旅程脚本：通过
- Playwright 复制反馈复测：通过
- 桌面与手机首屏人工视觉检查：通过

## 范围说明
