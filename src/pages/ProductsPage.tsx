import React, { useState } from 'react';
import { Star, Check, ShoppingCart, Plus } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

const ProductsPage: React.FC = () => {
  const { addItem } = useCart();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [addedItems, setAddedItems] = useState<Set<string>>(new Set());

  const categories = ['all', 'Maple Story N', 'Legend Of Ymir',];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addItem(product);
    setAddedItems(prev => new Set(prev).add(product.id));
    
    // Remove the "added" state after 2 seconds
    setTimeout(() => {
      setAddedItems(prev => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Premium Cheat Maple Story N
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Choose from our collection of premium license keys. All prices in USD, pay with your preferred cryptocurrency.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 capitalize ${
                selectedCategory === category
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
              }`}
            >
              {category === 'all' ? 'All Products' : category}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pb-20">
          {filteredProducts.map((product) => (
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
                  <div>
                    <div className="text-3xl font-bold text-green-400">
                      ${product.usdPrice}
                    </div>
                    <div className="text-xs text-gray-400">
                      Instant license key delivery
                    </div>
                  </div>
                </div>

                {/* Replace Add to Cart Button with Link to Product Detail Page */}
                <button
                  onClick={() => window.location.href = `/product/${product.id}`}
                  className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white hover:transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <Plus className="w-4 h-4" />
                  <span>View Details</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;