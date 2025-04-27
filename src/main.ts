import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';

import { Investidor10Service } from './application/services/Investidor10Service.js';
import { Investidor10ApiService } from './infrastructure/services/Investidor10ApiService.js';
import { Investidor10ToolsController } from './interface/controllers/Investidor10ToolsController.js';

async function main() {
  // Criação da instância do servidor MCP
  const server = new McpServer({
    name: 'weather',
    version: '1.0.0',
    capabilities: {
      resources: {},
      tools: {},
    },
  });

  // Inicializando serviços e controladores
  const apiService = new Investidor10ApiService();
  const service = new Investidor10Service(apiService);

  // Controlador que registra as ferramentas
  new Investidor10ToolsController(server, service);

  // Configurando e iniciando o servidor
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Investidor10 MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
