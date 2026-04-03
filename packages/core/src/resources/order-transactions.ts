import { HaravanClient } from "../client";
import { Transaction } from "../types";

/** Giao dịch theo đơn: GET/POST /orders/{order_id}/transactions.json */
export class OrderTransactionsResource {
  constructor(private client: HaravanClient) {}

  async list(orderId: number, query?: { fields?: string }): Promise<Transaction[]> {
    const response = await this.client.get<{ transactions: Transaction[] }>(
      `/orders/${orderId}/transactions.json`,
      query
    );
    return response.transactions;
  }

  async get(orderId: number, transactionId: number): Promise<Transaction> {
    const response = await this.client.get<{ transaction: Transaction }>(
      `/orders/${orderId}/transactions/${transactionId}.json`
    );
    return response.transaction;
  }

  async create(orderId: number, transaction: Partial<Transaction>): Promise<Transaction> {
    const response = await this.client.post<{ transaction: Transaction }>(
      `/orders/${orderId}/transactions.json`,
      { transaction }
    );
    return response.transaction;
  }
}
