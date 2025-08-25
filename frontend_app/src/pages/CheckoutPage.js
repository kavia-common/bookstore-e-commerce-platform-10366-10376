import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../state/CartContext';
import { useAuth } from '../state/AuthContext';
import { createCheckoutSession } from '../services/api';
import { getEnv } from '../utils/env';

export default function CheckoutPage() {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const [email, setEmail] = useState(user?.email || '');
  const [name, setName] = useState('');
  const [processing, setProcessing] = useState(false);
  const navigate = useNavigate();
  const env = getEnv();

  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    try {
      // Placeholder for Stripe:
      // 1) Call backend to create a Session/PaymentIntent
      // 2) Use @stripe/stripe-js to redirectToCheckout or confirmCardPayment
      await createCheckoutSession({ items: cartItems, customer: { email, name } });
      clearCart();
      navigate('/orders');
    } catch (err) {
      alert('Checkout failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  if (cartItems.length === 0) {
    return <p>Your cart is empty.</p>;
  }

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
      <h1>Checkout</h1>
      {env.stripeKey ? (
        <p style={{ color: 'var(--success)' }}>Stripe key detected. Ready to integrate live checkout.</p>
      ) : (
        <p style={{ color: 'var(--warning)' }}>Stripe key not configured. Using mock checkout flow.</p>
      )}

      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
        <form className="card" onSubmit={submit} style={{ padding: 16 }}>
          <h3>Contact Information</h3>
          <div style={{ display: 'grid', gap: 12, marginTop: 8 }}>
            <label>
              <div>Email</div>
              <input className="input" type="email" required value={email} onChange={(e)=>setEmail(e.target.value)} />
            </label>
            <label>
              <div>Full Name</div>
              <input className="input" type="text" required value={name} onChange={(e)=>setName(e.target.value)} />
            </label>
          </div>

          <h3 style={{ marginTop: 16 }}>Payment</h3>
          <p style={{ color: 'var(--text-secondary)' }}>
            Integrate Stripe Elements here using @stripe/stripe-js and @stripe/react-stripe-js when backend is ready.
          </p>

          <button className="btn btn-primary" type="submit" disabled={processing}>
            {processing ? 'Processing...' : `Pay $${cartTotal.toFixed(2)}`}
          </button>
        </form>

        <aside className="card" style={{ padding: 16 }}>
          <h3>Order Summary</h3>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {cartItems.map(i => (
              <li key={i.id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                <span>{i.title} × {i.quantity}</span>
                <span>${(i.price * i.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginTop: 8 }}>
            <span>Total</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
        </aside>
      </div>
    </div>
  );
}
