import { API_BRIDGE_MCP_TOOLS } from "./mcp-api-bridge-tools";

/** Định nghĩa tool MCP cho ListTools — mô tả tiếng Việt cho chủ shop */
export const LEAN_MCP_TOOLS = [
  {
    name: "daily_business_snapshot",
    description:
      "Báo cáo vận hành theo ngày: số đơn, doanh thu, AOV, top sản phẩm, đơn chưa paid (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        date: {
          type: "string",
          description: "YYYY-MM-DD — lọc đơn theo created_at",
        },
        limit: { type: "number", description: "Tối đa đơn quét (mặc định 250)" },
      },
      required: ["date"],
    },
  },
  {
    name: "order_sla_and_fulfillment_risks",
    description:
      "Đơn mở: rủi ro SLA theo kênh (ước lượng), đơn chưa fulfill lâu, tỷ lệ hủy tuần (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number", description: "Số đơn tối đa (mặc định 250)" },
      },
    },
  },
  {
    name: "find_unfulfilled_orders",
    description: "Danh sách đơn đang mở và chưa giao đủ (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "find_orders_needing_attention",
    description: "Đơn mở: chưa paid hoặc không cập nhật >24h (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "find_low_stock_risks",
    description: "Variant tồn thấp hoặc tồn âm (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        threshold: { type: "number", description: "Ngưỡng tồn thấp (mặc định 5)" },
        product_pages: { type: "number", description: "Số trang SP quét (1–10)" },
        limit_per_page: { type: "number" },
      },
    },
  },
  {
    name: "inventory_oversell_and_anomalies",
    description: "Tồn âm/thấp + SP đang published mà tồn cực thấp (read-only, gợi ý hành động)",
    inputSchema: {
      type: "object",
      properties: {
        threshold: { type: "number" },
        product_pages: { type: "number" },
      },
    },
  },
  {
    name: "pricing_anomaly_scan",
    description: "Giá 0đ, compare_at sai (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        product_pages: { type: "number" },
        limit_per_page: { type: "number" },
        max_change_pct: { type: "number", description: "Dành cho phase sau" },
      },
    },
  },
  {
    name: "product_compliance_scan",
    description: "Sản phẩm thiếu mô tả/ảnh/SKU, SKU trùng (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        product_pages: { type: "number" },
        limit_per_page: { type: "number" },
      },
    },
  },
  {
    name: "tax_compliance_snapshot",
    description:
      "Ước tính doanh thu (mẫu) + nhắc thuế TMĐT tham khảo — KHÔNG thay kế toán (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        month: { type: "string", description: "YYYY-MM, mặc định tháng hiện tại" },
        order_limit: { type: "number" },
      },
    },
  },
  {
    name: "end_of_day_reconciliation",
    description: "Tổng hợp đơn trong ngày theo biến thể (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        date: { type: "string", description: "YYYY-MM-DD" },
        limit: { type: "number" },
      },
      required: ["date"],
    },
  },
  {
    name: "slow_mover_and_restock_advisor",
    description: "Hàng ế / cover thấp dựa trên bán 28 ngày (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        days: { type: "number", description: "Cửa sổ ngày (mặc định 28)" },
        order_limit: { type: "number" },
        product_pages: { type: "number" },
      },
    },
  },
  {
    name: "promotion_health",
    description: "KM sắp hết hạn / có thể hết hạn nhưng vẫn bật (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "segment_high_value_customers",
    description: "Top khách theo total_spent (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        top_n: { type: "number", description: "Số khách trả về (mặc định 30)" },
      },
    },
  },
  {
    name: "find_reactivation_candidates",
    description: "Khách có đơn nhưng lâu không cập nhật (proxy churn) (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
        inactive_days: { type: "number", description: "Mặc định 60" },
      },
    },
  },
  {
    name: "weekly_ops_audit",
    description: "Tổng hợp tuần: shop + SLA + tồn + KM + compliance (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        limit: { type: "number" },
      },
    },
  },
  {
    name: "monthly_pl_estimate",
    description: "P&L rất thô từ đơn tháng — thiếu COGS/phí (read-only)",
    inputSchema: {
      type: "object",
      properties: {
        month: { type: "string", description: "YYYY-MM" },
        order_limit: { type: "number" },
      },
      required: ["month"],
    },
  },
  {
    name: "audit_theme_risk",
    description: "Liệt kê theme main/draft, cảnh báo cấu hình (read-only)",
    inputSchema: { type: "object", properties: {} },
  },
  {
    name: "theme_draft_create",
    description:
      "Tạo theme draft — bắt buộc confirm:true sau khi user đồng ý rõ ràng (confirm-write)",
    inputSchema: {
      type: "object",
      properties: {
        draft_name: { type: "string", description: "Tên theme draft" },
        confirm: {
          type: "boolean",
          description: "Phải true mới gọi API tạo; false = chỉ preview",
        },
      },
      required: ["draft_name"],
    },
  },
  {
    name: "preview_theme_change",
    description: "Ghi nhận mô tả thay đổi theme, không ghi asset (read-only / preview)",
    inputSchema: {
      type: "object",
      properties: {
        description: { type: "string", description: "Mô tả thay đổi dự kiến" },
      },
      required: ["description"],
    },
  },
  ...API_BRIDGE_MCP_TOOLS,
];
