import React, { useEffect, useState } from 'react';
import { fetchOrders } from '../services/api';
import { useAuth } from '../state/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

export default function OrderHistoryPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/auth/login');
      return;
    }
    fetchOrders(user.id).then(setOrders);
  }, [user, navigate]);

  if (!user) return null;

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
      <h1>Your Orders</h1>
      <div className="card" style={{ padding: 16 }}>
        <table className="table">
          <thead>
            <tr>
              <th>Order</th>
              <th>Date</th>
              <th>Items</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(o => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{new Date(o.date).toLocaleString()}</td>
                <td>
                  {o.items.map(it => (
                    <div key={it.id} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <img src={it.cover} alt="" width={24} height={36} style={{ objectFit: 'cover', borderRadius: 2 }} />
                      <Link to={`/book/${it.id}`}>{it.title}</Link>
                      <span style={{ color: 'var(--text-secondary)' }}>×{it.quantity}</span>
                    </div>
                  ))}
                </td>
                <td>${o.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
