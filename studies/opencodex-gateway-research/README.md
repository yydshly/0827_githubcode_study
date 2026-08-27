# OpenCodex 与 Agent 网关能力研究

## 结论

OpenCodex 的核心不是替代 Codex 或 Claude Code，而是把这些客户端原本发往官方模型服务的请求，改为发往一个本地 Agent 感知网关。网关理解 OpenAI Responses、Anthropic Messages、流式事件、工具调用、推理内容和上下文关联，再完成协议转换、模型选择、账号/密钥选择、失败切换和响应还原。

因此，更准确的系统边界是：

```text
Codex / Claude Code：负责 Agent 循环、仓库理解、工具选择与本地执行
Agent 兼容网关：负责协议语义、模型路由、密钥/账号、失败恢复与观测
模型供应商：负责实际推理
```

“中转站”也需要区分两种含义：

- **技术中转站**：稳定接收请求并完成协议、路由、重试和流式响应处理。
- **产品化中转平台**：在技术网关之上增加租户、API Key、额度、计费、审计、支付和运营后台。

OpenCodex 更接近前者，并带有 Dashboard、ChatGPT 账号池、组合路由和子 Agent 模型表面等控制能力；它不是现成的完整商业运营平台。

## 原理

```text
用户任务
  ↓
Codex / Claude Code 读取仓库并构造模型请求
  ↓  Base URL / Provider 配置指向我们的地址
Agent 兼容网关
  ├─ 鉴权、额度和策略检查
  ├─ 请求协议与模型名转换
  ├─ 供应商、模型、密钥或账号选择
  ├─ 重试、降级、熔断和会话亲和
  └─ 响应流、Tool Call、Thinking 反向转换
  ↓
上游模型完成推理
  ↓
Codex / Claude Code 收到兼容响应，在本地执行工具
  ↓
执行结果再次进入下一轮模型请求
```

这意味着网关控制的是“模型大脑供应链”，而不是把 Codex / Claude Code 降级成空壳。客户端仍然拥有 Agent 循环和本地工具权限；多数通用 LLM 网关也不会自动获得这些能力。

## OpenCodex 与 CC Switch

截至本研究快照，两者都有本地代理能力，但主切入点不同：

| 维度 | OpenCodex | CC Switch |
|---|---|---|
| 第一入口 | Agent 感知代理和控制面 | 跨工具桌面配置管理器 |
| 配置能力 | `ocx init` 将客户端接到本地代理，停止时恢复 | 可视化管理并写入多种客户端配置，支持快速切换 |
| 代理能力 | Responses/消息协议、流式、工具、推理、图像双向转换 | 当前版本也提供本地代理、格式转换、故障切换、熔断和健康检查 |
| 深层特性 | ChatGPT 账号池、会话亲和、quota 路由、combos、子 Agent 模型表面、sidecar | MCP、Prompts、Skills、Session 的跨工具管理与同步 |
| 更适合参考 | 面向 Codex / Claude Code 的 Agent 协议兼容网关 | 桌面配置控制面 + 多工具统一管理 + 可选代理 |

所以不能简单说“CC Switch 只改配置、OpenCodex 只做网关”。更准确的是：CC Switch 以客户端配置管理为中心，现已同时覆盖代理；OpenCodex 以 Agent 网关为中心，同时负责把客户端接到该网关。

## 中转站项目地图

| 层级 | 项目 | 主要价值 | 采用提醒 |
|---|---|---|---|
| Agent 兼容层 | [OpenCodex](https://github.com/lidge-jun/opencodex) | Codex Responses、Claude Code 等 Agent 客户端语义适配 | 重点研究协议正确性和客户端行为，不等于多租户商业平台 |
| Agent 兼容层 | [Claude Code Router](https://github.com/musistudio/claude-code-router) | 多编码 Agent 的本地端点、路由、账号和工具控制面 | 与 OpenCodex 功能重叠较多，适合对照架构而非直接双重转换 |
| 通用模型网关 | [LiteLLM](https://github.com/BerriAI/litellm) | 多供应商统一 API、虚拟 Key、预算、负载均衡和可观测性 | 能力面大，部署和二次开发复杂度也更高；先核对当前许可 |
| 通用模型网关 | [Bifrost](https://github.com/maximhq/bifrost) | Go 高性能核心、路由、回退、缓存和插件 | 部分高级能力的开源/商业边界需逐项确认 |
| 策略与 Guardrails | [Portkey Gateway](https://github.com/Portkey-AI/gateway) | 条件路由、回退、负载均衡、Guardrails 和 MCP gateway | 适合参考策略中间件，企业功能边界需确认 |
| LLMOps | [TensorZero](https://github.com/tensorzero/tensorzero) | 网关、观测、评测、实验和优化闭环 | 适合质量数据飞轮，不适合只想做轻量转发的场景 |
| 企业流量治理 | [Higress](https://github.com/higress-group/higress) | Envoy/Istio、Kubernetes、Wasm、限流、可观测和 AI 协议插件 | 适合已有 K8s/网关体系的组织，本地个人网关会偏重 |
| 企业流量治理 | [Envoy AI Gateway](https://github.com/envoyproxy/ai-gateway) | Envoy Gateway 上的集中鉴权、路由、限流和多层网关 | 适合云原生基础设施，不专门处理编程 Agent 的全部语义 |
| 多租户运营面 | [New API](https://github.com/QuantumNous/new-api) | 用户、Token、渠道、额度、计费、统计和多协议入口 | AGPL-3.0 且附加要求；公开服务还需处理上游授权与合规 |

## 对我们的价值

优先价值不是复制一个“转售站”，而是沉淀四种可复用能力：

1. **Agent 协议兼容测试集**：固定 Responses、Messages、Tool Call、流式、Thinking、图像和长对话样例。
2. **统一路由与供应商适配层**：把模型、供应商、账号、成本和健康状态从客户端配置中解耦。
3. **可治理控制面**：虚拟 Key、配额、预算、审计、策略、密钥安全和租户隔离。
4. **运行数据闭环**：记录延迟、错误、Token、成本、路由结果和质量反馈，支持回放与模型选择优化。

建议架构不是把多个协议转换器无差别串联，而是明确分工：

```text
Codex / Claude Code / OpenCode
        ↓ 原生 Agent 协议
薄的 Agent 兼容层（OpenCodex-like）
        ↓ 统一内部请求或尽量原生透传
通用模型网关（LiteLLM / Bifrost）或企业网关（Higress）
        ↓
官方授权的模型供应商 / 自建推理服务
```

如果上下两层都做协议转换，会增加流式事件丢失、工具状态错乱、错误码失真和调试困难。应尽量让上层只处理 Agent 特有语义，下层只处理鉴权、路由、限流和观测，并为原生协议保留透传路径。

## 建议建设顺序

### Phase 1：Agent 兼容性 POC

- 先支持一个客户端、两种上游协议和 5–10 个固定回归样例。
- 必须跑通文本、流式、Tool Call、错误恢复和长上下文。
- 不先做支付、复杂 Dashboard 或大规模账号池。

### Phase 2：团队共享网关

- 增加虚拟 Key、项目配额、供应商健康、fallback、审计和成本统计。
- 建立协议兼容矩阵和发布前回归。
- 机密只保存服务端，使用加密、最小权限和轮换。

### Phase 3：平台化控制面

- 根据真实需求增加租户、套餐、计费、发票/支付和管理后台。
- 引入策略、内容安全、SLA、灾备和质量评测。
- 在公开服务前完成上游授权、模型标识透明度和适用法规评估。

## 风险边界

- 修改 Base URL 是显式配置或代理接入，不应描述为劫持官网连接。
- 账号池只能用于授权范围内的路由和运维韧性，不应被设计成绕过供应商限额、共享个人凭据或规避风控。
- 协议“兼容”不能只看 HTTP 200；必须验证流式事件顺序、工具调用关联、终止原因、Token 统计、缓存语义和错误恢复。
- 商业运营能力与技术中转能力是两套问题；支付、充值、发票和公开服务会引入额外合规责任。
- 二次开发前要固定依赖版本并逐项核查许可证、商用条款和企业功能边界。

## 研究快照

研究日期：2026-08-27（Asia/Shanghai）。以下 commit 用于固定本页事实依据；项目后续可能变化。

| 项目 | Commit | License metadata |
|---|---|---|
| OpenCodex | [`80fff9a`](https://github.com/lidge-jun/opencodex/commit/80fff9a7f47332a4445df2b26ea175053fa55b0b) | MIT |
| CC Switch | [`6243e20`](https://github.com/farion1231/cc-switch/commit/6243e20ad6f1835f9ac94ab39ea0eb62a6795bc0) | MIT |
| Claude Code Router | [`aec22a0`](https://github.com/musistudio/claude-code-router/commit/aec22a00cc9f934b8ab793522731cf1c71864d39) | MIT |
| LiteLLM | [`cd63c7e`](https://github.com/BerriAI/litellm/commit/cd63c7e5a7f925268f899c0992d4fc3e6bc79650) | GitHub metadata: Other；采用前阅读当前 LICENSE |
| Higress | [`ce209a2`](https://github.com/higress-group/higress/commit/ce209a2c4c3ad95e80084c1028617f329ca4e32c) | Apache-2.0 |
| New API | [`e468b73`](https://github.com/QuantumNous/new-api/commit/e468b73915e5028e9849de62c5018a0faa203012) | AGPL-3.0 |
| Bifrost | [`ce56d2d`](https://github.com/maximhq/bifrost/commit/ce56d2de65b1f543b3b059f63a0b3ea3eb7aa99d) | Apache-2.0 |
| TensorZero | [`62eb8f6`](https://github.com/tensorzero/tensorzero/commit/62eb8f63e8ec62018d70420dbf1a8c5d1c026315) | Apache-2.0 |
| Portkey Gateway | [`669825c`](https://github.com/Portkey-AI/gateway/commit/669825cbe89ee51569918b8f78a9db486fd69dd4) | MIT |
| Envoy AI Gateway | [`8920a52`](https://github.com/envoyproxy/ai-gateway/commit/8920a52f0fdf174f7544ea1f652765ea91fd7af9) | Apache-2.0 |

## Web 页面

发布后地址：<https://yydshly.github.io/0827_githubcode_study/opencodex-gateway-research/>
