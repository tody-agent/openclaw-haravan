import { describe, it, expect, vi, beforeEach } from 'vitest';
import { HaravanClient } from '../src/client';

describe('HaravanClient API Tests', () => {
  const mockConfig = { shopDomain: 'demo', accessToken: 'token' };

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  it('throws initialization error if config is empty', () => {
    expect(() => new HaravanClient({ shopDomain: '', accessToken: '' })).toThrowError(/Missing/);
  });

  it('retries when rate limited (429)', async () => {
    // Mock the global fetch
    let callCount = 0;
    global.fetch = vi.fn().mockImplementation(async () => {
      callCount++;
      if (callCount === 1) {
        return {
          status: 429,
          ok: false,
          headers: new Headers({ 'Retry-After': '0' })
        };
      }
      return {
        status: 200,
        ok: true,
        json: async () => ({ products: [] })
      };
    });

    const client = new HaravanClient(mockConfig);
    const result = await client.get('/products.json');
    
    expect(callCount).toBe(2);
    expect(result).toEqual({ products: [] });
  });

  it('throws informative error on API failure', async () => {
    global.fetch = vi.fn().mockImplementation(async () => {
      return {
        status: 404,
        statusText: 'Not Found',
        ok: false,
        text: async () => 'Endpoint invalid'
      };
    });

    const client = new HaravanClient(mockConfig);
    await expect(client.get('/invalid.json')).rejects.toThrowError('Haravan API Error: 404 Not Found - Endpoint invalid');
  });
});
