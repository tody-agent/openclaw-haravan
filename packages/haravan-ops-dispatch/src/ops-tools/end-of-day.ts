import type { Haravan } from "@haravan-master/core";

export interface EndOfDayArgs {
  date: string;
  limit?: number;
}

export async function runEndOfDayReconciliation(haravan: Haravan, args: EndOfDayArgs) {
  const date = args.date.trim();
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("end_of_day_reconciliation requires date YYYY-MM-DD");
  }
  const limit = args.limit ?? 250;

  const orders = await haravan.orders.list({ limit, status: "any" });
  const dayOrders = orders.filter((o) => o.created_at.startsWith(date));

  const variantQty = new Map<number, { title: string; qty: number; revenue: number }>();
  let paidTotal = 0;
  let cancelCount = 0;

  for (const o of dayOrders) {
    if (o.financial_status === "paid") paidTotal += o.total_price;
    if (o.cancelled_at) cancelCount += 1;
    for (const li of o.line_items) {
      const cur = variantQty.get(li.variant_id) ?? {
        title: li.title,
        qty: 0,
        revenue: 0,
      };
      cur.qty += li.quantity;
      cur.revenue += li.quantity * li.price;
      variantQty.set(li.variant_id, cur);
    }
  }

  const topVariants = [...variantQty.entries()]
    .map(([variant_id, v]) => ({ variant_id, ...v }))
    .sort((a, b) => b.qty - a.qty)
    .slice(0, 40);

  return {
    date,
    summary: {
      orders_count: dayOrders.length,
      cancelled_count: cancelCount,
      paid_revenue_sum: paidTotal,
      unique_variants_sold: variantQty.size,
    },
    top_variants: topVariants,
    note: "Đối soát tồn kho thực cần snapshot tồn đầu/cuối ngày — ngoài phạm vi API đơn thuần.",
  };
}
