import { describe, it, expect, beforeAll } from 'vitest';
import { HaravanClient } from '../src/client';
import * as dotenv from 'dotenv';
import path from 'path';

// Nạp `.env` từ gốc dự án nếu chạy offline (không phải CI runner tiêm sẵn)
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });

const HAS_TOKEN = !!process.env.HARAVAN_TOKEN && !!process.env.HARAVAN_SHOP;

// Mô-đun test e2e sẽ tự động bị bỏ qua nếu không phát hiện thấy môi trường .env (Để bảo đảm CI trống vẫn pass được Gate)
describe.runIf(HAS_TOKEN)('Live E2E Integration: Haravan API', () => {
    let client: HaravanClient;

    beforeAll(() => {
        client = new HaravanClient({
            shopDomain: process.env.HARAVAN_SHOP!,
            accessToken: process.env.HARAVAN_TOKEN!
        });
    });

    it('successfully fetches a list of products from the live shop', async () => {
        // Test query with limit = 1 to just verify the connection and format
        const products: any = await client.get('/products.json', { limit: 1 });
        
        expect(products).toBeDefined();
        // Haravan trả về mảng "products" ở JSON gốc:
        expect(Array.isArray(products.products)).toBe(true);
        expect(products.products.length).toBeLessThanOrEqual(1);
    });

    it('successfully fetches a list of orders from the live shop', async () => {
        const orders: any = await client.get('/orders.json', { limit: 1 });
        
        expect(orders).toBeDefined();
        // Haravan trả về mảng "orders" ở JSON gốc:
        expect(Array.isArray(orders.orders)).toBe(true);
        expect(orders.orders.length).toBeLessThanOrEqual(1);
    });
});
