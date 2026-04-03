---
title: "Demo 5 phút — MCP + Skills trên partner-hailm"
description: "Kịch bản demo nhanh 5 phút cho Haravan Master full MCP + OpenClaw skills trên shop partner-hailm."
robots: "noindex, nofollow"
keywords: "demo haravan mcp, demo openclaw haravan, partner-hailm demo"
---

# Demo 5 phút — MCP + Skills trên `partner-hailm`

> File này là **kịch bản demo ngắn** để mở ra và trình diễn ngay. Dữ liệu dưới đây đã được seed thật trên shop `partner-hailm.myharavan.com`.

## Mục tiêu demo

- Chứng minh `full MCP` có thể **ghi dữ liệu thật**
- Chứng minh `OpenClaw skills` có thể **đọc và kể chuyện business**
- Cho người xem thấy rõ 4 nhóm giá trị:
  - báo cáo nhanh
  - đơn cần chú ý
  - bất thường sản phẩm / giá / tồn
  - phân nhóm khách hàng

## Dữ liệu demo đã có

### Batch 1

- Product: `DEMO_HAILM_20260403 Hero Tee`
- Product: `DEMO_HAILM_20260403 Low Stock Polo`
- Product: `DEMO_HAILM_20260403 Compliance Hoodie`
- Customer: `demo_hailm_20260403-vip@example.com`
- Customer: `demo_hailm_20260403-reactivation@example.com`
- Order: `#100001` paid + fulfilled
- Order: `#100002` pending + not fulfilled
- Order: `#100003` pending + not fulfilled

### Batch 2

- Product: `DEMO_HAILM_EXTRA_20260403 Flash Sale Jacket`
- Customer: `demo_hailm_extra_20260403@example.com`
- Order: `#100004` paid + fulfilled
- Order: `#100005` pending + not fulfilled

## Kịch bản nói demo

### 1. Mở màn: “Tôi không cần nói tên API”

Nói với người xem:

> “Ở đây tôi không gọi endpoint hay viết query. Tôi chỉ nói chuyện với AI theo ngôn ngữ kinh doanh.”

Prompt:

```text
Cho tôi báo cáo kinh doanh ngày hôm nay (2026-04-03).
```

Kỳ vọng:

- `customerCount`: `4`
- `orderCount`: `5`
- `grossRevenue`: `943000`
- `attentionOrdersCount`: `3`

Điểm nên nhấn:

- AI đã đọc được dữ liệu vừa seed
- Top product đang có cả hàng bán tốt lẫn hàng có vấn đề

## 2. Flow vận hành: đơn nào đang cần xử lý?

Prompt:

```text
Có đơn nào cần chú ý thanh toán hoặc chưa giao không?
```

Kỳ vọng:

- Có `4` attention orders
- Ít nhất thấy rõ 3 đơn:
  - `#100002`
  - `#100003`
  - `#100005`

Điểm nên nhấn:

- Đây là flow COO / CS / vận hành
- AI không chỉ list đơn mà còn nêu lý do như `financial_not_paid`

## 3. Flow merchandising: phát hiện giá sai và catalog lỗi

Prompt:

```text
Quét giá sai và sản phẩm thiếu dữ liệu giúp tôi.
```

Kỳ vọng:

- `DEMO_HAILM_20260403 Compliance Hoodie` bị `zero_price`
- `DEMO_HAILM_20260403 Low Stock Polo` bị `compare_below_price`

Điểm nên nhấn:

- Dữ liệu demo được seed có chủ đích
- AI trả ra anomaly mà team business hiểu ngay, không cần đọc DB

## 4. Flow CRM: khách hàng giá trị cao

Prompt:

```text
Phân nhóm khách giá trị cao giúp tôi.
```

Kỳ vọng:

- `Demo VIP`: `398000`
- `Demo FlashSale`: `297000`

Điểm nên nhấn:

- Có thể dùng ngay cho sales / CRM / remarketing
- Prompt theo ngôn ngữ business, không theo ngôn ngữ kỹ thuật

## 5. Flow kho: low stock

Prompt:

```text
SKU nào đang low stock?
```

Kỳ vọng:

- Thấy các SKU demo như:
  - `DEMO_HAILM_EXTRA_20260403-JACKET-S`
  - `DEMO_HAILM_20260403-HERO-M`
  - `DEMO_HAILM_20260403-LOW-L`

Điểm nên nhấn:

- Shop live hiện cũng có nhiều SKU low stock thật
- Bộ demo chèn thêm SKU dễ nhận diện để người xem không bị lẫn

## 6. Câu chốt demo

Bạn có thể chốt bằng câu này:

> “Phần mạnh của bộ này không chỉ là AI đọc dữ liệu Haravan. Điểm mạnh là mình có thể seed, kiểm thử, rồi để AI nói lại thành ngôn ngữ business cho từng vai trò trong công ty.”

## Prompt dự phòng

Nếu cần chạy nhanh thêm 1-2 prompt:

```text
Kiểm tra rủi ro theme hiện tại.
```

```text
Cho tôi top khách hàng giá trị cao và đơn nào đang cần attention.
```

```text
Tóm tắt tình hình hôm nay như một COO.
```

## Lưu ý khi demo

- `theme draft` hiện **chưa demo write được** trên shop này vì API tạo theme yêu cầu `src`
- `reactivation` hiện chưa đẹp vì tool đang dùng `updated_at` làm proxy
- Các prompt mạnh nhất hiện tại là:
  - báo cáo ngày
  - đơn cần chú ý
  - anomaly giá
  - khách giá trị cao
  - low stock

## Link liên quan

- [Seed dữ liệu demo & kịch bản trình diễn](/demo-seed-va-kich-ban-demo)
- [Theo vai trò](/su-dung-theo-vai-tro)
- [Ma trận tool lean](/lean/playbook-tool-matrix)
