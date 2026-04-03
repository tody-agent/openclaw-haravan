# Continuity — openclaw-haravan

Last updated: 2026-04-03 (session: docs + Pages deploy)

## Active goal

Docs landing + kỹ thuật đã có; **bật GitHub Pages** trên remote và merge workflow deploy.

## Current phase

**deploying** — workflow `deploy-docs.yml` trong repo; cần enable Pages trên GitHub.

## Next actions

1. **GitHub:** Repository → Settings → Pages → Source **GitHub Actions**.
2. Push `main` (hoặc *Run workflow*) để deploy lần đầu.
3. Tiếp tục publish npm/ClawHub plugin nếu chưa xong.

## Working context

- **VitePress `base`:** `process.env.VITEPRESS_BASE` — local mặc định `/`, CI dùng `/${{ github.event.repository.name }}/`.
- **Landing:** `docs/index.md` — hero + features + bảng persona + disclaimer (content framework).
- **DocKit-style:** `docs/analysis.md`, `docs/architecture.md`, `docs/plugin-openclaw.md`, `docs/sitemap-urls.txt`.
- **Dead links cũ:** `/openclaw-kit/*` → `/`, `/openclaw-lean/*` → `/lean/*`.

## Just completed

- Landing mở rộng + SEO `head` + features.
- Sửa dead links toàn `docs/`, thêm `playbook-ideas.md`.
- `config.mts` nav/sidebar, `cleanUrls`, footer.
- Workflow deploy Pages (artifact `docs/.vitepress/dist`).

## Mistakes & learnings

- **VitePress code fence:** Không dùng ` ```34:36:path ` — parser coi là ngôn ngữ highlight; dùng ` ```ts ` + ghi path trong prose.

## Key decisions

- GitHub Pages **project site** với base động theo tên repo (không hardcode user org).
