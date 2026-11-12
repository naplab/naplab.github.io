import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repository = fileURLToPath(new URL("../../", import.meta.url));
const site = resolve(repository, "_site");
const archive = join(site, "archive");
const dist = resolve(repository, "new_website2/dist");

if (!existsSync(join(archive, "index.html"))) {
  throw new Error("Build the Jekyll archive in _site/archive before assembling Pages.");
}

cpSync(dist, site, { recursive: true });
// Preserve existing public image and PDF links as well as the archived copies.
cpSync(join(archive, "assets"), join(site, "assets"), { recursive: true });
cpSync(join(repository, "CNAME"), join(site, "CNAME"));
writeFileSync(join(site, ".nojekyll"), "");

function htmlFiles(directory, prefix = "") {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const relative = `${prefix}${entry.name}`;
    if (entry.isDirectory()) return htmlFiles(join(directory, entry.name), `${relative}/`);
    return entry.name.endsWith(".html") ? [relative] : [];
  });
}

function redirect(file, target) {
  const destination = join(site, file);
  mkdirSync(dirname(destination), { recursive: true });
  writeFileSync(destination, `<!doctype html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>NAPLab — Page moved</title>
<link rel="canonical" href="${target}">
<meta http-equiv="refresh" content="0;url=${target}">
<script>location.replace(${JSON.stringify(target)} + location.search + location.hash);</script>
</head><body><p>This page has moved. <a href="${target}">Continue to NAPLab</a>.</p></body></html>
`);
}

const pages = htmlFiles(dist).filter((file) => readFileSync(join(dist, file), "utf8").includes("data-page="));
for (const file of pages) {
  redirect(`new_website2/${file}`, `/${file.replace(/index\.html$/, "")}`);
}

const renamedRoutes = {
  "about/index.html": "/research/",
  "publication/index.html": "/publications/",
  "bci/index.html": "/teaching/bci-lab/",
};
for (const file of htmlFiles(archive)) {
  if (file.startsWith("assets/") || file === "404.html" || existsSync(join(site, file))) continue;
  const modernPage = file.replace(/\.html$/, "/index.html");
  const target = renamedRoutes[file] || (pages.includes(modernPage)
    ? `/${modernPage.replace(/index\.html$/, "")}`
    : `/archive/${file.replace(/index\.html$/, "")}`);
  redirect(file, target);
}

console.log(`Prepared the homepage, /archive/, and ${pages.length} /new_website2/ redirects.`);
