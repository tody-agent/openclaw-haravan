---
title: "Cầm tay chỉ việc: 3 Bước để có Trợ lý AI 'đọc hiểu' Shop Haravan"
description: >-
  Hướng dẫn siêu đơn giản cho chủ shop: từ lúc chưa có gì đến khi
  chat được với AI về dữ liệu shop thật — chỉ trong 3 phút.
keywords: >-
  hướng dẫn Haravan AI, trợ lý ảo Haravan, OpenClaw Haravan, báo cáo shop bằng AI
robots: index, follow
---

# Cầm tay chỉ việc: Có ngay trợ lý AI sau 3 phút

Chào bạn! Nếu bạn là chủ shop Haravan và muốn có một "đệ tử" AI túc trực 24/7 để báo cáo doanh thu, soi đơn hàng lỗi hay nhắc tồn kho mà **không muốn đụng vào code**, thì đây là bài viết dành cho bạn.

Chúng ta sẽ đi qua 3 bước "mì ăn liền" cực nhanh:

---

## Bước 1: Lấy "chìa khóa" vào shop (🔑)

Để AI đọc được dữ liệu, bạn cần cung cấp cho nó 2 thông tin bảo mật từ trang quản trị Haravan:

1.  **Tên shop:** Là cái tên trước chữ `.myharavan.com`. (Ví dụ: `tody-chi-nhanh-1`)
2.  **Mã bảo mật (Token):** Bạn vào *Cấu hình* -> *Ứng dụng* -> *Tạo ứng dụng riêng*. Sau khi lưu, hãy copy dòng **Access Token**.

::: tip 💡 Mẹo nhỏ
Nếu bạn thấy phần này hơi "lạ lẫm", hãy gửi trang [Cài đặt kỹ thuật](/cai-dat-va-thiet-lap) này cho bạn IT của shop, bạn ấy sẽ lấy giúp bạn trong 30 giây!
:::

---

## Bước 2: Kết nối AI với Shop (🛠️)

Hiện tại, cách dễ nhất là dùng **OpenClaw** (phần mềm chat AI chuyên dụng cho công việc).

1.  **Mở OpenClaw** lên.
2.  Tìm mục **Plugins** (hoặc Tiện ích mở rộng).
3.  Chọn cài đặt **Haravan Ops**.
4.  Dán **Tên shop** và **Mã bảo mật** bạn vừa lấy ở Bước 1 vào.

::: details 🤓 Dành cho bạn nào thích mày mò (Kỹ thuật)
Nếu bạn muốn tự cài bằng lệnh terminal, hãy nhấn vào đây:
```bash
# Cài đặt plugin qua OpenClaw CLI
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```
Hoặc xem hướng dẫn chi tiết tại: [Plugin Haravan Ops](/plugin-openclaw).
:::

---

## Bước 3: "Ra lệnh" cho trợ lý AI (💬)

Bây giờ là lúc tận hưởng thành quả. Bạn hãy mở khung chat AI và thử copy-paste nguyên văn các câu dưới đây:

### 📊 "Soi" tình hình kinh doanh
> *"Hôm nay shop bán buôn thế nào? Có đơn nào khách đặt mà mình chưa xử lý không?"*

### ⚠️ Tìm lỗi vận hành
> *"Có đơn hàng nào đang bị giao chậm hoặc khách than phiền gì không? Liệt kê cho mình các đơn cần chú ý gấp."*

### 📦 Kiểm kho nhanh
> *"Những món nào sắp hết hàng? Có cái nào tồn kho nhiều mà bán chậm không?"*

---

## AI sẽ trả lời bạn như thế nào?

Thay vì trả lời chung chung, Trợ lý AI sẽ đưa ra con số thật từ shop của bạn:
*   **Doanh thu:** *"Dạ hôm nay shop mình chốt được 15 đơn, tổng 12.5 triệu..."*
*   **Cảnh báo:** *"Anh/Chị ơi, có 3 đơn từ hôm qua khách đã chuyển khoản nhưng kho chưa đóng gói..."*
*   **Gợi ý:** *"Mẫu áo thun trắng size L chỉ còn 2 cái, mình nên nhập thêm hoặc tắt quảng cáo mẫu này ạ."*

---

## Một vài lưu ý nhỏ để "tình bạn" bền lâu

*   **Bảo mật là trên hết:** Tuyệt đối không gửi Mã bảo mật (Token) cho người lạ hoặc dán vào các nhóm chat công khai.
*   **AI là trợ lý, không phải kế toán:** AI giúp bạn tóm tắt nhanh và cảnh báo sớm. Với các số liệu thuế hay quyết toán tiền nong, bạn vẫn nên đối chiếu lại với sổ sách chính thức nhé. Xem thêm [Cam kết an toàn](/lean/safety-disclaimers).
*   **Nếu AI "im lặng":** Thường là do điền sai Tên shop hoặc Token hết hạn. Bạn chỉ cần kiểm tra lại Bước 1 là xong.

---

## Bạn muốn khám phá thêm?

Bạn đã quen với việc chat cơ bản? Hãy thử xem các "tuyệt chiêu" nâng cao hơn tại đây:

*   📖 [Mẫu câu hỏi hay cho Chủ shop](/su-dung-theo-vai-tro)
*   🚀 [Các tình huống AI có thể giúp bạn](/nang-luc-va-use-cases-theo-vai-tro)
*   ❓ [Giải đáp thắc mắc thường gặp](/cau-hoi-thuong-gap)

Chúc bạn kinh doanh hồng phát với người bạn đồng hành mới này!
