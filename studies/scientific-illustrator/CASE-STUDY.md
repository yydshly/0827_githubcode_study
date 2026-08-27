# 完整案例：LNP–mRNA 递送与 MHC-I 抗原呈递

这是 Scientific Illustrator 子项目中的端到端真实案例。它不是把一张成品图嵌进网页，也不是预设动画：Web 页面发起请求，本地 Node bridge 调用上游 drawio-file-utils MCP，生成、校验、检查、修正并再次校验一个真正可编辑的 draw.io 文件。

## 一句话目标

面向熟悉基础细胞生物学的科研汇报受众，用一张从左到右的机制图解释：

LNP 摄取 → 内体逃逸 → mRNA 翻译 → 抗原加工 → MHC-I 呈递 → CD8+ T 细胞激活。

案例只表达机制关系，不表达剂量、时间尺度、发生概率、临床效果或治疗承诺。

## 为什么选择这个题目

这个案例足够接近真实科研绘图任务，同时能覆盖这个库最有价值的能力：

- 同一张图包含空间分区、分子对象、细胞结构、过程节点、因果连线和注释。
- 科学叙事有明确阅读顺序，适合验证布局与连接器是否可控。
- 标签和节点需要在审阅后局部修改，适合验证对象级增量修正。
- 最终交付必须继续可编辑，不能退化成一张位图。

## 从开始到结束

```mermaid
flowchart LR
  A[科学简报] --> B[视觉协议]
  B --> C[真实 MCP 创建]
  C --> D[结构校验与对象检查]
  D --> E[三项审阅修正]
  E --> F[再次校验与交付]
```

### 1. 科学简报

先固定三个问题：

- 受众是谁：科研汇报中熟悉基础细胞生物学的读者。
- 核心问题是什么：LNP 递送的 mRNA 如何最终产生 MHC-I 依赖的 CD8+ T 细胞激活。
- 不画什么：不扩展到剂量、动力学、临床效果和旁支免疫机制。

这一步的价值是防止图稿在生成过程中无限扩张。

### 2. 视觉协议

绘制前先把设计决策写成约束：

- 画布：1280 × 760。
- 阅读顺序：从左到右。
- 空间分区：细胞外、胞质、细胞表面 / 免疫输出。
- 颜色语义：蓝色表示递送，紫色表示表达与加工，绿色表示呈递与激活。
- 编辑性：关键概念必须是独立文字、形状或连线；不允许把整张图栅格化。

视觉协议来自 [case-spec.mjs](./case-spec.mjs)，它既是案例数据，也是可扩展的生成规格。

### 3. 真实 MCP 创建

浏览器请求 POST /api/scientific-illustrator/run，Node bridge 启动上游 server.mjs，并调用：

1. drawio_create_diagram
2. drawio_validate
3. drawio_inspect

第一次创建包含 38 个显式 vertex、19 条 edge；上游自动生成标题对象，因而最终统计为 39 个 vertex。

### 4. 审阅与问题发现

第一次校验保证文件结构可读，第一次 inspect 提供对象清单。案例故意保留了三处适合对象级修正的问题：

- MHC-I 标签还是不确定态 “MHC-I ?”，科学表达不完整。
- 囊泡到细胞表面的连线为虚线开放箭头，因果路径不够明确。
- 输出节点只写 “T-cell activation”，没有指出 CD8+，且宽度不足。

这些不是重新画整张图的理由，而是精准修改少数对象的理由。

### 5. 对象级修正

第四次调用 drawio_update_cells 一次应用三项 patch：

- 把 MHC-I ? 改为 MHC-I peptide complex，并把虚线警示样式改为绿色确认样式。
- 把囊泡到表面的虚线开放箭头改为绿色实线块箭头。
- 把 T-cell activation 改为 CD8+ T-cell activation，并把节点宽度从 128 调整为 156。

关键点是：修改发生在具名对象上，不需要重新生成整张位图，也不会破坏其他已确认区域。

### 6. 再检查与交付

修正后再次执行：

5. drawio_validate
6. drawio_inspect

2026-08-27 的实际验收结果：

| 指标 | 结果 |
|---|---:|
| MCP tool call | 6 |
| 总 cell | 60 |
| 可编辑 vertex | 39 |
| 可编辑 edge | 19 |
| 对象级 patch | 3 |
| 栅格图片 | 0 |
| 最终结构 | VALID |
| 文件大小 | 18,804 bytes |

60 个 cell 包含 draw.io 的根与图层结构；39 个 vertex 和 19 条 edge 是实际图稿对象。

## 公开演示与实时演示

- 公开 GitHub Pages：<https://yydshly.github.io/0827_githubcode_study/scientific-illustrator/>
- 本地实时地址：<http://127.0.0.1:8879/scientific-illustrator/#real-lab>

公开页面直接解析并展示本次真实生成的 draw.io XML，同时把状态标记为 verified_static_artifact 和 real_execution: false。它证明产物、结构统计和验证记录可以公开复核，但不会伪装远端正在运行 MCP。本地 Node bridge 才会产生新的 run_id 并现场执行六次工具调用。

## 如何亲自演示

1. 在仓库根目录运行：node studies/scientific-illustrator/demo-server.mjs
2. 打开：http://127.0.0.1:8879/scientific-illustrator/#real-lab
3. 点击“构建完整 LNP–mRNA 案例”。
4. 观察六步调用、真实耗时、VALID 结果、对象统计和 RAW PROOF。
5. 下载生成文件，在 draw.io 中选择任意文字、节点或连线继续编辑。

已生成的终稿位于：

[lnp-mrna-antigen-presentation.drawio](../../docs/scientific-illustrator/generated/lnp-mrna-antigen-presentation.drawio)

## 这个案例证明了什么

它证明了文件型 MCP 的真实主链路：

- 能把结构化科学意图转成 draw.io 原生对象。
- 能校验输出文件而不是只相信“生成成功”。
- 能通过对象检查发现局部问题。
- 能最小化修改具名对象并保留其他内容。
- 能交付继续编辑的源文件，而不只是展示图。

## 没有证明什么

当前机器没有安装 draw.io Desktop，因此本案例没有声称验证实时桌面画布控制，也没有调用 drawio_live_* 工具。文件生成、校验、检查、修正与下载不要求安装桌面端；只有需要现场观看光标在 draw.io 中逐步绘制时才需要 Desktop。

科学上，这是一张机制示意图，不应作为未经领域专家复核的出版级结论图。真实论文场景还应加入引用、实验条件、术语规范和领域审稿。

## 可扩展方向

- 参考图重建：加入图像分区与结构抽取，把已有论文图还原为可编辑对象。
- 科学语义检查：自动发现术语不一致、方向错误、缺少条件或过度因果化。
- 图形模板库：沉淀细胞器、分子、实验设备、通路节点与期刊风格。
- 多后端一致性：同一中间表示同时输出 draw.io、PowerPoint 与 WPS。
- 专家审阅闭环：记录每次审阅意见、对象 patch 和版本差异。
- 出版级导出：补充字体嵌入、色盲安全、印刷尺寸、SVG/PDF 与期刊规范检查。
