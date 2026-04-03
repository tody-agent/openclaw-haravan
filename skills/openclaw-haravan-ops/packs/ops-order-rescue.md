# Pack: ops-order-rescue (đơn hàng)

## Mục tiêu

Giảm rủi ro trễ SLA và đơn treo.

## Prompt mẫu

1. `Chạy order_sla_and_fulfillment_risks và liệt kê đơn critical đầu tiên.`
2. `find_unfulfilled_orders — sort theo thời gian tạo.`
3. `find_orders_needing_attention — tôi cần đơn chưa paid hoặc lâu không đổi trạng thái.`
4. `Giải thích tỷ lệ hủy tuần này từ cùng báo cá SLA.`

## Lưu ý

Không tự xác nhận đơn hàng loạt trừ khi user yêu cầu rõ và chấp nhận rủi ro; ưu tiên gợi ý thao tác trên Haravan admin.
