import { readFile } from "node:fs/promises";
import path from "node:path";

const projectRoot = path.resolve(import.meta.dirname, "..");
const catalogPath = path.join(projectRoot, "data", "library-catalog.json");
const catalog = JSON.parse(await readFile(catalogPath, "utf8"));

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

function unique(items) {
  return new Set(items).size === items.length;
}

ensure(catalog.meta?.positioning, "library positioning is missing");
ensure(catalog.meta?.pinnedCommit?.length === 40, "pinned upstream commit must be a full SHA");
ensure(catalog.meta?.upstream === "https://github.com/kangarooking/cangjie-skill", "upstream URL changed unexpectedly");
ensure(Array.isArray(catalog.meta?.not) && catalog.meta.not.length >= 5, "non-goals are incomplete");

ensure(catalog.capabilities?.length === 6, "expected exactly six core capabilities");
ensure(unique(catalog.capabilities.map((item) => item.id)), "capability IDs must be unique");
for (const item of catalog.capabilities) {
  ensure(item.title && item.question && item.mechanism, `capability ${item.id} lacks its contract`);
  ensure(item.output && item.boundary, `capability ${item.id} lacks output or boundary`);
}

ensure(catalog.sourceTypes?.length === 8, "expected exactly eight source types");
ensure(unique(catalog.sourceTypes.map((item) => item.id)), "source type IDs must be unique");
for (const item of catalog.sourceTypes) {
  ensure(item.label && item.example && item.requirement, `source type ${item.id} is incomplete`);
}

ensure(catalog.pipeline?.length === 7, "expected exactly seven quality-gated stages");
ensure(
  JSON.stringify(catalog.pipeline.map((item) => String(item.stage))) ===
    JSON.stringify(["0", "1", "1.5", "2", "3", "4", "5"]),
  "pipeline stages must follow the upstream 0 / 1 / 1.5 / 2 / 3 / 4 / 5 sequence",
);
for (const item of catalog.pipeline) {
  ensure(item.label && item.artifact && item.gate, `pipeline stage ${item.stage} is incomplete`);
}

ensure(catalog.responsibilities?.length === 3, "expected repository / host agent / external system boundaries");
ensure(catalog.suitability?.good?.length >= 4, "good-fit criteria are incomplete");
ensure(catalog.suitability?.weak?.length >= 4, "route-elsewhere criteria are incomplete");

ensure(catalog.ecosystemPipeline?.length === 6, "expected six ecosystem value-chain layers");
ensure(
  catalog.ecosystemPipeline.every((item, index) => item.stage === String(index + 1).padStart(2, "0")),
  "ecosystem value-chain stages must run from 01 through 06",
);
for (const item of catalog.ecosystemPipeline) {
  ensure(item.title && item.goal && item.cangjieRole, `ecosystem layer ${item.stage} is incomplete`);
  ensure(Array.isArray(item.projects) && item.projects.length >= 1, `ecosystem layer ${item.stage} lacks projects`);
}

ensure(catalog.ecosystem?.length === 9, "expected nine comparable libraries and products");
ensure(unique(catalog.ecosystem.map((item) => item.id)), "ecosystem IDs must be unique");
const ecosystemCategoryCounts = Object.fromEntries(
  ["direct", "quality", "ecosystem"].map((category) => [
    category,
    catalog.ecosystem.filter((item) => item.category === category).length,
  ]),
);
ensure(ecosystemCategoryCounts.direct === 5, "expected five direct alternatives");
ensure(ecosystemCategoryCounts.quality === 2, "expected two quality/reference projects");
ensure(ecosystemCategoryCounts.ecosystem === 2, "expected two standard/distribution projects");
for (const item of catalog.ecosystem) {
  ensure(item.title && item.kind && item.source && item.strength, `ecosystem item ${item.id} lacks its capability claim`);
  ensure(item.gap && item.adoption, `ecosystem item ${item.id} lacks comparison or adoption guidance`);
  ensure(item.evidence && item.caution, `ecosystem item ${item.id} lacks evidence scope or caution`);
  const url = new URL(item.url);
  ensure(url.protocol === "https:", `ecosystem item ${item.id} must use HTTPS`);
  ensure(
    ["github.com", "agentskills.io", "skills.sh"].includes(url.hostname),
    `ecosystem item ${item.id} must link an approved official host`,
  );
}

ensure(catalog.adoptionStack?.length === 5, "expected a five-layer adoption recommendation");
for (const item of catalog.adoptionStack) {
  ensure(item.title && item.choice && item.reason && item.status, `adoption layer ${item.stage} is incomplete`);
}

ensure(catalog.cases?.length === 6, "expected five upstream cases and one controlled study");
ensure(unique(catalog.cases.map((item) => item.id)), "case IDs must be unique");
const categoryCounts = Object.fromEntries(
  ["video", "corpus", "archive", "controlled"].map((category) => [
    category,
    catalog.cases.filter((item) => item.category === category).length,
  ]),
);
ensure(categoryCounts.video === 2, "expected two video/course cases");
ensure(categoryCounts.corpus === 2, "expected two corpus/artifact cases");
ensure(categoryCounts.archive === 1, "expected one long-running archive case");
ensure(categoryCounts.controlled === 1, "expected one controlled local study");

for (const item of catalog.cases) {
  ensure(item.title && item.source && item.scale && item.proof, `case ${item.id} lacks its claim`);
  ensure(item.example && item.evidence && item.caveat, `case ${item.id} lacks evidence boundaries`);
  ensure(Array.isArray(item.sampleSkills) && item.sampleSkills.length >= 2, `case ${item.id} lacks sample skills`);
  ensure(
    item.url.startsWith("https://github.com/") || item.url === "#capability-atlas",
    `case ${item.id} has an unsupported URL`,
  );
}

console.log(
  JSON.stringify(
    {
      status: "pass",
      capabilities: catalog.capabilities.length,
      sourceTypes: catalog.sourceTypes.length,
      stages: catalog.pipeline.length,
      cases: catalog.cases.length,
      categoryCounts,
      ecosystem: catalog.ecosystem.length,
      ecosystemLayers: catalog.ecosystemPipeline.length,
      ecosystemCategoryCounts,
      adoptionLayers: catalog.adoptionStack.length,
      pinnedCommit: catalog.meta.pinnedCommit,
    },
    null,
    2,
  ),
);
