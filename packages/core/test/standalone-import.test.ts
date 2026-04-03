import { describe, it, expect } from "vitest";
import { Haravan, HaravanClient, WEB_BASE_URL } from "../src/index";

describe("Standalone Core Package", () => {
  it("exports Haravan class", () => {
    expect(Haravan).toBeDefined();
    expect(typeof Haravan).toBe("function");
  });

  it("exports HaravanClient class", () => {
    expect(HaravanClient).toBeDefined();
    expect(typeof HaravanClient).toBe("function");
  });

  it("exports WEB_BASE_URL constant", () => {
    expect(WEB_BASE_URL).toBe("https://apis.haravan.com/web");
  });

  it("exports all resource type interfaces (compile check)", async () => {
    const mod = await import("../src/types");
    expect(mod).toBeDefined();
  });

  it("creates Haravan instance with all 10 resources", () => {
    const instance = new Haravan({
      shopDomain: "test.myharavan.com",
      accessToken: "test-token",
    });
    expect(instance.products).toBeDefined();
    expect(instance.orders).toBeDefined();
    expect(instance.customers).toBeDefined();
    expect(instance.themes).toBeDefined();
    expect(instance.assets).toBeDefined();
    expect(instance.webhooks).toBeDefined();
    expect(instance.fulfillments).toBeDefined();
    expect(instance.inventory).toBeDefined();
    expect(instance.shop).toBeDefined();
    expect(instance.promotions).toBeDefined();
  });

  it("throws when missing config", () => {
    expect(() => new Haravan({ shopDomain: "", accessToken: "" })).toThrow(
      "Missing shopDomain or accessToken"
    );
  });
});
