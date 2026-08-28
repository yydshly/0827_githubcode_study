const atlasSummary = document.querySelector("#capability-atlas-summary");
const atlasGrid = document.querySelector("#capability-atlas-grid");

const maturityStages = [
  "候选提取",
  "三重验证",
  "Skill 构造",
  "独立压测",
  "项目安装",
  "真实案例",
];

function make(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

function listBlock(label, items) {
  const block = make("div", "capability-detail-block");
  block.append(make("span", "capability-detail-label", label));
  const list = make("ul", "capability-detail-list");
  for (const item of items) list.append(make("li", "", item));
  block.append(list);
  return block;
}

function scrollBehavior() {
  return matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function focusAfterScroll(target, focusTarget = target) {
  target?.scrollIntoView({ behavior: scrollBehavior(), block: "start" });
  requestAnimationFrame(() => requestAnimationFrame(() => focusTarget?.focus({ preventScroll: true })));
}

function openCapability(route) {
  if (route.id === "incident") {
    document.querySelector("#stage5b-mode-full_review")?.click();
    document.querySelector("#stage5b-step-01")?.click();
    const section = document.querySelector("#stage5b");
    const launch = document.querySelector("#stage5b-demo-start");
    focusAfterScroll(section, launch);
    return;
  }

  const sample = document.querySelector(`[data-route-id="${route.id}"]`);
  sample?.click();
  document.querySelector("#skill-run")?.click();
  const section = document.querySelector("#capability");
  const result = document.querySelector("#skill-output");
  focusAfterScroll(section, result);
}

function maturityFor(route) {
  const formal = route.id === "incident";
  return {
    formal,
    level: formal ? 6 : 1,
    status: formal ? "formal-skill" : "candidate-capability",
    statusLabel: formal ? "正式 Skill" : "候选能力",
    stageLabel: formal ? "6 / 6 · 真实案例已演示" : "1 / 6 · 待三重验证",
    evidence: formal
      ? "19 / 19 独立回归 · 项目级安装 · 显式/隐式/负例宿主验证 · Cloudflare 公开案例"
      : "输入、交付物、质量检查和停止边界已整理；尚未进入 Stage 1.5 三重验证。",
  };
}

function renderCapabilityAtlas(data) {
  const routes = data.routes;
  const formalCount = routes.filter((route) => route.id === "incident").length;

  const overview = make("div", "capability-atlas-overview");
  overview.dataset.formalCount = String(formalCount);
  overview.dataset.candidateCount = String(routes.length - formalCount);

  const stats = make("div", "capability-atlas-stats");
  for (const [value, label, note] of [
    [routes.length, "能力方向", "输入 / 输出 / 边界已整理"],
    [formalCount, "正式 Skill", "可安装、可触发、可完整演示"],
    [routes.length - formalCount, "候选能力", "等待三重验证与独立压测"],
  ]) {
    const card = make("article", "capability-atlas-stat");
    card.append(make("strong", "", String(value)), make("span", "", label), make("p", "", note));
    stats.append(card);
  }

  const legend = make("div", "capability-maturity-legend");
  legend.append(
    make("span", "capability-legend-kicker", "MATURITY / 6 GATES"),
    make("strong", "", "能力不是一张卡片，而是一条证据链"),
  );
  const stageList = make("ol", "capability-maturity-stages");
  for (const [index, label] of maturityStages.entries()) {
    const item = make("li", "", label);
    item.dataset.stage = String(index + 1);
    stageList.append(item);
  }
  legend.append(stageList);
  overview.append(stats, legend);
  atlasSummary.replaceChildren(overview);

  atlasGrid.replaceChildren();
  for (const [index, route] of routes.entries()) {
    const maturity = maturityFor(route);
    const card = make("article", "capability-asset-card");
    card.dataset.capabilityId = route.id;
    card.dataset.capabilityStatus = maturity.status;
    card.dataset.maturity = String(maturity.level);

    const topline = make("div", "capability-card-topline");
    topline.append(
      make("span", "capability-card-index", String(index + 1).padStart(2, "0")),
      make("span", "capability-status-badge", maturity.statusLabel),
    );

    const title = make("h3", "", route.skillName.replace("（候选）", ""));
    const question = make("p", "capability-card-question", route.question);
    const outcome = make("p", "capability-card-outcome", route.outcome);

    const maturityHead = make("div", "capability-maturity-head");
    maturityHead.append(make("span", "", "成熟度"), make("strong", "", maturity.stageLabel));
    const track = make("ol", "capability-maturity-track");
    track.setAttribute("aria-label", `${route.skillName} 成熟度 ${maturity.level} / 6`);
    for (const [stageIndex, label] of maturityStages.entries()) {
      const dot = make("li", "", label);
      dot.dataset.complete = String(stageIndex < maturity.level);
      dot.title = `${stageIndex + 1}. ${label}`;
      track.append(dot);
    }

    const counts = make("div", "capability-contract-counts");
    counts.append(
      make("span", "", `${route.intake.length} 项必要输入`),
      make("span", "", `${route.deliverables.length} 份交付物`),
      make("span", "", `${route.qualityChecks.length} 条质量门`),
    );

    const evidence = make("p", "capability-evidence-note", maturity.evidence);
    const details = make("details", "capability-contract-details");
    details.append(make("summary", "", "查看输入、输出与停止边界"));
    const detailGrid = make("div", "capability-contract-grid");
    detailGrid.append(
      listBlock("必要输入", route.intake),
      listBlock("可交付结果", route.deliverables),
    );
    const boundary = make("div", "capability-card-boundary");
    boundary.append(make("span", "", "停止边界"), make("p", "", route.boundary));
    details.append(detailGrid, boundary);

    const action = make(
      "button",
      maturity.formal ? "button button-primary capability-card-action" : "button button-secondary capability-card-action",
      maturity.formal ? "查看最佳真实案例 →" : "载入候选能力试跑 →",
    );
    action.type = "button";
    action.dataset.capabilityAction = route.id;
    action.addEventListener("click", () => openCapability(route));

    card.append(
      topline,
      title,
      question,
      outcome,
      maturityHead,
      track,
      counts,
      evidence,
      details,
      action,
    );
    atlasGrid.append(card);
  }
}

function waitFor(selector, timeout = 6000) {
  return new Promise((resolve, reject) => {
    const current = document.querySelector(selector);
    if (current) {
      resolve(current);
      return;
    }
    const observer = new MutationObserver(() => {
      const node = document.querySelector(selector);
      if (!node) return;
      clearTimeout(timer);
      observer.disconnect();
      resolve(node);
    });
    const timer = setTimeout(() => {
      observer.disconnect();
      reject(new Error(`Timed out waiting for ${selector}`));
    }, timeout);
    observer.observe(document.body, { childList: true, subtree: true });
  });
}

function setDemoPathCurrent(target) {
  for (const button of document.querySelectorAll(".stage5b-demo-path-button")) {
    if (button.dataset.demoTarget === target) button.setAttribute("aria-current", "step");
    else button.removeAttribute("aria-current");
  }
}

function activateDemoTarget(target) {
  setDemoPathCurrent(target);
  const mode = document.querySelector("#stage5b-mode-full_review");
  const workbench = document.querySelector(".stage5b-workbench");
  if (target === "input") {
    const input = document.querySelector("#stage5b-demo-input");
    focusAfterScroll(input, input);
    return;
  }
  if (target === "route") {
    mode?.click();
    focusAfterScroll(document.querySelector(".stage5b-modes"), mode);
    return;
  }
  const stepMap = { evidence: "02", cause: "04", action: "06", closure: "07", conclusion: "08" };
  const step = document.querySelector(`#stage5b-step-${stepMap[target]}`);
  step?.click();
  focusAfterScroll(workbench, document.querySelector("#stage5b-step-panel"));
}

function renderDemoGuide(audit, shell) {
  if (shell.querySelector(".stage5b-demo-guide")) return;
  const guide = make("section", "stage5b-demo-guide");
  const header = make("div", "stage5b-demo-header");
  const copy = make("div", "");
  copy.append(
    make("span", "stage5b-kicker", "BEST DEMO / END-TO-END"),
    make("h4", "", "六站看懂：这个 Skill 到底替你完成什么"),
    make("p", "", "从事故描述开始，先决定能否完整审查，再把证据推进为因果、行动与可关闭结论。"),
  );
  const actions = make("div", "stage5b-demo-actions");
  const start = make("button", "button button-primary", "从路由开始 →");
  start.type = "button";
  start.id = "stage5b-demo-start";
  start.addEventListener("click", () => activateDemoTarget("route"));
  const conclusion = make("button", "button button-secondary", "直达最终结论");
  conclusion.type = "button";
  conclusion.id = "stage5b-demo-conclusion";
  conclusion.addEventListener("click", () => activateDemoTarget("conclusion"));
  actions.append(start, conclusion);
  header.append(copy, actions);

  const prompt = make("blockquote", "stage5b-demo-input");
  prompt.id = "stage5b-demo-input";
  prompt.tabIndex = -1;
  prompt.append(
    make("span", "", "INPUT / REAL PUBLIC INCIDENT"),
    make("p", "", `请审查“${audit.case.title}”：不要停在坏正则，判断原因链、整改质量和哪些行动能够关闭。`),
  );

  const snapshot = make("div", "stage5b-demo-snapshot");
  for (const [value, label] of [
    ["full_review", "响应模式"],
    ["3 类", "证据账本"],
    ["6 层", "因果候选"],
    ["6 项", "行动合同"],
    [`${audit.score.total} / 100`, "复盘质量"],
  ]) {
    const item = make("article", "");
    item.append(make("strong", "", value), make("span", "", label));
    snapshot.append(item);
  }

  const path = make("nav", "stage5b-demo-path");
  path.setAttribute("aria-label", "最佳演示六站路径");
  for (const [index, target, label] of [
    [1, "input", "事故输入"],
    [2, "route", "响应路由"],
    [3, "evidence", "证据账本"],
    [4, "cause", "系统因果"],
    [5, "action", "行动合同"],
    [6, "closure", "学习闭环"],
  ]) {
    const button = make("button", "stage5b-demo-path-button");
    button.type = "button";
    button.dataset.demoTarget = target;
    button.append(make("span", "", String(index).padStart(2, "0")), make("strong", "", label));
    button.addEventListener("click", () => activateDemoTarget(target));
    path.append(button);
  }
  setDemoPathCurrent("input");
  const nextGate = make("aside", "stage5c-gate");
  nextGate.append(
    make("span", "stage5c-gate-kicker", "NEXT GATE / STAGE 5C"),
    make("strong", "", "真实案例接入基础已就绪 · 当前 0 份组织案例"),
    make(
      "p",
      "",
      "需要 1–3 份合法、授权、脱敏且事故已稳定的组织材料；在此之前，组织外部效度仍保持未建立。",
    ),
  );
  guide.append(header, prompt, snapshot, path, nextGate);
  shell.insertBefore(guide, shell.children[1]);
}

async function initializeShowcase() {
  const params = new URLSearchParams(location.search);
  const dataPath = params.get("data") === "missing" ? "./data/missing.json" : "./data/research.json";
  const response = await fetch(dataPath, { cache: "no-store" });
  if (!response.ok) throw new Error(`HTTP ${response.status} · ${dataPath}`);
  const data = await response.json();
  renderCapabilityAtlas(data);
  const shell = await waitFor("#stage5b-case .stage5b-shell");
  renderDemoGuide(data.stage5PublicCase, shell);
}

initializeShowcase().catch((error) => {
  const message = make("div", "data-error");
  message.append(
    make("strong", "", "能力资产加载失败"),
    make("p", "", "请先重建研究数据，再刷新页面。"),
    make("code", "", error.message),
  );
  atlasSummary?.replaceChildren(message);
  atlasGrid?.replaceChildren();
});
