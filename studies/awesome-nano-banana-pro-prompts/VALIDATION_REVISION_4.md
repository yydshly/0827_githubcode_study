# Coverage & Validation — Revision 4 / E02

| 范围 | 验收项 | 证据 | 所属阶段 | 状态 | 遗留 |
| --- | --- | --- | --- | --- | --- |
| 原图归档 | 网页素材与实验记录保存同一原图 | 两份 SHA-256 相同；均为 1024 × 572 | Stage 3 | PASS | 无 |
| 实验卡 | E02 使用真实结果并标记为已有样例 | E02 卡片图片指向 `e02-first-result.png`；状态计数 2/10 | Stage 3/6 | PASS | 无 |
| 真实证据 | E01 两张结果与 E02 一张结果同时加载 | 3 张图片均完成解码；E02 使用 `object-fit: contain` | Stage 3/6 | PASS | 无 |
| 研究诚实性 | 首次命中与稳定复现明确区分 | E02 标记“首次生成 · 尚未复测”，结论包含稳定性边界 | Stage 6 | PASS | 无 |
| 主题 | 新证据在主题切换后保持可用 | `light → dark` 切换成功 | Stage 7 | PASS | 无 |
| 响应式 | 1440 与 390 两档不溢出、不裁切 E02 | 两档 `scrollWidth = innerWidth`；E02 完整显示 | Stage 7 | PASS | 无 |
| 工程 | 语法、控制台、Git 空白 | Node、Playwright、Git 检查 | Stage 9 | PASS | 无 |

## Runtime evidence

- 页面：`http://127.0.0.1:4173/nano-banana-pro/experiments.html`
- 标题：`Prompt Lab｜Nano Banana Pro Prompt Atlas`
- 页面概览：`02 真实执行任务`
- 实验状态：2 个“已有真实样例”，10 个“可直接执行”
- 真实结果区：3 张图片；E02 结果卡存在
- E02 原图：1024 × 572
- E02 桌面渲染：867 × 487，`object-fit: contain`
- E02 手机渲染：356 × 200，`object-fit: contain`
- 1440 × 900：`scrollWidth = 1440`
- 390 × 844：`scrollWidth = 390`
- 旧声明“唯一实际执行”已不存在
- 明暗主题：`light → dark` 通过
- 浏览器控制台、页面错误和失败请求：0

## E02 验收判断

- 六个 Bento 模块完整。
- 标题、副标题、三项数字信息、三步流程和 CTA 均准确。
- 冷灰背景、薄荷绿强调、玻璃卡片与线性图标均命中。
- 没有增加价格、评价、额外参数、Logo、水印或乱码。
- 结论：`EXECUTED / FIRST-RUN PASS / NOT VERIFIED`。

## Engineering evidence

- `node --check docs/nano-banana-pro/experiments.js`：通过
- `git diff --check`：通过
- 两份 E02 PNG 的 SHA-256：一致
- Playwright 桌面、手机、主题、状态、图片与控制台断言：全部通过

## Terminal audit

- 本轮影响范围内不存在 `continue`。
- 必需的原图、实验记录、网页展示、修订契约和验证记录均存在。
- 未调用 Gemini 自动化，未修改其他研究项目，未引入后端或新依赖。
- E02 尚未复测是研究结论边界，不是页面交付遗留；下一次同提示词复测时再评估稳定性。
