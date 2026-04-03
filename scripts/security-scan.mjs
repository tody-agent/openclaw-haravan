#!/usr/bin/env node
/**
 * Repo-wide secret pattern scan (Secret Shield layer 3).
 * Run: node scripts/security-scan.mjs
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");

const DANGEROUS_PATTERNS = [
  {
    name: "Service key assignment",
    regex:
      /(?:SERVICE_KEY|SERVICE_ROLE)\s*[=:]\s*['"][\w./+-]{20,}/g,
  },
  {
    name: "Private key block",
    regex: /-----BEGIN\s+(?:RSA|EC|DSA|OPENSSH)?\s*PRIVATE KEY-----/g,
  },
  {
    name: "JWT-like three segments",
    regex: /eyJ[\w-]{10,}\.[\w-]{10,}\.[\w-]{10,}/g,
  },
  {
    name: "Generic API secret assignment",
    regex:
      /(?:api[_-]?key|api[_-]?secret|access[_-]?token)\s*[=:]\s*['"][\w/+]{20,}['"]/gi,
  },
  {
    name: "AWS access key id",
    regex: /AKIA[0-9A-Z]{16}/g,
  },
  {
    name: "Stripe secret key",
    regex: /[sr]k_(?:test|live)_[\w]{20,}/g,
  },
];

const SKIP_DIRS = new Set([
  "node_modules",
  ".git",
  "dist",
  ".vitepress",
  "coverage",
  "docs",
]);
const SCAN_EXTS = new Set([
  ".ts",
  ".tsx",
  ".js",
  ".jsx",
  ".json",
  ".toml",
  ".yaml",
  ".yml",
]);

/** @type {{ file: string; pattern: string; count: number }[]} */
const findings = [];

function scanDir(dir) {
  let entries;
  try {
    entries = fs.readdirSync(dir, { withFileTypes: true });
  } catch {
    return;
  }
  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanDir(full);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name);
      if (!SCAN_EXTS.has(ext)) continue;
      let content;
      try {
        content = fs.readFileSync(full, "utf-8");
      } catch {
        continue;
      }
      const rel = path.relative(repoRoot, full);
      for (const { name, regex } of DANGEROUS_PATTERNS) {
        const re = new RegExp(regex.source, regex.flags);
        const matches = content.match(re);
        if (matches?.length) {
          findings.push({ file: rel, pattern: name, count: matches.length });
        }
      }
    }
  }
}

scanDir(repoRoot);

if (findings.length > 0) {
  console.error(`security-scan: ${findings.length} potential issue(s)`);
  for (const f of findings) {
    console.error(`  ${f.file} — ${f.pattern} (${f.count})`);
  }
  console.error("\nReview findings; use env vars for secrets. Allowlist in .gitleaks.toml if false positive.");
  process.exit(1);
}

console.log("security-scan: no matching patterns in scanned file types");
