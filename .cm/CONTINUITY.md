# Continuity — Haravan Claw Master (repo openclaw-haravan)

Last updated: 2026-04-04 (session: triển khai `sale_period_stock_forecast`)

## Active goal

Ổn định tài liệu / demo nếu cần; tool **sale_period_stock_forecast** đã có trong MCP + plugin (tự lấy từ `LEAN_MCP_TOOLS`).

## Current phase

**shipped** — `sale_period_stock_forecast` + `sale-calendar` + test; `npm run test:gate` pass.

## Next actions

1. Tuỳ nhu cầu: bổ sung doc `docs/` (matrix lean, năng lực theo vai trò) nhắc tool mới.
2. Cloudflare / GitHub Pages như backlog cũ nếu còn.

## Working context

- **Đã có:** `runSlowMoverAndRestockAdvisor` (`restock-advisor.ts`) — MA theo cửa sổ ngày + days of cover; `find_low_stock_risks`.
- **Mới:** calendar preset VN sàn — **midmonth** 14–15, **payday** 24–25; **doubleday** mọi ngày d=m (1/1…12/12), mỗi đợt 4 ngày **d−1, d, d+1, d+2**; **megasale** chỉ bốn đợt lớn **9/9, 10/10, 11/11, 12/12** (không gồm 1/1–8/8), mỗi đợt cùng công thức 4 ngày **d−1, d, d+1, d+2**. Forecast đơn giản (baseline MA × uplift); tập trung top ~20% variant theo doanh thu/qty.
- **Không làm trong v1:** tự động tạo phiếu nhập Haravan (chỉ read-only + khuyến nghị số lượng); ML phức tạp.

## Just completed

- Tool **`sale_period_stock_forecast`**: `sale-calendar.ts`, `sale-period-stock-forecast.ts`, MCP + plugin, skill + pack + root SKILL; Vitest sale-calendar + tool-handlers.

## Mistakes & learnings

- **VitePress code fence:** Không dùng ` ```34:36:path ` — parser coi là ngôn ngữ highlight; dùng ` ```ts ` + ghi path trong prose.

## Key decisions

- GitHub Pages **project site** với base động theo tên repo (không hardcode user org).
- **Megasale (sale forecast):** chỉ **9/9, 10/10, 11/11, 12/12**; mỗi đợt **4 ngày** d−1, d, d+1, d+2 (lớn hơn / tách biệt với doubleday 1/1–8/8).
