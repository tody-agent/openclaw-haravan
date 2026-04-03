import type { Order } from "@haravan-master/core";

export interface DailyBusinessSnapshotInput {
  date: string;
  customerCount: number;
  orders: Order[];
}

export interface DailyBusinessSnapshot {
  date: string;
  currency: string;
  customerCount: number;
  orderCount: number;
  grossRevenue: number;
  averageOrderValue: number;
  attentionOrdersCount: number;
  topProducts: Array<{
    title: string;
    quantity: number;
    revenue: number;
  }>;
}

export function buildDailyBusinessSnapshot(
  input: DailyBusinessSnapshotInput
): DailyBusinessSnapshot {
  const dailyOrders = input.orders.filter((order) =>
    order.created_at.startsWith(input.date)
  );

  const grossRevenue = dailyOrders.reduce(
    (sum, order) => sum + order.total_price,
    0
  );
  const orderCount = dailyOrders.length;
  const averageOrderValue = orderCount === 0 ? 0 : grossRevenue / orderCount;
  const attentionOrdersCount = dailyOrders.filter(
    (order) => order.financial_status !== "paid"
  ).length;

  const products = new Map<string, { title: string; quantity: number; revenue: number }>();

  for (const order of dailyOrders) {
    for (const lineItem of order.line_items) {
      const existing = products.get(lineItem.title) ?? {
        title: lineItem.title,
        quantity: 0,
        revenue: 0,
      };

      existing.quantity += lineItem.quantity;
      existing.revenue += lineItem.quantity * lineItem.price;

      products.set(lineItem.title, existing);
    }
  }

  const topProducts = [...products.values()].sort((left, right) => {
    if (right.quantity !== left.quantity) {
      return right.quantity - left.quantity;
    }

    return right.revenue - left.revenue;
  });

  return {
    date: input.date,
    currency: dailyOrders[0]?.currency ?? "VND",
    customerCount: input.customerCount,
    orderCount,
    grossRevenue,
    averageOrderValue,
    attentionOrdersCount,
    topProducts,
  };
}
