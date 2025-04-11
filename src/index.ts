#!/usr/bin/env node

import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { makeUnblockerRequest } from './unblocker-request.js';

// Parse command line arguments
function parseArgs() {
    const args = process.argv.slice(2);
    const options: Record<string, string> = {};
  
    for (const arg of args) {
      if (arg.startsWith('--')) {
        const [key, value] = arg.slice(2).split('=');
        if (key && value) {
          options[key] = value;
        }
      }
    }
  
    return options;
}

const args = parseArgs();
const username = args['username'] || process.env.UNBLOCKER_USERNAME;
const password = args['password'] || process.env.UNBLOCKER_PASSWORD;
const serverAddr = args['serverAddr'] || process.env.UNBLOCKER_SERVER_ADDR;

if (!username || !password || !serverAddr) {
    console.error("Error: UNBLOCKER_USERNAME, UNBLOCKER_PASSWORD and UNBLOCKER_SERVER_ADDR are required. Either set them as environment variables or pass them using --username=YOUR_USERNAME --password=YOUR_PASSWORD --serverAddr=YOUR_SERVER_ADDR");
    process.exit(1);
}

// We recommend accepting our certificate instead of allowing insecure (http) traffic
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = '0';

const server = new McpServer({
  name: "mcp-unblocker",
  version: "0.1.0",
});

server.tool(
  "unblocker-request",
  "Make a request through the unblocker",
  {
    url: z.string().url().describe("URL to fetch through the unblocker"),
    country: z.string().default("us").describe("Country code for geo-location"),
    render: z.string().default("false").describe("Whether to return rendered HTML"),
  },
  async ({ url, country, render }) => {
    return makeUnblockerRequest({
      url,
      country,
      render: render === "true",
      username,
      password,
      serverAddr
    });
  }
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.log("Server started");
}

main().catch((error) => {
  console.error("Server error:", error);
  process.exit(1);
});
