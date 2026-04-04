---
title: "Câu hỏi thường gặp — dùng AI cho shop Haravan"
description: "Trả lời nhanh: AI có sửa nhầm shop không? Token lưu ở đâu? Không thấy tool? Số liệu có đúng không?"
robots: "index, follow"
keywords: "faq haravan ai, an toàn ai haravan, lỗi token haravan, đặt câu hỏi haravan"
---

# Câu hỏi thường gặp

::: tip Không thấy câu trả lời?
Quay lại [Bắt đầu trong 3 phút](/cam-tay-chi-viec), hoặc nhờ IT xem [Cài đặt kỹ thuật](/cai-dat-va-thiet-lap).
:::

---

## 🛡️ An toàn & bảo mật

**AI có tự ý sửa shop tôi không?**

Không. Mặc định AI chỉ **đọc dữ liệu và báo cáo**. Các thao tác ghi (sửa theme, chỉnh kho, gắn tag…) đều cần bạn **xác nhận rõ ràng** trong chat. Nếu AI hỏi "Bạn có chắc?" — hãy trả lời rõ Có hoặc Không. Đọc thêm [cam kết an toàn](/lean/safety-disclaimers).

**Token dán ở đâu cho an toàn?**

Chỉ lưu trong **file cấu hình trên máy bạn** (config plugin hoặc biến môi trường). **Không** dán token vào:
- Chat công khai (Zalo group, Slack, Facebook…)
- Email
- File commit lên GitHub

**Lỡ token bị lộ thì sao?**

Vào Haravan admin → **thu hồi token cũ** → **tạo token mới** → cập nhật lại config → restart app. Làm ngay, đừng chần chừ.

**Tên shop viết thế nào?**

Dạng `ten-ban.myharavan.com` — **không** thêm `https://`, **không** thêm `/admin`.

---

## ⚙️ Cài đặt & kết nối

**Mở AI lên nhưng không thấy tool Haravan.**

Kiểm tra 3 thứ:
1. Đã chạy `npm run build` trong thư mục repo chưa?
2. Đường dẫn trong config có đúng tới `dist/index.js` không?
3. Đã **restart** app AI (OpenClaw / Cursor / Claude) sau khi sửa config?

**Báo lỗi "Cannot find module".**

Bạn cần [Node.js phiên bản 20 trở lên](https://nodejs.org/). Mở terminal, gõ `node -v` kiểm tra. Nếu chưa cài, cài xong chạy lại `npm install && npm run build`.

**`npm run doctor-openclaw` báo thiếu file.**

Chạy lại build:
```bash
npm run build --workspaces --if-present
```

---

## 💬 Khi dùng AI

**AI trả lời chung chung, không có số liệu.**

Có thể MCP chưa bật hoặc token hết hạn. Thử:
- Nói rõ ngày: *"Báo cáo ngày hôm nay (2026-04-04)"*
- Nói rõ dùng tool: *"Lấy dữ liệu từ shop qua tool"*
- Kiểm tra lại token còn hiệu lực không

**Số thuế / P&L có đúng không?**

Đây là **ước tính để nhắc việc**, không phải báo cáo thuế chính thức. Bạn vẫn cần kế toán / cố vấn thuế để làm khai báo pháp lý.

**Tôi có thể hỏi bằng tiếng Anh không?**

Được. Nhưng AI được tối ưu cho tiếng Việt — hỏi tiếng Việt sẽ cho kết quả tự nhiên hơn. Tên field/tool trong hệ thống vẫn dùng tiếng Anh kỹ thuật.

---

## 🔧 Khác

**Khác gì bản "33 tools" (Haravan Master full)?**

| | Haravan Master (full) | OpenClaw Haravan Ops (lean) |
|---|-----|------|
| **Số tool** | ~33 | ~15-20 composite |
| **Phù hợp** | IT / Dev / thao tác sâu | Chủ shop / vận hành / hỏi nhanh |
| **Đọc/Ghi** | Đọc + Ghi đầy đủ | Ưu tiên đọc, ghi cần xác nhận |
| **Ngôn ngữ hỏi** | Tên API / kỹ thuật | Tiếng Việt business |

Bạn non-tech? Dùng **lean** là đủ. Xem [năng lực chi tiết](/nang-luc-va-use-cases-theo-vai-tro).

**Muốn tải gói cài ngoại tuyến.**

Xem [Gói phân phối cục bộ](/goi-phan-phoi-cuc-bo).

---

## Liên kết nhanh

- [Trang chủ](/)
- [Bắt đầu trong 3 phút](/cam-tay-chi-viec)
- [Câu hỏi theo vai trò](/su-dung-theo-vai-tro)
- [Năng lực & use case](/nang-luc-va-use-cases-theo-vai-tro)
