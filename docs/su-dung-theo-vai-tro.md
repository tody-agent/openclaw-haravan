---
title: "Câu hỏi mẫu theo vai trò — copy dán mỗi ngày"
description: "Chủ shop, vận hành, marketing, CS — mỗi vai trò có câu hỏi riêng. Copy vào chat AI, nhận kết quả từ shop Haravan."
robots: "index, follow"
keywords: "câu hỏi AI haravan, prompt mẫu chủ shop, vận hành haravan AI, marketing AI haravan"
---

# Câu hỏi mẫu theo vai trò

> Bạn không cần nhớ tên tool. Chỉ cần **copy câu hỏi** dưới đây, dán vào chat AI, và đọc kết quả. AI tự biết gọi đúng tool.

::: info 💡 Nguyên tắc chung
1. **Hỏi như nói với trợ lý:** "Hôm nay doanh thu?", "Đơn nào chưa giao?" — giọng bình thường, tiếng Việt.
2. **Đọc trước, sửa sau:** AI chỉ đọc dữ liệu. Việc sửa (theme, kho, tag…) cần bạn xác nhận rõ.
3. **Số thuế / P&L:** Coi là nhắc việc, không thay kế toán — xem [cam kết an toàn](/lean/safety-disclaimers).
:::

---

## 🏪 Chủ shop / Giám đốc

> **Mục tiêu:** Mỗi sáng 5 phút biết hết, ưu tiên việc quan trọng.

### Buổi sáng — mở shop

```text
Cho tôi báo cáo nhanh hôm nay: bao nhiêu đơn, doanh thu, có gì cần chú ý?
```

**Kỳ vọng:** AI trả về doanh thu ngày, số đơn, đơn chưa thanh toán / chưa giao, AOV.

```text
So với hôm qua, doanh thu và số đơn thay đổi thế nào?
```

**Kỳ vọng:** So sánh nhanh 2 ngày — tăng/giảm bao nhiêu %.

### Rủi ro & vận hành

```text
Có đơn nào sắp lỡ SLA hoặc chưa giao? Liệt kê 5 đơn ưu tiên.
```

**Kỳ vọng:** Danh sách đơn kèm lý do (chưa thanh toán, chưa có vận đơn, quá hạn giao).

```text
Tồn kho có chỗ nào âm hoặc sắp hết? Gợi ý nhập hàng.
```

**Kỳ vọng:** SKU low stock, SKU oversell, gợi ý restock dựa trên tốc độ bán.

### Tài chính (ước tính — luôn đối chiếu sổ sách)

```text
Ước tính P&L tháng này — nhắc chỗ nào cần kế toán xác nhận.
```

```text
Tóm tắt rủi ro thuế theo dữ liệu shop (ghi rõ đây là ước tính).
```

### 💡 Thói quen gợi ý

**5 phút sáng:** Báo cáo nhanh + đơn cần chú ý  
**5 phút chiều:** "Chốt sổ cuối ngày" — đối soát đơn + tồn kho

---

## 📦 Vận hành / Kho / CS

> **Mục tiêu:** Xử lý đơn, ship, kho, khiếu nại — ít click admin hơn.

### Đơn hàng & giao hàng

```text
Liệt kê đơn chưa giao hoặc chưa có mã vận đơn, ưu tiên theo thời gian.
```

**Kỳ vọng:** Danh sách đơn unfulfilled, sắp xếp theo cũ nhất trước.

```text
Đơn huỷ và hoàn tuần này có pattern gì không?
```

**Kỳ vọng:** Tổng hợp lý do huỷ/hoàn, nhận diện trend (nếu có).

### Tồn kho

```text
SKU nào sắp hết dưới 10 cái? Gom theo kho nếu có.
```

**Kỳ vọng:** Bảng SKU + tồn hiện tại + kho location.

```text
Có oversell hoặc tồn âm không? Chỉ ra từng SKU.
```

**Kỳ vọng:** Cảnh báo tức thì nếu có variant đang bán khi kho = 0.

### Khách hàng

```text
Tìm khách theo SĐT 0987654321 và tóm tắt lịch sử mua.
```

```text
Top 10 khách mua nhiều nhất 30 ngày qua?
```

**Kỳ vọng:** Bảng khách + tổng chi + số đơn, sắp xếp theo LTV.

---

## 📣 Marketing / Chăm sóc tệp khách

> **Mục tiêu:** Phân nhóm khách, phát hiện khách "ngủ quên", kiểm tra khuyến mãi.

### Tệp khách & VIP

```text
Phân nhóm khách giá trị cao và gợi ý chiến dịch chăm sóc.
```

**Kỳ vọng:** Top khách VIP theo LTV, gợi ý remarketing.

```text
Tìm khách lâu không mua (trên 90 ngày) để nhắc remarketing.
```

**Kỳ vọng:** Danh sách khách dormant — có thể bắn Zalo ZNS hoặc email kéo lại.

### Khuyến mãi

```text
Khuyến mãi đang chạy có bất thường gì không? (dùng ít, lỗ, trùng)
```

**Kỳ vọng:** Health check KM — mã hết hạn vẫn active, mã trùng, mã ít dùng.

```text
Quét giá sai và sản phẩm thiếu dữ liệu giúp tôi.
```

**Kỳ vọng:** Cảnh báo giá 0đ, giá bán < giá vốn, sản phẩm thiếu ảnh/mô tả.

---

## 🎨 Giao diện (theme) — chỉ khi bạn thật sự cần

::: danger ⚠️ Thao tác giao diện có thể ảnh hưởng website
Luôn yêu cầu AI: **chỉ sửa trên bản nháp**, **xem trước**, và **bạn xác nhận** trước khi áp dụng. Đọc thêm [cam kết an toàn](/lean/safety-disclaimers).
:::

```text
Kiểm tra rủi ro theme hiện tại (file quan trọng, bản main…).
```

```text
Tạo theme bản nháp tên "test-color" để thử đổi màu nút Mua — tôi sẽ xác nhận.
```

---

## 🔁 Thói quen 5 phút mỗi ngày

| Thời gian | Câu hỏi gợi ý | Mục đích |
|-----------|---------------|---------|
| **8:00 sáng** | "Báo cáo nhanh hôm nay" | Nắm bức tranh tổng |
| **10:00 sáng** | "Đơn nào cần xử lý trước 12h?" | Ưu tiên fulfillment |
| **14:00 chiều** | "SKU nào sắp hết? KM nào bất thường?" | Phòng ngừa |
| **17:00 chiều** | "Chốt sổ cuối ngày" | Đối soát + bàn giao ca |

---

## Bước tiếp

- [Cài đặt nếu chưa xong](/cai-dat-va-thiet-lap)
- [FAQ & xử lý sự cố](/cau-hoi-thuong-gap)
- [AI làm được gì?](/nang-luc-va-use-cases-theo-vai-tro)
- [Trang chủ](/)
