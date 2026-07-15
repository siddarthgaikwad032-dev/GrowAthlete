import React, { useState, useEffect, useCallback } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

let toastId = 0;
let addToastFn = null;

export function toast(message, type = 'success') {
  if (addToastFn) addToastFn({ id: ++toastId, message, type });
}

const icons = {
  success: <CheckCircle className="w-4 h-4 text-green-500 flex-shrink-0" />,
  error: <XCircle className="w-4 h-4 text-red-500 flex-shrink-0" />,
  info: <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />,
};

const bg = {
  success: 'bg-white border-green-200',
  error: 'bg-white border-red-200',
  info: 'bg-white border-blue-200',
};

function ToastItem({ toast: t, onRemove }) {
  useEffect(() => {
    const timer = setTimeout(() => onRemove(t.id), 3500);
    return () => clearTimeout(timer);
  }, [t.id, onRemove]);

  return (
    <div className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg border ${bg[t.type]} animate-in slide-in-from-right duration-300 min-w-[240px] max-w-[360px]`}>
      {icons[t.type]}
      <span className="text-sm font-semibold text-slate-700 flex-1">{t.message}</span>
      <button onClick={() => onRemove(t.id)} className="text-slate-300 hover:text-slate-500 transition-colors">
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

export default function ToastContainer() {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback((t) => setToasts(prev => [...prev, t]), []);
  const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);

  useEffect(() => {
    addToastFn = addToast;
    return () => { addToastFn = null; };
  }, [addToast]);

  return (
    <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 items-end">
      {toasts.map(t => <ToastItem key={t.id} toast={t} onRemove={removeToast} />)}
    </div>
  );
}
