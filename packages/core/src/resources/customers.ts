import { HaravanClient } from "../client";
import { Customer } from "../types";

export class CustomersResource {
  constructor(private client: HaravanClient) {}

  async list(query?: { limit?: number; page?: number; created_at_min?: string; updated_at_min?: string }): Promise<Customer[]> {
    const response = await this.client.get<{ customers: Customer[] }>("/customers.json", query);
    return response.customers;
  }

  async get(id: number): Promise<Customer> {
    const response = await this.client.get<{ customer: Customer }>(`/customers/${id}.json`);
    return response.customer;
  }

  async search(query: string): Promise<Customer[]> {
    const response = await this.client.get<{ customers: Customer[] }>("/customers/search.json", { query });
    return response.customers;
  }

  async count(): Promise<number> {
    const response = await this.client.get<{ count: number }>("/customers/count.json");
    return response.count;
  }

  async create(customer: Partial<Customer>): Promise<Customer> {
    const response = await this.client.post<{ customer: Customer }>("/customers.json", { customer });
    return response.customer;
  }

  async update(id: number, customer: Partial<Customer>): Promise<Customer> {
    const response = await this.client.put<{ customer: Customer }>(`/customers/${id}.json`, { customer: { id, ...customer } });
    return response.customer;
  }
}
