#!/usr/bin/env node

import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createInterface } from "node:readline";
import { promises as fs } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { caseStudy } from "./case-spec.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(here, "..", "..");
const docsRoot = path.join(repositoryRoot, "docs");
const publicRoot = path.join(docsRoot, "scientific-illustrator");
const generatedRoot = path.join(publicRoot, "generated");
const outputPath = path.join(generatedRoot, caseStudy.outputFilename);
const mcpScript = path.join(
  here,
  "upstream",
  "plugins",
  "scientific-illustrator",
  "scripts",
  "server.mjs",
);
const port = Number(process.env.SCIENTIFIC_ILLUSTRATOR_DEMO_PORT || 8879);

const mimeTypes = new Map([
  [".html", "text/html; charset=utf-8"],
  [".css", "text/css; charset=utf-8"],
  [".js", "text/javascript; charset=utf-8"],
  [".mjs", "text/javascript; charset=utf-8"],
  [".json", "application/json; charset=utf-8"],
  [".svg", "image/svg+xml"],
  [".png", "image/png"],
  [".jpg", "image/jpeg"],
  [".drawio", "application/vnd.jgraph.mxfile"],
  [".md", "text/markdown; charset=utf-8"],
]);

class McpClient {
  constructor(scriptPath) {
    this.scriptPath = scriptPath;
    this.child = null;
    this.nextId = 1;
    this.pending = new Map();
    this.stderr = [];
    this.serverInfo = null;
    this.tools = [];
  }

  async start() {
    if (this.child && this.child.exitCode === null) return;

    this.child = spawn(process.execPath, [this.scriptPath], {
      cwd: path.dirname(this.scriptPath),
      stdio: ["pipe", "pipe", "pipe"],
      windowsHide: true,
    });

    const stdout = createInterface({ input: this.child.stdout, crlfDelay: Infinity });
    stdout.on("line", (line) => {
      let message;
      try {
        message = JSON.parse(line);
      } catch {
        return;
      }
      const waiting = this.pending.get(message.id);
      if (!waiting) return;
      this.pending.delete(message.id);
      if (message.error) waiting.reject(new Error(message.error.message));
      else waiting.resolve(message.result);
    });

    this.child.stderr.setEncoding("utf8");
    this.child.stderr.on("data", (chunk) => {
      this.stderr.push(String(chunk).trim());
      if (this.stderr.length > 20) this.stderr.shift();
    });

    this.child.on("exit", (code) => {
      const error = new Error(`MCP process exited with code ${code}`);
      for (const waiting of this.pending.values()) waiting.reject(error);
      this.pending.clear();
      this.child = null;
      this.serverInfo = null;
      this.tools = [];
    });

    const initialized = await this.request("initialize", {
      protocolVersion: "2025-06-18",
      capabilities: {},
      clientInfo: { name: "scientific-illustrator-web-demo", version: "1.0.0" },
    });
    this.serverInfo = initialized.serverInfo;
    const listed = await this.request("tools/list", {});
    this.tools = listed.tools || [];
  }

  request(method, params) {
    if (!this.child || this.child.exitCode !== null) {
      return Promise.reject(new Error("MCP process is not running"));
    }
    const id = this.nextId++;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`MCP request timed out: ${method}`));
      }, 30000);
      this.pending.set(id, {
        resolve: (value) => { clearTimeout(timeout); resolve(value); },
        reject: (error) => { clearTimeout(timeout); reject(error); },
      });
      this.child.stdin.write(`${JSON.stringify({ jsonrpc: "2.0", id, method, params })}\n`);
    });
  }

  async call(name, args) {
    const result = await this.request("tools/call", { name, arguments: args });
    if (result?.isError) {
      throw new Error(result.structuredContent?.error || result.content?.[0]?.text || `${name} failed`);
    }
    return result?.structuredContent ?? JSON.parse(result?.content?.[0]?.text || "null");
  }

  close() {
    this.child?.kill();
  }
}

const mcp = new McpClient(mcpScript);
let demoQueue = Promise.resolve();


function summarize(name, result) {
  if (name === "drawio_create_diagram") {
    return { output_path: result.output_path, bytes: result.bytes, validation: result.validation };
  }
  if (name === "drawio_validate") {
    return {
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      pages: result.pages,
      cells: result.cells,
      vertices: result.vertices,
      edges: result.edges,
      raster_images: result.raster_images,
    };
  }
  if (name === "drawio_inspect") {
    return {
      valid: result.valid,
      errors: result.errors,
      warnings: result.warnings,
      pages: result.pages,
    };
  }
  return result;
}

async function tracedCall(trace, name, args, inputSummary) {
  const started = performance.now();
  const result = await mcp.call(name, args);
  trace.push({
    tool: name,
    elapsed_ms: Math.round(performance.now() - started),
    input: inputSummary,
    result: summarize(name, result),
  });
  return result;
}

async function runRealDemo() {
  await mcp.start();
  await fs.mkdir(generatedRoot, { recursive: true });
  const startedAt = new Date().toISOString();
  const trace = [];

  const createResult = await tracedCall(trace, "drawio_create_diagram", {
    output_path: outputPath,
    workflow_context: "explicit-file-only-request",
    title: caseStudy.title,
    page_name: caseStudy.pageName,
    canvas: caseStudy.canvas,
    vertices: caseStudy.vertices,
    edges: caseStudy.edges,
    overwrite: true,
  }, { case: caseStudy.slug, vertices: caseStudy.vertices.length, edges: caseStudy.edges.length, workflow_context: "explicit-file-only-request" });

  const firstValidation = await tracedCall(trace, "drawio_validate", {
    input_path: outputPath,
  }, { input_path: `generated/${caseStudy.outputFilename}`, gate: "draft-structure" });

  const before = await tracedCall(trace, "drawio_inspect", {
    input_path: outputPath,
    max_cells: 100,
  }, { max_cells: 100, purpose: "review MHC-I label, presentation route and outcome geometry" });

  const update = await tracedCall(trace, "drawio_update_cells", {
    input_path: outputPath,
    patches: caseStudy.corrections,
  }, { patches: caseStudy.corrections.map((patch) => `${patch.id}: ${Object.keys(patch).filter((key) => key !== "id").join("+")}`) });

  const finalValidation = await tracedCall(trace, "drawio_validate", {
    input_path: outputPath,
  }, { input_path: `generated/${caseStudy.outputFilename}`, gate: "final" });

  const after = await tracedCall(trace, "drawio_inspect", {
    input_path: outputPath,
    max_cells: 100,
  }, { max_cells: 100, purpose: "render final editable object inventory" });

  const stat = await fs.stat(outputPath);
  const finalCells = after.pages?.[0]?.cells || [];
  const beforeCells = before.pages?.[0]?.cells || [];
  const beforeMhc = beforeCells.find((cell) => cell.id === "node-mhc");
  const afterMhc = finalCells.find((cell) => cell.id === "node-mhc");
  const beforeActivation = beforeCells.find((cell) => cell.id === "node-activation");
  const afterActivation = finalCells.find((cell) => cell.id === "node-activation");

  return {
    ok: true,
    real_execution: true,
    run_id: `mcp-${Date.now()}`,
    started_at: startedAt,
    finished_at: new Date().toISOString(),
    server: mcp.serverInfo,
    available_tools: mcp.tools.length,
    executed_tools: trace.map((entry) => entry.tool),
    trace,
    artifact: {
      url: `/scientific-illustrator/generated/${caseStudy.outputFilename}`,
      absolute_path: outputPath,
      bytes: stat.size,
      mime: "application/vnd.jgraph.mxfile",
    },
    proof: {
      initial_valid: firstValidation.valid,
      final_valid: finalValidation.valid,
      errors: finalValidation.errors,
      warnings: finalValidation.warnings,
      pages: finalValidation.pages,
      cells: finalValidation.cells,
      vertices: finalValidation.vertices,
      edges: finalValidation.edges,
      raster_images: finalValidation.raster_images,
      patches_applied: update.patches_applied,
      label_before: beforeMhc?.label,
      label_after: afterMhc?.label,
      outcome_width_before: beforeActivation?.geometry?.width,
      outcome_width_after: afterActivation?.geometry?.width,
      corrections: caseStudy.corrections.map((patch) => patch.id),
      review_findings: caseStudy.reviewFindings,
    },
    case_study: {
      slug: caseStudy.slug,
      title: caseStudy.title,
      canvas: caseStudy.canvas,
      brief: caseStudy.brief,
      design: caseStudy.design,
    },
    diagram: { cells: finalCells },
    create_result: createResult,
  };
}

function sendJson(response, status, value) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(value, null, 2));
}

async function serveStatic(request, response, url) {
  const pathname = decodeURIComponent(url.pathname === "/" ? "/scientific-illustrator/" : url.pathname);
  const relativePath = pathname.replace(/^\/+/, "");
  let candidate = path.resolve(docsRoot, relativePath);
  if (!candidate.startsWith(`${docsRoot}${path.sep}`) && candidate !== docsRoot) {
    sendJson(response, 403, { ok: false, error: "Forbidden path" });
    return;
  }
  const stat = await fs.stat(candidate).catch(() => null);
  if (stat?.isDirectory()) candidate = path.join(candidate, "index.html");
  const file = await fs.readFile(candidate).catch(() => null);
  if (!file) {
    sendJson(response, 404, { ok: false, error: "Not found" });
    return;
  }
  response.writeHead(200, {
    "Content-Type": mimeTypes.get(path.extname(candidate).toLowerCase()) || "application/octet-stream",
    "Cache-Control": "no-cache",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(file);
}

const server = createServer(async (request, response) => {
  const url = new URL(request.url || "/", `http://${request.headers.host || `127.0.0.1:${port}`}`);
  try {
    if (request.method === "GET" && url.pathname === "/api/scientific-illustrator/health") {
      await mcp.start();
      sendJson(response, 200, {
        ok: true,
        real_mcp: true,
        server: mcp.serverInfo,
        tool_count: mcp.tools.length,
        tool_names: mcp.tools.map((tool) => tool.name),
        upstream_script: path.relative(repositoryRoot, mcpScript).replaceAll("\\", "/"),
      });
      return;
    }

    if (request.method === "POST" && url.pathname === "/api/scientific-illustrator/run") {
      const current = demoQueue.then(runRealDemo, runRealDemo);
      demoQueue = current.catch(() => {});
      const result = await current;
      sendJson(response, 200, result);
      return;
    }

    if (url.pathname.startsWith("/api/")) {
      sendJson(response, 404, { ok: false, error: "Unknown API route" });
      return;
    }

    await serveStatic(request, response, url);
  } catch (error) {
    sendJson(response, 500, {
      ok: false,
      real_execution: false,
      error: error.message,
      mcp_stderr: mcp.stderr.slice(-5),
    });
  }
});

server.listen(port, "127.0.0.1", () => {
  process.stdout.write(`Scientific Illustrator real MCP demo: http://127.0.0.1:${port}/scientific-illustrator/\n`);
});

function shutdown() {
  mcp.close();
  server.close(() => process.exit(0));
}

process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);
