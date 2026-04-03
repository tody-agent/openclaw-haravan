# Pack: ops-morning-pulse (buổi sáng)

## Mục tiêu

Nắm nhanh tình hình trước giờ bán.

## Prompt mẫu (copy)

1. `Cho tôi báo cáo kinh doanh ngày hôm nay (YYYY-MM-DD) bằng daily_business_snapshot.`
2. `Chạy weekly_ops_audit để xem tổng quan tuần.`
3. `Kiểm tra promotion_health — có KM nào sắp hết hạn không?`
4. `Quét pricing_anomaly_scan xem có giá 0đ hoặc compare_at sai không.`

## Thứ tự gợi ý

1. `daily_business_snapshot` (ngày hôm nay)
2. `order_sla_and_fulfillment_risks` nếu có đơn sàn
3. `find_low_stock_risks` hoặc `inventory_oversell_and_anomalies`
