import { defineConfig } from "vitepress";

export default defineConfig({
  title: "OpenClaw x Haravan",
  description: "Trợ lý vận hành Haravan cho nhóm non-tech",
  lang: "vi",
  themeConfig: {
    nav: [
      { text: "Trang chủ", link: "/" },
      { text: "Cài đặt", link: "/cai-dat-va-thiet-lap" },
    ],
    sidebar: [
      {
        text: "Bắt đầu",
        items: [
          { text: "Cài đặt & Thiết lập", link: "/cai-dat-va-thiet-lap" },
          { text: "Demo 5 phút", link: "/demo-5-phut" },
          { text: "Sử dụng theo vai trò", link: "/su-dung-theo-vai-tro" },
        ],
      },
      {
        text: "Nâng cao",
        items: [
          { text: "Năng lực & Use Cases", link: "/nang-luc-va-use-cases-theo-vai-tro" },
          { text: "Câu hỏi thường gặp", link: "/cau-hoi-thuong-gap" },
        ],
      },
    ],
    search: { provider: "local" },
  },
});
