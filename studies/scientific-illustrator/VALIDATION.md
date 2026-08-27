# Scientific Illustrator 验证记录

验证日期：2026-08-27
上游版本：`v1.5.4` / `3a44435da8715b7d380d5b594259e3f495c5b336`
Web 入口：`http://127.0.0.1:8879/scientific-illustrator/`（在仓库根目录执行 `node studies/scientific-illustrator/demo-server.mjs`）

## 结论

本次交付验证了三件事：

1. 上游项目确实提供面向 draw.io、PowerPoint 和 WPS 的 MCP 工具层，而不是单纯把科研图片放进 draw.io 展示。
2. 在不依赖 draw.io Desktop 的文件模式下，已通过上游 MCP 服务生成并校验一个真实、可编辑的 `.drawio` 文件。
3. Web 主按钮会真实调用上游 MCP 的创建、检查、校验和对象级修正工具；解释性动画不再承担“真实演示”的角色。

## 上游仓库与自动化检查

- 子模块路径：`studies/scientific-illustrator/upstream`
- 上游许可证：MIT
- `npm test` 已通过：Python bridge 语法检查、仓库结构、第三方归属、可移植性、插件元数据和 MCP smoke tests。
- 测试枚举到 69 个 MCP 工具：draw.io live server 26 个、文件工具 9 个、PowerPoint server 34 个。
- 完整测试在 Office.js bridge smoke test 处因当前机器缺少 `openssl` 而停止，错误为 `spawn openssl ENOENT`。因此本记录不宣称 Office.js 全链路测试通过。

## 真实文件演示

Web API 通过上游 `server.mjs` 的文件模式动态生成：

- 文件：`docs/scientific-illustrator/generated/lnp-mrna-antigen-presentation.drawio`
- 页面：1 个（`LNP mRNA antigen presentation`）
- 画布：1280 × 760
- 总 cell：60
- 可编辑 vertex：39
- 可编辑 edge：19
- 栅格图片：0
- 对象级修正：3 项，包括 MHC-I 标签与样式、囊泡到表面的连接器、CD8+ T-cell 输出节点标签与宽度
- 校验结果：最终 `VALID`，无 error

这说明示例不是一张被包裹进画布的位图，而是由可独立选择、移动、改字和改样式的原生文本、节点与连接线构成。

## 真实 Web API 演示

Canonical 服务：`node studies/scientific-illustrator/demo-server.mjs`

健康检查返回：

- `real_mcp: true`
- server：`scientific-illustrator-file-utils@1.5.4`
- 文件工具：9 个

一次主演示实际执行 6 次 MCP tool call：

1. `drawio_create_diagram`
2. `drawio_validate`
3. `drawio_inspect`
4. `drawio_update_cells`
5. `drawio_validate`
6. `drawio_inspect`

浏览器最终观察到 `real_execution: true`、`VALID`、39 个节点、19 条连接线、3 项已应用 patch、0 张栅格图片和可下载产物。重复点击会产生新的 `run_id`，证明不是回放缓存状态。

## Web 浏览器验证

检查地址：`http://127.0.0.1:8879/scientific-illustrator/`

| 维度 | 结果 |
| --- | --- |
| Desktop 1440 × 1000 | 通过；真实 MCP 成功态、6 条 tool trace、39 个预览对象和下载均可见，无水平溢出 |
| Tablet 768 × 900 | 通过；请求/结果与两类证据面板正确收为单列 |
| Mobile 390 × 844 | 通过；真实主旅程完成，无水平溢出 |
| 键盘与主题 | 通过；主题切换可聚焦并由 Enter 触发，亮/暗状态均保留成功证据 |
| Reduced motion | 通过；系统偏好可识别，真实调用不依赖连续动画完成 |
| 成功态 | `real_execution: true`、最终 `VALID`、39 vertex / 19 edge / 3 patch / 0 raster、6 条实际 tool trace |
| 失败态 | 纯静态服务下明确显示 API 不可用和 Node 启动命令，`real_execution: false` |
| 结构化浏览器错误 | canonical 成功会话与静态 fallback 会话均为 `[]` |

已实测的交互包括：

- 真实 MCP 健康检查
- MCP 创建、校验、检查、对象级更新和复检
- 同一按钮重复运行并产生新 `run_id`
- 本次生成的 `.drawio` 下载
- draw.io / PowerPoint / WPS 后端切换
- Designer → Drawer → Reviewer → Corrector 四阶段演示
- 单步执行与自动播放
- 场景强度筛选
- 暗色主题与持久化
- 提示词复制

## GitHub Pages 部署与双模式验证

- Pages 公网目标：`https://yydshly.github.io/0827_githubcode_study/scientific-illustrator/`
- 仓库 Pages 配置：`build_type: workflow`，`main` 分支；`.github/workflows/pages.yml` 从 `docs/` 构建并部署。
- 纯静态等价环境：`python -m http.server 8882 --directory docs`。
- 静态桌面 1440 × 1000：自动进入 `verified_static_artifact`，`real_execution: false`，39 vertex / 19 edge / 0 raster，`VALID`，水平溢出 0。
- 静态手机 390 × 844：案例、工作区和证明条均为单列，下载可用，水平溢出 0。
- 静态亮/暗主题：切换后仍保持 `VALID` 证据；浏览器 error 与 console 均为空。
- 本地实时回归：`realExecution: true`，新 `run_id`，6 条 MCP trace，39 vertex / 19 edge / 3 patch / 0 raster，浏览器 error 与 console 均为空。

远端页面的调用记录明确标记为已验证记录，不显示虚构耗时；只有本地 Node bridge 模式才显示本次实际 tool call 和真实毫秒耗时。

远端发布结果：

- 发布提交：`095ab2b403cb3a4976babb574bbe4c1dcae64024`
- Validate repository：[run 33059843175](https://github.com/yydshly/0827_githubcode_study/actions/runs/33059843175)，结论 `success`
- Deploy GitHub Pages：[run 33059843259](https://github.com/yydshly/0827_githubcode_study/actions/runs/33059843259)，build 与 deploy 均为 `success`
- 公网 HTTP：门户、案例页和 18,804-byte draw.io 文件均返回 200
- 公网浏览器：门户状态 `verified · published`；案例页自动显示 `verified_static_artifact`、39 节点 / 19 连线 / 3 patch / 0 raster、`VALID`；桌面和 390px 手机水平溢出均为 0；error 与 console 均为空

## 边界与延期项

### draw.io Desktop 实时控制

已调用状态探测，但当前机器未安装 draw.io Desktop，回退启动报错为 `spawn draw.io.exe ENOENT`。因此本次验证覆盖文件模式，没有宣称实时画布控制已在本机跑通。

复测条件：安装 draw.io Desktop，或设置项目支持的 `DRAWIO_PATH`，再执行 live-server 状态检查与画布读写流程。

### PowerPoint / WPS 实时控制

Web 页面中的 Office 交互是基于上游真实接口与工作流设计的交互模拟，不会直接操纵本机 PowerPoint 或 WPS。当前环境缺少 Office 宿主和完整 Office.js smoke test 所需的 OpenSSL，因此没有宣称 Office 实时控制已完成端到端验证。

复测条件：补齐 OpenSSL、启动对应 Office 宿主与 task pane，再验证幻灯片读写、形状更新和导出。

## 产品表达约束

- Web 主演示由实际 MCP API 驱动；每个成功结果都绑定当前响应、`run_id` 和动态产物。
- 四角色步进仍是原理动画，页面明确把它与上方真实执行分开。
- 页面中的 69 个工具、三类后端和多角色流程来自本次固定版本的本地代码检查。
- 页面不伪装成已连接 draw.io Desktop 或 Office；当前真实链路只声明文件型 MCP 能力。
