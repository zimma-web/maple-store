import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, Copy, X, Mail, MessageCircle, ExternalLink } from 'lucide-react';
import { getWalletAddress, getCryptoPrice } from '../utils/crypto';

interface CheckoutForm {
  email: string;
  discordUsername: string;
  country: string;
  joinDiscord: boolean;
  agreeToTerms: boolean;
}

const CheckoutPage: React.FC = () => {
  const { state, removeItem, updateQuantity, clearCart } = useCart();
  const [selectedCurrency, setSelectedCurrency] = useState<'eth' | 'usdt' | 'bnb' | 'ltc'>('eth');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentStep, setPaymentStep] = useState<'payment' | 'confirmation'>('payment');
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [form, setForm] = useState<CheckoutForm>({
    email: '',
    discordUsername: '',
    country: '',
    joinDiscord: false,
    agreeToTerms: false
  });

  const cryptoPrices = getCryptoPrice(state.total);

  const handleFormChange = (field: keyof CheckoutForm, value: string | boolean) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return form.email && form.country && form.agreeToTerms;
  };

  const handleCheckout = () => {
    if (!isFormValid()) {
      alert('Please fill in all required fields and agree to the terms.');
      return;
    }
    setShowPaymentModal(true);
    setPaymentStep('payment');
    setPaymentSuccess(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  const generateQRCode = (address: string, amount: number, currency: string) => {
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${currency}:${address}?amount=${amount}`;
  };

  const handlePaymentSent = () => {
    setPaymentStep('confirmation');
    setTimeout(() => {
      setPaymentSuccess(true);
      setPaymentStep('payment');
      // clearCart(); // Moved to close button handler
    }, 3000);
  };

  const getCurrencyColor = (currency: string) => {
    switch (currency) {
      case 'eth': return 'text-ethereum border-ethereum';
      case 'usdt': return 'text-usdt border-usdt';
      case 'bnb': return 'text-binance border-binance';
      case 'ltc': return 'text-orange-400 border-orange-400';
      default: return 'text-white border-white';
    }
  };

  const cheapestCurrency = Object.entries(cryptoPrices).reduce((min, [currency, price]) => {
    return price < min.price ? { currency, price } : min;
  }, { currency: 'eth', price: cryptoPrices.eth }).currency;

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-800 pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/50 rounded-2xl p-12 border border-gray-700/50">
            <h1 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h1>
            <p className="text-gray-300 mb-8">Add some products to your cart to get started.</p>
            <a
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors duration-300"
            >
              Browse Products
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800 pt-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Cart Items */}
          <div className="space-y-6">
            <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
              <h2 className="text-xl font-semibold text-white mb-6">Your Order</h2>
              
              <div className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-800/50 rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1">
                      <h3 className="text-white font-medium">{item.name}</h3>
                      <p className="text-gray-400 text-sm">${item.usdPrice}</p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      
                      <span className="text-white font-medium w-8 text-center">{item.quantity}</span>
                      
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="w-8 h-8 bg-gray-700 hover:bg-gray-600 rounded-full flex items-center justify-center text-white transition-colors"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-700">
                <div className="flex justify-between items-center text-xl font-bold text-white">
                  <span>Total:</span>
                  <span className="text-green-400">${state.total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Currency Selection */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h3 className="text-lg font-semibold text-white mb-4">Payment Currency</h3>
            <div className="grid grid-cols-2 gap-3">
              {(['eth', 'usdt', 'bnb', 'ltc'] as const).map((currency) => (
                <button
                  key={currency}
                  onClick={() => setSelectedCurrency(currency)}
                  className={`p-3 rounded-lg border-2 transition-all duration-300 ${
                    selectedCurrency === currency
                      ? getCurrencyColor(currency) + ' bg-opacity-20'
                      : 'text-gray-400 border-gray-600 hover:border-gray-500'
                  }`}
                >
                  <div className="text-center">
                    <div className="font-semibold">{currency.toUpperCase()}</div>
                    <div className="text-sm">
                      {cryptoPrices[currency].toFixed(6)} {currency.toUpperCase()}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          <div className="mb-4 text-sm text-yellow-300 font-semibold">
            You Can Use the network at the Smallest Fee<br />
            USDT Only ERC-20 <span className="capitalize"></span>
          </div>
          </div>

          {/* Checkout Form */}
          <div className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50">
            <h2 className="text-xl font-semibold text-white mb-6">Order Information</h2>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => handleFormChange('email', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="your@email.com"
                  required
                />
                <p className="text-xs text-gray-400 mt-1">License keys will be sent to this email</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Discord Username (Optional)
                </label>
                <input
                  type="text"
                  value={form.discordUsername}
                  onChange={(e) => handleFormChange('discordUsername', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  placeholder="username#1234"
                />
                <p className="text-xs text-gray-400 mt-1">For Discord role assignment</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Country *
                </label>
                <select
                  value={form.country}
                  onChange={(e) => handleFormChange('country', e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
                  required
                >
                  <option value="">Select Country</option>
                  <option value="US">United States</option>
                  <option value="CA">Canada</option>
                  <option value="GB">United Kingdom</option>
                  <option value="DE">Germany</option>
                  <option value="FR">France</option>
                  <option value="AU">Australia</option>
                  <option value="JP">Japan</option>
                  <option value="SG">Singapore</option>
                  <option value="ID">Indonesia</option>
                  <option value="MY">Malaysia</option>
                  <option value="TH">Thailand</option>
                  <option value="PH">Philippines</option>
                  <option value="VN">Vietnam</option>
                </select>
              </div>

              {/* Removed License Key Delivery Method section */}

              {/* Discord Community Section */}
              <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-lg p-4 border border-purple-500/30">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={form.joinDiscord}
                    onChange={(e) => handleFormChange('joinDiscord', e.target.checked)}
                    className="mt-1 mr-3 text-purple-600"
                  />
                  <div className="flex-1">
                    <label className="text-white font-medium mb-2 block">
                      Join Our Discord Community
                    </label>
                    <p className="text-gray-300 text-sm mb-3">
                      Get exclusive access to our Discord server, claim special roles based on your purchases, and connect with other users.
                    </p>
                    <a
                      href="https://discord.gg/cryptostore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors duration-300"
                    >
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Join Discord Server
                      <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                    <p className="text-yellow-300 text-sm mt-3">
                      After joining Discord, please send proof of payment to create a support ticket.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={form.agreeToTerms}
                  onChange={(e) => handleFormChange('agreeToTerms', e.target.checked)}
                  className="mt-1 mr-3 text-blue-600"
                  required
                />
                <label className="text-sm text-gray-300">
                  I agree to the <a href="#" className="text-blue-400 hover:text-blue-300">Terms of Service</a> and <a href="#" className="text-blue-400 hover:text-blue-300">Privacy Policy</a> *
                </label>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                disabled={!isFormValid()}
                className={`w-full py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
                  isFormValid()
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl'
                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                }`}
              >
                Complete Payment with {selectedCurrency.toUpperCase()}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 max-w-md w-full max-h-[90vh] overflow-y-auto">
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

            {!paymentSuccess && paymentStep === 'payment' ? (
              <div className="p-6">
                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-300">Total Amount:</span>
                    <span className="text-white font-bold">${state.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Pay with {selectedCurrency.toUpperCase()}:</span>
                    <span className={`text-lg font-bold ${getCurrencyColor(selectedCurrency).split(' ')[0]}`}>
                      {cryptoPrices[selectedCurrency].toFixed(6)} {selectedCurrency.toUpperCase()}
                    </span>
                  </div>
                </div>

                <div className="text-center mb-6">
                  <p className="text-white font-medium mb-2">Send payment to:</p>
                  <div className="bg-white p-4 rounded-lg mb-4">
                    <img
                      src={generateQRCode(getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB'), cryptoPrices[selectedCurrency], selectedCurrency)}
                      alt="Payment QR Code"
                      className="w-48 h-48 mx-auto"
                    />
                  </div>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Wallet Address</span>
                    <button
                      onClick={() => copyToClipboard(getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB'))}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-300 font-mono break-all bg-gray-700/50 p-2 rounded">
                    {getWalletAddress(selectedCurrency.toUpperCase() as 'ETH' | 'USDT' | 'BNB')}
                  </p>
                </div>

                <div className="bg-gray-800/50 rounded-lg p-4 mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">Exact Amount</span>
                    <button
                      onClick={() => copyToClipboard(cryptoPrices[selectedCurrency].toString())}
                      className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className={`text-lg font-bold ${getCurrencyColor(selectedCurrency).split(' ')[0]} bg-gray-700/50 p-2 rounded text-center`}>
                    {cryptoPrices[selectedCurrency].toFixed(6)} {selectedCurrency.toUpperCase()}
                  </p>
                </div>

                <button
                  onClick={handlePaymentSent}
                  className="w-full py-3 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  I've Sent the Payment
                </button>
              </div>
            ) : paymentStep === 'confirmation' && !paymentSuccess ? (
              <div className="p-6 text-center">
                <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-400 mx-auto mb-4"></div>
                <h4 className="text-white font-medium mb-2">Processing Payment...</h4>
                <p className="text-gray-300 text-sm">
                  Verifying your transaction and preparing your license keys...
                </p>
              </div>
            ) : paymentSuccess ? (
              <div className="p-6 text-center">
                <h4 className="text-green-400 font-semibold mb-4">Payment confirmed!</h4>
                <p className="text-white mb-4">License keys have been sent to your email address.</p>
                <p className="text-white mb-4">Please join our Discord server to claim your role.</p>
                <button
                  onClick={() => {
                    setShowPaymentModal(false);
                    setPaymentSuccess(false);
                    setPaymentStep('payment');
                    clearCart(); // Clear cart on modal close
                  }}
                  className="w-full py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-all duration-300"
                >
                  Close
                </button>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutPage;