import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const stageDir = path.resolve(scriptDir, "..");
const proxyRoot = path.resolve(stageDir, "../..");
const workspaceRoot = path.resolve(proxyRoot, "../../../../..");
const sourceDir = path.join(
  proxyRoot,
  "books",
  "zuoer-tingfeng",
  "incident-learning-audit",
);
const targetDir = path.join(
  workspaceRoot,
  ".agents",
  "skills",
  "incident-learning-audit",
);
const validationPath = path.join(stageDir, "validation.json");

const normalize = (value) => value.split(path.sep).join("/");

async function listFiles(root, current = root) {
  const entries = await readdir(current, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const absolute = path.join(current, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await listFiles(root, absolute)));
    } else if (entry.isFile()) {
      files.push(normalize(path.relative(root, absolute)));
    }
  }

  return files.sort();
}

async function sha256(filePath) {
  return createHash("sha256")
    .update(await readFile(filePath))
    .digest("hex")
    .toUpperCase();
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

const validation = JSON.parse(await readFile(validationPath, "utf8"));
const sourceFiles = await listFiles(sourceDir);
const targetFiles = await listFiles(targetDir);

assert(validation.stage === "5A", "validation.stage must be 5A");
assert(
  validation.status === "pass-with-runtime-observation",
  "unexpected Stage 5A status",
);
assert(sourceFiles.length === 6, `expected 6 source files, got ${sourceFiles.length}`);
assert(targetFiles.length === 6, `expected 6 target files, got ${targetFiles.length}`);
assert(
  JSON.stringify(sourceFiles) === JSON.stringify(targetFiles),
  "source and installed file lists differ",
);

const recorded = new Map(
  validation.installation.files.map((entry) => [entry.file, entry.sha256]),
);

for (const relative of sourceFiles) {
  const sourceHash = await sha256(path.join(sourceDir, relative));
  const targetHash = await sha256(path.join(targetDir, relative));
  assert(sourceHash === targetHash, `hash mismatch for ${relative}`);
  assert(recorded.get(relative) === sourceHash, `recorded hash is stale for ${relative}`);
}

const skill = await readFile(path.join(targetDir, "SKILL.md"), "utf8");
assert(/name:\s*incident-learning-audit/.test(skill), "installed skill name mismatch");
assert(/version:\s*"0\.1\.1"/.test(skill), "installed skill version mismatch");

assert(validation.installation.scope === "REPO", "install scope must remain REPO");
assert(validation.installation.filesMatched === 6, "filesMatched must be 6");
assert(validation.installation.filesTotal === 6, "filesTotal must be 6");
assert(validation.installation.allHashesMatch === true, "allHashesMatch must be true");

const explicit = validation.hostInvocations.find(
  (item) => item.id === "explicit-discovery",
);
const implicit = validation.hostInvocations.find(
  (item) => item.id === "implicit-incident-trigger",
);
const negative = validation.hostInvocations.find(
  (item) => item.id === "negative-architecture-boundary",
);

assert(explicit?.result === "pass", "explicit discovery did not pass");
assert(explicit?.route === "full_review", "explicit route must be full_review");
assert(implicit?.result === "pass", "implicit trigger did not pass");
assert(implicit?.selectedSkill === "incident-learning-audit", "implicit skill mismatch");
assert(negative?.result === "pass", "negative boundary did not pass");
assert(negative?.incidentLearningAuditUsed === false, "negative case false-positive");

await readFile(path.join(stageDir, validation.fullOutput.artifact), "utf8");
assert(validation.fullOutput.sections === 8, "full output must cover 8 sections");
assert(validation.stage5Complete === false, "Stage 5 must remain incomplete");
assert(validation.digestComplete === false, "DIGEST must remain incomplete");
assert(
  validation.realIncidentExternalValidity === false,
  "real incident external validity must remain false",
);
assert(
  validation.userGlobalInstallPerformed === false,
  "user/global install must remain false",
);

console.log(
  JSON.stringify(
    {
      status: "pass",
      stage: validation.stage,
      skill: validation.installation.skill,
      version: validation.installation.version,
      files: sourceFiles.length,
      hostInvocations: validation.hostInvocations.length,
      runtimeObservations: validation.runtimeObservations.length,
      stage5Complete: validation.stage5Complete,
    },
    null,
    2,
  ),
);
