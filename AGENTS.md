# Agent Configuration

## OpenClaw plugin (khuyến nghị)
- **Package**: `packages/openclaw-haravan-plugin` → `@haravan-master/openclaw-haravan-ops-plugin`
- **Plugin id**: `haravan-ops` (manifest `openclaw.plugin.json`)
- **Config**: `shop`, `accessToken` (sensitive in `uiHints`)
- **Local install**: `openclaw plugins install -l ./packages/openclaw-haravan-plugin` (sau `npm run build`)
- **Shared logic**: `@haravan-master/haravan-ops-dispatch` (cùng `LEAN_MCP_TOOLS` + `callLeanTool` với MCP)
- **Optional trong OpenClaw**: `theme_draft_create`, `haravan_com_api`, `haravan_web_api` — bật thêm nếu cần ghi theme tùy ý hoặc gọi API thô

## MCP Server
- **Name**: openclaw-haravan-ops
- **Command**: `node packages/mcp-server/dist/index.js`
- **Required env**: `HARAVAN_SHOP`, `HARAVAN_TOKEN`
- **Build first**: `npm install && npm run build`

## Skills
- `skills/openclaw-haravan-ops/SKILL.md` — Main operations skill with routing table

## Quick Test
```bash
export HARAVAN_SHOP="your-shop.myharavan.com"
export HARAVAN_TOKEN="your-token"
npm install && npm run build
node packages/mcp-server/dist/index.js
```
