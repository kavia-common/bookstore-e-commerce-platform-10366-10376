import React, { useEffect, useMemo, useState } from 'react';
import { fetchBooks } from '../services/api';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';

export default function Catalog() {
  const [q, setQ] = useState('');
  const [page, setPage] = useState(1);
  const [pageSize] = useState(12);
  const [data, setData] = useState({ items: [], total: 0 });
  const [loading, setLoading] = useState(true);

  const totalPages = useMemo(() => Math.max(1, Math.ceil((data.total || data.items.length) / pageSize)), [data, pageSize]);

  const load = async () => {
    setLoading(true);
    try {
      const res = await fetchBooks({ q, page, pageSize });
      if (res?.items) setData(res);
      else setData({ items: res || [], total: res?.length || 0 });
    } catch {
      setData({ items: [], total: 0 });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, [q, page, pageSize]);

  return (
    <div className="container" style={{ padding: '20px 0 40px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
        <h1>Catalog</h1>
        <SearchBar onSearch={(val) => { setQ(val); setPage(1); }} initial={q} />
      </div>
      {loading ? <div>Loading…</div> : (
        <>
          <div className="grid">
            {data.items.map((b) => <BookCard key={b.id} book={b} />)}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
            <button className="btn" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>Prev</button>
            <span style={{ alignSelf: 'center' }}>{page} / {totalPages}</span>
            <button className="btn" disabled={page >= totalPages} onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}
