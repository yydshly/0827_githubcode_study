import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const stageDir = path.resolve(scriptDir, "..");
const gateDir = path.join(stageDir, "stage5c");
const casesDir = path.join(gateDir, "cases");

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

function requiredObject(value, label) {
  ensure(value && typeof value === "object" && !Array.isArray(value), `${label} must be an object`);
}

function requiredArray(value, label) {
  ensure(Array.isArray(value), `${label} must be an array`);
}

const template = JSON.parse(
  await readFile(path.join(gateDir, "case-template.json"), "utf8"),
);
const validation = JSON.parse(
  await readFile(path.join(gateDir, "validation.json"), "utf8"),
);
const intakeGuide = await readFile(
  path.join(gateDir, "CASE_INTAKE_TEMPLATE.md"),
  "utf8",
);
const protocol = await readFile(
  path.join(gateDir, "VALIDATION_PROTOCOL.md"),
  "utf8",
);
const reviewerTemplate = await readFile(
  path.join(gateDir, "REVIEWER_TEMPLATE.md"),
  "utf8",
);

ensure(template.schemaVersion === "1.0", "case template schemaVersion must be 1.0");
requiredObject(template.authorization, "template.authorization");
requiredObject(template.incident, "template.incident");
requiredObject(template.systemContext, "template.systemContext");
requiredArray(template.timeline, "template.timeline");
requiredArray(template.evidence, "template.evidence");
requiredArray(template.temporaryActions, "template.temporaryActions");
requiredObject(template.existingConclusions, "template.existingConclusions");
requiredObject(template.execution, "template.execution");

for (const phrase of ["授权", "脱敏", "密钥", "unknown", "最小可接入标准"]) {
  ensure(intakeGuide.includes(phrase), `intake guide is missing: ${phrase}`);
}
for (const phrase of ["独立运行", "单案例硬门", "事实可追溯率", "严重越权或编造", "Stage 5C 通过条件"]) {
  ensure(protocol.includes(phrase), `validation protocol is missing: ${phrase}`);
}
for (const phrase of ["路由正确", "事实可追溯", "有效新增发现", "行动合同", "严重越权或编造", "使用价值"]) {
  ensure(reviewerTemplate.includes(phrase), `reviewer template is missing: ${phrase}`);
}

const caseFiles = (await readdir(casesDir, { withFileTypes: true }))
  .filter((entry) => entry.isFile() && entry.name.endsWith(".json"))
  .map((entry) => entry.name)
  .sort();

let audited = 0;
let reviewed = 0;
let reviewedFullReviews = 0;
const allowedEvidenceTypes = new Set([
  "metric",
  "log",
  "trace",
  "change",
  "ticket",
  "communication",
  "other",
]);
const allowedRoutes = new Set([
  "full_review",
  "evidence_gap",
  "active_handoff",
  "adjacent_transfer",
  "stop",
]);
const secretPatterns = [
  /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/i,
  /\bAKIA[0-9A-Z]{16}\b/,
  /\b(?:password|passwd|access[_-]?token|api[_-]?key)\s*[:=]\s*[^\s"']{8,}/i,
  /\bBearer\s+[A-Za-z0-9._~+/=-]{12,}/i,
];

for (const file of caseFiles) {
  const absolute = path.join(casesDir, file);
  const raw = await readFile(absolute, "utf8");
  const item = JSON.parse(raw);
  const label = `case ${file}`;

  ensure(item.schemaVersion === "1.0", `${label}: schemaVersion must be 1.0`);
  ensure(item.caseId && item.caseId !== template.caseId, `${label}: anonymous caseId is required`);
  ensure(item.title && item.title !== template.title, `${label}: redacted title is required`);
  requiredObject(item.authorization, `${label}.authorization`);
  for (const [key, value] of Object.entries(item.authorization)) {
    ensure(value === true, `${label}: authorization.${key} must be true`);
  }
  ensure(!secretPatterns.some((pattern) => pattern.test(raw)), `${label}: possible secret detected`);

  requiredObject(item.incident, `${label}.incident`);
  ensure(item.incident.stable === true, `${label}: only stable incidents count toward full-review validity`);
  requiredObject(item.systemContext, `${label}.systemContext`);
  ensure(item.systemContext.services?.length > 0, `${label}: at least one service is required`);
  requiredArray(item.timeline, `${label}.timeline`);
  ensure(item.timeline.length >= 4, `${label}: at least four timeline nodes are required`);
  ensure(
    item.timeline.every(
      (node) => node.time && node.event && node.observation && node.action && node.result && node.evidenceRef,
    ),
    `${label}: timeline nodes require time, event, observation, action, result, and evidenceRef`,
  );

  requiredArray(item.evidence, `${label}.evidence`);
  ensure(item.evidence.length >= 1, `${label}: at least one evidence item is required`);
  const evidenceIds = new Set();
  for (const evidence of item.evidence) {
    ensure(evidence.id && !evidenceIds.has(evidence.id), `${label}: evidence IDs must be present and unique`);
    evidenceIds.add(evidence.id);
    ensure(allowedEvidenceTypes.has(evidence.type), `${label}: unsupported evidence type ${evidence.type}`);
    ensure(evidence.redactedSummary && evidence.timeRange, `${label}: evidence needs a redacted summary and time range`);
  }
  ensure(
    item.timeline.every((node) => node.evidenceRef === "unknown" || evidenceIds.has(node.evidenceRef)),
    `${label}: timeline evidenceRef must resolve or be unknown`,
  );

  requiredArray(item.temporaryActions, `${label}.temporaryActions`);
  ensure(item.temporaryActions.length >= 1, `${label}: at least one temporary action and result are required`);
  requiredObject(item.existingConclusions, `${label}.existingConclusions`);
  requiredObject(item.execution, `${label}.execution`);
  ensure(item.execution.skillVersion === "0.1.1", `${label}: skillVersion must remain 0.1.1`);

  if (item.execution.status === "audited" || item.execution.status === "reviewed") {
    audited += 1;
    ensure(allowedRoutes.has(item.execution.route), `${label}: execution route is invalid`);
    ensure(item.execution.startedAt && item.execution.completedAt, `${label}: audited cases require timing boundaries`);
    ensure(Number.isFinite(item.execution.durationMs) && item.execution.durationMs > 0, `${label}: durationMs must be positive`);
    ensure(Number.isInteger(item.execution.inputCharacters) && item.execution.inputCharacters > 0, `${label}: inputCharacters must be positive`);
    ensure(Number.isInteger(item.execution.outputCharacters) && item.execution.outputCharacters > 0, `${label}: outputCharacters must be positive`);
    ensure(item.execution.outputArtifact, `${label}: audited cases require outputArtifact`);
    const output = await readFile(path.resolve(casesDir, item.execution.outputArtifact), "utf8");
    for (const heading of ["响应模式", "适用性说明", "当前事故状态", "禁止推断"]) {
      ensure(output.includes(heading), `${label}: output is missing ${heading}`);
    }
  } else {
    ensure(item.execution.status === "not-run", `${label}: execution.status is invalid`);
  }

  if (item.execution.status === "reviewed") {
    reviewed += 1;
    if (item.execution.route === "full_review") reviewedFullReviews += 1;
    ensure(item.execution.reviewerArtifact, `${label}: reviewed cases require reviewerArtifact`);
    const review = await readFile(path.resolve(casesDir, item.execution.reviewerArtifact), "utf8");
    for (const phrase of ["路由正确", "事实可追溯", "有效新增发现", "严重越权或编造"]) {
      ensure(review.includes(phrase), `${label}: reviewer artifact is missing ${phrase}`);
    }
  }
}

ensure(validation.stage === "5C", "validation.stage must be 5C");
ensure(validation.skill === "incident-learning-audit", "validation skill mismatch");
ensure(validation.version === "0.1.1", "validation version mismatch");
ensure(validation.minimumCases === 1, "minimumCases must be 1");
ensure(validation.recommendedCases === 3, "recommendedCases must be 3");
ensure(validation.casesReceived === caseFiles.length, "casesReceived is stale");
ensure(validation.casesAudited === audited, "casesAudited is stale");
ensure(validation.casesReviewed === reviewed, "casesReviewed is stale");
if (validation.organizationExternalValidity === true) {
  ensure(validation.status === "provisional-pass", "organization validity requires provisional-pass status");
  ensure(
    reviewedFullReviews >= validation.recommendedCases,
    "organization validity requires three independently reviewed full-review cases",
  );
} else {
  ensure(validation.status !== "provisional-pass", "pending organization validity cannot use provisional-pass status");
}
ensure(validation.stage5Complete === false, "full Stage 5 must remain incomplete");
ensure(
  caseFiles.length > 0 || validation.status === "intake-ready-awaiting-authorized-cases",
  "empty intake must remain explicitly pending",
);

console.log(
  JSON.stringify(
    {
      status: "pass",
      stage: "5C-intake",
      skill: validation.skill,
      version: validation.version,
      intakeInfrastructureReady: true,
      casesReceived: caseFiles.length,
      casesAudited: audited,
      casesReviewed: reviewed,
      reviewedFullReviews,
      nextGate:
        caseFiles.length === 0
          ? "provide 1-3 authorized, redacted, stable organization incident cases"
          : "run and independently review every accepted case",
      organizationExternalValidity: validation.organizationExternalValidity,
      stage5Complete: validation.stage5Complete,
    },
    null,
    2,
  ),
);
