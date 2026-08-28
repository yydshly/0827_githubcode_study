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
  const response = await page.goto(`${baseUrl}/#capability-atlas`, { waitUntil: "networkidle" });

  const cards = await page.locator(".capability-asset-card").count();
  const formal = await page.locator('[data-capability-status="formal-skill"]').count();
  const candidates = await page.locator('[data-capability-status="candidate-capability"]').count();
  const formalGates = await page
    .locator('[data-capability-id="incident"] .capability-maturity-track li[data-complete="true"]')
    .count();
  const candidateGates = await page
    .locator('[data-capability-id="learn"] .capability-maturity-track li[data-complete="true"]')
    .count();
  const demoStations = await page.locator(".stage5b-demo-path-button").count();
  const snapshotItems = await page.locator(".stage5b-demo-snapshot article").count();
  const stage5cGate = await page.locator(".stage5c-gate").count();
  const stage5cText = await page.locator(".stage5c-gate").textContent();
  const atlasText = await page.locator("#capability-atlas").textContent();
  const horizontalOverflow = await page.evaluate(
    () => document.documentElement.scrollWidth > document.documentElement.clientWidth,
  );
  const theme = await page.locator("html").getAttribute("data-theme");
  const reducedMotionMatches = await page.evaluate(() =>
    matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  ensure(response?.status() === 200, `${config.name}: expected HTTP 200`);
  ensure(cards === 4, `${config.name}: expected four capability assets`);
  ensure(formal === 1, `${config.name}: expected one formal skill`);
  ensure(candidates === 3, `${config.name}: expected three candidate capabilities`);
  ensure(formalGates === 6, `${config.name}: formal skill does not show six completed gates`);
  ensure(candidateGates === 1, `${config.name}: candidate maturity is overstated`);
  ensure(demoStations === 6, `${config.name}: best-demo six-station path is incomplete`);
  ensure(snapshotItems === 5, `${config.name}: best-demo value snapshot is incomplete`);
  ensure(stage5cGate === 1, `${config.name}: Stage 5C next gate is missing`);
  ensure(
    stage5cText.includes("当前 0 份组织案例") &&
      stage5cText.includes("组织外部效度仍保持未建立"),
    `${config.name}: Stage 5C pending boundary is overstated`,
  );
  ensure(
    atlasText.includes("必要输入") &&
      atlasText.includes("可交付结果") &&
      atlasText.includes("停止边界"),
    `${config.name}: capability contracts are incomplete`,
  );
  ensure(!horizontalOverflow, `${config.name}: horizontal overflow detected`);
  ensure(consoleErrors.length === 0, `${config.name}: console errors detected`);
  ensure(theme === config.colorScheme, `${config.name}: theme mismatch`);
  if (config.reducedMotion === "reduce") {
    ensure(reducedMotionMatches, `${config.name}: reduced-motion preference did not match`);
  }

  if (config.atlasScreenshot) {
    await page.locator("#capability-atlas").screenshot({
      path: path.join(evidenceRoot, config.atlasScreenshot),
    });
  }
  if (config.demoScreenshot) {
    await page.evaluate(() => {
      for (const node of document.querySelectorAll(".site-header, .skip-link")) {
        node.style.visibility = "hidden";
      }
    });
    await page.locator("#stage5b").screenshot({
      path: path.join(evidenceRoot, config.demoScreenshot),
    });
    await page.evaluate(() => {
      for (const node of document.querySelectorAll(".site-header, .skip-link")) {
        node.style.removeProperty("visibility");
      }
    });
  }

  await context.close();
  return {
    viewport: `${config.width}x${config.height}`,
    colorScheme: config.colorScheme,
    reducedMotion: config.reducedMotion || "no-preference",
    cards,
    formal,
    candidates,
    formalGates,
    candidateGates,
    demoStations,
    snapshotItems,
    stage5cGate,
    horizontalOverflow,
    consoleErrors,
  };
}

async function inspectJourney(browser) {
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
  await page.goto(`${baseUrl}/#capability-atlas`, { waitUntil: "networkidle" });

  await page.locator('[data-capability-action="learn"]').click();
  await page.locator("#skill-output.skill-output-complete").waitFor();
  ensure(
    (await page.locator("#skill-output-title").innerText()).includes("技术学习规划"),
    "candidate capability action did not run the learning protocol",
  );
  ensure(
    (await page.evaluate(() => window.__cangjieDemo.getState().lastSkillRoute)) === "learn",
    "candidate capability action did not update the route state",
  );

  await page.locator('[data-capability-action="incident"]').click();
  ensure(
    (await page.locator('.stage5b-mode-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-mode-full_review",
    "formal skill action did not reset the full-review route",
  );
  ensure(
    (await page.locator('.stage5b-step-button[aria-selected="true"]').getAttribute("id")) ===
      "stage5b-step-01",
    "formal skill action did not reset the audit journey",
  );

  await page.locator('[data-demo-target="route"]').click();
  await page.waitForFunction(
    () => document.activeElement?.id === "stage5b-mode-full_review",
  );
  ensure(
    (await page.evaluate(() => document.activeElement?.id)) === "stage5b-mode-full_review",
    "route station did not move focus to the routing control",
  );

  const stationChecks = [
    ["evidence", "ledger"],
    ["cause", "causes"],
    ["action", "actions"],
    ["closure", "closure"],
  ];
  for (const [target, kind] of stationChecks) {
    await page.locator(`[data-demo-target="${target}"]`).click();
    await page.waitForFunction(
      () => document.activeElement?.id === "stage5b-step-panel",
    );
    ensure(
      (await page.locator("#stage5b-step-panel").getAttribute("data-step-kind")) === kind,
      `${target} station mapped to the wrong audit output`,
    );
    ensure(
      (await page.evaluate(() => document.activeElement?.id)) === "stage5b-step-panel",
      `${target} station did not focus the output panel`,
    );
  }

  await page.locator("#stage5b-demo-conclusion").click();
  const conclusion = await page.locator("#stage5b-step-panel").innerText();
  ensure(
    conclusion.includes("尚未形成学习闭环") && conclusion.includes("86 / 100"),
    "best-demo conclusion did not expose the evidence-based verdict",
  );
  ensure(consoleErrors.length === 0, "best-demo journey produced console errors");

  await context.close();
  return {
    candidateAction: "learn -> 技术学习规划",
    formalAction: "incident -> full_review / output 01",
    stations: stationChecks.map(([target]) => target),
    conclusion: "尚未形成学习闭环",
    score: 86,
    focusManaged: true,
    consoleErrors,
  };
}

const { chromium } = await loadPlaywright();
const browser = await chromium.launch({ headless: true });

try {
  const surfaces = [];
  surfaces.push(
    await inspectSurface(browser, {
      name: "showcase-desktop-light",
      width: 1440,
      height: 1000,
      colorScheme: "light",
      atlasScreenshot: "capability-atlas-desktop.png",
      demoScreenshot: "best-demo-desktop.png",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "showcase-tablet-dark",
      width: 768,
      height: 1024,
      colorScheme: "dark",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "showcase-mobile-light",
      width: 390,
      height: 844,
      colorScheme: "light",
      atlasScreenshot: "capability-atlas-mobile.png",
      demoScreenshot: "best-demo-mobile.png",
    }),
  );
  surfaces.push(
    await inspectSurface(browser, {
      name: "showcase-reduced-motion",
      width: 1024,
      height: 768,
      colorScheme: "light",
      reducedMotion: "reduce",
    }),
  );

  const report = {
    verifiedAt: new Date().toISOString(),
    url: baseUrl,
    revision: 9,
    status: "pass",
    capabilityInventory: {
      total: 4,
      formalSkills: 1,
      candidateCapabilities: 3,
      maturityGates: 6,
    },
    nextGate: {
      stage: "5C",
      intakeInfrastructureReady: true,
      organizationCases: 0,
      organizationExternalValidity: false,
    },
    surfaces,
    journey: await inspectJourney(browser),
  };
  await writeFile(
    path.join(evidenceRoot, "showcase-validation.json"),
    `${JSON.stringify(report, null, 2)}\n`,
    "utf8",
  );
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
