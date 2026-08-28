import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = dirname(fileURLToPath(import.meta.url));
const stage2Root = resolve(scriptRoot, "..");
const columnRoot = resolve(stage2Root, "..", "..");
const skillRoot = resolve(
  columnRoot,
  "books",
  "zuoer-tingfeng",
  "incident-learning-audit",
);

const skillPath = resolve(skillRoot, "SKILL.md");
const routingPath = resolve(skillRoot, "references", "evidence-and-routing.md");
const outputPath = resolve(skillRoot, "references", "output-contract.md");
const openaiPath = resolve(skillRoot, "agents", "openai.yaml");

const [skill, routing, outputContract, openai] = await Promise.all([
  readFile(skillPath, "utf8"),
  readFile(routingPath, "utf8"),
  readFile(outputPath, "utf8"),
  readFile(openaiPath, "utf8"),
]);

const requiredSections = [
  "## R — 原文",
  "## I — 方法论骨架",
  "## A1 — 书中的应用",
  "## A2 — 触发场景",
  "## E — 可执行步骤",
  "## B — 边界",
];

const requiredRoutes = [
  "full_review",
  "evidence_gap",
  "active_handoff",
  "adjacent_transfer",
  "stop",
];

const executionSteps = [...skill.matchAll(/^### ([0-7])\./gm)].map((match) => match[1]);
const quoteLine = skill
  .split(/\r?\n/)
  .find((line) => line.startsWith("> “") && !line.startsWith("> —"));
const quoteLength = quoteLine ? [...quoteLine.replace(/^> /, "")].length : 0;
const version = skill.match(/^\s*version:\s*"([^"]+)"/m)?.[1] ?? "unknown";

const checks = {
  frontmatterName: /\nname: incident-learning-audit\n/.test(`\n${skill}`),
  discriminatingDescription:
    skill.includes("postmortem、RCA、action items") &&
    skill.includes("事故仍在扩大时触发阶段门并只输出恢复交接") &&
    skill.includes("纯架构评审、代码审查"),
  sourceMarkedAsProxy:
    skill.includes('source_track: "column-proxy"') &&
    skill.includes("不把这段材料冒充纸质书原文或完整书稿"),
  riaSections:
    requiredSections.length === 6 && requiredSections.every((heading) => skill.includes(heading)),
  executionSteps:
    executionSteps.length === 8 && executionSteps.join("") === "01234567",
  allRoutes:
    requiredRoutes.every((route) => skill.includes(`\`${route}\``)) &&
    requiredRoutes.every((route) => routing.includes(`\`${route}\``)),
  progressiveReferences:
    skill.includes("references/evidence-and-routing.md") &&
    skill.includes("references/output-contract.md"),
  outputModes:
    requiredRoutes.every((route) => outputContract.includes(`\`${route}\``)),
  quoteWithinLimit: quoteLength > 0 && quoteLength <= 150,
  uiMetadata:
    openai.includes('display_name: "系统性故障学习审查"') &&
    openai.includes("$incident-learning-audit") &&
    !openai.includes("allow_implicit_invocation: false"),
  noPlaceholders: !/\[TODO:|\{\{[^}]+\}\}/.test(
    [skill, routing, outputContract, openai].join("\n"),
  ),
  stage4BoundaryDocumented:
    skill.includes("该结论只覆盖合成案例") &&
    outputContract.includes("不代替 Stage 4 的独立行为测试"),
};

const errors = Object.entries(checks)
  .filter(([, passed]) => !passed)
  .map(([name]) => name);

const result = {
  status: errors.length === 0 ? "pass" : "fail",
  generatedAt: new Date().toISOString(),
  skill: "incident-learning-audit",
  version,
  artifacts: {
    skill: "books/zuoer-tingfeng/incident-learning-audit/SKILL.md",
    references: 2,
    uiMetadata: "books/zuoer-tingfeng/incident-learning-audit/agents/openai.yaml",
  },
  riaSections: requiredSections.length,
  executionSteps: executionSteps.length,
  routes: requiredRoutes,
  quoteLength,
  checks,
  errors,
  limitation:
    "Stage 2 validation checks construction artifacts and invariants only; Stage 4 behavioral evidence is validated separately under stage4/incident-learning-audit.",
};

await writeFile(
  resolve(stage2Root, "validation.json"),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === "pass" ? 0 : 1;
