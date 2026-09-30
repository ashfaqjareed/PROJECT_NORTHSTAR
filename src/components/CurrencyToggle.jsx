import React from 'react';
import { useCurrency } from '../contexts/CurrencyContext';

export default function CurrencyToggle() {
  const { currency, setCurrency } = useCurrency();

  const currencies = [
    { code: 'LKR', label: 'LKR' },
    { code: 'USD', label: 'USD' },
    { code: 'INR', label: 'INR' },
  ];

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-full bg-[var(--bg-alt)] border border-[var(--border)]">
      {currencies.map((c) => (
        <button
          key={c.code}
          onClick={() => setCurrency(c.code)}
          className={`px-3 py-1.5 rounded-full font-mono text-[10px] uppercase font-bold tracking-widest transition-all ${
            currency === c.code
              ? 'bg-[var(--text)] text-[var(--bg)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text)]'
          }`}
        >
          {c.label}
        </button>
      ))}
    </div>
  );
}
