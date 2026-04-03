import type { Haravan } from "@haravan-master/core";
import { hoursBetween } from "./dates";

export interface CustomersValueArgs {
  limit?: number;
  top_n?: number;
  inactive_days?: number;
}

export async function runSegmentHighValueCustomers(haravan: Haravan, args: CustomersValueArgs) {
  const limit = args.limit ?? 250;
  const topN = args.top_n ?? 30;
  const customers = await haravan.customers.list({ limit });
  const sorted = [...customers].sort((a, b) => b.total_spent - a.total_spent);
  const top = sorted.slice(0, topN);

  return {
    segment: "high_value_by_total_spent",
    count_considered: customers.length,
    top_customers: top.map((c) => ({
      id: c.id,
      name: `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || c.email,
      email: c.email,
      total_spent: c.total_spent,
      orders_count: c.orders_count,
      tags: c.tags,
    })),
  };
}

export async function runFindReactivationCandidates(haravan: Haravan, args: CustomersValueArgs) {
  const limit = args.limit ?? 250;
  const inactiveDays = args.inactive_days ?? 60;
  const customers = await haravan.customers.list({ limit });
  const now = new Date();

  const candidates = customers.filter((c) => {
    if ((c.orders_count ?? 0) < 1) return false;
    const h = hoursBetween(c.updated_at, now) / 24;
    return h >= inactiveDays;
  });

  const vipCold = candidates
    .filter((c) => c.total_spent >= 1_000_000)
    .sort((a, b) => b.total_spent - a.total_spent);

  return {
    inactive_days_threshold: inactiveDays,
    count: candidates.length,
    vip_inactive_sample: vipCold.slice(0, 40).map((c) => ({
      id: c.id,
      name: `${c.first_name ?? ""} ${c.last_name ?? ""}`.trim() || c.email,
      email: c.email,
      total_spent: c.total_spent,
      days_since_update: Math.round((hoursBetween(c.updated_at, now) / 24) * 10) / 10,
    })),
    note: "updated_at khách không thay thế last_order_date; dùng làm proxy khi API không có.",
  };
}
