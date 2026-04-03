#!/usr/bin/env node
/**
 * Kiểm tra nhanh môi trường OpenClaw Haravan Ops lean.
 * Usage: node scripts/doctor-openclaw.mjs
 */

import { existsSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const mcpEntry = join(
  root,
  "apps/openclaw-haravan-ops-mcp/dist/index.js"
);

let code = 0;

function ok(msg) {
  console.log(`[ok] ${msg}`);
}

function warn(msg) {
  console.warn(`[warn] ${msg}`);
}

function fail(msg) {
  console.error(`[fail] ${msg}`);
  code = 1;
}

const shop = process.env.HARAVAN_SHOP?.trim();
const token = process.env.HARAVAN_TOKEN?.trim();

if (!shop) warn("HARAVAN_SHOP chưa set — MCP sẽ khởi tạo client null.");
else ok(`HARAVAN_SHOP=${shop}`);

if (!token) warn("HARAVAN_TOKEN chưa set — MCP sẽ khởi tạo client null.");
else ok("HARAVAN_TOKEN đã set (không in giá trị).");

if (!existsSync(mcpEntry)) {
  fail(
    `Chưa build MCP: thiếu ${mcpEntry}\n  Chạy: npm run build --workspace @haravan-master/openclaw-haravan-ops-mcp`
  );
} else {
  ok(`MCP bundle tồn tại: apps/openclaw-haravan-ops-mcp/dist/index.js`);
}

const coreDist = join(root, "packages/core/dist/index.js");
if (!existsSync(coreDist)) {
  warn(
    `packages/core/dist có thể cũ hoặc chưa build: ${coreDist}\n  Chạy: npm run build --workspace @haravan-master/core`
  );
} else {
  ok("@haravan-master/core đã có dist");
}

console.log("\nTài liệu: docs/openclaw-lean/README.md");
process.exit(code);
