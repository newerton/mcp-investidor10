import { Ticker } from '../../domain/models/Investidor10Model.js';

export class Investidor10ApiService {
  private readonly API_BASE = 'https://investidor10.com.br';
  private readonly USER_AGENT =
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36';

  // Helper function for making NWS API requests
  async makeJsonRequest<T>(endpoint: string): Promise<T | null> {
    const url = `${this.API_BASE}${endpoint}`;
    const headers = {
      'User-Agent': this.USER_AGENT,
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.json()) as T;
    } catch (error) {
      console.error('Error making NWS request:', error);
      return null;
    }
  }

  async makeTextRequest<T>(endpoint: string): Promise<T | null> {
    const url = `${this.API_BASE}${endpoint}`;
    const headers = {
      'User-Agent': this.USER_AGENT,
    };

    try {
      const response = await fetch(url, { headers });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return (await response.text()) as T;
    } catch (error) {
      console.error('Error making NWS request:', error);
      return null;
    }
  }

  getUrlBase(): string {
    return this.API_BASE;
  }

  async getStockByHTML(stock: string): Promise<string | null> {
    const data = await this.makeTextRequest<string>(
      `/acoes/${stock.toLowerCase()}`,
    );
    if (!data) return null;
    return data;
  }

  async getStockByJSON(stock: string): Promise<Ticker | null> {
    const data = await this.makeJsonRequest<Ticker>(
      `/api/rest/assets/tickers/${stock.toLowerCase()}`,
    );
    if (!data) return null;
    return data;
  }
}
