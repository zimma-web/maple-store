import React from 'react';
import { Mail, MessageCircle, Twitter, Github, Copy, ExternalLink } from 'lucide-react';
import { WALLET_ADDRESSES } from '../utils/crypto';

const Footer: React.FC = () => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Address copied to clipboard!');
  };

  const socialLinks = [
    { icon: MessageCircle, href: 'https://telegram.me/MapleStoryUniverseN', label: 'Telegram' },
  ];

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <h3 className="text-2xl font-bold text-white mb-4">Maple Story N Hack</h3>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Your trusted source for premium digital products. Secure, instant, and powered by blockchain technology.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-colors duration-300"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['Products', 'About Us', 'FAQ', 'Support', 'Terms of Service', 'Privacy Policy'].map((link) => (
                <li key={link}>
                  <a href="#" className="text-gray-300 hover:text-white transition-colors duration-300">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Payment Addresses */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Payment Addresses</h4>
            <div className="space-y-4">
              {WALLET_ADDRESSES.map((wallet) => (
                <div key={wallet.currency} className="bg-gray-800/50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-white">{wallet.currency}</span>
                    <button
                      onClick={() => copyToClipboard(wallet.address)}
                      className="text-gray-400 hover:text-white transition-colors duration-300"
                      title="Copy address"
                    >
                      <Copy className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mb-1">{wallet.network}</p>
                  <p className="text-xs text-gray-300 font-mono break-all">
                    {wallet.address}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contact Us</h4>
            <div className="space-y-3">
              <div className="flex items-center text-gray-300">
                <MessageCircle className="w-5 h-5 mr-3 text-gray-400" />
                <a href="https://telegram.me/MapleStoryUniverseN" className="hover:text-white transition-colors duration-300">
                  Telegram Support
                </a>
              </div>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg border border-blue-500/30">
              <p className="text-sm text-gray-300 mb-2">
                <strong className="text-white">Security Notice:</strong>
              </p>
              <p className="text-xs text-gray-400">
                Always verify our official wallet addresses before making payments. We only accept payments to the addresses listed above.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2025 Maple Story N Hack. All rights reserved. Built with ❤️ for the crypto community.
          </p>
          <div className="flex items-center space-x-4 text-sm text-gray-400">
            <span>Powered by</span>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-ethereum rounded-full"></div>
              <span>Ethereum</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 bg-binance rounded-full"></div>
              <span>BSC</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
