import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import './bookcard.css';

export default function BookCard({ book }) {
  const { addItem } = useCart();

  return (
    <div className="book-card" role="article" aria-label={book.title}>
      <Link to={`/books/${book.id}`} className="img-wrap">
        <img src={book.coverImage || `https://picsum.photos/seed/${book.id}/300/420`} alt={book.title} />
      </Link>
      <div className="details">
        <Link to={`/books/${book.id}`} className="title">{book.title}</Link>
        <div className="author">{book.author}</div>
        <div className="price">${Number(book.price || 0).toFixed(2)}</div>
        <button className="btn btn-primary btn-add" onClick={() => addItem(book, 1)}>Add to Cart</button>
      </div>
    </div>
  );
}
