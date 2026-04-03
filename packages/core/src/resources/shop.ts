import { HaravanClient } from "../client";
import { Shop } from "../types";

export class ShopResource {
  constructor(private client: HaravanClient) {}

  async get(): Promise<Shop> {
    const response = await this.client.get<{ shop: Shop }>("/shop.json");
    return response.shop;
  }
}
