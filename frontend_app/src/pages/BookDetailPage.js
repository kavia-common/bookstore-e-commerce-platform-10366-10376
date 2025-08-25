import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import RatingStars from '../components/ui/RatingStars';
import { fetchBook } from '../services/api';
import { useCart } from '../state/CartContext';

export default function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    fetchBook(id).then(setBook).catch(()=>setBook(null));
  }, [id]);

  if (!book) return <p>Loading...</p>;

  const addToCart = () => {
    addItem({
      id: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      cover: book.cover
    }, qty);
    navigate('/cart');
  };

  return (
    <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
      <nav className="breadcrumbs">
        <Link to="/">Home</Link>
        <span aria-hidden>/</span>
        <span>{book.title}</span>
      </nav>

      <div className="grid" style={{ gridTemplateColumns: '1fr', gap: 24 }}>
        <div className="card" style={{ padding: 16, display: 'grid', gap: 16 }}>
          <div style={{ display: 'grid', gap: 24, gridTemplateColumns: '1fr', alignItems: 'start' }}>
            <div className="image" style={{ maxWidth: 420, margin: '0 auto' }}>
              <img src={book.cover} alt={`${book.title} cover`} />
            </div>
            <div>
              <h1 style={{ marginTop: 0 }}>{book.title}</h1>
              <p style={{ color: 'var(--text-secondary)' }}>by {book.author}</p>
              <RatingStars rating={book.rating} count={book.reviews} />
              <div className="price" style={{ marginTop: 8 }}>
                <span className="current">${book.price.toFixed(2)}</span>
                {book.compareAt && <span className="compare">${book.compareAt.toFixed(2)}</span>}
              </div>

              <p style={{ marginTop: 16 }}>{book.description}</p>

              <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                <input
                  className="input"
                  type="number"
                  min={1}
                  value={qty}
                  onChange={(e)=>setQty(parseInt(e.target.value || '1', 10))}
                  style={{ width: 80 }}
                  aria-label="Quantity"
                />
                <button className="btn btn-primary" onClick={addToCart}>Add to cart</button>
                <button className="btn btn-secondary" onClick={(e)=>e.preventDefault()}>♡ Wishlist</button>
              </div>
            </div>
          </div>
        </div>

        <section className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Details</h3>
          <ul>
            <li>Format: Paperback</li>
            <li>Language: English</li>
            <li>ISBN: 978-1-2345-6789-0</li>
            <li>Dimensions: 6 x 9 inches</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
