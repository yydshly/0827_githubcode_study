(() => {
  const runButton = document.querySelector("#run-real-demo");
  if (!runButton) return;

  const runtimeStatus = document.querySelector("#runtime-status");
  const runtimeDetail = document.querySelector("#runtime-detail");
  const liveRegion = document.querySelector("#real-demo-live");
  const traceList = document.querySelector("#real-trace-list");
  const traceModeLabel = document.querySelector("#trace-mode-label");
  const rawResult = document.querySelector("#raw-tool-result");
  const preview = document.querySelector("#actual-preview");
  const download = document.querySelector("#download-real-artifact");
  const artifactMeta = document.querySelector("#artifact-meta");
  const proofValid = document.querySelector("#proof-valid");
  const proofObjects = document.querySelector("#proof-objects");
  const proofPatch = document.querySelector("#proof-patch");
  const proofRaster = document.querySelector("#proof-raster");
  const stageRows = [...document.querySelectorAll("[data-real-stage]")];
  const ns = "http://www.w3.org/2000/svg";
  let runtimeMode = "checking";
  const verifiedArtifactUrl = "./generated/lnp-mrna-antigen-presentation.drawio";
  const verifiedCaseTitle = "LNP-mediated mRNA delivery and MHC-I antigen presentation";
  const verifiedTools = [
    "drawio_create_diagram",
    "drawio_validate",
    "drawio_inspect",
    "drawio_update_cells",
    "drawio_validate",
    "drawio_inspect",
  ];

  function parseDrawioArtifact(xmlText) {
    const documentXml = new DOMParser().parseFromString(xmlText, "application/xml");
    if (documentXml.querySelector("parsererror")) throw new Error("终稿 XML 无法解析");
    const model = documentXml.querySelector("mxGraphModel");
    if (!model) throw new Error("终稿缺少 mxGraphModel");

    const allCells = [...model.querySelectorAll("mxCell")];
    const cells = allCells.flatMap((node) => {
      const isVertex = node.getAttribute("vertex") === "1";
      const isEdge = node.getAttribute("edge") === "1";
      if (!isVertex && !isEdge) return [];
      const geometryNode = [...node.children].find((child) => child.localName === "mxGeometry");
      return [{
        id: node.getAttribute("id") || "",
        type: isVertex ? "vertex" : "edge",
        label: node.getAttribute("value") || "",
        style: node.getAttribute("style") || "",
        source: node.getAttribute("source") || undefined,
        target: node.getAttribute("target") || undefined,
        geometry: geometryNode ? {
          x: Number(geometryNode.getAttribute("x") || 0),
          y: Number(geometryNode.getAttribute("y") || 0),
          width: Number(geometryNode.getAttribute("width") || 0),
          height: Number(geometryNode.getAttribute("height") || 0),
        } : {},
      }];
    });

    return {
      cells,
      totalCells: allCells.length,
      canvas: {
        width: Number(model.getAttribute("pageWidth") || 1280),
        height: Number(model.getAttribute("pageHeight") || 760),
      },
    };
  }

  function renderVerifiedTrace() {
    traceList.replaceChildren();
    verifiedTools.forEach((tool, index) => {
      const item = document.createElement("li");
      item.innerHTML = "<span></span><div><code></code><small></small></div><strong></strong>";
      item.querySelector("span").textContent = String(index + 1).padStart(2, "0");
      item.querySelector("code").textContent = tool;
      item.querySelector("small").textContent = "已验证调用记录 · 详见 VALIDATION.md";
      item.querySelector("strong").textContent = "VERIFIED";
      traceList.append(item);
      setStageState(index, "pass", "已验证");
    });
  }

  async function showVerifiedArtifact() {
    runButton.disabled = true;
    runButton.textContent = "正在加载已验证终稿…";
    try {
      const response = await fetch(verifiedArtifactUrl, { cache: "no-store" });
      if (!response.ok) throw new Error("HTTP " + response.status);
      const xmlText = await response.text();
      const parsed = parseDrawioArtifact(xmlText);
      traceModeLabel.textContent = "已验证的真实调用记录";
      const vertices = parsed.cells.filter((cell) => cell.type === "vertex");
      const edges = parsed.cells.filter((cell) => cell.type === "edge");
      const rasterImages = vertices.filter((cell) => /(?:shape=image|image=)/.test(cell.style)).length;
      const bytes = new Blob([xmlText]).size;

      renderDiagram(parsed.cells, parsed.canvas);
      renderVerifiedTrace();
      proofValid.textContent = "VALID";
      proofObjects.textContent = vertices.length + " 节点 / " + edges.length + " 连线";
      proofPatch.textContent = "3 项已应用";
      proofRaster.textContent = rasterImages + " 张";
      artifactMeta.textContent = verifiedCaseTitle + " · " + bytes + " bytes · " + parsed.totalCells + " cells · verified-2026-08-27";
      download.href = verifiedArtifactUrl;
      download.removeAttribute("aria-disabled");
      download.removeAttribute("tabindex");
      rawResult.textContent = JSON.stringify({
        mode: "verified_static_artifact",
        real_execution: false,
        validated_locally: true,
        evidence: "studies/scientific-illustrator/VALIDATION.md",
        executed_tools: verifiedTools,
        proof: {
          final_valid: true,
          cells: parsed.totalCells,
          vertices: vertices.length,
          edges: edges.length,
          raster_images: rasterImages,
          patches_applied: 3,
          label_before: "MHC-I ?",
          label_after: "MHC-I peptide complex",
          outcome_width_before: 128,
          outcome_width_after: 156,
        },
        artifact: { url: verifiedArtifactUrl, bytes },
      }, null, 2);
      setRuntime("pass", "已加载真实终稿", "GitHub Pages 静态证据 · 实时重跑请启动本地 Node bridge");
      liveRegion.textContent = "已加载经过真实 MCP 验证的 LNP–mRNA 终稿；当前为静态证据模式。";
      runButton.textContent = "重新加载已验证终稿";
    } catch (error) {
      setRuntime("offline", "终稿加载失败", "请检查静态产物：" + error.message);
      traceList.innerHTML = "<li class=\"trace-error\">已验证终稿无法加载。</li>";
      rawResult.textContent = JSON.stringify({ mode: "verified_static_artifact", error: error.message }, null, 2);
      runButton.textContent = "重试加载终稿";
    } finally {
      runButton.disabled = false;
    }
  }

  function setRuntime(state, label, detail) {
    runtimeStatus.dataset.state = state;
    runtimeStatus.querySelector("span").textContent = label;
    runtimeDetail.textContent = detail;
  }

  function setStageState(index, state, label) {
    const row = stageRows[index];
    if (!row) return;
    row.dataset.state = state;
    row.querySelector("[data-stage-result]").textContent = label;
  }

  function resetStages() {
    stageRows.forEach((row) => {
      row.dataset.state = "pending";
      row.querySelector("[data-stage-result]").textContent = "等待";
    });
  }

  function parseStyle(style = "") {
    return Object.fromEntries(
      String(style)
        .split(";")
        .filter((entry) => entry.includes("="))
        .map((entry) => {
          const splitAt = entry.indexOf("=");
          return [entry.slice(0, splitAt), entry.slice(splitAt + 1)];
        }),
    );
  }

  function appendSvg(tag, attributes, parent = preview) {
    const element = document.createElementNS(ns, tag);
    Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, String(value)));
    parent.append(element);
    return element;
  }

  function center(cell) {
    const geometry = cell.geometry || {};
    return {
      x: Number(geometry.x || 0) + Number(geometry.width || 0) / 2,
      y: Number(geometry.y || 0) + Number(geometry.height || 0) / 2,
    };
  }

  function renderDiagram(cells, canvas = {}) {
    const canvasWidth = Number(canvas.width || 1280);
    const canvasHeight = Number(canvas.height || 760);
    preview.replaceChildren();
    preview.setAttribute("viewBox", `0 0 ${canvasWidth} ${canvasHeight}`);

    const defs = appendSvg("defs", {});
    const marker = appendSvg("marker", {
      id: "actual-arrow",
      viewBox: "0 0 10 10",
      refX: "9",
      refY: "5",
      markerWidth: "7",
      markerHeight: "7",
      orient: "auto-start-reverse",
    }, defs);
    appendSvg("path", { d: "M 0 0 L 10 5 L 0 10 z", fill: "context-stroke" }, marker);

    const vertices = cells.filter((cell) => cell.type === "vertex");
    const edges = cells.filter((cell) => cell.type === "edge");
    const byId = new Map(vertices.map((cell) => [cell.id, cell]));

    edges.forEach((edge) => {
      const source = byId.get(edge.source);
      const target = byId.get(edge.target);
      if (!source || !target) return;
      const start = center(source);
      const end = center(target);
      const style = parseStyle(edge.style);
      appendSvg("line", {
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y,
        stroke: style.strokeColor || "#3b5f58",
        "stroke-width": style.strokeWidth || 2.4,
        "stroke-dasharray": style.dashed === "1" ? "8 6" : "none",
        "marker-end": style.endArrow === "none" ? "none" : "url(#actual-arrow)",
        class: "actual-edge",
      });
    });

    vertices.forEach((cell) => {
      const geometry = cell.geometry || {};
      const x = Number(geometry.x || 0);
      const y = Number(geometry.y || 0);
      const width = Number(geometry.width || 0);
      const height = Number(geometry.height || 0);
      const style = parseStyle(cell.style);
      const group = appendSvg("g", { "data-cell-id": cell.id });
      const isText = String(cell.style).startsWith("text;");
      const isEllipse = String(cell.style).includes("ellipse;");

      if (!isText) {
        if (isEllipse) {
          appendSvg("ellipse", {
            cx: x + width / 2,
            cy: y + height / 2,
            rx: width / 2,
            ry: height / 2,
            fill: style.fillColor || "#e7eef9",
            stroke: style.strokeColor || "#5178a5",
            "stroke-width": style.strokeWidth || 2,
            "stroke-dasharray": style.dashed === "1" ? "8 6" : "none",
          }, group);
        } else {
          appendSvg("rect", {
            x,
            y,
            width,
            height,
            rx: style.rounded === "1" ? Math.min(18, height / 3) : 2,
            fill: style.fillColor || "#e7eef9",
            stroke: style.strokeColor || "#5178a5",
            "fill-opacity": cell.id.startsWith("zone-") ? .2 : 1,
            "stroke-width": style.strokeWidth || 2,
            "stroke-dasharray": style.dashed === "1" ? "8 6" : "none",
          }, group);
        }
      }

      if (cell.label) {
        const fontSize = Number(style.fontSize || (cell.id === "__figure_title__" ? 22 : 15));
        const lines = String(cell.label).split(/\n|<br\s*\/?>/i);
        const lineHeight = fontSize * 1.16;
        const text = appendSvg("text", {
          x: x + width / 2,
          y: y + height / 2 - ((lines.length - 1) * lineHeight) / 2,
          "text-anchor": "middle",
          "dominant-baseline": "middle",
          fill: style.fontColor || "#17312d",
          "font-size": fontSize,
          "font-weight": style.fontStyle === "1" ? 700 : 600,
          class: "actual-label",
        }, group);
        lines.forEach((line, index) => {
          const tspan = appendSvg("tspan", {
            x: x + width / 2,
            dy: index === 0 ? 0 : lineHeight,
          }, text);
          tspan.textContent = line;
        });
      }
    });
  }

  function renderTrace(result) {
    traceList.replaceChildren();
    result.trace.forEach((entry, index) => {
      const item = document.createElement("li");
      item.innerHTML = `<span>${String(index + 1).padStart(2, "0")}</span><div><code></code><small></small></div><strong></strong>`;
      item.querySelector("code").textContent = entry.tool;
      item.querySelector("small").textContent = JSON.stringify(entry.input);
      item.querySelector("strong").textContent = `${entry.elapsed_ms} ms`;
      traceList.append(item);
      setStageState(index, "pass", `${entry.elapsed_ms} ms`);
    });
    rawResult.textContent = JSON.stringify({
      run_id: result.run_id,
      server: result.server,
      executed_tools: result.executed_tools,
      case_study: result.case_study,
      proof: result.proof,
      artifact: result.artifact,
    }, null, 2);
  }

  function renderProof(result) {
    const page = result.proof.pages?.[0] || {};
    proofValid.textContent = result.proof.final_valid ? "VALID" : "FAILED";
    proofObjects.textContent = `${page.vertices || 0} 节点 / ${page.edges || 0} 连线`;
    proofPatch.textContent = `${result.proof.patches_applied || 0} 项已应用`;
    proofRaster.textContent = `${page.raster_images || 0} 张`;
    artifactMeta.textContent = `${result.case_study.title} · ${result.artifact.bytes} bytes · ${page.cells || 0} cells · ${result.run_id}`;
    download.href = result.artifact.url;
    download.removeAttribute("aria-disabled");
    download.removeAttribute("tabindex");
  }

  async function checkHealth() {
    try {
      const response = await fetch("/api/scientific-illustrator/health", { cache: "no-store" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      const data = await response.json();
      runtimeMode = "live";
      setRuntime("ready", "真实 MCP 已连接", `${data.server.name} v${data.server.version} · ${data.tool_count} 个文件工具`);
      traceModeLabel.textContent = "本次实际 tool call";
    } catch (error) {
      runtimeMode = "verified";
      await showVerifiedArtifact();
    }
  }

  async function runDemo() {
    if (runtimeMode === "verified") return showVerifiedArtifact();
    runButton.disabled = true;
    runButton.textContent = "正在调用上游 MCP…";
    download.setAttribute("aria-disabled", "true");
    download.setAttribute("tabindex", "-1");
    resetStages();
    traceList.innerHTML = "<li class=\"trace-waiting\">请求正在由本地 Node bridge 发送给上游 server.mjs…</li>";
    rawResult.textContent = "等待真实 tool result…";
    liveRegion.textContent = "真实 MCP 演示正在执行。";
    setRuntime("running", "正在执行真实调用", "浏览器已 POST /api/scientific-illustrator/run");
    stageRows[0].dataset.state = "running";
    stageRows[0].querySelector("[data-stage-result]").textContent = "执行中";

    try {
      const response = await fetch("/api/scientific-illustrator/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}",
      });
      const contentType = response.headers.get("content-type") || "";
      const result = contentType.includes("application/json")
        ? await response.json()
        : { ok: false, real_execution: false, error: `演示 API 不可用（HTTP ${response.status}），请执行 node studies/scientific-illustrator/demo-server.mjs` };
      if (!response.ok || !result.ok || !result.real_execution) {
        throw new Error(result.error || `HTTP ${response.status}`);
      }
      renderTrace(result);
      renderProof(result);
      renderDiagram(result.diagram.cells || [], result.case_study.canvas);
      setRuntime("pass", "真实执行通过", `${result.executed_tools.length} 次 MCP tool call · 最终校验 ${result.proof.final_valid ? "通过" : "失败"}`);
      liveRegion.textContent = `${result.case_study.title} 构建完成：${result.proof.pages?.[0]?.vertices || 0} 个可编辑节点、${result.proof.pages?.[0]?.edges || 0} 条连接线、${result.proof.patches_applied || 0} 项审阅修正。`;
      runButton.textContent = "重新构建完整案例";
    } catch (error) {
      stageRows.forEach((row) => {
        if (row.dataset.state !== "pass") {
          row.dataset.state = "error";
          row.querySelector("[data-stage-result]").textContent = "未完成";
        }
      });
      traceList.innerHTML = "";
      const item = document.createElement("li");
      item.className = "trace-error";
      item.textContent = `真实调用失败：${error.message}`;
      traceList.append(item);
      rawResult.textContent = JSON.stringify({ ok: false, real_execution: false, error: error.message }, null, 2);
      setRuntime("error", "真实执行失败", error.message);
      liveRegion.textContent = `真实 MCP 演示失败：${error.message}`;
      runButton.textContent = "重试真实演示";
    } finally {
      runButton.disabled = false;
    }
  }

  runButton.addEventListener("click", runDemo);
  download.addEventListener("click", (event) => {
    if (download.getAttribute("aria-disabled") === "true") event.preventDefault();
  });
  checkHealth();
})();
