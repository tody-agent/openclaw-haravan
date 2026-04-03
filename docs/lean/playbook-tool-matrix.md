# Ma trận Playbook → MCP OpenClaw (composite) → Skill pack

Tài liệu ánh xạ [playbook-ideas.md](../playbook-ideas.md) sang tool trong `openclaw-haravan-ops-mcp` và gợi ý pack skill.  
**R/W:** `read` = chỉ đọc API; `confirm-write` = cần xác nhận rõ ràng trước khi ghi (xem [safety-disclaimers.md](./safety-disclaimers.md)).

| Playbook | Tool MCP (composite) | R/W | Skill pack gợi ý |
|----------|----------------------|-----|------------------|
| A1 SLA Guardian | `order_sla_and_fulfillment_risks` | read | ops-order-rescue, ops-sla-guard |
| A2 Fulfillment Watchdog | `order_sla_and_fulfillment_risks` | read | ops-order-rescue |
| A3 Tỷ lệ hủy | `order_sla_and_fulfillment_risks` (phần cancel rate tuần) | read | ops-order-rescue |
| B1 Inventory anomaly | `inventory_oversell_and_anomalies` | read; điều chỉnh kho = confirm-write (phase sau) | ops-inventory-guard |
| B2 Anti-oversell | `inventory_oversell_and_anomalies` | read | ops-inventory-guard |
| B3 Giá anomaly | `pricing_anomaly_scan` | read | ops-inventory-guard |
| C1 Thuế NĐ117 | `tax_compliance_snapshot` | read (ước tính) | ops-tax-calendar |
| C2 Product compliance | `product_compliance_scan` | read | ops-inventory-guard |
| C3 Reconciliation cuối ngày | `end_of_day_reconciliation` | read | ops-end-of-day |
| D1 Smart restock | `slow_mover_and_restock_advisor` | read | ops-inventory-guard |
| D2 Promotion health | `promotion_health` | read | ops-morning-pulse |
| D3 Churn / VIP | `segment_high_value_customers`, `find_reactivation_candidates` | read; tag/KM = confirm-write (legacy MCP) | ops-customer-value |
| D4 Dead product | `slow_mover_and_restock_advisor` (nhánh slow movers) | read | ops-inventory-guard |
| E1 Daily health | `daily_business_snapshot` | read | ops-morning-pulse |
| E2 Weekly audit | `weekly_ops_audit` | read | ops-morning-pulse |
| E3 Monthly P&L | `monthly_pl_estimate` | read (ước tính) | ops-morning-pulse |
| Theme an toàn | `audit_theme_risk`, `theme_draft_create` | audit read; `theme_draft_create` = confirm-write | ops-theme-safe-ops |

## Ghi chú

- Lịch cron trong playbook không chạy trong MCP; xem [scheduler-adapters.md](./scheduler-adapters.md).
- Các trường `source_name`, `fulfillment_status` trên đơn phụ thuộc payload thực tế Haravan; tool trả `unknown` khi thiếu dữ liệu.
- Tool khuyến mãi cần API `/promotions.json`; nếu shop không bật hoặc lỗi scope, response sẽ ghi rõ lỗi.
