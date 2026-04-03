# OpenClaw x Haravan

> **README tiếng Việt** — bản mặc định cho cộng đồng quốc tế và PR Community Plugins là [README.md](README.md) (English).

**Trợ lý vận hành cửa hàng Haravan bằng AI** — kiểm tra đơn hàng, tồn kho, khách hàng, doanh thu bằng tiếng Việt tự nhiên.

## Dành cho ai?

| Bạn là... | Cài đặt |
|---|---|
| Chủ shop dùng **OpenClaw** | [Hướng dẫn OpenClaw](#openclaw) |
| Dùng **Claude Desktop** | [Hướng dẫn Claude](#claude-desktop) |
| Dùng **Manus** | [Hướng dẫn Manus](#manus--antigravity) |
| Dùng **Antigravity** | [Hướng dẫn Antigravity](#manus--antigravity) |
| Dùng **Cursor** | [Hướng dẫn Cursor](#cursor) |

---

## Cài đặt theo nền tảng

### OpenClaw

**Cách khuyến nghị — Plugin (dễ cấu hình, token qua UI/schema):**

1. Clone + build: `git clone … && cd openclaw-haravan && npm install && npm run build`
2. Cài plugin local: `openclaw plugins install -l ./packages/openclaw-haravan-plugin`
3. Trong config OpenClaw, bật plugin `haravan-ops` và điền:
   - `shop`: `your-shop.myharavan.com`
   - `accessToken`: token API Haravan
4. Chat: *"Tình hình cửa hàng hôm nay thế nào?"*

Sau khi maintainer publish lên npm hoặc ClawHub, người dùng cài một lệnh:

`openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin`

Chi tiết thứ tự publish các package trong monorepo, ClawHub, và PR lên danh sách Community: [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md).

**Cách thay thế — Skill + MCP (env):**

1. Vào OpenClaw → Settings → **Add Skill**
2. Dán URL repo: `tody-agent/openclaw-haravan`
3. Cấu hình MCP như dưới (Cursor/Claude) với `HARAVAN_SHOP` / `HARAVAN_TOKEN`

### Claude Desktop

Mở file `claude_desktop_config.json` và thêm:

```json
{
  "mcpServers": {
    "haravan-ops": {
      "command": "npx",
      "args": ["-y", "--prefix", "/path/to/openclaw-haravan", "openclaw-haravan-ops-mcp"],
      "env": {
        "HARAVAN_SHOP": "your-shop.myharavan.com",
        "HARAVAN_TOKEN": "your-token"
      }
    }
  }
}
```

Hoặc clone repo + build:

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan && npm install && npm run build
```

Rồi trỏ `"command": "node"`, `"args": ["packages/mcp-server/dist/index.js"]`.

### Manus / Antigravity

1. Dán repo URL: `tody-agent/openclaw-haravan`
2. Agent tự đọc `SKILL.md` và import MCP server

### Cursor

Thêm vào `.cursor/mcp.json` hoặc Settings → MCP:

```json
{
  "mcpServers": {
    "haravan-ops": {
      "command": "node",
      "args": ["/path/to/openclaw-haravan/packages/mcp-server/dist/index.js"],
      "env": {
        "HARAVAN_SHOP": "your-shop.myharavan.com",
        "HARAVAN_TOKEN": "your-token"
      }
    }
  }
}
```

---

## Docs site (VitePress)

```bash
npm run docs:dev    # local
npm run docs:build  # output: docs/.vitepress/dist
```

**GitHub Pages:** bật *Settings → Pages → Build and deployment → GitHub Actions*, rồi push `main` — workflow [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) build với `VITEPRESS_BASE=/<tên-repo>/`. Site: `https://<user>.github.io/<repo>/`

## Công cụ (tóm tắt)

Plugin/MCP gồm **tool composite** (snapshot ngày, SLA đơn, tồn, KM, thuế, theme…) và **cầu API** `haravan_*` (đơn hàng, location, transaction/refund, v.v.). Danh sách đầy đủ trong `packages/openclaw-haravan-plugin/openclaw.plugin.json`.

## License

MIT

---

*English (default): [README.md](README.md)*
