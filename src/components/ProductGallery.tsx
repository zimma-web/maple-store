import React, { useState } from 'react';
import { ExternalLink, Download, Star, Check, Copy, X } from 'lucide-react';
import { products } from '../data/products';
import { formatCryptoPrice, getWalletAddress } from '../utils/crypto';
import { Product } from '../types';

const ProductGallery: React.FC = () => {
  const [selectedCurrency, setSelectedCurrency] = useState<'eth' | 'usdt' | 'bnb'>('eth');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'confirmation'>('payment');

  const handlePurchase = (product: Product) => {
    setSelectedProduct(product);
    setShowPaymentModal(true);
    setPaymentStep('payment');
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  const copyAmount = (amount: number) => {
    navigator.clipboard.writeText(amount.toString());
    alert('Amount copied to clipboard!');
  };

  const handlePaymentSent = () => {
    setPaymentStep('confirmation');
    // Simulate processing time
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentStep('payment');
      if (selectedProduct) {
        alert(`Payment confirmed! Downloading ${selectedProduct.name}...`);
        // Trigger download
        const link = document.createElement('a');
        link.href = selectedProduct.downloadUrl;
        link.download = selectedProduct.name;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }, 3000);
  };

  const getCurrencyColor = (currency: string) => {
    switch (currency) {
      case 'eth': return 'text-ethereum border-ethereum';
      case 'usdt': return 'text-usdt border-usdt';
      case 'bnb': return 'text-binance border-binance';
      default: return 'text-white border-white';
    }
  };

  const getCurrencyBg = (currency: string) => {
    switch (currency) {
      case 'eth': return 'bg-ethereum';
      case 'usdt': return 'bg-usdt';
      case 'bnb': return 'bg-binance';
      default: return 'bg-gray-600';
    }
  };

  const generateQRCode = (address: string, amount: number, currency: string) => {
    // Simple QR code placeholder - in production, use a QR code library
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currency}:${address}?amount=${amount}`;
  };

  return (
    <section id="products" className="py-20 bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Premium Digital Products
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            High-quality digital products for developers, traders, and crypto enthusiasts.
          </p>

          {/* Currency Selector */}
          <div className="flex justify-center items-center space-x-4 mb-12">
            <span className="text-gray-400 font-medium">Pay with:</span>
            {(['eth', 'usdt', 'bnb'] as const).map((currency) => (
              <button
                key={currency}
                onClick={() => setSelectedCurrency(currency)}
                className={`px-4 py-2 rounded-full border-2 transition-all duration-300 ${
                  selectedCurrency === currency
                    ? getCurrencyColor(currency) + ' bg-opacity-20'
                    : 'text-gray-400 border-gray-600 hover:border-gray-500'
                }`}
              >
                {currency.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 group hover:transform hover:scale-105"
            >
              {/* Product Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent"></div>
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full capitalize">
                    {product.category}
                  </span>
                </div>
                <div className="absolute bottom-4 left-4 flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                  <span className="text-white text-sm ml-2">5.0</span>
                </div>
              </div>

              {/* Product Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-3 line-clamp-2">
                  {product.name}
                </h3>
                
                <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                  {product.description}
                </p>

                {/* Features */}
                <div className="space-y-2 mb-6">
                  {product.features.slice(0, 3).map((feature, index) => (
                    <div key={index} className="flex items-center text-sm text-gray-300">
                      <Check className="w-4 h-4 text-green-400 mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-6">
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getCurrencyColor(selectedCurrency).split(' ')[0]}`}>
                      {formatCryptoPrice(product.price[selectedCurrency], selectedCurrency.toUpperCase())}
                    </div>
                    <div className="text-xs text-gray-400">
                      Instant delivery
                    </div>
                  </div>
                </div>

                {/* Purchase Button */}
                <button
                  onClick={() => handlePurchase(product)}
                  className={`w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 ${getCurrencyBg(selectedCurrency)} hover:opacity-90 text-white hover:transform hover:scale-105 shadow-lg hover:shadow-xl`}
                >
                  <Download className="w-4 h-4" />
                  <span>Buy Now</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-700">
              <h3 className="text-xl font-semibold text-white">
                {paymentStep === 'payment' ? 'Complete Payment' : 'Processing Payment'}
              </h3>
              <button
                onClick={() => setShowPaymentModal(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {paymentStep === 'payment' ? (
              <div className="p-6">
                {/* Product Info */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <h4 className="text-white font-medium mb-2">{selectedProduct.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Total:</span>
                    <span className={`text-lg font-bold ${getCurrencyColor(selectedCurrency).split(' ')[0]}`}>
                      {formatCryptoPrice(selectedProduct.price[selectedCurrency], selectedCurrency.toUpperCase())}
                    </span>
                  </div>
                </div>

                {/* Payment Instructions */}
                <div className="text-center mb-6">
                  <p className="text-white font-medium mb-2">Send payment to the following address:</p>
                  <p className="text-gray-300 text-sm mb-4">
                    Your order will be automatically processed once payment is received.
                  </p>
                </div>

                {/* QR Code */}
                <div className="flex justify-center mb-6">
                  <div className="bg-white p-4 rounded-lg">
                    <img
                      src={generateQRCode(getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB'), selectedProduct.price[selectedCurrency], selectedCurrency)}
                      alt="Payment QR Code"
                      className="w-48 h-48"
                    />
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{selectedCurrency.toUpperCase()} Address</span>
                    <button
                      onClick={() => copyToClipboard(getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB'))}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-300 font-mono break-all bg-gray-700/50 p-2 rounded">
                    {getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB')}
                  </p>
                </div>

                {/* Amount */}
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Exact Amount</span>
                    <button
                      onClick={() => copyAmount(selectedProduct.price[selectedCurrency])}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                      title="Copy amount"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`text-lg font-bold ${getCurrencyColor(selectedCurrency).split(' ')[0]} bg-gray-700/50 p-2 rounded text-center`}>
                    {selectedProduct.price[selectedCurrency]} {selectedCurrency.toUpperCase()}
                  </p>
                </div>

                {/* Important Notice */}
                <div className="bg-yellow-600/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
                  <p className="text-yellow-200 text-sm">
                    <strong>Important:</strong> Make sure to send the exact amount to avoid delays. Your download will be available immediately after payment confirmation.
                  </p>
                </div>

                {/* Confirm Payment Button */}
                <button
                  onClick={handlePaymentSent}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  I've Sent the Payment
                </button>
              </div>
            ) : (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <h4 className="text-white font-medium mb-2">Processing Payment...</h4>
                <p className="text-gray-300 text-sm">
                  We're verifying your transaction on the blockchain. This usually takes a few moments.
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default ProductGallery;