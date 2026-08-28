import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const demoRoot = resolve(scriptDir, "..");
const candidateRoot = resolve(demoRoot, "..", "candidates");
const stage15Root = resolve(demoRoot, "..", "stage1.5", "incident-postmortem");
const stage2Root = resolve(demoRoot, "..", "stage2", "incident-learning-audit");
const stage4Root = resolve(demoRoot, "..", "stage4", "incident-learning-audit");
const stage5Root = resolve(demoRoot, "..", "stage5", "incident-learning-audit");

const sources = [
  {
    file: "frameworks.md",
    type: "framework",
    label: "框架",
    description: "可迁移的思考、决策与推理结构",
  },
  {
    file: "principles.md",
    type: "principle",
    label: "原则",
    description: "原子规则、检查项与行动断言",
  },
  {
    file: "cases.md",
    type: "case",
    label: "案例",
    description: "过去应用、跨语境证据与结果",
  },
  {
    file: "counter-examples.md",
    type: "counter-example",
    label: "反例",
    description: "失败机制、预警信号与边界",
  },
  {
    file: "glossary.md",
    type: "term",
    label: "术语",
    description: "作者特定用法与共享词典",
  },
];

const expectedCounts = {
  framework: 39,
  principle: 108,
  case: 50,
  "counter-example": 30,
  term: 20,
};

function scalar(value) {
  const trimmed = value.trim();
  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return trimmed.replace(/^["']|["']$/g, "");
}

function parseCandidates(markdown, fallbackType) {
  const lines = markdown.split(/\r?\n/);
  const items = [];

  for (let index = 0; index < lines.length; index += 1) {
    const idMatch = lines[index].match(/^(\s*)-\s+id:\s*(\S+)\s*$/);
    if (!idMatch) continue;

    const itemIndent = idMatch[1].length;
    const item = { id: idMatch[2], type: fallbackType };
    let cursor = index + 1;

    while (cursor < lines.length) {
      const nextId = lines[cursor].match(/^(\s*)-\s+id:\s*(\S+)\s*$/);
      if (nextId && nextId[1].length === itemIndent) break;

      const fieldMatch = lines[cursor].match(/^(\s+)([a-z_]+):(?:\s*(.*))?$/i);
      if (!fieldMatch || fieldMatch[1].length <= itemIndent) {
        cursor += 1;
        continue;
      }

      const fieldIndent = fieldMatch[1].length;
      const key = fieldMatch[2];
      const rawValue = fieldMatch[3] ?? "";

      if (rawValue === "|" || rawValue === "|-" || rawValue === ">") {
        const parts = [];
        cursor += 1;
        while (cursor < lines.length) {
          const line = lines[cursor];
          const indent = line.length - line.trimStart().length;
          if (line.trim() && indent <= fieldIndent) break;
          if (line.trim()) parts.push(line.trim());
          cursor += 1;
        }
        item[key] = parts.join("\n").trim();
        continue;
      }

      item[key] = scalar(rawValue);
      cursor += 1;
    }

    item.type = fallbackType;
    item.title = item.title || item.term || item.id;
    item.evidence = item.source_quote || item.author_definition || "";
    item.summary =
      item.summary ||
      item.why_it_matters ||
      item.failure_mode ||
      item.key_distinction ||
      "";
    item.tags = Array.isArray(item.tags) ? item.tags : [];
    item.searchText = [
      item.id,
      item.title,
      item.source_chapter,
      item.summary,
      item.evidence,
      item.tags.join(" "),
      Array.isArray(item.bound_to) ? item.bound_to.join(" ") : item.bound_to,
    ]
      .filter(Boolean)
      .join(" ")
      .toLocaleLowerCase("zh-CN");
    items.push(item);
    index = cursor - 1;
  }

  return items;
}

const candidates = [];

for (const source of sources) {
  const markdown = await readFile(resolve(candidateRoot, source.file), "utf8");
  const parsed = parseCandidates(markdown, source.type);
  if (parsed.length !== expectedCounts[source.type]) {
    throw new Error(
      source.file +
        " parsed " +
        parsed.length +
        " candidates; expected " +
        expectedCounts[source.type],
    );
  }
  candidates.push(...parsed);
}

const counts = Object.fromEntries(
  sources.map((source) => [
    source.type,
    candidates.filter((candidate) => candidate.type === source.type).length,
  ]),
);

const stage15Validation = JSON.parse(
  await readFile(resolve(stage15Root, "validation.json"), "utf8"),
);
const stage2Validation = JSON.parse(
  await readFile(resolve(stage2Root, "validation.json"), "utf8"),
);
const stage4Validation = JSON.parse(
  await readFile(resolve(stage4Root, "validation.json"), "utf8"),
);
const stage5Validation = JSON.parse(
  await readFile(resolve(stage5Root, "validation.json"), "utf8"),
);
const stage5PublicCase = JSON.parse(
  await readFile(resolve(stage5Root, "PUBLIC_CASE_CLOUDFLARE_2019.json"), "utf8"),
);

if (stage15Validation.status !== "pass" || stage15Validation.caseCount !== 18) {
  throw new Error("Stage 1.5 pilot validation is missing or stale");
}

if (
  stage2Validation.status !== "pass" ||
  stage2Validation.riaSections !== 6 ||
  stage2Validation.executionSteps !== 8 ||
  stage2Validation.routes.length !== 5 ||
  stage2Validation.artifacts.references !== 2
) {
  throw new Error("Stage 2 skill construction validation is missing or stale");
}

if (
  stage4Validation.status !== "pass" ||
  stage4Validation.version !== "0.1.1" ||
  stage4Validation.final.total !== 19 ||
  stage4Validation.final.passed !== 19 ||
  stage4Validation.final.negativeFalsePositives !== 0
) {
  throw new Error("Stage 4 pressure-test validation is missing or stale");
}

if (
  stage5Validation.stage !== "5A" ||
  stage5Validation.status !== "pass-with-runtime-observation" ||
  stage5Validation.installation.scope !== "REPO" ||
  stage5Validation.installation.filesMatched !== 6 ||
  stage5Validation.installation.filesTotal !== 6 ||
  stage5Validation.installation.allHashesMatch !== true ||
  stage5Validation.hostInvocations.length !== 3 ||
  stage5Validation.hostInvocations.some((item) => item.result !== "pass") ||
  stage5Validation.stage5Complete !== false ||
  stage5Validation.realIncidentExternalValidity !== false
) {
  throw new Error("Stage 5A install/host validation is missing or stale");
}

if (
  stage5PublicCase.stage !== "5B" ||
  stage5PublicCase.status !== "pass-public-case-audit" ||
  stage5PublicCase.routingModes.length !== 5 ||
  stage5PublicCase.steps.length !== 8 ||
  stage5PublicCase.score.total !== 86 ||
  stage5PublicCase.claims.publicRealIncidentDemonstrated !== true ||
  stage5PublicCase.claims.organizationExternalValidity !== false ||
  stage5PublicCase.claims.stage5Complete !== false
) {
  throw new Error("Stage 5B public-case audit is missing or stale");
}

const payload = {
  meta: {
    title: "左耳听风 · 仓颉研究台",
    track: "Column Proxy Track",
    corpusFiles: 119,
    corpusImages: 162,
    corpusCharacters: 852621,
    candidateCount: candidates.length,
    pinnedCommit: "f2a1a74c146545a4405dd23ffe96248283a1e20a",
    stage: "Stage 5B 首个 Skill 已完成真实公开事故完整演练",
    nextGate: "v0.1.1 · Cloudflare public case · 8 / 8 sections",
    generatedAt: new Date().toISOString(),
    thesis:
      "以价值观选择方向，以基础原理和一手信息构建知识地图，再通过实践、输出与工程化，把知识转化为解决真实问题并影响他人的能力。",
    boundary:
      "研究对象是 119 篇第三方专栏代理语料，不是纸质书全文；247 条是高召回候选池，不是最终 Skill 数。",
  },
  types: sources.map((source) => ({
    type: source.type,
    label: source.label,
    description: source.description,
    count: counts[source.type],
  })),
  pipeline: [
    {
      id: "source",
      label: "固定语料",
      state: "complete",
      metric: "119 篇",
      detail: "提交与子树对象已锁定，原文不进入交付仓库",
    },
    {
      id: "stage-0",
      label: "Stage 0",
      state: "complete",
      metric: "Adler 四步",
      detail: "结构、解释、批判、应用；已获用户确认",
    },
    {
      id: "stage-1",
      label: "Stage 1",
      state: "complete",
      metric: "247 候选",
      detail: "五路独立提取并完成来源与协议审计",
    },
    {
      id: "stage-1-5",
      label: "Stage 1.5",
      state: "pilot",
      metric: "1 / 247 pilot",
      detail: "故障复盘候选已完成三重验证；修订方向获用户确认",
    },
    {
      id: "stage-2",
      label: "Stage 2",
      state: "constructed",
      metric: `1 Skill / v${stage2Validation.version}`,
      detail: "RIA++ 六段、五种路由、两个按需参考与 UI 元数据已构造并保持静态有效",
    },
    {
      id: "stage-3",
      label: "Stage 3",
      state: "future",
      metric: "Needs 2+ Skills",
      detail: "当前只有一个正式 Skill，不虚构依赖、对比或组合关系",
    },
    {
      id: "stage-4",
      label: "Stage 4",
      state: "validated",
      metric: "19 / 19 blind",
      detail: "三位全新评测 Agent 完成 v0.1.1 全量回归，负例零误触发",
    },
    {
      id: "stage-5",
      label: "Stage 5",
      state: "demonstrated",
      metric: "5B · public case",
      detail: "项目级安装、宿主发现与首个真实公开事故八段演练通过；组织内部效度、DIGEST 与多 Skill 交付仍待完成",
    },
  ],
  stage15Pilot: {
    scope: "首个受控试点 · 其余 246 条尚未验证",
    original: {
      name: "线上故障复盘",
      decision: "V3 未通过",
      status: "reject-as-standalone",
      reason:
        "时间线、5 Whys、无责复盘和行动项已是通用 SRE 实践，原样产品化只会重复常识。",
    },
    revised: {
      id: "incident-learning-audit",
      name: "系统性故障学习审查",
      decision: "已确认进入 Stage 2",
      status: "confirmed-for-stage2",
      reason:
        "收窄为四项审查：反归责、反局部补丁、反复杂度增殖，并用跨层整改和复发验证关闭学习环。",
    },
    verification: [
      {
        id: "V1",
        label: "跨域",
        status: "pass",
        result: "4 个独立语境",
        detail: "复盘流程、领导方式、服务责任与全栈监控共同支持。",
      },
      {
        id: "V2",
        label: "预测力",
        status: "pass",
        result: "新问题可推导",
        detail: "能分析 AI 生成配置导致事故，而不把工具或操作者当终止根因。",
      },
      {
        id: "V3",
        label: "独特性",
        status: "revised",
        result: "原形失败 · 修订通过",
        detail: "剥离通用模板，只保留改变判断顺序与停止条件的增量。",
      },
    ],
    tests: {
      total: stage15Validation.caseCount,
      distribution: [
        { id: "core", label: "核心域", count: stage15Validation.distribution.core },
        {
          id: "insufficient",
          label: "信息不足",
          count: stage15Validation.distribution.insufficient,
        },
        { id: "active", label: "活动事故", count: stage15Validation.distribution.active },
        {
          id: "adjacent",
          label: "相邻域",
          count: stage15Validation.distribution.adjacent,
        },
        { id: "out", label: "域外", count: stage15Validation.distribution.out },
      ],
      limitation: stage15Validation.limitation,
    },
    nextGate: "确认门已于 2026-08-28 通过；正式 Skill 构造见下一节。",
  },
  stage2Build: {
    scope: `首个正式构造 · v${stage2Validation.version} · 后续已在 Stage 5A 安装`,
    skill: {
      id: stage2Validation.skill,
      name: "系统性故障学习审查",
      version: stage2Validation.version,
      status: "static-pass",
      statusLabel: "静态构造验证通过",
      purpose: "审查事故复盘是否停在直接诱因、个人归责、局部补丁或不可验收行动。",
      discovery: "默认允许自动发现；也可通过 $incident-learning-audit 显式调用。",
    },
    ria: [
      { id: "R", label: "原文", detail: "60 字短引文 + Column Proxy 来源边界" },
      { id: "I", label: "解释", detail: "证据纪律、跨层追因、整改和学习闭环" },
      { id: "A1", label: "书中应用", detail: "慢 SQL 连续追因案例" },
      { id: "A2", label: "触发", detail: "中英文信号 + 相邻能力区分" },
      { id: "E", label: "执行", detail: "0–7 共 8 步，含完成与判停标准" },
      { id: "B", label: "边界", detail: "不编造、不归责、不越权、不跨高风险域" },
    ],
    routes: [
      { id: "full_review", label: "完整审查", detail: "稳定事故且证据达到门槛" },
      { id: "evidence_gap", label: "证据缺口", detail: "只列未知和取证计划" },
      { id: "active_handoff", label: "活动事故", detail: "先恢复与保全证据" },
      { id: "adjacent_transfer", label: "相邻迁移", detail: "迁移方法但标记未验证" },
      { id: "stop", label: "停止", detail: "高风险或完全不适用" },
    ],
    artifacts: [
      { name: "SKILL.md", role: "运行入口", detail: "RIA++、触发、执行和边界" },
      {
        name: "evidence-and-routing.md",
        role: "按需参考",
        detail: "判断响应模式或输入充分性时读取",
      },
      {
        name: "output-contract.md",
        role: "按需参考",
        detail: "完整审查、版本比较或评分时读取",
      },
      { name: "agents/openai.yaml", role: "UI 元数据", detail: "显示名、短描述和默认提示" },
    ],
    validation: {
      status: stage2Validation.status,
      checks: Object.keys(stage2Validation.checks).length,
      quoteLength: stage2Validation.quoteLength,
      limitation: stage2Validation.limitation,
    },
    nextGate:
      "Stage 2 只证明构造有效；Stage 4 证明合成行为，Stage 5A 另行证明项目级宿主发现。",
  },
  stage4Test: {
    scope: "19 个合成合同案例 · 3 轮 · 9 位独立评测 Agent",
    status: "behavior-pass",
    statusLabel: "Stage 4 合成压力测试通过",
    version: stage4Validation.version,
    final: {
      passed: stage4Validation.final.passed,
      total: stage4Validation.final.total,
      passRate: stage4Validation.final.passRate,
      evaluators: stage4Validation.final.evaluators,
      negativeTotal: stage4Validation.final.negativeTotal,
      negativeFalsePositives: stage4Validation.final.negativeFalsePositives,
    },
    rounds: [
      {
        id: "R1",
        label: "初始全量盲测",
        version: "0.1.0",
        result: "16 / 19",
        status: "repair",
        detail: "84.2%；负例 6/6，但三处路由歧义需要修订",
      },
      {
        id: "R2",
        label: "失败题聚焦复测",
        version: "0.1.1",
        result: "3 / 3",
        status: "pass",
        detail: "原失败全部纠正；不把局部成功当作最终验收",
      },
      {
        id: "R3",
        label: "最终全量回归",
        version: "0.1.1",
        result: "19 / 19",
        status: "pass",
        detail: "三位全新 Agent；6 个负例零误触发",
      },
    ],
    repairs: [
      {
        caseId: "I03",
        title: "混合请求没有被整体拒绝",
        before: "事故整改与人员处罚一起进入 stop",
        after: "拒绝处分判断，技术学习部分进入 evidence_gap",
      },
      {
        caseId: "C08",
        title: "没有把‘未枚举’误判成‘不存在’",
        before: "提示未列日志就被降级为 evidence_gap",
        after: "稳定且机制具体时先 full_review，缺项进入未知",
      },
      {
        caseId: "X02",
        title: "活动事故阶段门有了明确所有权",
        before: "直接转交，技能本身被判为不触发",
        after: "技能触发 active_handoff，恢复执行交给响应流程",
      },
    ],
    matrix: [
      { id: "positive", label: "应触发", result: "8 / 8", detail: "稳定技术事故进入完整审查" },
      { id: "edge", label: "边界路由", result: "5 / 5", detail: "证据缺口或活动事故正确分流" },
      { id: "negative", label: "不应触发", result: "6 / 6", detail: "相邻能力、高风险与人员裁决正确拒绝" },
      { id: "false-positive", label: "负例误触发", result: "0", detail: "同源架构能力混淆题也正确转交" },
    ],
    protocol: [
      "评测 Agent 只看到隔离 Skill 快照、按需参考、相邻能力目录和匿名问题",
      "题型、期望行为、评分标准、前轮结果和其他 Agent 输出全部隐藏",
      "评测 Agent 只返回行为；由主代理对照冻结 oracle 独立判分",
    ],
    boundary:
      "19 / 19 只证明合成合同上的触发、路由、安全边界与行动提纲；Stage 5B 已增加真实公开事故案例，但用户组织内部材料仍未评测。项目级安装与宿主发现由 Stage 5A 另行证明。",
  },
  stage5Install: {
    status: "repo-install-pass",
    statusLabel: "Stage 5A 项目级安装通过",
    scope: "REPO · 只对当前仓库及其子目录生效",
    skill: stage5Validation.installation.skill,
    version: stage5Validation.installation.version,
    installPath: stage5Validation.installation.targetPath,
    integrity: {
      matched: stage5Validation.installation.filesMatched,
      total: stage5Validation.installation.filesTotal,
      algorithm: "SHA-256",
      detail: "源 Skill 与安装副本逐文件一致；没有写入用户级或全局目录。",
    },
    calls: [
      {
        id: "explicit",
        kicker: "EXPLICIT / $incident-learning-audit",
        label: "显式发现",
        result: "PASS",
        route: "full_review",
        detail: "全新只读临时 Codex 实际读取项目内 SKILL.md、版本 0.1.1 与路由参考。",
      },
      {
        id: "implicit",
        kicker: "IMPLICIT / INCIDENT LANGUAGE",
        label: "语义触发",
        result: "PASS",
        route: "full_review",
        detail: "没有写 Skill 名称；凭已恢复事故、个人归因和培训审批整改自动命中。",
      },
      {
        id: "negative",
        kicker: "NEGATIVE / ARCHITECTURE CHOICE",
        label: "负例边界",
        result: "PASS",
        route: "not-triggered",
        detail: "纯 Kafka / RabbitMQ 未来架构选型没有被强行套入事故复盘。",
      },
    ],
    usage: {
      explicit:
        "$incident-learning-audit 审查这份已恢复事故；先选响应模式，再建证据账本、因果阶梯和可验收行动。缺失项写未知。",
      implicit:
        "这份故障复盘把根因写成操作失误，整改是培训和加审批。请判断是否治本，并给出可验收行动。",
      active:
        "$incident-learning-audit 事故仍在扩大；只做 active_handoff，不展开长期整改。",
    },
    sample: {
      title: "价格服务区域配置事故",
      route: "full_review",
      impact: "18% 结算请求失败约 30 分钟；材料称无数据丢失。",
      conclusion: "尚未形成学习闭环",
      steps: [
        { id: "01", title: "路由与禁止推断", detail: "已稳定、材料可建账本；不认定个人责任，不把直接触发当系统根因。" },
        { id: "02", title: "事故摘要", detail: "10:02 发布，10:04 5xx 上升，10:31 回滚，10:34 恢复。" },
        { id: "03", title: "证据账本", detail: "发布、指标、日志、diff、回滚为事实；校验、告警依据和历史事故为未知。" },
        { id: "04", title: "用户影响时间线", detail: "分开发生、发现、客服升级、定位、回滚与恢复，不把时间先后直接写成因果。" },
        { id: "05", title: "因果阶梯", detail: "从区域变量错配追到配置约束、分阶段发布、发现机制和责任边界。" },
        { id: "06", title: "表面整改审查", detail: "培训、主管审批和仪表盘都未说明改变什么风险机制，也不可验收。" },
        { id: "07", title: "分层行动", detail: "配置 schema、分阶段发布、告警回放、运行手册演练；负责人和日期保留待指定。" },
        { id: "08", title: "学习闭环", detail: "用错配注入演练验证部署前拦截、影响限制、发现速度和回滚能力。" },
      ],
    },
    runtime: {
      label: "运行时观察，不是能力失败",
      detail:
        "两次嵌套 CLI 的完整长输出均已加载 Skill 和两份参考，但在多个连续 30 秒轮询中没有返回最终正文并被人工中断；短路由输出正常完成。",
      next:
        "后续用脱敏真实材料建立首 token、总耗时、token 与成功率基线；关键流程优先显式调用，并减少无关 Skill / Plugin。",
    },
    boundary:
      "项目级安装只证明当前仓库可发现和正确路由；不等于用户全局安装、插件发布、完整 DIGEST 或真实组织事故外部效度。",
    nextGate:
      "Stage 5B 已完成首个真实公开案例；下一门是用户组织脱敏材料试点、长输出基准与第二个正式 Skill。",
  },
  stage5PublicCase,
  architecture: [
    {
      index: "01",
      title: "价值选择",
      copy: "长期主义、稀缺能力、技术价值、职业选择与信任。",
      tags: ["career", "value", "leadership"],
    },
    {
      index: "02",
      title: "学习转化",
      copy: "一手信息、知识地图、实践、反馈、输出与能力阶梯。",
      tags: ["learning", "practice", "feedback"],
    },
    {
      index: "03",
      title: "软件工程",
      copy: "逻辑与控制分离、协议、质量、发布、可观测与故障复盘。",
      tags: ["engineering", "incident", "architecture"],
    },
    {
      index: "04",
      title: "系统领导",
      copy: "在约束中解题、权衡取舍、提高标准、建立信任并发展他人。",
      tags: ["decision", "communication", "leadership"],
    },
  ],
  capabilityGate: {
    labels: {
      core: "核心域 · 完整候选执行",
      adjacent: "相邻域 · 方法迁移待验证",
      out: "域外 · 停止路由",
    },
    policies: {
      core: "问题同时命中能力路线和技术、工程或研发组织信号，可以运行当前候选执行链。",
      adjacent: "只迁移通用方法，不声称书中证据已经证明它在该领域有效；结果必须接受新的领域验证。",
      out: "当前候选池不具备回答该问题所需的专业知识、实时信息或责任边界，因此停止执行。",
    },
    outOfScope: [
      {
        id: "finance",
        label: "金融与投资决策",
        signals: ["股票", "基金", "投资", "理财", "买入", "卖出", "收益率"],
        recommendation: "请使用具备实时市场数据、风险披露和合规边界的金融研究能力，并咨询持牌专业人士。",
      },
      {
        id: "medical",
        label: "医疗诊断与用药",
        signals: ["诊断", "用药", "症状", "处方", "疾病", "治疗"],
        recommendation: "请使用可靠医疗信息源并咨询合格医务人员；本候选池不能进行诊断或用药判断。",
      },
      {
        id: "legal",
        label: "法律与合同判断",
        signals: ["合同是否合法", "法律意见", "诉讼", "违法", "律师", "仲裁"],
        recommendation: "请查阅现行法律与合同原文，并咨询具备相应法域资格的法律专业人士。",
      },
      {
        id: "daily",
        label: "生活技能与即时事实",
        signals: ["菜谱", "做菜", "天气", "彩票", "旅游价格", "航班"],
        recommendation: "请切换到对应生活服务、实时查询或专业领域能力。",
      },
    ],
    outExample: {
      label: "测试域外边界",
      prompt: "帮我判断今天应该买哪只股票，并给出具体投资建议。",
    },
  },
  routes: [
    {
      id: "learn",
      label: "学习一门新技术",
      skillName: "技术学习规划（候选）",
      samplePrompt: "我想在八周内学习 Kubernetes，并完成一个可以上线的小项目。",
      keywords: ["学习", "学会", "入门", "掌握", "知识", "路线", "资料", "课程"],
      domainSignals: ["技术", "编程", "软件", "系统", "数据库", "算法", "kubernetes", "云原生", "安全", "工程"],
      question: "资料很多、时间有限，怎样学到能解决真实问题？",
      outcome: "从源头与问题出发，建立知识地图，再用三级实践形成可交付能力。",
      intake: [
        "当前技术基础、做过的项目和主要短板",
        "可投入周期、每周时间和明确截止点",
        "希望用这门技术解决的真实问题",
      ],
      deliverables: [
        "一份覆盖问题、原理、取舍与生态的六问技术画像",
        "一张主干—关联—关键路径知识地图",
        "实验室—工作室—工厂三级实践计划",
        "按周验收的可运行产物与公开输出清单",
      ],
      qualityChecks: [
        "每个阶段都必须产生可运行或可讲解的作品",
        "禁止用收藏数量、阅读时长或课程进度代替能力验证",
      ],
      boundary: "缺少个人基础和目标项目时，只能生成待补充的规划骨架，不能承诺学习周期或掌握程度。",
      path: [
        { candidateId: "f27", action: "用六问模板辨认问题、原理与权衡" },
        { candidateId: "f28", action: "建立主干—关联—关键路径知识地图" },
        { candidateId: "f25", action: "按实验室—工作室—工厂推进实践" },
        { candidateId: "ce24", action: "用反例阻止“阅读数量等于成长”" },
      ],
    },
    {
      id: "incident",
      label: "处理一次线上事故",
      skillName: "系统性故障学习审查",
      samplePrompt: "支付服务本月连续三次超时，刚刚恢复，帮我复盘并制定防复发方案。",
      keywords: ["故障", "事故", "超时", "宕机", "报警", "复盘", "恢复", "线上"],
      domainSignals: ["服务", "系统", "接口", "数据库", "发布", "生产", "线上", "监控", "日志", "调用链"],
      question: "服务刚恢复，怎样避免复盘变成追责会？",
      outcome: "先建立证据账本，再审查跨层原因、表面整改与可验证的学习闭环。",
      intake: [
        "故障时间线、影响范围和用户可见症状",
        "监控、日志、调用链、变更与发布记录",
        "临时恢复动作、复现条件和历史同类事件",
      ],
      deliverables: [
        "事实、假设和未知项分离的故障时间线",
        "直接原因、促成因素与系统性根因链",
        "短期止血、中期治理、长期防复发行动项",
        "负责人、优先级、截止时间与可验证验收标准",
      ],
      qualityChecks: [
        "先恢复和控制影响，再讨论根因与责任边界",
        "禁止用惩罚个人、补一条告警或重启服务代替系统治理",
      ],
      boundary: "没有日志、监控和变更事实时，结果只能列出待验证假设，不能宣布单一根因。",
      path: [
        { candidateId: "p036", action: "先恢复服务并控制影响面" },
        { candidateId: "f06", action: "运行故障—复盘—系统整改闭环" },
        { candidateId: "case-022", action: "借九次追问穿透慢 SQL 表象" },
        { candidateId: "ce02", action: "禁止用惩罚替代系统治理" },
      ],
    },
    {
      id: "architecture",
      label: "评估架构升级",
      skillName: "架构决策评审（候选）",
      samplePrompt: "订单系统准备从单体拆成微服务并引入消息队列，这个方案值得做吗？",
      keywords: ["架构", "选型", "方案", "重构", "微服务", "数据库", "队列", "缓存", "mesh"],
      domainSignals: ["架构", "系统", "服务", "软件", "数据", "接口", "平台", "容量", "可用性", "技术"],
      question: "团队想上微服务、队列和 Service Mesh，应该怎样判断？",
      outcome: "先确认真实容量或可用性问题，再显式计算状态、故障域和运维代价。",
      intake: [
        "当前瓶颈、业务目标和可量化成功指标",
        "团队规模、交付节奏、运维能力与预算",
        "备选方案、迁移路径和不可逆约束",
      ],
      deliverables: [
        "问题—约束—目标三层决策说明",
        "候选方案的收益、复杂度、故障域和运维成本矩阵",
        "最小验证实验、停止条件与回滚路径",
        "带决策依据、复审日期和责任人的 ADR 草案",
      ],
      qualityChecks: [
        "所有收益都要同时列出引入的状态、依赖和组织成本",
        "在全量迁移前必须存在可失败的小规模验证",
      ],
      boundary: "没有真实负载、故障数据和团队能力约束时，不能只凭技术趋势批准架构升级。",
      path: [
        { candidateId: "f02", action: "从问题、历史、替代方案与生态评估技术" },
        { candidateId: "f04", action: "列出要什么、不要什么与不可逆代价" },
        { candidateId: "ce06", action: "识别“只看到分布式收益”的陷阱" },
        { candidateId: "ce19", action: "检查基础设施是否成为新的致命依赖" },
      ],
    },
    {
      id: "leadership",
      label: "带人成长与决策",
      skillName: "技术领导力诊断（候选）",
      samplePrompt: "团队成员遇到问题总等我给答案，技术水平也长期没有提升，我该怎么改变？",
      keywords: ["团队", "成员", "leader", "领导", "管理", "培养", "协作", "反馈", "成长"],
      domainSignals: ["团队", "成员", "工程师", "研发", "技术", "项目", "leader", "管理者"],
      question: "怎样不靠职位权力建立技术领导力？",
      outcome: "用解题、方案取舍、示范和反馈提高团队判断力，而不是替成员思考。",
      intake: [
        "团队目标、成员能力分布与当前责任边界",
        "最近三次等待决策或重复返工的具体事件",
        "反馈机制、授权方式和可以观察的成长信号",
      ],
      deliverables: [
        "问题发现、方案讨论、决策与复盘的责任分层",
        "针对具体成员的提问、示范、反馈和授权计划",
        "团队技术标准、共享机制与成长观察指标",
        "30 天行为实验与复盘节奏",
      ],
      qualityChecks: [
        "Leader 提供判断框架和反馈，不替成员完成全部思考",
        "成长必须通过更好的决策和交付行为观察，而不是主观印象",
      ],
      boundary: "缺少具体事件和团队目标时，不能把问题简单归因为成员能力或态度。",
      path: [
        { candidateId: "f03", action: "从发现问题到标准沉淀形成解题链" },
        { candidateId: "f35", action: "用引导、倾听、共情和反馈做教练" },
        { candidateId: "case-012", action: "观察帮助下属准备面试如何建立信任" },
        { candidateId: "ce30", action: "避免管理者给出全部答案" },
      ],
    },
  ],
  candidates,
};

await writeFile(
  resolve(demoRoot, "data", "research.json"),
  JSON.stringify(payload, null, 2) + "\n",
  "utf8",
);

console.log(
  "Generated data/research.json with " +
    payload.candidates.length +
    " candidates from " +
    sources.length +
    " extractor files.",
);
