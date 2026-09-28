import React from 'react';
import { Minus, Plus, Trash2, Edit3 } from 'lucide-react';

export default function CartItem({ item, onToggleCheck, onUpdateQty, onRemove, onOpenNote }) {
  const discountedPrice = item.price * (1 - (item.discount_percentage || 0) / 100);

  return (
    <div className="p-4 flex gap-4 items-start">
      <input
        type="checkbox"
        checked={item.checked}
        onChange={() => onToggleCheck(item.id)}
        className="mt-1 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 w-4 h-4 cursor-pointer"
      />

      <img
        src={item.images[0]}
        alt={item.title}
        className="w-20 h-20 rounded-xl object-cover border border-slate-200 flex-shrink-0"
        onError={(e) => {
          e.target.src = 'https://images.unsplash.com/photo-1560393464-5c69a73c5770?w=600&auto=format&fit=crop&q=60';
        }}
      />

      <div className="flex-1">
        <h4 className="text-sm font-semibold text-slate-800 mb-1">{item.title}</h4>
        <div className="flex items-baseline gap-2 mb-2">
          <span className="text-sm font-bold text-slate-900">${discountedPrice.toFixed(2)}</span>
          {item.discount_percentage > 0 && (
            <span className="text-xs text-slate-400 line-through">${item.price.toFixed(2)}</span>
          )}
        </div>

        {/* Note Trigger */}
        <div className="flex items-center gap-2 mb-3">
          <button
            onClick={() => onOpenNote(item)}
            className="text-xs text-emerald-600 hover:text-emerald-700 flex items-center gap-1 font-medium bg-emerald-50 px-2 py-0.5 rounded"
          >
            <Edit3 className="w-3 h-3" />
            {item.note ? 'Ubah Catatan' : 'Tulis Catatan'}
          </button>
          {item.note && (
            <span className="text-xs text-slate-500 italic max-w-xs truncate">
              "{item.note}"
            </span>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center border border-slate-200 rounded-lg overflow-hidden bg-slate-50">
            <button
              onClick={() => onUpdateQty(item.id, -1)}
              className="p-1.5 hover:bg-slate-200 transition text-slate-600"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <span className="px-3 text-xs font-semibold text-slate-800">
              {item.quantity}
            </span>
            <button
              onClick={() => onUpdateQty(item.id, 1)}
              className="p-1.5 hover:bg-slate-200 transition text-slate-600"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
          </div>

          <button
            onClick={() => onRemove(item.id)}
            className="text-xs text-rose-500 hover:text-rose-600 p-1"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}