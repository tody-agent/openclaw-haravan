import { HaravanClient } from "../client";
import { Theme } from "../types";

export class ThemesResource {
  constructor(private client: HaravanClient) {}

  async list(): Promise<Theme[]> {
    const response = await this.client.get<{ themes: Theme[] }>("/themes.json");
    return response.themes;
  }

  async get(id: number): Promise<Theme> {
    const response = await this.client.get<{ theme: Theme }>(`/themes/${id}.json`);
    return response.theme;
  }

  async create(theme: Partial<Theme>): Promise<Theme> {
    const response = await this.client.post<{ theme: Theme }>("/themes.json", { theme });
    return response.theme;
  }

  async update(id: number, theme: Partial<Theme>): Promise<Theme> {
    const response = await this.client.put<{ theme: Theme }>(`/themes/${id}.json`, { theme });
    return response.theme;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/themes/${id}.json`);
  }
}
