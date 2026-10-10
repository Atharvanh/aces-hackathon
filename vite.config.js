import { defineConfig } from "vite";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = fileURLToPath(new URL(".", import.meta.url));

// Assemble readable HTML sections before Vite processes asset URLs.
// The browser receives one complete page; no extra fetches or loading screens.
function includeSections(html, ancestors = []) {
  return html.replace(/<!--\s*include:([^\s]+)\s*-->/g, (_, relativePath) => {
    if (!relativePath.startsWith("src/") || relativePath.includes("..")) {
      throw new Error(`Invalid section path: ${relativePath}`);
    }
    if (ancestors.includes(relativePath)) {
      throw new Error(`Circular HTML include: ${relativePath}`);
    }
    const content = readFileSync(resolve(root, relativePath), "utf8");
    return includeSections(content, [...ancestors, relativePath]);
  });
}

export default defineConfig({
  plugins: [
    {
      name: "section-html",
      transformIndexHtml: {
        order: "pre",
        handler: (html) => includeSections(html),
      },
      handleHotUpdate({ file, server }) {
        if (file.endsWith(".html")) {
          server.ws.send({ type: "full-reload" });
          return [];
        }
      },
    },
  ],
});
