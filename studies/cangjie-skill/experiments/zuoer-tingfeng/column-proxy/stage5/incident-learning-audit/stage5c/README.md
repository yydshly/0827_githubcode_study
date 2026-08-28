# Stage 5C：用户组织事故效度

本目录是 `incident-learning-audit` v0.1.1 的真实组织场景接入门。它解决的不是“再找一个公开案例”，而是安全、可复跑地回答：这个 Skill 对用户自己组织里的复盘是否真的有帮助。

## 当前状态

- 接入基础：已就绪；
- 已接收的授权脱敏案例：0；
- 组织外部效度：尚未建立；
- 完整 Stage 5：尚未完成。

没有案例时，校验器会返回 `intake-ready-awaiting-authorized-cases`，而不是伪造通过结果。

## 最短使用路径

1. 阅读 [CASE_INTAKE_TEMPLATE.md](CASE_INTAKE_TEMPLATE.md)，只保留完成审查所需的最小材料。
2. 复制 [case-template.json](case-template.json) 到 `cases/case-<匿名编号>.json`。
3. 完成授权、脱敏与密钥移除确认；不要提交真实姓名、客户标识、访问令牌、私钥或原始生产凭据。
4. 至少提供一类可核对证据和四个时间线节点；缺失字段写 `unknown`，不要猜测。
5. 运行 `node ../scripts/validate-stage5c.mjs` 检查接入就绪度。
6. 使用已安装的 `incident-learning-audit` 生成审查输出，再按 [VALIDATION_PROTOCOL.md](VALIDATION_PROTOCOL.md) 和 [REVIEWER_TEMPLATE.md](REVIEWER_TEMPLATE.md) 由熟悉事故但未参与输出生成的人复核。

可以在 Codex 中使用下面的调用方式：

> 使用 incident-learning-audit 审查 `stage5c/cases/case-<匿名编号>.json`。先输出响应模式、适用性、事故状态和禁止推断；严格区分事实、假设、未知与冲突，不访问生产系统，不补写负责人或日期。把完整输出保存为同目录的 `case-<匿名编号>-audit.md`，并记录运行耗时和输入/输出字符数。

## 案例计数规则

- **最低质量门**：1 份合法、授权、脱敏、稳定的真实组织事故；
- **建议质量门**：3 份机制不同的事故，至少覆盖两类技术机制；
- 公开事故、合成题和同一个事故的多个版本不能重复计数；
- `active_handoff` 可验证阶段门，但不能计入完整复盘外部效度。

## 判停边界

- 事故仍在扩大：停止完整复盘，只输出阶段交接；
- 材料含未脱敏秘密或个人信息：停止接入；
- 未获得材料所有者授权：停止接入；
- 安全、隐私、法律或处分判断混入：保全证据并转相应专业角色，本 Skill 不作责任裁决。
