import { HaravanClient } from "../client";
import { Webhook } from "../types";

export class WebhooksResource {
  constructor(private client: HaravanClient) {}

  async list(query?: { topic?: string; limit?: number }): Promise<Webhook[]> {
    const response = await this.client.get<{ webhooks: Webhook[] }>("/webhooks.json", query);
    return response.webhooks;
  }

  async get(id: number): Promise<Webhook> {
    const response = await this.client.get<{ webhook: Webhook }>(`/webhooks/${id}.json`);
    return response.webhook;
  }

  async create(webhook: { topic: string; address: string; format?: string }): Promise<Webhook> {
    const response = await this.client.post<{ webhook: Webhook }>("/webhooks.json", { webhook });
    return response.webhook;
  }

  async update(id: number, webhook: Partial<Webhook>): Promise<Webhook> {
    const response = await this.client.put<{ webhook: Webhook }>(`/webhooks/${id}.json`, { webhook: { id, ...webhook } });
    return response.webhook;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/webhooks/${id}.json`);
  }
}
