import { HaravanClient } from "../client";
import { Order } from "../types";

export class OrdersResource {
  constructor(private client: HaravanClient) {}

  async list(
    query?: {
      limit?: number;
      page?: number;
      status?: string;
      financial_status?: string;
      fulfillment_status?: string;
      created_at_min?: string;
      created_at_max?: string;
      updated_at_min?: string;
      updated_at_max?: string;
      fields?: string;
    }
  ): Promise<Order[]> {
    const response = await this.client.get<{ orders: Order[] }>("/orders.json", query);
    return response.orders;
  }

  async get(id: number): Promise<Order> {
    const response = await this.client.get<{ order: Order }>(`/orders/${id}.json`);
    return response.order;
  }

  async create(order: Partial<Order>): Promise<Order> {
    const response = await this.client.post<{ order: Order }>("/orders.json", { order });
    return response.order;
  }
}
