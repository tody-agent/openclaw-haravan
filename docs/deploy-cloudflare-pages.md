---
title: Deploy tài liệu lên Cloudflare Pages (trực tiếp, không qua GitHub)
description: >-
  Build VitePress rồi đẩy bằng Wrangler từ máy (hoặc CI tùy bạn). Không dùng
  GitHub Actions nối Cloudflare.
keywords: >-
  Cloudflare Pages, Wrangler, deploy local, VitePress, Haravan Claw Master
robots: index, follow
---

# Deploy Cloudflare Pages (trực tiếp)

::: info Không có trong menu site
Trang này phục vụ **người vận hành / maintainer** đẩy bản build; site công khai ưu tiên hướng dẫn người dùng cuối.
:::

::: warning Base URL
**Cloudflare Pages** phục vụ site ở **gốc `/`** (vd. `https://ten-project.pages.dev/`). Luôn build với **`VITEPRESS_BASE=/`**. **GitHub Pages** (project site) cần `base` = `/tên-repo/` — workflow [deploy-docs.yml](https://github.com/tody-agent/openclaw-haravan/blob/main/.github/workflows/deploy-docs.yml) vẫn dùng cách riêng; không trộn hai bản build.
:::

## Chuẩn bị (account todyai / Cloudflare)

1. [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → tạo **Pages project**. **Tên project** phải đúng quy tắc Cloudflare: **chữ thường**, **số**, dấu **gạch ngang** `-` (tối đa 58 ký tự; không viết HOA, không gạch đầu/cuối). Ví dụ: `haravan-claw`, `haravan-claw-master` — **không** dùng `HaravanClaw`.
2. **Đăng nhập Wrangler** (một lần trên máy deploy): chỉ chạy **một dòng**, không dán kèm comment (tránh lỗi `Unknown arguments: #, lần, đầu`).
   ```bash
   npx wrangler login
   ```
   Hoặc dùng **API Token** (CI / headless): export `CLOUDFLARE_API_TOKEN` với quyền **Account — Cloudflare Pages — Edit**; không cần `login` nếu token hợp lệ.

::: tip Script `docs:deploy:cf`
Tự **đổi tên env sang chữ thường** (vd. `HaravanClaw` → `haravanclaw`). Nếu vẫn sai format, script sẽ in hướng dẫn rõ.
:::

## Một lệnh (khuyến nghị)

Trong thư mục repo (đã `npm install`):

```bash
CLOUDFLARE_PAGES_PROJECT=ten-project-cua-ban npm run docs:deploy:cf
```

Script [scripts/deploy-cf-pages.mjs](https://github.com/tody-agent/openclaw-haravan/blob/main/scripts/deploy-cf-pages.mjs) sẽ:

1. Build VitePress với `VITEPRESS_BASE=/`
2. Chạy `wrangler pages deploy docs/.vitepress/dist --project-name=…`

## Từng bước tay

```bash
npm install
npm run docs:build:cf
npx wrangler pages deploy docs/.vitepress/dist --project-name=ten-project-cua-ban
```

## Lần đầu chưa có project

```bash
npx wrangler pages project create ten-project-cua-ban
```

(sau đó deploy như trên).

## Tuỳ chọn: custom domain

Pages → project → **Custom domains**. Vẫn dùng build với `VITEPRESS_BASE=/`.

## Windows (CMD)

Trước khi build, set biến môi trường (PowerShell):

```powershell
$env:CLOUDFLARE_PAGES_PROJECT="ten-project"
$env:VITEPRESS_BASE="/"
npm run docs:build
npx wrangler pages deploy docs/.vitepress/dist --project-name=$env:CLOUDFLARE_PAGES_PROJECT
```

Hoặc chỉ dùng `npm run docs:deploy:cf` sau khi set `CLOUDFLARE_PAGES_PROJECT`.

## Sau khi deploy

- Giữ URL **production** / preview (vd. `https://<hash>.<project>.pages.dev`) trong README hoặc [Cộng đồng & chia sẻ](/cong-dong-va-chia-se) nếu bạn chia sẻ công khai.
- Lần sau chỉ cần lặp lại: `CLOUDFLARE_PAGES_PROJECT=... npm run docs:deploy:cf` (đã đăng nhập Wrangler).

## Lỗi thường gặp

| Vấn đề | Gợi ý |
|--------|--------|
| `npm login` đang chờ Enter/browser mà bạn dán nhầm lệnh khác (`cd`, `npm publish`…) | Hủy (`Ctrl+C`), mở terminal sạch, chạy lại **một lệnh một dòng**. |
| Wrangler báo working directory có **uncommitted changes** | Commit (khuyến nghị) hoặc chấp nhận cảnh báo nếu chỉ test preview. |
| Site trắng / sai link | Xác nhận build dùng **`VITEPRESS_BASE=/`** (script `docs:deploy:cf` đã set). GitHub Pages project site cần `base` khác — đừng trộn hai bản build. |

**Checklist maintainer (npm + CF, tái sử dụng):** trong repo, file [skills/haravan-claw-maintainer-deploy/SKILL.md](https://github.com/tody-agent/openclaw-haravan/blob/main/skills/haravan-claw-maintainer-deploy/SKILL.md).

## Liên kết

- [Cộng đồng & chia sẻ](/cong-dong-va-chia-se)
- GitHub Pages (nếu vẫn cần): [deploy-docs.yml](https://github.com/tody-agent/openclaw-haravan/blob/main/.github/workflows/deploy-docs.yml)
