---
title: "Seed dữ liệu demo & kịch bản trình diễn MCP + Skills"
description: "Cách seed dữ liệu mẫu qua full MCP rồi demo theo vai trò CEO, vận hành, marketing và theme safety."
robots: "index, follow"
keywords: "seed demo haravan, mcp demo, openclaw demo, haravan sample data"
---

# Seed dữ liệu demo & kịch bản trình diễn

> Trang này dành cho lúc bạn cần **demo thật** bộ `Haravan Master full MCP + OpenClaw skills` trên shop thật, với dữ liệu mẫu có chủ đích.

## Khi nào nên dùng?

- Bạn sắp demo cho **chủ shop / vận hành / marketing**
- Bạn muốn `OpenClaw lean` trả ra insight đẹp hơn thay vì phụ thuộc hoàn toàn vào dữ liệu sẵn có
- Bạn cần chứng minh luôn rằng **full MCP có thể ghi dữ liệu thật**

## Seed bằng full MCP

### 1. Build trước

```bash
npm run build --workspace @haravan-master/core
npm run build --workspace @haravan-master/mcp
```

### 2. Xem trước seed plan

```bash
npx tsx scripts/seed-demo-via-mcp.ts --dry-run --prefix DEMO_HAILM
```

### 3. Seed thật lên shop

```bash
HARAVAN_SHOP=partner-hailm.myharavan.com \
HARAVAN_TOKEN=YOUR_TOKEN \
npx tsx scripts/seed-demo-via-mcp.ts --prefix DEMO_HAILM
```

### 4. Seed thêm webhook hoặc inventory khi cần

```bash
HARAVAN_SHOP=partner-hailm.myharavan.com \
HARAVAN_TOKEN=YOUR_TOKEN \
HARAVAN_DEMO_WEBHOOK_URL=https://example.com/hook \
HARAVAN_DEMO_LOCATION_ID=101 \
npx tsx scripts/seed-demo-via-mcp.ts --prefix DEMO_HAILM
```

## Script này tạo gì?

- **3 sản phẩm demo**
  - 1 sản phẩm hero để lên đơn đẹp
  - 1 sản phẩm tồn thấp + compare_at lệch để demo anomaly
  - 1 sản phẩm thiếu nội dung + giá 0 / SKU trùng để demo compliance
- **2 khách hàng demo**
  - 1 khách VIP
  - 1 khách dormant / reactivation
- **3 đơn hàng demo**
  - 1 đơn paid cho khách VIP
  - 1 đơn mở chưa fulfill để kéo SLA / attention
  - 1 đơn edge-case cho pricing discussion
- **1 fulfillment demo** để có cả fulfilled và unfulfilled
- **1 theme draft + 1 asset snippet** để demo safe theme operations
- **Optional:** webhook và set inventory nếu bạn truyền thêm biến môi trường

## Kịch bản trình diễn gợi ý

### Phần 1: CEO / Chủ shop

1. “Cho tôi **báo cáo nhanh hôm nay** của shop.”
2. “Tóm tắt **đơn cần chú ý** và điểm nào đang có rủi ro vận hành.”
3. “Ước tính **P&L tháng** và nhắc tôi chỗ nào cần kế toán xác nhận.”

### Phần 2: COO / Vận hành

1. “Có **đơn nào sắp lỡ SLA** hoặc chưa giao không?”
2. “SKU nào **tồn thấp / tồn âm / dễ oversell**?”
3. “Sản phẩm nào đang có **giá hoặc dữ liệu catalog bất thường**?”

### Phần 3: Marketing / CRM

1. “Tìm cho tôi **khách giá trị cao** và gợi ý cách chăm sóc.”
2. “Khách nào có thể đưa vào **reactivation campaign**?”
3. “**Khuyến mãi đang chạy** có gì cần lưu ý không?”

### Phần 4: Theme Safety

1. “Kiểm tra **rủi ro theme** hiện tại.”
2. “Preview thay đổi theme draft cho tôi trước.”
3. “Chỉ khi tôi xác nhận thì mới tiếp tục thao tác ghi.”

## Ghi chú an toàn

- Script này đi qua **full MCP**, không seed trực tiếp qua core SDK.
- Dữ liệu demo dùng prefix như `DEMO_HAILM_*` để dễ nhận biết.
- `promotion_health`, `weekly_ops_audit`, `monthly_pl_estimate`, `tax_compliance_snapshot` vẫn có thể dựa một phần vào dữ liệu live sẵn có.
- Với webhook / inventory, chỉ seed khi bạn chắc shop đang hỗ trợ endpoint tương ứng.

## Sau buổi demo

- Ghi lại danh sách object đã tạo từ output `Seed summary`
- Theme demo nên giữ ở trạng thái **draft / unpublished**
- Nếu cần dọn dẹp sâu hơn, ưu tiên xoá theo prefix / tag `DEMO_HAILM`

## Liên kết

- [Theo vai trò](/su-dung-theo-vai-tro)
- [Lưu ý an toàn](/lean/safety-disclaimers)
- [Năng lực & use cases](/nang-luc-va-use-cases-theo-vai-tro)
