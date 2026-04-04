import { Haravan } from "@haravan-master/core";
import {
  callLeanTool,
  LEAN_MCP_TOOLS,
} from "@haravan-master/haravan-ops-dispatch";
import {
  definePluginEntry,
  type AnyAgentTool,
  type OpenClawPluginConfigSchema,
} from "openclaw/plugin-sdk/plugin-entry";
import { mcpInputToTypeBox } from "./mcp-schema-to-typebox.js";

const PLUGIN_ID = "haravan-ops";

/** Tool ghi mạnh / escape hatch — bật trong OpenClaw khi merchant cần */
const OPTIONAL_HARAVAN_TOOLS = new Set([
  "theme_draft_create",
  "haravan_com_api",
  "haravan_web_api",
]);

function haravanOpsConfigSchema(): OpenClawPluginConfigSchema {
  return {
    jsonSchema: {
      type: "object",
      additionalProperties: false,
      required: ["shop", "accessToken"],
      properties: {
        shop: {
          type: "string",
          description: "Shop domain, e.g. your-shop.myharavan.com",
        },
        accessToken: {
          type: "string",
          description: "Haravan API access token",
        },
      },
    },
    validate: (value: unknown) => {
      if (!value || typeof value !== "object") {
        return { ok: false, errors: ["Plugin config must be an object"] };
      }
      const v = value as Record<string, unknown>;
      const shop = typeof v.shop === "string" ? v.shop.trim() : "";
      const accessToken =
        typeof v.accessToken === "string" ? v.accessToken.trim() : "";
      if (!shop) {
        return { ok: false, errors: ["shop is required (e.g. your-shop.myharavan.com)"] };
      }
      if (!accessToken) {
        return { ok: false, errors: ["accessToken is required"] };
      }
      return { ok: true, value: { shop, accessToken } };
    },
    uiHints: {
      shop: {
        label: "Haravan shop",
        placeholder: "your-shop.myharavan.com",
      },
      accessToken: {
        label: "Access token",
        placeholder: "Paste token",
        sensitive: true,
      },
    },
  };
}

function resolveHaravan(
  pluginConfig: Record<string, unknown> | undefined
): Haravan | null {
  if (!pluginConfig) {
    return null;
  }
  const shop =
    typeof pluginConfig.shop === "string" ? pluginConfig.shop.trim() : "";
  const accessToken =
    typeof pluginConfig.accessToken === "string"
      ? pluginConfig.accessToken.trim()
      : "";
  if (!shop || !accessToken) {
    return null;
  }
  return new Haravan({ shopDomain: shop, accessToken });
}

export default definePluginEntry({
  id: PLUGIN_ID,
  name: "Haravan Ops",
  description:
    "Vận hành cửa hàng Haravan: đơn, tồn, thuế, KM, theme — cùng bộ tool như MCP lean.",
  configSchema: haravanOpsConfigSchema,
  register(api) {
    const haravan = resolveHaravan(
      api.pluginConfig as Record<string, unknown> | undefined
    );

    for (const def of LEAN_MCP_TOOLS) {
      const inputSchema = def.inputSchema as Parameters<
        typeof mcpInputToTypeBox
      >[0];
      const tool: AnyAgentTool = {
        name: def.name,
        label: def.name,
        description: def.description,
        parameters: mcpInputToTypeBox(inputSchema),
        async execute(_toolCallId, params) {
          if (!haravan) {
            return {
              content: [
                {
                  type: "text",
                  text:
                    "Lỗi: chưa cấu hình plugin Haravan Ops. Thêm shop (domain) và accessToken trong cài đặt plugin OpenClaw.",
                },
              ],
              details: null,
              isError: true,
            };
          }
          const result = await callLeanTool(
            def.name,
            params as Record<string, unknown>,
            haravan,
            { clientKind: "openclaw-plugin" }
          );
          return {
            content: [
              { type: "text", text: JSON.stringify(result, null, 2) },
            ],
            details: result,
          };
        },
      };

      const optional = OPTIONAL_HARAVAN_TOOLS.has(def.name);
      api.registerTool(tool, optional ? { optional: true } : undefined);
    }

    api.logger.info("Haravan Ops plugin: tools registered");
  },
});
