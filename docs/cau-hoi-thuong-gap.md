---
title: "FAQ — OpenClaw Haravan Ops cho người kinh doanh"
description: "Câu hỏi thường gặp: token, MCP không chạy, AI không thấy tool, lo sợ AI sửa nhầm shop, Node.js."
robots: "index, follow"
keywords: "faq haravan mcp, lỗi token haravan, openclaw không kết nối, ai haravan lỗi"
---

# Câu hỏi thường gặp

:::tip Không tìm thấy câu trả lời?
Quay lại [Cài đặt & thiết lập](/openclaw-kit/cai-dat-va-thiet-lap) hoặc nhờ IT chạy `npm run doctor-openclaw` trong thư mục project và gửi bạn **ảnh chụp màn hình** (che token).
:::

---

## Token & bảo mật

**Hỏi: Token dán ở đâu là an toàn?**  
**Đáp:** Chỉ trong **file cấu hình MCP** trên máy bạn (hoặc máy nội bộ công ty). Không dán vào chat công khai, email, Slack công khai.

**Hỏi: Token bị lộ thì sao?**  
**Đáp:** Vào Haravan **thu hồi / tạo token mới** ngay, cập nhật lại cấu hình MCP, khởi động lại app AI.

**Hỏi: `HARAVAN_SHOP` viết thế nào?**  
**Đáp:** Thường là `ten-ban.myharavan.com` — **không** thêm `https://`, không thêm `/admin`.

---

## Cài đặt & kết nối

**Hỏi: Mở AI lên không thấy tool Haravan.**  
**Đáp:**  
1. Đã **build** `openclaw-haravan-ops-mcp` chưa? (xem [Cài đặt](/openclaw-kit/cai-dat-va-thiet-lap)).  
2. Đường dẫn trong `args` có **đúng** tới `dist/index.js` không?  
3. Đã **restart** OpenClaw / Cursor / Claude sau khi sửa config?

**Hỏi: Báo lỗi “Cannot find module” hoặc không chạy được `node`.**  
**Đáp:** Cài [Node.js LTS](https://nodejs.org/). Mở terminal gõ `node -v` — nên ≥ 20.

**Hỏi: `npm run doctor-openclaw` báo thiếu file dist.**  
**Đáp:** Trong thư mục repo chạy lại:

```bash
npm run build --workspace @haravan-master/core
npm run build --workspace @haravan-master/openclaw-haravan-ops-mcp
```

---

## Khi dùng AI

**Hỏi: AI trả lời chung chung, không có số.**  
**Đáp:** Nói rõ **ngày**, **“lấy dữ liệu từ shop qua tool”**, hoặc dùng câu mẫu trong [hướng dẫn vai trò](/openclaw-kit/su-dung-theo-vai-tro). Kiểm tra MCP đã bật và token còn hiệu lực.

**Hỏi: Sợ AI xoá nhầm dữ liệu.**  
**Đáp:** Bộ lean ưu tiên **đọc & báo cáo**. Việc **ghi** (theme, kho, tag…) cần **xác nhận rõ** trong chat — đừng đồng ý mơ hồ. Đọc [disclaimer an toàn](/openclaw-lean/safety-disclaimers).

**Hỏi: Số thuế / lãi có đúng không?**  
**Đáp:** Là **hỗ trợ & ước tính**. Quyết định pháp lý và kê khai: **kế toán / cố vấn thuế**.

---

## Khác

**Hỏi: Khác gì bản Haravan Master “33 tools”?**  
**Đáp:** Bản **OpenClaw lean** tập trung **nghiệp vụ vận hành**, ít tool hơn nhưng **mỗi tool gần với một việc bạn hay hỏi**. Bản đầy đủ xem [Cài 1 lệnh](/guide/setup) và [33 tools](/api/tools-reference).

**Hỏi: Muốn tải gói cài ngoại tuyến.**  
**Đáp:** Xem [Gói phân phối cục bộ](/openclaw-kit/goi-phan-phoi-cuc-bo).

---

## Liên kết nhanh

- [Trang chủ bộ kit](/openclaw-kit/)  
- [Cài đặt & thiết lập](/openclaw-kit/cai-dat-va-thiet-lap)  
- [Ma trận tool & use case](/openclaw-lean/playbook-tool-matrix)
