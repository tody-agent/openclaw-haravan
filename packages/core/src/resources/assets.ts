import { HaravanClient } from "../client";
import { Asset } from "../types";

export class AssetsResource {
  constructor(private client: HaravanClient) {}

  async list(themeId: number): Promise<Asset[]> {
    const response = await this.client.get<{ assets: Asset[] }>(`/themes/${themeId}/assets.json`);
    return response.assets;
  }

  async get(themeId: number, key: string): Promise<Asset> {
    const response = await this.client.get<{ asset: Asset }>(`/themes/${themeId}/assets.json`, { "asset[key]": key });
    return response.asset;
  }

  async put(themeId: number, asset: { key: string; value?: string; attachment?: string }): Promise<Asset> {
    const response = await this.client.put<{ asset: Asset }>(`/themes/${themeId}/assets.json`, { asset });
    return response.asset;
  }

  async delete(themeId: number, key: string): Promise<void> {
    await this.client.delete(`/themes/${themeId}/assets.json?asset[key]=${encodeURIComponent(key)}`);
  }
}
