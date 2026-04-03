---
title: "Dùng OpenClaw Haravan Ops theo vai trò — Câu mẫu cho business"
description: "Hướng dẫn chủ shop, vận hành, marketing nói chuyện với AI: báo cáo sáng, đơn hàng, tồn kho, khách VIP, an toàn khi cho phép ghi dữ liệu."
robots: "index, follow"
keywords: "haravan ai chủ shop, câu lệnh ai haravan, vận hành haravan openclaw, marketing haravan ai"
---

# Hướng dẫn theo vai trò

:::info Cách đọc trang này
Mỗi mục dưới đây là **giọng nói** của một vai trong doanh nghiệp. Bạn chỉ việc **copy–chỉnh** câu mẫu cho đúng tên shop / ngày.  
Danh sách tool chi tiết nằm ở [ma trận playbook](/lean/playbook-tool-matrix) và trong skill `openclaw-haravan-ops` trong repo này (`skills/openclaw-haravan-ops/`).

Nếu bạn muốn xem bản tổng hợp đầy đủ hơn về **năng lực tổng thể, use case, sự khác nhau giữa full MCP và OpenClaw lean theo từng nhóm trách nhiệm**, đọc thêm [Năng lực & use case của bộ kit](/nang-luc-va-use-cases-theo-vai-tro).
:::

---

## Nguyên tắc chung (mọi vai đều nên biết)

1. **Hỏi như nói với trợ lý:** “Hôm nay doanh thu?”, “Đơn nào chưa giao?”, “SKU nào sắp hết?” — không cần tên kỹ thuật.  
2. **Đọc trước, ghi sau:** Các thao tác **sửa theme, chỉnh kho, gắn tag khách** thường cần bạn **xác nhận rõ** trong chat. Nếu AI hỏi “Bạn có chắc?”, hãy trả lời rõ **Có / Không**.  
3. **Số thuế & lãi lỗ:** Coi là **hỗ trợ quyết định**, không thay **kế toán** — xem [disclaimer](/lean/safety-disclaimers).

Nếu bạn đang chuẩn bị **demo có dữ liệu mẫu**, seed trước bằng runbook tại [Seed dữ liệu demo & kịch bản trình diễn](/demo-seed-va-kich-ban-demo).

---

## Chủ shop / Giám đốc

**Mục tiêu:** một ảnh tổng quan nhanh để ra quyết định, không lạc trong bảng số.

<details>
<summary><strong>Câu mẫu — buổi sáng</strong></summary>

- “Cho tôi **báo cáo nhanh hôm nay** của shop: bao nhiêu đơn, doanh thu, đơn nào cần chú ý thanh toán.”  
- “So với hôm qua, **doanh thu và số đơn** thay đổi thế nào?” (nếu tool hỗ trợ so sánh / bạn cung cấp ngày).

</details>

<details>
<summary><strong>Câu mẫu — rủi ro & vận hành</strong></summary>

- “Có **đơn nào sắp lỡ SLA** hoặc chưa giao không? Liệt kê 5 đơn ưu tiên.”  
- “**Tồn kho** có chỗ nào âm hoặc sắp hết không? Gợi ý nhập hàng.”

</details>

<details>
<summary><strong>Câu mẫu — tài chính / thuế (ước tính)</strong></summary>

- “Tóm tắt **tình hình thuế / nhắc kê khai** theo dữ liệu shop (ghi rõ đây là ước tính).”  
- “Ước tính **P&L tháng** — nhắc tôi chỗ nào cần kế toán xác nhận.”

</details>

**Gợi ý thói quen:** 5–10 phút đầu ngày + 5 phút cuối ngày với câu kiểu “**Chốt sổ cuối ngày**” nếu pack của bạn có workflow tương ứng.

---

## Người vận hành / Kho / Chăm sóc khách

**Mục tiêu:** xử lý đơn, ship, kho, khiếu nại — ít click admin hơn.

<details>
<summary><strong>Đơn hàng & giao hàng</strong></summary>

- “Liệt kê đơn **chưa giao** hoặc **chưa có mã vận đơn**, ưu tiên theo thời gian.”  
- “Đơn **huỷ / hoàn** tuần này có pattern gì không?”

</details>

<details>
<summary><strong>Tồn kho</strong></summary>

- “SKU nào **sắp hết** dưới ngưỡng X? Gom theo kho nếu có.”  
- “Có **oversell** hoặc tồn âm không? Chỉ ra từng SKU.”

</details>

<details>
<summary><strong>Khách hàng</strong></summary>

- “Tìm khách theo **SĐT …** và tóm tắt lịch sử mua.”  
- “Ai là **khách mua nhiều nhất** 30 ngày qua?”

</details>

---

## Marketing / Chăm sóc tệp khách

**Mục tiêu:** phân nhóm khách, phát hiện khách “ngủ quên”, health của khuyến mãi.

<details>
<summary><strong>Tệp khách & VIP</strong></summary>

- “Phân nhóm **khách giá trị cao** và gợi ý chiến dịch chăm sóc.”  
- “Tìm **khách lâu không mua** để nhắc remarketing.”

</details>

<details>
<summary><strong>Khuyến mãi</strong></summary>

- “**Khuyến mãi đang chạy** có bất thường (dùng ít, lỗ, trùng)?”  
- “Gợi ý điều chỉnh **giá / combo** dựa trên dữ liệu bán.”

</details>

---

## Giao diện (theme) — chỉ khi bạn thật sự cần

:::danger Thao tác giao diện có thể ảnh hưởng website
Luôn yêu cầu AI: **chỉ sửa trên bản nháp**, **xem trước**, và **bạn xác nhận** trước khi áp dụng. Đọc thêm [an toàn theme](/lean/safety-disclaimers).
:::

- “**Kiểm tra rủi ro** theme hiện tại (file quan trọng, bản main…).”  
- “Tạo **theme bản nháp** tên … để thử thay màu nút Mua — tôi sẽ xác nhận sau khi xem preview.”

---

## Bước tiếp

- [Cài đặt nếu chưa xong](/cai-dat-va-thiet-lap)  
- [FAQ & xử lý sự cố](/cau-hoi-thuong-gap)  
- [Trang tổng OpenClaw kit](/)
