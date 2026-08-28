const TYPE_LABELS = {
  framework: "框架",
  principle: "原则",
  case: "案例",
  "counter-example": "反例",
  term: "术语",
};

const TYPE_COLORS = {
  framework: "var(--framework)",
  principle: "var(--principle)",
  case: "var(--case)",
  "counter-example": "var(--counter-example)",
  term: "var(--term)",
};

const TYPE_MAX = 108;

const state = {
  data: null,
  type: "all",
  query: "",
  visible: 18,
  route: "learn",
  lastSkillRoute: null,
  lastSkillFit: null,
  dialogOpener: null,
  stage5Step: 0,
  stage5Route: "full_review",
  stage5LedgerFilter: "all",
};

const dom = {
  html: document.documentElement,
  themeToggle: document.querySelector("#theme-toggle"),
  themeLabel: document.querySelector(".theme-label"),
  thesis: document.querySelector("#hero-thesis"),
  metricRail: document.querySelector("#metric-rail"),
  pipeline: document.querySelector("#pipeline-list"),
  stage15Pilot: document.querySelector("#stage15-pilot"),
  stage2Build: document.querySelector("#stage2-build"),
  stage4Test: document.querySelector("#stage4-test"),
  stage5Install: document.querySelector("#stage5-install"),
  stage5Case: document.querySelector("#stage5b-case"),
  architecture: document.querySelector("#architecture-grid"),
  filters: document.querySelector("#type-filters"),
  search: document.querySelector("#candidate-search"),
  reset: document.querySelector("#reset-filters"),
  resultCount: document.querySelector("#result-count"),
  candidateGrid: document.querySelector("#candidate-grid"),
  emptyState: document.querySelector("#empty-state"),
  loadMore: document.querySelector("#load-more"),
  skillForm: document.querySelector("#skill-form"),
  skillProblem: document.querySelector("#skill-problem"),
  skillError: document.querySelector("#skill-error"),
  skillCharCount: document.querySelector("#skill-char-count"),
  skillOutput: document.querySelector("#skill-output"),
  examplePrompts: document.querySelector("#example-prompts"),
  routeSelector: document.querySelector("#route-selector"),
  routeResult: document.querySelector("#route-result"),
  dialog: document.querySelector("#detail-dialog"),
  dialogType: document.querySelector("#detail-type"),
  dialogTitle: document.querySelector("#detail-title"),
  dialogBody: document.querySelector("#dialog-body"),
  dialogClose: document.querySelector("#dialog-close"),
  commit: document.querySelector("#commit-id"),
  toast: document.querySelector("#toast"),
};

function create(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function typeLabel(type) {
  return TYPE_LABELS[type] || type;
}

function setTypeColor(node, type) {
  node.style.setProperty("--type-color", TYPE_COLORS[type] || "var(--accent)");
}

function setTheme(theme, persist = true) {
  dom.html.dataset.theme = theme;
  const isDark = theme === "dark";
  dom.themeToggle.setAttribute("aria-pressed", String(isDark));
  dom.themeLabel.textContent = isDark ? "浅色" : "深色";
  dom.themeToggle.setAttribute(
    "aria-label",
    isDark ? "切换到浅色主题" : "切换到深色主题",
  );
  if (persist) localStorage.setItem("cangjie-demo-theme", theme);
}

function toggleTheme() {
  setTheme(dom.html.dataset.theme === "dark" ? "light" : "dark");
}

function renderMetrics() {
  dom.metricRail.replaceChildren();
  for (const type of state.data.types) {
    const metric = create("article", "metric");
    metric.style.setProperty("--metric-color", TYPE_COLORS[type.type]);
    metric.style.setProperty("--metric-scale", String(type.count / TYPE_MAX));

    const label = create("div", "metric-label");
    label.append(
      create("span", "", type.label),
      create("span", "", Math.round((type.count / state.data.meta.candidateCount) * 100) + "%"),
    );
    metric.append(
      label,
      create("strong", "metric-value", String(type.count)),
      create("small", "metric-description", type.description),
    );
    dom.metricRail.append(metric);
  }
}

function renderPipeline() {
  dom.pipeline.replaceChildren();
  const stateLabels = {
    complete: "complete",
    pilot: "pilot",
    constructed: "built",
    validated: "validated",
    installed: "installed",
    locked: "locked",
    future: "future",
  };

  for (const step of state.data.pipeline) {
    const node = create("article", "pipeline-node");
    node.dataset.state = step.state;
    node.append(
      create("span", "pipeline-state", stateLabels[step.state]),
      create("h3", "", step.label),
      create("p", "pipeline-metric", step.metric),
      create("p", "pipeline-detail", step.detail),
    );
    dom.pipeline.append(node);
  }
}

function renderStage15Pilot() {
  const pilot = state.data.stage15Pilot;
  const shell = create("div", "pilot-shell");

  const scope = create("div", "pilot-scope");
  scope.append(
    create("span", "pilot-scope-index", "STAGE 1.5 / CONTROLLED PILOT"),
    create("strong", "", pilot.scope),
  );

  const verdicts = create("div", "pilot-verdicts");
  const original = create("article", "pilot-verdict-card pilot-original");
  original.dataset.decision = pilot.original.status;
  original.append(
    create("span", "pilot-card-kicker", "ORIGINAL CANDIDATE"),
    create("span", "pilot-decision", pilot.original.decision),
    create("h3", "", pilot.original.name),
    create("p", "", pilot.original.reason),
  );

  const arrow = create("div", "pilot-transform", "→");
  arrow.setAttribute("aria-label", "修订为");

  const revised = create("article", "pilot-verdict-card pilot-revised");
  revised.dataset.decision = pilot.revised.status;
  revised.append(
    create("span", "pilot-card-kicker", "REVISED CANDIDATE"),
    create("span", "pilot-decision", pilot.revised.decision),
    create("h3", "", pilot.revised.name),
    create("p", "", pilot.revised.reason),
    create("code", "pilot-candidate-id", pilot.revised.id),
  );
  verdicts.append(original, arrow, revised);

  const verification = create("div", "pilot-verification-grid");
  for (const item of pilot.verification) {
    const card = create("article", "pilot-verification-card");
    card.dataset.status = item.status;
    card.append(
      create("span", "pilot-verification-id", item.id + " / " + item.label),
      create("strong", "", item.result),
      create("p", "", item.detail),
    );
    verification.append(card);
  }

  const tests = create("section", "pilot-tests");
  const testHeading = create("div", "pilot-test-heading");
  testHeading.append(
    create("span", "pilot-card-kicker", "FROZEN CONTRACT SUITE"),
    create("strong", "pilot-test-total", String(pilot.tests.total) + " 个案例"),
    create("p", "", "覆盖完整执行、证据不足、活动事故、方法迁移与停止路由。"),
  );
  const distribution = create("div", "pilot-test-grid");
  for (const item of pilot.tests.distribution) {
    const stat = create("article", "pilot-test-stat");
    stat.dataset.testClass = item.id;
    stat.append(create("strong", "", String(item.count)), create("span", "", item.label));
    distribution.append(stat);
  }
  tests.append(testHeading, distribution);

  const gate = create("footer", "pilot-next-gate");
  gate.append(
    create("span", "pilot-card-kicker", "USER CONFIRMATION / PASSED"),
    create("strong", "", pilot.nextGate),
    create("p", "", "修订方向已经确认；后续已完成正式构造、合成盲测和 Stage 5A 项目级安装。"),
  );

  shell.append(scope, verdicts, verification, tests, gate);
  dom.stage15Pilot.replaceChildren(shell);
}

function renderStage2Build() {
  const build = state.data.stage2Build;
  const shell = create("div", "stage2-shell");

  const identity = create("header", "stage2-identity");
  identity.dataset.skillStatus = build.skill.status;
  const identityCopy = create("div", "stage2-identity-copy");
  identityCopy.append(
    create("span", "stage2-kicker", "FORMAL BUILD / HOST EVIDENCE IN STAGE 5A"),
    create("h3", "", build.skill.name),
    create("code", "stage2-skill-id", `$${build.skill.id}`),
    create("p", "", build.skill.purpose),
  );
  const identityStatus = create("div", "stage2-status");
  identityStatus.append(
    create("span", "stage2-status-label", build.skill.statusLabel),
    create("strong", "", `v${build.skill.version}`),
    create("p", "", build.skill.discovery),
  );
  identity.append(identityCopy, identityStatus);

  const anatomy = create("section", "stage2-anatomy");
  const anatomyHeading = create("div", "stage2-subheading");
  anatomyHeading.append(
    create("span", "stage2-kicker", "RIA++ / SIX PARTS"),
    create("strong", "", `${build.ria.length} 个构造单元`),
  );
  const anatomyGrid = create("div", "stage2-ria-grid");
  for (const item of build.ria) {
    const card = create("article", "stage2-ria-card");
    card.dataset.ria = item.id;
    card.append(
      create("span", "stage2-ria-id", item.id),
      create("strong", "", item.label),
      create("p", "", item.detail),
    );
    anatomyGrid.append(card);
  }
  anatomy.append(anatomyHeading, anatomyGrid);

  const routes = create("section", "stage2-routes");
  const routeHeading = create("div", "stage2-subheading");
  routeHeading.append(
    create("span", "stage2-kicker", "RUNTIME ROUTING"),
    create("strong", "", `${build.routes.length} 种响应模式`),
  );
  const routeGrid = create("div", "stage2-route-grid");
  for (const item of build.routes) {
    const route = create("article", "stage2-route");
    route.dataset.route = item.id;
    route.append(
      create("code", "", item.id),
      create("strong", "", item.label),
      create("p", "", item.detail),
    );
    routeGrid.append(route);
  }
  routes.append(routeHeading, routeGrid);

  const artifacts = create("section", "stage2-artifacts");
  const artifactHeading = create("div", "stage2-subheading");
  artifactHeading.append(
    create("span", "stage2-kicker", "PROGRESSIVE DISCLOSURE"),
    create("strong", "", "入口保持短，细节按需读取"),
  );
  const artifactGrid = create("div", "stage2-artifact-grid");
  for (const item of build.artifacts) {
    const artifact = create("article", "stage2-artifact");
    artifact.dataset.resourceRole = item.role;
    artifact.append(
      create("span", "stage2-artifact-role", item.role),
      create("code", "", item.name),
      create("p", "", item.detail),
    );
    artifactGrid.append(artifact);
  }
  artifacts.append(artifactHeading, artifactGrid);

  const gate = create("footer", "stage2-next-gate");
  const checkCount = create("div", "stage2-check-count");
  checkCount.append(
    create("span", "stage2-kicker", "CONSTRUCTION VALIDATION"),
    create("strong", "", `${build.validation.checks} / ${build.validation.checks}`),
    create("small", "", `短引文 ${build.validation.quoteLength} 字`),
  );
  const gateCopy = create("div", "stage2-gate-copy");
  gateCopy.append(
    create("span", "stage2-kicker", "CONSTRUCTION / BEHAVIOR SEPARATION"),
    create("strong", "", build.nextGate),
    create("p", "", "Stage 2 只证明文件结构和不变量成立；Stage 4 验证合成触发、路由与边界；Stage 5A 再证明项目级安装和宿主发现。"),
  );
  gate.append(checkCount, gateCopy);

  shell.append(identity, anatomy, routes, artifacts, gate);
  dom.stage2Build.replaceChildren(shell);
}

function renderStage4Test() {
  const test = state.data.stage4Test;
  const shell = create("div", "stage4-shell");

  const identity = create("header", "stage4-identity");
  identity.dataset.pressureStatus = test.status;
  const identityCopy = create("div", "stage4-identity-copy");
  identityCopy.append(
    create("span", "stage4-kicker", "BLIND BEHAVIOR EVIDENCE / SYNTHETIC"),
    create("h3", "", `${test.final.passed} / ${test.final.total}`),
    create("p", "", "最终全量回归通过。关键不是第一次得分，而是三处失败都能追溯到明确的触发与路由修订。"),
  );
  const identityStatus = create("div", "stage4-status");
  identityStatus.append(
    create("span", "stage4-status-label", test.statusLabel),
    create("strong", "", `v${test.version}`),
    create("p", "", `${test.final.evaluators} 位全新评测 Agent · ${test.final.negativeTotal} 个负例 · ${test.final.negativeFalsePositives} 误触发`),
  );
  identity.append(identityCopy, identityStatus);

  const rounds = create("section", "stage4-rounds");
  const roundHeading = create("div", "stage4-subheading");
  roundHeading.append(
    create("span", "stage4-kicker", "THREE-RUN LEARNING LOOP"),
    create("strong", "", "失败不是被隐藏，而是成为修订证据"),
  );
  const roundGrid = create("div", "stage4-round-grid");
  for (const item of test.rounds) {
    const card = create("article", "stage4-round-card");
    card.dataset.roundStatus = item.status;
    card.append(
      create("span", "stage4-round-id", item.id),
      create("span", "stage4-round-version", `v${item.version}`),
      create("h4", "", item.label),
      create("strong", "stage4-round-result", item.result),
      create("p", "", item.detail),
    );
    roundGrid.append(card);
  }
  rounds.append(roundHeading, roundGrid);

  const repairs = create("section", "stage4-repairs");
  const repairHeading = create("div", "stage4-subheading");
  repairHeading.append(
    create("span", "stage4-kicker", "FAILURE → REVISION"),
    create("strong", "", `${test.repairs.length} 个观察到的失败，${test.repairs.length} 个定向修订`),
  );
  const repairGrid = create("div", "stage4-repair-grid");
  for (const item of test.repairs) {
    const card = create("article", "stage4-repair-card");
    card.append(
      create("span", "stage4-case-id", item.caseId),
      create("h4", "", item.title),
    );
    const before = create("div", "stage4-change stage4-before");
    before.append(create("span", "", "BEFORE"), create("p", "", item.before));
    const after = create("div", "stage4-change stage4-after");
    after.append(create("span", "", "AFTER"), create("p", "", item.after));
    card.append(before, after);
    repairGrid.append(card);
  }
  repairs.append(repairHeading, repairGrid);

  const matrix = create("section", "stage4-matrix");
  const matrixHeading = create("div", "stage4-subheading");
  matrixHeading.append(
    create("span", "stage4-kicker", "FINAL CONTRACT COVERAGE"),
    create("strong", "", "触发准确性和负例安全同时成立"),
  );
  const matrixGrid = create("div", "stage4-matrix-grid");
  for (const item of test.matrix) {
    const card = create("article", "stage4-matrix-card");
    card.dataset.testClass = item.id;
    card.append(
      create("span", "", item.label),
      create("strong", "", item.result),
      create("p", "", item.detail),
    );
    matrixGrid.append(card);
  }
  matrix.append(matrixHeading, matrixGrid);

  const protocol = create("footer", "stage4-protocol");
  const protocolCopy = create("div", "stage4-protocol-copy");
  protocolCopy.append(
    create("span", "stage4-kicker", "WHAT MADE IT BLIND"),
    create("h4", "", test.scope),
  );
  const protocolList = create("ol", "stage4-protocol-list");
  for (const item of test.protocol) protocolList.append(create("li", "", item));
  protocolCopy.append(protocolList);
  const boundary = create("aside", "stage4-boundary");
  boundary.append(
    create("span", "stage4-kicker", "HONEST LIMIT"),
    create("strong", "", "通过合成合同，不等于通过真实世界"),
    create("p", "", test.boundary),
  );
  protocol.append(protocolCopy, boundary);

  shell.append(identity, rounds, repairs, matrix, protocol);
  dom.stage4Test.replaceChildren(shell);
}

function renderStage5Install() {
  const install = state.data.stage5Install;
  const shell = create("div", "stage5-shell");

  const identity = create("header", "stage5-identity");
  identity.dataset.installStatus = install.status;
  const identityCopy = create("div", "stage5-identity-copy");
  identityCopy.append(
    create("span", "stage5-kicker", "REPO SCOPE / REAL HOST DISCOVERY"),
    create("h3", "", install.statusLabel),
    create("p", "", install.scope),
    create("code", "stage5-install-path", install.installPath),
  );
  const integrity = create("div", "stage5-integrity");
  integrity.append(
    create("span", "stage5-integrity-label", install.integrity.algorithm),
    create(
      "strong",
      "",
      `${install.integrity.matched} / ${install.integrity.total}`,
    ),
    create("p", "", install.integrity.detail),
  );
  identity.append(identityCopy, integrity);

  const calls = create("section", "stage5-calls");
  const callsHeading = create("div", "stage5-subheading");
  callsHeading.append(
    create("span", "stage5-kicker", "FRESH CODEX / READ-ONLY / EPHEMERAL"),
    create("strong", "", `${install.calls.length} 个宿主场景全部符合合同`),
  );
  const callGrid = create("div", "stage5-call-grid");
  for (const item of install.calls) {
    const card = create("article", "stage5-call-card");
    card.dataset.hostCall = item.id;
    card.append(
      create("span", "stage5-call-kicker", item.kicker),
      create("span", "stage5-call-result", item.result),
      create("h4", "", item.label),
      create("code", "", item.route),
      create("p", "", item.detail),
    );
    callGrid.append(card);
  }
  calls.append(callsHeading, callGrid);

  const usage = create("section", "stage5-usage");
  const usageHeading = create("div", "stage5-subheading");
  usageHeading.append(
    create("span", "stage5-kicker", "HOW TO CALL"),
    create("strong", "", "一句话决定显式、隐式或活动事故交接"),
  );
  const usageGrid = create("div", "stage5-usage-grid");
  const usageItems = [
    ["显式审查", install.usage.explicit],
    ["语义触发", install.usage.implicit],
    ["活动事故", install.usage.active],
  ];
  for (const [label, prompt] of usageItems) {
    const item = create("article", "stage5-usage-card");
    item.append(create("strong", "", label), create("code", "", prompt));
    usageGrid.append(item);
  }
  usage.append(usageHeading, usageGrid);

  const output = create("section", "stage5-output");
  const outputLead = create("div", "stage5-output-lead");
  outputLead.append(
    create("span", "stage5-kicker", "CONTRACT-FAITHFUL FULL REVIEW"),
    create("h4", "", install.sample.title),
    create("p", "", install.sample.impact),
    create("span", "stage5-route-chip", install.sample.route),
    create("strong", "stage5-output-conclusion", install.sample.conclusion),
  );
  const details = create("details", "stage5-output-details");
  details.id = "stage5-output-details";
  const summary = create("summary", "stage5-output-summary", "查看完整 8 节交付结构");
  summary.id = "stage5-output-summary";
  const stepList = create("ol", "stage5-output-steps");
  for (const item of install.sample.steps) {
    const step = create("li", "stage5-output-step");
    step.append(
      create("span", "stage5-output-index", item.id),
      create("strong", "", item.title),
      create("p", "", item.detail),
    );
    stepList.append(step);
  }
  details.append(summary, stepList);
  output.append(outputLead, details);

  const runtime = create("aside", "stage5-runtime");
  runtime.append(
    create("span", "stage5-kicker", "PERFORMANCE OBSERVATION"),
    create("strong", "", install.runtime.label),
    create("p", "", install.runtime.detail),
    create("p", "stage5-runtime-next", install.runtime.next),
  );

  const gate = create("footer", "stage5-next-gate");
  const boundary = create("div", "stage5-boundary");
  boundary.append(
    create("span", "stage5-kicker", "HONEST LIMIT"),
    create("p", "", install.boundary),
  );
  const next = create("div", "stage5-next");
  next.append(
    create("span", "stage5-kicker", "NEXT QUALITY GATE"),
    create("strong", "", install.nextGate),
  );
  gate.append(boundary, next);

  shell.append(identity, calls, usage, output, runtime, gate);
  dom.stage5Install.replaceChildren(shell);
}

function stage5SourceLink(sourceId, label = "官方来源") {
  const source = state.data.stage5PublicCase.sources.find((item) => item.id === sourceId);
  if (!source) return null;
  const link = create("a", "stage5b-source-link", label);
  link.href = source.url;
  link.target = "_blank";
  link.rel = "noreferrer noopener";
  link.title = `${source.label} · ${source.published}`;
  return link;
}

function selectStage5Route(routeId, focusPanel = false) {
  const audit = state.data.stage5PublicCase;
  const selected = audit.routingModes.find((item) => item.id === routeId);
  if (!selected) return;
  state.stage5Route = routeId;
  const buttons = [...dom.stage5Case.querySelectorAll(".stage5b-mode-button")];
  for (const button of buttons) {
    const active = button.dataset.mode === routeId;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  }
  const panel = dom.stage5Case.querySelector("#stage5b-mode-panel");
  panel.dataset.mode = selected.id;
  panel.replaceChildren();
  const heading = create("div", "stage5b-mode-result-heading");
  heading.append(
    create("span", "stage5b-contract-chip", selected.id),
    create("strong", "", selected.decision),
  );
  const scenario = create("p", "stage5b-mode-scenario", selected.scenario);
  const guardrails = create("div", "stage5b-mode-guardrails");
  const allowed = create("article", "stage5b-allowed");
  allowed.append(create("span", "", "允许输出"), create("p", "", selected.allowed));
  const forbidden = create("article", "stage5b-forbidden");
  forbidden.append(create("span", "", "禁止输出"), create("p", "", selected.forbidden));
  guardrails.append(allowed, forbidden);
  panel.append(heading, scenario, guardrails);
  if (focusPanel) panel.focus();
}

function renderStage5StepPanel(focusPanel = false) {
  const audit = state.data.stage5PublicCase;
  const step = audit.steps[state.stage5Step];
  const panel = dom.stage5Case.querySelector("#stage5b-step-panel");
  const progress = dom.stage5Case.querySelector("#stage5b-progress");
  const progressText = dom.stage5Case.querySelector("#stage5b-progress-text");
  progress.value = state.stage5Step + 1;
  progressText.textContent = `${step.id} / 08`;

  for (const button of dom.stage5Case.querySelectorAll(".stage5b-step-button")) {
    const active = Number(button.dataset.stepIndex) === state.stage5Step;
    button.setAttribute("aria-selected", String(active));
    button.tabIndex = active ? 0 : -1;
  }

  panel.replaceChildren();
  panel.dataset.stepKind = step.kind;
  const lead = create("header", "stage5b-step-lead");
  lead.append(
    create("span", "stage5b-step-number", `OUTPUT ${step.id} / 08`),
    create("h4", "", step.title),
    create("p", "", step.lead),
  );
  panel.append(lead);

  if (step.kind === "summary") {
    const grid = create("dl", "stage5b-summary-grid");
    for (const item of step.items) {
      const card = create("div", "stage5b-summary-item");
      card.append(create("dt", "", item.label), create("dd", "", item.value));
      const source = stage5SourceLink(item.sourceId);
      if (source) card.append(source);
      grid.append(card);
    }
    panel.append(grid);
  }

  if (step.kind === "ledger") {
    const filters = create("div", "stage5b-ledger-filters");
    const filterLabels = { all: "全部", fact: "事实", inference: "推断", unknown: "未知" };
    for (const [id, label] of Object.entries(filterLabels)) {
      const count = id === "all"
        ? step.entries.length
        : step.entries.filter((entry) => entry.type === id).length;
      const button = create("button", "stage5b-ledger-filter", `${label} ${count}`);
      button.type = "button";
      button.dataset.ledgerFilter = id;
      button.setAttribute("aria-pressed", String(state.stage5LedgerFilter === id));
      button.addEventListener("click", () => {
        state.stage5LedgerFilter = id;
        renderStage5StepPanel();
        dom.stage5Case.querySelector(`[data-ledger-filter="${id}"]`)?.focus();
      });
      filters.append(button);
    }
    const entries = create("div", "stage5b-ledger");
    const visibleEntries = step.entries.filter(
      (entry) => state.stage5LedgerFilter === "all" || entry.type === state.stage5LedgerFilter,
    );
    for (const entry of visibleEntries) {
      const card = create("article", "stage5b-ledger-entry");
      card.dataset.evidenceType = entry.type;
      const meta = create("div", "stage5b-entry-meta");
      meta.append(
        create("span", "stage5b-entry-type", entry.type),
        create("code", "", entry.id),
        create("span", "", `强度 ${entry.strength}`),
      );
      card.append(meta, create("strong", "", entry.statement), create("p", "", entry.next));
      const source = stage5SourceLink(entry.sourceId);
      if (source) card.append(source);
      entries.append(card);
    }
    panel.append(filters, entries);
  }

  if (step.kind === "timeline") {
    const timeline = create("ol", "stage5b-timeline");
    for (const event of step.events) {
      const item = create("li", "stage5b-timeline-event");
      const time = create("time", "", event.time);
      const copy = create("div", "");
      copy.append(
        create("strong", "", event.event),
        create("p", "", `观察：${event.observation}`),
        create("p", "", `动作：${event.action} → ${event.result}`),
      );
      const source = stage5SourceLink(event.sourceId);
      if (source) copy.append(source);
      item.append(time, copy);
      timeline.append(item);
    }
    panel.append(timeline);
  }

  if (step.kind === "causes") {
    const ladder = create("div", "stage5b-cause-ladder");
    for (const cause of step.causes) {
      const item = create("article", "stage5b-cause");
      item.append(
        create("span", "stage5b-cause-level", cause.level),
        create("strong", "", cause.candidate),
        create("p", "", `支持证据：${cause.evidence}`),
        create("p", "", `证据强度：${cause.strength}`),
        create("p", "stage5b-falsifier", `证伪：${cause.falsifier}`),
      );
      ladder.append(item);
    }
    panel.append(ladder);
  }

  if (step.kind === "antipatterns") {
    const grid = create("div", "stage5b-antipattern-grid");
    for (const item of step.items) {
      const card = create("article", "stage5b-antipattern");
      card.dataset.status = item.status;
      card.append(
        create("span", "stage5b-antipattern-status", item.status),
        create("h5", "", item.name),
        create("p", "", item.basis),
        create("strong", "", `重写：${item.rewrite}`),
      );
      grid.append(card);
    }
    panel.append(grid);
  }

  if (step.kind === "actions") {
    const list = create("div", "stage5b-action-list");
    for (const [index, action] of step.actions.entries()) {
      const details = create("details", "stage5b-action");
      details.dataset.actionId = action.id;
      if (index === 0) details.open = true;
      const summary = create("summary", "stage5b-action-summary");
      summary.append(
        create("code", "", action.id),
        create("strong", "", action.action),
        create("span", "stage5b-action-closure", action.closure),
      );
      const fields = create("dl", "stage5b-action-fields");
      for (const [label, value] of [
        ["改变机制", action.mechanism],
        ["负责人", action.owner],
        ["优先级", action.priority],
        ["截止", action.due],
        ["验收证据", action.acceptance],
        ["失败条件", action.failure],
        ["公开证据", action.publicEvidence],
      ]) {
        const row = create("div", "");
        row.append(create("dt", "", label), create("dd", "", value));
        fields.append(row);
      }
      details.append(summary, fields);
      list.append(details);
    }
    panel.append(list);
  }

  if (step.kind === "closure") {
    const closure = create("div", "stage5b-closure");
    const questions = create("article", "stage5b-closure-card");
    questions.append(create("span", "stage5b-contract-chip", "OPEN QUESTIONS"));
    const questionList = create("ul", "");
    for (const item of step.unknownQuestions) questionList.append(create("li", "", item));
    questions.append(questionList);
    const test = create("article", "stage5b-closure-card");
    test.append(
      create("span", "stage5b-contract-chip", "RECURRENCE TEST"),
      create("strong", "", step.reviewDate),
      create("p", "", step.recurrenceTest),
      create("p", "stage5b-expected", `预期变化：${step.expectedChange}`),
    );
    const stateCard = create("article", "stage5b-closure-card stage5b-closure-state");
    const closable = create("div", "");
    closable.append(create("strong", "", "可部分关闭"));
    for (const item of step.closable) closable.append(create("p", "", item));
    const open = create("div", "");
    open.append(create("strong", "", "仍不可关闭"));
    for (const item of step.notClosable) open.append(create("p", "", item));
    stateCard.append(closable, open);
    closure.append(questions, test, stateCard);
    panel.append(closure);
  }

  if (step.kind === "conclusion") {
    const result = create("div", "stage5b-conclusion");
    const verdict = create("article", "stage5b-verdict");
    verdict.append(
      create("span", "stage5b-contract-chip", "VERDICT"),
      create("h5", "", step.verdict),
      create("p", "", step.reason),
      create("strong", "", `最关键下一步：${step.next}`),
    );
    const score = create("article", "stage5b-score-detail");
    score.append(
      create("span", "stage5b-contract-chip", "OPTIONAL SCORE / EVIDENCE-BASED"),
      create("strong", "stage5b-score-total", `${audit.score.total} / 100`),
    );
    for (const dimension of audit.score.dimensions) {
      const row = create("div", "stage5b-score-row");
      const label = create("div", "");
      label.append(create("span", "", dimension.name), create("strong", "", `${dimension.score} / ${dimension.max}`));
      const meter = create("progress", "");
      meter.max = dimension.max;
      meter.value = dimension.score;
      meter.setAttribute("aria-label", dimension.name);
      row.append(label, meter, create("p", "", dimension.evidence));
      score.append(row);
    }
    score.append(create("p", "stage5b-score-note", audit.score.note));
    result.append(verdict, score);
    panel.append(result);
  }

  const previous = dom.stage5Case.querySelector("#stage5b-previous");
  const next = dom.stage5Case.querySelector("#stage5b-next");
  previous.disabled = state.stage5Step === 0;
  next.disabled = state.stage5Step === audit.steps.length - 1;
  next.textContent = state.stage5Step === audit.steps.length - 1 ? "已到结论" : "下一步 →";
  if (focusPanel) panel.focus();
}

function selectStage5Step(index, focusPanel = false) {
  const max = state.data.stage5PublicCase.steps.length - 1;
  state.stage5Step = Math.max(0, Math.min(max, index));
  state.stage5LedgerFilter = "all";
  renderStage5StepPanel(focusPanel);
}

function renderStage5PublicCase() {
  const audit = state.data.stage5PublicCase;
  const shell = create("div", "stage5b-shell");
  shell.dataset.publicCaseStatus = audit.status;

  const identity = create("header", "stage5b-identity");
  const copy = create("div", "stage5b-identity-copy");
  copy.append(
    create("span", "stage5b-kicker", `${audit.case.kind} / STAGE 5B`),
    create("h3", "", audit.case.title),
    create("p", "", audit.case.impact),
  );
  const sourceRow = create("div", "stage5b-sources");
  for (const source of audit.sources) {
    const link = stage5SourceLink(source.id, source.label);
    link.append(create("span", "", ` ↗ ${source.published}`));
    sourceRow.append(link);
  }
  copy.append(sourceRow);
  const score = create("aside", "stage5b-score");
  score.append(
    create("span", "stage5b-kicker", "POSTMORTEM QUALITY"),
    create("strong", "", String(audit.score.total)),
    create("span", "", "/ 100"),
    create("p", "", audit.score.note),
  );
  identity.append(copy, score);

  const comparison = create("section", "stage5b-comparison");
  const shallow = create("article", "stage5b-comparison-shallow");
  shallow.append(
    create("span", "stage5b-kicker", "停在直接触发"),
    create("strong", "", audit.comparison.shallow),
  );
  const system = create("article", "stage5b-comparison-system");
  system.append(
    create("span", "stage5b-kicker", "Skill 推进到系统条件"),
    create("strong", "", audit.comparison.system),
    create("p", "", audit.comparison.value),
  );
  comparison.append(shallow, system);

  const modes = create("section", "stage5b-modes");
  const modeHeading = create("div", "stage5b-section-heading");
  modeHeading.append(
    create("span", "stage5b-kicker", "STEP 0 / ROUTING GATE"),
    create("h4", "", "同一个 Skill，五种响应模式"),
    create("p", "", "用方向键切换。模式决定允许输出什么，也决定必须停止什么。"),
  );
  const modeTabs = create("div", "stage5b-mode-tabs");
  modeTabs.setAttribute("role", "tablist");
  modeTabs.setAttribute("aria-label", "选择事故审计响应模式");
  for (const mode of audit.routingModes) {
    const button = create("button", "stage5b-mode-button", mode.label);
    button.type = "button";
    button.id = `stage5b-mode-${mode.id}`;
    button.dataset.mode = mode.id;
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "stage5b-mode-panel");
    modeTabs.append(button);
  }
  const modePanel = create("div", "stage5b-mode-panel");
  modePanel.id = "stage5b-mode-panel";
  modePanel.setAttribute("role", "tabpanel");
  modePanel.tabIndex = -1;
  modes.append(modeHeading, modeTabs, modePanel);

  const preamble = create("section", "stage5b-preamble");
  const preambleItems = [
    ["响应模式", audit.preamble.mode],
    ["适用性", audit.preamble.applicability],
    ["当前状态", audit.preamble.currentState],
    ["禁止推断", audit.preamble.forbiddenInferences.join("；")],
  ];
  for (const [label, value] of preambleItems) {
    const item = create("article", "stage5b-preamble-item");
    item.append(create("span", "", label), create("p", "", value));
    preamble.append(item);
  }

  const workbench = create("section", "stage5b-workbench");
  const workbenchHeading = create("div", "stage5b-workbench-heading");
  const headingCopy = create("div", "");
  headingCopy.append(
    create("span", "stage5b-kicker", "FULL_REVIEW / OUTPUT CONTRACT"),
    create("h4", "", "八段完整审计"),
  );
  const progressWrap = create("div", "stage5b-progress-wrap");
  const progressText = create("span", "", "01 / 08");
  progressText.id = "stage5b-progress-text";
  const progress = create("progress", "");
  progress.id = "stage5b-progress";
  progress.max = audit.steps.length;
  progress.value = 1;
  progressWrap.append(progressText, progress);
  workbenchHeading.append(headingCopy, progressWrap);

  const workbenchGrid = create("div", "stage5b-workbench-grid");
  const stepRail = create("div", "stage5b-step-rail");
  stepRail.setAttribute("role", "tablist");
  stepRail.setAttribute("aria-label", "选择完整审查输出章节");
  for (const [index, step] of audit.steps.entries()) {
    const button = create("button", "stage5b-step-button");
    button.type = "button";
    button.id = `stage5b-step-${step.id}`;
    button.dataset.stepIndex = String(index);
    button.setAttribute("role", "tab");
    button.setAttribute("aria-controls", "stage5b-step-panel");
    button.append(create("span", "", step.id), create("strong", "", step.title));
    stepRail.append(button);
  }
  const stepPanel = create("div", "stage5b-step-panel");
  stepPanel.id = "stage5b-step-panel";
  stepPanel.setAttribute("role", "tabpanel");
  stepPanel.tabIndex = -1;
  workbenchGrid.append(stepRail, stepPanel);

  const controls = create("div", "stage5b-controls");
  const previous = create("button", "button button-secondary", "← 上一步");
  previous.type = "button";
  previous.id = "stage5b-previous";
  const next = create("button", "button button-primary", "下一步 →");
  next.type = "button";
  next.id = "stage5b-next";
  controls.append(previous, next);
  workbench.append(workbenchHeading, workbenchGrid, controls);

  const boundary = create("footer", "stage5b-boundary");
  boundary.append(
    create("strong", "", "完整演示完成 ≠ 完整 Stage 5"),
    create("p", "", audit.case.scopeBoundary),
    create("p", "", "网页是本次 Skill 审计的确定性回放，不是浏览器内实时 Agent；用户组织脱敏材料与多 Skill DIGEST 仍是下一门。"),
  );

  shell.append(identity, comparison, modes, preamble, workbench, boundary);
  dom.stage5Case.replaceChildren(shell);

  const modeButtons = [...dom.stage5Case.querySelectorAll(".stage5b-mode-button")];
  for (const [index, button] of modeButtons.entries()) {
    button.addEventListener("click", () => selectStage5Route(button.dataset.mode));
    button.addEventListener("keydown", (event) => {
      let targetIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = (index + 1) % modeButtons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = (index - 1 + modeButtons.length) % modeButtons.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = modeButtons.length - 1;
      if (targetIndex === null) return;
      event.preventDefault();
      modeButtons[targetIndex].focus();
      selectStage5Route(modeButtons[targetIndex].dataset.mode);
    });
  }

  const stepButtons = [...dom.stage5Case.querySelectorAll(".stage5b-step-button")];
  for (const [index, button] of stepButtons.entries()) {
    button.addEventListener("click", () => selectStage5Step(index));
    button.addEventListener("keydown", (event) => {
      let targetIndex = null;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") targetIndex = (index + 1) % stepButtons.length;
      if (event.key === "ArrowLeft" || event.key === "ArrowUp") targetIndex = (index - 1 + stepButtons.length) % stepButtons.length;
      if (event.key === "Home") targetIndex = 0;
      if (event.key === "End") targetIndex = stepButtons.length - 1;
      if (targetIndex === null) return;
      event.preventDefault();
      stepButtons[targetIndex].focus();
      selectStage5Step(targetIndex);
    });
  }
  previous.addEventListener("click", () => selectStage5Step(state.stage5Step - 1, true));
  next.addEventListener("click", () => selectStage5Step(state.stage5Step + 1, true));

  selectStage5Route(state.stage5Route);
  selectStage5Step(state.stage5Step);
}

function renderArchitecture() {
  dom.architecture.replaceChildren();
  for (const layer of state.data.architecture) {
    const card = create("article", "architecture-card");
    card.append(
      create("span", "architecture-index", layer.index),
      create("h3", "", layer.title),
      create("p", "", layer.copy),
      renderTags(layer.tags),
    );
    dom.architecture.append(card);
  }
}

function renderTags(tags = []) {
  const list = create("ul", "tag-list");
  for (const tag of tags) {
    const item = create("li", "tag", tag);
    list.append(item);
  }
  return list;
}

function renderFilters() {
  dom.filters.replaceChildren();
  const entries = [
    {
      type: "all",
      label: "全部",
      count: state.data.meta.candidateCount,
    },
    ...state.data.types,
  ];

  for (const entry of entries) {
    const button = create("button", "filter-button");
    button.type = "button";
    button.dataset.type = entry.type;
    button.setAttribute("aria-pressed", String(state.type === entry.type));
    button.append(
      create("span", "", entry.label),
      create("span", "filter-count", String(entry.count)),
    );
    button.addEventListener("click", () => {
      state.type = entry.type;
      state.visible = 18;
      renderFilters();
      renderCandidates();
    });
    dom.filters.append(button);
  }
}

function filteredCandidates() {
  const normalizedQuery = state.query.trim().toLocaleLowerCase("zh-CN");
  return state.data.candidates.filter((candidate) => {
    const typeMatches = state.type === "all" || candidate.type === state.type;
    const queryMatches =
      !normalizedQuery || candidate.searchText.includes(normalizedQuery);
    return typeMatches && queryMatches;
  });
}

function candidateCard(candidate) {
  const article = create("article", "candidate-card");
  setTypeColor(article, candidate.type);
  const button = create("button", "candidate-button");
  button.type = "button";
  button.dataset.candidateId = candidate.id;
  button.setAttribute("aria-label", "查看 " + candidate.title + " 的证据详情");

  const top = create("div", "candidate-topline");
  top.append(
    create("span", "", typeLabel(candidate.type) + " · " + candidate.id),
    create("span", "candidate-arrow", "↗"),
  );
  const summary = candidate.summary || candidate.evidence || "等待后续阶段补充解释。";
  const source = candidate.source_chapter || "未标注来源";
  const tags = renderTags((candidate.tags || []).slice(0, 3));
  tags.classList.add("candidate-tags");

  button.append(
    top,
    create("h3", "", candidate.title),
    create("p", "candidate-summary", summary),
    create("span", "candidate-source", source),
    tags,
  );
  button.addEventListener("click", () => openDetail(candidate, button));
  article.append(button);
  return article;
}

function renderCandidates() {
  const matches = filteredCandidates();
  const visible = matches.slice(0, state.visible);
  dom.candidateGrid.replaceChildren(...visible.map(candidateCard));
  dom.resultCount.textContent =
    "匹配 " + matches.length + " 条 · 当前显示 " + visible.length + " 条";
  dom.emptyState.hidden = matches.length !== 0;
  dom.loadMore.hidden = visible.length >= matches.length;
}

function detailBlock(label, value, className = "") {
  if (
    value === undefined ||
    value === null ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  ) {
    return null;
  }

  const block = create("section", "detail-block" + (className ? " " + className : ""));
  block.append(create("h3", "", label));
  if (Array.isArray(value)) {
    block.append(renderTags(value));
  } else {
    block.append(create("p", "", String(value)));
  }
  return block;
}

function openDetail(candidate, opener) {
  state.dialogOpener = opener;
  setTypeColor(dom.dialog, candidate.type);
  dom.dialogType.textContent =
    typeLabel(candidate.type).toLocaleUpperCase("zh-CN") + " · " + candidate.id;
  dom.dialogTitle.textContent = candidate.title;
  dom.dialogBody.replaceChildren();

  const source = create("div", "detail-source");
  source.append(
    create("span", "", "SOURCE"),
    create("strong", "", candidate.source_chapter || "未标注来源"),
  );
  dom.dialogBody.append(source);

  if (candidate.evidence) {
    const evidence = create("blockquote", "detail-evidence", candidate.evidence);
    dom.dialogBody.append(evidence);
  }

  const blocks = [
    detailBlock("用自己的话", candidate.summary),
    detailBlock("案例类型", candidate.case_kind),
    detailBlock("作用机制", candidate.mechanism),
    detailBlock("失败模式", candidate.failure_mode),
    detailBlock("预警信号", candidate.warning_signs),
    detailBlock("绑定主题", candidate.bound_to),
    detailBlock("结果", candidate.outcome),
    detailBlock("关键区分", candidate.key_distinction),
    detailBlock("为什么重要", candidate.why_it_matters),
  ].filter(Boolean);

  dom.dialogBody.append(...blocks);
  if (candidate.tags?.length) {
    const tags = detailBlock("标签", candidate.tags, "detail-tags");
    if (tags) dom.dialogBody.append(tags);
  }

  if (!dom.dialog.open) dom.dialog.showModal();
  requestAnimationFrame(() => dom.dialogClose.focus());
}

function closeDetail() {
  if (dom.dialog.open) dom.dialog.close();
}

function renderTextList(items, className = "") {
  const list = create("ul", className);
  for (const item of items) list.append(create("li", "", item));
  return list;
}

function clearSkillError() {
  dom.skillError.hidden = true;
  dom.skillError.textContent = "";
  dom.skillProblem.removeAttribute("aria-invalid");
}

function showSkillError(message) {
  dom.skillError.textContent = message;
  dom.skillError.hidden = false;
  dom.skillProblem.setAttribute("aria-invalid", "true");
  dom.skillProblem.focus();
}

function updateSkillCharacterCount() {
  dom.skillCharCount.textContent = dom.skillProblem.value.length + " / 360";
}

function detectSkillRoute(problem) {
  const normalized = problem.toLocaleLowerCase("zh-CN");
  const explicitOut = state.data.capabilityGate.outOfScope
    .map((category) => ({
      ...category,
      matches: category.signals.filter((signal) => normalized.includes(signal)),
    }))
    .find((category) => category.matches.length > 0);
  if (explicitOut) {
    return {
      fit: "out",
      route: null,
      matches: explicitOut.matches,
      domainMatches: [],
      outCategory: explicitOut,
    };
  }

  const ranked = state.data.routes
    .map((route) => ({
      route,
      matches: route.keywords.filter((keyword) => normalized.includes(keyword)),
    }))
    .sort((left, right) => right.matches.length - left.matches.length);
  const selected = ranked[0];
  if (selected.matches.length === 0) {
    return {
      fit: "out",
      route: null,
      matches: [],
      domainMatches: [],
      outCategory: {
        id: "unmatched",
        label: "当前候选池未覆盖的问题",
        recommendation:
          "请改用覆盖该主题的专业 Skill、最新一手资料或领域专家；不要让当前候选池强行给出结论。",
      },
    };
  }

  const domainMatches = selected.route.domainSignals.filter((signal) =>
    normalized.includes(signal),
  );
  return {
    ...selected,
    fit: domainMatches.length > 0 ? "core" : "adjacent",
    domainMatches,
  };
}

function renderSkillExamples() {
  dom.examplePrompts.replaceChildren();
  for (const [index, route] of state.data.routes.entries()) {
    const button = create("button", "example-prompt");
    button.type = "button";
    button.dataset.routeId = route.id;
    button.append(
      create("span", "", String(index + 1).padStart(2, "0")),
      create("strong", "", route.label),
    );
    button.addEventListener("click", () => {
      state.route = route.id;
      dom.skillProblem.value = route.samplePrompt;
      updateSkillCharacterCount();
      clearSkillError();
      renderRoutes();
      dom.skillProblem.focus();
      showToast("已载入示例：" + route.label);
    });
    dom.examplePrompts.append(button);
  }

  const outExample = state.data.capabilityGate.outExample;
  const outButton = create("button", "example-prompt example-prompt-out");
  outButton.type = "button";
  outButton.dataset.fitTest = "out";
  outButton.append(
    create("span", "", "×"),
    create("strong", "", outExample.label),
  );
  outButton.addEventListener("click", () => {
    dom.skillProblem.value = outExample.prompt;
    updateSkillCharacterCount();
    clearSkillError();
    dom.skillProblem.focus();
    showToast("已载入域外问题，用于测试停止边界");
  });
  dom.examplePrompts.append(outButton);
}

function skillStage(index, title, items, modifier = "") {
  const article = create(
    "article",
    "skill-stage" + (modifier ? " " + modifier : ""),
  );
  article.append(
    create("span", "skill-stage-index", String(index).padStart(2, "0")),
    create("h4", "", title),
    renderTextList(items, "skill-stage-list"),
  );
  return article;
}

function renderSkillResult(detection, problem) {
  const { route, matches, domainMatches, fit } = detection;
  state.route = route.id;
  state.lastSkillRoute = route.id;
  state.lastSkillFit = fit;
  renderRoutes();

  const header = create("header", "skill-output-header");
  const protocol = create("div", "skill-protocol-row");
  const fitBadge = create(
    "span",
    "skill-candidate-badge skill-fit-badge",
    state.data.capabilityGate.labels[fit],
  );
  fitBadge.dataset.fit = fit;
  protocol.append(
    create("span", "skill-protocol", "LOCAL ROUTE / " + route.id.toUpperCase()),
    fitBadge,
  );
  const title = create("h3", "", route.skillName);
  title.id = "skill-output-title";
  const reason =
    fit === "core"
      ? "路线信号：“" +
        matches.join(" / ") +
        "”；领域信号：“" +
        domainMatches.join(" / ") +
        "”。"
      : "命中方法信号“" +
        matches.join(" / ") +
        "”，但没有命中技术、工程或研发组织领域信号。";
  header.append(protocol, title, create("p", "skill-route-reason", reason));

  const fitNotice = create("div", "skill-fit-notice");
  fitNotice.dataset.fit = fit;
  fitNotice.append(
    create("strong", "", state.data.capabilityGate.labels[fit]),
    create("p", "", state.data.capabilityGate.policies[fit]),
  );

  const validationNotice =
    route.id === "incident"
      ? create("div", "skill-validation-notice")
      : null;
  if (validationNotice) {
    validationNotice.append(
      create("strong", "", "Stage 2 构造状态"),
      create(
        "p",
        "",
        "通用“线上故障复盘”未通过 V3；修订后的“系统性故障学习审查”已构造并在 v0.1.1 的 Stage 4 合成盲测中达到 19 / 19。此处仍只演示确定性协议，不运行真实 Agent，也不代表真实事故材料认证。",
      ),
    );
  }

  const problemBlock = create("blockquote", "skill-problem-echo");
  problemBlock.append(
    create("span", "", "USER PROBLEM"),
    create("p", "", problem),
  );

  const intake = skillStage(1, "先补齐输入", route.intake);

  const evidence = create("section", "skill-stage skill-evidence-stage");
  evidence.append(
    create("span", "skill-stage-index", "02"),
    create("h4", "", "调用候选证据"),
  );
  const evidenceGrid = create("div", "skill-evidence-grid");
  for (const step of route.path) {
    const candidate = state.data.candidates.find(
      (entry) => entry.id === step.candidateId,
    );
    if (!candidate) continue;
    const button = create("button", "skill-evidence-button");
    button.type = "button";
    button.dataset.candidateId = candidate.id;
    setTypeColor(button, candidate.type);
    button.setAttribute("aria-label", "查看候选证据 " + candidate.title);
    button.append(
      create("span", "skill-evidence-type", typeLabel(candidate.type) + " · " + candidate.id),
      create("strong", "", candidate.title),
      create("small", "", step.action),
      create("span", "skill-evidence-arrow", "查看证据 ↗"),
    );
    button.addEventListener("click", () => openDetail(candidate, button));
    evidenceGrid.append(button);
  }
  evidence.append(evidenceGrid);

  const deliverables = skillStage(3, "定义交付结果", route.deliverables);

  const quality = create("section", "skill-stage skill-quality-stage");
  quality.append(
    create("span", "skill-stage-index", "04"),
    create("h4", "", "质量门与停止条件"),
    renderTextList(route.qualityChecks, "skill-stage-list"),
  );
  const boundary = create("div", "skill-boundary");
  const boundaryText =
    route.boundary +
    (fit === "adjacent"
      ? " " + state.data.capabilityGate.policies.adjacent
      : "");
  boundary.append(
    create("strong", "", "不能越过的边界"),
    create("p", "", boundaryText),
  );
  quality.append(boundary);

  const flow = create("div", "skill-flow");
  flow.append(intake, evidence, deliverables, quality);

  dom.skillOutput.className = "skill-output skill-output-complete";
  dom.skillOutput.dataset.fit = fit;
  dom.skillOutput.replaceChildren(
    header,
    fitNotice,
    ...(validationNotice ? [validationNotice] : []),
    problemBlock,
    flow,
  );
  requestAnimationFrame(() => {
    dom.skillOutput.focus({ preventScroll: true });
    dom.skillOutput.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
    });
  });
  showToast(
    (fit === "core" ? "核心域：" : "相邻域方法迁移：") + route.skillName,
  );
}

function renderOutOfDomain(detection, problem) {
  const { outCategory, matches } = detection;
  state.lastSkillRoute = null;
  state.lastSkillFit = "out";

  const header = create("header", "skill-output-header");
  const protocol = create("div", "skill-protocol-row");
  const fitBadge = create(
    "span",
    "skill-candidate-badge skill-fit-badge",
    state.data.capabilityGate.labels.out,
  );
  fitBadge.dataset.fit = "out";
  protocol.append(
    create("span", "skill-protocol", "DOMAIN GATE / STOP"),
    fitBadge,
  );
  const title = create("h3", "", "当前候选能力不适用");
  title.id = "skill-output-title";
  const reason = matches.length
    ? "识别到“" + outCategory.label + "”信号：“" + matches.join(" / ") + "”。"
    : "没有识别到学习、故障、架构或技术领导力路线。";
  header.append(protocol, title, create("p", "skill-route-reason", reason));

  const problemBlock = create("blockquote", "skill-problem-echo");
  problemBlock.append(
    create("span", "", "USER PROBLEM"),
    create("p", "", problem),
  );

  const decision = create("section", "skill-out-decision");
  decision.append(
    create("span", "skill-stage-index", "STOP"),
    create("h4", "", "不会强行调用候选资产"),
    create("p", "", state.data.capabilityGate.policies.out),
  );
  const grid = create("div", "skill-out-grid");
  const why = create("article", "");
  why.append(
    create("h5", "", "为什么停止"),
    renderTextList(
      [
        "书中沉淀的是程序员成长、软件工程和技术领导力方法",
        "当前候选证据不能提供该领域所需的专业事实或实时数据",
        "继续执行会制造看似完整、实际无依据的答案",
      ],
      "skill-stage-list",
    ),
  );
  const next = create("article", "");
  next.append(
    create("h5", "", "建议切换"),
    create("p", "", outCategory.recommendation),
  );
  grid.append(why, next);
  decision.append(grid);

  dom.skillOutput.className =
    "skill-output skill-output-complete skill-output-out";
  dom.skillOutput.dataset.fit = "out";
  dom.skillOutput.replaceChildren(header, problemBlock, decision);
  requestAnimationFrame(() => {
    dom.skillOutput.focus({ preventScroll: true });
    dom.skillOutput.scrollIntoView({
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "auto"
        : "smooth",
      block: "nearest",
    });
  });
  showToast("适用域门已停止：" + outCategory.label);
}

function runSkillTrial(problem) {
  const normalized = String(problem || "").trim();
  if (!state.data) {
    showSkillError("能力数据仍在加载，请稍后再试。");
    return false;
  }
  if (normalized.length < 8) {
    showSkillError("请至少说明问题对象与现象，建议输入 8 个字以上。");
    return false;
  }
  clearSkillError();
  const detection = detectSkillRoute(normalized);
  if (detection.fit === "out") {
    renderOutOfDomain(detection, normalized);
  } else {
    renderSkillResult(detection, normalized);
  }
  return true;
}

function renderRoutes() {
  dom.routeSelector.replaceChildren();
  for (const [index, route] of state.data.routes.entries()) {
    const tab = create("button", "route-tab");
    const selected = route.id === state.route;
    tab.type = "button";
    tab.id = "route-tab-" + route.id;
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-selected", String(selected));
    tab.setAttribute("aria-controls", "route-result");
    tab.tabIndex = selected ? 0 : -1;
    tab.append(
      create("span", "route-tab-index", String(index + 1).padStart(2, "0")),
      create("strong", "", route.label),
    );
    tab.addEventListener("click", () => {
      state.route = route.id;
      renderRoutes();
      showToast("已路由：" + route.label);
    });
    tab.addEventListener("keydown", (event) => {
      if (!["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft"].includes(event.key)) {
        return;
      }
      event.preventDefault();
      const direction = ["ArrowDown", "ArrowRight"].includes(event.key) ? 1 : -1;
      const nextIndex =
        (index + direction + state.data.routes.length) % state.data.routes.length;
      state.route = state.data.routes[nextIndex].id;
      renderRoutes();
      document.querySelector("#route-tab-" + state.route)?.focus();
    });
    dom.routeSelector.append(tab);
  }
  renderRouteResult();
}

function renderRouteResult() {
  const route =
    state.data.routes.find((candidateRoute) => candidateRoute.id === state.route) ||
    state.data.routes[0];
  const routeIndex = state.data.routes.indexOf(route) + 1;
  dom.routeResult.setAttribute("aria-labelledby", "route-tab-" + route.id);
  dom.routeResult.replaceChildren(
    create("span", "eyebrow", "ROUTE " + String(routeIndex).padStart(2, "0")),
    create("h3", "route-question", route.question),
    create("p", "route-outcome", route.outcome),
  );

  const list = create("ol", "route-path");
  for (const [index, step] of route.path.entries()) {
    const candidate = state.data.candidates.find(
      (entry) => entry.id === step.candidateId,
    );
    if (!candidate) continue;
    const item = create("li", "route-step");
    const count = create(
      "span",
      "route-step-index",
      String(index + 1).padStart(2, "0"),
    );
    const button = create("button", "");
    button.type = "button";
    setTypeColor(button, candidate.type);
    button.append(
      create("span", "route-step-type", typeLabel(candidate.type)),
      create("strong", "route-candidate-title", candidate.title),
      create("span", "route-action", step.action),
    );
    button.addEventListener("click", () => openDetail(candidate, button));
    item.append(count, button);
    list.append(item);
  }
  dom.routeResult.append(list);
}

let toastTimer;

function showToast(message) {
  clearTimeout(toastTimer);
  dom.toast.textContent = message;
  dom.toast.hidden = false;
  toastTimer = setTimeout(() => {
    dom.toast.hidden = true;
  }, 1600);
}

function renderLoadedState() {
  if (dom.thesis?.dataset.scope !== "library") {
    dom.thesis.textContent = state.data.meta.thesis;
  }
  dom.commit.textContent = state.data.meta.pinnedCommit;
  renderMetrics();
  renderPipeline();
  renderStage15Pilot();
  renderStage2Build();
  renderStage4Test();
  renderStage5Install();
  renderStage5PublicCase();
  renderArchitecture();
  renderFilters();
  renderCandidates();
  renderSkillExamples();
  updateSkillCharacterCount();
  renderRoutes();
}

function renderDataError(error) {
  const message = create("div", "data-error");
  message.append(
    create("strong", "", "研究数据加载失败"),
    create(
      "p",
      "",
      "请先运行 npm.cmd run build:data，再通过本地 HTTP 服务打开页面。",
    ),
    create("code", "", error.message),
  );
  dom.metricRail.replaceChildren(message);
  dom.candidateGrid.replaceChildren(message.cloneNode(true));
  dom.stage5Install.replaceChildren(message.cloneNode(true));
  dom.stage5Case.replaceChildren(message.cloneNode(true));
  dom.skillProblem.disabled = true;
  dom.skillForm.querySelector("button[type='submit']").disabled = true;
  dom.resultCount.textContent = "数据不可用";
}

async function loadData() {
  const params = new URLSearchParams(window.location.search);
  const dataPath = params.get("data") === "missing" ? "./data/missing.json" : "./data/research.json";
  const response = await fetch(dataPath, { cache: "no-store" });
  if (!response.ok) throw new Error("HTTP " + response.status + " · " + dataPath);
  state.data = await response.json();
  if (state.data.meta.candidateCount !== 247 || state.data.candidates.length !== 247) {
    throw new Error("候选计数不一致，期望 247");
  }
  renderLoadedState();
}

dom.themeToggle.addEventListener("click", toggleTheme);

dom.search.addEventListener("input", (event) => {
  state.query = event.target.value;
  state.visible = 18;
  renderCandidates();
});

dom.reset.addEventListener("click", () => {
  state.type = "all";
  state.query = "";
  state.visible = 18;
  dom.search.value = "";
  renderFilters();
  renderCandidates();
  dom.search.focus();
});

dom.loadMore.addEventListener("click", () => {
  state.visible += 18;
  renderCandidates();
});

dom.skillProblem.addEventListener("input", () => {
  updateSkillCharacterCount();
  if (!dom.skillError.hidden) clearSkillError();
});

dom.skillForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runSkillTrial(dom.skillProblem.value);
});

dom.dialogClose.addEventListener("click", closeDetail);
dom.dialog.addEventListener("click", (event) => {
  if (event.target === dom.dialog) closeDetail();
});
dom.dialog.addEventListener("close", () => {
  state.dialogOpener?.focus();
  state.dialogOpener = null;
});

document.addEventListener("keydown", (event) => {
  if (
    event.key === "/" &&
    !dom.dialog.open &&
    !["INPUT", "TEXTAREA"].includes(document.activeElement?.tagName)
  ) {
    event.preventDefault();
    dom.search.focus();
  }
});

setTheme(dom.html.dataset.theme || "light", false);
loadData().catch(renderDataError);

window.__cangjieDemo = {
  getState: () => ({
    type: state.type,
    query: state.query,
    visible: state.visible,
    route: state.route,
    lastSkillRoute: state.lastSkillRoute,
    lastSkillFit: state.lastSkillFit,
    stage5Step: state.stage5Step,
    stage5Route: state.stage5Route,
    stage5LedgerFilter: state.stage5LedgerFilter,
    loaded: Boolean(state.data),
  }),
  openCandidate: (id) => {
    const candidate = state.data?.candidates.find((item) => item.id === id);
    if (candidate) openDetail(candidate, document.activeElement);
  },
  runSkill: (problem) => runSkillTrial(problem),
};
