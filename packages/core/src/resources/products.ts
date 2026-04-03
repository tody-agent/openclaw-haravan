import { HaravanClient } from "../client";
import { Product } from "../types";

export class ProductsResource {
  constructor(private client: HaravanClient) {}

  async list(query?: {
    limit?: number;
    page?: number;
    vendor?: string;
    product_type?: string;
    created_at_min?: string;
    updated_at_min?: string;
    updated_at_max?: string;
    ids?: string;
    fields?: string;
  }): Promise<Product[]> {
    const response = await this.client.get<{ products: Product[] }>("/products.json", query);
    return response.products;
  }

  async count(query?: {
    vendor?: string;
    product_type?: string;
    created_at_min?: string;
    updated_at_min?: string;
    updated_at_max?: string;
  }): Promise<number> {
    const response = await this.client.get<{ count: number }>("/products/count.json", query);
    return response.count;
  }

  async get(id: number): Promise<Product> {
    const response = await this.client.get<{ product: Product }>(`/products/${id}.json`);
    return response.product;
  }

  async create(product: Partial<Product>): Promise<Product> {
    const response = await this.client.post<{ product: Product }>("/products.json", { product });
    return response.product;
  }

  async update(id: number, product: Partial<Product>): Promise<Product> {
    const response = await this.client.put<{ product: Product }>(`/products/${id}.json`, { product: { id, ...product } });
    return response.product;
  }

  async delete(id: number): Promise<void> {
    await this.client.delete(`/products/${id}.json`);
  }

  async addTags(id: number, tags: string): Promise<{ tags: string }> {
    return this.client.post<{ tags: string }>(`/products/${id}/tags.json`, { tags });
  }

  async removeTags(id: number, tags: string): Promise<{ tags: string }> {
    return this.client.deleteJson<{ tags: string }>(`/products/${id}/tags.json`, { tags });
  }
}
