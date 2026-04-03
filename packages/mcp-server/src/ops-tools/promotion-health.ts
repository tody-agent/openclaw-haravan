import type { Haravan } from "@haravan-master/core";

export interface PromotionHealthArgs {
  limit?: number;
}

export async function runPromotionHealth(haravan: Haravan, args: PromotionHealthArgs) {
  const limit = args.limit ?? 100;
  try {
    const list = await haravan.promotions.list({ limit });
    const now = new Date();
    const endingSoon: unknown[] = [];
    const maybeExpiredEnabled: unknown[] = [];

    for (const p of list) {
      const ends = p.ends_at ? new Date(String(p.ends_at)) : null;
      const status = String(p.status ?? "").toLowerCase();
      if (ends && ends.getTime() - now.getTime() < 24 * 3600000 && ends > now) {
        endingSoon.push({
          id: p.id,
          name: p.name ?? p.title,
          ends_at: p.ends_at,
          status: p.status,
        });
      }
      if (ends && ends < now && (status === "enabled" || status === "active")) {
        maybeExpiredEnabled.push({
          id: p.id,
          name: p.name ?? p.title,
          ends_at: p.ends_at,
          status: p.status,
        });
      }
    }

    return {
      ok: true as const,
      promotion_count: list.length,
      ending_within_24h: endingSoon,
      possibly_expired_still_enabled: maybeExpiredEnabled,
      note: "Tắt KM hết hạn cần xác nhận — có thể gọi API discounts disable qua MCP legacy hoặc admin Haravan.",
    };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return {
      ok: false as const,
      error: msg,
      hint: "Kiểm tra scope token và endpoint /promotions.json trên shop.",
    };
  }
}
