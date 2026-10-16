// Pure analysis of publicly observed routes. Redirect suggestions are only
// made when the destination is already observed returning HTTP 200 HTML.
export function analyzeRoutes(results) {
  const livePaths = new Set(
    results.filter((row) => row.httpStatus === 200 && row.html)
      .map((row) => row.path)
  );
  const redirects = [];
  const unresolved = [];
  for (const row of results) {
    if (row.httpStatus === 200 && row.html) continue;
    const source = row.path;
    let candidate = null;
    if (row.httpStatus === 404 && source.endsWith(".html")) {
      candidate = source.slice(0, -5);
    } else if (row.httpStatus === 404 && source.startsWith("/service/service/")) {
      candidate = source.replace(/^\/service\/service\//, "/service/");
    } else if (row.httpStatus === 404 &&
      (source === "/service/contact" || source === "/service/services")) {
      candidate = source.replace(/^\/service\//, "/");
    }
    if (candidate && candidate !== source && livePaths.has(candidate)) {
      redirects.push({ from: source, to: candidate, targetObservedHttpStatus: 200, action: "review-source-link-before-redirect" });
    } else {
      unresolved.push({ path: source, status: row.httpStatus, reason: candidate ?
        "suggested-target-not-confirmed-live" : "requires-manual-investigation" });
    }
  }
  return { healthyCount: livePaths.size, redirects, unresolved };
}

export function safeFinalPath(rawPath) {
  // Some legacy 404 redirections unexpectedly expose a server file path.
  // Do not preserve infrastructure usernames/paths in distributable reports.
  if (!rawPath) return null;
  if (/^\/(?:home|var|root|etc|opt|usr)\//i.test(rawPath)) {
    return "[redacted-server-path]";
  }
  return rawPath;
}
