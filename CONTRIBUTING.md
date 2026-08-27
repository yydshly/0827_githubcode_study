# 研究与贡献约定

## 新增研究项目

1. 复制 `templates/study/README.md` 到 `studies/<project-slug>/README.md`。
2. 使用小写英文、数字和连字符命名目录，例如 `studies/react-query/`。
3. 在根目录 `README.md` 与 `docs/index.md` 中增加入口。
4. 明确记录上游仓库 URL、研究基准版本或 commit，以及验证环境。

## 内容原则

- 区分“源码事实”“实验结果”和“个人推断”。
- 关键结论尽量附上源码位置、复现步骤或测试证据。
- 大文件、构建产物、依赖目录和密钥不得提交到仓库。
- 引用第三方内容时注明来源与许可证；不要直接复制无法确认授权的内容。
- 示例应尽量可独立运行，并在研究记录中写明启动方式。

## 提交建议

推荐使用清晰、聚焦的提交信息：

```text
docs: add <project> research notes
test: add <project> reproduction case
feat: add <project> interactive demo
chore: update research index
```
