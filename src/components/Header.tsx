import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Home, Package } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { getItemCount } = useCart();
  const location = useLocation();
  const itemCount = getItemCount();

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Package className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">Maple Story N Hack</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive('/') 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>
            
            <Link
              to="/products"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 ${
                isActive('/products') 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Products</span>
            </Link>

            <Link
              to="/checkout"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors duration-300 relative ${
                isActive('/checkout') 
                  ? 'text-blue-400 bg-blue-400/10' 
                  : 'text-gray-300 hover:text-white hover:bg-gray-800'
              }`}
            >
              <ShoppingCart className="w-4 h-4" />
              <span>Cart</span>
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;