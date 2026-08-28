# Glossary Candidates — 左耳听风专栏代理语料

> 研究对象是固定提交中的 119 篇第三方专栏镜像，不是纸质书全文。本提取器按自然专题分成 9 块，逐块扫描了全部 119 篇，再做块间术语合并；没有读取其他提取器的候选输出。

- 提取范围：开篇/加餐/结束语；01–20；21–40；41–62；63–68；69–91；92–106；107–115
- 固定语料版本：f2a1a74c146545a4405dd23ffe96248283a1e20a
- 候选数量：20
- 收录边界：只收作者反复使用、明确界定、用法不同于常识，或构成专栏核心论点的术语

- id: g01
  term: 技术本质
  type: term
  source_chapter: ["开篇词｜洞悉技术的本质，享受科技的乐趣", "加餐｜谈谈我的“三观”", "97｜高效学习：源头、原理和知识地图"]
  author_definition: |
    “我更愿意花时间在技术的原理和技术的本质上，这导致我需要了解各种各样的技术的设计方法以及内在原理。”
  key_distinction: |
    ≠ 熟练使用某个框架、平台或 API
    ≠ 记住当下流行的技术名词
    = 追问技术为何出现、解决什么问题、如何演进，以及设计中不可避免的约束和权衡
  why_it_matters: |
    这是整个专栏的总入口。下游学习、技术评估和职业选择类 skill 若把“本质”误解成“实现细节”，会再次把用户绑定到易过时的平台知识。
  tags: [core-concept, fundamentals, technology-evaluation]

- id: g02
  term: 技术领导力
  type: term
  source_chapter: ["05｜何为技术领导力？", "06｜如何才能拥有技术领导力？", "10｜如何成为一个大家愿意追随的 Leader？"]
  author_definition: |
    “技术领导力不仅仅是呈现出来的技术，而是一种可以获得绝对优势的技术能力。”
  key_distinction: |
    ≠ 技术职级、行政权力或管理者头衔
    ≠ 只比别人掌握更多工具
    = 在基础、决策、工程质量、创新和解题路径上建立可持续优势，并能带动团队提高标准
  why_it_matters: |
    领导力类 skill 必须以“解决正确的问题并提高团队产出上限”评估能力，不能用职位、汇报人数或个人英雄主义代替。
  tags: [core-concept, leadership, technical-decision]

- id: g03
  term: Leader
  type: term
  source_chapter: ["10｜如何成为一个大家愿意追随的 Leader？", "105｜高效沟通：好老板要善于提问", "106｜高效沟通：好好说话的艺术"]
  author_definition: |
    “Leader不是管理者，不是经理，更不是职称，而是一个领头人。”“说白了，Leader的影响力来自大家愿意跟随的现象，而经理或管理者的领导力来自职位和震慑，这两者是完全不同的。”
  key_distinction: |
    ≠ Boss：依赖职位和威慑驱动别人
    = 通过共同目标、可信行动、指导、共情、反馈和赋能赢得自愿追随
  why_it_matters: |
    下游团队协作 skill 若把 Leader 当作组织角色，会错误地把命令、考核和控制包装成领导力；作者强调的是关系结果和行为证据。
  tags: [leadership, influence, trust]

- id: g04
  term: 程序员修养
  type: term
  source_chapter: ["69｜程序员练级攻略：开篇词", "72｜程序员练级攻略：程序员修养"]
  author_definition: |
    “这是程序员的工程师文化，也就是程序员的价值观，因为我觉得如果你的技术修养不够的话，你学再多的知识也是没有用的。”
  key_distinction: |
    ≠ 个人礼貌、审美偏好或会写代码
    = 英文、提问、代码质量、安全意识、评审、测试、软件工程、上线规范和职业价值观的组合
  why_it_matters: |
    成长与工程评估类 skill 需要同时检查技术结果和交付方式；否则会把“功能能跑”误判为工程师已经成熟。
  tags: [craft, engineering-culture, professionalism]

- id: g05
  term: 技术变现
  type: term
  source_chapter: ["01｜程序员如何用技术变现（上）", "02｜程序员如何用技术变现（下）", "19｜答疑解惑：我们应该能够识别的表象和本质"]
  author_definition: |
    “技术付费点基本体现在两个地方，一个是，能帮别人‘挣钱’的地方；另一个是，能帮别人‘省钱’的地方。”
  key_distinction: |
    ≠ 靠包装、流量或追逐短期收入出售知识
    = 用稀缺手艺解决可验证的高价值问题，并以经历、效果和信任获得回报
  why_it_matters: |
    变现类 skill 必须先验证问题价值、能力稀缺性和信任证据，避免把作者的“手艺人”路径降格成营销套路。
  tags: [career, monetization, trust, scarce-skill]

- id: g06
  term: 技术价值
  type: term
  source_chapter: ["01｜程序员如何用技术变现（上）", "19｜答疑解惑：我们应该能够识别的表象和本质", "92｜程序员面试攻略：面试前的准备"]
  author_definition: |
    “能规模化低成本高效率解决实际问题的技术及其基础技术，就算是很low，也是很有价值的。”
  key_distinction: |
    ≠ 技术难度、代码量、新颖度或圈内声望
    = 对真实问题的规模、成本、效率、可靠性和业务结果产生可观察改善
  why_it_matters: |
    项目选择和架构决策类 skill 应用结果价值排序工作，而不是默认越新、越复杂或越“高大上”就越值得投入。
  tags: [value, problem-solving, scale, efficiency]

- id: g07
  term: 知识地图
  type: term
  source_chapter: ["97｜高效学习：源头、原理和知识地图", "98｜高效学习：深度，归纳和坚持实践", "100｜高效学习：面对枯燥和量大的知识"]
  author_definition: |
    “学习并不是为了要记忆那些知识点，而是为了要找到一个知识的地图，你在这个地图上能通过关键路径找到你想要的答案。”
  key_distinction: |
    ≠ 书单、收藏夹、脑图装饰或知识点清单
    = 从主干问题出发，把原理、演进、实现、关联和应用连成可遍历、可挂接新知识的结构
  why_it_matters: |
    学习规划类 skill 需要输出可导航的结构和关键路径；只推荐资料会增加信息负担，却没有形成检索和迁移能力。
  tags: [learning, knowledge-map, navigation, synthesis]

- id: g08
  term: 信息源头
  type: term
  source_chapter: ["97｜高效学习：源头、原理和知识地图", "101｜高效沟通：Talk 和 Code 同等重要", "102｜高效沟通：沟通阻碍和应对方法"]
  author_definition: |
    “将信息源头的信息原模原样分享出去，而不是我“嚼过的”。因为，我认为后者的信息损失会非常大，而且产生的不良后果也会很大。”
  key_distinction: |
    ≠ 搜索结果中最容易读到的二手总结
    = 当事人、论文、标准、规格、官方文档、源代码和原始设计材料等可回溯的一手证据
  why_it_matters: |
    研究与沟通类 skill 必须优先回到可核验源头，并把二手材料作为线索而非最终依据，以减少传递损失和立场加工。
  tags: [evidence, primary-source, learning, communication]

- id: g09
  term: 主动学习
  type: term
  source_chapter: ["96｜高效学习：端正学习态度", "98｜高效学习：深度，归纳和坚持实践", "结束语｜业精于勤，行成于思"]
  author_definition: |
    “只有你开始自己思考，开始自己总结和归纳，开始找人交流讨论，开始践行，并开始对外输出，你才会掌握到真正的学习能力。”
  key_distinction: |
    ≠ 仅听课、阅读、观看演示或囤积内容
    = 讨论、实践、教授、输出和反馈共同参与的知识重构过程
  why_it_matters: |
    学习类 skill 应把产出、实践和反馈作为完成条件，而不能把“看完资料”当作能力形成。语料中的固定留存率数字不应被当成可靠定量依据。
  tags: [learning, active-learning, practice, output]

- id: g10
  term: 深度学习（学习方法）
  type: term
  source_chapter: ["96｜高效学习：端正学习态度", "97｜高效学习：源头、原理和知识地图", "98｜高效学习：深度，归纳和坚持实践"]
  author_definition: |
    “要思辨，要践行，要总结和归纳，否则，你只是在机械地重复某件事，而不会有质的成长的。”
  key_distinction: |
    ≠ 机器学习中的 Deep Learning
    ≠ 阅读量大、学习时长长或记忆更多答案
    = 用一手资料、原理追问、思辨、实践、归纳和输出，把信息转化为可迁移能力
  why_it_matters: |
    该词在同一语料里同时指机器学习技术和学习方式。下游 skill 必须显式消歧，否则会把职业学习方法与神经网络主题混在一起。
  tags: [learning, disambiguation, deep-learning-method, practice]

- id: g11
  term: 学习能力
  type: term
  source_chapter: ["06｜如何才能拥有技术领导力？", "91｜程序员练级攻略的正确打开方式", "98｜高效学习：深度，归纳和坚持实践"]
  author_definition: |
    “所谓学习能力，就是能够很快地学习新技术，又能在关键技术上深入的能力。”
  key_distinction: |
    ≠ 记忆快、课程完成多或知道的名词多
    = 既能靠基础和方法快速迁移，又能在关键处深入原理、实现和场景
  why_it_matters: |
    能力评估类 skill 需要同时验证学习速度和关键纵深，避免把浅层涉猎或单点钻研中的任一种单独当作完整学习能力。
  tags: [learning, adaptability, depth, fundamentals]

- id: g12
  term: 工程权衡
  type: term
  source_chapter: ["加餐｜谈谈我的“三观”", "21｜分布式系统架构的冰与火", "76｜程序员练级攻略：软件设计", "91｜程序员练级攻略的正确打开方式"]
  author_definition: |
    “没有完美的技术，工程（Engineering）玩的是权衡（trade off）。”
  key_distinction: |
    ≠ 在技术争论中选出无条件的赢家
    ≠ 没有原则地折中
    = 在明确场景、约束和目标后，比较收益、成本、复杂度、风险与可逆性
  why_it_matters: |
    所有技术选型和架构类 skill 都需要显式列出适用条件、代价和替代方案；否则模式会被错误地固化成最佳实践。
  tags: [engineering, trade-off, decision, constraints]

- id: g13
  term: 编程的本质
  type: term
  source_chapter: ["30–40｜编程范式游记", "53｜管理设计篇之配置中心", "54｜管理设计篇之边车模式"]
  author_definition: |
    “程序的本质是Logic+Control+Data，而其中，Logic和Control是关键。”
  key_distinction: |
    ≠ 语言语法、框架数量或设计模式名称
    = Logic 表达做什么，Control 表达如何执行，Data 承载状态；复杂性常来自逻辑与控制纠缠
  why_it_matters: |
    代码审查、重构和架构诊断类 skill 可用它定位耦合来源，并把可复用的控制机制从业务语义中分离。
  tags: [programming, logic-control, coupling, abstraction]

- id: g14
  term: 弹力设计
  type: term
  source_chapter: ["41–51｜弹力设计篇", "81｜程序员练级攻略：分布式架构入门", "83｜程序员练级攻略：分布式架构工程设计"]
  author_definition: |
    “对于分布式系统的容错设计，在英文中又叫Resiliency（弹力）。意思是，系统在不健康、不顺，甚至出错的情况下有能力hold得住，挺得住，还有能在这种逆境下力挽狂澜的能力。”
  key_distinction: |
    ≠ 某个容错框架或单一熔断器
    ≠ 假设故障可以彻底消除
    = 围绕隔离、异步、幂等、状态、补偿、重试、熔断、限流和降级形成的系统性容错能力
  why_it_matters: |
    可靠性类 skill 需要从故障假设和影响控制出发组合模式，而不是机械安装某个组件后宣称系统已经高可用。
  tags: [resilience, distributed-system, fault-tolerance, availability]

- id: g15
  term: 故障复盘
  type: term
  source_chapter: ["17｜故障处理最佳实践：应对故障", "18｜故障处理最佳实践：故障改进"]
  author_definition: |
    “需要反思并反问至少5个为什么，并为这些‘为什么’找到答案。”“需要针对上述的‘Ask 5 Whys’说明后续如何举一反三地从根本上解决所有的问题。”
  key_distinction: |
    ≠ 找责任人、处罚直接操作者或只写事故摘要
    = 透明还原时间线，分析原因，连续追问根因，并形成可跟踪的系统性整改计划
  why_it_matters: |
    事故处理 skill 必须把学习和降低复发概率放在归责之前，否则组织会隐藏信息，修复也会停留在直接诱因。
  tags: [incident, postmortem, five-whys, remediation]

- id: g16
  term: 实验室—工作室—工厂
  type: term
  source_chapter: ["91｜程序员练级攻略的正确打开方式"]
  author_definition: |
    “实验室只是在做一些验证型的实验，以跑通一个小技术功能为主。而工作室则是要以完成一个比较完整的软件功能为主，也就是说，可以让别人/用户来用的东西。”
  key_distinction: |
    实验室 = 隔离验证单个技术点
    工作室 = 做出别人能够使用的完整作品
    工厂 = 以工业标准、CI/CD、SLA、可维护性、可扩展性和可运维性稳定交付
  why_it_matters: |
    项目式学习 skill 可用这三个成熟度阶段定义验收门槛，避免把 Hello World 当作品，也避免初学阶段直接套用全部工业流程。
  tags: [learning-path, maturity-model, project, engineering]

- id: g17
  term: 反馈（含正反馈）
  type: term
  source_chapter: ["19｜答疑解惑：我们应该能够识别的表象和本质", "101｜高效沟通：Talk 和 Code 同等重要", "105｜高效沟通：好老板要善于提问"]
  author_definition: |
    “反馈也是个很好的方式，你把你理解的东西说给我听。如果有偏差，我再给你解释一下，直到双方达成共识。”
  key_distinction: |
    ≠ 单向评价、事后批评或只汇报结果
    = 用回传确认修正理解偏差，并让解决问题产生的成就感形成继续投入的正向循环
  why_it_matters: |
    沟通、学习和团队管理类 skill 都依赖短周期反馈：它既校准信息，又把成果转为持续行动的动力。
  tags: [feedback, communication, motivation, learning-loop]

- id: g18
  term: 状态拟合
  type: term
  source_chapter: ["25｜分布式系统关键技术：服务调度", "46｜弹力设计篇之补偿事务"]
  author_definition: |
    “我们的系统需要努力地通过一系列的操作达到一个我们想要的状态。如果达不到，就需要通过补偿机制回滚到之前的状态。这就是所谓的状态拟合。”
  key_distinction: |
    ≠ 一次命令立即得到正确结果
    = 控制器反复观察当前状态并执行动作，持续逼近期望状态；失败时通过补偿回到可接受状态
  why_it_matters: |
    调度、工作流和补偿事务类 skill 需要把控制设计成持续收敛过程，并显式处理每个中间状态和失败路径。
  tags: [control-loop, desired-state, orchestration, compensation]

- id: g19
  term: 自包含
  type: term
  source_chapter: ["21｜分布式系统架构的冰与火", "43｜弹力设计篇之异步通讯设计", "51｜弹力设计篇之弹力设计总结"]
  author_definition: |
    “所谓‘自包含’也就是没有和别人产生依赖。”
  key_distinction: |
    ≠ 单个进程、单一部署单元或绝对不与外界通信
    = 把密切相关的能力收在可独立运行的边界内，通过事件或明确协议协作，减少运行时依赖的深度和广度
  why_it_matters: |
    服务拆分类 skill 应以可独立运行和依赖边界检验拆分质量，不能只按代码目录、团队或接口数量声称已经微服务化。
  tags: [architecture, dependency, autonomy, service-boundary]

- id: g20
  term: 全栈监控
  type: term
  source_chapter: ["23｜分布式系统的技术栈", "24｜分布式系统关键技术：全栈监控", "81｜程序员练级攻略：分布式架构入门"]
  author_definition: |
    “所谓全栈监控，其实就是三层监控。”
  key_distinction: |
    ≠ 只采集主机 CPU、内存和日志
    = 同时覆盖基础资源层、中间件层和应用层，并服务于日常“体检”和故障“急诊”
  why_it_matters: |
    可观测性与故障定位类 skill 需要跨层关联资源、组件、请求和用户结果；单层指标无法解释分布式故障的传播链。
  tags: [observability, monitoring, distributed-system, incident]
