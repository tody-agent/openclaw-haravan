# Haravan Ops for OpenClaw

**OpenClaw community plugin** for [Haravan](https://www.haravan.com/) (Vietnam e‑commerce): orders, inventory, customers, promotions, tax snapshots, and theme checks—via **composite ops tools** plus a **typed Haravan REST bridge** (`haravan_*`), aligned with the lean MCP server in this repo.

---

## One-line description

> AI assistant tools for day-to-day Haravan shop operations: snapshots, SLA risks, stock anomalies, promotions, and optional direct API calls—configured with `shop` + `accessToken` in OpenClaw.

---

## Install (OpenClaw)

After the package is published to **npm** or **[ClawHub](https://docs.openclaw.ai/tools/clawhub)** (OpenClaw resolves ClawHub first, then npm—see [Community Plugins](https://docs.openclaw.ai/plugins/community)):

```bash
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```

**From source (development):**

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan
npm install && npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

---

## Configuration

Enable plugin id **`haravan-ops`** in OpenClaw and set:

| Key | Description |
|-----|-------------|
| `shop` | Store domain, e.g. `your-store.myharavan.com` |
| `accessToken` | Haravan private app API token (marked sensitive in the manifest) |

Optional tools (side effects / broad API access) such as `theme_draft_create`, `haravan_com_api`, and `haravan_web_api` may require explicit enablement per OpenClaw policy—see [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

---

## What you get

- **Composite tools** — one tool per operational goal (e.g. daily snapshot, order SLA, low stock, promotion health).
- **Haravan API bridge** — `haravan_*` tools for locations, orders (including tags, transactions, refunds), product counts/tags, and guarded `/com` & `/web` paths where exposed.
- **Same logic as MCP** — shared dispatch in `@haravan-master/haravan-ops-dispatch` for consistency between this plugin and the MCP server.

Full tool names are declared in `packages/openclaw-haravan-plugin/openclaw.plugin.json` under `contracts.tools`.

---

## Safety & scope

Designed for **read-heavy** ops assistance. Theme and direct API tools are treated as **optional** where appropriate. This is **not** a replacement for accounting, legal tax advice, or platform SLAs—use outputs as signals and verify in Haravan / your books.

---

## Alternative: MCP + skill

For Claude Desktop, Cursor, or other MCP hosts, use the packaged MCP server and env vars `HARAVAN_SHOP` / `HARAVAN_TOKEN`. See [AGENTS.md](AGENTS.md) and [docs/cai-dat-va-thiet-lap.md](docs/cai-dat-va-thiet-lap.md) (Vietnamese setup guide) or the English plugin doc above.

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/plugin-openclaw.md](docs/plugin-openclaw.md) | Plugin manifest, optional tools, Vietnamese-oriented detail |
| [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md) | **Maintainers:** publish order (`core` → `dispatch` → plugin), npm / ClawHub, community listing |
| [docs/architecture.md](docs/architecture.md) | Monorepo layout |
| [skills/openclaw-haravan-ops/SKILL.md](skills/openclaw-haravan-ops/SKILL.md) | Agent routing for MCP / skills |

**VitePress site:** `npm run docs:dev` / `npm run docs:build` — output in `docs/.vitepress/dist`.

---

## Requirements

- **OpenClaw** with plugin API compatible with the versions pinned in `packages/openclaw-haravan-plugin/package.json` (`openclaw` / `compat` fields).
- Valid **Haravan** API credentials for the target shop.

---

## Contributing & issues

Use [GitHub Issues](https://github.com/tody-agent/openclaw-haravan/issues) for bugs and feature requests. PRs welcome; keep changes focused and tested (`npm run build` and workspace tests).

---

## License

MIT.

---

## For OpenClaw Community Plugins PR

Use this block when opening a PR to add the plugin to [Community Plugins](https://docs.openclaw.ai/plugins/community):

| Field | Value |
|-------|--------|
| **Plugin name** | Haravan Ops |
| **npm package name** | `@haravan-master/openclaw-haravan-ops-plugin` |
| **GitHub repository URL** | https://github.com/tody-agent/openclaw-haravan |
| **One-line description** | AI assistant tools for Haravan shop operations: composite ops tools plus a typed REST bridge for orders, inventory, customers, and more—configure with `shop` and `accessToken`. |
| **Install command** | `openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin` |

**Checklist before submission**

1. Package is installable via `openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin` (requires `@haravan-master/core` and `@haravan-master/haravan-ops-dispatch` published with semver deps—see [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md)).
2. Public GitHub repo with setup docs (this README) and issue tracker.
3. ClawHub or npm publish completed per [Building Plugins](https://docs.openclaw.ai/plugins/building-plugins).

---

*Tiếng Việt:* [README.vi.md](README.vi.md)
