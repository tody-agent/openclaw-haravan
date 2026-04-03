# Haravan Ops for OpenClaw

**Turn plain-language questions into live shop answers** — for [Haravan](https://www.haravan.com/) stores in Vietnam. Orders, stock, customers, promos, and day-to-day ops without digging through ten admin screens.

> *“What’s wrong with my store *today*?”* — ask once. Get a snapshot, not a spreadsheet hunt.

---

## Why this exists

| Without | With Haravan Ops |
|--------|-------------------|
| Tab gymnastics in the admin | One conversation: “low stock”, “SLA risk”, “promo health” |
| Copy-paste between tools and chat | The AI **pulls** the right signals from Haravan for you |
| Ops knowledge trapped in one person | Anyone on the team can ask in **natural language** |

This repo ships an **OpenClaw plugin** plus an **MCP server** — same “brain” for different assistants ([OpenClaw](https://docs.openclaw.ai/plugins/community), Claude Desktop, Cursor, and more). You choose the surface; the **value** is always: *faster clarity on what matters in the shop*.

---

## How it feels (the flow)

```
     YOU                      AI ASSISTANT                 HARAVAN
      │                            │                          │
      │  "Give me today's pulse"   │                          │
      ├───────────────────────────►│                          │
      │                            │  fetch orders / stock   │
      │                            ├─────────────────────────►│
      │                            │◄─────────────────────────┤
      │◄───────────────────────────┤  clear summary + risks   │
      │  plain-language answer     │                          │
```

**In one line:** *Question → composite “ops tools” → Haravan data → answer you can act on.*

---

## Use cases (copy-paste prompts)

- **Morning pulse** — *“Snapshot for today: revenue trend, order backlog, anything risky?”*
- **Stock sanity** — *“What’s low or odd in inventory — warn me before oversell.”*
- **Order & SLA** — *“Any orders at SLA risk or stuck states?”*
- **Customers & promos** — *“How are active promotions looking? Any red flags?”*
- **Deeper work (optional)** — theme checks and guarded API paths when you explicitly enable them — see [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

Designed for **read-heavy, ops-first** assistance: signals and checks, not a replacement for accounting, tax advice, or Haravan’s own SLAs — **verify** anything that affects money or compliance in admin and your books.

---

## Get started (fast path)

**Already on OpenClaw?** After publish to npm or [ClawHub](https://docs.openclaw.ai/tools/clawhub) (OpenClaw resolves ClawHub first, then npm — see [Community Plugins](https://docs.openclaw.ai/plugins/community)):

```bash
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```

Enable plugin id **`haravan-ops`** and set **`shop`** + **`accessToken`** (Haravan private app token). Then open chat and ask your first “pulse” question.

**Building from this repo:**

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan
npm install && npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

Optional tools (`theme_draft_create`, `haravan_com_api`, `haravan_web_api`) may need explicit enablement — details in [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

---

## Not on OpenClaw? MCP + env

Use **`HARAVAN_SHOP`** + **`HARAVAN_TOKEN`** with the packaged MCP server — same operations, different host (e.g. Claude Desktop, Cursor). [AGENTS.md](AGENTS.md) has the command line; [docs/cai-dat-va-thiet-lap.md](docs/cai-dat-va-thiet-lap.md) walks through setup in Vietnamese.

---

## What you get (at a glance)

```
  ┌─────────────────────────────────────────────────────────────┐
  │  COMPOSITE OPS          One action = one business question     │
  │  (daily snapshot, SLA, stock, promos, …)                     │
  └───────────────────────────┬─────────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────────┐
  │  HARAVAN BRIDGE            Typed REST access where exposed     │
  │  (orders, locations, catalog signals, guarded paths)        │
  └───────────────────────────┬─────────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────────┐
  │  SHARED DISPATCH           Plugin + MCP stay in sync           │
  │  (@haravan-master/haravan-ops-dispatch)                      │
  └─────────────────────────────────────────────────────────────┘
```

Tool names live in `packages/openclaw-haravan-plugin/openclaw.plugin.json` under `contracts.tools`. Agent routing: [skills/openclaw-haravan-ops/SKILL.md](skills/openclaw-haravan-ops/SKILL.md).

---

## Documentation & quality

| Doc | For |
|-----|-----|
| [docs/plugin-openclaw.md](docs/plugin-openclaw.md) | Manifest, optional tools, extra detail |
| [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md) | Maintainers: publish order, npm / ClawHub |
| [docs/architecture.md](docs/architecture.md) | Monorepo map |
| **VitePress** | `npm run docs:dev` / `npm run docs:build` |
| **Before a PR** | `npm run verify` — aligns with CI |

---

## Requirements & license

- **OpenClaw** compatible with versions pinned in `packages/openclaw-haravan-plugin/package.json`.
- Valid **Haravan** API credentials for the target shop.

**License:** MIT. Issues & ideas: [GitHub Issues](https://github.com/tody-agent/openclaw-haravan/issues).

---

## OpenClaw Community Plugins PR (maintainers)

| Field | Value |
|-------|--------|
| **Plugin name** | Haravan Ops |
| **npm package name** | `@haravan-master/openclaw-haravan-ops-plugin` |
| **GitHub repository URL** | https://github.com/tody-agent/openclaw-haravan |
| **One-line description** | AI assistant tools for Haravan shop operations: composite ops plus a typed REST bridge — configure with `shop` and `accessToken`. |
| **Install command** | `openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin` |

**Checklist:** Package installs via OpenClaw; public repo + docs; publish per [Building Plugins](https://docs.openclaw.ai/plugins/building-plugins) and [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md).

---

*Bản tiếng Việt:* [README.vi.md](README.vi.md)
