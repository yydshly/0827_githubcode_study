import { readFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const data = JSON.parse(
  await readFile(resolve(root, "PUBLIC_CASE_CLOUDFLARE_2019.json"), "utf8"),
);
const report = await readFile(
  resolve(root, "PUBLIC_CASE_CLOUDFLARE_2019.md"),
  "utf8",
);

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

ensure(data.stage === "5B", "stage must be 5B");
ensure(data.status === "pass-public-case-audit", "unexpected Stage 5B status");
ensure(data.skill === "incident-learning-audit", "wrong skill");
ensure(data.version === "0.1.1", "wrong skill version");
ensure(data.case.kind === "真实公开事故", "case must be a real public incident");
ensure(data.case.route === "full_review", "public case must route to full_review");
ensure(data.sources.length === 2, "two official sources are required");
ensure(
  data.sources.every((source) => new URL(source.url).hostname === "blog.cloudflare.com"),
  "all case sources must be official Cloudflare pages",
);

const expectedRoutes = [
  "full_review",
  "evidence_gap",
  "active_handoff",
  "adjacent_transfer",
  "stop",
];
ensure(data.routingModes.length === 5, "five routing modes are required");
ensure(
  expectedRoutes.every((route) => data.routingModes.some((item) => item.id === route)),
  "routing modes are incomplete",
);
ensure(
  data.routingModes.every((item) => item.allowed && item.forbidden),
  "every route must expose allowed and forbidden output",
);

ensure(data.preamble.mode === "full_review", "preamble mode mismatch");
ensure(data.preamble.forbiddenInferences.length >= 3, "forbidden inferences missing");
ensure(data.steps.length === 8, "full_review must have eight sections");
ensure(
  data.steps.map((step) => step.id).join(",") === "01,02,03,04,05,06,07,08",
  "full_review step order is wrong",
);

const ledger = data.steps.find((step) => step.kind === "ledger");
const ledgerTypes = new Set(ledger.entries.map((entry) => entry.type));
ensure(ledgerTypes.has("fact"), "ledger facts missing");
ensure(ledgerTypes.has("inference"), "ledger inferences missing");
ensure(ledgerTypes.has("unknown"), "ledger unknowns missing");
ensure(
  ledger.entries.filter((entry) => entry.type === "fact").every((entry) => entry.sourceId),
  "every fact must cite a source",
);

const causes = data.steps.find((step) => step.kind === "causes").causes;
ensure(causes.length >= 5, "causal ladder is too shallow");
ensure(
  causes.every((cause) => cause.level && cause.evidence && cause.strength && cause.falsifier),
  "causal claims require evidence, strength, and falsifier",
);

const antiPatterns = data.steps.find((step) => step.kind === "antipatterns").items;
ensure(antiPatterns.length === 4, "four anti-patterns are required");

const actions = data.steps.find((step) => step.kind === "actions").actions;
ensure(actions.length >= 6, "layered action set is incomplete");
ensure(
  actions.every(
    (action) =>
      action.mechanism &&
      action.owner === "待指定" &&
      action.priority &&
      action.due &&
      action.acceptance &&
      action.failure &&
      action.closure,
  ),
  "action contract fields are incomplete or invented",
);
ensure(
  actions.filter((action) => action.closure.includes("部分可关闭")).length === 1,
  "only the engine migration may be partially closed from selected sources",
);

const conclusion = data.steps.find((step) => step.kind === "conclusion");
ensure(conclusion.verdict === "尚未形成学习闭环", "conclusion mismatch");
ensure(
  data.score.dimensions.reduce((sum, dimension) => sum + dimension.score, 0) ===
    data.score.total,
  "score total mismatch",
);
ensure(data.score.total === 86, "expected evidence-backed demonstration score is 86");
ensure(data.claims.publicRealIncidentDemonstrated === true, "public incident claim missing");
ensure(data.claims.organizationExternalValidity === false, "organization validity must stay false");
ensure(data.claims.liveWebAgent === false, "web replay must not claim a live agent");
ensure(data.claims.stage5Complete === false, "full Stage 5 must remain incomplete");
ensure(data.claims.completeSkillDemonstration === true, "complete skill demonstration claim missing");

for (const heading of [
  "## 1. 事故摘要与影响",
  "## 2. 证据账本",
  "## 3. 用户影响时间线",
  "## 4. 因果阶梯",
  "## 5. 四项反模式审查",
  "## 6. 分层整改",
  "## 7. 学习闭环",
  "## 8. 结论",
]) {
  ensure(report.includes(heading), `report heading missing: ${heading}`);
}
ensure(report.includes("不是浏览器内实时 Agent"), "web replay boundary missing");

console.log(
  JSON.stringify(
    {
      status: "pass",
      stage: data.stage,
      skill: data.skill,
      version: data.version,
      case: data.case.id,
      sources: data.sources.length,
      routes: data.routingModes.length,
      outputSections: data.steps.length,
      ledgerTypes: [...ledgerTypes],
      causes: causes.length,
      actions: actions.length,
      score: data.score.total,
      conclusion: conclusion.verdict,
      organizationExternalValidity: data.claims.organizationExternalValidity,
      stage5Complete: data.claims.stage5Complete
    },
    null,
    2,
  ),
);
