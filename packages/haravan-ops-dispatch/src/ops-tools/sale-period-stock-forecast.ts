import type { Haravan, Order } from "@haravan-master/core";
import { getSaleTier, listUpcomingSaleWindows } from "./sale-calendar";

export interface SalePeriodStockForecastArgs {
  /** Cửa sổ lịch sử đơn (ngày), mặc định 120 */
  history_days?: number;
  /** Tìm cửa sổ sale trong N ngày tới, mặc định 45 */
  horizon_days?: number;
  order_limit?: number;
  product_pages?: number;
  /** Phần trăm SKU ưu tiên (Pareto), mặc định 0.2 */
  pareto_pct?: number;
  /** Hệ số uplift khi không đủ dữ liệu so sánh sale/normal */
  fixed_uplift?: number;
  /** Buffer thêm = baseline_daily × safety_days_cover */
  safety_days_cover?: number;
  /** YYYY-MM-DD; mặc định UTC hôm nay */
  as_of?: string;
}

type VariantAgg = {
  variant_id: number;
  title: string;
  qty_non_sale: number;
  qty_sale: number;
  revenue_non_sale: number;
  revenue_sale: number;
};

function todayKeyUtc(): string {
  return new Date().toISOString().slice(0, 10);
}

function clamp(n: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, n));
}

export async function runSalePeriodStockForecast(
  haravan: Haravan,
  args: SalePeriodStockForecastArgs
) {
  const historyDays = Math.max(30, Math.min(args.history_days ?? 120, 400));
  const horizonDays = Math.max(7, Math.min(args.horizon_days ?? 45, 120));
  const orderLimit = Math.min(args.order_limit ?? 250, 500);
  const productPages = Math.min(Math.max(args.product_pages ?? 4, 1), 10);
  const paretoPct = clamp(args.pareto_pct ?? 0.2, 0.05, 0.5);
  const safetyCover = Math.max(0, Math.min(args.safety_days_cover ?? 3, 14));

  const asOf =
    typeof args.as_of === "string" && /^\d{4}-\d{2}-\d{2}$/.test(args.as_of.trim())
      ? args.as_of.trim()
      : todayKeyUtc();

  const since = new Date();
  since.setUTCDate(since.getUTCDate() - historyDays);

  const orders = (await haravan.orders.list({
    limit: orderLimit,
    status: "any",
    created_at_min: since.toISOString(),
  })) as Order[];

  const byVariant = new Map<number, VariantAgg>();

  function bump(
    vid: number,
    title: string,
    qty: number,
    revenue: number,
    tier: ReturnType<typeof getSaleTier>
  ) {
    const cur = byVariant.get(vid) ?? {
      variant_id: vid,
      title,
      qty_non_sale: 0,
      qty_sale: 0,
      revenue_non_sale: 0,
      revenue_sale: 0,
    };
    if (tier) {
      cur.qty_sale += qty;
      cur.revenue_sale += revenue;
    } else {
      cur.qty_non_sale += qty;
      cur.revenue_non_sale += revenue;
    }
    cur.title = title;
    byVariant.set(vid, cur);
  }

  let cancelledSkipped = 0;
  for (const o of orders) {
    if (o.cancelled_at) {
      cancelledSkipped++;
      continue;
    }
    const dk = o.created_at.slice(0, 10);
    const tier = getSaleTier(dk);
    for (const li of o.line_items) {
      const revenue = li.quantity * li.price;
      bump(li.variant_id, li.title, li.quantity, revenue, tier);
    }
  }

  const globalSaleQty = [...byVariant.values()].reduce((s, v) => s + v.qty_sale, 0);
  const globalNonQty = [...byVariant.values()].reduce((s, v) => s + v.qty_non_sale, 0);

  const saleDayKeys = new Set<string>();
  const nonSaleDayKeys = new Set<string>();
  for (const o of orders) {
    if (o.cancelled_at) {
      continue;
    }
    const dk = o.created_at.slice(0, 10);
    (getSaleTier(dk) ? saleDayKeys : nonSaleDayKeys).add(dk);
  }

  const saleDayCount = Math.max(1, saleDayKeys.size);
  const nonSaleDayCount = Math.max(1, nonSaleDayKeys.size);

  let uplift =
    globalNonQty > 0
      ? clamp(
          globalSaleQty / saleDayCount / (globalNonQty / nonSaleDayCount),
          1,
          5
        )
      : 1;

  let upliftMethod: string;
  if (
    saleDayKeys.size < 3 ||
    nonSaleDayKeys.size < 5 ||
    globalSaleQty < 10
  ) {
    uplift =
      typeof args.fixed_uplift === "number" && !Number.isNaN(args.fixed_uplift)
        ? clamp(args.fixed_uplift, 1, 5)
        : 1.35;
    upliftMethod =
      typeof args.fixed_uplift === "number" ? "fixed_uplift_param" : "default_conservative_1_35";
  } else {
    upliftMethod = "from_history_sale_vs_normal";
  }

  const upcoming = listUpcomingSaleWindows(asOf, horizonDays);
  const next = upcoming.find((w) => w.end >= asOf) ?? upcoming[0] ?? null;

  const windowDayCount = next?.dates.length ?? 4;

  type Row = {
    variant_id: number;
    product_title: string;
    variant_title: string;
    inventory_quantity: number;
    baseline_daily_qty: number;
    forecast_sale_window_qty: number;
    safety_buffer_qty: number;
    suggested_restock_qty: number;
    pareto_revenue_proxy: number;
  };

  const rows: Row[] = [];

  for (let page = 1; page <= productPages; page++) {
    const products = await haravan.products.list({ limit: 100, page });
    if (products.length === 0) {
      break;
    }
    for (const p of products) {
      for (const v of p.variants) {
        const agg = byVariant.get(v.id);
        const baselineDaily = agg ? agg.qty_non_sale / historyDays : 0;
        const forecastWindow = baselineDaily * windowDayCount * uplift;
        const safetyBuffer = baselineDaily * safetyCover;
        const suggested = Math.max(
          0,
          Math.ceil(forecastWindow + safetyBuffer - v.inventory_quantity)
        );
        const paretoRevenue =
          (agg?.qty_non_sale ?? 0) + (agg?.qty_sale ?? 0) > 0
            ? (agg?.revenue_non_sale ?? 0) + (agg?.revenue_sale ?? 0)
            : 0;
        rows.push({
          variant_id: v.id,
          product_title: p.title,
          variant_title: v.title,
          inventory_quantity: v.inventory_quantity,
          baseline_daily_qty: Math.round(baselineDaily * 1000) / 1000,
          forecast_sale_window_qty: Math.round(forecastWindow * 10) / 10,
          safety_buffer_qty: Math.round(safetyBuffer * 10) / 10,
          suggested_restock_qty: suggested,
          pareto_revenue_proxy: paretoRevenue,
        });
      }
    }
  }

  rows.sort((a, b) => b.pareto_revenue_proxy - a.pareto_revenue_proxy);
  const cut = Math.max(1, Math.ceil(rows.length * paretoPct));
  const top = rows.slice(0, cut);

  const restRevenue = rows.slice(cut).reduce((s, r) => s + r.pareto_revenue_proxy, 0);
  const topRevenue = top.reduce((s, r) => s + r.pareto_revenue_proxy, 0);

  return {
    as_of: asOf,
    history_days: historyDays,
    horizon_days: horizonDays,
    uplift_used: Math.round(uplift * 1000) / 1000,
    uplift_method: upliftMethod,
    pareto_pct: paretoPct,
    upcoming_sale_windows_sample: upcoming.slice(0, 8),
    next_focus_window: next,
    window_days_for_forecast: windowDayCount,
    summary: {
      orders_in_history: orders.length,
      cancelled_skipped: cancelledSkipped,
      variants_scanned: rows.length,
      top_tier_variant_count: top.length,
      top_revenue_share_proxy:
        topRevenue + restRevenue > 0
          ? Math.round((topRevenue / (topRevenue + restRevenue)) * 1000) / 1000
          : null,
    },
    top_variants_for_restock: top,
    note:
      "Ước lượng từ đơn Haravan (prefix ngày created_at), preset sale sàn VN (midmonth 14–15, payday 24–25, doubleday 1/1–8/8 cửa sổ 4 ngày, megasale 9/9–12/12 cửa sổ 4 ngày). Không thay thế kế hoạch nhập/lead time thực tế. Pareto: ưu tiên SKU có proxy doanh thu dòng (price×qty) trong cửa sổ lịch sử.",
  };
}
