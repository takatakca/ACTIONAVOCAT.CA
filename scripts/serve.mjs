import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, sep } from "node:path";
import { fileURLToPath } from "node:url";
const root = fileURLToPath(new URL("../dist/", import.meta.url));
const port = Number(process.env.PORT || "4173");
const types = { ".html": "text/html", ".css": "text/css", ".js": "text/javascript", ".svg": "image/svg+xml", ".xml": "application/xml", ".txt": "text/plain" };
createServer(async (request, response) => {
  try {
    const uri = new URL(request.url || "/", "http://localhost");
    let path = decodeURIComponent(uri.pathname);
    if (path.includes("\0") || path.includes("\\") || path.split("/").includes("..")) {
      response.writeHead(400); response.end("Bad request"); return;
    }
    path = path === "/" ? "/index.html" : path;
    const normalized = normalize(join(root, "." + path));
    if (normalized !== root && !normalized.startsWith(root + sep)) {
      response.writeHead(403); response.end("Forbidden"); return;
    }
    let filename = normalized;
    try {
      const info = await stat(filename);
      if (info.isDirectory()) filename = join(filename, "index.html");
    } catch {
      if (!extname(filename)) filename += ".html";
    }
    const buffer = await readFile(filename);
    response.writeHead(200, { "Content-Type": (types[extname(filename)] || "application/octet-stream") + "; charset=utf-8", "X-Content-Type-Options": "nosniff" });
    response.end(request.method === "HEAD" ? undefined : buffer);
  } catch (error) {
    response.writeHead(error.code === "ENOENT" ? 404 : 500, { "Content-Type": "text/plain; charset=utf-8" });
    response.end(error.code === "ENOENT" ? "Introuvable" : "Erreur interne");
  }
}).listen(port, "127.0.0.1", () => console.log("Preview: http://localhost:" + port));
