---
title: "Năng lực Ops Tools (API Reference)"
description: "Danh sách tổng hợp các nhóm công cụ vận hành (Ops Tools) được cung cấp bởi lớp haravan-ops-dispatch."
keywords: "haravan ops tools, mcp tools, openclaw tools, api reference, dispatch tools"
robots: "index, follow"
---

# Danh mục Công cụ Vận Hành (Ops Tools Reference)

Gói `@haravan-master/haravan-ops-dispatch` là trung tâm thần kinh của toàn bộ hệ thống Haravan Claw Master. Nó khai báo và định tuyến (dispatch) trực tiếp mọi truy vấn của AI Agent thành dữ liệu kinh doanh cụ thể. 

Tham chiếu dưới đây liệt kê các nhóm công cụ vận hành tiêu biểu nhất có sẵn dưới dạng **OpenClaw Lean Tools** (API name prefix `haravan_`).

::: info Tùy Chọn 
Lớp full MCP cung cấp tất cả các endpoint thô (`/admin/orders.json`, `/admin/products.json`, v.v.). Tuy nhiên, bạn nên ưu tiên sử dụng các **Ops Tools** bên dưới vì chúng đã được tính toán nghiệp vụ (business logic) cẩn thận từ hàng chuỗi API thô khác nhau.
:::

## 1. Báo cáo & Phân tích Doanh Thu

- **`haravan_daily_business_snapshot`**: Báo cáo tổng quan số liệu kinh doanh hàng ngày (doanh thu, số đơn, AOV, tỷ lệ huỷ). Phân giải tự động giữa online và offline nếu cần. [[Xem mẫu]](./images/Screenshot/IMG_1520.png)
- **`haravan_weekly_ops_audit`**: Tóm tắt đánh giá vận hành cho cả tuần với các chỉ số báo động hàng đầu (Top risks). Đóng gói dữ liệu từ nhiều tools khác lại thành bảng báo cáo duy nhất.
- **`haravan_monthly_pl_estimate`**: Ước tính các khoản thu trong tháng, chi phí hàng nhập, các cảnh báo P&L sơ bộ (không thay thế kế toán) dựa trên `compare_at_price` và các dữ liệu tài chính của Haravan.
- **`haravan_tax_compliance_snapshot`**: Ước lượng các dòng rủi ro thuế/hóa đơn cần đối soát vào ngày cuối tháng.

## 2. Fulfillment & SLA

- **`haravan_end_of_day_reconciliation`**: Rà soát, chốt sổ kinh doanh cuối ngày. Liệt kê các trạng thái đơn hàng lệch pha hoặc fulfillment chưa xử lý.
- **`haravan_order_sla_and_fulfillment_risks`**: Rà quét danh sách các đơn hàng có nguy cơ trễ SLA giao hàng (theo quy định nền tảng/nội bộ), đánh dấu cờ (flag) cho nhân viên Fulfillment xử lý.
- **`haravan_find_unfulfilled_orders`** / **`haravan_find_orders_needing_attention`**: Gom tệp các đơn hàng cần tác động thủ công (e.g. khách notes lạ, lỗi đồng bộ vận chuyển, huỷ giao).

## 3. Quản Trị Giá & Khuyến Mãi (Pricing & Promotions)

- **`haravan_pricing_anomaly_scan`**: Rà soát cảnh báo cấu hình nhầm giá (VD: Giá bán rẻ hơn Giá vốn, giá giảm shock 90%, hoặc set giá 0 đồng trên active product).
- **`haravan_promotion_health_check`**: Kiểm tra rủi ro từ các chương trình khuyến mãi (Promotion) - mã không dùng được, mã hết hạn nhưng vẫn active, mã bị lạm dụng chồng chéo.
- **`haravan_product_compliance_scan`**: Quét catalogue để tìm các sản phẩm vi phạm bộ rules nội bộ (thiết hụt mô tả, thiếu ảnh, thiếu variant rác).

## 4. Quản Trị Tồn Kho (Inventory & Restock)

- **`haravan_inventory_oversell_and_anomalies`**: Cảnh báo tức thì nếu sản phẩm có rủi ro `oversell` (cho phép đặt khi hết tồn) nhưng kho không hứa hẹn cung ứng. [[Xem mẫu]](./images/Screenshot/IMG_1516.png)
- **`haravan_find_low_stock_risks`**: Danh sách sản phẩm chạm ngưỡng tồn kho tối thiểu.
- **`haravan_slow_mover_and_restock_advisor`**: Phát hiện tồn kho chết (slow movers) trong quá khứ và đưa ra gợi ý nhập hàng dựa trên biến động tốc độ bán gần nhất. [[Xem mẫu]](./images/Screenshot/IMG_1517.png)
- **`haravan_sale_period_stock_forecast`**: Thuật toán dự báo số lượng bán ra trong kỳ Mega Sale/Double Day sắp tới, từ đó tính lượng Stock cần Restock gấp đệm kho.

## 5. Chăm Sóc Khách Hàng / CRM

- **`haravan_segment_high_value_customers`**: Truy xuất/tính toán tức thì chân dung và rổ hàng của top khách VIP (LTV cao). [[Xem mẫu]](./images/Screenshot/IMG_1524.png)
- **`haravan_find_reactivation_candidates`**: Lọc nhóm khách ngủ đông (Dormant > 90 days), thích hợp bắn Zalo ZNS hoặc promotion email kéo lại doanh số. [[Xem mẫu]](./images/Screenshot/IMG_1528.png)

---

> Mỗi chức năng trên là một **Lean Tool** hoàn chỉnh: Nó nhận một câu hỏi (prompt) từ AI, thực thi truy vấn Haravan API, và trả về dữ liệu tinh gọn (JSON cô đọng/Markdown) ở Backend. Nhờ vậy, AI có thể trả lời bạn rất chính xác và tốn ít token đọc ngữ cảnh thay vì tải về hàng vạn file JSON API thô!
