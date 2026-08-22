"use client";

import React, { useEffect, useState } from "react";
import { toast, ToastMessage } from "@/lib/toast";
import { CheckCircle2, XCircle, AlertCircle, Info, X } from "lucide-react";

export function Toaster() {
  const [toastList, setToastList] = useState<ToastMessage[]>([]);

  useEffect(() => {
    return toast.subscribe((items) => {
      setToastList(items);
    });
  }, []);

  if (toastList.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
      {toastList.map((t) => (
        <div
          key={t.id}
          className={`pointer-events-auto flex items-start gap-3 p-4 rounded-md shadow-xl border text-sm transition-all duration-300 animate-in fade-in slide-in-from-top-4 ${
            t.type === "success"
              ? "bg-white border-emerald-300 text-slate-800"
              : t.type === "error"
              ? "bg-white border-red-300 text-slate-800"
              : "bg-white border-blue-300 text-slate-800"
          }`}
        >
          {t.type === "success" && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />}
          {t.type === "error" && <XCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />}
          {t.type === "info" && <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />}
          {t.type === "warning" && <AlertCircle className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />}

          <div className="flex-1 min-w-0">
            {t.title && <p className="font-semibold leading-snug">{t.title}</p>}
            {t.description && <p className="text-xs text-slate-500 mt-1">{t.description}</p>}
          </div>

          <button
            type="button"
            onClick={() => toast.dismiss(t.id)}
            className="text-slate-400 hover:text-slate-600 transition-colors p-0.5"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
}

export { toast };
