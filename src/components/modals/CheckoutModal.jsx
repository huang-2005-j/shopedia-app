import React from 'react';
import { X } from 'lucide-react';

export default function CheckoutModal({ 
  isOpen, 
  onClose, 
  checkedItems, 
  subtotalPrice, 
  appliedCoupon, 
  grandTotal, 
  onConfirmPayment 
}) {
  if (!isOpen) return null;

  const couponDiscount = appliedCoupon ? subtotalPrice * appliedCoupon.discountRate : 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-6 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center border-b border-slate-100 pb-3">
          <h4 className="font-bold text-slate-800 text-lg">Konfirmasi Pesanan</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Rincian Barang Terpilih</p>
          <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
            {checkedItems.map(item => {
              const itemFinal = item.price * (1 - (item.discount_percentage || 0) / 100);
              return (
                <div key={item.id} className="py-2 flex justify-between text-xs">
                  <div>
                    <p className="font-semibold text-slate-800">{item.title}</p>
                    <p className="text-slate-400">{item.quantity} x ${itemFinal.toFixed(2)} {item.note && `("${item.note}")`}</p>
                  </div>
                  <span className="font-bold text-slate-700">${(itemFinal * item.quantity).toFixed(2)}</span>
                </div>
              );
            })}
          </div>

          <div className="bg-slate-50 p-4 rounded-xl space-y-1.5 text-xs text-slate-600">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span className="font-semibold text-slate-800">${subtotalPrice.toFixed(2)}</span>
            </div>
            {appliedCoupon && (
              <div className="flex justify-between text-emerald-600">
                <span>Diskon Kupon ({appliedCoupon.code}):</span>
                <span>-${couponDiscount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold text-slate-900 text-sm pt-2 border-t border-slate-200">
              <span>Total Tagihan:</span>
              <span className="text-emerald-600">${grandTotal.toFixed(2)}</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2 pt-2">
          <button
            onClick={onClose}
            className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-xl transition"
          >
            Kembali
          </button>
          <button
            onClick={onConfirmPayment}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl transition shadow-md shadow-emerald-600/20"
          >
            Bayar Sekarang
          </button>
        </div>
      </div>
    </div>
  );
}