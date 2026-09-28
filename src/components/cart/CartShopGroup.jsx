import React from 'react';
import { Store } from 'lucide-react';
import CartItem from './CartItem';

export default function CartShopGroup({ 
  shopName, 
  items, 
  onToggleShopCheck, 
  onRemoveShopItems, 
  onToggleCheck, 
  onUpdateQty, 
  onRemove, 
  onOpenNote 
}) {
  const allChecked = items.every(i => i.checked);

  return (
    <div className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-sm">
      <div className="bg-slate-50 px-4 py-3 border-b border-slate-200 flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={allChecked}
            onChange={(e) => onToggleShopCheck(shopName, e.target.checked)}
            className="rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
          />
          <span className="font-semibold text-sm text-slate-700 flex items-center gap-1.5">
            <Store className="w-4 h-4 text-emerald-600" />
            {shopName}
          </span>
        </label>
        <button
          onClick={() => onRemoveShopItems(shopName)}
          className="text-xs text-slate-400 hover:text-rose-600 transition"
        >
          Hapus dari toko ini
        </button>
      </div>

      <div className="divide-y divide-slate-100">
        {items.map(item => (
          <CartItem 
            key={item.id}
            item={item}
            onToggleCheck={onToggleCheck}
            onUpdateQty={onUpdateQty}
            onRemove={onRemove}
            onOpenNote={onOpenNote}
          />
        ))}
      </div>
    </div>
  );
}