import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, relative, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT ?? "4173");
const types = {
  ".html": "text/html", ".css": "text/css", ".js": "text/javascript",
  ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain",
  ".json": "application/json"
};
const headers = {
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "Referrer-Policy": "no-referrer",
  "Content-Security-Policy": "default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; base-uri 'self'; frame-ancestors 'none'; form-action 'none'",
  "Cache-Control": "no-store"
};

function send(response, status, body, extra = {}) {
  response.writeHead(status, { ...headers, "Content-Type": "text/plain; charset=utf-8", ...extra });
  response.end(body);
}

function candidatePaths(pathname) {
  const base = join(root, "." + pathname);
  const segments = relative(root, base);
  if (segments === ".." || segments.startsWith(".." + sep) || segments.startsWith(sep)) {
    return [];
  }
  if (pathname === "/") return [join(root, "index.html")];
  // An extensionless URL must take precedence over an adjacent directory.
  // Example: /service/droit-civil.html AND /service/droit-civil/...
  const trimmed = base.replace(/[\\/]+$/, "");
  if (extname(trimmed)) return [trimmed];
  return [trimmed + ".html", join(trimmed, "index.html")];
}

const server = createServer(async (request, response) => {
  if (request.method !== "GET" && request.method !== "HEAD") {
    send(response, 405, "Method not allowed", { Allow: "GET, HEAD" });
    return;
  }
  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || "/", "http://localhost").pathname);
    if (!pathname.startsWith("/") || pathname.includes("\0") ||
        pathname.includes("\\") || pathname.split("/").includes("..")) {
      send(response, 400, "Bad request");
      return;
    }
  } catch {
    send(response, 400, "Bad request");
    return;
  }
  const candidates = candidatePaths(pathname);
  if (candidates.length === 0) {
    send(response, 403, "Forbidden");
    return;
  }
  try {
    for (const file of candidates) {
      try {
        if (!(await stat(file)).isFile()) continue;
        const buffer = await readFile(file);
        response.writeHead(200, {
          ...headers,
          "Content-Type": (types[extname(file)] || "application/octet-stream") +
            (extname(file) === ".svg" || extname(file) === ".json" || extname(file) === ".html" || extname(file) === ".xml" || extname(file) === ".css" || extname(file) === ".js" || extname(file) === ".txt" ? "; charset=utf-8" : "")
        });
        response.end(request.method === "HEAD" ? undefined : buffer);
        return;
      } catch (error) {
        if (error.code === "ENOENT" || error.code === "ENOTDIR") continue;
        throw error;
      }
    }
    send(response, 404, "Introuvable");
  } catch {
    send(response, 500, "Erreur interne");
  }
});

server.listen(port, "127.0.0.1", () =>
  console.log("Preview: http://127.0.0.1:" + server.address().port)
);
