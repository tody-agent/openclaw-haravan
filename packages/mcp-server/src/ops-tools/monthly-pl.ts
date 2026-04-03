import type { Haravan } from "@haravan-master/core";
import { endOfMonth, startOfMonth } from "./dates";

export interface MonthlyPlArgs {
  /** YYYY-MM */
  month: string;
  order_limit?: number;
}

export async function runMonthlyPlEstimate(haravan: Haravan, args: MonthlyPlArgs) {
  const m = args.month.trim();
  if (!/^\d{4}-\d{2}$/.test(m)) {
    throw new Error("monthly_pl_estimate requires month YYYY-MM");
  }
  const [ys, ms] = m.split("-");
  const y = parseInt(ys, 10);
  const mo = parseInt(ms, 10);
  const start = startOfMonth(new Date(y, mo - 1, 1));
  const end = endOfMonth(new Date(y, mo - 1, 1));
  const limit = Math.min(args.order_limit ?? 250, 500);

  const orders = await haravan.orders.list({
    limit,
    status: "any",
    created_at_min: start.toISOString(),
    created_at_max: end.toISOString(),
  });

  const active = orders.filter((o) => !o.cancelled_at);
  const gross = active.reduce((s, o) => s + o.total_price, 0);
  const discounts = active.reduce((s, o) => s + (o.total_discounts ?? 0), 0);
  const net = gross - discounts;
  const taxEstimate = net * 0.015;

  return {
    disclaimer:
      "P&L ước tính: không có giá vốn, phí sàn, ship — chỉ từ mẫu đơn hàng Haravan.",
    month: m,
    sample: { order_rows: orders.length, limit },
    revenue: {
      gross_from_orders: gross,
      discounts_sum: discounts,
      net_after_discounts: net,
    },
    estimated_tax_1_5pct_rounded: Math.round(taxEstimate),
    note: "Bổ sung COGS và phí cố định ở bảng tính ngoài hoặc phase sau.",
  };
}
