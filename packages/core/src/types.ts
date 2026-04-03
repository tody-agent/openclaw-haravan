import { RetryConfig } from "./retry";

export interface HaravanConfig {
  shopDomain: string; // e.g. "my-store.myharavan.com"
  accessToken: string; // OAuth Access Token or Private Token
  retryConfig?: RetryConfig;
}

/** Thông tin shop từ GET /shop.json (trường tùy gói Haravan) */
export interface Shop {
  id?: number;
  name?: string;
  email?: string;
  domain?: string;
  currency?: string;
  timezone?: string;
  [key: string]: unknown;
}

/** Khuyến mãi — schema thực tế có thể khác; dùng cho promotion_health */
export interface Promotion {
  id: number;
  title?: string;
  name?: string;
  status?: string;
  starts_at?: string;
  ends_at?: string;
  usage_limit?: number;
  usage_count?: number;
  [key: string]: unknown;
}

export interface FetchOptions extends RequestInit {
  query?: Record<string, any>;
}

export interface HaravanErrorResponse {
  errors: any;
}

export interface Product {
  id: number;
  title: string;
  body_html: string;
  vendor: string;
  product_type: string;
  created_at: string;
  handle: string;
  updated_at: string;
  published_at?: string | null;
  published?: boolean;
  variants: Variant[];
  images: Image[];
  options: Option[];
  tags: string;
}

export interface Variant {
  id: number;
  product_id: number;
  title: string;
  price: number;
  sku: string;
  inventory_quantity: number;
  compare_at_price?: number;
  barcode?: string;
  inventory_item_id?: number;
  grams?: number;
}

export interface Image {
  id: number;
  product_id: number;
  src: string;
}

export interface Option {
  id: number;
  product_id: number;
  name: string;
  values: string[];
}

export interface Order {
  id: number;
  email: string;
  created_at: string;
  updated_at: string;
  number: number;
  order_number: string;
  total_price: number;
  subtotal_price: number;
  total_weight: number;
  total_tax: number;
  currency: string;
  financial_status: string;
  total_discounts: number;
  line_items: LineItem[];
  customer?: Customer;
  /** Kênh / nguồn đơn (Haravan / sàn) — có thể thiếu tùy API */
  source_name?: string;
  fulfillment_status?: string;
  cancel_reason?: string;
  cancelled_at?: string;
  closed_at?: string;
  gateway?: string;
  tags?: string;
  note?: string;
}

export interface LineItem {
  id: number;
  variant_id: number;
  title: string;
  quantity: number;
  price: number;
  sku: string;
}

export interface Customer {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  orders_count: number;
  total_spent: number;
  created_at: string;
  updated_at: string;
  tags: string;
  note: string;
  verified_email: boolean;
  state: string;
  addresses: CustomerAddress[];
  default_address?: CustomerAddress;
}

export interface CustomerAddress {
  id: number;
  customer_id: number;
  first_name: string;
  last_name: string;
  address1: string;
  address2: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone: string;
  default: boolean;
}

export interface Theme {
  id: number;
  name: string;
  role: 'main' | 'unpublished' | 'demo';
  created_at: string;
  updated_at: string;
  previewable: boolean;
  processing: boolean;
}

export interface Asset {
  key: string;
  public_url: string;
  created_at: string;
  updated_at: string;
  content_type: string;
  size: number;
  theme_id: number;
  value?: string;
  attachment?: string;
}

export interface Webhook {
  id: number;
  address: string;
  topic: string;
  created_at: string;
  updated_at: string;
  format: string;
  fields: string[];
}

export interface Fulfillment {
  id: number;
  order_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  tracking_company: string;
  tracking_number: string;
  tracking_url: string;
  line_items: LineItem[];
}

export interface InventoryLevel {
  inventory_item_id: number;
  location_id: number;
  available: number;
  updated_at: string;
}

export interface InventoryItem {
  id: number;
  sku: string;
  created_at: string;
  updated_at: string;
  tracked: boolean;
}

export interface AbandonedCheckout {
  id: number;
  token: string;
  cart_token: string;
  email: string;
  created_at: string;
  updated_at: string;
  completed_at: string | null;
  total_price: number;
  subtotal_price: number;
  currency: string;
  abandoned_checkout_url: string;
  line_items: LineItem[];
  customer?: Customer;
}

export interface Discount {
  id: number;
  price_rule_id: number;
  code: string;
  usage_count: number;
  created_at: string;
  updated_at: string;
}

/** Địa điểm / kho — GET /locations.json */
export interface Location {
  id: number;
  name?: string;
  address1?: string;
  address2?: string;
  city?: string;
  province?: string;
  country?: string;
  zip?: string;
  phone?: string;
  country_code?: string;
  province_code?: string;
  district?: string;
  ward?: string;
  is_primary?: boolean;
  created_at?: string;
  updated_at?: string;
  [key: string]: unknown;
}

/** Giao dịch thanh toán đơn — /orders/{id}/transactions.json */
export interface Transaction {
  id: number;
  order_id: number;
  amount?: number;
  kind?: string;
  status?: string;
  gateway?: string;
  currency?: string;
  created_at?: string;
  parent_id?: number | null;
  [key: string]: unknown;
}

/** Hoàn tiền — /orders/{id}/refunds.json */
export interface Refund {
  id: number;
  order_id: number;
  note?: string;
  restock?: boolean | null;
  created_at?: string;
  refund_line_items?: unknown[];
  transactions?: Transaction[];
  [key: string]: unknown;
}
