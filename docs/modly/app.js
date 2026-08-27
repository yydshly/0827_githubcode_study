window.__consoleErrors = [];
window.addEventListener("error", (event) => {
  window.__consoleErrors.push(event.message || "Unknown browser error");
});
window.addEventListener("unhandledrejection", (event) => {
  window.__consoleErrors.push(String(event.reason || "Unhandled promise rejection"));
});

const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");

function setMenu(open) {
  if (!navToggle || !navLinks) return;
  navToggle.setAttribute("aria-expanded", String(open));
  navLinks.classList.toggle("open", open);
  const label = navToggle.querySelector(".sr-only");
  if (label) label.textContent = open ? "关闭导航" : "打开导航";
}

navToggle?.addEventListener("click", () => {
  setMenu(navToggle.getAttribute("aria-expanded") !== "true");
});

navLinks?.addEventListener("click", (event) => {
  if (event.target.closest("a")) setMenu(false);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") setMenu(false);
});

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -36px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const filterButtons = document.querySelectorAll(".filter-button");
const modelCards = document.querySelectorAll(".model-card");
const filterStatus = document.querySelector("#filterStatus");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const filter = button.dataset.filter;
    let visibleCount = 0;

    filterButtons.forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });

    modelCards.forEach((card) => {
      const show = filter === "all" || card.dataset.category === filter;
      card.hidden = !show;
      if (show) visibleCount += 1;
    });

    if (filterStatus) filterStatus.textContent = `正在显示 ${visibleCount} 个候选`;
  });
});

const plans = {
  nogpu: {
    kicker: "NO LOCAL GPU",
    title: "先接一个云端 API，不下载模型",
    body: "用 Meshy、Tripo 或 Rodin 跑一批真实业务图片，先确认“生成出的资产是否真的节省人工建模时间”。本机只需要浏览器和 3D 预览能力。",
    stack: ["主方案：Tripo / Meshy / Rodin", "本地：仅工作流与预览", "目标：验证业务价值"],
    next: "准备 30 张有代表性的图片，记录正背面一致性、网格质量、PBR、失败率、耗时和单次成本。"
  },
  eight: {
    kicker: "8 GB VRAM / ENTRY LOCAL",
    title: "建立“快速 + 几何”两条本地通道",
    body: "先用 Hunyuan3D Mini Fast 获得草模，再用 TripoSG 验证几何质量；如果设备与量化版本匹配，再补 TRELLIS.2 GGUF。不要一开始安装所有大模型。",
    stack: ["快速：Hunyuan Mini Fast", "几何：TripoSG", "候选：TRELLIS.2 GGUF Q4"],
    next: "先检查 NVIDIA 驱动、CUDA 和可用显存；用 10 个样本确认运行稳定，再扩展到完整评测集。"
  },
  sixteen: {
    kicker: "12–16 GB VRAM / WORKABLE",
    title: "以 TRELLIS.2 GGUF 为本地主力",
    body: "这一档更适合建立可用的本地工作流：TRELLIS.2 GGUF 承担质量与纹理，TripoSG 承担几何对照，SPAR3D 可作为下一项优先适配。",
    stack: ["质量：TRELLIS.2 GGUF", "几何：TripoSG", "扩展优先：SPAR3D"],
    next: "固定分辨率、量化精度和面数上限，测峰值显存与下游清理时间；不要只比较渲染图。"
  },
  pro: {
    kicker: "24 GB+ / PRO WORKSTATION",
    title: "再评估官方大模型，而不是只追求能跑",
    body: "可以比较官方 TRELLIS.2 4B、Hunyuan3D 2.1 和量化路线，重点观察 PBR、复杂拓扑、稳定性以及更高分辨率是否真的减少人工处理。",
    stack: ["高保真：TRELLIS.2 4B", "完整管线：Hunyuan3D 2.1", "基线：TRELLIS.2 GGUF"],
    next: "用同一批难例比较官方与量化版本，并把生成时间、显存、材质完整性和清理成本纳入结论。"
  },
  scene: {
    kicker: "CLUTTERED SCENE / OCCLUSION",
    title: "问题重点从“生成”转为“目标提取 + 重建”",
    body: "普通单物体图生 3D 模型不一定适合杂乱照片。优先评估 SAM 3D Objects，或先做可靠分割和去背景，再把干净目标交给 TripoSG、SPAR3D 或 TRELLIS。",
    stack: ["目标提取：SAM 3D Objects", "通用重建：SPAR3D / TRELLIS", "必要输入：mask / 多视图"],
    next: "构建包含遮挡、小物体和多目标的专门样本集，把目标分割错误与 3D 重建错误分开记录。"
  }
};

const planButtons = document.querySelectorAll(".decision-button");
const resultKicker = document.querySelector("#resultKicker");
const resultTitle = document.querySelector("#resultTitle");
const resultBody = document.querySelector("#resultBody");
const resultStack = document.querySelector("#resultStack");
const resultNext = document.querySelector("#resultNext");

function renderPlan(planKey) {
  const plan = plans[planKey];
  if (!plan) return;
  if (resultKicker) resultKicker.textContent = plan.kicker;
  if (resultTitle) resultTitle.textContent = plan.title;
  if (resultBody) resultBody.textContent = plan.body;
  if (resultStack) resultStack.innerHTML = plan.stack.map((item) => `<span>${item}</span>`).join("");
  if (resultNext) resultNext.textContent = plan.next;
}

planButtons.forEach((button) => {
  button.addEventListener("click", () => {
    planButtons.forEach((candidate) => {
      const isActive = candidate === button;
      candidate.classList.toggle("active", isActive);
      candidate.setAttribute("aria-pressed", String(isActive));
    });
    renderPlan(button.dataset.plan);
  });
});

const observedSections = document.querySelectorAll("main section[id]");
const anchoredNavLinks = Array.from(document.querySelectorAll('.nav-links a[href^="#"]'));
if ("IntersectionObserver" in window) {
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;
      anchoredNavLinks.forEach((link) => {
        const matches = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("active", matches);
      });
    },
    { rootMargin: "-30% 0px -55%", threshold: [0, 0.15, 0.35] }
  );
  observedSections.forEach((section) => sectionObserver.observe(section));
}
