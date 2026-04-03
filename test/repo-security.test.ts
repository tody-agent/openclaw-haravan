import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { test, expect } from "vitest";

const repoRoot = path.resolve(import.meta.dirname, "..");
const inGit = fs.existsSync(path.join(repoRoot, ".git"));

test.skipIf(!inGit)("no common secret files tracked by git", () => {
  const result = spawnSync("git", ["ls-files"], {
    encoding: "utf-8",
    cwd: repoRoot,
  });
  expect(result.status, result.stderr || "git ls-files failed").toBe(0);
  const lines = (result.stdout || "").split("\n").filter(Boolean);
  const badFiles = [".env", ".dev.vars", ".env.local", ".env.production"];
  const found = badFiles.filter((f) => lines.includes(f));
  expect(found, `Secret files tracked: ${found.join(", ")}`).toEqual([]);
});

test(".gitignore lists required secret patterns", () => {
  const gitignore = fs.readFileSync(path.join(repoRoot, ".gitignore"), "utf-8");
  expect(gitignore).toContain(".env");
  expect(gitignore).toContain(".dev.vars");
});
