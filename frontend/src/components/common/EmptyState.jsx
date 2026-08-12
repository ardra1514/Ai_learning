import React from "react";
import { FileText, Plus } from "lucide-react";

const EmptyState = ({
  onActionClick,
  title,
  description,
  buttonText,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-8 text-center bg-white rounded-3xl border border-slate-200 shadow-lg">

      {/* Icon */}
      <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--teal-dark)] to-[var(--teal)] flex items-center justify-center shadow-xl shadow-[var(--teal)]/20 mb-8">
        <FileText
          className="w-12 h-12 text-white"
          strokeWidth={2}
        />
      </div>

      {/* Title */}
      <h3 className="text-3xl font-bold text-[var(--secondary-dark)] mb-4">
        {title}
      </h3>

      {/* Description */}
      <p className="max-w-xl text-[15px] leading-7 text-[var(--slate-blue)] mb-10">
        {description}
      </p>

      {/* Action Button */}
      {buttonText && (
        <button
          onClick={onActionClick}
          className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white font-semibold shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
        >
          <Plus
            className="w-5 h-5"
            strokeWidth={2.5}
          />

          {buttonText}
        </button>
      )}

    </div>
  );
};

export default EmptyState;