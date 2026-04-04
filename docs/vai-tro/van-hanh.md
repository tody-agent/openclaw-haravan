---
title: "📦 Vận hành / Kho / Fulfillment — Playbook ngày · tuần · tháng"
description: "JTBD cho ops & kho Haravan: xử lý đơn trễ, canh tồn, chốt sổ mỗi ngày. Hỏi AI thay vì lọc admin."
keywords: "vận hành haravan, kho haravan ai, fulfillment, sla, tồn kho, oversell, jtbd ops"
robots: "index, follow"
---

# 📦 Vận hành / Kho / Fulfillment

> **Bạn là người giữ cho shop chạy mượt.** Đơn không được trễ, kho không được cháy, oversell không được xảy ra. AI giúp bạn phát hiện vấn đề sớm — thay vì để khách hàng phát hiện trước.

---

## Bạn sẽ dùng những gì?

| Nhóm | Công cụ AI sẽ gọi | Mục đích |
|------|-------------------|---------|
| 📦 Đơn hàng | `order_sla_and_fulfillment_risks`, `find_unfulfilled_orders`, `find_orders_needing_attention` | Tìm đơn trễ, đơn treo, đơn cần xử lý |
| 📉 Tồn kho | `find_low_stock_risks`, `inventory_oversell_and_anomalies` | Cảnh báo hết hàng, oversell |
| 🔄 Nhập hàng | `slow_mover_and_restock_advisor`, `sale_period_stock_forecast` | Biết cần nhập gì, bao nhiêu |
| ✅ Chốt sổ | `end_of_day_reconciliation` | Đối soát cuối ngày |
| 🏷️ Catalog | `product_compliance_scan`, `pricing_anomaly_scan` | Phát hiện sản phẩm lỗi dữ liệu |

---

## 📅 Hằng ngày — "Đơn nào cần xử lý? Kho có ổn không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Bắt đầu ca sáng | `Có đơn nào sắp lỡ SLA hoặc chưa giao?` | Danh sách đơn critical, lý do (chưa paid, thiếu vận đơn, quá hạn), mức ưu tiên |
| Muốn biết đơn nào "kẹt" | `Liệt kê đơn chưa giao, ưu tiên theo thời gian` | Đơn unfulfilled sắp xếp cũ nhất trước |
| Lo sợ hết hàng | `SKU nào đang low stock hoặc tồn âm?` | Bảng SKU + tồn hiện tại + cảnh báo oversell |
| Cuối ngày, chốt sổ | `Chốt sổ cuối ngày cho ngày hôm nay` | Đối soát đơn theo variant, doanh thu, điểm lệch |

### 💡 Thói quen gợi ý

```
☀️ 8:00  → "Đơn nào sắp lỡ SLA?"          (3 phút — ưu tiên xử lý trước)
🕐 13:00 → "Tồn kho có oversell không?"     (2 phút — check giữa ngày)
🌙 17:00 → "Chốt sổ cuối ngày"              (5 phút — bàn giao ca)
```

---

## 📆 Hằng tuần — "Kho có healthy không? Catalog có sạch không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Review tồn kho tổng | `Quét oversell và bất thường tồn kho` | Variant tồn âm, SP published mà tồn cực thấp, gợi ý hành động |
| Kiểm tra catalog | `Sản phẩm nào thiếu ảnh, mô tả, hoặc SKU?` | Danh sách SP vi phạm rules: thiếu ảnh, mô tả trống, SKU trùng |
| Muốn biết nhập hàng gì | `Hàng nào bán chậm? Gợi ý restock trong 28 ngày` | Slow movers (cần giảm tồn), fast movers (cần bơm hàng) |
| Đơn huỷ nhiều | `Đơn huỷ/hoàn tuần này có pattern gì?` | Tổng hợp lý do, nhận diện trend |

### 💡 Thói quen gợi ý

```
📅 Thứ 2 → "Quét oversell + compliance catalog"     (10 phút)
📅 Thứ 4 → "Restock advisor: nhập gì, giảm gì?"     (10 phút)
```

---

## 📊 Hằng tháng — "Chuẩn bị sale có kịp không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Trước Mega Sale / Double Day | `Forecast nhập kho cho đợt sale sắp tới` | Dự báo lượng bán ra, SKU cần restock, buffer safety |
| Đánh giá hiệu quả kho | `Hàng ế trong 28 ngày + tồn cover thấp nhất?` | Dead stock cần thanh lý, sản phẩm cần promotion đẩy |
| Kiểm tra giá toàn shop | `Quét giá bất thường toàn shop` | Giá 0đ, giá bán < vốn, giảm giá shock |

### 💡 Thói quen gợi ý

```
📊 Ngày 1 tháng  → "Review slow movers + dead stock"         (15 phút)
📊 Trước sale 7 ngày → "Stock forecast + restock advisor"     (20 phút)
```

---

## 🚀 Nâng cao — khi cần thao tác thật

Khi bạn cần **ghi dữ liệu** (điều chỉnh tồn, tạo fulfillment, tag đơn…) — dùng **lớp full MCP**:

```text
Xem chi tiết đơn hàng #100005.
```

```text
Gắn tag "urgent" cho đơn #100002.
```

::: danger ⚠️ Thao tác ghi
Các lệnh ghi (fulfillment, inventory, close/cancel đơn) cần bạn **xác nhận rõ ràng**. AI sẽ hỏi "Bạn có chắc?" — trả lời Có hoặc Không.
:::

---

## Liên kết

- [← Chọn vai trò khác](/su-dung-theo-vai-tro)
- [Bắt đầu trong 3 phút](/cam-tay-chi-viec)
- [FAQ](/cau-hoi-thuong-gap)
