import type { Haravan, Order } from "@haravan-master/core";

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

export async function callHaravanApiBridge(
  name: string,
  args: Record<string, unknown>,
  haravan: Haravan
): Promise<unknown> {
  switch (name) {
    case "haravan_list_locations":
      return haravan.locations.list();

    case "haravan_get_location":
      return haravan.locations.get(reqId(args.location_id, "location_id"));

    case "haravan_get_order":
      return haravan.orders.get(reqId(args.order_id, "order_id"));

    case "haravan_update_order": {
      const id = reqId(args.order_id, "order_id");
      const patch = args.order;
      if (!patch || typeof patch !== "object") {
        throw new Error("haravan_update_order requires order object");
      }
      return haravan.orders.update(id, patch as Partial<Order>);
    }

    case "haravan_order_close":
      return haravan.orders.close(reqId(args.order_id, "order_id"));

    case "haravan_order_open":
      return haravan.orders.open(reqId(args.order_id, "order_id"));

    case "haravan_order_cancel": {
      const oid = reqId(args.order_id, "order_id");
      const body =
        args.cancel_body && typeof args.cancel_body === "object"
          ? (args.cancel_body as Record<string, unknown>)
          : {};
      return haravan.orders.cancel(oid, body);
    }

    case "haravan_order_tags_get":
      return haravan.orders.getTags(reqId(args.order_id, "order_id"));

    case "haravan_order_tags_add": {
      const tags = typeof args.tags === "string" ? args.tags : "";
      if (!tags.trim()) {
        throw new Error("tags is required");
      }
      return haravan.orders.addTags(reqId(args.order_id, "order_id"), tags.trim());
    }

    case "haravan_order_tags_remove": {
      const tags = typeof args.tags === "string" ? args.tags : "";
      if (!tags.trim()) {
        throw new Error("tags is required");
      }
      return haravan.orders.removeTags(reqId(args.order_id, "order_id"), tags.trim());
    }

    case "haravan_list_order_transactions": {
      const q =
        typeof args.fields === "string" && args.fields.trim()
          ? { fields: args.fields.trim() }
          : undefined;
      return haravan.orders.transactions.list(reqId(args.order_id, "order_id"), q);
    }

    case "haravan_get_order_transaction":
      return haravan.orders.transactions.get(
        reqId(args.order_id, "order_id"),
        reqId(args.transaction_id, "transaction_id")
      );

    case "haravan_create_order_transaction": {
      const tx = args.transaction;
      if (!tx || typeof tx !== "object") {
        throw new Error("transaction object is required");
      }
      return haravan.orders.transactions.create(
        reqId(args.order_id, "order_id"),
        tx as Record<string, unknown>
      );
    }

    case "haravan_list_order_refunds": {
      const q =
        typeof args.fields === "string" && args.fields.trim()
          ? { fields: args.fields.trim() }
          : undefined;
      return haravan.orders.refunds.list(reqId(args.order_id, "order_id"), q);
    }

    case "haravan_get_order_refund":
      return haravan.orders.refunds.get(
        reqId(args.order_id, "order_id"),
        reqId(args.refund_id, "refund_id")
      );

    case "haravan_create_order_refund": {
      const rf = args.refund;
      if (!rf || typeof rf !== "object") {
        throw new Error("refund object is required");
      }
      return haravan.orders.refunds.create(
        reqId(args.order_id, "order_id"),
        rf as Record<string, unknown>
      );
    }

    case "haravan_products_count": {
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
      const count = await haravan.products.count(Object.keys(q).length ? q : undefined);
      return { count };
    }

    case "haravan_product_tags_add": {
      const tags = typeof args.tags === "string" ? args.tags : "";
      if (!tags.trim()) {
        throw new Error("tags is required");
      }
      return haravan.products.addTags(reqId(args.product_id, "product_id"), tags.trim());
    }

    case "haravan_product_tags_remove": {
      const tags = typeof args.tags === "string" ? args.tags : "";
      if (!tags.trim()) {
        throw new Error("tags is required");
      }
      return haravan.products.removeTags(
        reqId(args.product_id, "product_id"),
        tags.trim()
      );
    }

    case "haravan_com_api": {
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

    case "haravan_web_api": {
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

    default:
      throw new Error(`Unknown Haravan API tool: ${name}`);
  }
}

export function isHaravanApiBridgeTool(name: string): boolean {
  return name.startsWith("haravan_");
}
