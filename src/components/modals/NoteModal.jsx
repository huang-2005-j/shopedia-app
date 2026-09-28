import React from 'react';
import { X } from 'lucide-react';

export default function NoteModal({ item, noteInput, setNoteInput, onSave, onClose }) {
  if (!item) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl w-full max-w-md p-5 border border-slate-200 shadow-xl space-y-4">
        <div className="flex justify-between items-center">
          <h4 className="font-bold text-slate-800 text-base">Catatan Pesanan</h4>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <p className="text-xs text-slate-500 font-medium">{item.title}</p>
        
        <textarea
          rows={3}
          value={noteInput}
          onChange={(e) => setNoteInput(e.target.value)}
          placeholder="Contoh: Tolong bubble wrap tebal, warna hitam..."
          className="w-full p-3 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
        />

        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 rounded-lg transition"
          >
            Batal
          </button>
          <button
            onClick={onSave}
            className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition"
          >
            Simpan
          </button>
        </div>
      </div>
    </div>
  );
}