---
title: "Cài OpenClaw lean — 1 lệnh cho business, build tay cho IT"
description: "Luồng business: cài OpenClaw lean bằng 1 lệnh hoặc nhờ AI tự cài. Luồng IT: build MCP và doctor thủ công khi cần."
robots: "index, follow"
keywords: "openclaw lean install, openclaw haravan 1 lệnh, doctor openclaw"
---

# Cài OpenClaw lean

:::tip Chọn đúng lane
Trang này có **2 lane**:
- **Business**: 1 lệnh hoặc bảo AI tự cài
- **IT / Dev**: build tay, doctor, package cục bộ
:::

## Lane 1: Business (khuyên dùng)

### Cách dễ nhất: chat ngay trong OpenClaw

```text
Hãy tự cài OpenClaw Haravan Ops lean cho tôi.
Shop: ten-shop.myharavan.com
Token đã lưu trong file ~/.config/haravan/token trên máy này.
Không yêu cầu tôi dán token vào chat.
Dùng @haravan-master/cli install với --token-file ~/.config/haravan/token nếu được.
Nếu OpenClaw không tự biết file config, hãy hỏi tôi đúng 1 lần rồi tự ghi giúp.
Sau khi cài xong, hãy verify và đưa tôi 1 câu chat để test lại.
```

### Nếu cần đổi token

```text
Hãy cập nhật token Haravan cho OpenClaw của tôi.
Shop: ten-shop.myharavan.com
Token mới đã lưu trong file ~/.config/haravan/token trên máy này.
Hãy backup config trước khi sửa và verify lại sau khi cập nhật.
```

### Nếu chat không cài được, dùng 1 lệnh

```bash
mkdir -p ~/.config/haravan
printf '%s\n' 'YOUR_TOKEN' > ~/.config/haravan/token
chmod 600 ~/.config/haravan/token
npx @haravan-master/cli install "cài OpenClaw lean cho tôi" --shop ten-shop.myharavan.com --token-file ~/.config/haravan/token
```

### Nếu đã cài nhưng đang lỗi, bảo AI tự debug

```text
OpenClaw của tôi đã cài Haravan nhưng đang không dùng được.
Shop: ten-shop.myharavan.com
Token đã lưu trong file ~/.config/haravan/token trên máy này.
Hãy tự kiểm tra file config MCP, biến HARAVAN_SHOP, HARAVAN_TOKEN, và package MCP.
Nếu lỗi thì sửa giúp tôi, rồi cho tôi một câu chat để test lại.
```

Sau khi cài xong, khởi động lại app và thử:

> `Cho tôi báo cáo nhanh hôm nay của shop.`

## Lane 2: IT / Dev (khi cần build tay)

### Chuẩn bị

| Thứ | Vì sao cần |
|-----|------------|
| Node.js 20+ | Build MCP |
| Quyền Admin Haravan | Lấy token |
| Source repo hoặc gói release | Để chạy build / package |

### Build từ source

```bash
npm install
npm run build --workspace @haravan-master/core
npm run build --workspace @haravan-master/openclaw-haravan-ops-mcp
```

### Gắn MCP bằng đường dẫn local

```json
{
  "mcpServers": {
    "openclaw-haravan-ops": {
      "command": "node",
      "args": ["/DUONG-DAN/repo/apps/openclaw-haravan-ops-mcp/dist/index.js"],
      "env": {
        "HARAVAN_SHOP": "ten-shop.myharavan.com",
        "HARAVAN_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

### Verify

```bash
npm run doctor-openclaw
```

Nếu team bạn muốn bản đóng gói offline, xem [Gói IT](/openclaw-kit/goi-phan-phoi-cuc-bo).

## Liên kết

- [Theo vai trò](/openclaw-kit/su-dung-theo-vai-tro)
- [FAQ](/openclaw-kit/cau-hoi-thuong-gap)
- [Build MCP](/openclaw-lean/README)
