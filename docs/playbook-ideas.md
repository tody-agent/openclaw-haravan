---
title: Playbook ideas (gợi ý cron & tự động hóa)
description: >-
  Ý tưởng lịch chạy (cron) và automation bọc ngoài MCP — tham chiếu chéo ma trận tool.
keywords: playbook, cron, automation, Haravan ops
robots: index, follow
---

# Playbook ideas

::: info Ngữ cảnh
Đây là **gợi ý thiết kế** (scheduler bên ngoài OpenClaw / n8n / cron máy chủ), không phải code có sẵn trong repo. Chi tiết ánh xạ tool xem [ma trận playbook](/lean/playbook-tool-matrix).
:::

Các use case kiểu “mỗi 5 phút quét đơn attention”, “22:00 tổng hợp ngày” được mô tả ở mức **ý tưởng** trong tài liệu lean; triển khai thực tế cần lớp gọi MCP hoặc agent theo lịch của bạn.

**Liên kết:** [Ma trận tool](/lean/playbook-tool-matrix) · [Scheduler adapters](/lean/scheduler-adapters)
