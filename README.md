# GitHub Code Study

这是一个面向长期积累的开源项目研究仓库，用来拆解多个子项目的能力、实现方式与可复用经验，并通过 GitHub README 和 GitHub Pages 持续展示研究过程。

## 研究索引

| 子项目 | 上游仓库 | 研究重点 | 当前阶段 | 研究记录 | 在线展示 |
| --- | --- | --- | --- | --- | --- |
| 待添加 | — | — | `planned` | — | — |

> 每开始一个新项目，请复制 [`templates/study/README.md`](templates/study/README.md)，并同步更新上方索引。

## 仓库结构

```text
.
├── README.md                 # 对外总入口与研究索引
├── studies/                  # 每个子项目的研究记录、实验和演示
│   └── README.md
├── templates/
│   └── study/README.md       # 新研究项目模板
├── docs/                     # GitHub Pages 展示站点
├── .github/workflows/        # 自动校验与 Pages 发布
└── CONTRIBUTING.md           # 研究记录与提交约定
```

建议每个子项目使用 `studies/<project-slug>/` 作为独立研究单元。若需要保留上游源码引用，优先记录固定的 commit、release 或链接；只有确实需要联动源码时再引入 Git submodule，避免主仓库快速膨胀。

## 研究流程

1. 从模板创建 `studies/<project-slug>/README.md`。
2. 记录上游仓库、基准版本、研究问题和可复现实验。
3. 把阶段性结论、截图或演示放在该研究单元内。
4. 更新本页索引和 [`docs/index.md`](docs/index.md)。
5. 通过 Pull Request 或提交记录保留研究演进过程。

阶段状态统一使用：`planned`、`researching`、`verified`、`archived`。

## GitHub 展示

仓库包含 GitHub Pages 自动发布工作流。首次启用时，在仓库的 **Settings → Pages → Build and deployment → Source** 中选择 **GitHub Actions**。之后推送到 `main` 且 `docs/` 有变更时，站点会自动更新。

## License

本仓库尚未指定开源许可证。研究过程中引用第三方代码、图片或文档时，应保留原始出处，并遵守对应上游项目的许可证。
