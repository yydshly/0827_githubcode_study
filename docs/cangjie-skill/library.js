const libraryRoot = document.querySelector("#library");
const caseGrid = document.querySelector("#library-case-grid");
const caseFilters = document.querySelector("#library-case-filters");
const caseCount = document.querySelector("#library-case-count");
const ecosystemGrid = document.querySelector("#ecosystem-grid");
const ecosystemFilters = document.querySelector("#ecosystem-filters");
const ecosystemCount = document.querySelector("#ecosystem-count");

const makeNode = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};

function renderLibrarySummary(data) {
  const summary = document.querySelector("#library-summary");
  const stats = [
    [data.sourceTypes.length, "类长内容来源", "书籍只是其中之一"],
    [data.capabilities.length, "项核心能力", "从理解、筛选到交付"],
    [data.pipeline.length, "道质量门", "每一步都保留审计轨迹"],
  ];
  const statGrid = makeNode("div", "library-stat-grid");
  for (const [value, label, note] of stats) {
    const card = makeNode("article", "library-stat-card");
    card.append(
      makeNode("strong", "", String(value).padStart(2, "0")),
      makeNode("span", "", label),
      makeNode("p", "", note),
    );
    statGrid.append(card);
  }
  const position = makeNode("div", "library-position-card");
  position.append(
    makeNode("span", "library-micro-label", "ACCURATE POSITIONING"),
    makeNode("strong", "", "元 Skill + 方法规范 + 模板集合"),
    makeNode("p", "", data.meta.positioning),
  );
  const notList = makeNode("ul", "library-not-list");
  for (const item of data.meta.not) notList.append(makeNode("li", "", item));
  position.append(notList);
  summary.replaceChildren(statGrid, position);
}

function renderCapabilities(data) {
  const container = document.querySelector("#library-capabilities");
  const fragment = document.createDocumentFragment();
  for (const item of data.capabilities) {
    const card = makeNode("article", "library-capability-card");
    card.dataset.libraryCapability = item.id;
    const top = makeNode("div", "library-capability-top");
    top.append(
      makeNode("span", "library-capability-index", item.index),
      makeNode("span", "library-micro-label", "CAPABILITY"),
    );
    const output = makeNode("p", "library-capability-output");
    output.append(makeNode("span", "", "产物"), makeNode("strong", "", item.output));
    card.append(
      top,
      makeNode("h3", "", item.title),
      makeNode("p", "library-capability-question", item.question),
      makeNode("p", "library-capability-mechanism", item.mechanism),
      output,
      makeNode("p", "library-capability-boundary", item.boundary),
    );
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}

function renderSourceTypes(data) {
  const container = document.querySelector("#library-source-types");
  const fragment = document.createDocumentFragment();
  for (const [index, item] of data.sourceTypes.entries()) {
    const card = makeNode("article", "library-source-card");
    card.dataset.sourceType = item.id;
    card.append(
      makeNode("span", "library-source-index", String(index + 1).padStart(2, "0")),
      makeNode("h4", "", item.label),
      makeNode("p", "", item.example),
      makeNode("small", "", item.requirement),
    );
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}

function renderPipeline(data) {
  const container = document.querySelector("#library-pipeline");
  const list = makeNode("ol", "library-pipeline-list");
  for (const item of data.pipeline) {
    const step = makeNode("li", "library-pipeline-step");
    step.append(
      makeNode("span", "library-pipeline-stage", `STAGE ${item.stage}`),
      makeNode("strong", "", item.label),
      makeNode("code", "", item.artifact),
      makeNode("small", "", item.gate),
    );
    list.append(step);
  }
  container.replaceChildren(list);
}

function renderResponsibilities(data) {
  const container = document.querySelector("#library-responsibilities");
  const fragment = document.createDocumentFragment();
  for (const [index, item] of data.responsibilities.entries()) {
    const card = makeNode("article", "library-responsibility-card");
    const does = makeNode("div", "library-responsibility-does");
    does.append(makeNode("span", "", "负责"), makeNode("p", "", item.does));
    const not = makeNode("div", "library-responsibility-not");
    not.append(makeNode("span", "", "不负责"), makeNode("p", "", item.not));
    card.append(
      makeNode("span", "library-source-index", String(index + 1).padStart(2, "0")),
      makeNode("h4", "", item.owner),
      does,
      not,
    );
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}

function renderSuitability(data) {
  const container = document.querySelector("#library-suitability");
  const groups = [
    ["good", "适合进入 Skill Factory", "满足越多，价值越高", data.suitability.good],
    ["weak", "换用其他工具更合适", "摘要、检索或高风险材料应分流", data.suitability.weak],
  ];
  const fragment = document.createDocumentFragment();
  for (const [type, title, note, items] of groups) {
    const card = makeNode("article", `library-suitability-card library-suitability-${type}`);
    card.append(makeNode("span", "library-micro-label", type === "good" ? "GOOD FIT" : "ROUTE ELSEWHERE"));
    card.append(makeNode("h4", "", title), makeNode("p", "", note));
    const list = makeNode("ul", "");
    for (const item of items) list.append(makeNode("li", "", item));
    card.append(list);
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}

function renderEcosystemPipeline(data) {
  const container = document.querySelector("#ecosystem-pipeline");
  const list = makeNode("ol", "ecosystem-pipeline-list");
  for (const item of data.ecosystemPipeline) {
    const step = makeNode("li", "ecosystem-pipeline-step");
    const projects = makeNode("div", "ecosystem-pipeline-projects");
    for (const project of item.projects) projects.append(makeNode("code", "", project));
    step.append(
      makeNode("span", "ecosystem-pipeline-index", item.stage),
      makeNode("h4", "", item.title),
      makeNode("p", "", item.goal),
      projects,
      makeNode("small", "", item.cangjieRole),
    );
    list.append(step);
  }
  container.replaceChildren(list);
}

function createEcosystemCard(item, index) {
  const card = makeNode("article", "ecosystem-card");
  card.dataset.ecosystemId = item.id;
  card.dataset.ecosystemCategory = item.category;
  if (item.recommended) card.dataset.recommended = "true";

  const header = makeNode("div", "ecosystem-card-header");
  header.append(
    makeNode("span", "ecosystem-card-index", String(index + 1).padStart(2, "0")),
    makeNode("span", "ecosystem-card-category", item.categoryLabel),
  );
  const relationship = makeNode("div", "ecosystem-relationship");
  relationship.append(
    makeNode("span", "", "不能替代"),
    makeNode("p", "", item.gap),
  );
  const adoption = makeNode("div", "ecosystem-adoption-note");
  adoption.append(
    makeNode("span", "", "对我们的价值"),
    makeNode("p", "", item.adoption),
  );
  const evidence = makeNode("div", "ecosystem-evidence");
  evidence.append(makeNode("span", "", "核对口径"), makeNode("strong", "", item.evidence));
  const link = makeNode("a", "ecosystem-link", "查看官方项目 ↗");
  link.href = item.url;
  link.target = "_blank";
  link.rel = "noreferrer";

  card.append(
    header,
    makeNode("h3", "", item.title),
    makeNode("p", "ecosystem-kind", item.kind),
    makeNode("p", "ecosystem-source", item.source),
    makeNode("p", "ecosystem-strength", item.strength),
    relationship,
    adoption,
    evidence,
    makeNode("p", "ecosystem-caution", item.caution),
    link,
  );
  return card;
}

function renderEcosystem(data) {
  const categories = [
    ["all", "全部项目"],
    ["direct", "直接同类"],
    ["quality", "质量与参考"],
    ["ecosystem", "标准与分发"],
  ];
  const filterFragment = document.createDocumentFragment();
  for (const [id, label] of categories) {
    const button = makeNode("button", "ecosystem-filter", label);
    button.type = "button";
    button.dataset.ecosystemFilter = id;
    button.setAttribute("aria-pressed", String(id === "all"));
    button.addEventListener("click", () => applyEcosystemFilter(id));
    filterFragment.append(button);
  }
  ecosystemFilters.replaceChildren(filterFragment);
  ecosystemGrid.replaceChildren(...data.ecosystem.map(createEcosystemCard));
  applyEcosystemFilter("all");
}

function applyEcosystemFilter(filter) {
  let visible = 0;
  for (const card of ecosystemGrid.querySelectorAll(".ecosystem-card")) {
    const matches = filter === "all" || card.dataset.ecosystemCategory === filter;
    card.hidden = !matches;
    if (matches) visible += 1;
  }
  for (const button of ecosystemFilters.querySelectorAll(".ecosystem-filter")) {
    button.setAttribute("aria-pressed", String(button.dataset.ecosystemFilter === filter));
  }
  ecosystemCount.textContent = `当前显示 ${visible} / ${ecosystemGrid.children.length} 个项目`;
}

function renderAdoptionStack(data) {
  const container = document.querySelector("#ecosystem-adoption-stack");
  const fragment = document.createDocumentFragment();
  for (const item of data.adoptionStack) {
    const card = makeNode("article", "ecosystem-adoption-step");
    card.append(
      makeNode("span", "ecosystem-pipeline-index", item.stage),
      makeNode("h4", "", item.title),
      makeNode("strong", "", item.choice),
      makeNode("p", "", item.reason),
      makeNode("small", "", item.status),
    );
    fragment.append(card);
  }
  container.replaceChildren(fragment);
}

function createCaseCard(item, index) {
  const card = makeNode("article", "library-case-card");
  card.dataset.caseId = item.id;
  card.dataset.caseCategory = item.category;
  const header = makeNode("div", "library-case-header");
  header.append(
    makeNode("span", "library-case-index", String(index + 1).padStart(2, "0")),
    makeNode("span", "library-case-category", item.categoryLabel),
  );
  const tags = makeNode("div", "library-case-skills", "");
  for (const skill of item.sampleSkills) tags.append(makeNode("code", "", skill));
  const evidence = makeNode("div", "library-case-evidence");
  evidence.append(makeNode("span", "", "证据口径"), makeNode("strong", "", item.evidence));
  const link = makeNode("a", "library-case-link", item.url.startsWith("#") ? "进入深度案例 →" : "查看公开仓库 ↗");
  link.href = item.url;
  if (!item.url.startsWith("#")) {
    link.target = "_blank";
    link.rel = "noreferrer";
  }
  card.append(
    header,
    makeNode("h3", "", item.title),
    makeNode("p", "library-case-source", item.source),
    makeNode("strong", "library-case-scale", item.scale),
    makeNode("p", "library-case-proof", item.proof),
    makeNode("blockquote", "library-case-example", item.example),
    tags,
    evidence,
    makeNode("p", "library-case-caveat", item.caveat),
    link,
  );
  return card;
}

function renderCases(data) {
  const categories = [
    ["all", "全部案例"],
    ["video", "视频与课程"],
    ["corpus", "资料与工件集"],
    ["archive", "长期文档"],
    ["controlled", "我们的验证"],
  ];
  const fragment = document.createDocumentFragment();
  for (const [id, label] of categories) {
    const button = makeNode("button", "library-case-filter", label);
    button.type = "button";
    button.dataset.caseFilter = id;
    button.setAttribute("aria-pressed", String(id === "all"));
    button.addEventListener("click", () => applyCaseFilter(id));
    fragment.append(button);
  }
  caseFilters.replaceChildren(fragment);
  caseGrid.replaceChildren(...data.cases.map(createCaseCard));
  applyCaseFilter("all");
}

function applyCaseFilter(filter) {
  let visible = 0;
  for (const card of caseGrid.querySelectorAll(".library-case-card")) {
    const matches = filter === "all" || card.dataset.caseCategory === filter;
    card.hidden = !matches;
    if (matches) visible += 1;
  }
  for (const button of caseFilters.querySelectorAll(".library-case-filter")) {
    button.setAttribute("aria-pressed", String(button.dataset.caseFilter === filter));
  }
  caseCount.textContent = `当前显示 ${visible} / ${caseGrid.children.length} 个代表案例`;
}

async function initializeLibrary() {
  const response = await fetch("./data/library-catalog.json", { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status} · library-catalog.json`);
  const data = await response.json();
  renderLibrarySummary(data);
  renderCapabilities(data);
  renderSourceTypes(data);
  renderPipeline(data);
  renderResponsibilities(data);
  renderSuitability(data);
  renderEcosystemPipeline(data);
  renderEcosystem(data);
  renderAdoptionStack(data);
  renderCases(data);
  libraryRoot.dataset.libraryStatus = "ready";
}

initializeLibrary().catch((error) => {
  const failure = makeNode("div", "data-error");
  failure.append(
    makeNode("strong", "", "库能力目录加载失败"),
    makeNode("p", "", "请检查 data/library-catalog.json 后刷新页面。"),
    makeNode("code", "", error.message),
  );
  document.querySelector("#library-summary")?.replaceChildren(failure);
  libraryRoot.dataset.libraryStatus = "error";
});
