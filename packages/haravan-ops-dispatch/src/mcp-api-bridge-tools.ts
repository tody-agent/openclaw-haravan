/**
 * Tool MCP bổ sung — mirror @haravan-master/core (locations, đơn, transaction/refund, tags, com/web escape).
 * Đồng bộ với plugin OpenClaw (cùng LEAN_MCP_TOOLS + callLeanTool).
 */

export const API_BRIDGE_MCP_TOOLS = [
  {
    name: "haravan_list_locations",
    description: "Danh sách địa điểm / kho Haravan (read-only)",
    inputSchema: { type: "object" as const, properties: {} },
  },
  {
    name: "haravan_get_location",
    description: "Chi tiết một địa điểm theo id (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        location_id: { type: "number", description: "ID location" },
      },
      required: ["location_id"],
    },
  },
  {
    name: "haravan_get_order",
    description: "Chi tiết một đơn hàng theo id (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_update_order",
    description:
      "Cập nhật đơn (PUT) — note, note_attributes, tags, …; cần user xác nhận khi ghi",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        order: {
          type: "object",
          description: "Object order (fields Haravan chấp nhận), phải khớp id",
        },
      },
      required: ["order_id", "order"],
    },
  },
  {
    name: "haravan_order_close",
    description: "Đóng đơn (POST close) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_order_open",
    description: "Mở lại đơn đã đóng (POST open) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_order_cancel",
    description:
      "Hủy đơn / hoàn tiền (POST cancel) — rủi ro cao; body theo doc Haravan (reason, amount, refund, …)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        cancel_body: {
          type: "object",
          description: "Body JSON (optional); {} nếu hủy đơn giản",
        },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_order_tags_get",
    description: "Lấy tags hiện tại của đơn (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_order_tags_add",
    description: "Thêm tags đơn (chuỗi CSV, vd: a,b,c) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        tags: { type: "string", description: "Tags cách nhau bởi dấu phẩy" },
      },
      required: ["order_id", "tags"],
    },
  },
  {
    name: "haravan_order_tags_remove",
    description: "Gỡ tags khỏi đơn (chuỗi CSV) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        tags: { type: "string", description: "Tags cần gỡ, CSV" },
      },
      required: ["order_id", "tags"],
    },
  },
  {
    name: "haravan_list_order_transactions",
    description: "Danh sách giao dịch thanh toán của đơn (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        fields: { type: "string", description: "Optional: fields CSV cho API" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_get_order_transaction",
    description: "Một giao dịch theo id (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        transaction_id: { type: "number", description: "ID transaction" },
      },
      required: ["order_id", "transaction_id"],
    },
  },
  {
    name: "haravan_create_order_transaction",
    description:
      "Tạo giao dịch (capture, …) — ảnh hưởng tiền; chỉ khi user đã xác nhận",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        transaction: {
          type: "object",
          description: "Object transaction (amount, kind, …)",
        },
      },
      required: ["order_id", "transaction"],
    },
  },
  {
    name: "haravan_list_order_refunds",
    description: "Danh sách hoàn tiền của đơn (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        fields: { type: "string", description: "Optional: fields CSV" },
      },
      required: ["order_id"],
    },
  },
  {
    name: "haravan_get_order_refund",
    description: "Chi tiết một refund (read-only)",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        refund_id: { type: "number", description: "ID refund" },
      },
      required: ["order_id", "refund_id"],
    },
  },
  {
    name: "haravan_create_order_refund",
    description: "Tạo refund cho đơn — rủi ro cao; chỉ khi user đã xác nhận",
    inputSchema: {
      type: "object" as const,
      properties: {
        order_id: { type: "number", description: "ID đơn" },
        refund: {
          type: "object",
          description: "Object refund (restock, refund_line_items, transactions, …)",
        },
      },
      required: ["order_id", "refund"],
    },
  },
  {
    name: "haravan_products_count",
    description: "Đếm sản phẩm (GET products/count) — read-only",
    inputSchema: {
      type: "object" as const,
      properties: {
        vendor: { type: "string", description: "Lọc vendor" },
        product_type: { type: "string", description: "Lọc loại SP" },
        created_at_min: { type: "string", description: "ISO date min" },
        updated_at_min: { type: "string", description: "ISO date min" },
        updated_at_max: { type: "string", description: "ISO date max" },
      },
    },
  },
  {
    name: "haravan_product_tags_add",
    description: "Thêm tags sản phẩm (CSV) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        product_id: { type: "number", description: "ID sản phẩm" },
        tags: { type: "string", description: "Tags CSV" },
      },
      required: ["product_id", "tags"],
    },
  },
  {
    name: "haravan_product_tags_remove",
    description: "Gỡ tags sản phẩm (CSV) — cần xác nhận user",
    inputSchema: {
      type: "object" as const,
      properties: {
        product_id: { type: "number", description: "ID sản phẩm" },
        tags: { type: "string", description: "Tags CSV" },
      },
      required: ["product_id", "tags"],
    },
  },
  {
    name: "haravan_com_api",
    description:
      "Gọi thẳng Admin API /com: method + path (vd /custom_collections.json). GET an toàn hơn; POST/PUT/DELETE có thể ghi dữ liệu — bật tool optional trong OpenClaw nếu cần",
    inputSchema: {
      type: "object" as const,
      properties: {
        method: {
          type: "string",
          description: "GET | POST | PUT | DELETE",
        },
        path: {
          type: "string",
          description: "Bắt đầu bằng /, kết thúc .json, không chứa ..",
        },
        query: {
          type: "object",
          description: "Query string key-value (optional)",
        },
        body: {
          type: "object",
          description: "JSON body cho POST/PUT; DELETE có body (vd xóa tags)",
        },
      },
      required: ["method", "path"],
    },
  },
  {
    name: "haravan_web_api",
    description:
      "Gọi API /web (theme, …). Cùng semantics với haravan_com_api; thận trọng với POST/PUT/DELETE",
    inputSchema: {
      type: "object" as const,
      properties: {
        method: {
          type: "string",
          description: "GET | POST | PUT | DELETE",
        },
        path: { type: "string", description: "Path từ /, ví dụ /themes.json" },
        query: { type: "object", description: "Query optional" },
        body: { type: "object", description: "Body optional" },
      },
      required: ["method", "path"],
    },
  },
];
