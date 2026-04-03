import type { Haravan, Order } from "@haravan-master/core";
import { hoursBetween, startOfWeekMonday } from "./dates";

export interface OrderSlaArgs {
  limit?: number;
}

function channelKey(source?: string): string {
  if (!source) return "unknown";
  const s = source.toLowerCase();
  if (s.includes("shopee")) return "shopee";
  if (s.includes("tiktok")) return "tiktok";
  if (s.includes("lazada")) return "lazada";
  return "other";
}

/** Ngưỡng đơn giản (giờ từ created_at) — tinh chỉnh theo policy shop */
function slaHoursWarning(channel: string): number {
  switch (channel) {
    case "shopee":
      return 12;
    case "tiktok":
      return 20;
    case "lazada":
      return 30;
    default:
      return 48;
  }
}

function slaHoursCritical(channel: string): number {
  switch (channel) {
    case "shopee":
      return 20;
    case "tiktok":
      return 24;
    case "lazada":
      return 36;
    default:
      return 72;
  }
}

function classifyOpenOrder(o: Order, now: Date) {
  const ch = channelKey(o.source_name);
  const h = hoursBetween(o.created_at, now);
  const warn = slaHoursWarning(ch);
  const crit = slaHoursCritical(ch);
  let level: "ok" | "watch" | "critical" = "ok";
  if (h >= crit) level = "critical";
  else if (h >= warn) level = "watch";
  return {
    order_id: o.id,
    order_number: o.order_number,
    created_at: o.created_at,
    hours_open: Math.round(h * 10) / 10,
    source_name: o.source_name ?? "unknown",
    channel: ch,
    financial_status: o.financial_status,
    fulfillment_status: o.fulfillment_status ?? "unknown",
    sla_level: level,
  };
}

export async function runOrderSlaAndFulfillmentRisks(
  haravan: Haravan,
  args: OrderSlaArgs
) {
  const limit = typeof args.limit === "number" ? args.limit : 250;
  const now = new Date();

  const [openOrders, anyOrders] = await Promise.all([
    haravan.orders.list({ limit, status: "open" }),
    haravan.orders.list({ limit, status: "any" }),
  ]);

  const openScanned = openOrders.map((o) => classifyOpenOrder(o, now));
  const slaCritical = openScanned.filter((x) => x.sla_level === "critical");
  const slaWatch = openScanned.filter((x) => x.sla_level === "watch");

  const unfulfilled = openOrders.filter((o) => {
    const fs = (o.fulfillment_status ?? "").toLowerCase();
    return fs === "" || fs === "unfulfilled" || fs === "partial";
  });

  const staleConfirmed = unfulfilled.filter((o) => {
    const hu = hoursBetween(o.updated_at, now);
    return hu >= 4;
  });

  const weekStart = startOfWeekMonday(now);
  const weekIso = weekStart.toISOString();
  const cancelledWeek = anyOrders.filter((o) => {
    if (!o.cancelled_at) return false;
    return new Date(o.cancelled_at) >= weekStart;
  });
  const totalWeek = anyOrders.filter((o) => new Date(o.created_at) >= weekStart);
  const cancelRatePct =
    totalWeek.length === 0
      ? 0
      : Math.round((cancelledWeek.length / totalWeek.length) * 10000) / 100;

  return {
    summary: {
      open_order_count: openOrders.length,
      sla_critical_count: slaCritical.length,
      sla_watch_count: slaWatch.length,
      unfulfilled_open_count: unfulfilled.length,
      stale_unfulfilled_4h_plus: staleConfirmed.length,
      cancel_rate_week_pct: cancelRatePct,
      cancelled_orders_week: cancelledWeek.length,
      orders_created_week: totalWeek.length,
      week_started_at: weekIso,
    },
    sla_critical: slaCritical.slice(0, 50),
    sla_watch: slaWatch.slice(0, 50),
    unfulfilled_stale_sample: staleConfirmed.slice(0, 30).map((o) => ({
      order_id: o.id,
      order_number: o.order_number,
      hours_since_update: Math.round(hoursBetween(o.updated_at, now) * 10) / 10,
      fulfillment_status: o.fulfillment_status ?? "unknown",
      source_name: o.source_name ?? "unknown",
    })),
    note:
      "SLA theo kênh là ước lượng. Kiểm tra source_name/fulfillment_status trên payload Haravan thực tế.",
  };
}
