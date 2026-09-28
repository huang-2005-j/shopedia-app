import React from 'react';
import { Tag, CreditCard, X } from 'lucide-react';

export default function CartSummary({ 
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
  const couponDiscount = appliedCoupon ? subtotalPrice * appliedCoupon.discountRate : 0;

  return (
    <div className="lg:col-span-1 space-y-4">
      {/* Kupon Promo Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-sm font-bold text-slate-800">
          <Tag className="w-4 h-4 text-emerald-600" />
          Kupon Promo
        </div>
        <form onSubmit={onApplyCoupon} className="flex gap-2">
          <input
            type="text"
            placeholder="Kode (SHOPEDIA10)"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 uppercase"
          />
          <button
            type="submit"
            className="bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold px-4 py-2 rounded-xl transition"
          >
            Pakai
          </button>
        </form>
        {appliedCoupon && (
          <div className="text-xs text-emerald-700 bg-emerald-50 border border-emerald-200 p-2.5 rounded-xl flex items-center justify-between">
            <span>Kupon <strong>{appliedCoupon.code}</strong> aktif (-10%)</span>
            <button onClick={onRemoveCoupon} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </div>

      {/* Ringkasan Belanja Card */}
      <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h3 className="text-base font-bold text-slate-800 border-b border-slate-100 pb-3">
          Ringkasan Belanja
        </h3>

        <div className="space-y-2.5 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Total Barang Terpilih</span>
            <span className="font-semibold text-slate-800">{totalQuantity} pcs</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-800">${subtotalPrice.toFixed(2)}</span>
          </div>
          {appliedCoupon && (
            <div className="flex justify-between text-emerald-600 font-medium">
              <span>Diskon Kupon</span>
              <span>-${couponDiscount.toFixed(2)}</span>
            </div>
          )}
          <div className="border-t border-slate-100 pt-2 flex justify-between items-baseline">
            <span className="text-slate-800 font-bold">Total Pembayaran</span>
            <span className="font-bold text-emerald-600 text-xl">${grandTotal.toFixed(2)}</span>
          </div>
        </div>

        <button
          disabled={totalQuantity === 0}
          onClick={onCheckout}
          className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-300 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition flex items-center justify-center gap-2 shadow-sm shadow-emerald-600/20"
        >
          <CreditCard className="w-4 h-4" />
          Checkout Sekarang ({totalQuantity})
        </button>
      </div>
    </div>
  );
}