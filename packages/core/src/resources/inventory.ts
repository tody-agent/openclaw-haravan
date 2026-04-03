import { HaravanClient } from "../client";
import { InventoryLevel } from "../types";

export class InventoryResource {
  constructor(private client: HaravanClient) {}

  async list(query?: { inventory_item_ids?: string; location_ids?: string; limit?: number }): Promise<InventoryLevel[]> {
    const response = await this.client.get<{ inventory_levels: InventoryLevel[] }>("/inventory_levels.json", query);
    return response.inventory_levels;
  }

  async adjust(inventoryItemId: number, locationId: number, adjustment: number): Promise<InventoryLevel> {
    const response = await this.client.post<{ inventory_level: InventoryLevel }>("/inventory_levels/adjust.json", {
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available_adjustment: adjustment,
    });
    return response.inventory_level;
  }

  async set(inventoryItemId: number, locationId: number, available: number): Promise<InventoryLevel> {
    const response = await this.client.post<{ inventory_level: InventoryLevel }>("/inventory_levels/set.json", {
      inventory_item_id: inventoryItemId,
      location_id: locationId,
      available,
    });
    return response.inventory_level;
  }
}
