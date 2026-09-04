import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";

const projectDir = fileURLToPath(new URL(".", import.meta.url));
const repositoryDir = resolve(projectDir, "..");
const page = (path) => resolve(projectDir, path, "index.html");

export default defineConfig({
  base: "/new_website2/",
  publicDir: resolve(repositoryDir, "assets"),
  server: {
    fs: {
      allow: [repositoryDir],
    },
  },
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        home: page("."),
        research: page("research"),
        people: page("people"),
        publications: page("publications"),
        teaching: page("teaching"),
        bciLab: page("teaching/bci-lab"),
        opportunities: page("opportunities"),
        gallery: page("gallery"),
        contact: page("contact"),
      },
    },
  },
});
