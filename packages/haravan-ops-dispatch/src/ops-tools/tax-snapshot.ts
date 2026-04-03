import type { Haravan } from "@haravan-master/core";
import { endOfMonth, startOfMonth } from "./dates";

export interface TaxSnapshotArgs {
  /** YYYY-MM, mặc định tháng hiện tại */
  month?: string;
  order_limit?: number;
}

function parseMonth(s?: string): { y: number; m: number } {
  const now = new Date();
  if (!s || !/^\d{4}-\d{2}$/.test(s)) {
    return { y: now.getFullYear(), m: now.getMonth() + 1 };
  }
  const [ys, ms] = s.split("-");
  return { y: parseInt(ys, 10), m: parseInt(ms, 10) };
}

export async function runTaxComplianceSnapshot(haravan: Haravan, args: TaxSnapshotArgs) {
  const { y, m } = parseMonth(args.month);
  const start = startOfMonth(new Date(y, m - 1, 1));
  const end = endOfMonth(new Date(y, m - 1, 1));
  const limit = Math.min(args.order_limit ?? 250, 500);

  const orders = await haravan.orders.list({
    limit,
    status: "any",
    financial_status: "paid",
    created_at_min: start.toISOString(),
    created_at_max: end.toISOString(),
  });

  const monthRevenue = orders.reduce((s, o) => s + o.total_price, 0);

  const yearStart = new Date(y, 0, 1);
  const yOrders = await haravan.orders.list({
    limit,
    status: "any",
    financial_status: "paid",
    created_at_min: yearStart.toISOString(),
    created_at_max: end.toISOString(),
  });
  const yearRevenuePartial = yOrders.reduce((s, o) => s + o.total_price, 0);

  const threshold = 100_000_000;
  const estimatedVat = monthRevenue * 0.01;
  const estimatedPit = monthRevenue * 0.005;
  const estimatedTotalTax = estimatedVat + estimatedPit;

  return {
    disclaimer:
      "Ước tính tham khảo, không thay thế kế toán. NĐ 117/2025 — tự kiểm tra điều kiện áp dụng và dữ liệu đầy đủ.",
    period: { year: y, month: m, from: start.toISOString(), to: end.toISOString() },
    from_orders_sample: {
      paid_orders_in_month: orders.length,
      paid_orders_in_year_sample: yOrders.length,
      limit_applied: limit,
      undercount_warning:
        "Chỉ tính trên tối đa `limit` đơn gần nhất trong khoảng thời gian — doanh thu thực có thể cao hơn.",
    },
    revenue: {
      month_paid_total_sample: monthRevenue,
      year_paid_total_sample: yearRevenuePartial,
      crossed_100m_year_threshold_estimate: yearRevenuePartial >= threshold,
    },
    tax_estimate_household_goods_pct: {
      vat_1pct: Math.round(estimatedVat),
      pit_0_5pct: Math.round(estimatedPit),
      total_rounded: Math.round(estimatedTotalTax),
    },
    reminders: [
      "Deadline kê khai thường gặp: ngày 20 tháng sau — xác nhận với cơ quan thuế.",
      "Đối chiếu khấu trừ tại nguồn sàn TMĐT không có trong tool này.",
    ],
  };
}
