import { Type, type TProperties, type TSchema } from "@sinclair/typebox";

type McpProp = {
  type?: string;
  description?: string;
};

type McpInputSchema = {
  type?: string;
  properties?: Record<string, McpProp>;
  required?: readonly string[];
};

/** Maps MCP JSON-schema-shaped inputSchema (subset) to TypeBox for OpenClaw tools. */
export function mcpInputToTypeBox(inputSchema: McpInputSchema): TSchema {
  const props = inputSchema.properties ?? {};
  const required = new Set(inputSchema.required ?? []);
  const objProps: TProperties = {};

  for (const [key, spec] of Object.entries(props)) {
    const desc = spec.description;
    let schema: TSchema;
    switch (spec.type) {
      case "number":
      case "integer":
        schema = Type.Number({ description: desc });
        break;
      case "boolean":
        schema = Type.Boolean({ description: desc });
        break;
      case "object":
        schema = Type.Any({ description: desc });
        break;
      case "string":
      default:
        schema = Type.String({ description: desc });
    }
    objProps[key] = required.has(key) ? schema : Type.Optional(schema);
  }

  return Type.Object(objProps);
}
