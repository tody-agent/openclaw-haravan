import { HaravanClient } from "../client";
import { Order } from "../types";
import { OrderRefundsResource } from "./order-refunds";
import { OrderTransactionsResource } from "./order-transactions";

export class OrdersResource {
  readonly transactions: OrderTransactionsResource;
  readonly refunds: OrderRefundsResource;

  constructor(private client: HaravanClient) {
    this.transactions = new OrderTransactionsResource(client);
    this.refunds = new OrderRefundsResource(client);
  }

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

  async update(id: number, order: Partial<Order>): Promise<Order> {
    const response = await this.client.put<{ order: Order }>(`/orders/${id}.json`, {
      order: { id, ...order },
    });
    return response.order;
  }

  async close(id: number): Promise<Order> {
    const response = await this.client.post<{ order: Order }>(`/orders/${id}/close.json`, {});
    return response.order;
  }

  async open(id: number): Promise<Order> {
    const response = await this.client.post<{ order: Order }>(`/orders/${id}/open.json`, {});
    return response.order;
  }

  async cancel(id: number, body?: Record<string, unknown>): Promise<Order> {
    const response = await this.client.post<{ order: Order }>(
      `/orders/${id}/cancel.json`,
      body ?? {}
    );
    return response.order;
  }

  async getTags(id: number): Promise<{ tags: string }> {
    return this.client.get<{ tags: string }>(`/orders/${id}/tags.json`);
  }

  async addTags(id: number, tags: string): Promise<{ tags: string }> {
    return this.client.post<{ tags: string }>(`/orders/${id}/tags.json`, { tags });
  }

  async removeTags(id: number, tags: string): Promise<{ tags: string }> {
    return this.client.deleteJson<{ tags: string }>(`/orders/${id}/tags.json`, { tags });
  }

  async assign(
    id: number,
    payload: {
      user_ids: number[];
      group_user_ids?: number[];
      location_id?: number;
    }
  ): Promise<Order> {
    const response = await this.client.post<{ order: Order }>(`/orders/${id}/assign.json`, payload);
    return response.order;
  }
}
