import test from "node:test";
import assert from "node:assert/strict";
import { renderApacheReview } from "../scripts/redirect-preview.mjs";

test("Apache draft uses exact-match paths and excludes unverified destinations", () => {
  const result = renderApacheReview([
    { path: "/contact", httpStatus: 200, html: true },
    { path: "/services", httpStatus: 200, html: true },
    { path: "/contact.html", httpStatus: 404, html: false },
    { path: "/services.html", httpStatus: 404, html: false },
    { path: "/service", httpStatus: 403, html: false }
  ]);
  assert.ok(result.includes("RedirectMatch 301 ^/contact\\.html/?$ /contact"));
  assert.ok(result.includes("RedirectMatch 301 ^/services\\.html/?$ /services"));
  assert.ok(result.includes("# 403 /service"));
  assert.ok(!result.includes("RedirectMatch 301 ^/service/?$"));
  assert.ok(result.includes("NON APPLIQUÉES"));
});
