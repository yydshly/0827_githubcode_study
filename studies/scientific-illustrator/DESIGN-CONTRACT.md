# Scientific Illustrator Web Showcase · 设计契约

```text
Entry mode: revision-led implementation
Request revision: 4
Target user and context: 内部技术、产品与科研内容团队；快速判断该库是什么、能否复用、如何演进
Desired first impression: 远端可以直接理解并查看真实验证产物，本地可以现场重跑 MCP；两者边界清楚、不伪装
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 专业期刊机制图、清晰分区、语义配色、阅读顺序明确；拒绝虚构截图和不可解释装饰
Information constraints: 根 README、子项目 README、Web 门户和案例页必须一致说明架构、本质、演示模式、边界与我们的价值
Operation constraints: GitHub Pages 静态加载已验证终稿；本地 Node 实时调用 drawio-file-utils MCP；两种模式均可下载；失败不可伪装为成功
State constraints: 远端静态证据、local live、loading、success、error、重复运行；亮/暗主题与桌面/平板/手机
Environment constraints: GitHub Pages 公网地址；canonical local server；桌面、平板、390px 手机；无 draw.io Desktop
Primary journey: 从外部 README/门户进入 → 理解架构与边界 → 查看已验证终稿 → 下载源文件；本地可重跑真实 MCP
User-defined phases: 整理当前架构与演示；远端 GitHub 部署；总结对我们的意义；外部 README 引导；提交并推送
Required artifacts: 根 README 入口、门户卡片、双模式 Web 演示、架构/价值说明、.drawio 终稿、验证记录、GitHub 提交与 Pages 链接
Autonomy authorization: 用户已明确要求整理、提交、推送和远端部署，可直接完成范围内文档、代码、提交与发布
User-decision boundary: 安装 draw.io/Office、修改系统证书、调用外部付费模型、修改 Pages 域名
Observable completion criteria: 外部 README 与门户可发现；Pages 静态模式自动加载 39 vertex / 19 edge / 0 raster 终稿并明确非实时；本地模式仍可真实重跑；下载有效；跨视口可操作；相关提交推送且 Pages 工作流通过
```

## 设计方向

| 决策 | 选择 | 可观察约束 | 验收标准 |
| --- | --- | --- | --- |
| 信息层级 | 先交代科研 brief 与设计判断，再运行 MCP，最后解释审计和结果 | 主案例形成完整叙事链 | 用户能复述为何这样设计、工具做了什么、如何证明可编辑 |
| 主视觉 | LNP-mRNA 细胞内递送机制图 + 六步真实证据 | 不用简陋节点链冒充优秀案例 | 终稿具分区、步骤、图例、语义色与完整对象拓扑 |
| 视觉语言 | 暖白纸张、墨色文字、青绿能力色、橙红审计色 | 颜色必须有文字/形状冗余 | 关键状态不只依赖颜色区分 |
| 交互 | 运行完整案例、查看执行证据、重新运行、下载终稿 | 键盘可达，loading/success/error 明确 | 关键流程可用 Tab + Enter/Space 完成 |
| 响应式 | 宽屏双画布，窄屏纵向堆叠 | 不产生横向页面滚动 | 1440、768、390px 均可阅读和操作 |
| 动效 | 只用于解释对象逐步构建 | 尊重 `prefers-reduced-motion` | reduced-motion 下仍可直接看见状态变化 |

## 覆盖清单

| 用户阶段 | 要求/产物 | 表面/状态 | 所需证据 | 阶段 | 状态 | 下一动作 |
| --- | --- | --- | --- | --- | --- | --- |
| 获取上游 | 固定版本 Git submodule | Git 工作区 | 路径、tag、commit | 0/1 | pass | — |
| 说明能力 | 真实能力地图 | Web/研究 README | 源码工具清单与 Skill | 3 | pass | — |
| 优秀完整案例 | LNP-mRNA 从 brief 到终稿 | 初稿、检查、修正、终稿 | CASE-STUDY、MCP 证据、对象统计、浏览器截图 | 2/3/5/6 | pass | — |
| 真实演示能力 | MCP 创建/检查/修改闭环 | 成功、失败、重复运行 | API、MCP tool result、文件检查、浏览器网络与截图 | 1/4/5/6/7 | pass | — |
| 说明场景 | 适用/不适用与筛选 | Web | DOM 与交互观察 | 3/5 | pass | — |
| 扩展方向 | 分阶段路线图 | Web/README | 内容与代码边界对照 | 3 | pass | — |
| Web 展示 | Pages 已验证终稿 + 本地实时 MCP 双模式 | 1440/768/390、亮/暗、static/live | 浏览器状态、DOM、下载和错误日志 | 5/6/7/8 | continue | 验证纯静态模式与本地实时回归 |
| 工程验证 | 上游测试、API 与页面检查 | 本机 | 测试输出、API 响应、控制台 | 8/9 | pass | — |
| 外部 README | 架构、演示模式、价值与公开入口 | 根 README / 子项目 README / 门户 | 链接与内容一致性 | 3/9 | continue | 完成文档与链接检查 |
| GitHub 部署 | 提交、推送、Pages 发布 | main / Actions / 公网 URL | commit、workflow、HTTP 与浏览器 | 8/9 | continue | 修复工作流校验并推送核验 |
| 交接 | 使用与验证记录 | 文档 | 启动命令、远端地址、证据与边界一致 | 9 | continue | 发布成功后写入最终远端证据 |
