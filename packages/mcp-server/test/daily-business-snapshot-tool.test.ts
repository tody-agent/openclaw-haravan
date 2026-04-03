import { describe, expect, test, vi } from "vitest";
import type { Order } from "@haravan-master/core";

function makeOrder(overrides: Partial<Order>): Order {
  return {
    id: 1,
    email: "buyer@example.com",
    created_at: "2026-04-03T08:00:00.000Z",
    updated_at: "2026-04-03T08:00:00.000Z",
    number: 1001,
    order_number: "1001",
    total_price: 120000,
    subtotal_price: 120000,
    total_weight: 0,
    total_tax: 0,
    currency: "VND",
    financial_status: "paid",
    total_discounts: 0,
    line_items: [
      { id: 11, variant_id: 101, title: "Ao thun", quantity: 2, price: 60000, sku: "AT-1" },
    ],
    ...overrides,
  };
}

describe("daily business snapshot tool runner", () => {
  test("loads orders and customer count before building the snapshot", async () => {
    const mod = await import("../src/tools/daily-business-snapshot").catch(
      () => null
    );

    expect(mod).not.toBeNull();

    const listOrders = vi.fn().mockResolvedValue([
      makeOrder({ id: 1 }),
      makeOrder({ id: 2, total_price: 80000, financial_status: "pending" }),
    ]);
    const countCustomers = vi.fn().mockResolvedValue(245);

    const snapshot = await mod?.runDailyBusinessSnapshot(
      {
        orders: { list: listOrders },
        customers: { count: countCustomers },
      },
      { date: "2026-04-03", limit: 50 }
    );

    expect(listOrders).toHaveBeenCalledWith({ limit: 50, status: "any" });
    expect(countCustomers).toHaveBeenCalledTimes(1);
    expect(snapshot).toMatchObject({
      date: "2026-04-03",
      customerCount: 245,
      orderCount: 2,
      grossRevenue: 200000,
      attentionOrdersCount: 1,
    });
  });
});
