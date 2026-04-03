# Implementation checklist — OpenClaw Haravan Plugin

> **Skill chain / parallel:** làm theo **wave**. Trong cùng một wave, các mục có cùng `(‖)` có thể giao **song song** (agent/worktree khác nhau). Wave sau phụ thuộc wave trước.

---

## Wave 0 — Khóa quyết định (tuần tự, 1 luồng)

- [x] **0.1** `plugin id`: `haravan-ops`; npm: `@haravan-master/openclaw-haravan-ops-plugin`.
- [x] **0.2** Pin `openclaw@2026.4.2` trong plugin `package.json` (`compat` / `build`).
- [ ] **0.3** Checklist mục 7 `upgrade_plugin.md` — dán vào PR publish/community.

**Exit:** Có bảng version ghi trong `design.md` hoặc comment đầu `packages/openclaw-haravan-plugin/package.json`.

---

## Wave 1 — Nền tảng (‖ song song 2 nhánh)

**Nhánh A — Shared dispatch package**

- [x] **1.A.1** `packages/haravan-ops-dispatch/` + `tsconfig`.
- [x] **1.A.2** Đã di chuyển `tool-handlers`, `mcp-tool-definitions`, `ops-tools/`, `tools/`, `workflows/`.
- [x] **1.A.3** Export `callLeanTool`, `LEAN_MCP_TOOLS` từ `src/index.ts`.
- [x] **1.A.4** MCP import từ `@haravan-master/haravan-ops-dispatch`.
- [x] **1.A.5** Build + test (vitest dispatch + MCP).

**Nhánh B — Plugin**

- [x] **1.B.1** `packages/openclaw-haravan-plugin/` + `openclaw.plugin.json`.
- [x] **1.B.2** `openclaw`, `@sinclair/typebox`, `core`, `dispatch`.
- [x] **1.B.3** `definePluginEntry` + đăng ký **toàn bộ** tool (không chỉ stub).

**Exit:** Build monorepo xanh; MCP vẫn chạy như cũ; plugin load được với 1 tool.

---

## Wave 2 — Tích hợp đầy đủ (tuần tự, sau Wave 1)

- [x] **2.1** Vòng lặp trên `LEAN_MCP_TOOLS` + TypeBox từ `inputSchema`.
- [x] **2.2** `theme_draft_create` → `{ optional: true }`.
- [ ] **2.3** Hook `before_tool_call` (bỏ qua trừ khi cần debug).
- [ ] **2.4** Đối chiếu tên tool với core OpenClaw khi có tài liệu cục bộ.

**Exit:** 19 tool đăng ký; `contracts.tools` khớp runtime.

---

## Wave 3 — Kiểm thử & chất lượng (‖ song song)

- [ ] **3.1 (‖)** Vitest: unit test `callLeanTool` qua dispatch (đã có test cũ — chỉnh path import nếu cần).
- [ ] **3.2 (‖)** Test tối thiểu cho plugin: mock `api.pluginConfig` hoặc integration doc-only; hoặc script `node` import built `index.js` smoke.
- [ ] **3.3 (‖)** Chạy `openclaw plugins install -l ...`, `plugins list`, `plugins inspect`, `plugins doctor` — ghi output vào `docs/` hoặc PR.

**Exit:** Có bằng chứng doctor sạch + ít nhất 1 call tool thành công.

---

## Wave 4 — Tài liệu & repo (‖ song song)

- [x] **4.1 (‖)** `README.md` — plugin + `plugins install -l`.
- [x] **4.2 (‖)** `AGENTS.md` — plugin khuyến nghị.
- [x] **4.3 (‖)** `SKILL.md` — đoạn plugin.

**Exit:** Người mới chỉ đọc README cài được.

---

## Wave 5 — Publish & Community (tuần tự; bước cuối cần người có quyền)

- [ ] **5.1** `npm pack` / dry-run publish package plugin; xác nhận `files` không lộ source thừa.
- [ ] **5.2** `clawhub package publish ./packages/openclaw-haravan-plugin --dry-run` rồi publish thật (maintainer).
- [ ] **5.3** `npm publish --access public` nếu dùng npm (maintainer).
- [ ] **5.4** PR vào `openclaw/openclaw` thêm community plugin entry (maintainer) — link repo + package.

---

## Bản đồ song song cho cm-skill-chain / subagent

| Wave | Song song | Ghi chú |
|------|-----------|---------|
| 0 | Không | 1 agent |
| 1 | **1.A** ∥ **1.B (scaffold)** | B phần wire Haravan chờ A xong; có thể tách B thành B-scaffold (song song) + B-wire (sau A). |
| 2 | Không | Một agent tránh conflict `index.ts` |
| 3 | **3.1 ∥ 3.2 ∥ 3.3** | Khác file / khác môi trường |
| 4 | **4.1 ∥ 4.2 ∥ 4.3** | Khác file |
| 5 | Không | Thứ tự publish |

**Gợi ý 3 agent sau Wave 0:** Agent-1 → chỉ **1.A**; Agent-2 → **1.B.1–B.2** + stub; sau merge Agent-3 → **1.B.3 wire + 2.x** hoặc merge 1.A trước rồi một agent làm **2.x**.
