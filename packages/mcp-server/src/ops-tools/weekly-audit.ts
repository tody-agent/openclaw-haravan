import type { Haravan } from "@haravan-master/core";
import { runOrderSlaAndFulfillmentRisks } from "./order-sla-fulfillment";
import { runFindLowStockRisks } from "./low-stock";
import { runPromotionHealth } from "./promotion-health";
import { runProductComplianceScan } from "./product-compliance";

export interface WeeklyAuditArgs {
  limit?: number;
}

export async function runWeeklyOpsAudit(haravan: Haravan, args: WeeklyAuditArgs) {
  const limit = args.limit ?? 200;

  let shop: unknown = null;
  try {
    shop = await haravan.shop.get();
  } catch {
    shop = { error: "shop.json unavailable" };
  }

  const [sla, stock, promo] = await Promise.all([
    runOrderSlaAndFulfillmentRisks(haravan, { limit }),
    runFindLowStockRisks(haravan, { threshold: 5, product_pages: 2 }),
    runPromotionHealth(haravan, { limit: 50 }),
  ]);

  let compliance: Awaited<ReturnType<typeof runProductComplianceScan>> | { error: string };
  try {
    compliance = await runProductComplianceScan(haravan, {
      product_pages: 2,
      limit_per_page: 50,
    });
  } catch (e: unknown) {
    compliance = {
      error: e instanceof Error ? e.message : String(e),
    };
  }

  return {
    generated_at: new Date().toISOString(),
    shop_snapshot: shop,
    sla_and_fulfillment: sla.summary,
    inventory: stock.summary,
    promotions: promo,
    compliance: "summary" in compliance ? compliance.summary : compliance,
    health_score_hint: {
      sla_critical: sla.summary.sla_critical_count,
      negative_stock: stock.summary.negative_stock_variants,
      compliance_issues:
        "summary" in compliance ? compliance.summary.total_issue_rows : null,
    },
    note: "Điểm sức khỏe là chỉ báo nội bộ, không phải điểm sàn TMĐT.",
  };
}
