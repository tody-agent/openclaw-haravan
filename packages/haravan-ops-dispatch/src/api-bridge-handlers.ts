import type { Haravan, Order } from "@haravan-master/core";

type HaravanBridgeHandler = (
  args: Record<string, unknown>,
  haravan: Haravan
) => Promise<unknown>;

function reqId(v: unknown, label: string): number {
  const n = typeof v === "number" ? v : typeof v === "string" ? Number(v) : NaN;
  if (!Number.isFinite(n)) {
    throw new Error(`${label} must be a finite number`);
  }
  return n;
}

function ensureApiPath(path: unknown, kind: "com" | "web"): string {
  if (typeof path !== "string" || !path.startsWith("/")) {
    throw new Error("path must be a string starting with /");
  }
  if (path.includes("..")) {
    throw new Error("path must not contain ..");
  }
  if (!path.includes(".json")) {
    throw new Error("path should include .json (Haravan REST convention)");
  }
  if (kind === "web" && path.startsWith("//")) {
    throw new Error("invalid path");
  }
  return path;
}

function normalizeMethod(v: unknown): string {
  if (typeof v !== "string" || !v.trim()) {
    throw new Error("method is required (GET, POST, PUT, DELETE)");
  }
  return v.trim().toUpperCase();
}

async function haravanComApi(
  args: Record<string, unknown>,
  haravan: Haravan
): Promise<unknown> {
  const method = normalizeMethod(args.method);
  const path = ensureApiPath(args.path, "com");
  const query =
    args.query && typeof args.query === "object"
      ? (args.query as Record<string, unknown>)
      : undefined;
  const body = args.body;

  switch (method) {
    case "GET":
      return haravan.com.get(path, query);
    case "POST":
      return haravan.com.post(path, body ?? {});
    case "PUT":
      return haravan.com.put(path, body ?? {});
    case "DELETE":
      if (body !== undefined && body !== null && typeof body === "object") {
        return haravan.com.deleteJson(path, body);
      }
      await haravan.com.delete(path);
      return { ok: true };
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

async function haravanWebApi(
  args: Record<string, unknown>,
  haravan: Haravan
): Promise<unknown> {
  const method = normalizeMethod(args.method);
  const path = ensureApiPath(args.path, "web");
  const query =
    args.query && typeof args.query === "object"
      ? (args.query as Record<string, unknown>)
      : undefined;
  const body = args.body;

  switch (method) {
    case "GET":
      return haravan.web.get(path, query);
    case "POST":
      return haravan.web.post(path, body ?? {});
    case "PUT":
      return haravan.web.put(path, body ?? {});
    case "DELETE":
      if (body !== undefined && body !== null && typeof body === "object") {
        return haravan.web.deleteJson(path, body);
      }
      await haravan.web.delete(path);
      return { ok: true };
    default:
      throw new Error(`Unsupported method: ${method}`);
  }
}

/**
 * Đăng ký bridge — một nguồn cho routing và cho `HARAVAN_API_BRIDGE_TOOL_NAMES`.
 * Test `lean-tools-parity.test.ts` đối chiếu với `API_BRIDGE_MCP_TOOLS`.
 */
const HARAVAN_API_BRIDGE_HANDLERS: Record<string, HaravanBridgeHandler> = {
  haravan_list_locations: async (_args, haravan) => haravan.locations.list(),

  haravan_get_location: async (args, haravan) =>
    haravan.locations.get(reqId(args.location_id, "location_id")),

  haravan_get_order: async (args, haravan) =>
    haravan.orders.get(reqId(args.order_id, "order_id")),

  haravan_update_order: async (args, haravan) => {
    const id = reqId(args.order_id, "order_id");
    const patch = args.order;
    if (!patch || typeof patch !== "object") {
      throw new Error("haravan_update_order requires order object");
    }
    return haravan.orders.update(id, patch as Partial<Order>);
  },

  haravan_order_close: async (args, haravan) =>
    haravan.orders.close(reqId(args.order_id, "order_id")),

  haravan_order_open: async (args, haravan) =>
    haravan.orders.open(reqId(args.order_id, "order_id")),

  haravan_order_cancel: async (args, haravan) => {
    const oid = reqId(args.order_id, "order_id");
    const body =
      args.cancel_body && typeof args.cancel_body === "object"
        ? (args.cancel_body as Record<string, unknown>)
        : {};
    return haravan.orders.cancel(oid, body);
  },

  haravan_order_tags_get: async (args, haravan) =>
    haravan.orders.getTags(reqId(args.order_id, "order_id")),

  haravan_order_tags_add: async (args, haravan) => {
    const tags = typeof args.tags === "string" ? args.tags : "";
    if (!tags.trim()) {
      throw new Error("tags is required");
    }
    return haravan.orders.addTags(reqId(args.order_id, "order_id"), tags.trim());
  },

  haravan_order_tags_remove: async (args, haravan) => {
    const tags = typeof args.tags === "string" ? args.tags : "";
    if (!tags.trim()) {
      throw new Error("tags is required");
    }
    return haravan.orders.removeTags(
      reqId(args.order_id, "order_id"),
      tags.trim()
    );
  },

  haravan_list_order_transactions: async (args, haravan) => {
    const q =
      typeof args.fields === "string" && args.fields.trim()
        ? { fields: args.fields.trim() }
        : undefined;
    return haravan.orders.transactions.list(reqId(args.order_id, "order_id"), q);
  },

  haravan_get_order_transaction: async (args, haravan) =>
    haravan.orders.transactions.get(
      reqId(args.order_id, "order_id"),
      reqId(args.transaction_id, "transaction_id")
    ),

  haravan_create_order_transaction: async (args, haravan) => {
    const tx = args.transaction;
    if (!tx || typeof tx !== "object") {
      throw new Error("transaction object is required");
    }
    return haravan.orders.transactions.create(
      reqId(args.order_id, "order_id"),
      tx as Record<string, unknown>
    );
  },

  haravan_list_order_refunds: async (args, haravan) => {
    const q =
      typeof args.fields === "string" && args.fields.trim()
        ? { fields: args.fields.trim() }
        : undefined;
    return haravan.orders.refunds.list(reqId(args.order_id, "order_id"), q);
  },

  haravan_get_order_refund: async (args, haravan) =>
    haravan.orders.refunds.get(
      reqId(args.order_id, "order_id"),
      reqId(args.refund_id, "refund_id")
    ),

  haravan_create_order_refund: async (args, haravan) => {
    const rf = args.refund;
    if (!rf || typeof rf !== "object") {
      throw new Error("refund object is required");
    }
    return haravan.orders.refunds.create(
      reqId(args.order_id, "order_id"),
      rf as Record<string, unknown>
    );
  },

  haravan_products_count: async (args, haravan) => {
    const q: Record<string, string> = {};
    for (const k of [
      "vendor",
      "product_type",
      "created_at_min",
      "updated_at_min",
      "updated_at_max",
    ] as const) {
      const v = args[k];
      if (typeof v === "string" && v.trim()) {
        q[k] = v.trim();
      }
    }
    const count = await haravan.products.count(
      Object.keys(q).length ? q : undefined
    );
    return { count };
  },

  haravan_product_tags_add: async (args, haravan) => {
    const tags = typeof args.tags === "string" ? args.tags : "";
    if (!tags.trim()) {
      throw new Error("tags is required");
    }
    return haravan.products.addTags(
      reqId(args.product_id, "product_id"),
      tags.trim()
    );
  },

  haravan_product_tags_remove: async (args, haravan) => {
    const tags = typeof args.tags === "string" ? args.tags : "";
    if (!tags.trim()) {
      throw new Error("tags is required");
    }
    return haravan.products.removeTags(
      reqId(args.product_id, "product_id"),
      tags.trim()
    );
  },

  haravan_com_api: haravanComApi,
  haravan_web_api: haravanWebApi,
};

/** Luôn khớp keys của `HARAVAN_API_BRIDGE_HANDLERS`. */
export const HARAVAN_API_BRIDGE_TOOL_NAMES: readonly string[] = Object.freeze(
  Object.keys(HARAVAN_API_BRIDGE_HANDLERS)
);

export async function callHaravanApiBridge(
  name: string,
  args: Record<string, unknown>,
  haravan: Haravan
): Promise<unknown> {
  const handler = HARAVAN_API_BRIDGE_HANDLERS[name];
  if (!handler) {
    throw new Error(`Unknown Haravan API tool: ${name}`);
  }
  return handler(args, haravan);
}

export function isHaravanApiBridgeTool(name: string): boolean {
  return name.startsWith("haravan_");
}
