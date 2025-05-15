import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

import { getToolToGetAlerts } from "./get-alerts.tool.js";
import { getToolToGetForecast } from "./get-forecast.tool.js";

const NWS_API_BASE = "https://api.weather.gov";

// Create server instance
const server = new McpServer({
  name: "weather",
  version: "1.0.0",
  capabilities: {
    resources: {},
    tools: {},
  },
});

// Register weather tools
server.tool(
  "get-alerts",
  "Get weather alerts for a state",
  { state: z.string().length(2).describe("Two-letter state code (e.g. CA, NY)") },
  async (args, extra) => {
    const result = await getToolToGetAlerts(NWS_API_BASE)(args);
    return {
      content: result.content.map(item => ({
        type: "text" as const,
        text: item.text
      }))
    };
  },
);

server.tool(
  "get-forecast",
  "Get weather forecast for a location",
  {
    latitude: z.number().min(-90).max(90).describe("Latitude of the location"),
    longitude: z.number().min(-180).max(180).describe("Longitude of the location"),
  },
  async (args, extra) => {
    const result = await getToolToGetForecast(NWS_API_BASE)(args);
    return {
      content: result.content.map(item => ({
        type: "text" as const,
        text: item.text
      }))
    };
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Weather MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});