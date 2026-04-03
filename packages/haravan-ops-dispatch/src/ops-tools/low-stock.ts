import type { Haravan } from "@haravan-master/core";

export interface LowStockArgs {
  threshold?: number;
  product_pages?: number;
  limit_per_page?: number;
}

export async function runFindLowStockRisks(haravan: Haravan, args: LowStockArgs) {
  const threshold = typeof args.threshold === "number" ? args.threshold : 5;
  const pages = Math.min(Math.max(args.product_pages ?? 2, 1), 10);
  const limitPer = Math.min(Math.max(args.limit_per_page ?? 100, 1), 250);

  const low: Array<{
    product_id: number;
    product_title: string;
    variant_id: number;
    variant_title: string;
    sku: string;
    inventory_quantity: number;
    level: "out" | "low";
  }> = [];

  for (let page = 1; page <= pages; page++) {
    const products = await haravan.products.list({ limit: limitPer, page });
    if (products.length === 0) break;

    for (const p of products) {
      for (const v of p.variants) {
        const q = v.inventory_quantity;
        if (q < 0) {
          low.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            sku: v.sku || "",
            inventory_quantity: q,
            level: "out",
          });
        } else if (q <= threshold) {
          low.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            sku: v.sku || "",
            inventory_quantity: q,
            level: "low",
          });
        }
      }
    }
  }

  const negative = low.filter((x) => x.level === "out");
  const lowOnly = low.filter((x) => x.level === "low");

  return {
    summary: {
      threshold,
      negative_stock_variants: negative.length,
      low_stock_variants: lowOnly.length,
      pages_scanned: pages,
    },
    negative_stock: negative.slice(0, 80),
    low_stock: lowOnly.slice(0, 80),
    note: "Dựa trên inventory_quantity trên variant. Đồng bộ đa kho có thể cần inventory_levels API.",
  };
}
