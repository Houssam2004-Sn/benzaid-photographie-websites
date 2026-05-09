export type Currency = 'USD' | 'EUR' | 'MAD' | 'GBP';

const rates: Record<Currency, number> = {
  USD: 1,
  EUR: 0.92,
  MAD: 10.05,
  GBP: 0.78,
};

export function formatCurrency(amountUSD: number, currency: Currency = 'USD'): string {
  const amount = amountUSD * rates[currency];
  const symbols: Record<Currency, string> = { USD: '$', EUR: '€', MAD: 'MAD ', GBP: '£' };
  return `${symbols[currency]}${amount.toFixed(2)}`;
}

export function convertCurrency(amountUSD: number, currency: Currency): number {
  return amountUSD * rates[currency];
}
