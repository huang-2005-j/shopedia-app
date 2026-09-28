import React from 'react';
import FilterBar from './FilterBar';
import ProductCard from './ProductCard';

export default function CatalogView({ 
  products, 
  searchTerm, 
  setSearchTerm, 
  sortBy, 
  setSortBy, 
  uniqueShops, 
  selectedShops, 
  toggleShopFilter, 
  onAddToCart 
}) {
  return (
    <div>
      <FilterBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        uniqueShops={uniqueShops}
        selectedShops={selectedShops}
        toggleShopFilter={toggleShopFilter}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={onAddToCart} 
          />
        ))}
      </div>

      {products.length === 0 && (
        <div className="text-center py-20 text-slate-400">
          Tidak ada produk yang cocok dengan kriteria pencarian.
        </div>
      )}
    </div>
  );
}

