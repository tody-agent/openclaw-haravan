import type { Haravan } from "@haravan-master/core";

export interface ThemeDraftArgs {
  draft_name: string;
  confirm?: boolean;
}

export async function runAuditThemeRisk(haravan: Haravan) {
  const themes = await haravan.themes.list();
  const main = themes.filter((t) => t.role === "main");
  const drafts = themes.filter((t) => t.role === "unpublished");

  return {
    total: themes.length,
    main_themes: main.map((t) => ({
      id: t.id,
      name: t.name,
      processing: t.processing,
    })),
    draft_themes: drafts.map((t) => ({
      id: t.id,
      name: t.name,
      previewable: t.previewable,
    })),
    warnings: [
      main.length > 1
        ? "Nhiều theme main — kiểm tra cấu hình Haravan."
        : null,
      main.length === 0 ? "Không thấy theme main — kiểm tra shop." : null,
    ].filter(Boolean),
  };
}

export async function runThemeDraftCreate(haravan: Haravan, args: ThemeDraftArgs) {
  const name = args.draft_name?.trim();
  if (!name) throw new Error("theme_draft_create requires draft_name");

  if (!args.confirm) {
    return {
      status: "preview" as const,
      message:
        "Chưa tạo theme. Gọi lại với confirm: true sau khi user đồng ý rõ ràng.",
      would_create: { name, role: "unpublished" as const },
    };
  }

  const theme = await haravan.themes.create({
    name,
    role: "unpublished",
  });

  return {
    status: "created" as const,
    theme: {
      id: theme.id,
      name: theme.name,
      role: theme.role,
    },
  };
}

export async function runPreviewThemeChange(_haravan: Haravan, args: { description: string }) {
  return {
    status: "preview" as const,
    description: args.description,
    message:
      "Phase 1: không áp dụng thay đổi asset. Mô tả thay đổi để team thực hiện thủ công hoặc dùng Haravan admin.",
  };
}
