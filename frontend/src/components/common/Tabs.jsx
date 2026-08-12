import React from "react";

const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <div className="space-y-8">

      {/* Tabs */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-lg shadow-slate-100 overflow-hidden">

        <nav className="flex items-center p-2 gap-2 overflow-x-auto">

          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`relative flex items-center justify-center px-6 py-3 rounded-2xl text-sm font-semibold whitespace-nowrap transition-all duration-300
                ${
                  activeTab === tab.name
                    ? "bg-gradient-to-r from-[var(--teal-dark)] to-[var(--teal)] text-white shadow-lg shadow-[var(--teal)]/20 scale-[1.02]"
                    : "text-slate-600 hover:bg-slate-100 hover:text-[var(--teal)]"
                }`}
            >
              {tab.label}

              {activeTab === tab.name && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-white/70"></span>
              )}
            </button>
          ))}

        </nav>

      </div>

      {/* Tab Content */}
      <div className="relative">

        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[var(--teal)]/5 to-[var(--light-blue)]/5"></div>

        {tabs.map((tab) => {
          if (tab.name === activeTab) {
            return (
              <div
                key={tab.name}
                className="relative bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-100 p-8 animate-in fade-in duration-300"
              >
                {tab.content}
              </div>
            );
          }

          return null;
        })}

      </div>

    </div>
  );
};

export default Tabs;