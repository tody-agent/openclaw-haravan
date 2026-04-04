---
title: "📣 Marketing / CRM — Playbook ngày · tuần · tháng"
description: "JTBD cho marketing Haravan: tìm khách VIP, kéo khách ngủ quên, kiểm tra KM, lên kế hoạch flash sale."
keywords: "marketing haravan ai, crm haravan, khách vip, reactivation, khuyến mãi, jtbd marketing"
robots: "index, follow"
---

# 📣 Marketing / CRM

> **Bạn là người tăng trưởng từ tệp khách hiện có.** Biết ai đang mua nhiều, ai đang "ngủ quên", chiến dịch nào đang lỗ — để dồn nguồn lực đúng chỗ. AI giúp bạn phân tích tệp khách và kiểm tra chiến dịch trong vài giây.

---

## Bạn sẽ dùng những gì?

| Nhóm | Công cụ AI sẽ gọi | Mục đích |
|------|-------------------|---------|
| 👑 Khách VIP | `segment_high_value_customers` | Tìm top khách theo LTV, gợi ý chăm sóc |
| 😴 Khách ngủ quên | `find_reactivation_candidates` | Khách >90 ngày không mua — kéo lại |
| 🎁 Khuyến mãi | `promotion_health` | Mã đang lỗ, hết hạn vẫn active, ít dùng |
| 💰 Giá & catalog | `pricing_anomaly_scan`, `product_compliance_scan` | Giá sai, sản phẩm thiếu ảnh/mô tả |
| 📈 Sale forecast | `sale_period_stock_forecast` | Biết nên đẩy SP gì cho flash sale |

---

## 📅 Hằng ngày — "Chiến dịch hôm nay có ổn không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Đang chạy KM, muốn check nhanh | `Khuyến mãi đang chạy có gì bất thường?` | Mã hết hạn vẫn active, mã trùng, mã ít dùng, chồng chéo |
| Muốn biết giá có bị lỗi | `Quét giá bất thường giúp tôi` | SP giá 0đ, giá bán < vốn, giảm giá shock >90% |

### 💡 Thói quen gợi ý

```
☀️ 9:00 sáng → "KM đang chạy có bất thường?"     (3 phút)
```

---

## 📆 Hằng tuần — "Tệp khách có gì mới?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Cần biết VIP là ai | `Phân nhóm khách giá trị cao và gợi ý chăm sóc` | Top khách xếp theo tổng chi tiêu, gợi ý remarketing/loyalty |
| Muốn kéo khách cũ quay lại | `Tìm khách lâu không mua (trên 90 ngày) để remarketing` | Danh sách khách dormant, ưu tiên theo mức chi tiêu — sẵn sàng bắn Zalo ZNS / email |
| Kiểm tra catalog trước launch | `Sản phẩm nào thiếu ảnh, mô tả, hoặc SKU?` | SP lỗi hiển thị — sửa trước khi chạy ads |

### 💡 Thói quen gợi ý

```
📅 Thứ 2 → "Top VIP + khách dormant"           (10 phút — lên kế hoạch tuần)
📅 Thứ 5 → "Compliance catalog + giá sai?"      (5 phút — trước khi launch campaign)
```

---

## 📊 Hằng tháng — "Flash sale chuẩn bị thế nào?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Lên kế hoạch flash sale | `Forecast nhập kho cho đợt Mega Sale sắp tới` | Dự báo SP bán chạy nhất, số lượng cần stock, buffer safety |
| Chọn SP push trong campaign | `Top sản phẩm bán chạy 28 ngày + slow movers?` | Fast movers (đẩy thêm) vs dead stock (cần giảm giá thanh lý) |
| Đánh giá hiệu quả tệp KM tháng | `Tóm tắt KM + giá bất thường toàn tháng` | Health check tổng: bao nhiêu mã active, bao nhiêu cần dọn |

### 💡 Thói quen gợi ý

```
📊 Trước sale 7 ngày → "Stock forecast + chọn SP đẩy"        (15 phút)
📊 Cuối tháng         → "Review VIP + dormant + KM health"    (15 phút)
```

---

## 🚀 Nâng cao — khi cần customer ops sâu

Khi bạn cần tag khách, xem chi tiết abandoned checkout, hoặc cross-sell — dùng **lớp full MCP**:

```text
Tìm khách theo số điện thoại 0987654321 và tóm tắt lịch sử mua.
```

```text
Gắn tag "vip-2026" cho khách email xxx@gmail.com.
```

---

## Liên kết

- [← Chọn vai trò khác](/su-dung-theo-vai-tro)
- [Bắt đầu trong 3 phút](/cam-tay-chi-viec)
- [FAQ](/cau-hoi-thuong-gap)
