import React from 'react';
import { Star, Quote } from 'lucide-react';
import { testimonials } from '../data/testimonials';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">
            What Our Customers Say
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join thousands of satisfied customers who have transformed their crypto journey with our digital products.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 hover:border-white/20 transition-all duration-300 group hover:transform hover:scale-105"
            >
              {/* Quote Icon */}
              <div className="flex items-center justify-between mb-6">
                <Quote className="w-8 h-8 text-purple-400 opacity-50" />
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>

              {/* Content */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.content}"
              </p>

              {/* Author Info */}
              <div className="flex items-center">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover mr-4"
                />
                <div>
                  <h4 className="text-white font-semibold">
                    {testimonial.name}
                  </h4>
                  <p className="text-gray-400 text-sm">
                    {testimonial.role}
                  </p>
                </div>
              </div>

              {/* Product */}
              <div className="mt-4 pt-4 border-t border-white/10">
                <p className="text-purple-400 text-sm font-medium">
                  Purchased: {testimonial.product}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">500+</div>
            <div className="text-gray-400">Happy Customers</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">50+</div>
            <div className="text-gray-400">Digital Products</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">99.9%</div>
            <div className="text-gray-400">Uptime</div>
          </div>
          <div className="text-white">
            <div className="text-3xl font-bold mb-2">24/7</div>
            <div className="text-gray-400">Support</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;