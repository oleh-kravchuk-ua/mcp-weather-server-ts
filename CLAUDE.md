# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a TypeScript-based MCP (Model Context Protocol) weather server that provides tools for retrieving weather data from the National Weather Service (NWS) API. It implements two main tools:

1. `get-forecast` - Gets weather forecasts for a specific latitude/longitude coordinate
2. `get-alerts` - Gets active weather alerts for a US state

The server uses the MCP SDK to create a server that can be integrated with AI assistants.

## Commands

### Build

```bash
npm run build
```

This compiles TypeScript code to JavaScript and sets the executable permission on the built index.js file.

### Run

After building, the server can be run directly:

```bash
node build/index.js
```

Or as a CLI tool (since it's defined as a binary in package.json):

```bash
./build/index.js
```

### Typecheck

To run TypeScript type checking:

```bash
npx tsc --noEmit
```

## Architecture

### Core Components

1. **MCP Server** (`src/index.ts`): 
   - Initializes and configures the MCP server
   - Registers tools using Zod for parameter validation
   - Uses stdio for transport (allowing the server to communicate via stdin/stdout)

2. **Tool Implementations**:
   - `get-forecast.tool.ts`: Implementation for retrieving and formatting weather forecasts
   - `get-alerts.tool.ts`: Implementation for retrieving and formatting weather alerts

3. **Helpers and Interfaces**:
   - `helpers.ts`: Contains utility functions for making API requests and formatting responses
   - `interfaces.ts`: TypeScript interfaces for API responses and data structures

### Data Flow

1. The server receives a request for one of its tools
2. The tool calls the NWS API with appropriate parameters
3. The API response is processed and formatted into a user-friendly text format
4. The formatted response is returned through the MCP protocol

### Dependencies

- `@modelcontextprotocol/sdk`: Core SDK for implementing the MCP protocol
- `zod`: Schema validation for tool parameters
- TypeScript for type safety and build process

## Code Style

- Uses ES modules (import/export) syntax, not CommonJS (require)
- Follows TypeScript best practices with interfaces for type definitions
- Uses async/await for asynchronous operations
- Implements proper error handling and edge cases for API calls

## Node Version

The project uses Node.js v24.0.2 as specified in the `.nvmrc` file.
