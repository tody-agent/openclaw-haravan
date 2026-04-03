# OpenClaw × Haravan — vận hành shop bằng lời nói

**Hỏi bằng tiếng Việt tự nhiên — nhận câu trả lời gắn dữ liệu thật từ cửa hàng Haravan.** Đơn hàng, tồn kho, khách, khuyến mãi… không còn cảnh nhảy tab admin mỏi tay.

> *“Hôm nay cửa hàng có gì cần lo?”* — một câu hỏi, một lượt tổng hợp. Không phải tự mò từng màn hình.

*README mặc định cho Community Plugins (tiếng Anh):* [README.md](README.md)

---

## Vì sao cần công cụ này?

| Trước | Sau khi có Haravan Ops |
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

**Đã dùng OpenClaw?** Sau khi gói được publish lên npm hoặc [ClawHub](https://docs.openclaw.ai/tools/clawhub):

```bash
openclaw plugins install @haravan-master/openclaw-haravan-ops-plugin
```

Bật plugin **`haravan-ops`**, điền **`shop`** (vd. `shop-cua-ban.myharavan.com`) và **`accessToken`** (token ứng dụng riêng Haravan). Mở chat và hỏi câu “báo cáo nhanh” đầu tiên.

**Làm từ mã nguồn:**

```bash
git clone https://github.com/tody-agent/openclaw-haravan.git
cd openclaw-haravan
npm install && npm run build
openclaw plugins install -l ./packages/openclaw-haravan-plugin
```

Một số tool (`theme_draft_create`, `haravan_com_api`, `haravan_web_api`) có thể cần bật rõ ràng — chi tiết: [docs/plugin-openclaw.md](docs/plugin-openclaw.md).

---

## Dùng Claude / Cursor / OpenClaw Skill + MCP

Cấu hình biến môi trường **`HARAVAN_SHOP`** và **`HARAVAN_TOKEN`**, trỏ tới server MCP trong repo. Hướng dẫn từng bước: [docs/cai-dat-va-thiet-lap.md](docs/cai-dat-va-thiet-lap.md); lệnh nhanh: [AGENTS.md](AGENTS.md).

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

## Tài liệu & site

| Tài liệu | Dùng khi |
|----------|----------|
| [docs/plugin-openclaw.md](docs/plugin-openclaw.md) | Manifest, tool tuỳ chọn |
| [docs/deploy-openclaw-plugin.md](docs/deploy-openclaw-plugin.md) | Maintainer: thứ tự publish |
| [docs/architecture.md](docs/architecture.md) | Bản đồ monorepo |
| **VitePress** | `npm run docs:dev` / `npm run docs:build` |
| **GitHub Pages** | Bật Actions deploy; xem [`.github/workflows/deploy-docs.yml`](.github/workflows/deploy-docs.yml) — site dạng `https://<user>.github.io/<repo>/` |

**Đóng góp:** trước PR chạy **`npm run verify`**. Tuỳ chọn: `npm run hooks:install` + [gitleaks](https://github.com/gitleaks/gitleaks) — [AGENTS.md](AGENTS.md).

---

## License

MIT — [GitHub Issues](https://github.com/tody-agent/openclaw-haravan/issues) cho bug và ý tưởng.

---

*English (default): [README.md](README.md)*
