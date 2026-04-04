---
title: "Cài OpenClaw lean — 1 lệnh cho business, build tay cho IT"
description: "Luồng business: cài OpenClaw lean bằng 1 lệnh hoặc nhờ AI tự cài. Luồng IT: build MCP và doctor thủ công khi cần."
robots: "index, follow"
keywords: "openclaw lean install, openclaw haravan 1 lệnh, doctor openclaw"
---

# Cài OpenClaw lean

::: info Haravan Claw Master
Muốn **checklist từng bước** (không cần đọc hết trang này ngay)? Vào [Cầm tay chỉ việc](/cam-tay-chi-viec) hoặc [Bản đồ tài liệu](/bo-tai-lieu).
:::

:::tip Chọn đúng lane
Trang này có **3 lane**:
- **Plugin OpenClaw** (khuyến nghị nếu bạn dùng OpenClaw gateway): cấu hình `shop` + `accessToken` trong plugin
- **Business**: 1 lệnh hoặc bảo AI tự cài (skill / chat)
- **IT / Dev**: build tay, MCP + env, doctor, package cục bộ
:::

## Lane 0: Plugin OpenClaw (khuyến nghị)

Xem hướng dẫn đầy đủ tại **[Plugin Haravan Ops](/plugin-openclaw)** — build repo, `openclaw plugins install -l ./packages/openclaw-haravan-plugin`, rồi điền config plugin.

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

### Build từ source (monorepo)

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan
npm install
npm run build --workspaces --if-present
```

File chạy MCP sau build: **`packages/mcp-server/dist/index.js`** (trong thư mục repo).

### Gắn MCP — đường dẫn local (sau `npm run build`)

Thay `/DUONG-DAN/openclaw-haravan` bằng đường dẫn tuyệt đối tới repo trên máy bạn:

```json
{
  "mcpServers": {
    "openclaw-haravan-ops": {
      "command": "node",
      "args": ["/DUONG-DAN/openclaw-haravan/packages/mcp-server/dist/index.js"],
      "env": {
        "HARAVAN_SHOP": "ten-shop.myharavan.com",
        "HARAVAN_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

### Gắn MCP — từ npm (khi `@haravan-master/openclaw-haravan-ops-mcp` đã publish)

Dùng `npx` để luôn lấy bản mới nhất (hoặc cài global tuỳ bạn):

```json
{
  "mcpServers": {
    "openclaw-haravan-ops": {
      "command": "npx",
      "args": ["-y", "@haravan-master/openclaw-haravan-ops-mcp"],
      "env": {
        "HARAVAN_SHOP": "ten-shop.myharavan.com",
        "HARAVAN_TOKEN": "YOUR_TOKEN"
      }
    }
  }
}
```

*(Nếu client MCP của bạn không hỗ trợ `npx`, cài gói vào project và trỏ `node` tới `node_modules/@haravan-master/openclaw-haravan-ops-mcp/dist/index.js`.)*

### Verify

```bash
npm run doctor-openclaw
```

### Sửa code / mở PR (contributor)

Trước khi push hoặc mở pull request vào repo này:

```bash
npm run verify
```

(Lệnh trên chạy quét bảo mật nhẹ + build toàn monorepo + build VitePress + Vitest — trùng với job CI trên GitHub.)

## Liên kết (người dùng)

- [Theo vai trò](/su-dung-theo-vai-tro)
- [FAQ](/cau-hoi-thuong-gap)
- [Năng lực & use cases](/nang-luc-va-use-cases-theo-vai-tro)
