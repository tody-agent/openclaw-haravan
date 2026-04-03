#!/usr/bin/env node
/**
 * Đóng gói OpenClaw lean vào: <repo>/release/openclaw-lean/
 * (repo thường là /Users/todyle/Coder/Haravan khi bạn clone ở đó.)
 *
 * Usage: npm run package:openclaw-lean
 */

import { execFileSync } from "child_process";
import {
  cpSync,
  existsSync,
  mkdirSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const out = join(root, "release", "openclaw-lean");
const tarballsDir = join(out, "tarballs");
const docsSrc = join(root, "docs", "openclaw-lean");
const skillsSrc = join(root, "skills", "openclaw-haravan-ops");

function npm(args, opts = {}) {
  execFileSync("npm", args, {
    cwd: root,
    stdio: "inherit",
    ...opts,
  });
}

function main() {
  if (!existsSync(docsSrc)) {
    console.error(`Thiếu thư mục docs: ${docsSrc}`);
    process.exit(1);
  }
  if (!existsSync(skillsSrc)) {
    console.error(`Thiếu thư mục skills: ${skillsSrc}`);
    process.exit(1);
  }

  rmSync(out, { recursive: true, force: true });
  mkdirSync(tarballsDir, { recursive: true });

  cpSync(docsSrc, join(out, "docs"), { recursive: true });
  cpSync(skillsSrc, join(out, "skills", "openclaw-haravan-ops"), {
    recursive: true,
  });

  npm([
    "run",
    "build",
    "--workspace",
    "@haravan-master/core",
  ]);
  npm([
    "run",
    "build",
    "--workspace",
    "@haravan-master/openclaw-haravan-ops-mcp",
  ]);

  npm([
    "pack",
    "-w",
    "@haravan-master/core",
    "--pack-destination",
    tarballsDir,
  ]);
  npm([
    "pack",
    "-w",
    "@haravan-master/openclaw-haravan-ops-mcp",
    "--pack-destination",
    tarballsDir,
  ]);

  const tgz = readdirSync(tarballsDir).filter((f) => f.endsWith(".tgz"));
  const coreTgz = tgz.find(
    (f) => f.includes("haravan-master-core") || f.includes("core-")
  );
  const mcpTgz = tgz.find((f) => f.includes("openclaw-haravan-ops-mcp"));
  if (!coreTgz || !mcpTgz) {
    console.error("Không tìm thấy đủ .tgz trong tarballs:", tgz);
    process.exit(1);
  }

  const builtAt = new Date().toISOString();
  writeFileSync(
    join(out, "MANIFEST.json"),
    JSON.stringify(
      {
        builtAt,
        repoRoot: root,
        outputDir: out,
        tarballs: { core: coreTgz, mcp: mcpTgz },
      },
      null,
      2
    )
  );

  const readme = `# OpenClaw Haravan Ops — gói phát hành (cục bộ)

Thư mục này nằm trong repo tại \`release/openclaw-lean/\`, được tạo bởi:

\`\`\`bash
npm run package:openclaw-lean
\`\`\`

**Thời điểm đóng gói:** ${builtAt}

## Nội dung

| Mục | Mô tả |
|-----|--------|
| \`docs/\` | Bản sao \`docs/openclaw-lean/\` |
| \`skills/openclaw-haravan-ops/\` | Bản sao skill + packs |
| \`tarballs/\` | \`npm pack\`: \`@haravan-master/core\` + MCP lean |

## Cài từ tarball (thư mục trống)

Từ **bên trong** \`release/openclaw-lean/\`:

\`\`\`bash
mkdir install && cd install
npm init -y
npm install ../tarballs/${coreTgz}
npm install ../tarballs/${mcpTgz}
\`\`\`

## Biến môi trường MCP

- \`HARAVAN_SHOP\`
- \`HARAVAN_TOKEN\`

## Chạy MCP (sau khi cài)

\`\`\`bash
node node_modules/@haravan-master/openclaw-haravan-ops-mcp/dist/index.js
\`\`\`

## Kiểm thử từ source monorepo

\`\`\`bash
npm run test:openclaw-ops:gate
\`\`\`
`;

  writeFileSync(join(out, "README.md"), readme, "utf8");

  console.log("\n[package-openclaw-lean] Xong.");
  console.log("  Thư mục:", out);
  console.log("  Tarballs:", coreTgz, ",", mcpTgz);
}

main();
