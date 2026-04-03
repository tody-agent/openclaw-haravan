import { buildDailyBusinessSnapshot } from "../workflows/daily-business-snapshot";

export interface DailyBusinessSnapshotDependencies {
  orders: {
    list(query: { limit?: number; status?: string }): Promise<any[]>;
  };
  customers: {
    count(): Promise<number>;
  };
}

export interface DailyBusinessSnapshotArgs {
  date: string;
  limit?: number;
}

export async function runDailyBusinessSnapshot(
  haravan: DailyBusinessSnapshotDependencies,
  args: DailyBusinessSnapshotArgs
) {
  const [orders, customerCount] = await Promise.all([
    haravan.orders.list({ limit: args.limit, status: "any" }),
    haravan.customers.count(),
  ]);

  return buildDailyBusinessSnapshot({
    date: args.date,
    customerCount,
    orders,
  });
}
