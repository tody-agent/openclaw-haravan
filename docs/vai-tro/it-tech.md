---
title: "💻 IT / CTO / SysAdmin — Playbook ngày · tuần · tháng"
description: "JTBD cho IT Haravan: health check, theme safety, doctor debug, packaging, demo seed."
keywords: "it haravan, cto haravan ai, theme safety, webhook, doctor, mcp, sysadmin haravan"
robots: "index, follow"
---

# 💻 IT / CTO / SysAdmin

> **Bạn là người giữ cho hệ thống chạy và an toàn.** Kết nối API, bảo vệ theme, debug khi có lỗi, cài đặt cho team business, đóng gói nội bộ. AI giúp bạn audit nhanh và phát hiện vấn đề trước khi ảnh hưởng tới shop.

---

## Bạn sẽ dùng những gì?

| Nhóm | Công cụ AI sẽ gọi | Mục đích |
|------|-------------------|---------|
| 🎨 Theme | `audit_theme_risk`, `theme_draft_create`, `preview_theme_change` | Audit theme, tạo draft an toàn |
| 🏭 Kho & địa điểm | `haravan_list_locations`, `haravan_get_location` | Kiểm tra location setup |
| 🔌 API thô | `haravan_com_api`, `haravan_web_api` | Gọi API trực tiếp khi cần |
| 🏷️ Tags | `haravan_order_tags_*`, `haravan_product_tags_*` | Quản lý tags đơn/sản phẩm |
| 📊 Compliance | `product_compliance_scan`, `pricing_anomaly_scan` | Quét lỗi catalog & giá |

::: info 📌 IT dùng lớp Full MCP làm chính
Bạn sẽ dùng toàn bộ tool set, bao gồm cả write tools. Lớp lean là để bạn bàn giao cho end user business.
:::

---

## 📅 Hằng ngày — "Hệ thống có ổn không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Check theme đầu ngày | `Kiểm tra rủi ro theme hiện tại` | Số theme main/draft, config bất thường, cờ cảnh báo |
| Debug đơn cụ thể | `Xem chi tiết đơn #100005` | Toàn bộ data đơn: line items, fulfillment, transactions, notes |
| Check kho location | `Liệt kê tất cả location/kho` | Danh sách kho, trạng thái, active/inactive |

### 💡 Thói quen gợi ý

```
☀️ 9:00 → "Audit theme risk"                  (2 phút — phát hiện sớm)
🔥 Khi có ticket → Tra đơn/khách + check API   (theo nhu cầu)
```

---

## 📆 Hằng tuần — "Catalog sạch không? Config đúng không?"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Review catalog health | `Quét sản phẩm thiếu ảnh, mô tả, hoặc SKU trùng` | Danh sách compliance issues — giao marketing/ops sửa |
| Check giá bất thường | `Quét giá sai toàn shop` | Giá 0đ, compare_at sai, giảm giá shock |
| Kiểm tra tags lộn xộn | `Liệt kê tags đơn #[id]` rồi cleanup | Tags hiện tại → gỡ tags rác |

### 💡 Thói quen gợi ý

```
📅 Thứ 3 → "Product compliance + pricing scan"   (10 phút)
📅 Thứ 6 → "Theme audit + location check"         (5 phút)
```

---

## 📊 Hằng tháng — "Audit toàn hệ thống"

| Khi bạn… | Hỏi AI… | Bạn sẽ thấy… |
|----------|---------|--------------|
| Audit tổng hệ thống | `Weekly audit + theme risk + compliance scan` | Bức tranh toàn cảnh: shop health + theme + catalog |
| Chuẩn bị demo cho team | `Seed dữ liệu demo và chạy kịch bản 5 phút` | Dữ liệu sẵn sàng demo cho business stakeholders |
| Đóng gói offline cho team | Build tarball theo [gói phân phối cục bộ](/goi-phan-phoi-cuc-bo) | Package `.tgz` cho team không có internet |
| Chuẩn bị onboard nhân viên mới | Cài plugin cho họ theo [3 phút](/cam-tay-chi-viec) | Nhân viên mới hỏi AI được ngay ngày đầu |

### 💡 Thói quen gợi ý

```
📊 Ngày 1 → "Full system audit"                    (20 phút)
📊 Khi có nhân viên mới → "Setup + bàn giao playbook vai trò"   (30 phút)
```

---

## 🚀 Kịch bản IT nâng cao

### Doctor & debug kết nối

```bash
# Kiểm tra build
npm run doctor-mcp
npm run doctor-openclaw

# Kiểm tra kết nối thủ công
node packages/mcp-server/dist/index.js
```

### Theme safety — tạo draft an toàn

```text
Tạo theme draft tên "test-banner" để thử thay banner — tôi sẽ xác nhận.
```

AI sẽ: audit risk trước → hỏi confirm → tạo draft (không đụng theme main).

### Gọi API thô khi cần

```text
Gọi GET /admin/custom_collections.json giúp tôi.
```

```text
Đếm tổng sản phẩm đang active.
```

::: danger ⚠️ API thô
`haravan_com_api` và `haravan_web_api` cho phép gọi bất kỳ endpoint nào. POST/PUT/DELETE có thể ghi dữ liệu thật. Cẩn thận — AI sẽ hỏi xác nhận trước khi ghi.
:::

---

## Liên kết

- [← Chọn vai trò khác](/su-dung-theo-vai-tro)
- [Cài đặt kỹ thuật](/cai-dat-va-thiet-lap)
- [Danh mục Ops Tools](/api-ops-tools)
- [FAQ](/cau-hoi-thuong-gap)
