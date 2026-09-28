import React from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';
import CartShopGroup from './CartShopGroup';
import CartSummary from './CartSummary';

export default function CartView({ 
  cart, 
  groupedCart, 
  isAllCartChecked, 
  toggleSelectAll, 
  clearCart, 
  setView, 
  onToggleShopCheck, 
  onRemoveShopItems, 
  onToggleCheck, 
  onUpdateQty, 
  onRemove, 
  onOpenNote,
  totalQuantity,
  subtotalPrice,
  appliedCoupon,
  couponCode,
  setCouponCode,
  onApplyCoupon,
  onRemoveCoupon,
  grandTotal,
  onCheckout
}) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-4">
        {cart.length > 0 && (
          <div className="flex items-center justify-between bg-white px-4 py-3 rounded-xl border border-slate-200">
            <label className="flex items-center gap-2 cursor-pointer text-sm font-semibold text-slate-700">
              <input
                type="checkbox"
                checked={isAllCartChecked}
                onChange={(e) => toggleSelectAll(e.target.checked)}
                className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
              />
              Pilih Semua ({cart.length} item)
            </label>
            <button 
              onClick={clearCart}
              className="text-xs font-semibold text-rose-500 hover:text-rose-600 flex items-center gap-1"
            >
              <Trash2 className="w-3.5 h-3.5" /> Hapus Semua
            </button>
          </div>
        )}

        {cart.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400 mb-3">
              <ShoppingCart className="w-8 h-8" />
            </div>
            <h3 className="text-base font-semibold text-slate-700 mb-1">Keranjang masih kosong</h3>
            <p className="text-xs text-slate-500 mb-4">Yuk cari produk impianmu dan checkout sekarang!</p>
            <button
              onClick={() => setView('catalog')}
              className="bg-emerald-600 text-white text-xs font-semibold px-4 py-2 rounded-lg"
            >
              Mulai Belanja
            </button>
          </div>
        ) : (
          Object.entries(groupedCart).map(([shopName, items]) => (
            <CartShopGroup
              key={shopName}
              shopName={shopName}
              items={items}
              onToggleShopCheck={onToggleShopCheck}
              onRemoveShopItems={onRemoveShopItems}
              onToggleCheck={onToggleCheck}
              onUpdateQty={onUpdateQty}
              onRemove={onRemove}
              onOpenNote={onOpenNote}
            />
          ))
        )}
      </div>

      {cart.length > 0 && (
        <CartSummary 
          totalQuantity={totalQuantity}
          subtotalPrice={subtotalPrice}
          appliedCoupon={appliedCoupon}
          couponCode={couponCode}
          setCouponCode={setCouponCode}
          onApplyCoupon={onApplyCoupon}
          onRemoveCoupon={onRemoveCoupon}
          grandTotal={grandTotal}
          onCheckout={onCheckout}
        />
      )}
    </div>
  );
}