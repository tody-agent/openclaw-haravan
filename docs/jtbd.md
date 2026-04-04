---
title: JTBD — Công việc khách hàng “thuê” Haravan Claw Master làm
description: >-
  Jobs-To-Be-Done theo tình huống: khi nào, muốn gì, để được gì — gắn với trang hướng dẫn.
keywords: >-
  JTBD, Haravan Claw Master, jobs to be done, vận hành shop
robots: index, follow
---

# Jobs-To-Be-Done (JTBD)

::: info Khung
Mỗi dòng: **Khi** [tình huống], tôi muốn [kết quả], **để** [giá trị cuối]. Haravan Claw Master là **công cụ**; bạn vẫn quyết định trên Haravan admin / sổ sách.
:::

## Vận hành hằng ngày

| Khi… | Tôi muốn… | Để… | Tài liệu |
|------|-----------|-----|----------|
| Sáng mở shop | Một snapshot nhanh đơ / doanh thu / bất thường | Ưu tiên việc trong 15 phút đầu | [Demo 5 phút](/demo-5-phut), [Sử dụng theo vai trò](/su-dung-theo-vai-tro) |
| Trước giờ ship | Biết đơn nào rủi ro SLA | Giảm hủy / khiếu nại | [Năng lực & use cases](/nang-luc-va-use-cases-theo-vai-tro) |
| Cuối ngày | Đối soát nhanh | Bàn giao ca hoặc báo cáo nội bộ | [Sử dụng theo vai trò](/su-dung-theo-vai-tro) |

## Tồn & catalog

| Khi… | Tôi muốn… | Để… | Tài liệu |
|------|-----------|-----|----------|
| Chuẩn bị sale | Thấy variant tồn thấp / âm | Tránh oversell | [Câu hỏi mẫu trên trang chủ](/) |
| Audit định kỳ | Quét giá / mô tả bất thường | Giảm lỗi niêm yết | [Năng lực & use cases](/nang-luc-va-use-cases-theo-vai-tro) |

## Khuyến mãi & tuân thủ (ước tính)

| Khi… | Tôi muốn… | Để… | Tài liệu |
|------|-----------|-----|----------|
| Trước chiến dịch | Health check KM đang chạy | Tắt / sửa kịp | [Năng lực](/nang-luc-va-use-cases-theo-vai-tro) |
| Cuối tháng | Nhắc thuế / P&L ước tính | **Không** thay kế toán — chỉ nhắc việc | [Disclaimer](/lean/safety-disclaimers), [FAQ](/cau-hoi-thuong-gap) |

## Tích hợp & mở rộng

| Khi… | Tôi muốn… | Để… | Tài liệu |
|------|-----------|-----|----------|
| Team dùng Cursor/Claude | MCP ổn định, env chuẩn | Lặp lại được trên máy dev | [Cài đặt](/cai-dat-va-thiet-lap) |
| Chỉ dùng OpenClaw | Plugin một lần cấu hình | Ít sửa JSON tay | [Plugin](/plugin-openclaw) |

## 4 lực (Push / Pull / Anxiety / Habit)

- **Push:** quá nhiều màn hình Haravan, thiếu thời gian.
- **Pull:** một câu hỏi → tín hiệu có cấu trúc.
- **Anxiety:** AI sửa nhầm production → kit **đọc trước**, ghi có xác nhận / tool optional.
- **Habit:** vẫn vào admin khi cần thao tác chính thức — trợ lý **bổ trợ**, không thay dashboard.

Xem thêm: [Personas](/personas) · [Cầm tay chỉ việc](/cam-tay-chi-viec)
