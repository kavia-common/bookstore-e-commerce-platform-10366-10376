import React, { createContext, useContext, useMemo, useReducer } from 'react';

const CartContext = createContext(null);

function reducer(state, action) {
  switch (action.type) {
    case 'ADD': {
      const key = action.item.id;
      const qty = (state.items[key]?.quantity || 0) + (action.quantity || 1);
      return {
        ...state,
        items: {
          ...state.items,
          [key]: { ...action.item, quantity: qty }
        }
      };
    }
    case 'REMOVE': {
      const next = { ...state.items };
      delete next[action.id];
      return { ...state, items: next };
    }
    case 'UPDATE_QTY': {
      const next = { ...state.items };
      if (next[action.id]) {
        next[action.id] = { ...next[action.id], quantity: Math.max(1, action.quantity) };
      }
      return { ...state, items: next };
    }
    case 'CLEAR':
      return { items: {} };
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, { items: {} });

  const addItem = (item, quantity = 1) => dispatch({ type: 'ADD', item, quantity });
  const removeItem = (id) => dispatch({ type: 'REMOVE', id });
  const updateQuantity = (id, quantity) => dispatch({ type: 'UPDATE_QTY', id, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR' });

  const cartItems = Object.values(state.items);
  const cartCount = cartItems.reduce((acc, i)=> acc + i.quantity, 0);
  const cartTotal = cartItems.reduce((acc, i)=> acc + i.quantity * i.price, 0);

  const value = useMemo(()=>({
    items: state.items,
    cartItems,
    cartCount,
    cartTotal,
    addItem,
    removeItem,
    updateQuantity,
    clearCart
  }), [state]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// PUBLIC_INTERFACE
export const useCart = () => {
  /** Access cart state and actions. */
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
};
