import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Haravan } from '../src/index';

describe('API Resources Unit & Mutation Simulation', () => {
  const client = new Haravan({ shopDomain: 'test', accessToken: 'token' });
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn().mockImplementation(async () => {
      return {
        status: 200,
        ok: true,
        json: async () => ({ product: { id: 777, title: 'Mocked Item', tags: 'MockTag' }, order: { id: 888, email: 'mock@domain.com' } })
      };
    });
    globalThis.fetch = fetchMock;
  });

  describe('ProductsResource Mutations', () => {
    it('creates a product with proper POST payload wrapper', async () => {
      await client.products.create({ title: 'Mock Shirt' });
      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, options] = fetchMock.mock.calls[0];
      
      expect(url).toContain('/products.json');
      expect(options.method).toBe('POST');
      
      const bodyStr = options.body as string;
      const parsed = JSON.parse(bodyStr);
      // Validating the internal `product` wrapper sent to Haravan API
      expect(parsed.product).toBeDefined();
      expect(parsed.product.title).toBe('Mock Shirt');
    });

    it('updates a product with proper PUT payload & URL', async () => {
      await client.products.update(777, { tags: 'Sale' });
      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, options] = fetchMock.mock.calls[0];
      
      expect(url).toContain('/products/777.json');
      expect(options.method).toBe('PUT');
      
      const bodyStr = options.body as string;
      const parsed = JSON.parse(bodyStr);
      expect(parsed.product).toBeDefined();
      expect(parsed.product.id).toBe(777); // Haravan requirement: include id in payload
      expect(parsed.product.tags).toBe('Sale');
    });

    it('deletes a product sending DELETE to proper URL without body', async () => {
      await client.products.delete(777);
      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, options] = fetchMock.mock.calls[0];
      
      expect(url).toContain('/products/777.json');
      expect(options.method).toBe('DELETE');
      expect(options.body).toBeUndefined(); // DELETE should have no body
    });
  });

  describe('OrdersResource Mutations', () => {
    it('creates an order with POST payload wrapper', async () => {
      await client.orders.create({ email: 'test@domain.com' });
      
      expect(fetchMock).toHaveBeenCalledTimes(1);
      const [url, options] = fetchMock.mock.calls[0];
      
      expect(url).toContain('/orders.json');
      expect(options.method).toBe('POST');
      
      const bodyStr = options.body as string;
      const parsed = JSON.parse(bodyStr);
      expect(parsed.order).toBeDefined();
      expect(parsed.order.email).toBe('test@domain.com');
    });
  });
});
