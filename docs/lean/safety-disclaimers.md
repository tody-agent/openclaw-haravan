# An toàn & disclaimer

## Thuế và báo cáo tài chính

Tool `tax_compliance_snapshot` và `monthly_pl_estimate`:

- Chỉ tính trên **mẫu đơn hàng** giới hạn bởi tham số `limit` / `order_limit`, không đảm bảo đủ toàn bộ giao dịch.
- Tỷ lệ thuế 1% + 0,5% trong output là **mô hình giản lược** cho hàng hóa — không thay thế tư vấn kế toán hoặc văn bản pháp luật.
- User phải tự xác minh điều kiện áp dụng NĐ 117/2025 và deadline với cơ quan thuế.

## Ghi dữ liệu (mutations)

- **Mặc định** các tool trong `openclaw-haravan-ops-mcp` là **read-only**.
- **theme_draft_create** chỉ tạo theme khi `confirm: true` **và** user đã đồng ý rõ trong hội thoại. Agent không được tự bật `confirm`.
- Điều chỉnh kho, ẩn sản phẩm, xác nhận đơn hàng loạt: không triển khai trong server lean này; nếu dùng MCP legacy hoặc admin Haravan, luôn có bước xác nhận người dùng.

## SLA sàn TMĐT

- `order_sla_and_fulfillment_risks` dùng ngưỡng **ước lượng** theo `source_name` và thời gian mở đơn.
- Quy tắc thật của Shopee / TikTok / Lazada thay đổi; user phải đối chiếu seller center.

## Dữ liệu cá nhân

- Output có thể chứa email / SĐT khách; không log lên bên thứ ba; tuân thủ nội bộ shop và PDPA/VN khi áp dụng.
