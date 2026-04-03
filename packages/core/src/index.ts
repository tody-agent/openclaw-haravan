import { HaravanClient, WEB_BASE_URL } from "./client";
import { ProductsResource } from "./resources/products";
import { OrdersResource } from "./resources/orders";
import { CustomersResource } from "./resources/customers";
import { ThemesResource } from "./resources/themes";
import { AssetsResource } from "./resources/assets";
import { WebhooksResource } from "./resources/webhooks";
import { FulfillmentsResource } from "./resources/fulfillments";
import { InventoryResource } from "./resources/inventory";
import { ShopResource } from "./resources/shop";
import { PromotionsResource } from "./resources/promotions";
import { HaravanConfig } from "./types";

export * from "./types";
export * from "./client";
export * from "./retry";
export * from "./errors";

/**
 * High-level facade for the Haravan REST API.
 *
 * Instantiate with a {@link HaravanConfig} to get typed access to every
 * resource (products, orders, customers, …) through dedicated sub-objects.
 */
export class Haravan {
  public products: ProductsResource;
  public orders: OrdersResource;
  public customers: CustomersResource;
  public themes: ThemesResource;
  public assets: AssetsResource;
  public webhooks: WebhooksResource;
  public fulfillments: FulfillmentsResource;
  public inventory: InventoryResource;
  public shop: ShopResource;
  public promotions: PromotionsResource;

  constructor(config: HaravanConfig) {
    const client = new HaravanClient(config);
    const webClient = client.withBaseUrl(WEB_BASE_URL);

    this.products = new ProductsResource(client);
    this.orders = new OrdersResource(client);
    this.customers = new CustomersResource(client);
    this.themes = new ThemesResource(webClient);
    this.assets = new AssetsResource(webClient);
    this.webhooks = new WebhooksResource(client);
    this.fulfillments = new FulfillmentsResource(client);
    this.inventory = new InventoryResource(client);
    this.shop = new ShopResource(client);
    this.promotions = new PromotionsResource(client);
  }
}

