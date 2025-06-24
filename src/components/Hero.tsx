import React from 'react';
import { ArrowRight, Shield, Zap, Globe } from 'lucide-react';

const Hero: React.FC = () => {
  const scrollToProducts = () => {
    const productsSection = document.getElementById('products');
    productsSection?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=%2260%22 height=%2260%22 viewBox=%220 0 60 60%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cg fill=%22none%22 fill-rule=%22evenodd%22%3E%3Cg fill=%22%23ffffff%22 fill-opacity=%220.03%22%3E%3Ccircle cx=%2230%22 cy=%2230%22 r=%222%22/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-ethereum/20 rounded-full blur-xl animate-pulse-slow"></div>
      <div className="absolute bottom-20 right-10 w-32 h-32 bg-binance/20 rounded-full blur-xl animate-bounce-slow"></div>
      <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-usdt/20 rounded-full blur-xl animate-pulse-slow delay-1000"></div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-in">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
            <Shield className="w-4 h-4 text-green-400 mr-2" />
            <span className="text-sm font-medium text-white">Secure Crypto Payments Only</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Premium Digital Products
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              Powered by Crypto
            </span>
          </h1>

          {/* Subheadline */}
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
            Discover exclusive digital courses, templates, and tools. Pay securely with cryptocurrency and get instant access to premium content.
          </p>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Zap className="w-4 h-4 text-yellow-400 mr-2" />
              <span className="text-sm font-medium text-white">Instant Download</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Globe className="w-4 h-4 text-blue-400 mr-2" />
              <span className="text-sm font-medium text-white">Global Access</span>
            </div>
            <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
              <Shield className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-white">Blockchain Verified</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            onClick={scrollToProducts}
            className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
          >
            <span className="mr-2">Buy with Crypto</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>

          {/* Crypto Currencies */}
          <div className="mt-12 flex justify-center items-center space-x-8 text-gray-400">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-ethereum rounded-full mr-2"></div>
              <span className="text-sm font-medium">Ethereum</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-usdt rounded-full mr-2"></div>
              <span className="text-sm font-medium">USDT</span>
            </div>
            <div className="flex items-center">
              <div className="w-8 h-8 bg-binance rounded-full mr-2"></div>
              <span className="text-sm font-medium">BNB</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;