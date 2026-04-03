import { HaravanConfig, FetchOptions } from "./types";
import { RetryStrategy } from "./retry";
import { HaravanApiError } from "./errors";

const DEFAULT_BASE_URL = "https://apis.haravan.com/com";
const WEB_BASE_URL = "https://apis.haravan.com/web";

export { WEB_BASE_URL };

/**
 * Low-level HTTP client for the Haravan REST API.
 *
 * Handles authentication, query-string building, and automatic
 * retry with exponential back-off on 429 (rate-limit) responses.
 */
export class HaravanClient {
  private config: HaravanConfig;
  private baseUrl: string;
  private retryStrategy: RetryStrategy;

  constructor(config: HaravanConfig, baseUrlOverride?: string) {
    if (!config.shopDomain || !config.accessToken) {
      throw new Error("Missing shopDomain or accessToken for Haravan Client");
    }
    this.config = config;
    this.baseUrl = baseUrlOverride || DEFAULT_BASE_URL;
    this.retryStrategy = new RetryStrategy(config.retryConfig);
  }

  /** Create a new client clone pointing to a different base URL. */
  withBaseUrl(baseUrl: string): HaravanClient {
    return new HaravanClient(this.config, baseUrl);
  }

  private async request<T>(endpoint: string, options: FetchOptions = {}): Promise<T> {
    const { query, ...fetchOpts } = options;
    const url = this.buildUrl(endpoint, query);
    const headers = this.buildHeaders(fetchOpts.headers);

    let attempt = 0;
    while (this.retryStrategy.canRetry(attempt)) {
      const response = await fetch(url, { ...fetchOpts, headers });

      if (response.status === 429) {
        const retryAfter = response.headers.get("Retry-After");
        const retryAfterSeconds = retryAfter ? parseInt(retryAfter, 10) : undefined;
        const delay = this.retryStrategy.getDelay(attempt, retryAfterSeconds);
        console.warn(`[Haravan] Rate limit hit. Retrying in ${delay}ms...`);
        await this.sleep(delay);
        attempt++;
        continue;
      }

      if (!response.ok) {
        let errorBody: string | undefined;
        try { errorBody = await response.text(); } catch {}
        throw new HaravanApiError(response.status, response.statusText, errorBody);
      }

      return (await response.json()) as T;
    }

    throw new HaravanApiError(429, "Max retries exceeded due to rate limiting");
  }

  private buildUrl(endpoint: string, query?: Record<string, any>): string {
    let url = `${this.baseUrl}${endpoint.startsWith("/") ? endpoint : `/${endpoint}`}`;
    if (query) {
      const params = new URLSearchParams();
      for (const [key, value] of Object.entries(query)) {
        if (value !== undefined && value !== null) params.append(key, String(value));
      }
      const qs = params.toString();
      if (qs) url += `?${qs}`;
    }
    return url;
  }

  private buildHeaders(existingHeaders?: RequestInit["headers"]): Headers {
    const headers = new Headers(existingHeaders as Record<string, string> | undefined);
    headers.set("Authorization", `Bearer ${this.config.accessToken}`);
    headers.set("Content-Type", "application/json");
    return headers;
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  /** Send a GET request. */
  async get<T>(endpoint: string, query?: Record<string, any>) {
    return this.request<T>(endpoint, { method: "GET", query });
  }

  /** Send a POST request with a JSON body. */
  async post<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: "POST", body: JSON.stringify(body) });
  }

  /** Send a PUT request with a JSON body. */
  async put<T>(endpoint: string, body: any) {
    return this.request<T>(endpoint, { method: "PUT", body: JSON.stringify(body) });
  }

  /** Send a DELETE request. Optional JSON body (Haravan dùng cho xóa tags đơn/sản phẩm). */
  async delete(endpoint: string, body?: unknown) {
    return this.request<void>(endpoint, {
      method: "DELETE",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  }

  /** DELETE có body và phản hồi JSON (vd. orders/{id}/tags.json). */
  async deleteJson<T>(endpoint: string, body?: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: "DELETE",
      ...(body !== undefined ? { body: JSON.stringify(body) } : {}),
    });
  }
}
