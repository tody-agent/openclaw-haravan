import type { Haravan } from "@haravan-master/core";
import { runDailyBusinessSnapshot } from "./tools/daily-business-snapshot";
import { runOrderSlaAndFulfillmentRisks } from "./ops-tools/order-sla-fulfillment";
import {
  runFindUnfulfilledOrders,
  runFindOrdersNeedingAttention,
} from "./ops-tools/orders-attention";
import { runFindLowStockRisks } from "./ops-tools/low-stock";
import { runInventoryOversellAndAnomalies } from "./ops-tools/inventory-anomalies";
import { runPricingAnomalyScan } from "./ops-tools/pricing-anomaly";
import { runProductComplianceScan } from "./ops-tools/product-compliance";
import { runTaxComplianceSnapshot } from "./ops-tools/tax-snapshot";
import { runEndOfDayReconciliation } from "./ops-tools/end-of-day";
import { runSlowMoverAndRestockAdvisor } from "./ops-tools/restock-advisor";
import { runPromotionHealth } from "./ops-tools/promotion-health";
import {
  runSegmentHighValueCustomers,
  runFindReactivationCandidates,
} from "./ops-tools/customers-value";
import { runWeeklyOpsAudit } from "./ops-tools/weekly-audit";
import { runMonthlyPlEstimate } from "./ops-tools/monthly-pl";
import {
  runAuditThemeRisk,
  runThemeDraftCreate,
  runPreviewThemeChange,
} from "./ops-tools/theme-safe";

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

export async function callLeanTool(
  name: string,
  args: Record<string, unknown> | undefined,
  haravan: Haravan | null
): Promise<unknown> {
  if (!haravan) {
    throw new Error(
      "Haravan client not initialized. Missing HARAVAN_SHOP or HARAVAN_TOKEN"
    );
  }

  const a = args ?? {};

  switch (name) {
    case "daily_business_snapshot": {
      const date = a.date;
      if (typeof date !== "string" || !date.trim()) {
        throw new Error("daily_business_snapshot requires date (YYYY-MM-DD)");
      }
      return runDailyBusinessSnapshot(haravan, {
        date: date.trim(),
        limit: num(a.limit, 250),
      });
    }

    case "order_sla_and_fulfillment_risks":
      return runOrderSlaAndFulfillmentRisks(haravan, {
        limit: num(a.limit, 250),
      });

    case "find_unfulfilled_orders":
      return runFindUnfulfilledOrders(haravan, { limit: num(a.limit, 250) });

    case "find_orders_needing_attention":
      return runFindOrdersNeedingAttention(haravan, { limit: num(a.limit, 250) });

    case "find_low_stock_risks":
      return runFindLowStockRisks(haravan, {
        threshold: num(a.threshold, 5),
        product_pages: num(a.product_pages, 2),
        limit_per_page: num(a.limit_per_page, 100),
      });

    case "inventory_oversell_and_anomalies":
      return runInventoryOversellAndAnomalies(haravan, {
        threshold: num(a.threshold, 3),
        product_pages: num(a.product_pages, 3),
      });

    case "pricing_anomaly_scan":
      return runPricingAnomalyScan(haravan, {
        product_pages: num(a.product_pages, 3),
        limit_per_page: num(a.limit_per_page, 80),
        max_change_pct: num(a.max_change_pct, 50),
      });

    case "product_compliance_scan":
      return runProductComplianceScan(haravan, {
        product_pages: num(a.product_pages, 3),
        limit_per_page: num(a.limit_per_page, 80),
      });

    case "tax_compliance_snapshot":
      return runTaxComplianceSnapshot(haravan, {
        month: typeof a.month === "string" ? a.month : undefined,
        order_limit: num(a.order_limit, 250),
      });

    case "end_of_day_reconciliation":
      return runEndOfDayReconciliation(haravan, {
        date: typeof a.date === "string" ? a.date : "",
        limit: num(a.limit, 250),
      });

    case "slow_mover_and_restock_advisor":
      return runSlowMoverAndRestockAdvisor(haravan, {
        days: num(a.days, 28),
        order_limit: num(a.order_limit, 250),
        product_pages: num(a.product_pages, 4),
      });

    case "promotion_health":
      return runPromotionHealth(haravan, { limit: num(a.limit, 100) });

    case "segment_high_value_customers":
      return runSegmentHighValueCustomers(haravan, {
        limit: num(a.limit, 250),
        top_n: num(a.top_n, 30),
      });

    case "find_reactivation_candidates":
      return runFindReactivationCandidates(haravan, {
        limit: num(a.limit, 250),
        inactive_days: num(a.inactive_days, 60),
      });

    case "weekly_ops_audit":
      return runWeeklyOpsAudit(haravan, { limit: num(a.limit, 200) });

    case "monthly_pl_estimate": {
      const month = a.month;
      if (typeof month !== "string" || !month.trim()) {
        throw new Error("monthly_pl_estimate requires month (YYYY-MM)");
      }
      return runMonthlyPlEstimate(haravan, {
        month: month.trim(),
        order_limit: num(a.order_limit, 250),
      });
    }

    case "audit_theme_risk":
      return runAuditThemeRisk(haravan);

    case "theme_draft_create":
      return runThemeDraftCreate(haravan, {
        draft_name: typeof a.draft_name === "string" ? a.draft_name : "",
        confirm: a.confirm === true,
      });

    case "preview_theme_change":
      return runPreviewThemeChange(haravan, {
        description:
          typeof a.description === "string" ? a.description : "",
      });

    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
