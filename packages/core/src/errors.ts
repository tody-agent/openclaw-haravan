/**
 * Structured error thrown when the Haravan API returns a non-2xx response.
 *
 * Carries the HTTP status code, status text, and (when available) the raw
 * response body so callers can inspect or log the full server response.
 */
export class HaravanApiError extends Error {
  readonly statusCode: number;
  readonly statusText: string;
  readonly body?: string;

  constructor(statusCode: number, statusText: string, body?: string) {
    super(`Haravan API Error: ${statusCode} ${statusText}${body ? ` - ${body}` : ""}`);
    this.name = "HaravanApiError";
    this.statusCode = statusCode;
    this.statusText = statusText;
    this.body = body;
  }
}

/**
 * Thrown specifically for HTTP 429 (Too Many Requests) responses.
 *
 * Extends {@link HaravanApiError} and optionally carries the server-provided
 * `Retry-After` value so callers can honour the back-off window.
 */
export class HaravanRateLimitError extends HaravanApiError {
  readonly retryAfterSeconds?: number;

  constructor(retryAfterSeconds?: number) {
    super(429, "Too Many Requests");
    this.name = "HaravanRateLimitError";
    this.retryAfterSeconds = retryAfterSeconds;
  }
}
