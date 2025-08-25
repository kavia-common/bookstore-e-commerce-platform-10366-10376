import React, { useEffect, useState } from 'react';
import { format } from 'date-fns';
import { fetchOrders } from '../services/api';

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchOrders();
        setOrders(data || []);
      } catch {
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <h1>Your Orders</h1>
      {loading ? (
        <div>Loading…</div>
      ) : orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        <div className="orders">
          {orders.map((o) => (
            <div key={o.id} className="order">
              <div className="row">
                <strong>Order #</strong><span>{o.id}</span>
              </div>
              <div className="row">
                <strong>Date</strong><span>{o.createdAt ? format(new Date(o.createdAt), 'PPpp') : '-'}</span>
              </div>
              <div className="row">
                <strong>Total</strong><span>${Number(o.total || 0).toFixed(2)}</span>
              </div>
              <div className="items">
                {(o.items || []).map((it) => (
                  <div key={it.id} className="item">
                    <span>{it.title} × {it.quantity}</span>
                    <span>${Number(it.price || 0).toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
