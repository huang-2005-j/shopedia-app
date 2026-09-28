import React from 'react';
import { ShoppingCart, ArrowLeft, Package } from 'lucide-react';

export default function Navbar({ view, setView, cartCount }) {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <div 
          onClick={() => setView('catalog')}
          className="flex items-center gap-2 cursor-pointer select-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white shadow-md shadow-emerald-500/20">
            <Package className="w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
            Shopedia
          </span>
        </div>

        <div>
          {view === 'cart' ? (
            <button
              onClick={() => setView('catalog')}
              className="flex items-center gap-2 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Kembali Belanja
            </button>
          ) : (
            <button
              onClick={() => setView('cart')}
              className="relative p-2.5 rounded-full bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-600 transition"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center shadow">
                  {cartCount}
                </span>
              )}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}