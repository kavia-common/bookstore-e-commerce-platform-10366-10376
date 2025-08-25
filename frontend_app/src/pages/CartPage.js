import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartContext';

export default function CartPage() {
  const { cartItems, cartTotal, removeItem, updateQuantity } = useCart();
  const navigate = useNavigate();

  if (cartItems.length === 0) {
    return (
      <div className="card" style={{ padding: 16 }}>
        <h2>Your cart is empty</h2>
        <p>Browse our catalog to add books to your cart.</p>
        <Link className="btn btn-primary" to="/">Continue shopping</Link>
      </div>
    );
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
      <h1>Shopping Cart</h1>
      <div className="card" style={{ padding: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Book</th>
              <th>Price</th>
              <th style={{ width: 140 }}>Quantity</th>
              <th>Total</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {cartItems.map(item => (
              <tr key={item.id}>
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                    <img src={item.cover} alt="" width={48} height={72} style={{ objectFit: 'cover', borderRadius: 4 }} />
                    <div>
                      <Link to={`/book/${item.id}`}>{item.title}</Link>
                      <div style={{ color: 'var(--text-secondary)', fontSize: 14 }}>{item.author}</div>
                    </div>
                  </div>
                </td>
                <td>${item.price.toFixed(2)}</td>
                <td>
                  <input
                    className="input"
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e)=>updateQuantity(item.id, parseInt(e.target.value || '1', 10))}
                    style={{ width: 80 }}
                    aria-label={`Quantity for ${item.title}`}
                  />
                </td>
                <td>${(item.quantity * item.price).toFixed(2)}</td>
                <td><button className="btn btn-secondary" onClick={()=>removeItem(item.id)}>Remove</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={{ marginLeft: 'auto' }}>
        <div className="card" style={{ padding: 16, minWidth: 280 }}>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', margin: '12px 0' }}>
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 12, color: 'var(--text-secondary)' }}>
            <span>Shipping</span>
            <span>Calculated at checkout</span>
          </div>
          <button className="btn btn-primary" onClick={()=>navigate('/checkout')}>Proceed to checkout</button>
        </div>
      </div>
    </div>
  );
}
