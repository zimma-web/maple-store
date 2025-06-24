import React from 'react';
import { Download, Shield, Clock, Globe, Headphones, Award } from 'lucide-react';

const Benefits: React.FC = () => {
  const benefits = [
    {
      icon: Download,
      title: 'Instant Access',
      description: 'Download your digital products immediately after payment confirmation on the blockchain.',
      color: 'text-blue-400'
    },
    {
      icon: Shield,
      title: 'Secure Payments',
      description: 'All transactions are secured by blockchain technology with no intermediaries.',
      color: 'text-green-400'
    },
    {
      icon: Clock,
      title: '24/7 Availability',
      description: 'Purchase and download products anytime, anywhere in the world.',
      color: 'text-purple-400'
    },
    {
      icon: Globe,
      title: 'Global Access',
      description: 'No geographical restrictions or currency conversion fees.',
      color: 'text-yellow-400'
    },
    {
      icon: Headphones,
      title: 'Premium Support',
      description: 'Get dedicated support for all your digital product needs.',
      color: 'text-pink-400'
    },
    {
      icon: Award,
      title: 'Quality Guaranteed',
      description: 'All products are carefully curated and tested by industry experts.',
      color: 'text-indigo-400'
    }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            Why Choose Our Digital Products?
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience the future of digital commerce with cryptocurrency-powered transactions and instant delivery.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group bg-gray-800/50 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 hover:border-gray-600/50 transition-all duration-300 hover:transform hover:scale-105"
            >
              <div className={`w-12 h-12 rounded-lg bg-gray-700/50 flex items-center justify-center mb-6 group-hover:bg-gray-700 transition-colors duration-300`}>
                <benefit.icon className={`w-6 h-6 ${benefit.color}`} />
              </div>
              
              <h3 className="text-xl font-semibold text-white mb-4">
                {benefit.title}
              </h3>
              
              <p className="text-gray-300 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Benefits;