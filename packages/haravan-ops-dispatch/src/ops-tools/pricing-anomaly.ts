import type { Haravan } from "@haravan-master/core";

export interface PricingAnomalyArgs {
  product_pages?: number;
  limit_per_page?: number;
  max_change_pct?: number;
}

export async function runPricingAnomalyScan(haravan: Haravan, args: PricingAnomalyArgs) {
  const pages = Math.min(Math.max(args.product_pages ?? 3, 1), 15);
  const limit = Math.min(Math.max(args.limit_per_page ?? 80, 1), 250);
  const maxPct = args.max_change_pct ?? 50;

  const anomalies: Array<{
    product_id: number;
    product_title: string;
    variant_id: number;
    variant_title: string;
    kind: string;
    price: number;
    compare_at_price?: number;
    detail: string;
  }> = [];

  for (let page = 1; page <= pages; page++) {
    const products = await haravan.products.list({ limit, page });
    if (products.length === 0) break;

    for (const p of products) {
      for (const v of p.variants) {
        const price = v.price;
        const cap = v.compare_at_price;

        if (price === 0) {
          anomalies.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            kind: "zero_price",
            price,
            detail: "Giá bán = 0",
          });
        }
        if (cap != null && cap > 0 && cap < price) {
          anomalies.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            kind: "compare_below_price",
            price,
            compare_at_price: cap,
            detail: "Giá so sánh thấp hơn giá bán",
          });
        }
      }
    }
  }

  return {
    summary: {
      count: anomalies.length,
      max_change_pct_not_implemented: maxPct,
    },
    anomalies: anomalies.slice(0, 100),
    note: "So sánh biến động giá theo ngày cần lưu snapshot lịch sử — chưa có trong phase này.",
  };
}
