# Cangjie Skill 研究发布与复现

## 线上入口

- Web：<https://yydshly.github.io/0827_githubcode_study/cangjie-skill/>
- 研究地图：<https://yydshly.github.io/0827_githubcode_study/cangjie-skill/#research-map>
- 《左耳听风》受控案例：<https://yydshly.github.io/0827_githubcode_study/cangjie-skill/#our-case>
- 门户：<https://yydshly.github.io/0827_githubcode_study/>
- 上游固定版本：[`5f03a4c`](https://github.com/kangarooking/cangjie-skill/tree/5f03a4cd8b521673f7a67ca6279330ec943bb369)

## 发布映射

GitHub Pages 从 `main` 分支的 `docs/` 构建。可运行源页面与线上目录保持一一映射：

```text
studies/cangjie-skill/experiments/zuoer-tingfeng/column-proxy/web-demo/
  index.html
  app.js
  showcase.js
  library.js
  styles.css
  showcase.css
  library.css
  data/research.json
  data/library-catalog.json

                     ↓ 同步静态运行文件

docs/cangjie-skill/
```

页面只使用相对路径，不依赖本地绝对地址、Node 服务或私有 API；因此本地目录预览和 GitHub Pages 子路径使用同一份运行时。

Revision 12 的研究地图在单一页面内关联 13 个研究区段，并通过 GitHub `blob/main` 地址关联 7 份公开报告。页面和仓库首页都明确标注《左耳听风》使用的是第三方公开专栏代理语料，而非纸质书全文。

## 本地验证

在 Web 源目录执行：

```powershell
npm run check
npm run verify:browser
```

发布副本可从仓库根目录启动任意静态服务器进行验证：

```powershell
python -m http.server 4180 --directory docs
```

然后访问 `http://127.0.0.1:4180/cangjie-skill/`。验证范围包括桌面、平板、移动端、浅色/深色主题、键盘交互、Reduced Motion、资源加载、控制台错误与横向溢出。

## 提交边界

远端保留我们生成的研究报告、结构化页面数据、验证脚本、评测结果和正式 Skill。以下内容不作为发布依赖，也不提交：

- 第三方专栏全文与图片镜像；
- 上游仓库的本地完整副本；
- 本地浏览器截图和临时测试产物；
- `node_modules` 或其他可重建依赖。

上游依据使用固定 commit 的 GitHub 链接，保证研究口径可追溯且不复制无关资产。

## 恢复研究的门槛

项目当前为 `archived`。满足以下条件时再恢复：有明确产品问题、有合法可用的来源内容、有目标 Agent 宿主、有真实任务评测集，并且现有 Skills 无法覆盖该问题。恢复后应先做一个新的最小候选，而不是批量转换完整来源。
