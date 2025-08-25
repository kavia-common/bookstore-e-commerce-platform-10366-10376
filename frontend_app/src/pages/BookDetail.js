import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchBookById } from '../services/api';
import { useCart } from '../context/CartContext';

export default function BookDetail() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const data = await fetchBookById(id);
        setBook(data);
      } catch {
        setBook(null);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: '20px' }}>Loading…</div>;
  if (!book) return <div className="container" style={{ padding: '20px' }}>Book not found.</div>;

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <img
            src={book.coverImage || `https://picsum.photos/seed/${book.id}/500/700`}
            alt={book.title}
            style={{ width: '100%', borderRadius: 12 }}
          />
        </div>
        <div>
          <h1>{book.title}</h1>
          <div style={{ opacity: 0.8, marginBottom: 8 }}>by {book.author}</div>
          <div style={{ fontSize: 22, fontWeight: 800 }}>${Number(book.price || 0).toFixed(2)}</div>
          <p style={{ marginTop: 12 }}>{book.description || 'No description available.'}</p>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', marginTop: 16 }}>
            <label htmlFor="qty">Qty</label>
            <input id="qty" type="number" min={1} value={qty} onChange={(e) => setQty(Number(e.target.value))} style={{ width: 80 }} />
            <button className="btn btn-primary" onClick={() => addItem(book, qty)}>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
}
