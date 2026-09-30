import React, { createContext, useState, useContext, useEffect } from 'react';

const CurrencyContext = createContext();

export function CurrencyProvider({ children }) {
  // Try to load initial state from localStorage, default to 'LKR'
  const [currency, setCurrency] = useState(() => {
    try {
      const saved = localStorage.getItem('preferredCurrency');
      if (['LKR', 'USD', 'INR'].includes(saved)) {
        return saved;
      }
    } catch (e) {
      // Ignore
    }
    return 'LKR';
  });

  useEffect(() => {
    try {
      localStorage.setItem('preferredCurrency', currency);
    } catch (e) {
      // Ignore
    }
  }, [currency]);

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency }}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  return useContext(CurrencyContext);
}
