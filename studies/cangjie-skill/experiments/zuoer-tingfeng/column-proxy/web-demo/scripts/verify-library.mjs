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
  } catch {
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

async function inspectSurface(browser, config) {
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

  const response = await page.goto(`${baseUrl}/?view=library#library`, { waitUntil: "networkidle" });
  await page.locator('[data-library-status="ready"]').waitFor();

  const audit = {
    viewport: `${config.width}x${config.height}`,
    colorScheme: config.colorScheme,
    reducedMotion: config.reducedMotion || "no-preference",
    status: response?.status(),
    title: await page.title(),
    capabilities: await page.locator(".library-capability-card").count(),
    sourceTypes: await page.locator(".library-source-card").count(),
    pipelineStages: await page.locator(".library-pipeline-step").count(),
    responsibilityCards: await page.locator(".library-responsibility-card").count(),
    suitabilityCards: await page.locator(".library-suitability-card").count(),
    ecosystemLayers: await page.locator(".ecosystem-pipeline-step").count(),
    ecosystemCards: await page.locator(".ecosystem-card").count(),
    ecosystemFilters: await page.locator(".ecosystem-filter").count(),
    ecosystemLinks: await page.locator(".ecosystem-link").count(),
    ecosystemRecommended: await page.locator('.ecosystem-card[data-recommended="true"]').count(),
    adoptionLayers: await page.locator(".ecosystem-adoption-step").count(),
    caseCards: await page.locator(".library-case-card").count(),
    caseFilters: await page.locator(".library-case-filter").count(),
    evidenceLabels: await page.locator(".library-case-evidence").count(),
    controlledCases: await page.locator('[data-case-category="controlled"]').count(),
    capabilityAssets: await page.locator(".capability-asset-card").count(),
    bestDemo: await page.locator("#stage5b-case").count(),
    researchMapPages: await page.locator(".research-page-link").count(),
    researchReports: await page.locator(".research-report-list a").count(),
    researchBoundary: await page.locator(".research-map-boundary").count(),
    horizontalOverflow: await page.evaluate(
      () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
    ),
    theme: await page.locator("html").getAttribute("data-theme"),
    consoleErrors,
  };

  ensure(audit.status === 200, `${config.name}: expected HTTP 200`);
  ensure(audit.title.includes("Cangjie Skill"), `${config.name}: library-level title is missing`);
  ensure(audit.capabilities === 6, `${config.name}: expected six core capabilities`);
  ensure(audit.sourceTypes === 8, `${config.name}: expected eight source types`);
  ensure(audit.pipelineStages === 7, `${config.name}: expected seven stages`);
  ensure(audit.responsibilityCards === 3, `${config.name}: responsibility boundary is incomplete`);
  ensure(audit.suitabilityCards === 2, `${config.name}: suitability boundary is incomplete`);
  ensure(audit.ecosystemLayers === 6, `${config.name}: expected six ecosystem layers`);
  ensure(audit.ecosystemCards === 9, `${config.name}: expected nine ecosystem projects`);
  ensure(audit.ecosystemFilters === 4, `${config.name}: ecosystem filters are incomplete`);
  ensure(audit.ecosystemLinks === 9, `${config.name}: every ecosystem project must link to its official source`);
  ensure(audit.ecosystemRecommended === 4, `${config.name}: adoption priorities are inconsistent`);
  ensure(audit.adoptionLayers === 5, `${config.name}: adoption recommendation is incomplete`);
  ensure(audit.caseCards === 6, `${config.name}: expected six representative cases`);
  ensure(audit.caseFilters === 5, `${config.name}: case filters are incomplete`);
  ensure(audit.evidenceLabels === 6, `${config.name}: every case must expose its evidence scope`);
  ensure(audit.controlledCases === 1, `${config.name}: controlled study is not uniquely identified`);
  ensure(audit.capabilityAssets === 4, `${config.name}: controlled study capability assets regressed`);
  ensure(audit.bestDemo === 1, `${config.name}: formal Skill demonstration regressed`);
  ensure(audit.researchMapPages === 13, `${config.name}: research page map is incomplete`);
  ensure(audit.researchReports === 7, `${config.name}: research report links are incomplete`);
  ensure(audit.researchBoundary === 1, `${config.name}: proxy-corpus boundary is missing`);
  ensure(!audit.horizontalOverflow, `${config.name}: horizontal overflow detected`);
  ensure(audit.theme === config.colorScheme, `${config.name}: theme mismatch`);
  ensure(audit.consoleErrors.length === 0, `${config.name}: console errors detected`);
  if (config.reducedMotion === "reduce") {
    ensure(
      await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches),
      `${config.name}: reduced-motion preference did not match`,
    );
  }

  if (config.overviewScreenshot || config.ecosystemScreenshot || config.caseScreenshot) {
    await page.evaluate(() => {
      for (const node of document.querySelectorAll(".site-header, .skip-link")) {
        node.style.visibility = "hidden";
      }
    });
    await page.locator("#library").screenshot({
      path: path.join(evidenceRoot, config.overviewScreenshot),
    });
  }
  if (config.ecosystemScreenshot) {
    await page.locator("#ecosystem").screenshot({
      path: path.join(evidenceRoot, config.ecosystemScreenshot),
    });
  }
  if (config.mapScreenshot) {
    await page.locator("#research-map").screenshot({
      path: path.join(evidenceRoot, config.mapScreenshot),
    });
  }
  if (config.caseScreenshot) {
    await page.locator("#case-gallery").screenshot({
      path: path.join(evidenceRoot, config.caseScreenshot),
    });
  }
  if (config.overviewScreenshot || config.ecosystemScreenshot || config.caseScreenshot) {
    await page.evaluate(() => {
      for (const node of document.querySelectorAll(".site-header, .skip-link")) {
        node.style.removeProperty("visibility");
      }
    });
  }

  await context.close();
  return audit;
}

async function inspectCaseJourney(browser) {
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    colorScheme: "light",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("pageerror", (error) => consoleErrors.push(error.message));
  await page.goto(`${baseUrl}/?view=library#case-gallery`, { waitUntil: "networkidle" });
  await page.locator('[data-library-status="ready"]').waitFor();

  const expected = { video: 2, corpus: 2, archive: 1, controlled: 1, all: 6 };
  const observed = {};
  for (const [filter, count] of Object.entries(expected)) {
    const button = page.locator(`[data-case-filter="${filter}"]`);
    if (filter === "controlled") {
      await button.focus();
      await page.keyboard.press("Enter");
    } else {
      await button.click();
    }
    observed[filter] = await page.locator(".library-case-card:visible").count();
    ensure(observed[filter] === count, `${filter}: expected ${count} visible cases`);
    ensure((await button.getAttribute("aria-pressed")) === "true", `${filter}: filter state is not exposed`);
    ensure(
      (await page.locator("#library-case-count").innerText()).includes(`${count} / 6`),
      `${filter}: live case count is stale`,
    );
  }

  const controlledHref = await page
    .locator('[data-case-id="zuoer-controlled"] .library-case-link')
    .getAttribute("href");
  ensure(controlledHref === "#capability-atlas", "controlled case does not bridge to local capability assets");
  ensure(
    (await page.locator('#overview .button-primary').getAttribute("href")) === "#research-map",
    "hero primary action does not lead to the research map",
  );
  const heroSecondaryHrefs = await page.locator('#overview .button-secondary').evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  ensure(
    JSON.stringify(heroSecondaryHrefs) === JSON.stringify(["#library", "#ecosystem"]),
    "hero secondary actions do not expose library and ecosystem routes",
  );

  const expectedMapHrefs = [
    "#library",
    "#ecosystem",
    "#case-gallery",
    "#our-case",
    "#capability-atlas",
    "#pipeline",
    "#stage15",
    "#stage2",
    "#stage4",
    "#stage5",
    "#stage5b",
    "#candidates",
    "#capability",
  ];
  const observedMapHrefs = await page.locator(".research-page-link").evaluateAll((links) =>
    links.map((link) => link.getAttribute("href")),
  );
  ensure(
    JSON.stringify(observedMapHrefs) === JSON.stringify(expectedMapHrefs),
    "research page map routes are incomplete or out of order",
  );
  for (const href of expectedMapHrefs) {
    ensure((await page.locator(href).count()) === 1, `${href}: mapped section is missing or duplicated`);
  }
  const reportLinks = page.locator(".research-report-list a");
  ensure((await reportLinks.count()) === 7, "research report center must expose seven reports");
  ensure(
    (await reportLinks.evaluateAll((links) =>
      links.every(
        (link) =>
          link.href.startsWith("https://github.com/yydshly/0827_githubcode_study/blob/main/") &&
          link.target === "_blank" &&
          link.rel.includes("noreferrer"),
      ),
    )),
    "research report links are not public, external, or safely targeted",
  );
  await page.goto(`${baseUrl}/#overview`, { waitUntil: "networkidle" });
  await page.locator('[data-library-status="ready"]').waitFor();
  let researchMapKeyboardFocus = false;
  for (let index = 0; index < 8; index += 1) {
    await page.keyboard.press("Tab");
    researchMapKeyboardFocus = await page.evaluate(
      () =>
        document.activeElement?.getAttribute("href") === "#research-map" &&
        document.activeElement.matches(":focus-visible"),
    );
    if (researchMapKeyboardFocus) break;
  }
  ensure(
    researchMapKeyboardFocus,
    "research map navigation does not expose keyboard focus",
  );

  const expectedEcosystem = { direct: 5, quality: 2, ecosystem: 2, all: 9 };
  const observedEcosystem = {};
  for (const [filter, count] of Object.entries(expectedEcosystem)) {
    const button = page.locator(`[data-ecosystem-filter="${filter}"]`);
    if (filter === "quality") {
      await button.focus();
      await page.keyboard.press("Enter");
    } else {
      await button.click();
    }
    observedEcosystem[filter] = await page.locator(".ecosystem-card:visible").count();
    ensure(observedEcosystem[filter] === count, `${filter}: expected ${count} visible ecosystem projects`);
    ensure((await button.getAttribute("aria-pressed")) === "true", `${filter}: ecosystem filter state is not exposed`);
    ensure(
      (await page.locator("#ecosystem-count").innerText()).includes(`${count} / 9`),
      `${filter}: ecosystem live count is stale`,
    );
  }
  ensure(
    (await page.locator('.top-nav a[href="#ecosystem"]').count()) === 1,
    "top navigation does not expose the ecosystem comparison",
  );
  ensure(
    (await page.locator('.top-nav a[href="#research-map"]').count()) === 1,
    "top navigation does not expose the research map",
  );
  ensure(consoleErrors.length === 0, "case-filter journey produced console errors");

  const researchReportCount = await reportLinks.count();
  await context.close();
  return {
    cases: { expected, observed, keyboardFilter: "controlled", controlledHref },
    ecosystem: { expected: expectedEcosystem, observed: observedEcosystem, keyboardFilter: "quality" },
    researchMap: {
      expectedPages: expectedMapHrefs.length,
      observedMapHrefs,
      reports: researchReportCount,
      heroPrimary: "#research-map",
      heroSecondaryHrefs,
      keyboardFocus: researchMapKeyboardFocus,
    },
    consoleErrors,
  };
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });

try {
  const surfaces = [];
  surfaces.push(
    await inspectSurface(browser, {
      name: "library-desktop-light",
      width: 1440,
      height: 1000,
      colorScheme: "light",
      mapScreenshot: "research-map-desktop.png",
      overviewScreenshot: "library-overview-desktop.png",
      ecosystemScreenshot: "ecosystem-desktop.png",
      caseScreenshot: "library-cases-desktop.png",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "library-tablet-dark",
      width: 768,
      height: 1024,
      colorScheme: "dark",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "library-mobile-light",
      width: 390,
      height: 844,
      colorScheme: "light",
      mapScreenshot: "research-map-mobile.png",
      overviewScreenshot: "library-overview-mobile.png",
      ecosystemScreenshot: "ecosystem-mobile.png",
      caseScreenshot: "library-cases-mobile.png",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "library-reduced-motion",
      width: 1024,
      height: 768,
      colorScheme: "light",
      reducedMotion: "reduce",
    }),
  );

  const report = {
    verifiedAt: new Date().toISOString(),
    url: baseUrl,
    revision: 12,
    status: "pass",
    inventory: {
      capabilities: 6,
      sourceTypes: 8,
      pipelineStages: 7,
      ecosystemLayers: 6,
      ecosystemProjects: 9,
      adoptionLayers: 5,
      cases: 6,
      researchMapPages: 13,
      researchReports: 7,
    },
    surfaces,
    caseJourney: await inspectCaseJourney(browser),
  };
  await writeFile(
    path.join(evidenceRoot, "library-validation.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
