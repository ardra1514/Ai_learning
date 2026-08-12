import React from "react";

const PageHeader = ({ title, subtitle, children }) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h1 className="text-3xl font-bold text-[var(--secondary-dark)] tracking-tight mb-2">
          {title}
        </h1>

        {subtitle && (
          <p className="text-[var(--slate-blue)] text-sm">
            {subtitle}
          </p>
        )}
      </div>

      {children && <div>{children}</div>}
    </div>
  );
};

export default PageHeader;