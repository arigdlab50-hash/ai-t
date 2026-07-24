import React from 'react';
import { CURRENCY_LIST, CurrencyInfo } from '../data/currencies';
import { Globe, X, Check, Sparkles, DollarSign } from 'lucide-react';

interface CurrencySelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedCurrency: string;
  onSelectCurrency: (code: string) => void;
}

export const CurrencySelectorModal: React.FC<CurrencySelectorModalProps> = ({
  isOpen,
  onClose,
  selectedCurrency,
  onSelectCurrency,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-5 shadow-2xl relative border border-slate-200">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-extrabold text-slate-900 text-lg">Select Payment Currency</h3>
            <p className="text-xs text-slate-500">
              All ticket prices, hotel rates & travel estimates will automatically convert
            </p>
          </div>
        </div>

        <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100 text-xs text-blue-900 flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
          <span>
            Pay in <strong>PKR, USD, EUR, GBP, AED, SAR</strong> or any preferred currency with live conversion rates!
          </span>
        </div>

        {/* Currency Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-80 overflow-y-auto pr-1">
          {CURRENCY_LIST.map((currency) => {
            const isSelected = selectedCurrency === currency.code;
            return (
              <button
                key={currency.code}
                onClick={() => {
                  onSelectCurrency(currency.code);
                  onClose();
                }}
                className={`p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-blue-600 text-white border-blue-600 shadow-md ring-2 ring-blue-400/40'
                    : 'bg-slate-50 hover:bg-slate-100 text-slate-800 border-slate-200/80'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{currency.flag}</span>
                  <div>
                    <div className="flex items-center gap-1.5 font-bold text-xs">
                      <span>{currency.code}</span>
                      <span className={isSelected ? 'text-cyan-200' : 'text-slate-500'}>
                        ({currency.symbol})
                      </span>
                    </div>
                    <span className={`text-[10px] ${isSelected ? 'text-slate-100' : 'text-slate-500'}`}>
                      {currency.name}
                    </span>
                  </div>
                </div>

                {isSelected ? (
                  <div className="w-6 h-6 rounded-full bg-white text-blue-600 flex items-center justify-center shrink-0">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                ) : (
                  <span className="text-[10px] font-semibold text-slate-400">
                    1 USD = {currency.rate} {currency.code}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <span>Rates updated live for 2026</span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs"
          >
            Apply Currency
          </button>
        </div>
      </div>
    </div>
  );
};
