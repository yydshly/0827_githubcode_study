(() => {
  const root = document.documentElement;
  const themeToggle = document.getElementById("theme-toggle");
  const themeLabel = themeToggle?.querySelector("span");

  const readStoredTheme = () => {
    try {
      return localStorage.getItem("gateway-research-theme");
    } catch {
      return null;
    }
  };

  const writeStoredTheme = (theme) => {
    try {
      localStorage.setItem("gateway-research-theme", theme);
    } catch {
      // The page remains usable when storage is disabled.
    }
  };

  const setTheme = (theme, persist = false) => {
    const nextTheme = theme === "light" ? "light" : "dark";
    root.dataset.theme = nextTheme;
    if (themeToggle) {
      const isDark = nextTheme === "dark";
      themeToggle.setAttribute("aria-pressed", String(isDark));
      themeToggle.setAttribute("aria-label", isDark ? "切换到浅色主题" : "切换到深色主题");
      if (themeLabel) themeLabel.textContent = isDark ? "深色" : "浅色";
    }
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "dark" ? "#07111d" : "#f4f8fa");
    if (persist) writeStoredTheme(nextTheme);
  };

  const storedTheme = readStoredTheme();
  const systemTheme = window.matchMedia?.("(prefers-color-scheme: light)").matches ? "light" : "dark";
  setTheme(storedTheme || systemTheme);

  themeToggle?.addEventListener("click", () => {
    setTheme(root.dataset.theme === "dark" ? "light" : "dark", true);
  });

  const flowButtons = Array.from(document.querySelectorAll("[data-flow-mode]"));
  const flowViews = Array.from(document.querySelectorAll("[data-flow-view]"));
  const flowCaption = document.getElementById("flow-caption");
  const flowCopy = {
    direct: "<b>直连官方：</b>客户端直接持有官方配置，模型和供应商选择与客户端耦合，链路更短。",
    gateway: "<b>接入网关：</b>客户端工作方式不变，但供应商、模型、密钥和容错策略从客户端中解耦。"
  };

  const setFlowMode = (mode) => {
    flowButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.flowMode === mode));
    });
    flowViews.forEach((view) => {
      view.hidden = view.dataset.flowView !== mode;
    });
    if (flowCaption) flowCaption.innerHTML = flowCopy[mode] || flowCopy.gateway;
  };

  flowButtons.forEach((button) => {
    button.addEventListener("click", () => setFlowMode(button.dataset.flowMode));
  });

  const scenarios = {
    agent: {
      kicker: "推荐起点 / AGENT GATEWAY",
      title: "OpenCodex + LiteLLM",
      description: "上层保留 Codex / Claude Code 的 Agent 协议语义，下层统一供应商、密钥和失败回退。先做薄兼容层，不要让两层重复转换同一协议。",
      stack: ["Agent clients", "OpenCodex-like", "LiteLLM", "Providers"],
      active: 1,
      note: "<b>第一验证目标：</b>文本、流式、Tool Call、错误恢复和长上下文五类回归样例。"
    },
    team: {
      kicker: "推荐起点 / SHARED ENTERPRISE GATEWAY",
      title: "Agent Adapter + Higress",
      description: "保留一层轻量 Agent 语义适配，把鉴权、限流、路由、观测和 Kubernetes 流量治理交给 Higress；已有 Envoy 体系时再评估 Envoy AI Gateway。",
      stack: ["Agent clients", "Thin adapter", "Higress", "Authorized providers"],
      active: 2,
      note: "<b>第一验证目标：</b>租户隔离、全链路请求 ID、限流、上游故障切换与审计日志。"
    },
    platform: {
      kicker: "推荐起点 / MULTI-TENANT CONTROL PLANE",
      title: "Agent Gateway + New API / 自研控制面",
      description: "协议兼容层之外增加用户、虚拟 Key、渠道、额度和账单。New API 可用于研究产品控制面，但 AGPL-3.0、附加要求和上游授权必须先完成评估。",
      stack: ["Agent clients", "Agent gateway", "Tenant control plane", "Providers"],
      active: 2,
      note: "<b>第一验证目标：</b>正确计费、模型标识透明、支付与退款边界、上游授权和密钥安全。"
    },
    quality: {
      kicker: "推荐起点 / QUALITY DATA FLYWHEEL",
      title: "Agent Gateway + TensorZero",
      description: "网关维持客户端兼容，TensorZero 负责记录推理、反馈、评测、实验和路由优化，让模型选择逐步从静态规则变成有证据的决策。",
      stack: ["Agent clients", "Agent gateway", "TensorZero", "Models + feedback"],
      active: 2,
      note: "<b>第一验证目标：</b>统一 trace、可回放样本、质量标签、成本/延迟指标和受控 A/B 实验。"
    }
  };

  const scenarioButtons = Array.from(document.querySelectorAll("[data-scenario]"));
  const scenarioKicker = document.getElementById("scenario-kicker");
  const scenarioTitle = document.getElementById("scenario-title");
  const scenarioDescription = document.getElementById("scenario-description");
  const scenarioStack = document.getElementById("scenario-stack");
  const scenarioNote = document.getElementById("scenario-note");

  const setScenario = (key) => {
    const scenario = scenarios[key] || scenarios.agent;
    scenarioButtons.forEach((button) => {
      button.setAttribute("aria-pressed", String(button.dataset.scenario === key));
    });
    if (scenarioKicker) scenarioKicker.textContent = scenario.kicker;
    if (scenarioTitle) scenarioTitle.textContent = scenario.title;
    if (scenarioDescription) scenarioDescription.textContent = scenario.description;
    if (scenarioNote) scenarioNote.innerHTML = scenario.note;
    if (scenarioStack) {
      scenarioStack.replaceChildren();
      scenario.stack.forEach((label, index) => {
        const item = document.createElement("span");
        item.textContent = label;
        if (index === scenario.active) item.className = "active";
        scenarioStack.append(item);
        if (index < scenario.stack.length - 1) {
          const arrow = document.createElement("i");
          arrow.textContent = "→";
          arrow.setAttribute("aria-hidden", "true");
          scenarioStack.append(arrow);
        }
      });
      scenarioStack.setAttribute("aria-label", `推荐技术栈：${scenario.stack.join("，")}`);
    }
  };

  scenarioButtons.forEach((button) => {
    button.addEventListener("click", () => setScenario(button.dataset.scenario));
  });
})();
