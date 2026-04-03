---
title: Deploy & chia sẻ plugin OpenClaw
description: >-
  Publish npm / ClawHub, thứ tự package monorepo, và cách người dùng cài
  openclaw plugins install cho community.
keywords: OpenClaw plugin, npm publish, ClawHub, Haravan Ops
robots: index, follow
---

# Deploy & chia sẻ plugin OpenClaw (community)

Tài liệu này dành cho **maintainer** (publish) và **người dùng** (cài từ registry). Chi tiết manifest và cấu hình: [plugin-openclaw.md](./plugin-openclaw.md).

## Người dùng cộng đồng: cài nhanh

Sau khi package đã có trên **npm** hoặc **ClawHub** (xem dưới), người dùng chỉ cần:

```bash
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```

Nếu OpenClaw ưu tiên ClawHub theo tên khác, có thể dùng dạng:

```bash
openclaw plugins install clawhub:<tên-package-trên-clawhub>
```

Cấu hình trong OpenClaw (theo manifest plugin):

- `shop` — domain cửa hàng Haravan (ví dụ `ten-cua-hang.myharavan.com`)
- `accessToken` — private app token

Bật thêm tool tùy chọn (nếu cần): `theme_draft_create`, `haravan_com_api`, `haravan_web_api` — xem [plugin-openclaw.md](./plugin-openclaw.md).

**Cài từ mã nguồn (dev / PR):**

```bash
npm install && npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

---

## Maintainer: vì sao phải publish nhiều package

Plugin `@haravan-master/openclaw-haravan-ops-plugin` phụ thuộc:

1. `@haravan-master/haravan-ops-dispatch`
2. `@haravan-master/core` (trực tiếp và gián tiếp qua dispatch)

Người cài plugin từ npm **không** có monorepo của bạn, nên **cả ba** package phải có trên npm (hoặc bạn phải đóng gói một bundle khác — hiện repo dùng kiến trúc nhiều package).

### Trước khi publish lần đầu

1. Thêm vào mỗi `package.json` của các package scoped (nếu chưa có):

   ```json
   "publishConfig": {
     "access": "public"
   }
   ```

2. Thay dependency dạng workspace `"*"` bằng **semver đã publish**, ví dụ sau khi core `1.0.0` và dispatch `0.1.0`:

   - Trong `packages/haravan-ops-dispatch/package.json`:  
     `"@haravan-master/core": "^1.0.0"`
   - Trong `packages/openclaw-haravan-plugin/package.json`:  
     `"@haravan-master/core": "^1.0.0"`,  
     `"@haravan-master/haravan-ops-dispatch": "^0.1.0"`

   (Sau mỗi lần bump major/minor, cập nhật lại cho khớp.)

### Thứ tự publish (npm)

Từ thư mục gốc repo (sau `npm install` và `npm run build`):

```bash
npm login
npm publish -w @haravan-master/core --access public
npm publish -w @haravan-master/haravan-ops-dispatch --access public
npm publish -w @haravan-master/openclaw-haravan-ops-plugin --access public
```

Mỗi package đã có `prepack` → build chạy trước khi đóng tarball.

---

## ClawHub (khuyến nghị bởi tài liệu OpenClaw)

```bash
npm i -g clawhub
clawhub login
clawhub package publish ./packages/openclaw-haravan-plugin --dry-run
clawhub package publish ./packages/openclaw-haravan-plugin
```

Nếu ClawHub/npm resolve được dependency từ registry, user có thể cài một lệnh. Nếu publish **chỉ** thư mục plugin mà dependency vẫn là `"*"`, cài đặt của người dùng có thể thất bại — **luôn** pin semver như mục trên trước khi publish công khai.

---

## Lên danh sách Community Plugins (OpenClaw)

1. Đã publish lên **ClawHub hoặc npm** (user `openclaw plugins install …` chạy được).
2. Repo **GitHub public**, README rõ: cài đặt, cấu hình `shop` / token, link tài liệu.
3. Mở **Pull Request** vào repo `openclaw/openclaw` để thêm plugin vào [Community Plugins](https://docs.openclaw.ai/plugins/community).

Thời gian merge PR phụ thuộc maintainer; **plugin vẫn dùng được ngay** sau khi publish, không cần chờ listing.

---

## GitHub Pages (site tài liệu)

Workflow **Deploy docs** build VitePress mỗi lần push `main`. Bước publish lên Pages **chỉ chạy** khi:

1. **Settings → Pages** của repo: nguồn **GitHub Actions** (không dùng branch `gh-pages` trừ khi bạn tự cấu hình khác).
2. **Settings → Secrets and variables → Actions → Variables**: tạo biến repository `ENABLE_GH_PAGES_DEPLOY` = `true`.

Nếu chưa bật Pages hoặc chưa đặt biến, job `build` vẫn chạy (kiểm tra site build được); job `deploy` được bỏ qua để workflow không báo lỗi giả. Sau khi cấu hình xong, chạy lại workflow (hoặc push commit) để deploy.

---

## Checklist nhanh

- [ ] Build toàn monorepo: `npm run build`
- [ ] `openclaw plugins doctor` sau khi cài local
- [ ] Pin version giữa `core` ↔ `dispatch` ↔ `plugin`
- [ ] `publishConfig.access: public` cho scope `@haravan-master`
- [ ] Publish đúng thứ tự: core → dispatch → plugin
- [ ] Thử cài trên máy sạch: `openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin`

Tham khảo thêm: [upgrade_plugin.md trên GitHub](https://github.com/tody-agent/openclaw-haravan/blob/main/upgrade_plugin.md) (ClawHub, checklist manifest).
