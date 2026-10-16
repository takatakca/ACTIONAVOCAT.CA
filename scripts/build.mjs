import { readFile, writeFile, mkdir, rm, copyFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pages, services } from "../src/content.mjs";

const root = fileURLToPath(new URL("../", import.meta.url));
const out = join(root, "dist");
const template = await readFile(join(root, "src/template.html"), "utf8");
const site = "https://actionavocat.ca";
// Fail safe: a candidate or staging build must not be indexed by search engines.
const indexable = process.env.ACTIONAVOCAT_INDEXABLE === "true";
const html = (value) => String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
const pathFor = (slug) => slug ? slug + ".html" : "index.html";
const urlFor = (slug) => slug ? "/" + slug : "/";

function serviceCard(service, index) {
  return '<a class="service-card" href="/' + html(service.slug) + '">' +
    '<span class="service-number">0' + (index + 1) + ' / ' + html(service.label) + '</span>' +
    '<h3>' + html(service.title) + '</h3><p>' + html(service.lead) + '</p>' +
    '<span class="card-arrow" aria-hidden="true">↗</span></a>';
}

function homePage() {
  return '<section class="hero"><div class="shell hero-grid">' +
    '<div class="hero-copy"><span class="eyebrow"><span class="eyebrow-line"></span> Cabinet en litige civil · Montréal</span>' +
    '<h1>La clarté dans les <em>situations complexes.</em></h1>' +
    '<p class="hero-lead">Chaque dossier mérite une stratégie réfléchie, une communication directe et une attention réelle aux enjeux qui comptent.</p>' +
    '<div class="hero-actions"><a class="button button-gold" href="/contact">Discuter de votre situation <span aria-hidden="true">↗</span></a>' +
    '<a class="text-link" href="#expertises">Explorer nos expertises <span aria-hidden="true">↓</span></a></div>' +
    '<div class="hero-note"><span aria-hidden="true">◆</span> Une approche rigoureuse, centrée sur vos besoins.</div></div>' +
    '<div class="hero-art" aria-hidden="true"><div class="art-frame"><div class="art-monogram">R</div><div class="art-rule"></div>' +
    '<div class="art-caption">RIGUEUR<br>DISCERNEMENT<br>ENGAGEMENT</div></div><div class="art-detail"></div></div>' +
    '</div></section>' +
    '<section id="expertises" class="section section-light"><div class="shell">' +
    '<div class="section-head"><div><span class="eyebrow dark">Nos domaines d’intervention</span><h2>Des réponses adaptées à chaque enjeu.</h2></div>' +
    '<p>Notre pratique s’appuie sur l’analyse des faits, le dialogue et une stratégie juridique cohérente.</p></div>' +
    '<div class="services-grid">' + services.map(serviceCard).join("") + '</div></div></section>' +
    '<section id="approche" class="section section-approach"><div class="shell approach-grid">' +
    '<div><span class="eyebrow">Notre façon de travailler</span><h2>Comprendre. Évaluer. Agir.</h2>' +
    '<p>Une démarche structurée pour avancer avec une compréhension claire de vos choix.</p>' +
    '<a class="button button-outline" href="/contact">Prendre contact <span aria-hidden="true">↗</span></a></div>' +
    '<ol class="steps"><li><span>01</span><div><h3>Écouter</h3><p>Comprendre le contexte, vos objectifs et les faits essentiels.</p></div></li>' +
    '<li><span>02</span><div><h3>Analyser</h3><p>Identifier les questions juridiques, la preuve et les options envisageables.</p></div></li>' +
    '<li><span>03</span><div><h3>Accompagner</h3><p>Définir un plan d’action et expliquer les prochaines étapes.</p></div></li></ol></div></section>' +
    contactBanner();
}

function contactBanner() {
  return '<section class="contact-banner"><div class="shell contact-banner-inner">' +
    '<div><span class="eyebrow dark">Faire le premier pas</span><h2>Parlons de votre dossier.</h2>' +
    '<p>Un premier contact ne crée pas de relation avocat-client. Évitez de transmettre des renseignements confidentiels par courriel non sécurisé.</p></div>' +
    '<a class="button button-navy" href="/contact">Nous joindre <span aria-hidden="true">↗</span></a></div></section>';
}

function servicePage(page) {
  return '<section class="page-hero"><div class="shell narrow">' +
    '<a class="back-link" href="/#expertises">← Toutes les expertises</a>' +
    '<span class="eyebrow">Service juridique · ' + html(page.label) + '</span>' +
    '<h1>' + html(page.title) + '</h1><p class="page-lead">' + html(page.lead) + '</p></div></section>' +
    '<section class="section section-light"><div class="shell detail-grid">' +
    '<div><span class="eyebrow dark">Notre accompagnement</span><h2>Une démarche adaptée à votre situation.</h2>' +
    '<p>Les services et les recours dépendent des faits et du mandat convenu avec le professionnel.</p></div>' +
    '<div><ul class="check-list">' + page.points.map((point) => '<li>' + html(point) + '</li>').join("") + '</ul>' +
    '<div class="legal-note"><strong>À savoir</strong><p>Une consultation personnalisée est nécessaire pour évaluer les délais, les recours et les honoraires applicables.</p></div></div></div></section>' +
    contactBanner();
}

function contactPage() {
  return '<section class="page-hero"><div class="shell narrow">' +
    '<span class="eyebrow">Nous joindre</span><h1>Échangeons en toute clarté.</h1>' +
    '<p class="page-lead">Communiquez avec le cabinet pour déterminer la meilleure façon de présenter votre demande.</p></div></section>' +
    '<section class="section section-light"><div class="shell contact-grid">' +
    '<div class="contact-panel"><span class="eyebrow dark">Coordonnées</span><h2>ROMANOWSKI AVOCATS</h2>' +
    '<p>Montréal, Québec</p><a class="contact-line" href="tel:+15148952000">514 895-2000 <span aria-hidden="true">↗</span></a>' +
    '<a class="contact-line" href="mailto:romanowskiyan@gmail.com">romanowskiyan@gmail.com <span aria-hidden="true">↗</span></a>' +
    '</div><div class="contact-information"><h2>Avant de communiquer avec nous</h2>' +
    '<p>Préparez un bref résumé non confidentiel du domaine concerné, de l’échéance générale et du moyen de vous joindre.</p>' +
    '<p><strong>Confidentialité :</strong> n’envoyez aucun document sensible ou détail confidentiel par courriel avant qu’un canal sécurisé et un mandat approprié aient été établis.</p>' +
    '<p>Le fait de prendre contact ne garantit pas la prise en charge du dossier ni la disponibilité du cabinet.</p>' +
    '</div></div></section>';
}

function privacyPage() {
  return '<section class="page-hero"><div class="shell narrow"><span class="eyebrow">Information importante</span>' +
    '<h1>Confidentialité</h1><p class="page-lead">Une communication prudente protège vos renseignements.</p></div></section>' +
    '<section class="section section-light"><div class="shell narrow legal-content">' +
    '<h2>Canaux de communication</h2><p>Cette prévisualisation est un site informatif statique : elle ne contient ni formulaire de dossier ni outil de suivi publicitaire.</p>' +
    '<p>Les liens téléphoniques et courriel ouvrent les applications de votre appareil. Les échanges réalisés par ces services sont soumis aux pratiques de leurs fournisseurs respectifs.</p>' +
    '<h2>Renseignements sensibles</h2><p>Ne transmettez pas de documents, renseignements de santé, pièces d’identité ou détails confidentiels par courriel non sécurisé. Demandez un moyen sécurisé de transmission au cabinet.</p>' +
    '<h2>Pour toute question</h2><p>Écrivez à <a href="mailto:romanowskiyan@gmail.com">romanowskiyan@gmail.com</a> pour connaître les modalités applicables à votre situation.</p>' +
    '<p class="legal-note">Avant toute mise en production, une politique complète, revue par le responsable de la protection des renseignements personnels, doit remplacer ce texte provisoire.</p>' +
    '</div></section>';
}

function renderContent(page) {
  if (page.kind === "home") return homePage();
  if (page.kind === "contact") return contactPage();
  if (page.kind === "privacy") return privacyPage();
  return servicePage(page);
}
function render(page) {
  const slug = page.slug;
  const depth = slug ? slug.split("/").length - 1 : 0;
  const assets = "../".repeat(depth);
  const canonical = site + urlFor(slug);
  const jsonld = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "LegalService",
    "name": "ROMANOWSKI AVOCATS",
    "url": site,
    "telephone": "+1-514-895-2000",
    "areaServed": "Québec, Canada"
  }).replaceAll("<", "\\u003c");
  return template
    .replaceAll("{{TITLE}}", html(page.seoTitle || page.title))
    .replaceAll("{{DESCRIPTION}}", html(page.description))
    .replaceAll("{{ROBOTS}}", indexable ? "index,follow,max-image-preview:large" : "noindex,nofollow,noarchive")
    .replaceAll("{{CANONICAL}}", html(canonical))
    .replaceAll("{{JSONLD}}", jsonld)
    .replaceAll("{{ASSETS}}", assets)
    .replaceAll("{{HOME_CURRENT}}", !slug ? 'aria-current="page"' : "")
    .replaceAll("{{CONTACT_CURRENT}}", slug === "contact" ? 'aria-current="page"' : "")
    .replaceAll("{{CONTENT}}", renderContent(page))
    .replaceAll("{{YEAR}}", String(new Date().getFullYear()));
}
await rm(out, { recursive: true, force: true });
await mkdir(join(out, "assets"), { recursive: true });
for (const asset of ["style.css", "app.js", "favicon.svg"]) {
  await copyFile(join(root, "src/assets", asset), join(out, "assets", asset));
}
const targets = new Set();
const outputPages = [];
for (const page of pages) {
  if (!/^[a-z0-9/-]*$/.test(page.slug) || page.slug.includes("..")) throw new Error("Unsafe URL slug: " + page.slug);
  const target = join(out, pathFor(page.slug));
  if (targets.has(target)) throw new Error("Duplicate URL: " + page.slug);
  targets.add(target);
  await mkdir(dirname(target), { recursive: true });
  const rendered = render(page);
  await writeFile(target, rendered, "utf8");
  outputPages.push({ route: urlFor(page.slug), file: pathFor(page.slug), sha256: createHash("sha256").update(rendered).digest("hex") });
}
await writeFile(join(out, "robots.txt"), indexable ?
  "User-agent: *\nAllow: /\nSitemap: " + site + "/sitemap.xml\n" :
  "User-agent: *\nDisallow: /\n", "utf8");
await writeFile(join(out, "sitemap.xml"),
  '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
  pages.map((p) => '  <url><loc>' + site + urlFor(p.slug) + '</loc></url>').join("\n") +
  '\n</urlset>\n', "utf8");
const sourceSha = /^[0-9a-f]{40}$/.test(process.env.GITHUB_SHA || "") ? process.env.GITHUB_SHA : "local";
await writeFile(join(out, "release-manifest.json"), JSON.stringify({ sourceSha, indexable, generatedAt: new Date().toISOString(), pages: outputPages }, null, 2) + "\n");
console.log("Build OK — " + pages.length + " pages generated in dist/. No production files touched.");
