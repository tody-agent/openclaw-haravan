---
title: "🎧 Chăm sóc khách hàng (CS) — Playbook ngày · tuần · tháng"
description: "JTBD cho CS Haravan: tra đơn nhanh, soạn lời xin lỗi, giữ khách VIP, đối soát refund."
keywords: "cs haravan, customer support, tra đơn, xin lỗi khách, khách vip, refund haravan, jtbd cs"
robots: "index, follow"
---

# 🎧 Chăm sóc khách hàng (CS)

> **Bạn là người nói chuyện trực tiếp với khách.** Khách gọi = cần câu trả lời ngay. AI giúp bạn tra đơn, hiểu lịch sử mua, soạn lời phản hồi — để khách cảm thấy được chăm sóc, không phải chờ đợi.

---

## Bạn sẽ dùng những gì?

| Nhóm | Công cụ AI sẽ gọi | Mục đích |
|------|-------------------|---------|
| 🔍 Tra đơn | `haravan_get_order`, `find_orders_needing_attention` | Xem chi tiết đơn, tìm đơn cần chú ý |
| 💳 Giao dịch | `haravan_list_order_transactions`, `haravan_list_order_refunds` | Kiểm tra thanh toán, hoàn tiền |
| 👑 Khách VIP | `segment_high_value_customers` | Biết khách nào là VIP để ưu tiên |
| 😴 Win-back | `find_reactivation_candidates` | Khách cũ cần kéo lại |

::: info 📌 CS nên dùng lớp Full MCP
Vì CS cần tra chi tiết từng đơn, từng khách — bạn sẽ dùng **full MCP tools** nhiều hơn các vai trò khác. Nhờ IT bật cho bạn.
:::

---

## 📅 Hằng ngày — "Khách gọi, trả lời ngay"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Khách gọi hỏi đơn | `Xem chi tiết đơn hàng #[mã đơn]` | Trạng thái đơn, thanh toán, giao hàng, ghi chú |
| Khách complain chung | `Tìm khách theo SĐT 0987654321 và tóm tắt lịch sử mua` | Profile khách: số lần mua, tổng chi, đơn gần nhất, ghi chú |
| Cần biết đơn nào đang "kẹt" | `Đơn nào đang cần chú ý thanh toán hoặc giao hàng?` | Danh sách đơn treo — để liên hệ khách chủ động |
| Cần check hoàn tiền | `Liệt kê refund của đơn #[mã đơn]` | Chi tiết hoàn tiền: số tiền, lý do, thời gian |

### 💡 Thói quen gợi ý

```
☀️ Đầu ca  → "Đơn nào đang cần chú ý?"         (3 phút — liên hệ chủ động)
🔥 Khi khách gọi → Tra đơn/khách theo SĐT        (30 giây — trả lời ngay)
🌙 Cuối ca  → "Có đơn nào tôi chưa xử lý?"       (2 phút)
```

---

## 📆 Hằng tuần — "Khách VIP nào cần chú ý đặc biệt?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Muốn biết VIP nào sắp churn | `Top khách VIP + khách nào lâu không mua?` | Top khách theo LTV + khách dormant — để gọi chăm trước |
| Review pattern khiếu nại | `Đơn huỷ và hoàn tuần này có pattern gì?` | Nhóm lý do huỷ/hoàn, trend theo thời gian |

### 💡 Thói quen gợi ý

```
📅 Thứ 2 → "VIP + dormant cần chăm"            (10 phút)
📅 Thứ 6 → "Pattern huỷ/hoàn tuần này"          (5 phút)
```

---

## 📊 Hằng tháng — "Tệp khách có khoẻ không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Chạy campaign win-back | `Khách nào trên 90 ngày không mua?` | Danh sách reactivation — sẵn sàng bắn Zalo ZNS / email |
| Đánh giá chất lượng CS | `Tóm tắt đơn cần attention + hoàn tháng này` | Số đơn treo, refund, pattern — nhìn lại để cải thiện quy trình |

### 💡 Thói quen gợi ý

```
📊 Cuối tháng → "Reactivation candidates + review refund"    (15 phút)
```

---

## 🚀 Kịch bản nâng cao

### Firefighting — khách VIP đang bực

```text
Khách VIP gọi vào giận vì giao trễ. Tìm đơn gần nhất của SĐT 0912345678, tóm tắt tình trạng, và soạn lời xin lỗi phù hợp.
```

AI sẽ:
1. Tra khách → tìm đơn gần nhất
2. Xác định lý do trễ (thiếu vận đơn? kho hết hàng? lỗi thanh toán?)
3. Soạn script xin lỗi có ngữ điệu phù hợp — không phải "đọc template" vô cảm

### Hoàn tiền nhanh

```text
Kiểm tra refund của đơn #100005 và soạn quy trình hoàn tiền nội bộ.
```

---

## Liên kết

- [← Chọn vai trò khác](/su-dung-theo-vai-tro)
- [Bắt đầu trong 3 phút](/cam-tay-chi-viec)
- [FAQ](/cau-hoi-thuong-gap)
