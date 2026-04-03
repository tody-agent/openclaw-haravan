import { HaravanClient } from "../client";
import { Fulfillment } from "../types";

export class FulfillmentsResource {
  constructor(private client: HaravanClient) {}

  async list(orderId: number): Promise<Fulfillment[]> {
    const response = await this.client.get<{ fulfillments: Fulfillment[] }>(`/orders/${orderId}/fulfillments.json`);
    return response.fulfillments;
  }

  async get(orderId: number, fulfillmentId: number): Promise<Fulfillment> {
    const response = await this.client.get<{ fulfillment: Fulfillment }>(`/orders/${orderId}/fulfillments/${fulfillmentId}.json`);
    return response.fulfillment;
  }

  async create(orderId: number, fulfillment: { tracking_number?: string; tracking_company?: string; tracking_url?: string; line_items?: { id: number }[] }): Promise<Fulfillment> {
    const response = await this.client.post<{ fulfillment: Fulfillment }>(`/orders/${orderId}/fulfillments.json`, { fulfillment });
    return response.fulfillment;
  }

  async update(orderId: number, fulfillmentId: number, fulfillment: Partial<Fulfillment>): Promise<Fulfillment> {
    const response = await this.client.put<{ fulfillment: Fulfillment }>(`/orders/${orderId}/fulfillments/${fulfillmentId}.json`, { fulfillment: { id: fulfillmentId, ...fulfillment } });
    return response.fulfillment;
  }
}
