import { defineConfig } from "vitepress";

/** GitHub Pages project site: /REPO_NAME/ — override locally: VITEPRESS_BASE=/ npm run docs:dev */
const base = process.env.VITEPRESS_BASE ?? "/";

export default defineConfig({
  title: "Haravan Claw Master",
  description:
    "Hỏi tiếng Việt — AI trả lời bám dữ liệu shop Haravan. Cài plugin, hỏi ngay, không cần biết code.",
  lang: "vi",
  base,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Trang chủ", link: "/" },
      {
        text: "Bắt đầu",
        items: [
          { text: "Bắt đầu trong 3 phút", link: "/cam-tay-chi-viec" },
          { text: "Xem thử 5 phút", link: "/demo-5-phut" },
          { text: "Cài plugin OpenClaw", link: "/plugin-openclaw" },
          { text: "Cài đặt kỹ thuật", link: "/cai-dat-va-thiet-lap" },
        ],
      },
      {
        text: "Theo vai trò",
        items: [
          { text: "Chọn vai trò", link: "/su-dung-theo-vai-tro" },
          { text: "🏪 Chủ shop", link: "/vai-tro/chu-shop" },
          { text: "📦 Vận hành", link: "/vai-tro/van-hanh" },
          { text: "📣 Marketing", link: "/vai-tro/marketing" },
          { text: "🎧 CS", link: "/vai-tro/cham-soc-khach" },
          { text: "💻 IT", link: "/vai-tro/it-tech" },
        ],
      },
      {
        text: "Tham khảo",
        items: [
          { text: "AI làm được gì?", link: "/nang-luc-va-use-cases-theo-vai-tro" },
          { text: "Danh mục Ops Tools", link: "/api-ops-tools" },
          { text: "FAQ", link: "/cau-hoi-thuong-gap" },
          { text: "Cộng đồng", link: "/cong-dong-va-chia-se" },
        ],
      },
    ],
    sidebar: [
      {
        text: "Bắt đầu nhanh",
        items: [
          { text: "Trang chủ", link: "/" },
          { text: "Bắt đầu trong 3 phút", link: "/cam-tay-chi-viec" },
          { text: "Xem thử 5 phút", link: "/demo-5-phut" },
          { text: "Plugin Haravan Ops", link: "/plugin-openclaw" },
          { text: "Cài đặt kỹ thuật", link: "/cai-dat-va-thiet-lap" },
          { text: "Bản đồ tài liệu", link: "/bo-tai-lieu" },
        ],
      },
      {
        text: "Playbook theo vai trò",
        items: [
          { text: "Chọn vai trò", link: "/su-dung-theo-vai-tro" },
          { text: "🏪 Chủ shop / CEO", link: "/vai-tro/chu-shop" },
          { text: "📦 Vận hành / Kho", link: "/vai-tro/van-hanh" },
          { text: "📣 Marketing / CRM", link: "/vai-tro/marketing" },
          { text: "🎧 CS / Chăm sóc khách", link: "/vai-tro/cham-soc-khach" },
          { text: "💻 IT / CTO", link: "/vai-tro/it-tech" },
        ],
      },
      {
        text: "Tham khảo",
        items: [
          { text: "AI làm được gì?", link: "/nang-luc-va-use-cases-theo-vai-tro" },
          { text: "Danh mục Ops Tools", link: "/api-ops-tools" },
          { text: "Personas", link: "/personas" },
          { text: "JTBD", link: "/jtbd" },
          { text: "FAQ", link: "/cau-hoi-thuong-gap" },
          { text: "Cam kết an toàn", link: "/lean/safety-disclaimers" },
          { text: "Cộng đồng & chia sẻ", link: "/cong-dong-va-chia-se" },
          { text: "Demo & kịch bản mẫu", link: "/demo-seed-va-kich-ban-demo" },
        ],
      },
      {
        text: "Kỹ thuật (IT/Dev)",
        collapsed: true,
        items: [
          { text: "Phân tích codebase", link: "/analysis" },
          { text: "Kiến trúc kỹ thuật", link: "/architecture" },
        ],
      },
    ],
    search: { provider: "local" },
    footer: {
      message: "MIT · Haravan Claw Master",
    },
    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/tody-agent/openclaw-haravan",
      },
    ],
  },
});
