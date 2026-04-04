---
name: haravan-claw-maintainer-deploy
description: >-
  Checklist tái sử dụng: publish gói npm @haravan-master/* từ monorepo openclaw-haravan,
  deploy docs VitePress lên Cloudflare Pages (Wrangler), xử lý lỗi thường gặp.
---

# Haravan Claw Master — Maintainer deploy (npm + Cloudflare Pages)

Dùng skill này khi **ship** bản mới cho người dùng: gói trên registry npm và/hoặc site tài liệu trên Cloudflare. Repo: `openclaw-haravan` (Haravan Claw Master).

## Trước khi làm

1. Chạy **`npm run verify`** trong root repo — pass mới publish/deploy production.
2. **`npm whoami`** — xác nhận đúng tài khoản npm có quyền publish scope **`@haravan-master`** (tạo org/user trên npmjs nếu chưa có).
3. Cloudflare: **`npx wrangler login`** (một dòng, không dán kèm comment hay lệnh khác trên cùng dòng).

## Publish npm (thứ tự bắt buộc)

Phụ thuộc: `core` → `haravan-ops-dispatch` → (`mcp-server` + `openclaw-haravan-plugin`).

```bash
cd /path/to/openclaw-haravan
npm run build --workspaces --if-present

npm publish -w @haravan-master/core --access public
npm publish -w @haravan-master/haravan-ops-dispatch --access public
npm publish -w @haravan-master/openclaw-haravan-ops-mcp --access public
npm publish -w @haravan-master/openclaw-haravan-ops-plugin --access public
```

- Nếu báo **version already exists**: tăng `version` trong `packages/<pkg>/package.json` tương ứng rồi publish lại.
- **`mcp-server`** và **plugin** dùng `"*"` hoặc `^` cho `core` / `dispatch` — sau khi bump dispatch, cân nhắc bump patch plugin/MCP để người dùng `npm update` nhận logic mới.

Kiểm tra:

```bash
npm view @haravan-master/core version
npm view @haravan-master/haravan-ops-dispatch version
```

## Deploy docs → Cloudflare Pages

1. Tên project Pages: **chữ thường**, số, gạch ngang (vd. `haravan-claw`). Không HOA, không underscore.
2. Một lệnh từ root repo (đã `npm install`):

```bash
CLOUDFLARE_PAGES_PROJECT=ten-project npm run docs:deploy:cf
```

Script set `VITEPRESS_BASE=/`, build VitePress, gọi `wrangler pages deploy`.

3. Repo **dirty** (chưa commit): Wrangler in cảnh báo — nên **commit** (hoặc stash) trước khi deploy production để biết chính xác nội dung đã đẩy; có thể bỏ qua cảnh báo nếu chỉ thử preview.

4. **Custom domain**: Cloudflare Dashboard → Pages → project → Custom domains.

Tài liệu chi tiết trong repo: `docs/deploy-cloudflare-pages.md`.

## Lỗi thường gặp

| Hiện tượng | Cách xử lý |
|------------|------------|
| Dán nhầm `npm publish` vào lúc `npm login` đang chờ Enter / browser | Mở terminal mới; `Ctrl+C` phiên treo; chạy lại publish từng dòng. |
| `404` khi `npm view @haravan-master/...` | Gói chưa publish lần đầu hoặc sai tên scope; kiểm tra `package.json` `name`. |
| `You do not have permission to publish` | Tài khoản npm chưa là thành viên scope `haravan-master`. |
| Plugin OpenClaw cài từ npm nhưng tool cũ | Bump và publish lại `@haravan-master/haravan-ops-dispatch` + plugin (và rebuild consumer). |

## Liên kết nội bộ repo

- `docs/deploy-cloudflare-pages.md` — Cloudflare từng bước + Windows.
- `docs/deploy-openclaw-plugin.md` — OpenClaw Building Plugins / checklist.
- `AGENTS.md` — plugin id, MCP command local, `npm run verify`.
- `scripts/deploy-cf-pages.mjs` — logic deploy CF.

## Sau khi xong

- Gửi user: lệnh cài plugin (`openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin`) và URL site docs production (vd. `https://<project>.pages.dev` hoặc custom domain).
