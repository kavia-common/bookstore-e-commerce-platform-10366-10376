import React, { useMemo, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useCart } from '../context/CartContext';
import { createStripeCheckoutSession } from '../services/api';

const STRIPE_PUBLISHABLE_KEY = process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '';

export default function Checkout() {
  const { items, totals } = useCart();
  const [loading, setLoading] = useState(false);
  const stripePromise = useMemo(() => loadStripe(STRIPE_PUBLISHABLE_KEY), []);

  const handleCheckout = async () => {
    if (items.length === 0) return;
    setLoading(true);
    try {
      const payload = items.map((i) => ({ bookId: i.book.id, quantity: i.quantity }));
      const { sessionId, publicKey } = await createStripeCheckoutSession(payload);
      const stripe = await (publicKey ? loadStripe(publicKey) : stripePromise);
      await stripe.redirectToCheckout({ sessionId });
    } catch (e) {
      // eslint-disable-next-line no-alert
      alert('Unable to proceed to checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <h1>Checkout</h1>
      {items.length === 0 ? (
        <p>No items to checkout.</p>
      ) : (
        <div style={{ maxWidth: 520 }}>
          <div className="summary-line">
            <span>Items</span><span>{totals.count}</span>
          </div>
          <div className="summary-line">
            <span>Total</span><span>${totals.amount.toFixed(2)}</span>
          </div>
          <button className="btn btn-primary" disabled={loading || totals.amount <= 0} onClick={handleCheckout}>
            {loading ? 'Redirecting…' : 'Pay with Stripe'}
          </button>
          {!STRIPE_PUBLISHABLE_KEY && (
            <p style={{ marginTop: 8, color: 'tomato' }}>
              Missing REACT_APP_STRIPE_PUBLISHABLE_KEY env var. Set it to enable checkout.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
