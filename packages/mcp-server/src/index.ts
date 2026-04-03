import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import { Haravan } from "@haravan-master/core";
import {
  callLeanTool,
  LEAN_MCP_TOOLS,
} from "@haravan-master/haravan-ops-dispatch";
import { getStartupMessage, SERVER_INFO } from "./bootstrap";

const shopDomain = process.env.HARAVAN_SHOP || "";
const accessToken = process.env.HARAVAN_TOKEN || "";

let haravan: Haravan | null = null;
if (shopDomain && accessToken) {
  haravan = new Haravan({ shopDomain, accessToken });
}

const server = new Server(
  {
    name: SERVER_INFO.name,
    version: SERVER_INFO.version,
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [...LEAN_MCP_TOOLS],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: toolArgs } = request.params;
  try {
    const result = await callLeanTool(
      name,
      (toolArgs as Record<string, unknown>) ?? {},
      haravan
    );
    return {
      content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
    };
  } catch (err: any) {
    return {
      content: [{ type: "text", text: `Error: ${err.message}` }],
      isError: true,
    };
  }
});

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error(getStartupMessage());
}

main().catch(console.error);
