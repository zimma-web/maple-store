import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shield, Zap, Globe, Key, Download, Lock } from 'lucide-react';
import Benefits from '../components/Benefits';
import Testimonials from '../components/Testimonials';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-lg" style={{backgroundImage: "url('/assets/background.webp')", backgroundSize: 'cover', backgroundPosition: 'center'}}></div>
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-ethereum/20 rounded-full blur-xl animate-pulse-slow"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-binance/20 rounded-full blur-xl animate-bounce-slow"></div>
        <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-usdt/20 rounded-full blur-xl animate-pulse-slow delay-1000"></div>

        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-fade-in p-8 rounded-lg">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 mb-8">
              <Key className="w-4 h-4 text-green-400 mr-2" />
              <span className="text-sm font-medium text-white">Premium Software License Keys</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
              Premium Software Licenses
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Powered by MSN HACK
              </span>
            </h1>

            {/* Subheadline */}
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              Get instant access to premium software with secure license keys. Pay with cryptocurrency and unlock powerful tools for your game.
            </p>

            {/* Feature Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <Key className="w-4 h-4 text-yellow-400 mr-2" />
                <span className="text-sm font-medium text-white">Instant License Keys</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <Lock className="w-4 h-4 text-blue-400 mr-2" />
                <span className="text-sm font-medium text-white">Secure Activation</span>
              </div>
              <div className="flex items-center px-4 py-2 bg-white/5 backdrop-blur-sm rounded-full border border-white/10">
                <Shield className="w-4 h-4 text-green-400 mr-2" />
                <span className="text-sm font-medium text-white">Blockchain Verified</span>
              </div>
            </div>

            {/* CTA Button */}
            <Link
              to="/products"
              className="group inline-flex items-center px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-lg"
            >
              <span className="mr-2">Take Your Key</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </Link>

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

      {/* Benefits Section */}
      <Benefits />
      
      {/* Testimonials */}
      {/* <Testimonials /> */}
      
      {/* Footer */}
      <Footer />
    </div>
  );
};

export default HomePage;