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
import { runSalePeriodStockForecast } from "./ops-tools/sale-period-stock-forecast";
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
import { callHaravanApiBridge, isHaravanApiBridgeTool } from "./api-bridge-handlers";

type LeanCompositeHandler = (
  haravan: Haravan,
  args: Record<string, unknown>
) => Promise<unknown>;

function num(v: unknown, fallback: number): number {
  return typeof v === "number" && !Number.isNaN(v) ? v : fallback;
}

/**
 * Đăng ký tool composite — một nguồn cho routing và cho `LEAN_COMPOSITE_TOOL_NAMES`.
 */
const LEAN_COMPOSITE_HANDLERS: Record<string, LeanCompositeHandler> = {
  async daily_business_snapshot(haravan, a) {
    const date = a.date;
    if (typeof date !== "string" || !date.trim()) {
      throw new Error("daily_business_snapshot requires date (YYYY-MM-DD)");
    }
    return runDailyBusinessSnapshot(haravan, {
      date: date.trim(),
      limit: num(a.limit, 250),
    });
  },

  async order_sla_and_fulfillment_risks(haravan, a) {
    return runOrderSlaAndFulfillmentRisks(haravan, {
      limit: num(a.limit, 250),
    });
  },

  async find_unfulfilled_orders(haravan, a) {
    return runFindUnfulfilledOrders(haravan, { limit: num(a.limit, 250) });
  },

  async find_orders_needing_attention(haravan, a) {
    return runFindOrdersNeedingAttention(haravan, { limit: num(a.limit, 250) });
  },

  async find_low_stock_risks(haravan, a) {
    return runFindLowStockRisks(haravan, {
      threshold: num(a.threshold, 5),
      product_pages: num(a.product_pages, 2),
      limit_per_page: num(a.limit_per_page, 100),
    });
  },

  async inventory_oversell_and_anomalies(haravan, a) {
    return runInventoryOversellAndAnomalies(haravan, {
      threshold: num(a.threshold, 3),
      product_pages: num(a.product_pages, 3),
    });
  },

  async pricing_anomaly_scan(haravan, a) {
    return runPricingAnomalyScan(haravan, {
      product_pages: num(a.product_pages, 3),
      limit_per_page: num(a.limit_per_page, 80),
      max_change_pct: num(a.max_change_pct, 50),
    });
  },

  async product_compliance_scan(haravan, a) {
    return runProductComplianceScan(haravan, {
      product_pages: num(a.product_pages, 3),
      limit_per_page: num(a.limit_per_page, 80),
    });
  },

  async tax_compliance_snapshot(haravan, a) {
    return runTaxComplianceSnapshot(haravan, {
      month: typeof a.month === "string" ? a.month : undefined,
      order_limit: num(a.order_limit, 250),
    });
  },

  async end_of_day_reconciliation(haravan, a) {
    return runEndOfDayReconciliation(haravan, {
      date: typeof a.date === "string" ? a.date : "",
      limit: num(a.limit, 250),
    });
  },

  async slow_mover_and_restock_advisor(haravan, a) {
    return runSlowMoverAndRestockAdvisor(haravan, {
      days: num(a.days, 28),
      order_limit: num(a.order_limit, 250),
      product_pages: num(a.product_pages, 4),
    });
  },

  async sale_period_stock_forecast(haravan, a) {
    return runSalePeriodStockForecast(haravan, {
      history_days: num(a.history_days, 120),
      horizon_days: num(a.horizon_days, 45),
      order_limit: num(a.order_limit, 250),
      product_pages: num(a.product_pages, 4),
      pareto_pct: num(a.pareto_pct, 0.2),
      fixed_uplift:
        typeof a.fixed_uplift === "number" && !Number.isNaN(a.fixed_uplift)
          ? a.fixed_uplift
          : undefined,
      safety_days_cover: num(a.safety_days_cover, 3),
      as_of: typeof a.as_of === "string" ? a.as_of : undefined,
    });
  },

  async promotion_health(haravan, a) {
    return runPromotionHealth(haravan, { limit: num(a.limit, 100) });
  },

  async segment_high_value_customers(haravan, a) {
    return runSegmentHighValueCustomers(haravan, {
      limit: num(a.limit, 250),
      top_n: num(a.top_n, 30),
    });
  },

  async find_reactivation_candidates(haravan, a) {
    return runFindReactivationCandidates(haravan, {
      limit: num(a.limit, 250),
      inactive_days: num(a.inactive_days, 60),
    });
  },

  async weekly_ops_audit(haravan, a) {
    return runWeeklyOpsAudit(haravan, { limit: num(a.limit, 200) });
  },

  async monthly_pl_estimate(haravan, a) {
    const month = a.month;
    if (typeof month !== "string" || !month.trim()) {
      throw new Error("monthly_pl_estimate requires month (YYYY-MM)");
    }
    return runMonthlyPlEstimate(haravan, {
      month: month.trim(),
      order_limit: num(a.order_limit, 250),
    });
  },

  async audit_theme_risk(haravan, _a) {
    return runAuditThemeRisk(haravan);
  },

  async theme_draft_create(haravan, a) {
    return runThemeDraftCreate(haravan, {
      draft_name: typeof a.draft_name === "string" ? a.draft_name : "",
      confirm: a.confirm === true,
    });
  },

  async preview_theme_change(haravan, a) {
    return runPreviewThemeChange(haravan, {
      description: typeof a.description === "string" ? a.description : "",
    });
  },
};

/**
 * Danh sách tool composite — luôn khớp keys của `LEAN_COMPOSITE_HANDLERS`.
 * Test `lean-tools-parity.test.ts` đối chiếu với `LEAN_MCP_TOOLS`.
 */
export const LEAN_COMPOSITE_TOOL_NAMES: readonly string[] = Object.freeze(
  Object.keys(LEAN_COMPOSITE_HANDLERS)
);

export type CallLeanToolClientKind = "mcp-stdio" | "openclaw-plugin";

export type CallLeanToolOptions = {
  clientKind?: CallLeanToolClientKind;
};

function missingHaravanMessage(kind: CallLeanToolOptions["clientKind"]): string {
  if (kind === "openclaw-plugin") {
    return "Haravan client not initialized. Configure OpenClaw plugin Haravan Ops with shop and accessToken.";
  }
  return "Haravan client not initialized. Missing HARAVAN_SHOP or HARAVAN_TOKEN";
}

export async function callLeanTool(
  name: string,
  args: Record<string, unknown> | undefined,
  haravan: Haravan | null,
  options?: CallLeanToolOptions
): Promise<unknown> {
  if (!haravan) {
    throw new Error(missingHaravanMessage(options?.clientKind));
  }

  const a = args ?? {};
  const composite = LEAN_COMPOSITE_HANDLERS[name];
  if (composite) {
    return composite(haravan, a);
  }
  if (isHaravanApiBridgeTool(name)) {
    return callHaravanApiBridge(name, a, haravan);
  }
  throw new Error(`Unknown tool: ${name}`);
}
