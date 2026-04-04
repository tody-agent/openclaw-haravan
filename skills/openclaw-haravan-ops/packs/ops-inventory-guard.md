# Pack: ops-inventory-guard (tồn kho & SP)

## Mục tiêu

Chặn oversell, phát hiện tồn âm, hàng ế, compliance sản phẩm.

## Prompt mẫu

1. `inventory_oversell_and_anomalies với threshold 3.`
2. `find_low_stock_risks threshold 5, quét 3 trang sản phẩm.`
3. `product_compliance_scan — có SKU trùng hoặc thiếu ảnh không?`
4. `slow_mover_and_restock_advisor — cửa sổ 28 ngày.`
5. `sale_period_stock_forecast — lịch sale sàn + uplift + Pareto ~20% SKU (read-only).`

## An toàn

Ẩn SP / deny oversell / điều chỉnh kho: chỉ hướng dẫn hoặc dùng MCP khác sau khi user xác nhận; pack này mặc định read-only.
