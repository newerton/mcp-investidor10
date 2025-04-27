import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { z } from 'zod';

import { Investidor10Service } from '../../application/services/Investidor10Service.js';

export class Investidor10ToolsController {
  constructor(
    private server: McpServer,
    private service: Investidor10Service,
  ) {
    this.registerTools();
  }

  private registerTools() {
    this.registerGetStockToolHandler();
  }

  private registerGetStockToolHandler(): void {
    this.server.tool(
      'get-acoes',
      'Buscar informações básicas de ações',
      {
        stocks: z.array(z.string()).describe('Array of stock symbols'),
      },
      async ({ stocks }) => {
        const infos = await this.service.getStocksByHTML(stocks);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(infos, null, 2),
            },
          ],
        };
      },
    );
  }
}
