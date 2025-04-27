export interface Ticker {
  dy: string;
  dy_avg_5y: number;
  graham: Bazin;
  bazin: Bazin;
  variation_day: VariationDay;
  variation_twelve: number;
  display_quotation: number;
  display_quotation_charts: number;
  sector: TickerSector;
  balance: { [key: string]: number };
  currentQuotation: string;
  statusCurrentQuotation: string;
  lastUpdateCurrentQuotation: string;
  averageRating: number;
  graphDividendShow: boolean;
  charts: Charts;
  indicators: Indicators;
  ticker: PurpleTicker;
  tickers: FluffyTicker[];
  company: TickerCompany;
  payments: TickerPayment[];
  checklist: { [key: string]: number };
  tickers_to_compare: TickersToCompare[];
  indicators_history: { [key: string]: { [key: string]: IndicatorsHistory } };
  return: { [key: string]: Return };
  translation_fields: any[];
}

export interface Bazin {
  price: string;
  upside: number;
}

export interface Charts {
  quotations_profit: QuotationsProfit;
  payments: PaymentsPaidElement[];
  payments_paid: PaymentsPaidElement[];
  quotations: Quotations;
}

export interface PaymentsPaidElement {
  created_at: number;
  price: number;
}

export interface Quotations {
  real: Dolar[];
  dolar: Dolar[];
  euro: Dolar[];
}

export interface Dolar {
  price: number;
  created_at: string;
}

export interface QuotationsProfit {
  '2009': The2009;
  '2010': The2009;
  '2011': The2009;
  '2012': The2009;
  '2013': The2009;
  '2014': The2009;
  '2015': The2009;
  '2016': The2009;
  '2017': The2009;
  '2018': The2009;
  '2019': The2009;
  '2020': The2009;
  '2021': The2009;
  '2022': The2009;
  '2023': The2009;
  '2024': The2009;
  'U. 12M': U12M;
}

export interface The2009 {
  net_profit: number;
  quotation: number;
  year: number;
}

export interface U12M {
  net_profit: number;
  quotation: number;
  year: string;
}

export interface TickerCompany {
  id: number;
  sector_id: number;
  cnpj: string;
  simple_name: string;
  full_name: string;
  site: string;
  biography: Biography[];
  good_points: string;
  negative_points: string;
  relevant_points: null;
  year_debut: number;
  segment_list: string;
  ceo_name: string;
  total_employees: number;
  is_active: string;
  foundation_year: number;
  payout: number;
  dont_use_net_debt: string;
  last_imported_at: Date;
  ignored_ranking: string;
  display_quotation: number;
  future_ipo: string;
  ipo_image: null;
  date_ipo: null;
  thumbnail: string;
  image: string;
  biography_markdown: string;
  biography_html: string;
}

export interface Biography {
  text: string;
  title?: string;
}

export interface Indicators {
  original: { [key: string]: Original };
  compare: Compare;
}

export interface Compare {
  segment: { [key: string]: number };
  subsector: { [key: string]: number };
  sector: { [key: string]: number };
}

export interface Original {
  id: number;
  name: string;
  description: string;
  order: string;
  is_active: string;
  type: OriginalType | null;
  key: string;
  type_indicator: TypeIndicator;
  value: number;
}

export type OriginalType = 'percent' | 'decimal' | 'money_abbr';

export type TypeIndicator = 'TICKER' | 'RANKING' | 'COMPANY';

export interface IndicatorsHistory {
  year: number | string;
  key: string;
  value: number;
  type: OriginalType | null;
}

export interface TickerPayment {
  id: number;
  payment_date: Date | null;
  value: number;
  type: PaymentType;
  adjustment_factor: number;
  date_with: Date;
  adjusted_value: number;
}

export type PaymentType = 'Dividendos' | 'JSCP' | 'Bonificação';

export interface Return {
  ipca: number;
  nominal: number;
}

export interface TickerSector {
  segment: SegmentClass;
  subsector: SegmentClass;
  sector: SegmentClass;
}

export interface SegmentClass {
  name: string;
  id: number;
  url: string;
}

export interface PurpleTicker {
  id: number;
  company_id: number;
  name: string;
  dividend_yield_last_12_months: string;
  growth_net_revenue_last_5_years: null;
  growth_profit_revenue_last_5_years: null;
  total_tickers: number;
  total_tickers_vp: null;
  type: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  free_float: number;
  ratio_on: null;
  ratio_pn: null;
  tag_along: number;
  is_main: string;
  last_imported_at: Date;
  ignore_splits_and_payments: string;
  date_show_splits_and_payments: null;
  adjustment_jobs_performed: number;
  adjusted_at: Date;
  cache_clear_performed: number;
  daily_avg_liquidity: number;
  display_quotation: number;
  display_quotation_charts: number;
  ignored_ranking: number;
  image: string;
}

export interface FluffyTicker {
  id: number;
  company_id: number;
  name: string;
  is_active: number;
  is_main: string;
  display_quotation: number;
  display_quotation_charts: number;
  ignored_ranking: number;
}

export interface TickersToCompare {
  name: string;
  id: number;
  ticker_id: number;
  p_vp: number;
  p_l: number;
  vpa: number;
  lpa: number;
  p_ebitda: number;
  p_ebit: number;
  p_assets: number;
  psr: number;
  p_working_capital: number;
  p_asset_current_net: number;
  total_tickers: number;
  created_at: Date;
  updated_at: Date;
  variation_1_day: number;
  variation_5_days: number;
  variation_30_days: number;
  variation_6_months: number;
  variation_12_months: number;
  variation_5_years: number;
  variation_10_years: null | string;
  dividend_yield_last_5_years: number;
  company_id: number;
  enterprise_value: number;
  market_value: number;
  ev_ebitda: number;
  ev_ebit: number;
  gross_margin: number;
  net_margin: number;
  ebitda_margin: number;
  ebit_margin: number;
  active_turns: number;
  roic: number;
  roe: number;
  roa: number;
  net_debt_net_worth: number;
  gross_debt_net_worth: number;
  net_debt_ebitda: number;
  net_debt_ebit: number;
  net_worth_assets: number;
  liabilities_assets: number;
  current_liquidity: number;
  growth_net_revenue_last_5_years: number;
  growth_net_profit_last_5_years: number;
  balance_total_assets: number;
  balance_total_liabilities: number;
  balance_availability: number;
  balance_net_worth: number;
  balance_current_assets: number;
  balance_current_liabilities: number;
  balance_current_not_assets: number;
  balance_current_not_liabilities: number;
  balance_gross_debt: number;
  balance_net_debt: number;
  balance_ebitda: number;
  balance_ebit: number;
  balance_gross_profit: number;
  balance_net_revenue: number;
  balance_net_profit: number;
  balance_tax: number;
  balance_working_capital: number;
  payout: number;
  dy: number;
  thumbnail: string;
  full_name: string;
  url: string;
  price: number;
  total_balances: number;
  total_balances_year: number;
  company: TickersToCompareCompany;
  image: Image;
  isFollowed: boolean;
  champions: string[];
}

export interface TickersToCompareCompany {
  id: number;
  sector_id: number;
  cnpj: string;
  simple_name: string;
  full_name: string;
  site: string;
  thumbnail: string;
  image: string;
  biography: string;
  good_points: string;
  negative_points: null | string;
  relevant_points: null | string;
  year_debut: number;
  segment_list: string;
  ceo_name: string;
  total_employees: number;
  is_active: string;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  foundation_year: number;
  payout: number;
  dont_use_net_debt: string;
  last_imported_at: Date | null;
  ignored_ranking: string;
  display_quotation: number;
  future_ipo: string;
  ipo_image: null;
  date_ipo: null;
  cvm_code: number;
  tickers: CompanyTicker[];
  isFollowed: boolean;
}

export interface CompanyTicker {
  id: number;
  company_id: number;
  name: string;
  dividend_yield_last_12_months: number;
  growth_net_revenue_last_5_years: null;
  growth_profit_revenue_last_5_years: null;
  total_tickers: number | null;
  total_tickers_vp: number | null;
  type: string;
  is_active: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: null;
  free_float: number;
  ratio_on: number | null;
  ratio_pn: number | null;
  tag_along: number;
  is_main: string;
  last_imported_at: Date;
  ignore_splits_and_payments: string;
  date_show_splits_and_payments: Date | null;
  adjustment_jobs_performed: number;
  adjusted_at: Date | null;
  cache_clear_performed: number;
  daily_avg_liquidity: number;
  display_quotation: number;
  display_quotation_charts: number;
  ignored_ranking: number;
  use_on_pn: number;
  thumbnail: string;
  image: Image;
  isFollowed: boolean;
}

export interface Image {
  url: string;
}

export interface VariationDay {
  last_quotation: number;
  first_quotation: number;
  max: number;
  min: number;
  variation_money: number;
  variation_percent: number;
}
