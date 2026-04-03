---
title: "Gói phân phối cục bộ — OpenClaw Haravan Ops"
description: "Cách tạo thư mục release/openclaw-lean gồm docs, skill và file npm pack để IT cài offline hoặc lưu trữ nội bộ."
robots: "index, follow"
keywords: "haravan master pack offline, npm pack openclaw, release openclaw lean, cài haravan ai nội bộ"
---

# Gói phân phối cục bộ

:::info Dành cho ai?
Trang này cho **IT / người phụ trách hệ thống** hoặc chủ shop muốn **một bản sao đầy đủ** trên ổ cứng để cài không cần mạng (sau khi đã có file `.tgz`).
:::

---

## Gói gồm những gì?

Sau khi chạy lệnh đóng gói (bên dưới), trong repo sẽ có thư mục:

`release/openclaw-lean/`

| Nội dung | Mô tả |
|----------|--------|
| `docs/` | Bản sao tài liệu **openclaw-lean** |
| `skills/openclaw-haravan-ops/` | Bản sao **skill + packs** cho AI |
| `tarballs/` | Hai file **`.tgz`**: thư viện `@haravan-master/core` và MCP **openclaw-haravan-ops** |
| `README.md` + `MANIFEST.json` | Hướng dẫn cài nhanh + thời điểm build |

:::warning Git
Thư mục `release/` thường nằm trong `.gitignore` để **không** đẩy file nặng lên GitHub. Bạn tự lưu bản zip nội bộ nếu cần.
:::

---

## Cách tạo gói (trên máy có mã nguồn)

Trong thư mục gốc monorepo (ví dụ `/Users/todyle/Coder/Haravan`):

```bash
npm run package:openclaw-lean
```

Script sẽ:

1. Build `@haravan-master/core` và `@haravan-master/openclaw-haravan-ops-mcp`  
2. Sao chép docs + skills  
3. Chạy `npm pack` cho hai package vào `release/openclaw-lean/tarballs/`

Chi tiết cài từ `.tgz` xem file `README.md` **bên trong** thư mục `release/openclaw-lean/` sau khi đóng gói.

---

## Kiểm thử trước khi giao cho business

Từ root repo:

```bash
npm run test:openclaw-ops:gate
```

---

## Người dùng business đọc gì?

Họ **không cần** đọc trang này trước — gửi họ:

- [Trang tổng bộ kit](/)  
- [Cài đặt & thiết lập](/cai-dat-va-thiet-lap) (nếu họ tự cấu hình được)  
- [FAQ](/cau-hoi-thuong-gap)
