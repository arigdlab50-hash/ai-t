export interface CurrencyInfo {
  code: string;
  name: string;
  symbol: string;
  rate: number; // 1 USD = rate in target currency
  flag: string;
}

export const CURRENCIES: Record<string, CurrencyInfo> = {
  USD: { code: 'USD', name: 'US Dollar', symbol: '$', rate: 1.0, flag: '🇺🇸' },
  PKR: { code: 'PKR', name: 'Pakistani Rupee', symbol: 'Rs', rate: 278.5, flag: '🇵🇰' },
  EUR: { code: 'EUR', name: 'Euro', symbol: '€', rate: 0.92, flag: '🇪🇺' },
  GBP: { code: 'GBP', name: 'British Pound', symbol: '£', rate: 0.79, flag: '🇬🇧' },
  AED: { code: 'AED', name: 'UAE Dirham', symbol: 'AED', rate: 3.67, flag: '🇦🇪' },
  SAR: { code: 'SAR', name: 'Saudi Riyal', symbol: 'SAR', rate: 3.75, flag: '🇸🇦' },
  CAD: { code: 'CAD', name: 'Canadian Dollar', symbol: 'CA$', rate: 1.36, flag: '🇨🇦' },
  AUD: { code: 'AUD', name: 'Australian Dollar', symbol: 'AU$', rate: 1.52, flag: '🇦🇺' },
  JPY: { code: 'JPY', name: 'Japanese Yen', symbol: '¥', rate: 155.0, flag: '🇯🇵' },
  INR: { code: 'INR', name: 'Indian Rupee', symbol: '₹', rate: 83.5, flag: '🇮🇳' },
  CNY: { code: 'CNY', name: 'Chinese Yuan', symbol: 'CN¥', rate: 7.23, flag: '🇨🇳' },
  TRY: { code: 'TRY', name: 'Turkish Lira', symbol: '₺', rate: 32.8, flag: '🇹🇷' },
};

export const CURRENCY_LIST = Object.values(CURRENCIES);

/**
 * Converts a base USD amount to the target currency.
 */
export function convertFromUSD(amountUSD: number, currencyCode: string = 'USD'): number {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  return amountUSD * currency.rate;
}

/**
 * Formats a base USD amount into a localized currency string.
 * Example: formatCurrency(100, 'PKR') -> "Rs 27,850"
 */
export function formatCurrency(
  amountUSD: number,
  currencyCode: string = 'USD',
  showCode: boolean = false
): string {
  const currency = CURRENCIES[currencyCode] || CURRENCIES.USD;
  const converted = amountUSD * currency.rate;

  let formattedNumber = '';
  if (currency.code === 'JPY' || currency.code === 'PKR') {
    formattedNumber = Math.round(converted).toLocaleString('en-US');
  } else {
    formattedNumber = converted.toLocaleString('en-US', {
      minimumFractionDigits: 0,
      maximumFractionDigits: converted < 10 ? 2 : 0,
    });
  }

  const result = `${currency.symbol} ${formattedNumber}`;
  return showCode ? `${result} ${currency.code}` : result;
}

export interface PaymentMethodOption {
  id: string;
  name: string;
  description: string;
  iconName: string;
  category: 'card' | 'mobile_wallet' | 'bank' | 'crypto' | 'digital';
  supportedCurrencies: string[]; // empty means all
}

export const PAYMENT_METHODS: PaymentMethodOption[] = [
  {
    id: 'card',
    name: 'Credit / Debit Card',
    description: 'Visa, MasterCard, American Express, UnionPay',
    iconName: 'CreditCard',
    category: 'card',
    supportedCurrencies: [],
  },
  {
    id: 'jazzcash',
    name: 'JazzCash Mobile Wallet',
    description: 'Instant local payment via JazzCash (Pakistan)',
    iconName: 'Smartphone',
    category: 'mobile_wallet',
    supportedCurrencies: ['PKR', 'USD'],
  },
  {
    id: 'easypaisa',
    name: 'EasyPaisa Wallet',
    description: 'Instant mobile payment via EasyPaisa account',
    iconName: 'Smartphone',
    category: 'mobile_wallet',
    supportedCurrencies: ['PKR', 'USD'],
  },
  {
    id: 'raast',
    name: 'Raast Instant Bank Transfer',
    description: '0% Fee Raast ID or IBAN direct transfer',
    iconName: 'Building2',
    category: 'bank',
    supportedCurrencies: ['PKR'],
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Pay securely with your PayPal balance or linked card',
    iconName: 'Wallet',
    category: 'digital',
    supportedCurrencies: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'],
  },
  {
    id: 'applepay',
    name: 'Apple Pay / Google Pay',
    description: 'One-tap biometric instant checkout',
    iconName: 'Smartphone',
    category: 'digital',
    supportedCurrencies: [],
  },
  {
    id: 'mada',
    name: 'Mada / STC Pay',
    description: 'Direct debit payment for GCC / Saudi Arabia / UAE',
    iconName: 'CreditCard',
    category: 'card',
    supportedCurrencies: ['SAR', 'AED'],
  },
];
