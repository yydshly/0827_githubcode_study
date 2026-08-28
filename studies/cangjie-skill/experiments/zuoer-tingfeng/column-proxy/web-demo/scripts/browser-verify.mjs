import { createRequire } from "node:module";
import { access, writeFile } from "node:fs/promises";
import os from "node:os";
import path from "node:path";

const require = createRequire(import.meta.url);
const projectRoot = path.resolve(import.meta.dirname, "..");
const evidenceRoot = path.join(projectRoot, "evidence");
const baseUrl = process.env.DEMO_URL || "http://127.0.0.1:4174";

async function loadPlaywright() {
  try {
    return require("playwright");
  } catch (localError) {
    const bundledRoot =
      process.env.PLAYWRIGHT_MODULE_ROOT ||
      path.join(
        os.homedir(),
        ".cache",
        "codex-runtimes",
        "codex-primary-runtime",
        "dependencies",
        "node",
        "node_modules",
        "playwright",
      );
    await access(path.join(bundledRoot, "index.js"));
    return require(path.join(bundledRoot, "index.js"));
  }
}

function ensure(condition, message) {
  if (!condition) throw new Error(message);
}

async function auditSurface(browser, config) {
  const context = await browser.newContext({
    viewport: { width: config.width, height: config.height },
    colorScheme: config.colorScheme,
    reducedMotion: config.reducedMotion || "no-preference",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));

  const response = await page.goto(baseUrl, { waitUntil: "networkidle" });
  await page.bringToFront();
  const audit = {
    viewport: `${config.width}x${config.height}`,
    colorScheme: config.colorScheme,
    reducedMotion: config.reducedMotion || "no-preference",
    status: response?.status(),
    title: await page.title(),
    bodyCharacters: (await page.locator("body").innerText()).trim().length,
    errorOverlays: await page
      .locator("[data-nextjs-dialog], .vite-error-overlay, #webpack-dev-server-client-overlay")
      .count(),
    consoleErrors,
    initialCandidateCards: await page.locator(".candidate-card").count(),
    horizontalOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
    theme: await page.locator("html").getAttribute("data-theme"),
    reducedMotionMatches: await page.evaluate(() =>
      matchMedia("(prefers-reduced-motion: reduce)").matches,
    ),
  };

  ensure(audit.status === 200, `${config.name}: expected HTTP 200`);
  ensure(audit.bodyCharacters > 1000, `${config.name}: page content is unexpectedly sparse`);
  ensure(audit.errorOverlays === 0, `${config.name}: framework error overlay detected`);
  ensure(audit.consoleErrors.length === 0, `${config.name}: console errors detected`);
  ensure(audit.initialCandidateCards === 18, `${config.name}: initial candidate window is not 18`);
  ensure(!audit.horizontalOverflow, `${config.name}: horizontal overflow detected`);
  ensure(audit.theme === config.colorScheme, `${config.name}: theme did not match preference`);
  ensure(
    (await page.locator("#stage15-pilot").innerText()).includes("系统性故障学习审查"),
    `${config.name}: Stage 1.5 revised candidate is missing`,
  );
  ensure(
    (await page.locator('[data-decision="reject-as-standalone"]').count()) === 1,
    `${config.name}: original candidate rejection is not visible`,
  );
  ensure(
    (await page.locator('[data-skill-status="static-pass"]').count()) === 1,
    `${config.name}: Stage 2 static construction status is missing`,
  );
  ensure(
    (await page.locator(".stage2-ria-card").count()) === 6,
    `${config.name}: Stage 2 RIA++ anatomy is incomplete`,
  );
  ensure(
    (await page.locator(".stage2-route").count()) === 5,
    `${config.name}: Stage 2 route set is incomplete`,
  );
  ensure(
    (await page.locator('[data-pressure-status="behavior-pass"]').count()) === 1,
    `${config.name}: Stage 4 pressure-test status is missing`,
  );
  ensure(
    (await page.locator(".stage4-round-card").count()) === 3,
    `${config.name}: Stage 4 round history is incomplete`,
  );
  ensure(
    (await page.locator(".stage4-matrix-card").count()) === 4,
    `${config.name}: Stage 4 final matrix is incomplete`,
  );
  ensure(
    (await page.locator('[data-install-status="repo-install-pass"]').count()) === 1,
    `${config.name}: Stage 5A install status is missing`,
  );
  ensure(
    (await page.locator(".stage5-call-card").count()) === 3,
    `${config.name}: Stage 5A host smoke evidence is incomplete`,
  );
  ensure(
    (await page.locator(".stage5-output-step").count()) === 8,
    `${config.name}: Stage 5A full-review structure is incomplete`,
  );
  ensure(
    (await page.locator('[data-public-case-status="pass-public-case-audit"]').count()) === 1,
    `${config.name}: Stage 5B public-case status is missing`,
  );
  ensure(
    (await page.locator(".stage5b-mode-button").count()) === 5,
    `${config.name}: Stage 5B five-mode router is incomplete`,
  );
  ensure(
    (await page.locator(".stage5b-step-button").count()) === 8,
    `${config.name}: Stage 5B output-contract steps are incomplete`,
  );
  ensure(
    (await page.locator(".stage5b-source-link").count()) >= 2,
    `${config.name}: Stage 5B official sources are missing`,
  );
  ensure(
    (await page.locator("#stage5b-case").innerText()).includes("Cloudflare 2019-07-02 WAF 全球中断"),
    `${config.name}: Stage 5B real public case is missing`,
  );
  if (config.reducedMotion === "reduce") {
    ensure(audit.reducedMotionMatches, `${config.name}: reduced motion preference not active`);
  }

  if (config.screenshot) {
    await page.screenshot({ path: path.join(evidenceRoot, config.screenshot), fullPage: true });
  }
  if (config.pilotScreenshot) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const target = document.querySelector("#stage15");
      const header = document.querySelector(".site-header");
      const top = target.getBoundingClientRect().top + scrollY;
      scrollTo({
        top: Math.max(0, top - header.getBoundingClientRect().height - 12),
        behavior: "auto",
      });
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    });
    await page.screenshot({ path: path.join(evidenceRoot, config.pilotScreenshot) });
  }
  if (config.stage2Screenshot) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const target = document.querySelector("#stage2");
      const header = document.querySelector(".site-header");
      const top = target.getBoundingClientRect().top + scrollY;
      scrollTo({
        top: Math.max(0, top - header.getBoundingClientRect().height - 12),
        behavior: "auto",
      });
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    });
    await page.screenshot({ path: path.join(evidenceRoot, config.stage2Screenshot) });
  }
  if (config.stage4Screenshot) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const target = document.querySelector("#stage4");
      const header = document.querySelector(".site-header");
      const top = target.getBoundingClientRect().top + scrollY;
      scrollTo({
        top: Math.max(0, top - header.getBoundingClientRect().height - 12),
        behavior: "auto",
      });
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    });
    await page.locator("#stage4").screenshot({
      path: path.join(evidenceRoot, config.stage4Screenshot),
    });
  }
  if (config.stage5Screenshot) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const target = document.querySelector("#stage5");
      const header = document.querySelector(".site-header");
      const top = target.getBoundingClientRect().top + scrollY;
      scrollTo({
        top: Math.max(0, top - header.getBoundingClientRect().height - 12),
        behavior: "auto",
      });
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    });
    await page.locator("#stage5").screenshot({
      path: path.join(evidenceRoot, config.stage5Screenshot),
    });
  }
  if (config.stage5bScreenshot) {
    await page.evaluate(() => {
      document.documentElement.style.scrollBehavior = "auto";
      const target = document.querySelector("#stage5b");
      const header = document.querySelector(".site-header");
      const top = target.getBoundingClientRect().top + scrollY;
      scrollTo({
        top: Math.max(0, top - header.getBoundingClientRect().height - 12),
        behavior: "auto",
      });
      return new Promise((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(resolve)),
      );
    });
    await page.locator("#stage5b").screenshot({
      path: path.join(evidenceRoot, config.stage5bScreenshot),
    });
  }

  await context.close();
  return audit;
}

async function auditInteractions(browser) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 1000 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.goto(baseUrl, { waitUntil: "networkidle" });

  const metrics = await page.locator(".metric").allTextContents();
  const bodyText = await page.locator("body").innerText();
  ensure(bodyText.includes("119"), "119-file corpus metric missing");
  ensure(bodyText.includes("247"), "247-candidate metric missing");
  ensure(bodyText.includes("1 / 247 pilot"), "Stage 1.5 pilot scope is missing");
  ensure(bodyText.includes("1 Skill / v0.1.1"), "Stage 2 pipeline metric is missing");
  ensure(bodyText.includes("19 / 19 blind"), "Stage 4 pipeline metric is missing");
  ensure(bodyText.includes("5B · public case"), "Stage 5B pipeline metric is missing");

  const pilotText = await page.locator("#stage15-pilot").innerText();
  ensure(pilotText.includes("V3 未通过"), "original candidate V3 failure is missing");
  ensure(
    pilotText.includes("系统性故障学习审查"),
    "revised Stage 1.5 candidate is missing",
  );
  ensure(
    (await page.locator('[data-decision="confirmed-for-stage2"]').count()) === 1,
    "confirmed Stage 1.5 candidate decision is missing",
  );
  ensure(
    (await page.locator(".pilot-verification-card").count()) === 3,
    "V1/V2/V3 verification cards are incomplete",
  );
  const pilotTestTotal = await page
    .locator(".pilot-test-stat strong")
    .evaluateAll((nodes) => nodes.reduce((sum, node) => sum + Number(node.textContent), 0));
  ensure(pilotTestTotal === 18, "Stage 1.5 test distribution does not total 18");
  ensure(pilotText.includes("确认门已于 2026-08-28 通过"), "confirmed user gate is missing");
  await page.locator("#stage15").screenshot({
    path: path.join(evidenceRoot, "stage15-pilot-desktop.png"),
  });

  const stage2Text = await page.locator("#stage2-build").innerText();
  ensure(stage2Text.includes("系统性故障学习审查"), "Stage 2 skill name is missing");
  ensure(stage2Text.includes("v0.1.1"), "Stage 2 version is missing");
  ensure(stage2Text.includes("静态构造验证通过"), "Stage 2 validation status is missing");
  ensure(
    (await page.locator(".stage2-ria-card").count()) === 6,
    "Stage 2 does not expose six RIA++ parts",
  );
  ensure(
    (await page.locator(".stage2-route").count()) === 5,
    "Stage 2 does not expose five runtime routes",
  );
  ensure(
    (await page.locator('.stage2-artifact[data-resource-role="按需参考"]').count()) === 2,
    "Stage 2 does not expose two progressive references",
  );
  ensure(
    stage2Text.includes("Stage 4") && stage2Text.includes("Stage 5A"),
    "Stage 2/4/5A evidence separation is incomplete",
  );
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const target = document.querySelector("#stage2");
    const header = document.querySelector(".site-header");
    const top = target.getBoundingClientRect().top + scrollY;
    scrollTo({
      top: Math.max(0, top - header.getBoundingClientRect().height - 12),
      behavior: "auto",
    });
    return new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.screenshot({ path: path.join(evidenceRoot, "stage2-build-desktop.png") });

  const stage4Text = await page.locator("#stage4-test").innerText();
  ensure(stage4Text.includes("19 / 19"), "Stage 4 final result is missing");
  ensure(stage4Text.includes("16 / 19"), "Stage 4 Round 1 result is missing");
  ensure(stage4Text.includes("3 / 3"), "Stage 4 focused retest is missing");
  ensure(stage4Text.includes("0 误触发"), "Stage 4 negative precision is missing");
  ensure(
    (await page.locator(".stage4-round-card").count()) === 3,
    "Stage 4 does not expose all three rounds",
  );
  ensure(
    (await page.locator(".stage4-repair-card").count()) === 3,
    "Stage 4 does not expose all three failure-driven repairs",
  );
  ensure(
    (await page.locator(".stage4-matrix-card").count()) === 4,
    "Stage 4 final coverage matrix is incomplete",
  );
  ensure(
    stage4Text.includes("题型、期望行为、评分标准") &&
      stage4Text.includes("Stage 5B 已增加真实公开事故案例") &&
      stage4Text.includes("用户组织内部材料仍未评测") &&
      stage4Text.includes("Stage 5A"),
    "Stage 4 blind protocol or honest boundary is incomplete",
  );
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const target = document.querySelector("#stage4");
    const header = document.querySelector(".site-header");
    const top = target.getBoundingClientRect().top + scrollY;
    scrollTo({
      top: Math.max(0, top - header.getBoundingClientRect().height - 12),
      behavior: "auto",
    });
    return new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.locator("#stage4").screenshot({
    path: path.join(evidenceRoot, "stage4-test-desktop.png"),
  });

  const stage5Text = await page.locator("#stage5-install").innerText();
  ensure(stage5Text.includes("Stage 5A 项目级安装通过"), "Stage 5A status is missing");
  ensure(
    stage5Text.includes(".agents/skills/incident-learning-audit"),
    "Stage 5A install path is missing",
  );
  ensure(stage5Text.includes("6 / 6"), "Stage 5A file integrity is missing");
  ensure(stage5Text.includes("显式发现"), "Stage 5A explicit discovery is missing");
  ensure(stage5Text.includes("语义触发"), "Stage 5A implicit trigger is missing");
  ensure(stage5Text.includes("负例边界"), "Stage 5A negative boundary is missing");
  ensure(
    (await page.locator(".stage5-call-card").count()) === 3,
    "Stage 5A host invocation cards are incomplete",
  );
  const stage5Summary = page.locator("#stage5-output-summary");
  await stage5Summary.focus();
  await page.keyboard.press("Enter");
  ensure(
    (await page.locator("#stage5-output-details").getAttribute("open")) !== null,
    "Stage 5A full-review details did not open from keyboard",
  );
  ensure(
    (await page.locator(".stage5-output-step").count()) === 8,
    "Stage 5A full-review output does not expose eight sections",
  );
  ensure(
    stage5Text.includes("运行时观察") && stage5Text.includes("人工中断"),
    "Stage 5A runtime observation is missing",
  );

  const stage5bText = await page.locator("#stage5b-case").innerText();
  ensure(stage5bText.includes("真实公开事故"), "Stage 5B case type is missing");
  ensure(stage5bText.includes("86") && stage5bText.includes("/ 100"), "Stage 5B score is missing");
  ensure(
    stage5bText.includes("停在直接触发") && stage5bText.includes("系统条件"),
    "Stage 5B shallow/system comparison is missing",
  );
  const stage5bSources = await page.locator(".stage5b-sources .stage5b-source-link").evaluateAll(
    (links) => links.map((link) => new URL(link.href).hostname),
  );
  ensure(
    stage5bSources.length === 2 && stage5bSources.every((host) => host === "blog.cloudflare.com"),
    "Stage 5B sources are not the two official Cloudflare pages",
  );

  const fullReviewMode = page.locator("#stage5b-mode-full_review");
  await fullReviewMode.focus();
  await page.keyboard.press("ArrowRight");
  ensure(
    (await page.locator('.stage5b-mode-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-mode-evidence_gap",
    "Stage 5B mode arrow navigation failed",
  );
  ensure(
    (await page.locator("#stage5b-mode-panel").innerText()).includes("不能宣布确定根因"),
    "Stage 5B evidence-gap guardrail is missing",
  );
  await page.keyboard.press("Home");
  ensure(
    (await page.locator('.stage5b-mode-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-mode-full_review",
    "Stage 5B mode Home navigation failed",
  );

  const firstAuditStep = page.locator("#stage5b-step-01");
  await firstAuditStep.focus();
  await page.keyboard.press("ArrowRight");
  ensure(
    (await page.locator('.stage5b-step-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-step-02",
    "Stage 5B step arrow navigation failed",
  );
  ensure(
    (await page.locator("#stage5b-step-panel").getAttribute("data-step-kind")) === "ledger",
    "Stage 5B ledger step did not render",
  );
  await page.locator('[data-ledger-filter="unknown"]').click();
  ensure(
    (await page.locator('.stage5b-ledger-entry[data-evidence-type="unknown"]').count()) === 2 &&
      (await page.locator(".stage5b-ledger-entry").count()) === 2,
    "Stage 5B unknown-evidence filter failed",
  );

  await page.locator("#stage5b-step-04").click();
  ensure((await page.locator(".stage5b-cause").count()) === 6, "Stage 5B causal ladder is incomplete");
  ensure(
    (await page.locator("#stage5b-step-panel").innerText()).includes("证伪"),
    "Stage 5B causal falsifiers are missing",
  );

  await page.locator("#stage5b-step-06").click();
  ensure((await page.locator(".stage5b-action").count()) === 6, "Stage 5B action contracts are incomplete");
  ensure(
    (await page.locator(".stage5b-action-fields").first().innerText()).includes("失败条件"),
    "Stage 5B action failure condition is missing",
  );
  await page.locator("#stage5b-step-06").focus();
  await page.keyboard.press("End");
  ensure(
    (await page.locator('.stage5b-step-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-step-08",
    "Stage 5B step End navigation failed",
  );
  const conclusionText = await page.locator("#stage5b-step-panel").innerText();
  ensure(
    conclusionText.includes("尚未形成学习闭环") && conclusionText.includes("86 / 100"),
    "Stage 5B conclusion or evidence score is missing",
  );
  await page.locator("#stage5b-previous").click();
  ensure(
    (await page.locator("#stage5b-step-panel").getAttribute("data-step-kind")) === "closure",
    "Stage 5B previous control did not return to learning closure",
  );
  ensure(
    (await page.evaluate(() => document.activeElement?.id)) === "stage5b-step-panel",
    "Stage 5B previous control did not move focus to the updated panel",
  );

  const search = page.locator("#candidate-search");
  await search.fill("故障");
  const searchedCount = await page.locator(".candidate-card").count();
  ensure(searchedCount > 0, "search returned no matching evidence");

  await search.fill("__不会命中的验证词__");
  ensure(await page.locator("#empty-state").isVisible(), "empty search state is not visible");
  await page.locator("#reset-filters").click();
  ensure((await search.inputValue()) === "", "reset did not clear search input");

  await page.locator('[data-type="principle"]').click();
  const principleResult = await page.locator("#result-count").innerText();
  ensure(principleResult.includes("108"), "principle filter did not expose 108 candidates");
  await page.locator('[data-type="all"]').click();
  await page.locator("#load-more").click();
  ensure((await page.locator(".candidate-card").count()) === 36, "load-more window is not 36");

  const firstCandidate = page.locator(".candidate-button").first();
  await firstCandidate.focus();
  const firstCandidateId = await firstCandidate.getAttribute("data-candidate-id");
  await firstCandidate.click();
  ensure(await page.locator("#detail-dialog").isVisible(), "candidate detail dialog did not open");
  ensure((await page.locator("#detail-title").innerText()).length > 0, "detail title is empty");
  await page.keyboard.press("Escape");
  ensure(!(await page.locator("#detail-dialog").isVisible()), "Escape did not close dialog");
  const focusReturned = await page.evaluate(
    (candidateId) => document.activeElement?.dataset?.candidateId === candidateId,
    firstCandidateId,
  );
  ensure(focusReturned, "dialog close did not restore focus to opener");

  await page.locator("#route-tab-incident").click();
  ensure(
    (await page.locator("#route-result").innerText()).includes("故障"),
    "incident route did not render",
  );
  await page.locator("#route-tab-incident").press("ArrowRight");
  ensure(
    (await page.locator('#route-selector [role="tab"][aria-selected="true"]').getAttribute("id")) ===
      "route-tab-architecture",
    "arrow-key route navigation failed",
  );
  await page.locator("#route-result .route-step button").first().click();
  ensure(await page.locator("#detail-dialog").isVisible(), "route evidence did not open detail");
  await page.locator("#dialog-close").click();

  const skillProblem = page.locator("#skill-problem");
  const skillRun = page.locator("#skill-run");
  await skillProblem.fill("");
  await skillRun.click();
  await page.locator("#skill-error").waitFor({ state: "visible" });
  ensure(await page.locator("#skill-error").isVisible(), "empty skill problem did not show validation");
  ensure(
    (await skillProblem.getAttribute("aria-invalid")) === "true",
    "invalid skill problem did not set aria-invalid",
  );
  ensure(
    (await page.evaluate(() => document.activeElement?.id)) === "skill-problem",
    "skill validation did not return focus to the problem field",
  );

  await page.locator('[data-route-id="incident"]').click();
  ensure(
    (await skillProblem.inputValue()).includes("支付服务"),
    "incident example did not populate the problem field",
  );
  await skillProblem.press("Tab");
  ensure(
    (await page.evaluate(() => document.activeElement?.id)) === "skill-run",
    "skill run control is not next in the keyboard path",
  );
  await page.keyboard.press("Enter");
  ensure(
    (await page.locator("#skill-output-title").innerText()).includes("系统性故障学习审查"),
    "incident problem did not route to the Stage 2 incident skill",
  );
  ensure(
    (await page.locator("#skill-output").getAttribute("data-fit")) === "core",
    "incident problem was not classified as core domain",
  );
  ensure(
    (await page.locator("#skill-output .skill-evidence-button").count()) === 4,
    "candidate skill result did not expose four evidence items",
  );
  ensure(
    (await page.locator("#skill-output .skill-stage").count()) === 4,
    "candidate skill result did not expose four execution stages",
  );
  ensure(
    (await page.locator("#skill-output").innerText()).includes("不能越过的边界"),
    "candidate skill result did not expose its boundary",
  );
  ensure(
    (await page.locator("#skill-output .skill-validation-notice").innerText()).includes(
      "Stage 4 合成盲测中达到 19 / 19",
    ),
    "incident sandbox did not expose the Stage 4 validation boundary",
  );

  const trialCases = [
    {
      prompt: "我想在八周内学习 Kubernetes，并完成一个可以上线的小项目。",
      title: "技术学习规划",
      route: "learn",
    },
    {
      prompt: "订单系统准备从单体重构成微服务，这个架构方案值得做吗？",
      title: "架构决策评审",
      route: "architecture",
    },
    {
      prompt: "团队成员遇到问题总等我给答案，我应该怎样培养他们？",
      title: "技术领导力诊断",
      route: "leadership",
    },
  ];
  const skillRoutes = ["incident"];
  for (const trialCase of trialCases) {
    await skillProblem.fill(trialCase.prompt);
    await skillRun.click();
    ensure(
      (await page.locator("#skill-output-title").innerText()).includes(trialCase.title),
      `${trialCase.route} problem routed to the wrong candidate skill`,
    );
    ensure(
      (await page.evaluate(() => window.__cangjieDemo.getState().lastSkillRoute)) ===
        trialCase.route,
      `${trialCase.route} route was not recorded in state`,
    );
    ensure(
      (await page.evaluate(() => window.__cangjieDemo.getState().lastSkillFit)) ===
        "core",
      `${trialCase.route} problem was not classified as core domain`,
    );
    skillRoutes.push(trialCase.route);
  }

  await skillProblem.fill("我想学习摄影，应该怎样制定三个月的实践计划？");
  await skillRun.click();
  ensure(
    (await page.locator("#skill-output").getAttribute("data-fit")) === "adjacent",
    "adjacent learning problem was not marked as method transfer",
  );
  ensure(
    (await page.locator("#skill-output-title").innerText()).includes("技术学习规划"),
    "adjacent learning problem did not retain the learning method",
  );
  ensure(
    (await page.locator("#skill-output").innerText()).includes("方法迁移待验证"),
    "adjacent result did not expose the validation warning",
  );
  ensure(
    (await page.locator("#skill-output .skill-evidence-button").count()) === 4,
    "adjacent method transfer did not retain its auditable evidence chain",
  );

  await page.locator('[data-fit-test="out"]').click();
  ensure(
    (await skillProblem.inputValue()).includes("股票"),
    "out-of-domain example did not populate the problem field",
  );
  await skillRun.click();
  ensure(
    (await page.locator("#skill-output").getAttribute("data-fit")) === "out",
    "financial question was not stopped as out of domain",
  );
  ensure(
    (await page.locator("#skill-output-title").innerText()).includes("不适用"),
    "out-of-domain result did not explain non-applicability",
  );
  ensure(
    (await page.locator("#skill-output .skill-evidence-button").count()) === 0,
    "out-of-domain result exposed unsupported evidence",
  );
  ensure(
    (await page.locator("#skill-output .skill-stage").count()) === 0,
    "out-of-domain result incorrectly executed skill stages",
  );
  ensure(
    (await page.evaluate(() => window.__cangjieDemo.getState().lastSkillRoute)) ===
      null,
    "out-of-domain result retained a skill route",
  );

  await skillProblem.fill(
    "支付服务再次发生线上超时，已经恢复，请按无责复盘方式制定防复发行动。",
  );
  await skillRun.click();
  ensure(
    (await page.locator("#skill-output").getAttribute("data-fit")) === "core",
    "out-to-core recovery did not restore the core state",
  );
  ensure(
    (await page.locator("#skill-output .skill-evidence-button").count()) === 4,
    "out-to-core recovery did not restore evidence",
  );
  ensure(
    (await page.locator("#skill-output .skill-out-decision").count()) === 0,
    "out-to-core recovery retained stale stop feedback",
  );

  const evidenceButton = page.locator("#skill-output .skill-evidence-button").first();
  const evidenceCandidateId = await evidenceButton.getAttribute("data-candidate-id");
  await evidenceButton.click();
  ensure(await page.locator("#detail-dialog").isVisible(), "skill evidence did not open detail");
  await page.keyboard.press("Escape");
  ensure(!(await page.locator("#detail-dialog").isVisible()), "skill evidence detail did not close");
  ensure(
    await page.evaluate(
      (candidateId) => document.activeElement?.dataset?.candidateId === candidateId,
      evidenceCandidateId,
    ),
    "skill evidence detail did not restore focus",
  );
  const sandboxBoundary = await page.locator(".trial-disclaimer").innerText();
  ensure(
    sandboxBoundary.includes("确定性组合沙盒") &&
      sandboxBoundary.includes("不运行实时 Agent"),
    "candidate skill sandbox boundary is not visible",
  );

  await page.keyboard.press("Slash");
  ensure((await page.evaluate(() => document.activeElement?.id)) === "candidate-search", "slash shortcut failed");

  const initialTheme = await page.locator("html").getAttribute("data-theme");
  await page.locator("#theme-toggle").click();
  const toggledTheme = await page.locator("html").getAttribute("data-theme");
  ensure(initialTheme === "light" && toggledTheme === "dark", "theme toggle failed");

  await page.locator("#candidate-search").blur();
  await page.keyboard.press("Tab");
  const keyboardFocus = await page.evaluate(() => {
    const element = document.activeElement;
    const style = element ? getComputedStyle(element) : null;
    return {
      tag: element?.tagName,
      id: element?.id || null,
      outlineStyle: style?.outlineStyle,
      outlineWidth: style?.outlineWidth,
    };
  });

  ensure(
    keyboardFocus.outlineStyle !== "none" && keyboardFocus.outlineWidth !== "0px",
    "keyboard focus indicator is not visible",
  );

  ensure(consoleErrors.length === 0, "interaction flow emitted console errors");
  return {
    metrics,
    stage15Pilot: {
      originalDecision: "reject-as-standalone",
      revisedDecision: "confirmed-for-stage2",
      verificationCards: 3,
      testCaseTotal: pilotTestTotal,
      userConfirmationGate: "passed",
    },
    stage2Build: {
      skill: "incident-learning-audit",
      version: "0.1.1",
      status: "static-pass",
      riaParts: 6,
      runtimeRoutes: 5,
      progressiveReferences: 2,
      installedInStage5A: true,
    },
    stage4PressureTest: {
      version: "0.1.1",
      status: "behavior-pass",
      rounds: 3,
      finalPassed: 19,
      finalTotal: 19,
      negativeFalsePositives: 0,
      repairs: 3,
      installedInStage5A: true,
    },
    stage5Install: {
      version: "0.1.1",
      status: "repo-install-pass",
      installScope: "REPO",
      filesMatched: 6,
      hostInvocations: 3,
      negativeFalsePositives: 0,
      outputSections: 8,
      detailsKeyboard: true,
      stage5Complete: false,
    },
    stage5PublicCase: {
      status: "pass-public-case-audit",
      case: "cloudflare-waf-2019-07-02",
      officialSources: stage5bSources.length,
      routeModes: 5,
      outputSections: 8,
      ledgerTypes: ["fact", "inference", "unknown"],
      causes: 6,
      actions: 6,
      score: 86,
      conclusion: "尚未形成学习闭环",
      completeSkillDemonstration: true,
      organizationExternalValidity: false,
      stage5Complete: false,
    },
    searchedCount,
    principleResult,
    detailOpened: true,
    escapeClosed: true,
    focusReturned,
    routeKeyboardNavigation: true,
    skillTrialValidation: true,
    skillTrialKeyboardSubmit: true,
    skillTrialRoutes: skillRoutes,
    capabilityFitStates: ["core", "adjacent", "out", "out-to-core"],
    skillTrialEvidenceCount: 4,
    skillTrialEvidenceFocusReturned: true,
    slashShortcut: true,
    themeToggle: `${initialTheme} -> ${toggledTheme}`,
    keyboardFocus,
    consoleErrors,
  };
}

async function auditErrorState(browser) {
  const context = await browser.newContext({ viewport: { width: 768, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${baseUrl}/?data=missing`, { waitUntil: "networkidle" });
  const visibleErrors = await page.locator(".data-error:visible").count();
  const text = await page.locator("#result-count").innerText();
  ensure(visibleErrors >= 1, "intentional data-error state did not render");
  ensure(text === "数据不可用", "data-error result label is incorrect");
  await context.close();
  return { visibleErrors, resultLabel: text, expectedMissingResource: true };
}

async function auditSkillResultSurface(browser, config) {
  const context = await browser.newContext({
    viewport: { width: config.width, height: config.height },
    colorScheme: config.colorScheme,
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.goto(`${baseUrl}/#capability`, { waitUntil: "networkidle" });
  await page.locator("#skill-problem").fill(config.prompt);
  await page.locator("#skill-run").click();
  await page.locator("#skill-output.skill-output-complete").waitFor();
  await page.locator("#toast").waitFor({ state: "hidden" });

  const audit = {
    viewport: `${config.width}x${config.height}`,
    colorScheme: config.colorScheme,
    fit: await page.locator("#skill-output").getAttribute("data-fit"),
    title: await page.locator("#skill-output-title").innerText(),
    evidenceCount: await page.locator("#skill-output .skill-evidence-button").count(),
    stageCount: await page.locator("#skill-output .skill-stage").count(),
    horizontalOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
    consoleErrors,
  };
  ensure(audit.fit === config.expectedFit, `${config.name}: wrong capability fit`);
  ensure(audit.title.includes(config.expectedTitle), `${config.name}: wrong skill result`);
  ensure(
    audit.evidenceCount === config.expectedEvidence,
    `${config.name}: unexpected evidence count`,
  );
  ensure(
    audit.stageCount === config.expectedStages,
    `${config.name}: unexpected stage count`,
  );
  ensure(!audit.horizontalOverflow, `${config.name}: horizontal overflow detected`);
  ensure(audit.consoleErrors.length === 0, `${config.name}: console errors detected`);
  await page.evaluate(() => {
    document.documentElement.style.scrollBehavior = "auto";
    const target = document.querySelector(
      innerWidth <= 420 ? "#skill-output" : ".skill-trial",
    );
    const header = document.querySelector(".site-header");
    const top = target.getBoundingClientRect().top + scrollY;
    scrollTo({
      top: Math.max(0, top - header.getBoundingClientRect().height - 18),
      behavior: "auto",
    });
    return new Promise((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(resolve)),
    );
  });
  await page.screenshot({ path: path.join(evidenceRoot, config.screenshot) });
  await context.close();
  return audit;
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });

try {
  const surfaces = [];
  surfaces.push(
    await auditSurface(browser, {
      name: "desktop-light",
      width: 1440,
      height: 1000,
      colorScheme: "light",
      screenshot: "desktop-light.png",
      stage5Screenshot: "stage5-host-desktop.png",
      stage5bScreenshot: "stage5b-public-desktop.png",
    }),
  );
  surfaces.push(
    await auditSurface(browser, {
      name: "tablet-dark",
      width: 768,
      height: 1024,
      colorScheme: "dark",
      screenshot: "tablet-dark.png",
    }),
  );
  surfaces.push(
    await auditSurface(browser, {
      name: "mobile-light",
      width: 390,
      height: 844,
      colorScheme: "light",
      screenshot: "mobile-light.png",
      pilotScreenshot: "stage15-pilot-mobile.png",
      stage2Screenshot: "stage2-build-mobile.png",
      stage4Screenshot: "stage4-test-mobile.png",
      stage5Screenshot: "stage5-host-mobile.png",
      stage5bScreenshot: "stage5b-public-mobile.png",
    }),
  );
  surfaces.push(
    await auditSurface(browser, {
      name: "reduced-motion",
      width: 1024,
      height: 768,
      colorScheme: "light",
      reducedMotion: "reduce",
    }),
  );

  const report = {
    verifiedAt: new Date().toISOString(),
    url: baseUrl,
    status: "pass",
    surfaces,
    skillSurfaces: [
      await auditSkillResultSurface(browser, {
        name: "skill-result-desktop",
        width: 1440,
        height: 1000,
        colorScheme: "light",
        prompt: "支付服务本月连续三次超时，刚刚恢复，帮我复盘并制定防复发方案。",
        expectedFit: "core",
        expectedTitle: "系统性故障学习审查",
        expectedEvidence: 4,
        expectedStages: 4,
        screenshot: "skill-result-desktop.png",
      }),
      await auditSkillResultSurface(browser, {
        name: "skill-result-mobile",
        width: 390,
        height: 844,
        colorScheme: "light",
        prompt: "支付服务本月连续三次超时，刚刚恢复，帮我复盘并制定防复发方案。",
        expectedFit: "core",
        expectedTitle: "系统性故障学习审查",
        expectedEvidence: 4,
        expectedStages: 4,
        screenshot: "skill-result-mobile.png",
      }),
      await auditSkillResultSurface(browser, {
        name: "skill-domain-out-desktop",
        width: 1440,
        height: 1000,
        colorScheme: "light",
        prompt: "帮我判断今天应该买哪只股票，并给出具体投资建议。",
        expectedFit: "out",
        expectedTitle: "当前候选能力不适用",
        expectedEvidence: 0,
        expectedStages: 0,
        screenshot: "skill-domain-out-desktop.png",
      }),
    ],
    interactions: await auditInteractions(browser),
    errorState: await auditErrorState(browser),
  };
  await writeFile(
    path.join(evidenceRoot, "validation.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
