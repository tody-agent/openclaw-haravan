import type { Haravan } from "@haravan-master/core";
import { runFindLowStockRisks } from "./low-stock";

export interface InventoryAnomalyArgs {
  threshold?: number;
  product_pages?: number;
}

/**
 * Gộp B1/B2 playbook: tồn âm / sắp hết + gợi ý kiểm tra oversell (published + tồn thấp).
 */
export async function runInventoryOversellAndAnomalies(
  haravan: Haravan,
  args: InventoryAnomalyArgs
) {
  const stock = await runFindLowStockRisks(haravan, {
    threshold: args.threshold ?? 3,
    product_pages: args.product_pages ?? 3,
  });

  const pages = Math.min(Math.max(args.product_pages ?? 3, 1), 10);
  const oversellWatch: Array<{
    product_id: number;
    title: string;
    variant_id: number;
    sku: string;
    inventory_quantity: number;
    published_at: string | null;
  }> = [];

  for (let page = 1; page <= pages; page++) {
    const products = await haravan.products.list({ limit: 100, page });
    if (products.length === 0) break;
    for (const p of products) {
      const published = p.published === true || !!p.published_at;
      if (!published) continue;
      for (const v of p.variants) {
        if (v.inventory_quantity <= 3) {
          oversellWatch.push({
            product_id: p.id,
            title: p.title,
            variant_id: v.id,
            sku: v.sku || "",
            inventory_quantity: v.inventory_quantity,
            published_at: p.published_at ?? null,
          });
        }
      }
    }
  }

  return {
    ...stock,
    oversell_risk_published_low_stock: oversellWatch.slice(0, 60),
    actions_hint: [
      "Tồn âm: kiểm tra đơn chờ xử lý và điều chỉnh kho (cần xác nhận trước khi ghi).",
      "SP published + tồn cực thấp: cân nhắc tạm ẩn hoặc deny oversell — chỉ thực hiện sau khi user xác nhận.",
    ],
  };
}
