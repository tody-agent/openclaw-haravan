import { HaravanClient } from "../client";
import { Refund } from "../types";

/** Hoàn tiền theo đơn: /orders/{order_id}/refunds.json */
export class OrderRefundsResource {
  constructor(private client: HaravanClient) {}

  async list(orderId: number, query?: { fields?: string }): Promise<Refund[]> {
    const response = await this.client.get<{ refunds: Refund[] }>(
      `/orders/${orderId}/refunds.json`,
      query
    );
    return response.refunds;
  }

  async get(orderId: number, refundId: number): Promise<Refund> {
    const response = await this.client.get<{ refund: Refund }>(
      `/orders/${orderId}/refunds/${refundId}.json`
    );
    return response.refund;
  }

  async create(orderId: number, refund: Record<string, unknown>): Promise<Refund> {
    const response = await this.client.post<{ refund: Refund }>(
      `/orders/${orderId}/refunds.json`,
      { refund }
    );
    return response.refund;
  }
}
