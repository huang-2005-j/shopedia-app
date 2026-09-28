import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function Toast({ message }) {
  if (!message) return null;
  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-sm px-4 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-bounce">
      <CheckCircle className="w-4 h-4 text-emerald-400" />
      <span>{message}</span>
    </div>
  );
}