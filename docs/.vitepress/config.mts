import { defineConfig } from "vitepress";

/** GitHub Pages project site: /REPO_NAME/ — override locally: VITEPRESS_BASE=/ npm run docs:dev */
const base = process.env.VITEPRESS_BASE ?? "/";

export default defineConfig({
  title: "OpenClaw x Haravan",
  description: "Trợ lý vận hành Haravan cho nhóm non-tech",
  lang: "vi",
  base,
  cleanUrls: true,
  themeConfig: {
    nav: [
      { text: "Trang chủ", link: "/" },
      { text: "Plugin OpenClaw", link: "/plugin-openclaw" },
      { text: "Cài đặt", link: "/cai-dat-va-thiet-lap" },
      { text: "Kiến trúc", link: "/architecture" },
    ],
    sidebar: [
      {
        text: "Bắt đầu",
        items: [
          { text: "Plugin Haravan Ops", link: "/plugin-openclaw" },
          { text: "Deploy & chia sẻ plugin", link: "/deploy-openclaw-plugin" },
          { text: "Cài đặt & Thiết lập", link: "/cai-dat-va-thiet-lap" },
          { text: "Demo 5 phút", link: "/demo-5-phut" },
          { text: "Sử dụng theo vai trò", link: "/su-dung-theo-vai-tro" },
        ],
      },
      {
        text: "Kỹ thuật",
        items: [
          { text: "Kiến trúc", link: "/architecture" },
          { text: "Phân tích codebase", link: "/analysis" },
          { text: "Playbook ideas", link: "/playbook-ideas" },
          { text: "Lean playbook", link: "/lean/README" },
        ],
      },
      {
        text: "Nâng cao",
        items: [
          {
            text: "Năng lực & Use Cases",
            link: "/nang-luc-va-use-cases-theo-vai-tro",
          },
          { text: "Câu hỏi thường gặp", link: "/cau-hoi-thuong-gap" },
          { text: "Gói phân phối cục bộ", link: "/goi-phan-phoi-cuc-bo" },
        ],
      },
    ],
    search: { provider: "local" },
    footer: {
      message: "MIT · OpenClaw x Haravan",
    },
  },
});
