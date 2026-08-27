(() => {
  const root = document.documentElement;
  const outputCanvas = document.querySelector("#output-canvas");
  const phaseTitle = document.querySelector("#phase-title");
  const scoreRing = document.querySelector("#score-ring");
  const scoreValue = document.querySelector("#score-value");
  const toolLog = document.querySelector("#tool-log-text");
  const toolMeta = document.querySelector("#tool-log-meta");
  const aktLabel = document.querySelector("#akt-label");
  const problemEdge = document.querySelector("#problem-edge");
  const objectMode = document.querySelector("#object-mode");
  const backendTitle = document.querySelector("#backend-title");
  const backendFile = document.querySelector("#backend-file");
  const backendIcon = document.querySelector("#backend-icon");
  const protocolButtons = [...document.querySelectorAll("[data-phase-button]")];
  const backendButtons = [...document.querySelectorAll("[data-backend]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  const backends = {
    drawio: {
      title: "draw.io · Live canvas",
      file: "figure.drawio",
      icon: "D",
      mode: "18 个 mxCell · 可编辑",
      tools: [
        "drawio_live_get_capabilities() → reconstruction_spec[5 regions]",
        "drawio_live_draw_sequence(18 ops, step_delay_ms=350)",
        "drawio_live_audit_figure() + drawio_live_screenshot() → 2 hard findings",
        "drawio_live_update_cell(\"node-akt\") + update edge → pass"
      ]
    },
    powerpoint: {
      title: "PowerPoint · Native objects",
      file: "figure.pptx",
      icon: "P",
      mode: "18 个 Shape / Connector · 可编辑",
      tools: [
        "powerpoint_get_capabilities() → backend=com | officejs | ooxml",
        "powerpoint_draw_sequence(18 ops, pacing=checkpoint)",
        "powerpoint_audit_figure(slide_index=1) + export preview → 2 findings",
        "powerpoint_update_shape(\"node-akt\") + connector repair → pass"
      ]
    },
    wps: {
      title: "WPS · Editable working copy",
      file: "figure-working-copy.pptx",
      icon: "W",
      mode: "18 个 OOXML 对象 · 可编辑",
      tools: [
        "powerpoint_status(host_application=\"wps\") → explicit target verification",
        "powerpoint_draw_sequence(18 ops, pacing=checkpoint)",
        "powerpoint_audit_figure(slide_index=1) + refresh verification → 2 findings",
        "powerpoint_update_shape(\"node-akt\") + powerpoint_refresh() → pass"
      ]
    }
  };

  const phases = {
    0: { title: "等待开始", score: 0, value: "—" },
    1: { title: "设计规格已生成", score: 28, value: "SPEC" },
    2: { title: "18 个对象已创建", score: 64, value: "18" },
    3: { title: "发现 2 个硬问题", score: 76, value: "7.6" },
    4: { title: "局部质量门通过", score: 97, value: "9.7" }
  };

  let backend = "drawio";
  let phase = 0;
  let timer = null;

  function announce(message) {
    const toast = document.querySelector("#toast");
    toast.textContent = message;
    toast.classList.add("visible");
    window.clearTimeout(announce.timer);
    announce.timer = window.setTimeout(() => toast.classList.remove("visible"), 1800);
  }

  function setPhase(nextPhase) {
    phase = Math.max(0, Math.min(4, Number(nextPhase)));
    outputCanvas.dataset.phase = String(phase);
    phaseTitle.textContent = phases[phase].title;
    scoreRing.style.setProperty("--score", String(phases[phase].score));
    scoreValue.textContent = phases[phase].value;

    protocolButtons.forEach((button) => {
      const buttonPhase = Number(button.dataset.phaseButton);
      button.classList.toggle("active", buttonPhase === phase);
      button.setAttribute("aria-current", buttonPhase === phase ? "step" : "false");
    });

    if (phase === 4) {
      aktLabel.textContent = "AKT";
      problemEdge.setAttribute("d", "M441 227V259");
      problemEdge.classList.remove("problem-edge");
    } else {
      aktLabel.textContent = "AKT?";
      problemEdge.setAttribute("d", "M441 227L472 269");
      problemEdge.classList.add("problem-edge");
    }

    toolLog.textContent = phase === 0
      ? "选择后端，然后点击“下一步”或“自动重播”。"
      : backends[backend].tools[phase - 1];
    toolMeta.textContent = phase === 3 ? "REVIEW FINDINGS" : phase === 4 ? "LOCAL GATE · PASS" : "WEB SIMULATION";
  }

  function setBackend(nextBackend) {
    if (!backends[nextBackend]) return;
    backend = nextBackend;
    const selected = backends[backend];
    backendTitle.textContent = selected.title;
    backendFile.textContent = selected.file;
    backendIcon.textContent = selected.icon;
    backendIcon.className = `app-icon ${backend === "powerpoint" ? "ppt" : backend === "wps" ? "wps" : ""}`;
    objectMode.textContent = selected.mode;
    backendButtons.forEach((button) => {
      const isActive = button.dataset.backend === backend;
      button.classList.toggle("active", isActive);
      button.setAttribute("aria-pressed", String(isActive));
    });
    setPhase(phase);
    announce(`已切换到 ${selected.title.split(" · ")[0]} 后端说明`);
  }

  async function replay() {
    window.clearTimeout(timer);
    setPhase(0);
    const delay = reducedMotion.matches ? 180 : 1050;
    for (let next = 1; next <= 4; next += 1) {
      await new Promise((resolve) => {
        timer = window.setTimeout(resolve, delay);
      });
      setPhase(next);
    }
  }

  backendButtons.forEach((button) => button.addEventListener("click", () => setBackend(button.dataset.backend)));
  protocolButtons.forEach((button) => button.addEventListener("click", () => setPhase(button.dataset.phaseButton)));
  document.querySelector("#next-step").addEventListener("click", () => setPhase(phase >= 4 ? 1 : phase + 1));
  document.querySelector("#replay-demo").addEventListener("click", replay);

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => {
        const isActive = item === button;
        item.classList.toggle("active", isActive);
        item.setAttribute("aria-pressed", String(isActive));
      });
      document.querySelectorAll("#scenario-grid [data-fit]").forEach((card) => {
        card.classList.toggle("is-hidden", filter !== "all" && card.dataset.fit !== filter);
      });
      announce(filter === "all" ? "已显示全部场景" : `已筛选：${button.textContent}`);
    });
  });

  const themeToggle = document.querySelector("#theme-toggle");
  function applyTheme(theme) {
    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(theme === "dark"));
    themeToggle.setAttribute("aria-label", theme === "dark" ? "切换到浅色主题" : "切换到深色主题");
  }

  let savedTheme = null;
  try { savedTheme = window.localStorage.getItem("scientific-illustrator-theme"); } catch (_) {}
  applyTheme(savedTheme || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
  themeToggle.addEventListener("click", () => {
    const next = root.dataset.theme === "dark" ? "light" : "dark";
    applyTheme(next);
    try { window.localStorage.setItem("scientific-illustrator-theme", next); } catch (_) {}
  });

  document.querySelector("#copy-prompt").addEventListener("click", async (event) => {
    const button = event.currentTarget;
    const text = document.querySelector("#prompt-text").textContent.trim();
    try {
      await navigator.clipboard.writeText(text);
    } catch (_) {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.append(textarea);
      textarea.select();
      document.execCommand("copy");
      textarea.remove();
    }
    const original = button.textContent;
    button.textContent = "已复制";
    announce("提示词已复制");
    window.setTimeout(() => { button.textContent = original; }, 1600);
  });

  setBackend("drawio");
  setPhase(0);
})();
