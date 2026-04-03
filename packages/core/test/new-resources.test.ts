import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Haravan } from '../src/index';

describe('New API Resources — Unit & Mutation Tests', () => {
  const client = new Haravan({ shopDomain: 'test', accessToken: 'token' });
  let fetchMock: any;

  beforeEach(() => {
    fetchMock = vi.fn().mockImplementation(async (url: string, options?: { method?: string; body?: string }) => {
      const method = options?.method ?? 'GET';
      return {
        status: 200,
        ok: true,
        json: async () => {
          if (url.includes('/customers/count')) return { count: 42 };
          if (url.includes('/customers/search')) return { customers: [{ id: 1, email: 'found@test.com' }] };
          if (url.includes('/customers')) return { customers: [{ id: 1 }], customer: { id: 1, email: 'test@test.com' } };
          if (url.includes('/themes') && url.includes('/assets')) return { assets: [{ key: 'layout/theme.liquid' }], asset: { key: 'layout/theme.liquid', value: '<html>' } };
          if (url.includes('/themes')) return { themes: [{ id: 100, name: 'Main' }], theme: { id: 100, name: 'Main' } };
          if (url.includes('/webhooks')) return { webhooks: [{ id: 1, topic: 'orders/create' }], webhook: { id: 1, topic: 'orders/create', address: 'https://cb.test' } };
          if (url.includes('/fulfillments')) return { fulfillments: [{ id: 1 }], fulfillment: { id: 1, tracking_number: 'TRK123' } };
          if (url.includes('/inventory_levels')) return { inventory_levels: [{ inventory_item_id: 1 }], inventory_level: { inventory_item_id: 1, available: 10 } };
          if (url.includes('/locations.json')) return { locations: [{ id: 1, name: 'Kho mặc định' }] };
          if (url.match(/\/locations\/\d+\.json/)) return { location: { id: 991324, name: 'Kho mặc định' } };
          if (url.includes('/transactions')) {
            if (method === 'POST' && url.endsWith('/transactions.json')) return { transaction: { id: 2, kind: 'Capture' } };
            if (method === 'GET' && /\/transactions\/\d+\.json/.test(url)) return { transaction: { id: 1, order_id: 9 } };
            if (method === 'GET' && url.endsWith('/transactions.json')) return { transactions: [{ id: 1, order_id: 9, kind: 'pending' }] };
          }
          if (url.includes('/refunds')) {
            if (method === 'POST' && url.endsWith('/refunds.json')) return { refund: { id: 102, note: 'ok' } };
            if (method === 'GET' && /\/refunds\/\d+\.json$/.test(url)) return { refund: { id: 101, order_id: 9 } };
            if (method === 'GET' && url.endsWith('/refunds.json')) return { refunds: [{ id: 101, order_id: 9 }] };
          }
          if (url.includes('/orders/') && url.includes('/close.json')) return { order: { id: 9, closed_at: 'x' } };
          if (url.includes('/orders/') && url.includes('/tags.json') && method === 'GET') return { tags: 'VIP,a1' };
          if (url.includes('/orders/') && url.includes('/tags.json') && method === 'POST') return { tags: 'VIP,a1,a2' };
          if (url.includes('/orders/') && url.includes('/tags.json') && method === 'DELETE') return { tags: 'VIP' };
          if (url.includes('/products/count')) return { count: 120 };
          if (url.includes('/products/') && url.includes('/tags.json') && method === 'POST') return { tags: 'sale,new' };
          if (url.includes('/products/') && url.includes('/tags.json') && method === 'DELETE') return { tags: 'sale' };
          if (url.includes('/custom_collections.json')) return { custom_collections: [] };
          return {};
        },
      };
    });
    globalThis.fetch = fetchMock;
  });

  // --- Customers ---
  describe('CustomersResource', () => {
    it('lists customers with GET', async () => {
      await client.customers.list({ limit: 5 });
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/customers.json');
      expect(options.method).toBe('GET');
    });

    it('searches customers by query string', async () => {
      const result = await client.customers.search('test@test.com');
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/customers/search.json');
      expect(url).toContain('query=');
      expect(result).toEqual([{ id: 1, email: 'found@test.com' }]);
    });

    it('counts customers', async () => {
      const count = await client.customers.count();
      expect(count).toBe(42);
    });

    it('creates a customer with POST payload wrapper', async () => {
      await client.customers.create({ email: 'new@test.com', first_name: 'Test' });
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/customers.json');
      expect(options.method).toBe('POST');
      const parsed = JSON.parse(options.body);
      expect(parsed.customer).toBeDefined();
      expect(parsed.customer.email).toBe('new@test.com');
    });

    it('updates a customer with PUT', async () => {
      await client.customers.update(1, { tags: 'VIP' });
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/customers/1.json');
      expect(options.method).toBe('PUT');
      const parsed = JSON.parse(options.body);
      expect(parsed.customer.id).toBe(1);
      expect(parsed.customer.tags).toBe('VIP');
    });
  });

  // --- Themes ---
  describe('ThemesResource', () => {
    it('lists themes with GET via /web base URL', async () => {
      await client.themes.list();
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/themes.json');
      expect(url).toContain('apis.haravan.com/web');
      expect(options.method).toBe('GET');
    });

    it('gets a specific theme', async () => {
      const theme = await client.themes.get(100);
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/themes/100.json');
      expect(theme.name).toBe('Main');
    });

    it('creates a theme with POST', async () => {
      await client.themes.create({ name: 'New Theme' });
      const [, options] = fetchMock.mock.calls[0];
      expect(options.method).toBe('POST');
      const parsed = JSON.parse(options.body);
      expect(parsed.theme.name).toBe('New Theme');
    });

    it('deletes a theme with DELETE', async () => {
      await client.themes.delete(100);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/themes/100.json');
      expect(options.method).toBe('DELETE');
    });
  });

  // --- Assets ---
  describe('AssetsResource', () => {
    it('lists assets for a theme', async () => {
      const assets = await client.assets.list(100);
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/themes/100/assets.json');
      expect(assets[0].key).toBe('layout/theme.liquid');
    });

    it('gets a specific asset by key', async () => {
      const asset = await client.assets.get(100, 'layout/theme.liquid');
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('asset%5Bkey%5D=layout%2Ftheme.liquid');
      expect(asset.value).toBe('<html>');
    });

    it('puts (creates/updates) an asset', async () => {
      await client.assets.put(100, { key: 'templates/index.liquid', value: '<h1>Hi</h1>' });
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/themes/100/assets.json');
      expect(options.method).toBe('PUT');
      const parsed = JSON.parse(options.body);
      expect(parsed.asset.key).toBe('templates/index.liquid');
    });
  });

  // --- Webhooks ---
  describe('WebhooksResource', () => {
    it('lists webhooks', async () => {
      const webhooks = await client.webhooks.list();
      expect(webhooks[0].topic).toBe('orders/create');
    });

    it('creates a webhook with POST', async () => {
      await client.webhooks.create({ topic: 'products/update', address: 'https://example.com/hook' });
      const [, options] = fetchMock.mock.calls[0];
      expect(options.method).toBe('POST');
      const parsed = JSON.parse(options.body);
      expect(parsed.webhook.topic).toBe('products/update');
    });

    it('deletes a webhook', async () => {
      await client.webhooks.delete(1);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/webhooks/1.json');
      expect(options.method).toBe('DELETE');
    });
  });

  // --- Fulfillments ---
  describe('FulfillmentsResource', () => {
    it('lists fulfillments for an order', async () => {
      await client.fulfillments.list(999);
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/orders/999/fulfillments.json');
    });

    it('creates a fulfillment with tracking info', async () => {
      await client.fulfillments.create(999, { tracking_number: 'TRK456', tracking_company: 'GHN' });
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/orders/999/fulfillments.json');
      expect(options.method).toBe('POST');
      const parsed = JSON.parse(options.body);
      expect(parsed.fulfillment.tracking_number).toBe('TRK456');
    });
  });

  // --- Inventory ---
  describe('InventoryResource', () => {
    it('lists inventory levels', async () => {
      await client.inventory.list({ inventory_item_ids: '1,2,3' });
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/inventory_levels.json');
    });

    it('adjusts inventory with POST', async () => {
      await client.inventory.adjust(1, 100, -5);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/inventory_levels/adjust.json');
      expect(options.method).toBe('POST');
      const parsed = JSON.parse(options.body);
      expect(parsed.inventory_item_id).toBe(1);
      expect(parsed.available_adjustment).toBe(-5);
    });

    it('sets inventory with POST', async () => {
      await client.inventory.set(1, 100, 50);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/inventory_levels/set.json');
      const parsed = JSON.parse(options.body);
      expect(parsed.available).toBe(50);
    });
  });

  describe('LocationsResource', () => {
    it('lists locations', async () => {
      const rows = await client.locations.list();
      expect(rows[0].id).toBe(1);
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/locations.json');
      expect(url).toContain('apis.haravan.com/com');
    });

    it('gets one location', async () => {
      const loc = await client.locations.get(991324);
      expect(loc.name).toBe('Kho mặc định');
    });
  });

  describe('OrdersResource — extended', () => {
    it('lists transactions for an order', async () => {
      const txs = await client.orders.transactions.list(9);
      expect(txs[0].kind).toBe('pending');
    });

    it('creates a transaction', async () => {
      await client.orders.transactions.create(9, { amount: 100000, kind: 'Capture' });
      const [, options] = fetchMock.mock.calls[0];
      expect(JSON.parse(options.body).transaction.kind).toBe('Capture');
    });

    it('lists refunds', async () => {
      const r = await client.orders.refunds.list(9);
      expect(r[0].id).toBe(101);
    });

    it('closes an order', async () => {
      await client.orders.close(9);
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/orders/9/close.json');
      expect(options.method).toBe('POST');
    });

    it('adds order tags', async () => {
      const out = await client.orders.addTags(9, 'a1,a2');
      expect(out.tags).toContain('a2');
    });
  });

  describe('ProductsResource — count & tags', () => {
    it('counts products', async () => {
      const n = await client.products.count();
      expect(n).toBe(120);
    });

    it('adds product tags', async () => {
      await client.products.addTags(5, 'sale');
      const [url, options] = fetchMock.mock.calls[0];
      expect(url).toContain('/products/5/tags.json');
      expect(options.method).toBe('POST');
    });
  });

  describe('ComRestResource', () => {
    it('GET arbitrary com path', async () => {
      const data = await client.com.get<{ custom_collections: unknown[] }>('/custom_collections.json');
      expect(data.custom_collections).toEqual([]);
      const [url] = fetchMock.mock.calls[0];
      expect(url).toContain('/custom_collections.json');
      expect(url).toContain('apis.haravan.com/com');
    });
  });
});
