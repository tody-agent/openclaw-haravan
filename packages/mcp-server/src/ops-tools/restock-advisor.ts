import type { Haravan } from "@haravan-master/core";

export interface RestockArgs {
  days?: number;
  order_limit?: number;
  product_pages?: number;
}

export async function runSlowMoverAndRestockAdvisor(haravan: Haravan, args: RestockArgs) {
  const days = args.days ?? 28;
  const orderLimit = Math.min(args.order_limit ?? 250, 500);
  const since = new Date();
  since.setDate(since.getDate() - days);

  const orders = await haravan.orders.list({
    limit: orderLimit,
    status: "any",
    created_at_min: since.toISOString(),
  });

  const sold = new Map<number, { title: string; qty: number }>();
  for (const o of orders) {
    if (o.cancelled_at) continue;
    for (const li of o.line_items) {
      const cur = sold.get(li.variant_id) ?? { title: li.title, qty: 0 };
      cur.qty += li.quantity;
      sold.set(li.variant_id, cur);
    }
  }

  const pages = Math.min(Math.max(args.product_pages ?? 4, 1), 10);
  const slow: Array<{
    product_id: number;
    product_title: string;
    variant_id: number;
    variant_title: string;
    inventory_quantity: number;
    sold_qty_window: number;
    days_of_cover: number | null;
  }> = [];

  for (let page = 1; page <= pages; page++) {
    const products = await haravan.products.list({ limit: 100, page });
    if (products.length === 0) break;
    for (const p of products) {
      for (const v of p.variants) {
        const sq = sold.get(v.id)?.qty ?? 0;
        const perDay = sq / days;
        const doc =
          perDay > 0 ? Math.floor(v.inventory_quantity / perDay) : null;
        if (sq === 0 && v.inventory_quantity > 0) {
          slow.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            inventory_quantity: v.inventory_quantity,
            sold_qty_window: 0,
            days_of_cover: null,
          });
        } else if (perDay > 0 && doc !== null && doc < 14) {
          slow.push({
            product_id: p.id,
            product_title: p.title,
            variant_id: v.id,
            variant_title: v.title,
            inventory_quantity: v.inventory_quantity,
            sold_qty_window: sq,
            days_of_cover: doc,
          });
        }
      }
    }
  }

  const dead = slow.filter((x) => x.sold_qty_window === 0);
  const restock = slow.filter((x) => x.sold_qty_window > 0);

  return {
    window_days: days,
    summary: {
      no_sales_but_stock_variants: dead.length,
      low_cover_under_14d_variants: restock.length,
      orders_in_window_sample: orders.length,
    },
    dead_stock_sample: dead.slice(0, 40),
    restock_pressure_sample: restock.slice(0, 40),
    note: "Lead time nhập hàng nên cấu hình ngoài tool; đây là gợi ý từ tốc độ bán ước lượng.",
  };
}
