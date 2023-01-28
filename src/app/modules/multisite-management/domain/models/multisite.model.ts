export interface Multisite {
  id?: string;
  rfc?: string;
  businessName?: string;
  siteName?: string;
  user?: string;
}

export interface MultisiteResponse {
  sites: Array<Multisite>;
  total: number;
}
