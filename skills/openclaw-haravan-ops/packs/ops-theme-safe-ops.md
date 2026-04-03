# Pack: ops-theme-safe-ops (giao diện)

## Mục tiêu

Không sửa theme đang live trực tiếp; chỉ audit và tạo draft có xác nhận.

## Prompt mẫu

1. `audit_theme_risk — có bao nhiêu theme main và draft?`
2. `preview_theme_change với mô tả: "Đổi màu nút CTA trang chủ".`
3. Sau khi user đồng ý rõ: `theme_draft_create draft_name "Backup AI 2026-04-03" confirm true`

## Quy tắc

Không bao giờ gọi `theme_draft_create` với `confirm: true` nếu user chưa nói rõ đồng ý tạo theme mới.
