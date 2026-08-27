# 实时人脸与头像替换研究站点设计契约

```text
Entry mode: Brief-led
Request revision: 0
Target user and context: 需要理解换脸、肖像驱动和整头数字人路线的项目决策者与后续维护者
Desired first impression: 这是一次有本机实测证据、结论明确、已暂时归档的技术研究，而不是产品宣传页
Visual ambition: Editorial
Experience architecture: Editorial Flow
Visual constraints: 延续仓库深色研究档案风格；结论和路线判断优先；不依赖外部字体、脚本或构建工具
Information constraints: 区分本机实测、代码审阅、官方资料与尚未验证的候选；明确合成内容和许可边界
Operation constraints: 纯 HTML/CSS；GitHub Pages 从 docs/ 发布；相对资源路径；所有链接键盘可达
State constraints: archived、verified、rejected、candidate 必须使用文字表达，不能只依赖颜色
Environment constraints: GitHub Pages/Jekyll；桌面、平板、390px 手机；中文为主；低带宽下仍可阅读
Primary journey: 打开研究页 → 先看结论 → 查看实测证据 → 理解代码/模型边界 → 比较下一代路线 → 找到复现记录和来源
User-defined phases: 研究整理；Web 汇总；必要归档；提交远端；Pages 验证
Required artifacts: docs/live-avatar-research/index.html、精简证据图、studies 下的总览和复现记录、门户/README入口、远端提交
Autonomy authorization: 用户明确要求整理、Web 部署、归档并提交到远端 GitHub
User-decision boundary: 不提交模型、虚拟环境、缓存和上游源码；不包含其他未完成研究；不启用新的后端或付费服务
Observable completion criteria: 首屏明确表达“局部换脸已验证但不适合整头目标”；关键实测数据与证据图可追溯；桌面/平板/390px 无横向溢出；键盘焦点可见；页面无运行错误；远端 main 包含本轮必要文件；Pages 链接可访问
```

## 设计方向

| 决策 | 选择 | 验收标准 |
|---|---|---|
| 信息层级 | 先结论、再证据、再原理、最后候选路线 | 首屏无需阅读背景即可知道是否继续采用 FaceFusion/Deep-Live-Cam |
| 证据表达 | 使用小尺寸对比图和明确图注 | 每张图标出输入、输出、合成属性和判断，禁止暗示为真实影像 |
| 技术比较 | 用能力边界和适用目标比较，不按热度排名 | 能区分局部换脸、2D肖像驱动、3D头像和生成式视频 |
| 响应式 | 双栏/三栏在窄屏顺序堆叠 | 1440、768、390px 均无裁切和横向滚动 |
| 动效 | 仅保留锚点平滑滚动，并尊重 reduced-motion | 关闭动效后不丢失任何信息 |

## 覆盖清单

| 用户阶段 | 要求或产物 | 表面/状态 | 所需证据 | 所属阶段 | 状态 | 下一步 |
|---|---|---|---|---|---|---|
| 研究整理 | 汇总 Deep-Live-Cam 与 FaceFusion 实测结论 | Markdown/内容 | 内容审阅、文件存在 | Stage 3 | pass | 已形成综合归档和两份复现记录 |
| Web 汇总 | 可直接浏览的独立研究页 | 1440px 深色 | 浏览器截图、DOM与链接检查 | Stage 2-5 | pass | HTTP 200、正文3059字符、图片与入口完整 |
| 响应式 | 桌面、平板和手机均可阅读 | 1440/768/390px | 截图与 overflow 检查 | Stage 7 | pass | 三个视口均为 `scrollWidth === clientWidth` |
| 可访问性 | 键盘可达、焦点可见、语义结构完整 | 键盘/reduced-motion | 浏览器焦点路径和CSS检查 | Stage 7 | pass | 首个Tab为跳转链接且2px焦点可见；reduced-motion生效 |
| 必要归档 | 复现脚本、测试素材说明、精简证据 | 仓库文件 | git 清单、大小检查 | Stage 9 | pass | 公开证据仅3张压缩JPG；依赖、模型和缓存被排除 |
| 远端部署 | main 提交、Pages 发布且URL可访问 | GitHub/公开URL | commit、push、Actions和HTTP响应 | Stage 9 | pass | 提交 `43ce2e2` 已推送；Validate repository 与 Deploy GitHub Pages 均成功；公开页HTTP 200且包含标题与核心结论 |

## 本地浏览器验收

- 时间：2026-08-27 22:27 CST
- 运行：`python -m http.server 8891 --bind 127.0.0.1 --directory E:\0827_codex_project\docs`
- 浏览器：系统Microsoft Edge，由Codex捆绑Playwright无头驱动；`agent-browser`命令不可用后采用此等价真实浏览器路径
- 视口：1440×1000、768×1024、390×844
- 结果：全部HTTP 200；无控制台错误、页面错误或框架错误层；3张图片自然尺寸有效；无横向溢出；主要锚点跳转成功
- 门户：根页面中独立入口唯一、可见，点击进入 `/live-avatar-research/`
- 可访问性：跳到主要内容链接为首个键盘焦点，焦点轮廓为2px；`prefers-reduced-motion: reduce`下滚动行为变为`auto`
