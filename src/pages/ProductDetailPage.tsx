import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { Check, ArrowLeft } from 'lucide-react';
import { getCryptoPrice } from '../utils/crypto';

const ProductDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-800 flex items-center justify-center text-white">
        <p>Product not found.</p>
      </div>
    );
  }

  const handleAddToCart = () => {
    addItem(product);
    navigate('/checkout');
  };

  return (
    <div className="min-h-screen bg-gray-800 pt-8 px-4 max-w-7xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-6 flex items-center text-blue-500 hover:text-blue-400"
      >
        <ArrowLeft className="mr-2" /> Back to Home
      </button>

      <div className="bg-gray-900 rounded-2xl p-6 border border-gray-700 flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex flex-col items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full rounded-lg object-cover mb-6"
          />
          {product.youtubePreviewUrl && (
            <iframe
              width="100%"
              height="315"
              src={product.youtubePreviewUrl}
              title="YouTube video preview"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          )}
        </div>
        <div className="md:w-1/2 flex flex-col justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-4">{product.name}</h1>
            <p className="text-gray-300 mb-4 font-semibold">Deskripsi Singkat Fitur / Apa yang Didapat:</p>
            <p className="text-gray-300 mb-4">{product.description}</p>
            <ul className="list-disc list-inside text-gray-300 mb-6">
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-400 mb-6">${product.usdPrice}</div>
            <button
              onClick={handleAddToCart}
              className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg font-semibold transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              <Check className="w-5 h-5" />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
