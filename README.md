# MCP Unblocker Server

A Model Context Protocol (MCP) server that provides access to [NetNut's Website Unblocker](https://netnut.io/unblocker/) proxy service. This server enables you to bypass anti-bot systems and access blocked websites through configurable geo-location and HTML rendering options.

## Features

- Make requests through the unblocker proxy
- Configurable geo-location (default: "us")
- Optional HTML rendering
- Secure credential handling through environment variables or command line arguments

## Prerequisites

- Node.js (v14 or higher)
- npm or yarn

## Installation

1. Clone the repository:

```bash
git clone https://github.com/lololosys/Unblocker-MCP
cd mcp-unblocker
```

2. Install dependencies:

```bash
npm install
```

## Configuration

You can provide the unblocker credentials in two ways:

1. Environment variables:

```bash
export UNBLOCKER_USERNAME="your-username"
export UNBLOCKER_PASSWORD="your-password"
export UNBLOCKER_SERVER_ADDR="Unblocker Proxy server address"
```

2. Command line arguments:

```bash
node dist/index.js --username=your-username --password=your-password --serverAddr=unblocker-proxy-server-address:port
```

## Usage

1. Build the project:

```bash
npm run build
```

2. Start the server:

```bash
npm run start
```

### Making Requests

The server provides a single tool called `unblocker-request` with the following parameters:

- `url` (required): The URL to fetch through the unblocker
- `country` (optional, default: "us"): The country code for geo-location
- `render` (optional, default: false): Whether to return rendered HTML

Example request:

```json
{
  "url": "https://example.com",
  "country": "us",
  "render": false
}
```

## Development

### Project Structure

- `src/index.ts`: Main server implementation
- `dist/`: Compiled JavaScript output
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration

### Building

To compile the TypeScript code:

```bash
npm run build
```

### Cursor

```json
{
  "mcpServers": {
    "mcp-unblocker": {
      "command": "node",
      "args": [
        "dist/index.js",
        "--username=your-username",
        "--password=your-password",
        "--serverAddr=web-unblocker-server:port"
      ]
    }
  }
}
```

### Example

make a request through the unblocker to https://ipinfo.io/json with country code spain with render true
