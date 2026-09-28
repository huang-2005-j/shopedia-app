import React from 'react';
import { Search, ArrowUpDown, Store } from 'lucide-react';

export default function FilterBar({ 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  uniqueShops, 
  selectedShops, 
  toggleShopFilter 
}) {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200/80 mb-8 space-y-4">
      <div className="flex flex-col md:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-5 h-5 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            placeholder="Cari nama atau deskripsi barang..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 text-sm"
          />
        </div>

        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-slate-400 hidden sm:block" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full md:w-auto px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-sm font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
          >
            <option value="default">Urutan Standar</option>
            <option value="price-asc">Harga: Termurah</option>
            <option value="price-desc">Harga: Termahal</option>
            <option value="discount">Diskon Tertinggi</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs font-semibold uppercase text-slate-400 tracking-wider mb-2 block">
          Filter Toko
        </label>
        <div className="flex flex-wrap gap-2">
          {uniqueShops.map(shop => {
            const isSelected = selectedShops.includes(shop.id);
            return (
              <button
                key={shop.id}
                onClick={() => toggleShopFilter(shop.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition flex items-center gap-1.5 ${
                  isSelected 
                    ? 'bg-emerald-50 border border-emerald-300 text-emerald-700 font-semibold' 
                    : 'bg-slate-100 text-slate-600 border border-transparent hover:bg-slate-200'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                {shop.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}