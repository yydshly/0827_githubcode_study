import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const pilotDir = dirname(scriptDir);
const suitePath = join(pilotDir, "test-cases.json");
const outputPath = join(pilotDir, "validation.json");
const suite = JSON.parse(readFileSync(suitePath, "utf8"));

const expectedDistribution = {
  core: 8,
  insufficient: 3,
  active: 2,
  adjacent: 2,
  out: 3,
};

const allowedRoutes = new Set([
  "full_review",
  "evidence_gap",
  "active_handoff",
  "adjacent_transfer",
  "stop",
]);

const errors = [];
const ids = new Set();
const prompts = new Set();
const distribution = {};

if (suite.candidate_id !== "incident-learning-audit") {
  errors.push("candidate_id must be incident-learning-audit");
}

for (const testCase of suite.cases ?? []) {
  if (!/^([CIAXO])\d{2}$/.test(testCase.id ?? "")) {
    errors.push(`invalid id: ${testCase.id}`);
  }
  if (ids.has(testCase.id)) errors.push(`duplicate id: ${testCase.id}`);
  ids.add(testCase.id);

  if (!testCase.prompt?.trim()) errors.push(`${testCase.id}: empty prompt`);
  if (prompts.has(testCase.prompt)) errors.push(`${testCase.id}: duplicate prompt`);
  prompts.add(testCase.prompt);

  distribution[testCase.class] = (distribution[testCase.class] ?? 0) + 1;
  if (!allowedRoutes.has(testCase.expected?.route)) {
    errors.push(`${testCase.id}: unsupported route ${testCase.expected?.route}`);
  }
  if (!Array.isArray(testCase.expected?.must_include) || testCase.expected.must_include.length < 2) {
    errors.push(`${testCase.id}: must_include needs at least two invariants`);
  }
  if (!Array.isArray(testCase.expected?.must_not) || testCase.expected.must_not.length < 1) {
    errors.push(`${testCase.id}: must_not needs at least one invariant`);
  }
}

if ((suite.cases ?? []).length !== 18) errors.push("suite must contain exactly 18 pilot cases");

for (const [className, expectedCount] of Object.entries(expectedDistribution)) {
  if (distribution[className] !== expectedCount) {
    errors.push(`${className}: expected ${expectedCount}, got ${distribution[className] ?? 0}`);
  }
}

const routeCoverage = [...new Set((suite.cases ?? []).map((item) => item.expected.route))].sort();
if (routeCoverage.length !== allowedRoutes.size) {
  errors.push(`expected ${allowedRoutes.size} route states, got ${routeCoverage.length}`);
}

const result = {
  verifiedAt: new Date().toISOString(),
  status: errors.length === 0 ? "pass" : "fail",
  candidateId: suite.candidate_id,
  caseCount: suite.cases?.length ?? 0,
  distribution,
  routeCoverage,
  checks: {
    uniqueIds: ids.size === (suite.cases?.length ?? 0),
    uniquePrompts: prompts.size === (suite.cases?.length ?? 0),
    allRoutesCovered: routeCoverage.length === allowedRoutes.size,
    positiveAndNegativeInvariants: errors.every(
      (error) => !error.includes("must_include") && !error.includes("must_not"),
    ),
  },
  limitation: "This validates the frozen Stage 1.5 contract suite, not independent model behavior.",
  errors,
};

writeFileSync(outputPath, `${JSON.stringify(result, null, 2)}\n`, "utf8");
process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);

if (errors.length > 0) process.exitCode = 1;
