# OpenClaw x Haravan

> **Trợ lý vận hành cửa hàng Haravan bằng AI** — kiểm tra đơn hàng, tồn kho, khách hàng, doanh thu bằng tiếng Việt tự nhiên.

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
1. Vào OpenClaw → Settings → **Add Skill**
2. Dán URL repo: `tody-agent/openclaw-haravan`
3. Khi được hỏi env, điền:
   - `HARAVAN_SHOP`: `your-shop.myharavan.com`
   - `HARAVAN_TOKEN`: token API của bạn
4. Chat: *"Tình hình cửa hàng hôm nay thế nào?"*

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

## 33 Tools có sẵn

| Nhóm | Tools |
|---|---|
| Tổng quan | `daily_business_snapshot`, `end_of_day_reconciliation` |
| Đơn hàng | `order_sla_and_fulfillment_risks`, `find_unfulfilled_orders` |
| Tồn kho | `inventory_oversell_and_anomalies`, `find_low_stock_risks`, `slow_mover_and_restock_advisor` |
| Khách hàng | `segment_high_value_customers`, `find_reactivation_candidates` |
| Giá & Compliance | `pricing_anomaly_scan`, `product_compliance_scan` |
| Khuyến mãi | `promotion_health` |
| Thuế | `tax_compliance_snapshot` |
| Theme | `audit_theme_risk`, `preview_theme_change`, `theme_draft_create` |
| Báo cáo | `weekly_ops_audit`, `monthly_pl_estimate` |

## License
MIT
