import React from "react";
import { X } from "lucide-react";

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">

      <div className="flex items-center justify-center min-h-screen px-4 py-8">

        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="relative w-full max-w-3xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden">

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-10 h-10 rounded-xl flex items-center justify-center bg-slate-100 hover:bg-red-50 hover:text-red-500 transition"
          >
            <X className="w-5 h-5" strokeWidth={2} />
          </button>

          {/* Header */}
          <div className="px-8 py-6 border-b border-slate-200 bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)]">

            <h3 className="text-2xl font-bold text-white">
              {title}
            </h3>

            <p className="text-sm text-white/80 mt-1">
              AI Generated Result
            </p>

          </div>

          {/* Body */}
          <div className="p-8 bg-slate-50 max-h-[70vh] overflow-y-auto">
            {children}
          </div>

        </div>

      </div>

    </div>
  );
};

export default Modal;