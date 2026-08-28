import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const scriptRoot = dirname(fileURLToPath(import.meta.url));
const stage4Root = resolve(scriptRoot, "..");
const columnRoot = resolve(stage4Root, "..", "..");
const skillRoot = resolve(columnRoot, "books", "zuoer-tingfeng", "incident-learning-audit");

const readJson = async (...parts) =>
  JSON.parse(await readFile(resolve(...parts), "utf8"));

const [skill, tests, round1, round2, round3, resultsDoc] = await Promise.all([
  readFile(resolve(skillRoot, "SKILL.md"), "utf8"),
  readJson(skillRoot, "test-prompts.json"),
  readJson(stage4Root, "round-01", "grading.json"),
  readJson(stage4Root, "round-02", "grading.json"),
  readJson(stage4Root, "round-03", "grading.json"),
  readFile(resolve(skillRoot, "test-results.md"), "utf8"),
]);

const distribution = Object.fromEntries(
  ["should_trigger", "edge_case", "should_not_trigger"].map((type) => [
    type,
    tests.test_cases.filter((testCase) => testCase.type === type).length,
  ]),
);

const checks = {
  finalVersion: tests.version === "0.1.1" && skill.includes('version: "0.1.1"'),
  darwinPackage: tests.darwin_compatible === true && tests.test_cases.length === 19,
  distribution:
    distribution.should_trigger === 8 &&
    distribution.edge_case === 5 &&
    distribution.should_not_trigger === 6,
  siblingConfusion: tests.test_cases.some(
    (testCase) =>
      testCase.id === "S01" &&
      testCase.type === "should_not_trigger" &&
      testCase.expected_behavior.includes("architecture-decision-review"),
  ),
  strictThreshold:
    tests.minimum_pass_rate === 1 &&
    tests.suite_policy.should_not_trigger_zero_tolerance === true,
  round1Recorded: round1.total === 19 && round1.passed === 16 && round1.failed === 3,
  focusedRetest: round2.total === 3 && round2.passed === 3,
  fullRegression:
    round3.total === 19 && round3.passed === 19 && round3.pass_rate === 1,
  negativePrecision:
    round3.negative_total === 6 &&
    round3.negative_passed === 6 &&
    round3.negative_false_positives === 0,
  allFinalVerdictsPass:
    round3.verdicts.length === 19 &&
    round3.verdicts.every((verdict) => verdict.verdict === "pass"),
  resultsDocumented:
    resultsDoc.includes("19 / 19") &&
    resultsDoc.includes("Negative false positives: **0**") &&
    resultsDoc.includes("remains uninstalled"),
};

const errors = Object.entries(checks)
  .filter(([, passed]) => !passed)
  .map(([name]) => name);

const result = {
  status: errors.length === 0 ? "pass" : "fail",
  generatedAt: new Date().toISOString(),
  skill: "incident-learning-audit",
  version: "0.1.1",
  suite: {
    total: tests.test_cases.length,
    distribution,
    minimumPassRate: tests.minimum_pass_rate,
    negativeFalsePositiveTolerance: 0,
  },
  rounds: [
    { id: 1, version: "0.1.0", total: round1.total, passed: round1.passed, passRate: round1.pass_rate },
    { id: 2, version: "0.1.1", total: round2.total, passed: round2.passed, passRate: round2.pass_rate },
    { id: 3, version: "0.1.1", total: round3.total, passed: round3.passed, passRate: round3.pass_rate },
  ],
  final: {
    total: round3.total,
    passed: round3.passed,
    passRate: round3.pass_rate,
    negativeTotal: round3.negative_total,
    negativeFalsePositives: round3.negative_false_positives,
    evaluators: round3.evaluators,
    decision: round3.decision,
  },
  checks,
  errors,
  limitations: [
    "Synthetic cases validate trigger, routing, safety, and action-outline behavior; they do not establish external validity on a real organization's incident material.",
    "The skill is retained in the research repository and is not installed in the host skill directory.",
  ],
};

await writeFile(
  resolve(stage4Root, "validation.json"),
  `${JSON.stringify(result, null, 2)}\n`,
  "utf8",
);

console.log(JSON.stringify(result, null, 2));
process.exitCode = result.status === "pass" ? 0 : 1;
