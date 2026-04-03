import type { Haravan } from "@haravan-master/core";
import { hoursBetween } from "./dates";

export interface OrdersAttentionArgs {
  limit?: number;
}

export async function runFindUnfulfilledOrders(haravan: Haravan, args: OrdersAttentionArgs) {
  const limit = args.limit ?? 250;
  const open = await haravan.orders.list({ limit, status: "open" });
  const now = new Date();
  const rows = open.filter((o) => {
    const fs = (o.fulfillment_status ?? "").toLowerCase();
    return fs === "" || fs === "unfulfilled" || fs === "partial";
  });

  return {
    count: rows.length,
    orders: rows.slice(0, 80).map((o) => ({
      order_id: o.id,
      order_number: o.order_number,
      created_at: o.created_at,
      financial_status: o.financial_status,
      fulfillment_status: o.fulfillment_status ?? "unknown",
      total_price: o.total_price,
      source_name: o.source_name ?? "unknown",
      hours_open: Math.round(hoursBetween(o.created_at, now) * 10) / 10,
    })),
  };
}

export async function runFindOrdersNeedingAttention(haravan: Haravan, args: OrdersAttentionArgs) {
  const limit = args.limit ?? 250;
  const open = await haravan.orders.list({ limit, status: "open" });
  const now = new Date();

  const unpaid = open.filter((o) => o.financial_status && o.financial_status !== "paid");
  const stale = open.filter((o) => hoursBetween(o.updated_at, now) >= 24);

  const ids = new Set([...unpaid.map((o) => o.id), ...stale.map((o) => o.id)]);
  const merged = open.filter((o) => ids.has(o.id));

  return {
    summary: {
      open_count: open.length,
      unpaid_or_partial_payment_count: unpaid.length,
      stale_updated_24h_plus: stale.length,
      combined_attention_count: merged.length,
    },
    sample: merged.slice(0, 60).map((o) => ({
      order_id: o.id,
      order_number: o.order_number,
      financial_status: o.financial_status,
      fulfillment_status: o.fulfillment_status ?? "unknown",
      hours_since_update: Math.round(hoursBetween(o.updated_at, now) * 10) / 10,
      reason:
        o.financial_status !== "paid"
          ? "financial_not_paid"
          : hoursBetween(o.updated_at, now) >= 24
            ? "stale_update"
            : "other",
    })),
  };
}
