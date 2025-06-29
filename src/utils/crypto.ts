import { WalletAddress, PaymentRequest } from '../types';

// Wallet addresses for receiving payments
export const WALLET_ADDRESSES: WalletAddress[] = [
  {
    currency: 'ETH',
    address: '0x6C8873699222A024A8d2bBd9dCd951A53C8ca5d4',
    network: 'Ethereum'
  },
  {
    currency: 'USDT',
    address: '0x6C8873699222A024A8d2bBd9dCd951A53C8ca5d4',
    network: 'Ethereum (ERC-20)'
  },
  {
    currency: 'BNB',
    address: '0x6C8873699222A024A8d2bBd9dCd951A53C8ca5d4',
    network: 'BSC (BEP-20)'
  },
  {
    currency: 'LTC',
    address: 'LPr7ccnzhHs81MJxqT1FSkV7wijVpCiSqi',
    network: 'Litecoin'
  }
];

// Mock crypto prices (in production, fetch from API)
const CRYPTO_PRICES_USD = {
  eth: 2392,
  usdt: 1,
  bnb: 639,
  ltc: 84
};

export const formatCryptoPrice = (amount: number, currency: string): string => {
  return `${amount.toFixed(6)} ${currency}`;
};

export const getWalletAddress = (currency: 'ETH' | 'USDT' | 'BNB' | 'LTC'): string => {
  const wallet = WALLET_ADDRESSES.find(w => w.currency === currency);
  return wallet?.address || '';
};

export const getCryptoPrice = (usdAmount: number) => {
  return {
    eth: usdAmount / CRYPTO_PRICES_USD.eth,
    usdt: usdAmount / CRYPTO_PRICES_USD.usdt,
    bnb: usdAmount / CRYPTO_PRICES_USD.bnb,
    ltc: usdAmount / CRYPTO_PRICES_USD.ltc
  };
};

export const generatePaymentQR = (address: string, amount: number, currency: string): string => {
  return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currency}:${address}?amount=${amount}`;
};

export const validatePaymentAmount = (amount: number, currency: string): boolean => {
  if (amount <= 0) return false;
  
  switch (currency.toUpperCase()) {
    case 'ETH':
      return amount >= 0.001;
    case 'USDT':
      return amount >= 1;
    case 'BNB':
      return amount >= 0.01;
    case 'LTC':
      return amount >= 0.01;
    default:
      return false;
  }
};
