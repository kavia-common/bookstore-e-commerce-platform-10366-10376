import React from 'react';
import { Link } from 'react-router-dom';
import RatingStars from './RatingStars';

// PUBLIC_INTERFACE
export default function ProductCard({ book }) {
  /** Product card used in catalogs and lists. */
  return (
    <article className="card product-card">
      <Link to={`/book/${book.id}`} className="image" aria-label={`${book.title} by ${book.author} — cover`}>
        {book.badge && <span className="badge-tag">{book.badge}</span>}
        <img src={book.cover} alt={`${book.title} by ${book.author} — cover`} />
      </Link>
      <div className="content">
        <h3 className="clamp-2" style={{ margin: 0, fontSize: 16 }}>{book.title}</h3>
        <p style={{ margin: 0, color: 'var(--text-secondary)' }}>{book.author}</p>
        <RatingStars rating={book.rating} count={book.reviews} />
        <div className="price">
          <span className="current">${book.price.toFixed(2)}</span>
          {book.compareAt && <span className="compare">${book.compareAt.toFixed(2)}</span>}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
          <Link className="btn btn-primary" to={`/book/${book.id}`}>View</Link>
          <button className="btn btn-secondary" onClick={(e)=>e.preventDefault()}>♡</button>
        </div>
      </div>
    </article>
  );
}
