import { describe, expect, test, vi } from "vitest";
import { callLeanTool } from "../src/tool-handlers";

describe("callLeanTool", () => {
  test("daily_business_snapshot loads orders and customer count", async () => {
    const list = vi.fn().mockResolvedValue([]);
    const count = vi.fn().mockResolvedValue(10);
    const haravan = { orders: { list }, customers: { count } } as any;

    const result = await callLeanTool(
      "daily_business_snapshot",
      { date: "2026-04-03", limit: 50 },
      haravan
    );

    expect(list).toHaveBeenCalledWith({ limit: 50, status: "any" });
    expect(count).toHaveBeenCalledTimes(1);
    expect(result).toMatchObject({
      date: "2026-04-03",
      customerCount: 10,
      orderCount: 0,
      grossRevenue: 0,
    });
  });

  test("rejects when Haravan client is missing (MCP / default)", async () => {
    await expect(
      callLeanTool("daily_business_snapshot", { date: "2026-04-03" }, null)
    ).rejects.toThrow(/HARAVAN_SHOP/);
  });

  test("rejects when Haravan client is missing (OpenClaw plugin hint)", async () => {
    await expect(
      callLeanTool(
        "daily_business_snapshot",
        { date: "2026-04-03" },
        null,
        { clientKind: "openclaw-plugin" }
      )
    ).rejects.toThrow(/shop and accessToken/);
  });

  test("rejects unknown tool", async () => {
    const haravan = {
      orders: { list: vi.fn() },
      customers: { count: vi.fn() },
    } as any;
    await expect(callLeanTool("unknown_tool", {}, haravan)).rejects.toThrow(
      /Unknown tool/
    );
  });

  test("find_unfulfilled_orders returns unfulfilled slice", async () => {
    const open = [
      {
        id: 1,
        order_number: "A1",
        created_at: "2026-04-03T00:00:00Z",
        updated_at: "2026-04-03T00:00:00Z",
        financial_status: "paid",
        fulfillment_status: "unfulfilled",
        total_price: 100,
      },
      {
        id: 2,
        order_number: "A2",
        created_at: "2026-04-03T01:00:00Z",
        updated_at: "2026-04-03T01:00:00Z",
        financial_status: "paid",
        fulfillment_status: "fulfilled",
        total_price: 200,
      },
    ];
    const list = vi.fn().mockResolvedValue(open);
    const haravan = { orders: { list } } as any;

    const result = (await callLeanTool(
      "find_unfulfilled_orders",
      { limit: 50 },
      haravan
    )) as { count: number };

    expect(list).toHaveBeenCalledWith({ limit: 50, status: "open" });
    expect(result.count).toBe(1);
  });

  test("theme_draft_create preview without confirm", async () => {
    const haravan = { themes: { create: vi.fn() } } as any;
    const result = await callLeanTool(
      "theme_draft_create",
      { draft_name: "Test Draft", confirm: false },
      haravan
    );
    expect(result).toMatchObject({ status: "preview" });
    expect(haravan.themes.create).not.toHaveBeenCalled();
  });

  test("haravan_list_locations delegates to core", async () => {
    const list = vi.fn().mockResolvedValue([{ id: 1, name: "Kho A" }]);
    const haravan = { locations: { list } } as any;
    const result = await callLeanTool("haravan_list_locations", {}, haravan);
    expect(list).toHaveBeenCalledTimes(1);
    expect(result).toEqual([{ id: 1, name: "Kho A" }]);
  });

  test("sale_period_stock_forecast aggregates orders and products", async () => {
    const orders = [
      {
        id: 1,
        created_at: "2026-04-10T10:00:00Z",
        cancelled_at: null,
        line_items: [{ variant_id: 99, title: "SKU A", quantity: 2, price: 50 }],
      },
      {
        id: 2,
        created_at: "2026-04-14T10:00:00Z",
        cancelled_at: null,
        line_items: [{ variant_id: 99, title: "SKU A", quantity: 5, price: 50 }],
      },
    ];
    const products = [
      {
        id: 1,
        title: "P1",
        variants: [{ id: 99, title: "Default", inventory_quantity: 3 }],
      },
    ];
    const listOrders = vi.fn().mockResolvedValue(orders);
    const listProducts = vi.fn().mockResolvedValue(products);
    const haravan = {
      orders: { list: listOrders },
      products: { list: listProducts },
    } as any;

    const result = (await callLeanTool(
      "sale_period_stock_forecast",
      {
        history_days: 30,
        horizon_days: 30,
        as_of: "2026-04-20",
        order_limit: 50,
        product_pages: 1,
      },
      haravan
    )) as { uplift_used: number; top_variants_for_restock: unknown[] };

    expect(listOrders).toHaveBeenCalled();
    expect(listProducts).toHaveBeenCalled();
    expect(result.uplift_used).toBeGreaterThanOrEqual(1);
    expect(Array.isArray(result.top_variants_for_restock)).toBe(true);
  });

  test("haravan_com_api GET forwards path", async () => {
    const get = vi.fn().mockResolvedValue({ shop: { name: "T" } });
    const haravan = { com: { get } } as any;
    await callLeanTool(
      "haravan_com_api",
      { method: "GET", path: "/shop.json" },
      haravan
    );
    expect(get).toHaveBeenCalledWith("/shop.json", undefined);
  });
});
