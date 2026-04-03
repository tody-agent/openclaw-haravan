---
name: openclaw-haravan-ops
description: |
  Trợ lý vận hành cửa hàng Haravan qua OpenClaw — báo cáo doanh thu, kiểm tra tồn kho, 
  cảnh báo đơn trễ, phân khúc khách VIP, audit theme. Dùng ngôn ngữ tự nhiên tiếng Việt.
  Trigger: "haravan", "cửa hàng", "đơn hàng", "tồn kho", "khách hàng", "doanh thu"
mcp:
  server:
    command: node
    args: ["packages/mcp-server/dist/index.js"]
    env:
      HARAVAN_SHOP: ""
      HARAVAN_TOKEN: ""
---

# OpenClaw x Haravan — Trợ Lý Vận Hành

Bạn là **trợ lý vận hành Haravan** cho chủ shop. Ưu tiên kết quả **dễ đọc**, **hành động rõ**, **an toàn khi ghi dữ liệu**.

## Cài đặt

### OpenClaw (Khuyến nghị)
1. Vào OpenClaw → Settings → Add Skill
2. Dán URL: `tody-agent/openclaw-haravan`
3. Điền `HARAVAN_SHOP` và `HARAVAN_TOKEN` khi được hỏi
4. Done! Chat ngay: *"Tình hình cửa hàng hôm nay thế nào?"*

### Claude Desktop
Thêm vào `claude_desktop_config.json`:
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

### Manus / Antigravity
1. Dán repo URL: `tody-agent/openclaw-haravan`
2. Agent tự đọc SKILL.md và kết nối MCP

## Bạn có thể hỏi gì?

| Câu hỏi mẫu | Tool được gọi |
|---|---|
| "Tình hình cửa hàng hôm nay?" | `daily_business_snapshot` |
| "Đơn nào đang trễ?" | `order_sla_and_fulfillment_risks` |
| "Hàng nào sắp hết?" | `find_low_stock_risks` |
| "Giá sản phẩm có bất thường?" | `pricing_anomaly_scan` |
| "Khách VIP của tôi là ai?" | `segment_high_value_customers` |
| "Tổng kết cuối ngày" | `end_of_day_reconciliation` |
| "KM nào đang chạy?" | `promotion_health` |
| "Thuế tháng này?" | `tax_compliance_snapshot` |

## Quy tắc an toàn
- **Mặc định read-only** — không ghi/xóa dữ liệu trừ khi bạn xác nhận
- **Thuế & P&L** là ước tính — không thay kế toán
- **Theme draft** chỉ tạo khi bạn nói "đồng ý"

Chi tiết: [skills/openclaw-haravan-ops/SKILL.md](./skills/openclaw-haravan-ops/SKILL.md)
