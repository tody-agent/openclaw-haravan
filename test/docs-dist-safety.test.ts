import fs from "node:fs";
import path from "node:path";
import { test, expect } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "..");
const distDir = path.join(repoRoot, "docs", ".vitepress", "dist");
const indexHtml = path.join(distDir, "index.html");

const distReady = fs.existsSync(indexHtml);

test.skipIf(!distReady)("VitePress dist contains index.html", () => {
  expect(fs.existsSync(indexHtml)).toBe(true);
});

test.skipIf(!distReady)("dist index.html has basic HTML sanity", () => {
  const html = fs.readFileSync(indexHtml, "utf-8");
  expect(html.toLowerCase()).toMatch(/<html[\s>]/);
  expect(html).not.toMatch(/<\s+[a-zA-Z]/);
  expect(html).not.toMatch(/<\/\s+[a-zA-Z]/);
});
