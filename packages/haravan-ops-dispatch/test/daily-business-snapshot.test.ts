import { describe, expect, test } from "vitest";
import type { Order } from "@haravan-master/core";

function makeOrder(overrides: Partial<Order>): Order {
  return {
    id: 1,
    email: "buyer@example.com",
    created_at: "2026-04-03T08:00:00.000Z",
    updated_at: "2026-04-03T08:00:00.000Z",
    number: 1001,
    order_number: "1001",
    total_price: 0,
    subtotal_price: 0,
    total_weight: 0,
    total_tax: 0,
    currency: "VND",
    financial_status: "paid",
    total_discounts: 0,
    line_items: [],
    ...overrides,
  };
}

describe("daily business snapshot", () => {
  test("builds a daily ops summary from orders for the selected date", async () => {
    const mod = await import("../src/workflows/daily-business-snapshot").catch(
      () => null
    );

    expect(mod).not.toBeNull();

    const orders: Order[] = [
      makeOrder({
        id: 1,
        total_price: 120000,
        line_items: [
          { id: 11, variant_id: 101, title: "Ao thun", quantity: 2, price: 50000, sku: "AT-1" },
          { id: 12, variant_id: 102, title: "Quan jean", quantity: 1, price: 20000, sku: "QJ-1" },
        ],
      }),
      makeOrder({
        id: 2,
        number: 1002,
        order_number: "1002",
        total_price: 80000,
        financial_status: "pending",
        line_items: [
          { id: 21, variant_id: 101, title: "Ao thun", quantity: 1, price: 80000, sku: "AT-1" },
        ],
      }),
      makeOrder({
        id: 3,
        number: 1003,
        order_number: "1003",
        created_at: "2026-04-02T23:00:00.000Z",
        updated_at: "2026-04-02T23:00:00.000Z",
        total_price: 990000,
        line_items: [
          { id: 31, variant_id: 999, title: "Khong tinh", quantity: 1, price: 990000, sku: "OLD-1" },
        ],
      }),
    ];

    const snapshot = mod?.buildDailyBusinessSnapshot({
      date: "2026-04-03",
      customerCount: 245,
      orders,
    });

    expect(snapshot).toEqual({
      date: "2026-04-03",
      currency: "VND",
      customerCount: 245,
      orderCount: 2,
      grossRevenue: 200000,
      averageOrderValue: 100000,
      attentionOrdersCount: 1,
      topProducts: [
        { title: "Ao thun", quantity: 3, revenue: 180000 },
        { title: "Quan jean", quantity: 1, revenue: 20000 },
      ],
    });
  });
});
