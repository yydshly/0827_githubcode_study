# Coverage & Validation — Revision 5 / Codex Demo

## 交付结果

| 范围 | 证据 | 状态 |
| --- | --- | --- |
| 12 张实验卡 | 12 张卡、12 张图片、0 个抽象占位 | PASS |
| 来源分层 | 2 个 Gemini 实测、9 个 Codex 演示、1 个上游案例 | PASS |
| Codex 画廊 | 9 张图片全部加载并使用 `object-fit: contain` | PASS |
| Gemini 真实证据 | E01 两张、E02 一张，共 3 张结果保持不变 | PASS |
| 响应式 | 1440 / 1024 / 390 无横向溢出；画廊 3 / 2 / 1 列 | PASS |
| 交互 | 路线筛选、键盘展开、键盘复制、Toast、主题切换 | PASS |
| 性能 | 9 张网页 JPEG 合计传输约 1,612,996 字节 | PASS |
| 控制台 | console、pageerror、requestfailed 均为 0 | PASS |

## 浏览器环境

- URL：`http://127.0.0.1:4173/nano-banana-pro/experiments.html`
- 服务：`python -m http.server 4173 --directory docs`
- 页面标题：`Prompt Lab｜Nano Banana Pro Prompt Atlas`
- 桌面：1440 × 900
- 平板：1024 × 900
- 手机：390 × 844
- 主题：三档均验证 `light → dark`

## 视觉检查

- 桌面画廊以 3 × 3 网格展示，图像、标题和观察结论层级清楚。
- 手机画廊为单列，图片完整显示，未发生裁切或横向滚动。
- “Gemini 实测 / Codex 演示 / 上游案例”标签在卡片内可直接辨认。
- 证据边界说明位于 Codex 画廊首部，没有把跨模型演示混入 Gemini 结果区。

## E06 有效 defer

- 已尝试：参考图编辑批次、无参考写实四格、单张写实四格、简化编辑插画四格。
- 缺失能力：ImageGen 服务端在 E06 请求上连续返回网络错误，未生成文件。
- 当前回退：使用已有上游案例图并明确标记“上游案例”；页面仍具备完整视觉覆盖。
- 复测触发：ImageGen 网络稳定后，只重新执行 E06，不重跑其他 9 项。

## Terminal audit

- 本轮页面交付没有 `continue`。
- E06 的缺失被明确标记为非阻塞 `defer`，没有冒充结果。
- 未引入后端、数据库、社区、投稿或自动生成服务。
- 未改动其他研究项目。
