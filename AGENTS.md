# Agent Configuration

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
