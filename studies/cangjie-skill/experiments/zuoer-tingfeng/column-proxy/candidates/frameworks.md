# Framework Extractor 候选

> 研究对象是第三方镜像的“左耳听风”专栏代理语料，不是纸质书电子版；以下结论不得外推为纸质书逐章结论。
> 提取范围覆盖固定提交 f2a1a74c146545a4405dd23ffe96248283a1e20a 下的 119 篇 Markdown，按职业与修养、分布式与范式、弹力与性能、区块链、练级路线、面试/学习/沟通、Go 模式分块扫描。
> 本文件仅收录思维模型、决策框架与推理方法；同一框架跨篇出现时已合并并保留多个出处。Stage 1 不做价值筛选。
> 候选数量：39。

- id: f01
  title: 稀缺技能—价值—信任正循环
  type: framework
  source_chapter: 01 程序员如何用技术变现（上）；02 程序员如何用技术变现（下）；加餐 谈谈我的“三观”
  source_quote: |
    “你也会因为这样的正向反馈而鼓励自己去学习和钻研更多的东西，从而得到一个正向的循环。”
  summary: |
    用于把个人技术能力转化为可持续价值，而不是直接追逐收入。
    先观察市场中供不应求、能增收或降本的真实问题。
    再投入时间形成稀缺技能，用可落地成果解决小问题。
    结果沉淀为经历、作品和口碑，进而获得信任、推荐与更大问题。
    新机会带来更强反馈和更深学习，使能力、价值与信任循环增强。
  tags: [career, value, scarcity, trust, feedback-loop]

- id: f02
  title: 新技术趋势与真实价值评估
  type: framework
  source_chapter: 02 程序员如何用技术变现（下）；08 Go语言，Docker和新技术；19 识别表象和本质；63-68 区块链技术系列；98 高效学习
  source_quote: |
    “一，这个技术解决什么问题？为什么别的同类技术做不到？二，为什么是这样解决的？有没有更好的方式？”
  summary: |
    用于评估热门技术、架构潮流或带强叙事的新机制。
    先沿历史轨迹确认问题是否真实、旧方案为何不足，再拆解新方案的机制。
    检查它的信任假设、激励结构、成本、安全、性能与治理代价。
    对比替代实现、产业支持、标准化和真实生产案例，而不是只看热度。
    最后检验是否真正提高效率、降低成本或创造价值，以及是否重造了旧中介。
  tags: [technology-evaluation, trend, first-principles, tradeoff, skepticism]

- id: f03
  title: 技术领导力解题链
  type: framework
  source_chapter: 05 何为技术领导力；06 如何才能拥有技术领导力；10 如何成为大家愿意追随的Leader
  source_quote: |
    “能够发现问题。能够发现现有方案的问题。”
  summary: |
    用于判断或培养不依赖职位的技术领导力。
    从主动发现关键问题开始，而不是停留在提出问题或接收任务。
    形成多个可落地方案，比较约束、代价、优缺点并作出决定。
    用更简单、可扩展、可维护的方式交付，并把经验沉淀为标准和组件。
    通过示范、信任和帮助他人提高产出，把个人解题能力放大为团队能力。
  tags: [leadership, problem-solving, decision, standards, influence]

- id: f04
  title: 要什么—不要什么的权衡决策
  type: framework
  source_chapter: 09 渴望、热情和选择；15-16 时间管理；19 识别表象和本质；加餐 谈谈我的“三观”
  source_quote: |
    “因此，你要想清楚自己要什么，不要什么，而且还不能要得太多，这样你才好做选择。”
  summary: |
    用于职业、时间、技术方案或人生方向中的多目标决策。
    先明确真正想获得的结果，以及明确不接受什么。
    限制同时追求的目标数量，避免因变量过多而无法决定。
    对每个选项显式列出成本、放弃项、风险、长期收益和可逆性。
    接受不存在完美方案，在与价值观一致的方向上承担选择代价。
  tags: [decision, tradeoff, priorities, time, career]

- id: f05
  title: 关键数据防御纵深
  type: framework
  source_chapter: 03 Equifax信息泄露始末；04 从Equifax信息泄露看数据安全；72 程序员修养
  source_quote: |
    “首先，我们需要把我们的关键数据定义出来，然后把这些关键数据隔离出来，隔离到一个安全级别非常高的地方。”
  summary: |
    用于从系统视角设计数据安全，而不是只修补单个漏洞。
    先识别关键数据、依赖组件、版本和暴露面，并按敏感度分级。
    再以隔离、最小权限、脱敏和传输加密建立多层防线。
    为依赖补丁建立快速测试与发布流程，并监控异常访问和数据外流。
    对外部访问设置限额、告警和通知，使一次边界失守不直达核心数据。
  tags: [security, defense-in-depth, data, isolation, monitoring]

- id: f06
  title: 故障应对—复盘—系统整改闭环
  type: framework
  source_chapter: 17 故障处理最佳实践：应对故障；18 故障处理最佳实践：故障改进；22 分布式系统难点
  source_quote: |
    “一个技术问题，后面隐藏的是工程能力问题，工程能力问题后面隐藏的是管理问题，管理问题后面隐藏的是一个公司文化的问题，公司文化的问题则隐藏着创始人的问题……”
  summary: |
    用于把线上事故从一次性救火转化为组织学习。
    事故中先按等级响应，以重启、限流、回滚、降级或紧急更新恢复服务并控制影响面。
    保存时间线、影响、发现和处置证据，透明召集相关角色进行无责复盘。
    用连续追问穿透直接技术原因，定位工程、流程、管理和文化层根因。
    将整改落实为自动化、简化、监控、演练和责任到期跟踪，再验证是否降低复发概率。
  tags: [incident, postmortem, root-cause, five-whys, learning-loop]

- id: f07
  title: X/Y 问题与表象—本质追问
  type: framework
  source_chapter: 18 故障改进；19 识别表象和本质；104 沟通技术；106 好好说话的艺术
  source_quote: |
    “要解的真实问题才是X问题，手段都是Y问题。只有你真正了解了X问题，你才能真正明白整个事。”
  summary: |
    用于避免把用户提出的手段、症状或流行名词误当成目标。
    先记录对方提出的 Y，再连续追问为什么、服务谁、成功是什么。
    把观察事实、解释、目标和约束分开，重新表述真正的 X。
    回到源头检验 Y 是否仍是合适手段，并比较其副作用。
    必要时提出新的 Z 方案，以根因和目标而不是原始措辞驱动解法。
  tags: [xy-problem, root-cause, reasoning, requirements, problem-framing]

- id: f08
  title: 按交付约束选择 Git 协同流
  type: framework
  source_chapter: 20 Git协同工作流，你该怎么选
  source_quote: |
    “协同工作流的本质，并不是怎么玩好代码仓库的分支策略，而是玩好我们的软件架构和软件开发流程。”
  summary: |
    用于在中心流、功能分支、GitHub Flow、GitLab Flow 和 GitFlow 之间决策。
    先评估团队并行开发、代码与版本一致性、代码与环境一致性、稳定与不稳定代码隔离。
    再检查仓库粒度、发布频率、长期版本数量和 CI/CD 自动化能力。
    默认选择满足约束的最轻流程，减少长寿命分支和重复合并。
    仅在大版本、并行维护或复杂环境等特殊时期引入更重的分支模型。
  tags: [git, workflow, delivery, cicd, decision]

- id: f09
  title: 分布式系统两目标五支柱
  type: framework
  source_chapter: 21-27 分布式系统架构的本质系列；41-51 弹力设计系列
  source_quote: |
    “总结一下上面讲述的内容，你不难发现，分布式系统有五个关键技术，它们是：”
  summary: |
    用于避免以产品清单代替分布式系统能力建设。
    先明确两大目标：提高整体吞吐和提高稳定性、可用性。
    再从全栈监控、服务与资源、流量、状态与数据四个控制面搭骨架。
    在四项可观测和可控制后，才推进开发与运维自动化。
    每次架构演进同时检查组织、工程、测试和运维是否能承受新增复杂度。
  tags: [distributed-systems, architecture, observability, scheduling, devops]

- id: f10
  title: 服务架构全局地图
  type: framework
  source_chapter: 17 故障应对；22 亚马逊分布式实践；24 全栈监控；25 服务调度
  source_quote: |
    “在梳理完服务的重要程度和服务依赖关系之后，我们就相当于知道了整个架构的全局。”
  summary: |
    用于在复杂系统中建立可运维、可推理的共同视图。
    从用户功能或外部 API 出发，连接服务调用链、中间件、主机和数据资源。
    标注每个服务的关键度、SLA、依赖深广度和循环依赖。
    叠加实例状态、生命周期、资源指标和请求追踪，形成动态地图。
    再用架构版本清单记录兼容组合，使发布、回滚、容量和事故定位共享同一事实。
  tags: [architecture-map, dependency, observability, lifecycle, operations]

- id: f11
  title: 期望状态拟合控制
  type: framework
  source_chapter: 25 服务调度；45 服务的状态；46 补偿事务；51 弹力设计总结
  source_quote: |
    “在整个过程中，我们的控制系统需要努力地逼近最终状态，直到完全达到。此外，正在运行的服务可能也会出现问题，离开了我们想要的状态，而控制系统检测到后，会强行地维持服务的状态。”
  summary: |
    用于设计集群控制器、发布系统或长业务流程。
    明确定义当前状态、期望状态、合法中间状态和失败状态。
    控制器观察实际状态，计算差异，发出小步、可重入的控制动作。
    每步后重新观察并继续拟合，而不是假设一次命令必然成功。
    对偏离持续纠正，对不可达状态触发补偿、回滚或人工升级。
  tags: [desired-state, reconciliation, controller, state-machine, automation]

- id: f12
  title: 业务逻辑—控制逻辑分离
  type: framework
  source_chapter: 30-40 编程范式游记；99 如何学习和阅读代码；107-115 Go编程模式
  source_quote: |
    “绝大多数程序复杂混乱的根本原因：业务逻辑与控制逻辑的耦合。”
  summary: |
    用于阅读、设计或重构复杂代码。
    先把代码按 What 的业务逻辑与 How 的流程、并发、错误、路由等控制逻辑分类。
    找出两类逻辑通过条件、状态和具体实现互相缠绕的位置。
    用状态机、DSL、函数组合、策略、修饰器或管道抽离重复控制。
    让业务以声明式数据或小函数表达，控制层只负责执行效率和编排。
  tags: [programming, complexity, logic-control, abstraction, refactoring]

- id: f13
  title: 接口协议与依赖倒置
  type: framework
  source_chapter: 21 分布式架构演进；35 面向对象编程；37 Go委托模式；107 Go接口；110 Go反转控制
  source_quote: |
    “让各个业务方来依赖于标准插件和工作流接口，反转控制，让它们来控制系统，依赖倒置，让它们来依赖标准。”
  summary: |
    用于消除模块、服务或平台对具体参与者的直接依赖。
    先识别谁在依赖谁，以及变化频率高的一侧是否绑住稳定的一侧。
    抽出最小稳定协议，让双方依赖接口、事件或插件标准。
    把个性化决策注册或注入控制框架，平台不再逐个实现特殊分支。
    用契约测试和接口完整性检查守住边界，同时比较中间层引入的复杂度。
  tags: [ioc, dip, interface, protocol, decoupling]

- id: f14
  title: Design for Failure 弹力组合
  type: framework
  source_chapter: 22 分布式系统难点；41-51 弹力设计系列；83 分布式架构工程设计
  source_quote: |
    “不要尝试着去避免故障，而是要把处理故障的代码当成正常的功能做在架构里写在代码里。”
  summary: |
    用于从“阻止所有故障”转向“控制故障结果”。
    先假设网络、依赖、资源、人和变更都会失败，并定义可用性、MTTR 和影响面目标。
    按风险组合隔离、异步、幂等、状态管理、补偿、重试和熔断。
    在过载时使用限流与降级，在恢复时依赖可观测性和自动化。
    通过故障注入、灰度和复盘验证组合是否真的缩短恢复并阻断级联。
  tags: [resilience, design-for-failure, mttr, fault-tolerance, chaos]

- id: f15
  title: 隔离粒度权衡矩阵
  type: framework
  source_chapter: 04 数据安全；22 分布式系统难点；42 隔离设计
  source_quote: |
    “这其中需要你定义好要什么和不要什么。因为，我们不可能做出一个什么都能满足的系统。”
  summary: |
    用于选择按业务、服务、用户、租户、数据或资源隔离。
    先定义故障域和需要保护的关键路径，再选择隔离边界与粒度。
    比较完全独立、共享服务隔离数据、完全共享等方案。
    在隔离度、实现复杂度、成本、性能和资源利用率间显式权衡。
    配套高可用、流控、自动化和全局监控，否则隔离会变成不可管理的碎片。
  tags: [isolation, multi-tenancy, blast-radius, architecture, tradeoff]

- id: f16
  title: 事件驱动异步编排
  type: framework
  source_chapter: 12 异步错误处理；43 异步通讯设计；46 补偿事务；59 异步处理；114 Pipeline
  source_quote: |
    “异步处理系统的本质是把被动的任务处理变成主动的任务处理，其本质是在对任务进行调度和统筹管理。”
  summary: |
    用于同步依赖造成阻塞、级联或吞吐受限的流程。
    先决定请求响应、直接订阅或 Broker 中介，并明确为何需要异步。
    将请求持久为事件或任务，由推、拉或推拉结合的工作者处理。
    用全局流程状态、追踪、ACK、幂等和补偿管理乱序、重复、丢失与失败。
    监控积压和处理时延，必要时扩容或对入口限流，并确认业务允许最终一致性。
  tags: [asynchronous, event-driven, orchestration, queue, eventual-consistency]

- id: f17
  title: 全局 ID 幂等处理
  type: framework
  source_chapter: 43 异步通讯；44 幂等性设计；46 补偿事务；47 重试设计
  source_quote: |
    “对于幂等性的处理流程来说，说白了就是要过滤一下已经收到的交易。要做到这个事，我们需要一个存储来记录收到的交易。”
  summary: |
    用于超时、重复提交和至少一次消息投递。
    由请求方生成或取得全局唯一业务 ID，并贯穿整个调用链。
    接收方先以唯一约束登记 ID，让并发重复通过冲突被识别。
    首次请求执行业务并保存结果；重复请求直接返回既有结果或状态。
    再检查幂等存储自身的可用性、扩展性、过期策略和业务状态转换合法性。
  tags: [idempotency, distributed-id, retry, transaction, deduplication]

- id: f18
  title: 正向事务与反向补偿双轨
  type: framework
  source_chapter: 37 Go委托模式；43 异步通讯；46 补偿事务；59 异步处理
  source_quote: |
    “设计业务正向流程的时候，也需要设计业务的反向补偿流程。”
  summary: |
    用于无法或不值得采用强一致两阶段提交的跨服务业务。
    把业务拆成可观察、幂等的步骤，并由单一流程控制方维护状态。
    正向路径通过重试努力达到期望状态，可按依赖选择串行或并行。
    为每个不可逆或部分完成步骤设计业务补偿，而非机械数据库回滚。
    若最终不可达，按状态执行反向流程并保留人工介入和审计入口。
  tags: [saga, compensation, workflow, transaction, eventual-consistency]

- id: f19
  title: 可重试性判定与指数退避
  type: framework
  source_chapter: 44 幂等性设计；47 重试设计；48 熔断设计
  source_quote: |
    “重试”的语义是我们认为这个故障是暂时的，而不是永久的，所以，我们会去重试。
  summary: |
    用于远程调用失败时决定是否、何时和怎样重试。
    先把结果分成成功、暂时性错误、永久业务错误、未知失败和超时。
    只对明确可恢复且操作幂等的情况重试，其他情况快速失败。
    设置最大次数或截止时间，并用指数退避减少对故障依赖的压力。
    长事务保存上下文；失败率持续升高时转入熔断、补偿或人工处理。
  tags: [retry, backoff, transient-error, idempotency, circuit-breaker]

- id: f20
  title: 过载保护阶梯
  type: framework
  source_chapter: 23 分布式系统技术栈；47-50 重试/熔断/限流/降级；61 秒杀
  source_quote: |
    “限流降级。当系统实在扛不住压力时，只能通过限流或者功能降级的方式来停掉一部分服务，或是拒绝一部分用户，以确保整个架构不会挂掉。这些技术属于保护措施。”
  summary: |
    用于负载超过容量或依赖持续恶化时保护核心业务。
    先以容量、响应时间、错误率和队列积压识别压力与关键路径。
    在入口进行配额、令牌或概率限流，避免无效流量进入昂贵链路。
    对异常依赖熔断并提供探测恢复窗口，防止重试风暴和级联。
    仍超载时按业务优先级降低一致性、简化功能或关闭次要服务。
  tags: [overload, rate-limit, circuit-breaker, degradation, backpressure]

- id: f21
  title: 发布策略—风险—证据匹配
  type: framework
  source_chapter: 17 故障应对；20 Git协同流；57 部署升级策略
  source_quote: |
    “要减少线上故障的影响范围，通过灰度发布系统来发布是一个很不错的方式。”
  summary: |
    用于在停机、蓝绿、滚动、金丝雀和 A/B 测试之间选择。
    先明确可接受停机、资源预算、兼容性、回滚速度和验证目标。
    需要瞬时切换与快速回滚时偏向蓝绿；资源有限时考虑滚动。
    需要限制真实用户风险时用金丝雀；需要验证产品假设时用 A/B。
    无论何种策略，都配套自动化测试、健康检查、流量切换、监控和回滚门槛。
  tags: [deployment, canary, blue-green, ab-testing, rollback]

- id: f22
  title: 缓存模式的所有权与一致性权衡
  type: framework
  source_chapter: 58 性能设计之缓存；83 分布式架构工程设计
  source_quote: |
    “软件设计从来都是trade-off（取舍）。”
  summary: |
    用于在 Cache Aside、Read/Write Through 与 Write Behind 之间选择。
    先确认业务能容忍的数据陈旧、丢失风险、写延迟和峰值压力。
    决定缓存更新责任属于应用、缓存代理还是异步回写层。
    再设计失效顺序、过期时间、热点、穿透、分片和容量。
    把一致性、可用性、性能和实现复杂度放在同一张权衡表中验证。
  tags: [cache, consistency, performance, ownership, tradeoff]

- id: f23
  title: 数据库扩展先拆服务再分片
  type: framework
  source_chapter: 22 分布式系统难点；26 状态/数据调度；60 数据库扩展
  source_quote: |
    “这是整个设计模式的原则——先做服务化拆分，再做分片。”
  summary: |
    用于数据库容量或吞吐遇到瓶颈时安排扩展顺序。
    先按业务边界拆应用与数据所有权，服务之间只通过接口交互。
    在单个业务库内区分命令与查询，并评估读写分离和事件溯源。
    仍超限时才选择水平或垂直分片，并设计路由索引与再平衡。
    最后检查跨分片查询、引用完整性、事务、一致性和运维复杂度。
  tags: [database, sharding, cqrs, service-boundary, scaling]

- id: f24
  title: 热点流量边缘漏斗
  type: framework
  source_chapter: 26 流量与数据调度；49 限流设计；61 秒杀；62 边缘计算
  source_quote: |
    “我们可以看到，解决秒杀这种特定业务场景，可以使用CDN的边缘结点来扛流量，然后过滤用户请求（限流用户请求），来保护数据中心的系统，这样才让整个秒杀得以顺利进行。”
  summary: |
    用于秒杀、抢购或地域性热点造成的集中流量。
    先把静态内容、开始状态和简单判定下沉到 CDN 或边缘。
    估算真实库存和中心容量，用配额或概率把大流量收缩为可承受请求。
    中心只处理候选交易和热点数据，边缘快速拒绝其余请求。
    区分限量秒杀与尽量成交场景，后者不能照搬过滤方案而需完整容量工程。
  tags: [edge, flash-sale, traffic-funnel, cdn, hotspot]

- id: f25
  title: 实验室—工作室—工厂能力阶梯
  type: framework
  source_chapter: 69-90 程序员练级攻略；91 程序员练级攻略的正确打开方式
  source_quote: |
    “首先，你需要建一个自己的实验室。”“其次，把你的实验室升级成一个工作室。”“最后，把你的工作室升级成工厂。”
  summary: |
    用于把知识从理解逐步推进到工业级能力。
    实验室阶段徒手搭环境和最小程序，验证原理并练习调试。
    工作室阶段做可被他人使用的完整作品，引入可读性、测试、协作和压测。
    工厂阶段采用 RFC、规范、CI/CD、SLA、可运维性和可复用标准。
    每一级用可运行产物和成熟度证据验收，而不是以读完资料为完成。
  tags: [learning, maturity-model, practice, engineering, production]

- id: f26
  title: 知识采集—缝合—技能转换
  type: framework
  source_chapter: 91 正确打开练级攻略；96 高效学习：端正态度；97-100 高效学习方法
  source_quote: |
    “知识采集。”“知识缝合。”“技能转换。”
  summary: |
    用于把被动输入改造成可调用能力。
    采集阶段回到源头，核对证据、数据与多方印证，穿透表面信息。
    缝合阶段用连接记忆、逻辑推理和知识图组织碎片。
    转换阶段通过举一反三、项目练习、反馈和教授他人形成技能。
    产出的代码、解释和作品再暴露缺口，回流到下一轮采集。
  tags: [learning-loop, knowledge, practice, teaching, feedback]

- id: f27
  title: 学习一门技术的六问模板
  type: framework
  source_chapter: 02 技术变现；08 新技术；97 源头原理知识图；98 深度归纳实践
  source_quote: |
    “这个技术出现的背景、初衷和要达到什么样的目标或是要解决什么样的问题。”
  summary: |
    用于系统学习或评审任意新技术。
    第一问背景、初衷、目标与问题；第二问优势、劣势和 trade-off。
    第三问业务与技术适用场景；第四问组成部分与关键点。
    第五问底层原理与关键实现；第六问已有实现及差异。
    六问完成后用最小实验验证，不把二手解释或产品宣传当作答案。
  tags: [learning-template, technology, six-questions, first-principles, comparison]

- id: f28
  title: 主干—关联—关键路径知识地图
  type: framework
  source_chapter: 69 练级攻略开篇；90 技术资源；91 正确打开方式；97 源头原理知识图；100 面对大量知识
  source_quote: |
    “学习并不是为了要记忆那些知识点，而是为了要找到一个知识的地图，你在这个地图上能通过关键路径找到你想要的答案。”
  summary: |
    用于面对领域庞大、资料分散或记忆负担过重。
    先找领域主问题和稳定主干，而不是按资源列表顺序背诵。
    从主干做广度和深度遍历，标记概念、原理、实现与场景关系。
    新知识优先挂到既有节点；无法挂接处就是待研究缺口。
    解题时沿关键路径导航到答案，并持续用实践修订地图。
  tags: [knowledge-map, learning, navigation, connections, fundamentals]

- id: f29
  title: 联想—抽象—自省的举一反三
  type: framework
  source_chapter: 13 魔数推导；30-40 编程范式；98 深度归纳实践；100 面对大量知识
  source_quote: |
    “我觉得一个人的举一反三能力，可以分解成如下三种基本能力。”
  summary: |
    用于从一个问题迁移出可复用的思考能力。
    联想：为同一概念寻找不同用法，并连接相邻领域。
    抽象：从具体解法提炼变量、约束和通用模型。
    自省：站到解法对立面寻找漏洞、反例和遗漏条件。
    训练时为一个场景造多题、为一题找多解、为一解造多组测试并比较。
  tags: [analogy, abstraction, self-critique, transfer, reasoning]

- id: f30
  title: 信息结构化与模式压缩
  type: framework
  source_chapter: 96 高效学习；98 深度归纳实践；100 面对大量知识；103 沟通技巧
  source_quote: |
    “把你看到和学习到的信息，归整好，排列好，关联好，总之把信息碎片给结构化掉，然后在结构化的信息中，找到规律，找到相通之处，找到共同之处，进行简化、归纳和总结，最终形成一种套路，一种模式，一种通用方法。”
  summary: |
    用于把大量阅读、经验或讨论压缩成可迁移模型。
    先收集足够完整的信息，暂缓在理解不足时过早下结论。
    对碎片归整、排序、关联和分组，建立可检查的结构。
    从结构中寻找重复、差异、规律、共同约束和例外。
    再简化为模式或方法，用自己的语言公开表达并接受反馈修正。
  tags: [synthesis, compression, pattern, writing, feedback]

- id: f31
  title: 自顶向下的源码剥洋葱法
  type: framework
  source_chapter: 07 代码复查资料；72 程序员修养；90 技术资源；99 如何学习和阅读代码
  source_quote: |
    一般采用自顶向下，从总体到细节的“剥洋葱皮”的读法。
  summary: |
    用于快速建立陌生代码库的运行模型。
    先用文档理解思想、边界和用例，再找接口抽象和模块关系。
    识别中间件、回调、依赖注入等粘合层，并画流程、时序和模块图。
    沿核心业务路径下钻，暂时过滤错误处理和数据搬运等噪声。
    最后阅读关键算法和底层交互，并用日志、断点和实验验证运行时理解。
  tags: [code-reading, top-down, visualization, debugging, architecture]

- id: f32
  title: STAR—细节—反思的证据叙事
  type: framework
  source_chapter: 07 作品集；92 面试前准备；93 面试技巧；95 实力才是王中王
  source_quote: |
    “讲故事要学会使用STAR 。”
  summary: |
    用于面试、复盘或向他人说明个人贡献。
    用 Situation 界定背景与约束，用 Task 说明责任和目标。
    用 Action 展示自己的判断、技术细节、协作和取舍。
    用 Result 给出可验证结果、数据和影响，区分团队成果与个人贡献。
    补充失败、得失、后续改进和作品证据，使故事能经受细节追问。
  tags: [star, interview, evidence, storytelling, reflection]

- id: f33
  title: 约定—反馈—共识通信协议
  type: framework
  source_chapter: 101 Talk和Code同等重要；102 沟通阻碍；103 沟通方式；105 好老板善于提问
  source_quote: |
    “反馈也是个很好的方式，你把你理解的东西说给我听。如果有偏差，我再给你解释一下，直到双方达成共识。”
  summary: |
    用于减少专业沟通中的编码、解码和信息传递损失。
    先统一关键术语、目标、上下文和信息格式，建立共享协议。
    发送方明确重点与证据，接收方复述自己的理解而不是只说收到。
    双方根据偏差澄清、重编码并循环确认，直到形成可执行共识。
    尽量缩短传递链并保留源头信息，避免二手加工和信道篡改。
  tags: [communication, feedback, protocol, alignment, common-ground]

- id: f34
  title: 逻辑—信息—维度—共同四层沟通
  type: framework
  source_chapter: 103 沟通方式及技巧；104 沟通技术；106 好好说话的艺术
  source_quote: |
    “我们讲了沟通的四大关键技术：逻辑、信息、维度和共同。”
  summary: |
    用于准备技术争论、方案说服和复杂协商。
    逻辑层检查前提、因果和推论；信息层确保事实全面准确并识别 X/Y 问题。
    维度层在细节上验证差异，在更高目标上寻找一致方向。
    共同层通过共情、共享、共同利益和换位思考把对抗改为协作。
    输出时直达主题、过滤噪声，并用数据、实例和反馈闭环验证效果。
  tags: [communication, logic, information, dimension, common-interest]

- id: f35
  title: 引导—倾听—共情—高维—反馈教练循环
  type: framework
  source_chapter: 10 Leader；103 沟通方式；105 好老板要善于提问；106 好好说话的艺术
  source_quote: |
    “我分享了我与员工沟通时经常用到的几大法宝：引导、倾听、共情、高维和反馈。”
  summary: |
    用于管理者帮助成员解决问题而不直接替代其思考。
    先用问题引导成员描述事实、目标、选项和下一步。
    无偏见倾听背景与情绪，以共情建立安全感和合理预期。
    必要时提升到全局与长期维度，连接个人问题和共同目标。
    建立及时升级和正反馈机制，让问题得到资源并形成独立解题能力。
  tags: [coaching, leadership, listening, empathy, feedback]

- id: f36
  title: 多方案与有条件答应的期望管理
  type: framework
  source_chapter: 15 时间管理；103-104 沟通技巧；106 好好说话的艺术
  source_quote: |
    “永远不要跟客户说不，要有条件地说是，告诉客户不同的期望要有不同的付出和不同的成本。”
  summary: |
    用于客户、老板或跨团队提出高目标、低成本、短周期时协商。
    先澄清真实 X 问题、成功标准、硬约束和可交换条件。
    至少提供低成本、高成本和性价比三类方案，并给出参照案例。
    对提高期望附加资源或条件，对降低期望提供补偿或分阶段交付。
    不替对方拍板，而是透明呈现取舍、质量后果和成本，引导其承担选择。
  tags: [negotiation, expectation, options, conditional-yes, tradeoff]

- id: f37
  title: Functional Options 可扩展配置
  type: framework
  source_chapter: 109 Go编程模式：Functional Options
  source_quote: |
    “直接使用函数式编程，在代码阅读上也很优雅。”
  summary: |
    用于构造函数参数不断增加、可选配置组合爆炸的 API。
    固定少量必需参数，并为对象提供明确默认值。
    把每个可选配置定义成接收目标对象的 Option 函数。
    构造时按顺序应用可变数量的 Options，使调用点自描述。
    新配置只新增 Option，避免破坏旧调用；同时补充校验和冲突规则。
  tags: [go, api-design, functional-options, configuration, extensibility]

- id: f38
  title: 小函数组合成 Decorator—Pipeline—Visitor
  type: framework
  source_chapter: 33-34 函数式与修饰器；37 委托模式；111 Map-Reduce；113 修饰器；114 Pipeline；115 Visitor
  source_quote: |
    “解耦了数据和程序；使用了修饰器模式；还做出了Pipeline的模式。”
  summary: |
    用于把横切控制、数据变换和遍历步骤组合为可读流程。
    把单一职责行为写成小函数，并以统一签名作为组合协议。
    用 Decorator 包装前后置控制，用 Pipeline 表达顺序变换。
    用 Map/Filter/Reduce 表达集合处理，用 Visitor 分离数据结构与操作。
    需要并行时采用 Fan-out/Fan-in，同时检查顺序、错误传播、性能和类型安全。
  tags: [composition, decorator, pipeline, visitor, map-reduce]

- id: f39
  title: 错误上下文与因果链
  type: framework
  source_chapter: 11-12 程序错误处理；17 故障应对；108 Go编程模式：错误处理
  source_quote: |
    “我们需要包装一下错误，而不是干巴巴地把err返回到上层，我们需要把一些执行的上下文加入。”
  summary: |
    用于让跨层错误既可诊断又可按类型处理。
    底层保留原始错误，不在每层吞掉或只改成模糊文本。
    向上返回时增加操作、对象和阶段等最小必要上下文。
    通过 Cause 或等价机制保持可遍历的因果链和类型判断。
    顶层按业务边界记录、翻译或恢复，避免重复日志并保护敏感信息。
  tags: [error-handling, causality, context, diagnostics, go]
