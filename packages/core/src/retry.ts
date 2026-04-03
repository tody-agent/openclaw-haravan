export interface RetryConfig {
  maxRetries?: number;
  initialDelayMs?: number;
  backoffMultiplier?: number;
}

const DEFAULTS: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelayMs: 1000,
  backoffMultiplier: 2,
};

/**
 * Encapsulates exponential-backoff retry logic for HTTP requests.
 *
 * Accepts an optional {@link RetryConfig}; any omitted field falls back to
 * sensible defaults (3 retries, 1 s initial delay, 2x multiplier).
 */
export class RetryStrategy {
  readonly maxRetries: number;
  readonly initialDelayMs: number;
  readonly backoffMultiplier: number;

  constructor(config?: RetryConfig) {
    this.maxRetries = config?.maxRetries ?? DEFAULTS.maxRetries;
    this.initialDelayMs = config?.initialDelayMs ?? DEFAULTS.initialDelayMs;
    this.backoffMultiplier = config?.backoffMultiplier ?? DEFAULTS.backoffMultiplier;
  }

  /** Returns `true` when the given zero-based attempt index has not exceeded the limit. */
  canRetry(attempt: number): boolean {
    return attempt < this.maxRetries;
  }

  /**
   * Calculates the delay before the next retry (in milliseconds).
   *
   * If `retryAfterSeconds` is supplied (e.g. from a `Retry-After` header) it
   * takes priority over the exponential-backoff calculation.
   */
  getDelay(attempt: number, retryAfterSeconds?: number): number {
    if (retryAfterSeconds !== undefined) {
      return retryAfterSeconds * 1000;
    }
    return this.initialDelayMs * Math.pow(this.backoffMultiplier, attempt);
  }
}
