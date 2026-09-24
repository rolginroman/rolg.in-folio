#!/usr/bin/env node
/**
 * Regenerates public/og-image.png from tools/og/index.html.
 *
 * Prerequisite: the `agent-browser` CLI must be installed and on PATH — it
 * drives headless Chrome for the screenshot. It is an external tool, not an
 * npm dependency of this repo.
 *
 * Renders from a one-off `vite build` (not `vite dev`), served by a plain
 * static file server running in this same process. That server must stay
 * live on the event loop while agent-browser navigates to it, which is why
 * every agent-browser call below uses the async `execFile` (not
 * `execFileSync`): the sync variant blocks this process's event loop, so the
 * in-process server can never answer Chrome's request and navigation hangs
 * forever. Each call also carries its own timeout so a real hang fails fast
 * instead of wedging the script, and a try/finally guarantees the browser
 * session, the HTTP server, and the build's temp dir all get torn down even
 * on failure.
 *
 * Usage: node tools/og/render.mjs   (or `pnpm og`)
 */
import { build } from "vite";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import { createServer as createHttpServer } from "node:http";
import { readFile, mkdtemp, rm } from "node:fs/promises";
import { existsSync } from "node:fs";
import { tmpdir } from "node:os";
import { fileURLToPath } from "node:url";
import { dirname, resolve, extname, join } from "node:path";

const execFileAsync = promisify(execFile);

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "../..");
const outFile = resolve(root, "public/og-image.png");
const session = "og-render";
const CMD_TIMEOUT_MS = 30_000;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".woff2": "font/woff2",
  ".svg": "image/svg+xml",
  ".png": "image/png",
};

async function browser(...args) {
  const { stdout } = await execFileAsync("agent-browser", [...args, "--session", session], {
    cwd: root,
    timeout: CMD_TIMEOUT_MS,
  });
  if (stdout.trim()) console.log(stdout.trim());
  return stdout;
}

async function browserEvalJSON(script) {
  const stdout = await browser("eval", "--json", script);
  const parsed = JSON.parse(stdout);
  if (!parsed.success) throw new Error(`agent-browser eval failed: ${parsed.error}`);
  return parsed.data.result;
}

/**
 * A viewport screenshot only crops to size visually — if the document is
 * actually taller/wider than the viewport, Chrome still bakes a scrollbar
 * into the captured pixels. Assert the real box instead of trusting the
 * screenshot dimensions.
 */
async function assertNoOverflow() {
  const { w, h } = await browserEvalJSON(
    "({ w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight })"
  );
  if (w !== 1200 || h !== 630) {
    throw new Error(`Document overflows the 1200x630 viewport: scrollWidth=${w} scrollHeight=${h}`);
  }
}

async function closeBrowserQuiet() {
  try {
    await browser("close");
  } catch {
    // best-effort cleanup — nothing left to recover from here
  }
}

const buildDir = await mkdtemp(join(tmpdir(), "og-build-"));
let httpServer;

try {
  await build({
    root,
    configFile: false,
    logLevel: "warn",
    css: {
      preprocessorOptions: {
        scss: { includePaths: ["src/styles"] },
      },
    },
    build: {
      outDir: buildDir,
      emptyOutDir: true,
      rollupOptions: {
        input: resolve(root, "tools/og/index.html"),
      },
    },
  });

  httpServer = createHttpServer(async (req, res) => {
    try {
      const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      const filePath = join(buildDir, urlPath);
      if (!existsSync(filePath)) {
        res.writeHead(404);
        res.end("not found");
        return;
      }
      const body = await readFile(filePath);
      res.writeHead(200, { "content-type": MIME[extname(filePath)] || "application/octet-stream" });
      res.end(body);
    } catch (err) {
      res.writeHead(500);
      res.end(String(err));
    }
  });

  await new Promise((res, rej) => {
    httpServer.once("error", rej);
    httpServer.listen(0, "127.0.0.1", res);
  });
  const port = httpServer.address().port;
  const url = `http://127.0.0.1:${port}/tools/og/index.html`;

  try {
    await browser("open");
    await browser("set", "viewport", "1200", "630", "1");
    await browser("navigate", url);
    await browser("wait", "--fn", "document.body.dataset.fontsReady === 'true'");
    await assertNoOverflow();
    await browser("screenshot", outFile);
  } finally {
    await closeBrowserQuiet();
  }
} finally {
  if (httpServer) await new Promise((res) => httpServer.close(res));
  await rm(buildDir, { recursive: true, force: true });
}

console.log(`Wrote ${outFile}`);
