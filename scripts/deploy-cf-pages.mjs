#!/usr/bin/env node
/**
 * Build VitePress with base "/" and deploy to Cloudflare Pages (Wrangler).
 * No GitHub Actions — chạy trên máy hoặc CI tùy bạn.
 *
 * Requires: CLOUDFLARE_PAGES_PROJECT (Pages project name)
 * Auth: wrangler login (OAuth) hoặc CLOUDFLARE_API_TOKEN
 */
import { spawnSync } from "node:child_process";
import process from "node:process";

/** Cloudflare Pages: 1–58 chars, chữ thường, số, gạch ngang; không gạch đầu/cuối/kép. */
function isValidPagesProjectName(name) {
  if (name.length < 1 || name.length > 58) return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(name);
}

const raw = process.env.CLOUDFLARE_PAGES_PROJECT?.trim();
if (!raw) {
  console.error(
    "Thiếu CLOUDFLARE_PAGES_PROJECT. Ví dụ:\n  CLOUDFLARE_PAGES_PROJECT=haravan-claw npm run docs:deploy:cf",
  );
  process.exit(1);
}

const project = raw.toLowerCase();
if (raw !== project) {
  console.warn(`Đã chuẩn hoá tên project (chữ thường): "${raw}" → "${project}"`);
}

if (!isValidPagesProjectName(project)) {
  console.error(
    [
      `Tên project không hợp lệ: "${project}"`,
      "",
      "Cloudflare chỉ chấp nhận: 1–58 ký tự, chữ thường a–z, số, dấu gạch ngang - (không viết HOA, không khoảng trắng).",
      "Ví dụ đúng: haravan-claw | haravan-claw-master",
      "Ví dụ sai: HaravanClaw | Haravan_Claw",
      "",
      "Gợi ý: CLOUDFLARE_PAGES_PROJECT=haravan-claw npm run docs:deploy:cf",
      "",
      "Lệnh login chỉ gõ một dòng, không dán kèm comment (# ...):",
      "  npx wrangler login",
    ].join("\n"),
  );
  process.exit(1);
}

process.env.VITEPRESS_BASE = "/";

const build = spawnSync("npx", ["vitepress", "build", "docs"], {
  stdio: "inherit",
  shell: true,
  env: process.env,
});
if (build.status) process.exit(build.status ?? 1);

const deploy = spawnSync(
  "npx",
  ["wrangler", "pages", "deploy", "docs/.vitepress/dist", "--project-name", project],
  { stdio: "inherit", shell: true, env: process.env },
);
process.exit(deploy.status ?? 0);
