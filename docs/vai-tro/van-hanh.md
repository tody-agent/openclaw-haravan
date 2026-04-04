---
title: "⚙️ Thủ lĩnh Vận hành — Chìa khóa của sự chính xác"
description: "Lộ trình hằng ngày, tuần, tháng cho team Ops & Kho: Xử lý đơn trễ, kiểm soát tồn kho và vận hành không sai sót cùng trợ lý AI."
keywords: "vận hành haravan, kho haravan ai, fulfillment, sla haravan, tồn kho, oversell haravan"
robots: "index, follow"
---

# ⚙️ Thủ lĩnh Vận hành: Từ "Rối bời" đến "Mượt mà"

> **Bạn là người giữ nhịp cho cả con tàu.** Một đơn hàng trễ, một mã hàng hết đột ngột đều là những "vết xước" trong lòng khách hàng. 
> AI Haravan là người cộng sự tinh tường, giúp bạn soi thấy rủi ro trước khi nó thành sự cố.

---

## Bộ công cụ quyền năng của bạn

| Mục tiêu | Công cụ AI hỗ trợ | Kết quả bạn nhận được |
|:--- |:--- |:--- |
| **Giao hàng đúng hẹn** | `order_sla_and_fulfillment_risks` | Danh sách đơn hàng sắp trễ để ưu tiên xử lý |
| **Kho bãi chuẩn xác** | `find_low_stock_risks`, `inventory_oversell_and_anomalies` | Cảnh báo hết hàng hoặc tồn kho âm (lỗi dữ liệu) |
| **Dòng hàng thông minh** | `slow_mover_and_restock_advisor` | Biết chính xác món nào nên nhập thêm, món nào nên đẩy đi |
| **Chốt sổ an tâm** | `end_of_day_reconciliation` | Đối soát nhanh mọi biến động trong ngày |

---

## 📅 Nhịp đập hằng ngày — "Vận hành không kẽ hở"

| Thời điểm | Câu lệnh gợi ý | Ý nghĩa cho bạn |
|:--- |:--- |:--- |
| **☀️ Đầu ca sáng** | `Có đơn nào sắp lỡ hẹn (SLA) hoặc chưa giao không?` | Nắm quyền ưu tiên — cứu ngay những đơn khách đang đợi lâu. |
| **🕐 Giữa ca** | `Có mã hàng nào đang bị tồn âm hoặc sắp hết không?` | Ngăn chặn việc khách đặt nhưng không có hàng để giao (Oversell). |
| **🌙 Cuối ca chiều** | `Chốt sổ cuối ngày giúp tôi` | Bàn giao ca nhẹ nhàng, biết rõ hôm nay đi bao nhiêu đơn, tiền về bao nhiêu. |

::: tip 💡 Mẹo nhỏ cho Trưởng kho
Hãy thử hỏi: *"Liệt kê các đơn hàng chưa đóng gói quá 24h và cho biết lý do kẹt ở đâu?"* — Bạn sẽ quản lý team hiệu quả hơn hẳn.
:::

---

## 📆 Tầm nhìn hằng tuần — "Sát thủ sai sót"

Vào mỗi sáng Thứ Hai, hãy dành 10 phút để AI làm "tổng duyệt" hệ thống:

1. **Quét lỗi dữ liệu:** `Quét sản phẩm thiếu ảnh, mô tả hoặc sai giá.` (Catalog sạch sẽ giúp bán hàng tốt hơn).
2. **Review đơn hủy:** `Đơn hủy/hoàn tuần qua có điểm chung gì không?` (Tìm ra lý do thực sự để khắc phục).
3. **Kế hoạch restock:** `Hàng nào bán chạy nhất tuần qua? Mình có đủ tồn cho tuần tới không?`

---

## 📊 Chiến lược hằng tháng — "Vận hành tinh gọn"

Trước mỗi đợt khuyến mãi lớn (Mega Sale) hoặc cuối tháng:

*   **Dự báo kho:** `Dự báo lượng hàng cần nhập cho ngày 10/10 sắp tới.`
*   **Thanh lý hàng ế:** `Liệt kê các mã hàng không bán được trong 30 ngày qua để lập kế hoạch xả kho.`
*   **Audit giá:** `Quét toàn bộ giá bán xem có cái nào thấp hơn giá vốn không?`

---

## 🚀 Thao tác nâng cao (Dành cho Full MCP)

Khi bạn cần AI trực tiếp thực hiện thay đổi, hãy nhớ AI luôn cần bạn xác nhận:

```text
Gắn tag "Giao gấp" cho những đơn hàng khách ở Hà Nội chưa giao.
```

```text
Cập nhật tồn kho mã SKU-123 lên 50 cái.
```

::: warning ⚠️ Lưu ý an toàn
Mọi thao tác thay đổi dữ liệu (Inventory, Tag, Fulfillment) đều cần bạn gật đầu xác nhận. AI sẽ không tự ý làm nếu bạn không nhắn "Đồng ý".
:::

[← Chọn vai trò khác](/su-dung-theo-vai-tro) · [Cài đặt trong 3 phút](/cam-tay-chi-viec)
