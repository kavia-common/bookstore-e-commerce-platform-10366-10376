import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Cart() {
  const { items, removeItem, updateQuantity, totals, clear } = useCart();
  const navigate = useNavigate();

  const goCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <Link className="btn btn-primary" to="/catalog">Browse Books</Link>
        </div>
      ) : (
        <div className="cart-grid">
          <div className="cart-items">
            {items.map(({ book, quantity }) => (
              <div className="cart-item" key={book.id}>
                <img src={book.coverImage || `https://picsum.photos/seed/${book.id}/120/160`} alt={book.title} />
                <div className="info">
                  <Link to={`/books/${book.id}`} className="title">{book.title}</Link>
                  <div className="author">{book.author}</div>
                  <div className="price">${Number(book.price || 0).toFixed(2)}</div>
                </div>
                <div className="qty">
                  <input type="number" min={1} value={quantity} onChange={(e) => updateQuantity(book.id, Number(e.target.value))} />
                </div>
                <div className="subtotal">${(quantity * (book.price || 0)).toFixed(2)}</div>
                <button className="btn" onClick={() => removeItem(book.id)}>Remove</button>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="row"><span>Items</span><span>{totals.count}</span></div>
            <div className="row"><span>Total</span><span>${totals.amount.toFixed(2)}</span></div>
            <button className="btn btn-primary" onClick={goCheckout}>Checkout</button>
            <button className="btn" onClick={clear} style={{ marginTop: 8 }}>Clear Cart</button>
          </div>
        </div>
      )}
    </div>
  );
}
