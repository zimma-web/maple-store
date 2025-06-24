export interface Product {
  id: string;
  name: string;
  description: string;
  image: string;
  usdPrice: number;
  price: {
    eth: number;
    usdt: number;
    bnb: number;
  };
  features: string[];
  downloadUrl: string;
  category: 'Maple Story N' | 'Legend Of Ymir';
  youtubePreviewUrl?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
  product: string;
}

export interface WalletAddress {
  currency: 'ETH' | 'USDT' | 'BNB' | 'LTC';
  address: string;
  network: string;
}

export interface PaymentRequest {
  productId: string;
  currency: 'ETH' | 'USDT' | 'BNB' | 'LTC';
  amount: number;
  walletAddress: string;
}