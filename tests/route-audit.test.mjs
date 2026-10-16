import test from "node:test";
import assert from "node:assert/strict";
import { analyzeRoutes, safeFinalPath } from "../scripts/route-audit.mjs";

test("redirect suggestions require a successful live canonical destination", () => {
  const analyzed = analyzeRoutes([
    { path: "/contact", httpStatus: 200, html: true },
    { path: "/service/droit-civil", httpStatus: 200, html: true },
    { path: "/contact.html", httpStatus: 404, html: false },
    { path: "/service/contact", httpStatus: 404, html: false },
    { path: "/service/service/droit-civil", httpStatus: 404, html: false },
    { path: "/service/service/droit-affaires", httpStatus: 404, html: false },
    { path: "/service", httpStatus: 403, html: false }
  ]);
  assert.equal(analyzed.healthyCount, 2);
  assert.deepEqual(analyzed.redirects.map((r) => [r.from, r.to]), [
    ["/contact.html", "/contact"],
    ["/service/contact", "/contact"],
    ["/service/service/droit-civil", "/service/droit-civil"]
  ]);
  assert.equal(analyzed.unresolved.length, 2);
  assert.ok(analyzed.unresolved.some((item) => item.status === 403));
  assert.ok(!analyzed.redirects.some((r) => r.to === "/service/droit-affaires"));
});
test("legacy final paths containing internal directories are redacted", () => {
  assert.equal(safeFinalPath("/home/hostinguser/app/redirect"), "[redacted-server-path]");
  assert.equal(safeFinalPath("/var/www/html"), "[redacted-server-path]");
  assert.equal(safeFinalPath("/service/droit-civil"), "/service/droit-civil");
  assert.equal(safeFinalPath(null), null);
});
