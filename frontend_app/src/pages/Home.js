import React, { useEffect, useState } from 'react';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

export default function Home() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  const load = async (q) => {
    setLoading(true);
    try {
      const data = await fetchBooks({ q, page: 1, pageSize: 8 });
      setBooks(data.items || data || []);
    } catch (e) {
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load('');
  }, []);

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <section style={{ textAlign: 'center', padding: '30px 0' }}>
        <h1>Discover Your Next Favorite Book</h1>
        <p style={{ opacity: 0.8, maxWidth: 680, margin: '8px auto 16px' }}>
          Browse our curated selection of books across genres. Search by title, author, or keywords.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <SearchBar onSearch={(q) => load(q)} />
        </div>
      </section>
      <section>
        <h2>Featured Books</h2>
        {loading ? (
          <div>Loading…</div>
        ) : (
          <div className="grid">
            {books.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
        )}
      </section>
    </div>
  );
}
