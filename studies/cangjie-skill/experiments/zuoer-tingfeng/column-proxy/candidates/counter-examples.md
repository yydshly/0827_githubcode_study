# Counter-example Candidates

> Stage 1 独立反例提取结果。研究对象是 119 篇第三方专栏代理语料，不是纸质书。按职业与修养、分布式、编程范式、弹力与管理、性能、练级路线、学习、沟通和 Go 专题分块扫描；本阶段不筛选。以下 30 条引文均控制在 150 个汉字以内。

~~~yaml
- id: ce01
  title: 把支撑软件假定为无漏洞
  type: counter-example
  source_chapter: 04-从Equifax信息泄露看数据安全
  source_quote: |
    “所有复杂的软件都有漏洞。不要基于“支持性软件产品没有安全性漏洞”这样的假设来建立安全策略。”
  failure_mode: |
    把框架、中间件或供应商产品视为可信边界，导致补丁、纵深防御和泄露控制缺位。
  mechanism: |
    复杂系统必然存在未知缺陷；一旦把“尚未发现”误作“没有”，单点漏洞会直接穿透业务数据。
  warning_signs: [依赖默认安全配置, 补丁没有责任人, 关键数据可完整返回]
  bound_to: [纵深安全设计, 从失败假设出发]
  tags: [security, assumption, defense-in-depth]

- id: ce02
  title: 用惩罚替代故障治理
  type: counter-example
  source_chapter: 10-如何成为一个大家愿意追随的Leader；18-故障处理最佳实践：故障改进
  source_quote: |
    “惩罚故障责任人对于解决故障完全没有任何帮助。因为它们之间没有因果关系，既不是充分条件，也不是必要条件，更不是充要条件。这是逻辑上的错误。”
  failure_mode: |
    事故后先找人处分，把责任闭环误当作问题闭环。
  mechanism: |
    惩罚不会修复系统条件，反而鼓励少做、隐瞒和推诿，使组织失去真实事故数据。
  warning_signs: [复盘先问谁干的, 整改只有处罚, 一线不敢报告险情]
  bound_to: [无责故障复盘, 技术领导力]
  tags: [incident, blame, leadership]

- id: ce03
  title: 没有预案时临场救火
  type: counter-example
  source_chapter: 17-故障处理最佳实践：应对故障
  source_quote: |
    “故障来临时，一切都会变得混乱。此时，对于需要处理故障的我们来说，事可以乱，但人不能乱。”
  failure_mode: |
    在告警、角色、回滚、降级和沟通机制都未准备时，依赖个人英雄临场处理。
  mechanism: |
    压力会降低判断质量；没有固定指挥链和操作手册时，多人并行操作会扩大故障。
  warning_signs: [没人统一指挥, 线上直接试错, 状态只在聊天群]
  bound_to: [故障响应准备度, 工程成熟度]
  tags: [incident-response, preparedness, chaos]

- id: ce04
  title: 没想清楚就开干
  type: counter-example
  source_chapter: 16-时间管理：如何利用好自己的时间
  source_quote: |
    “我们没有想清楚就开干了，边干边想，这样的工作方式其实很糟糕。”
  failure_mode: |
    把快速开始当作高执行力，在目标、约束和方案不清楚时直接实现。
  mechanism: |
    前置假设未显式化，后续发现冲突只能返工；局部速度转化为整体时间浪费。
  warning_signs: [没有成功标准, 边写边改需求, 同一模块反复返工]
  bound_to: [约束与权衡分析, 时间投资决策]
  tags: [planning, rework, time]

- id: ce05
  title: 把 GitFlow 当默认答案
  type: counter-example
  source_chapter: 20-Git协同工作流，你该怎么选
  source_quote: |
    “GitFlow工作流太过复杂，我并不觉得GitFlow工作流是一个好的工作流。”
  failure_mode: |
    不看发布节奏、团队规模和架构形态，机械套用分支最多、流程最重的工作流。
  mechanism: |
    分支状态和合并路径增加后，等待、冲突与认知成本会超过隔离收益。
  warning_signs: [长期分支众多, 合并依赖专人, 流程与发布模型不匹配]
  bound_to: [按交付模式选择 Git 流程, 简化工程流程]
  tags: [git, workflow, accidental-complexity]

- id: ce06
  title: 只看到分布式收益
  type: counter-example
  source_chapter: 21-分布式系统架构的冰与火
  source_quote: |
    “分布式架构解决了“单点”和“性能容量”的问题，但却新增了一堆问题。”
  failure_mode: |
    为扩展性或潮流拆分系统，却不计通信、状态、一致性、部署和运维成本。
  mechanism: |
    进程内确定性调用变成不可靠网络协作，局部简单被转移为全局复杂。
  warning_signs: [单体尚无容量瓶颈, 缺少平台能力, 服务边界按组织随意切]
  bound_to: [分布式采用决策, 架构权衡]
  tags: [distributed-systems, tradeoff, complexity]

- id: ce07
  title: 用 HTTP 200 包装业务错误
  type: counter-example
  source_chapter: 22-从亚马逊的实践，谈分布式系统的难点
  source_quote: |
    “很多服务的API出错不返回HTTP的错误状态码，而是返回个正常的状态码200，然后在HTTP Body里的JSON字符串中写着个：error，bla bla error message。”
  failure_mode: |
    传输语义报告成功，只在自定义正文中隐藏失败。
  mechanism: |
    网关、监控、重试和调用方无法使用标准信号分类错误，故障被统计成成功。
  warning_signs: [成功率接近百分之百但用户报错, 每个客户端自写错误解析, 告警依赖正文字符串]
  bound_to: [可观测性设计, API 契约]
  tags: [api, observability, error-semantics]

- id: ce08
  title: 误以为分布式天然消除全站故障
  type: counter-example
  source_chapter: 22-从亚马逊的实践，谈分布式系统的难点
  source_quote: |
    “分布式架构下，服务是会有依赖的，一个服务依赖链上的某个服务挂掉了，可能会导致出现“多米诺骨牌”效应。”
  failure_mode: |
    服务虽然拆开，却共享数据库、依赖链和容量池，故障仍会跨边界传播。
  mechanism: |
    拓扑上的拆分没有形成资源与失败域隔离，更多节点反而提高故障发生频率。
  warning_signs: [共享关键数据库, 无依赖地图, 所有服务共用线程池或网关]
  bound_to: [隔离设计, 依赖地图]
  tags: [cascade, dependency, isolation]

- id: ce09
  title: 服务依赖成环
  type: counter-example
  source_chapter: 25-分布式系统关键技术：服务调度
  source_quote: |
    “如果系统架构中有服务依赖环，那么表明你的架构设计是错误的。”
  failure_mode: |
    A 等 B、B 又依赖 A，部署、扩容和故障恢复都无法建立稳定顺序。
  mechanism: |
    循环把局部故障反馈回源头，形成递归调用、级联超时和无法独立发布的强耦合。
  warning_signs: [启动顺序互相等待, 调用链重复节点, 一个服务升级要求全链联动]
  bound_to: [服务依赖治理, 逻辑与控制分离]
  tags: [dependency-cycle, coupling, scheduling]

- id: ce10
  title: 业务逻辑与控制逻辑纠缠
  type: counter-example
  source_chapter: 38-编程范式游记（9）-编程的本质
  source_quote: |
    “绝大多数程序复杂混乱的根本原因： **业务逻辑与控制逻辑的耦合**。”
  failure_mode: |
    业务规则与循环、并发、错误处理、重试、存储和通信细节混写。
  mechanism: |
    两类变化沿不同节奏发生却共享代码边界，任何修改都会触发非局部影响。
  warning_signs: [核心规则只能在框架回调里测试, 大量嵌套分支, 更换执行方式必须重写业务]
  bound_to: [逻辑—控制分离, 编程范式选择]
  tags: [coupling, complexity, programming]

- id: ce11
  title: 异步化却不管理乱序与重复
  type: counter-example
  source_chapter: 43-弹力设计篇之“异步通讯设计”
  source_quote: |
    “事件可能会乱序。这会带来非常Bug的事。解决这个问题需要很好地管理一个状态机的控制。”
  failure_mode: |
    只引入消息队列获得解耦，却未设计顺序、确认、重传、幂等和流程状态。
  mechanism: |
    网络至少一次投递和并发消费会改变事件顺序；缺失状态机时无法判断业务已走到哪一步。
  warning_signs: [消费者假定只收到一次, 没有事件版本, 重放会改变结果]
  bound_to: [异步通讯设计, 状态机与幂等]
  tags: [async, ordering, messaging]

- id: ce12
  title: 超时重试造成重复副作用
  type: counter-example
  source_chapter: 44-弹力设计篇之“幂等性设计”
  source_quote: |
    “因为系统超时，而调用方重试一下，会给我们的系统带来不一致的副作用。”
  failure_mode: |
    调用方不知道第一次是否成功便直接重试，导致重复下单、扣库存或扣款。
  mechanism: |
    超时表示结果未知而非失败；没有交易唯一标识和去重状态时，重放等于再次执行。
  warning_signs: [写接口没有幂等键, 客户端自动重试 POST, 无结果查询接口]
  bound_to: [幂等接口设计, 重试策略]
  tags: [idempotency, timeout, duplicate]

- id: ce13
  title: 强行无状态只是转移责任
  type: counter-example
  source_chapter: 45-弹力设计篇之“服务的状态”
  source_quote: |
    “为了做成无状态的服务，会导致这些服务需要耦合第三方有状态的存储服务。”
  failure_mode: |
    把所有状态移出服务后宣称架构无状态，却忽视外部存储成为新的依赖和容量瓶颈。
  mechanism: |
    状态不会消失，只会迁移；网络访问、一致性和外部存储高可用成为系统新成本。
  warning_signs: [所有请求都访问同一状态库, 缓存复制到每个实例, 状态库无独立容量计划]
  bound_to: [状态归属决策, 无状态服务设计]
  tags: [state, stateless, responsibility-shift]

- id: ce14
  title: 把补偿状态散落在多个组件
  type: counter-example
  source_chapter: 46-弹力设计篇之“补偿事务”
  source_quote: |
    “千万不要把这些状态放到不同的组件中，最好是一个业务流程的控制方来做这个事，也就是一个工作流引擎。”
  failure_mode: |
    每个参与服务各自保存局部事务进度，没有统一流程状态和恢复入口。
  mechanism: |
    失败后无法还原全局已完成步骤，补偿次序、重试归属和最终状态变得不可判定。
  warning_signs: [人工查多库拼状态, 没有流程 ID, 补偿由脚本临时执行]
  bound_to: [补偿事务, 工作流状态管理]
  tags: [saga, compensation, state]

- id: ce15
  title: 对永久错误持续重试
  type: counter-example
  source_chapter: 47-弹力设计篇之“重试设计”
  source_quote: |
    ““重试”的语义是我们认为这个故障是暂时的，而不是永久的，所以，我们会去重试。”
  failure_mode: |
    不区分暂时性、业务性和程序性错误，统一自动重试。
  mechanism: |
    权限、非法数据和确定性代码缺陷不会随时间消失，重试只会增加流量并延迟真实错误。
  warning_signs: [所有异常同一策略, 4xx 也重试, 错误分类只有成功与失败]
  bound_to: [错误分类, 重试策略]
  tags: [retry, permanent-error, classification]

- id: ce16
  title: 无上限且无退避地重试
  type: counter-example
  source_chapter: 47-弹力设计篇之“重试设计”
  source_quote: |
    “每一次重试失败时都应该休息一会儿再重试，这样可以避免因为重试过快而导致网络上的负担加重。”
  failure_mode: |
    失败后立即、同步、无限重试，使下游在恢复前承受更大流量。
  mechanism: |
    大量客户端同时失败并同时重试，形成同步重试风暴，吞噬下游仅存容量。
  warning_signs: [没有最大次数, 固定零间隔, 大量客户端同一重试时刻]
  bound_to: [指数退避, 熔断与限流]
  tags: [retry-storm, backoff, overload]

- id: ce17
  title: 用过长队列掩盖过载
  type: counter-example
  source_chapter: 49-弹力设计篇之“限流设计”
  source_quote: |
    “如果队列过长，导致后端服务在队列没有满时就挂掉了。”
  failure_mode: |
    以为只要队列还能接收，请求就可以继续排队。
  mechanism: |
    排队时间和在途工作先耗尽下游资源，队列容量没有反映端到端延迟预算。
  warning_signs: [队列不设等待超时, 只监控是否满, 请求方持续 push]
  bound_to: [背压与限流, 延迟预算]
  tags: [queue, overload, backpressure]

- id: ce18
  title: 弹力设计停留在图纸上
  type: counter-example
  source_chapter: 51-弹力设计篇之“弹力设计总结”
  source_quote: |
    “如果是人肉运维的话，那么在故障发生的时候，不能及时地做出运维决定，也就空有这些弹力设计了。”
  failure_mode: |
    设计了熔断、扩容、限流和降级方案，却只能靠人发现并手工执行。
  mechanism: |
    故障传播速度快于人工识别与操作，正确机制因启动过晚而失效。
  warning_signs: [降级只有文档没有开关, 告警后手工查容量, 扩容依赖多人审批]
  bound_to: [自动化运维, 弹力准备度]
  tags: [automation, resilience, operations]

- id: ce19
  title: Service Mesh 成为新的致命依赖
  type: counter-example
  source_chapter: 55-管理设计篇之“服务网格”
  source_quote: |
    “如果Service Mesh有bug，或是Sidecar的组件不可用，就会导致整个架构出现致命的问题。”
  failure_mode: |
    把所有流量交给统一基础设施，却没有为其失败设计隔离、旁路和升级验证。
  mechanism: |
    横切能力集中后形成极大故障半径；透明代理的错误会同时影响大量服务。
  warning_signs: [控制面升级无灰度, Sidecar 故障阻断业务, 没有旁路方案]
  bound_to: [基础设施故障域评估, Service Mesh 采用决策]
  tags: [service-mesh, sidecar, blast-radius]

- id: ce20
  title: 网关变成业务单体与单点
  type: counter-example
  source_chapter: 56-管理设计篇之“网关模式”
  source_quote: |
    “网关如果没有设计，就会变成一个单点故障。”
  failure_mode: |
    把业务编排、协议细节和第三方依赖不断塞进所有流量必经的网关。
  mechanism: |
    业务耦合提高变更频率，集中流量扩大性能和可用性风险。
  warning_signs: [网关含大量业务规则, 单实例或单集群, 每个需求都改网关核心]
  bound_to: [网关边界设计, 高可用与隔离]
  tags: [gateway, single-point, coupling]

- id: ce21
  title: 把本地缓存塞进多实例服务
  type: counter-example
  source_chapter: 58-性能设计篇之“缓存”
  source_quote: |
    “缓存需要在所有的Service 实例上都建好，这让我们的Service有了状态，更难管理了。”
  failure_mode: |
    每个实例保留独立大缓存，却未处理一致性、路由和内存放大。
  mechanism: |
    随机负载均衡导致重复缓存与不同副本，实例扩缩容又改变命中率和状态分布。
  warning_signs: [各实例读到不同值, 扩容后命中率骤降, 缓存占用随副本数线性增加]
  bound_to: [缓存层级决策, 服务状态管理]
  tags: [cache, local-state, consistency]

- id: ce22
  title: 用哈希分片逃避业务建模
  type: counter-example
  source_chapter: 60-性能设计篇之“数据库扩展”
  source_quote: |
    “请只考虑业务分片。请不要走哈希散列的分片方式，除非有个人拿着刀把你逼到墙角，你马上就有生命危险，你才能走哈希散列的分片方式。”
  failure_mode: |
    未寻找稳定业务边界，直接按散列拆库以获得均匀分布。
  mechanism: |
    哈希破坏业务邻近性，使跨分片查询、扩容迁移和事务处理长期复杂化。
  warning_signs: [主要查询跨多数分片, 扩容要全量重分布, 分片键没有业务含义]
  bound_to: [数据库业务分片, 数据访问模式分析]
  tags: [database, sharding, hash]

- id: ce23
  title: 把记忆书单当作成长
  type: counter-example
  source_chapter: 91-程序员练级攻略的正确打开方式
  source_quote: |
    “记忆学习是简单粗暴的，所以也很容易忘，如果你不实操一下，就不会有具体、真实的感觉。”
  failure_mode: |
    收藏、背诵和读完大量资料，却没有把知识放进真实任务。
  mechanism: |
    没有操作反馈时，知识停留在识别层，无法形成调试、权衡和迁移能力。
  warning_signs: [书单持续增长但没有作品, 只能复述定义, 遇到变体无法解决]
  bound_to: [实验室—工作室—工厂, 学习闭环]
  tags: [learning, memorization, practice]

- id: ce24
  title: 以阅读数量制造勤奋感
  type: counter-example
  source_chapter: 96-高效学习：端正学习态度
  source_quote: |
    “学习不是努力读更多的书，盲目追求阅读的速度和数量，这会让人产生低层次的勤奋和成长的感觉，这只是在使蛮力。”
  failure_mode: |
    用阅读速度、课程完成率和收藏数量替代理解、验证和产出。
  mechanism: |
    易量化的输入制造即时奖励，掩盖没有思辨、实践、归纳和反馈的事实。
  warning_signs: [只统计读了多少, 没有问题清单, 没有可复现产出]
  bound_to: [深度学习闭环, 学习效果度量]
  tags: [learning, vanity-metric, shallow-work]

- id: ce25
  title: 困在二手信息层
  type: counter-example
  source_chapter: 97-高效学习：源头、原理和知识地图
  source_quote: |
    “不是被他人翻译过或消化过的，也不会有信息损失甚至有错误信息会让你走火入魔。”
  failure_mode: |
    只消费教程、搬运和结论，不回到论文、标准、官方文档或代码。
  mechanism: |
    二次转述会删掉约束、证据和不确定性，多次传播后错误被包装成共识。
  warning_signs: [无法给出一手出处, 不知道结论适用版本, 多篇文章共享同一无来源表述]
  bound_to: [一手资料研究, 知识地图]
  tags: [source-quality, second-hand, research]

- id: ce26
  title: 不吃自己的狗粮
  type: counter-example
  source_chapter: 98-高效学习：深度，归纳和坚持实践
  source_quote: |
    “写完代码，自己不测试，自己也不运维，我实在不知道他们怎么可能明白什么是好的设计，好的软件？”
  failure_mode: |
    只负责实现，把测试、部署、运维和用户痛苦交给其他人。
  mechanism: |
    开发者收不到真实生命周期反馈，坏设计的成本不会回到设计决策者。
  warning_signs: [开发不看生产指标, 无法本地复现运维问题, 交付后责任立即转移]
  bound_to: [端到端工程责任, 实践反馈闭环]
  tags: [dogfooding, ownership, feedback]

- id: ce27
  title: 没有反馈的单工沟通
  type: counter-example
  source_chapter: 101-高效沟通：Talk和Code同等重要
  source_quote: |
    “此外， **反馈** 也是个很好的方式，你把你理解的东西说给我听。如果有偏差，我再给你解释一下，直到双方达成 **共识**。”
  failure_mode: |
    发送方表达完便假定对方已经以同样含义理解。
  mechanism: |
    双方编码器、背景和术语不同；没有回传确认时，语义偏差会在执行中放大。
  warning_signs: [会议结束无人复述, 同一术语多种解释, 交付后才发现理解不同]
  bound_to: [闭环沟通, 共享语境]
  tags: [communication, feedback, shared-context]

- id: ce28
  title: 信息越多反而越没有信息
  type: counter-example
  source_chapter: 102-高效沟通：沟通阻碍和应对方法
  source_quote: |
    “信息太多就等于没有信息。”
  failure_mode: |
    用大量背景、铺垫和无关细节掩盖真正请求，使对方无法辨认行动点。
  mechanism: |
    接收者注意力有限，信号被噪声稀释；双方还会对隐含意图作不同猜测。
  warning_signs: [说了很久仍无明确请求, 结论藏在末尾, 听众各自猜下一步]
  bound_to: [高信噪比表达, 行动导向沟通]
  tags: [communication, noise, ambiguity]

- id: ce29
  title: 只说不听的争论
  type: counter-example
  source_chapter: 102-高效沟通：沟通阻碍和应对方法；103-高效沟通：沟通方式及技巧
  source_quote: |
    “沟通中的一方或者双方喋喋不休地说，而且是只说不听，各说各的。”
  failure_mode: |
    过早打断、反驳或重复立场，把沟通变成并行独白。
  mechanism: |
    缺少对方目标和利益信息会形成错误假设；情绪升级后事实也失去进入通道。
  warning_signs: [频繁打断, 不能复述对方观点, 论点重复但问题不收敛]
  bound_to: [倾听与争议处理, 技术沟通]
  tags: [listening, conflict, assumptions]

- id: ce30
  title: 管理者替员工给出全部答案
  type: counter-example
  source_chapter: 105-高效沟通：好老板要善于提问；106-高效沟通：好好说话的艺术
  source_quote: |
    “反之，如果你什么都想了，只让员工去执行，那么他就不思考了，而且有时还会生出一些怨念。”
  failure_mode: |
    管理者直接规定答案、工期和方案，只让成员执行，并把反馈拖到考核时。
  mechanism: |
    决策权与信息被集中，成员失去练习判断和承担结果的机会，也更容易带着抵触执行。
  warning_signs: [任务只有唯一方案, 估期由上级拍板, 问题到绩效面谈才出现]
  bound_to: [提问式领导, 持续反馈]
  tags: [management, coaching, autonomy]
~~~

## Extractor 自检

- [x] 每条都有明确的原文根据和不超过 150 汉字的短引文
- [x] 每条同时描述 failure_mode 与 mechanism
- [x] 每条尽量给出可观察 warning_signs
- [x] 每条绑定至少一个正向方法论主题
- [x] 覆盖职业、安全、故障、分布式、编程、弹力、数据、学习、沟通和管理语境
- [x] 未执行 Stage 1.5 筛选；有意保留可能重叠或后续被淘汰的候选
