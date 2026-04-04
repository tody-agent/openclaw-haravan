# Haravan Claw Master — vận hành shop Haravan bằng lời nói

**Haravan Claw Master** là bộ kit (plugin OpenClaw **Haravan Ops**, MCP, skill, tài liệu) để **hỏi bằng tiếng Việt** — nhận câu trả lời gắn dữ liệu từ cửa hàng Haravan. Đơn hàng, tồn kho, khách, khuyến mãi… ít nhảy tab admin hơn.

> *“Hôm nay cửa hàng có gì cần lo?”* — một câu hỏi, một lượt tổng hợp. Không phải tự mò từng màn hình.

*README mặc định cho Community Plugins (tiếng Anh):* [README.md](README.md)

---

## Vì sao cần công cụ này?

| Trước | Sau khi có Haravan Claw Master |
|-------|------------------------|
| Vận hành “sống trong admin Haravan” | Hỏi chat: *tồn thấp*, *rủi ro SLA*, *KM có ổn không* |
| Copy số liệu sang chat tay | Trợ lý **kéo** signal đúng việc từ Haravan giúp bạn |
| Kiến thức vận hành nằm trong đầu một người | Cả team đều có thể hỏi bằng **ngôn ngữ thường ngày** |

Repo này gồm **plugin OpenClaw** và **MCP server** — cùng một “bộ não” vận hành, khác **giao diện** (OpenClaw, Claude Desktop, Cursor…). Bạn chọn công cụ chat; **giá trị** luôn là: *nhanh chóng thấy điều quan trọng trong shop*.

---

## Luồng trải nghiệm (mô hình trực quan)

```
     BẠN                    TRỢ LÝ AI                   HARAVAN
      │                          │                          │
      │ "Cho tôi báo cáo nhanh  │                          │
      │  hôm nay"                │                          │
      ├─────────────────────────►│                          │
      │                          │  lấy đơn / tồn / KM     │
      │                          ├─────────────────────────►│
      │                          │◄─────────────────────────┤
      │◄─────────────────────────┤  tóm tắt + điểm rủi ro   │
      │  trả lời dễ hiểu         │                          │
```

**Một dòng:** *Câu hỏi → bộ công cụ vận hành → dữ liệu Haravan → câu trả lời để bạn hành động.*

---

## Kịch bản dùng ngay (copy & hỏi)

- **Sáng vào việc** — *“Tình hình hôm nay thế nào: doanh thu, đơn tồn, có gì bất thường?”*
- **Tồn kho** — *“Món nào sắp hết hoặc dễ bán vượt? Cảnh báo trước khi oversell.”*
- **Đơn & SLA** — *“Đơn nào đang rủi ro trễ / kẹt trạng thái?”*
- **Khuyến mãi** — *“Các chương trình KM đang chạy có đỏ cờ gì không?”*
- **Sâu hơn (tuỳ chọn)** — giao diện theme, gọi API có kiểm soát — bật khi cần, xem [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

Thiết kế theo hướng **đọc nhiều, hỗ trợ vận hành**: đưa tín hiệu và gợi ý — **không** thay kế toán, tư vấn thuế hay cam kết SLA của nền tảng. Việc ảnh hưởng tiền và tuân thủ: **đối chiếu lại trong Haravan và sổ sách**.

---

## Bắt đầu nhanh (khuyến nghị)

### Bạn là chủ shop / vận hành (không cần clone repo)

| Bước | Việc làm |
|------|----------|
| 1 | Có **domain shop** `ten-shop.myharavan.com` và **token** ứng dụng riêng Haravan (đừng dán token vào chat công khai). |
| 2 | **OpenClaw:** cài plugin **Haravan Ops** — từ npm (khi đã publish) hoặc nhờ IT cài bản local. |
| 3 | Trong cấu hình plugin, điền **`shop`** và **`accessToken`**. |
| 4 | Hỏi thử: *“Cho tôi báo cáo nhanh hôm nay”* hoặc *“SKU nào cần nhập trước đợt sale?”* (tool `sale_period_stock_forecast`). |

**Cài plugin từ npm** (khi gói đã có trên registry):

```bash
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```

**Cài plugin từ mã nguồn** (dev / chưa publish):

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan
npm install && npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

Một số tool (`theme_draft_create`, `haravan_com_api`, `haravan_web_api`) là **tuỳ chọn** trong OpenClaw — bật khi cần ghi theme hoặc gọi API thô: [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

### Gói npm trong monorepo (tham chiếu)

| Gói | Vai trò |
|-----|---------|
| `@haravan-master/core` | Client REST Haravan |
| `@haravan-master/haravan-ops-dispatch` | Logic tool dùng chung (plugin + MCP) |
| `@haravan-master/openclaw-haravan-ops-mcp` | Server MCP |
| `@haravan-master/openclaw-haravan-ops-plugin` | Plugin OpenClaw |

Người dùng cuối thường chỉ cần **plugin**; MCP dùng khi gắn Cursor/Claude Desktop — xem [Cài đặt & thiết lập](docs/cai-dat-va-thiet-lap.md).

### Site tài liệu (đọc online)

- **Tự host / Cloudflare Pages:** build `docs` với `VITEPRESS_BASE=/` rồi deploy (maintainer) — [docs/deploy-cloudflare-pages.md](docs/deploy-cloudflare-pages.md).
- **Local:** `npm run docs:dev` mở preview trên máy.

---

## Dùng Claude / Cursor / OpenClaw Skill + MCP

Cấu hình **`HARAVAN_SHOP`** và **`HARAVAN_TOKEN`**, trỏ MCP tới bản build trong repo **hoặc** gói `@haravan-master/openclaw-haravan-ops-mcp` sau khi publish. Hướng dẫn chi tiết: [docs/cai-dat-va-thiet-lap.md](docs/cai-dat-va-thiet-lap.md). Lệnh nhanh contributor: [AGENTS.md](AGENTS.md).

**Skill cho agent (định tuyến tool):** [skills/openclaw-haravan-ops/SKILL.md](skills/openclaw-haravan-ops/SKILL.md).

**Maintainer (publish npm + deploy docs):** [skills/haravan-claw-maintainer-deploy/SKILL.md](skills/haravan-claw-maintainer-deploy/SKILL.md).

---

## Bên trong hộp (tóm tắt không “jargon”)

```
  ┌─────────────────────────────────────────────────────────────┐
  │  CÔNG CỤ “THEO VIỆC”     Một lần gọi = một câu hỏi kinh doanh │
  │  (snapshot ngày, SLA, tồn, KM, …)                            │
  └───────────────────────────┬─────────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────────┐
  │  CẦU HARAVAN             Truy cập REST có kiểu, phần mở rộng  │
  │  (đơn, chi nhánh, tín hiệu catalog, đường dẫn được bảo vệ)   │
  └───────────────────────────┬─────────────────────────────────┘
                              │
  ┌───────────────────────────▼─────────────────────────────────┐
  │  LOGIC DÙNG CHUNG        Plugin và MCP không lệch nhau         │
  │  (@haravan-master/haravan-ops-dispatch)                       │
  └─────────────────────────────────────────────────────────────┘
```

Danh sách tool đầy đủ: `packages/openclaw-haravan-plugin/openclaw.plugin.json`. Skill định tuyến cho agent: [skills/openclaw-haravan-ops/SKILL.md](skills/openclaw-haravan-ops/SKILL.md).

---

## Tài liệu (ưu tiên người dùng)

| Tài liệu | Dùng khi |
|----------|----------|
| [docs/bo-tai-lieu.md](docs/bo-tai-lieu.md) | Bản đồ — chọn đúng trang |
| [docs/cam-tay-chi-viec.md](docs/cam-tay-chi-viec.md) | Làm từng bước từ chưa cài |
| [docs/plugin-openclaw.md](docs/plugin-openclaw.md) | Cài plugin OpenClaw |
| **Xem site local** | `npm run docs:dev` / `npm run docs:build` |

**Maintainer / kỹ thuật:** checklist tái sử dụng [skills/haravan-claw-maintainer-deploy/SKILL.md](skills/haravan-claw-maintainer-deploy/SKILL.md) · [deploy-openclaw-plugin](docs/deploy-openclaw-plugin.md) · [architecture](docs/architecture.md) · [deploy-cloudflare-pages](docs/deploy-cloudflare-pages.md) · workflow [deploy-docs.yml](.github/workflows/deploy-docs.yml).

**Đóng góp:** trước PR chạy **`npm run verify`**. Tuỳ chọn: `npm run hooks:install` + [gitleaks](https://github.com/gitleaks/gitleaks) — [AGENTS.md](AGENTS.md).

---

## License

MIT — [GitHub Issues](https://github.com/tody-agent/openclaw-haravan/issues) cho bug và ý tưởng.

---

*English (default): [README.md](README.md)*
