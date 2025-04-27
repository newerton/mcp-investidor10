import * as cheerio from 'cheerio';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat.js';

import { Ticker } from '../../domain/models/Investidor10Model.js';
import { Investidor10ApiService } from '../../infrastructure/services/Investidor10ApiService.js';

dayjs.extend(customParseFormat);

export class Investidor10Service {
  constructor(private apiService: Investidor10ApiService) {}

  async getStocksByHTML(stocks: string[]) {
    const baseUrl = this.apiService.getUrlBase();

    const data = [];
    for (const stock of stocks) {
      const stockData = await this.apiService.getStockByHTML(stock);

      if (!stockData) continue;

      const ticket = this.getStockInfo(stockData);
      const indicators = this.getAllIndicators(stockData);

      const jsonData = {
        code: ticket.code,
        name: ticket.name,
        price: ticket.price,
        variation: ticket.variation,
        url: `${baseUrl}/acoes/${ticket.code.toLowerCase()}`,
        image: `${baseUrl}${ticket.image}`,
        indicators,
      };
      data.push(jsonData);
    }
    return data;
  }

  async getStocksByJSON(stocks: string[]) {
    const baseUrl = this.apiService.getUrlBase();

    const data = [];
    for (const stock of stocks) {
      const stockData = await this.apiService.getStockByJSON(stock);

      if (!stockData) continue;

      const indicators = this.formatIndicators(stockData.indicators.original);
      const jsonData = {
        id: stockData.ticker.id,
        code: stockData.ticker.name,
        name: stockData.company.full_name,
        price: stockData.currentQuotation,
        variation: stockData.variation_twelve,
        url: `${baseUrl}/acoes/${stockData.ticker.name.toLowerCase()}`,
        image: stockData.ticker.image,
        indicators,
      };
      data.push(jsonData);
    }
    return data;
  }

  private getStockInfo(html: string) {
    const $ = cheerio.load(html);

    const code = $('div[class=name-ticker] h1').text().trim();
    const name = $('div[class=name-ticker] h2').text().trim();
    const image = $('div[id=header_action] .logo img').attr('src');

    const priceText = $('section[id=cards-ticker] .cotacao ._card-body')
      .text()
      .trim();
    const price = parseFloat(
      priceText.replace('R$', '').replace('.', '').replace(',', '.'),
    );

    const variationText = $('section[id=cards-ticker] .pl ._card-body')
      .text()
      .trim();
    const variation = parseFloat(
      variationText.replace('R$', '').replace('.', '').replace(',', '.'),
    );

    return {
      code,
      name,
      price,
      variation,
      image,
    };
  }

  private getAllIndicators(html: string) {
    const $ = cheerio.load(html);

    const indicatorContainer = $('div[id=table-indicators] div.cell');

    if (indicatorContainer.length === 0) {
      return [];
    }

    if (indicatorContainer.length > 0) {
      const valuationIndicators = indicatorContainer.map((_, element) => {
        const title = $(element)
          .find('span:eq(0)')
          .text()
          .trim()
          .replace('  ', ' ');
        const valueText = $(element).find('div:eq(0)').text().trim();
        const value = parseFloat(
          valueText.replace('R$', '').replace('.', '').replace(',', '.'),
        );

        return {
          title,
          value,
        };
      });

      return valuationIndicators.toArray();
    }
  }

  private formatIndicators(data: Ticker['indicators']['original']) {
    const indicators = Object.entries(data).map(([, value]) => {
      return {
        name: value.name,
        type: value.type,
        value: value.value,
      };
    });

    const sortedIndicators = indicators.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });

    const formattedIndicators = sortedIndicators.map((indicator) => {
      return {
        name: indicator.name,
        type: indicator.type,
        value: indicator.value,
      };
    });

    return formattedIndicators;
  }
}
