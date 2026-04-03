import { HaravanClient } from "../client";

/**
 * Cửa ngõ gọi endpoint dưới `https://apis.haravan.com/web` (theme, asset, …).
 */
export class WebRestResource {
  constructor(private client: HaravanClient) {}

  async get<T = unknown>(path: string, query?: Record<string, unknown>): Promise<T> {
    return this.client.get<T>(path, query);
  }

  async post<T = unknown>(path: string, body: unknown): Promise<T> {
    return this.client.post<T>(path, body);
  }

  async put<T = unknown>(path: string, body: unknown): Promise<T> {
    return this.client.put<T>(path, body);
  }

  async delete(path: string, body?: unknown): Promise<void> {
    return this.client.delete(path, body);
  }

  async deleteJson<T = unknown>(path: string, body?: unknown): Promise<T> {
    return this.client.deleteJson<T>(path, body);
  }
}
