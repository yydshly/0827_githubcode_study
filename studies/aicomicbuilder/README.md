# AIComicBuilder 研究归档

- 上游仓库：[LingyiChen-AI/AIComicBuilder](https://github.com/LingyiChen-AI/AIComicBuilder)
- 固定版本：`e01e7dd501131922fb5051ec36926271d394b4d3`
- 研究状态：`archived`（除非启动小说短剧生产，否则不继续投入）
- 在线页面：[AIComicBuilder 能力结论](../../docs/aicomicbuilder/index.html)

## 最终定义

> **AIComicBuilder 是借助 Agent 和生成模型执行各生产节点的短剧流程控制工作台。它负责组织流程、保存状态、管理资产、触发任务和推进返工，最终驱动产生目标视频。**

它不是底层视频模型，也不是一个万能 Agent。基础流程由 AIComicBuilder 的任务队列和处理器驱动；在需要理解、规划或创作判断的节点，它可以调用内置提示词 + 大模型，也可以绑定百炼、Dify、Coze 等外部 Agent。图像和视频则由 OpenAI/Gemini/Kling/Seedance/Veo/Wan 等生成模型完成，最后由 FFmpeg 合片。

```text
小说/剧本
  ↓
AIComicBuilder 判断当前步骤并准备上下文
  ↓
调用 Agent：改编、角色分析、分镜设计、提示词、质检
  ↓
调用生成模型：角色图、首尾帧、逐镜视频
  ↓
AIComicBuilder 保存结果、版本和任务状态，决定继续或返工
  ↓
FFmpeg：字幕、转场、BGM、片头片尾
  ↓
目标短剧视频
```

## 是否采用

当前不继续研究。只有当我们准备正式制作连续短剧、小说漫改或需要多人审核/逐镜返修时，再把它作为候选生产工作台。

- 单条样片或一次性视频：Agent 直接调用生成工具更轻量。
- 连载、多集、多角色、多镜头版本管理：AIComicBuilder 的价值明显。
- 已有成熟的任务编排、资产库和审核后台：优先借鉴其数据模型，不必整套采用。

## 已验证范围

- 在 E 盘完成依赖安装、生产构建、SQLite 初始化和原生 UI 运行。
- 以原创“张三丰进入异世界”概念验证剧本、角色、分镜、首尾帧和视频提示词的数据闭环。
- 未配置付费视频模型，因此没有把关键帧预览描述为真实 AI 视频成片。

详细能力、边界和扩展建议见 [RESEARCH.md](./RESEARCH.md)。
