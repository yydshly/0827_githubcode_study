# 来源清单与版权边界

## 目标来源

```yaml
title: 左耳听风：传奇程序员练级攻略
author: 陈皓
publisher: 电子工业出版社
imprint: 博文视点
isbn: 9787121466809
language: zh-CN
source_type: edited_article_collection
full_text_status: not_provided
```

## 已核验的公开来源

| 来源 | 用途 | 可否替代正文 |
| --- | --- | --- |
| [电子工业出版社图书页](https://cbjj.phei.com.cn/module/goods/wssd_content.jsp?bookid=63833) | 正式书名、作者、ISBN、页数、字数、完整目录、内容简介 | 否 |
| [极客时间《左耳听风》官方页](https://time.geekbang.org/column/intro/100002201) | 作者背景、专栏范围、书与专栏关系 | 否 |
| [新华书店馆藏目录页](https://www.yuntaigo.com/book.action?recordid=bnprYnphbWM5Nzg3MTIxNDY2ODA5) | 交叉核对 ISBN、出版年月和一级目录 | 否 |

极客时间官方页说明：图书与同名付费专栏的内容重合度不足 30%。因此，不能把极客时间专栏、CoolShell 文章集合或网络读书笔记当作本书的等价文本。

## 在线完整版本检索记录

检索日期：2026-08-28

| 渠道 | 检索结果 | 处理决定 |
| --- | --- | --- |
| 电子工业出版社网上书店 | 只有纸质书定价、库存、目录、推荐序和配套资源入口，未提供整书电子版 | 可作书目证据，不可作正文 |
| 出版社“悦读”数字资源平台 | 公开页面未检索到 ISBN `9787121466809` 的可用电子书记录 | 暂不可用 |
| 微信读书、京东读书、当当云阅读、Kindle 公开索引 | 未找到能核验 ISBN 和授权方的正式电子版 | 暂不可用 |
| 图书馆与书店目录 | 能确认纸质馆藏或购买信息，未提供可访问的数字全文 | 不可作正文 |
| 搜索引擎返回的第三方 PDF | 内容多为极客时间专栏单篇或专栏合集，不是本书；授权状态无法确认 | 排除，不下载、不引用 |
| [用户提供的 GitHub 专栏目录](https://github.com/zhuxxsherlocked/study-blog/tree/main/%E5%B7%A6%E8%80%B3%E5%90%AC%E9%A3%8E) | 119 篇极客时间专栏式 Markdown，提交早于纸质书，未发现许可证 | 只作辅助对照，不替代正文 |

截至该日期，没有找到可以合法直接导入本实验的整书在线文本。后续若发现正式电子版，必须同时核验书名、ISBN、授权平台和内容目录后才能解除 `full_text_status: not_provided`。

对用户提供仓库的详细评估见
[`SUPPLEMENTARY_SOURCE_ASSESSMENT.md`](SUPPLEMENTARY_SOURCE_ASSESSMENT.md)。
用户确认后的独立代理语料实验见
[`column-proxy/README.md`](column-proxy/README.md)。

## 明确不采用的来源

- 网盘、聚合下载站和来源不明的整书 PDF/EPUB；
- 未经授权转载的极客时间课程全文；
- 个人读书笔记、二手摘要和书评作为原文证据；
- 模型记忆中的陈皓观点；
- CoolShell 同主题文章直接冒充书中章节。

这些材料可在后续作为“外部对照”或“观点演化证据”，但不能进入 R 段原文引用，也不能用于判断某个方法是否在书中跨章节出现。

## 正文接入要求

用户可以把合法拥有的文件放入本目录的 `source/`：

```text
source/zuoer-tingfeng.pdf
source/zuoer-tingfeng.epub
source/zuoer-tingfeng.txt
source/zuoer-tingfeng.md
```

接入时记录：

```yaml
file_name: null
sha256: null
file_size: null
page_or_section_count: null
acquisition_basis: user-provided lawful copy
ocr_used: null
ocr_quality_notes: null
```

正文默认只用于本地研究，不提交到研究仓库，也不在研究报告中长篇复制。

## 版本差异说明

出版社页面标记出版时间为 2023-11、300 页；部分馆藏目录标记为 2024-01、280 页。实验必须以用户实际提供文件的版权页、页数和目录为准，不能混用页码。
