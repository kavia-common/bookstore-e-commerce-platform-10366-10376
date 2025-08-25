import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

// PUBLIC_INTERFACE
export const CartContext = createContext(null);

// PUBLIC_INTERFACE
export function useCart() {
  /** Hook to access cart context */
  return useContext(CartContext);
}

// PUBLIC_INTERFACE
export function CartProvider({ children }) {
  /** Provides shopping cart state and operations across the app */
  const [items, setItems] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const raw = localStorage.getItem('cart_items');
    if (raw) {
      try {
        setItems(JSON.parse(raw));
      } catch {
        setItems([]);
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(items));
  }, [items]);

  const addItem = (book, quantity = 1) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i.book.id === book.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = { ...next[idx], quantity: next[idx].quantity + quantity };
        return next;
      }
      return [...prev, { book, quantity }];
    });
  };

  const removeItem = (bookId) => {
    setItems((prev) => prev.filter((i) => i.book.id !== bookId));
  };

  const updateQuantity = (bookId, quantity) => {
    setItems((prev) =>
      prev.map((i) => (i.book.id === bookId ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  };

  const clear = () => setItems([]);

  const totals = useMemo(() => {
    const count = items.reduce((acc, i) => acc + i.quantity, 0);
    const amount = items.reduce((acc, i) => acc + i.quantity * (i.book.price || 0), 0);
    return { count, amount };
  }, [items]);

  const value = { items, addItem, removeItem, updateQuantity, clear, totals };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
