# Scope: OpenClaw Haravan Ops Plugin

## In scope

- Package OpenClaw plugin (`openclaw.plugin.json` + `definePluginEntry`) cài được qua `openclaw plugins install` (local link + publish).
- Config: `shop` (domain Haravan) + `accessToken` với JSON Schema + `uiHints.sensitive` cho token.
- Đăng ký **toàn bộ tool** hiện có trong `LEAN_MCP_TOOLS` (19 tool — đồng bộ với `callLeanTool`).
- Tool ghi có side-effect: `theme_draft_create` → `{ optional: true }` theo hướng dẫn OpenClaw.
- Tách hoặc export runtime dùng chung để MCP stdio và plugin không lệch logic (một nguồn dispatch).
- Cập nhật `README.md`, `AGENTS.md` (đường cài plugin + fallback MCP).
- Checklist publish: build, `plugins doctor`, tài liệu cho ClawHub/npm + PR community (hướng dẫn maintainer thực hiện).

## Out of scope (v1)

- Thay thế hoàn toàn MCP (vẫn giữ MCP cho client không dùng OpenClaw plugin API).
- UI Stitch/Pencil cho settings (dựa vào `uiHints` của OpenClaw).
- Thay đổi hành vi nghiệp vụ tool (chỉ đổi lớp tích hợp + config).
- Tự động hóa `clawhub login` / publish trong CI (chỉ document + script optional).

## Edge cases

- Thiếu config: plugin load nhưng tool trả lỗi rõ ràng (tương tự `Haravan client not initialized`).
- Token hết hạn: giữ message từ API/core, không bọc thêm logic refresh OAuth trong v1.

## Explicit non-goals

- Đổi tên tool (tránh vỡ skill routing); giữ nguyên `name` như MCP.
