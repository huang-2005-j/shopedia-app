import React from 'react';
import { Store, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart }) {
  const discountedPrice = product.price * (1 - (product.discount_percentage || 0) / 100);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
      <div className="relative h-48 bg-slate-100 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&auto=format&fit=crop&q=60';
          }}
        />
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-rose-500 text-white text-xs font-bold px-2 py-0.5 rounded-full shadow">
            -{product.discount_percentage}%
          </div>
        )}
      </div>

      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-medium text-emerald-600 flex items-center gap-1 mb-1">
            <Store className="w-3 h-3" />
            {product.shop.name}
          </div>
          <h3 className="font-semibold text-slate-800 text-base line-clamp-1 mb-1" title={product.title}>
            {product.title}
          </h3>
          <p className="text-xs text-slate-500 line-clamp-2 mb-3">
            {product.description}
          </p>
        </div>

        <div>
          <div className="flex items-baseline gap-2 mb-3">
            <span className="text-lg font-bold text-slate-900">
              ${discountedPrice.toFixed(2)}
            </span>
            {product.discount_percentage > 0 && (
              <span className="text-xs text-slate-400 line-through">
                ${product.price.toFixed(2)}
              </span>
            )}
          </div>

          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white py-2 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition shadow-sm shadow-emerald-600/20"
          >
            <ShoppingCart className="w-4 h-4" />
            Tambah Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}