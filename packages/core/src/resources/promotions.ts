import { HaravanClient } from "../client";
import { Promotion } from "../types";

export class PromotionsResource {
  constructor(private client: HaravanClient) {}

  async list(query?: { limit?: number; page?: number; status?: string }): Promise<Promotion[]> {
    const response = await this.client.get<{
      promotions?: Promotion[];
      discounts?: Promotion[];
    }>("/promotions.json", query);
    return response.promotions ?? response.discounts ?? [];
  }

  async get(id: number): Promise<Promotion> {
    const response = await this.client.get<{ promotion: Promotion }>(`/promotions/${id}.json`);
    return response.promotion;
  }
}
