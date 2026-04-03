import { HaravanClient } from "../client";

/**
 * Cửa ngõ gọi bất kỳ endpoint Admin API dưới `https://apis.haravan.com/com`.
 * Dùng khi resource typed chưa có sẵn; path phải bắt đầu bằng `/` (vd: `/custom_collections.json`).
 */
export class ComRestResource {
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
