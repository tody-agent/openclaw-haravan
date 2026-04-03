# Pack: ops-customer-value (khách hàng)

## Mục tiêu

VIP, khách lâu không quay lại (proxy từ `updated_at`).

## Prompt mẫu

1. `segment_high_value_customers top_n 25.`
2. `find_reactivation_candidates inactive_days 60 — highlight khách trên 1 triệu đã lâu.`
3. `Gợi ý chiến dịch email/Zalo dựa trên danh sách reactivation (không gửi tự động).`
