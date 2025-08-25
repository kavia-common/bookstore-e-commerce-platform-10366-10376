import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ProductCard from '../components/ui/ProductCard';
import Pagination from '../components/ui/Pagination';
import { fetchCatalog } from '../services/api';

const CATEGORIES = ['All', 'Fiction', 'Non-fiction', 'Sci-Fi', 'Romance', 'Mystery', 'Children', 'Business', 'Self-Help'];
const SORTS = ['Featured', 'Price: Low to High', 'Price: High to Low', 'Rating', 'Newest'];

export default function CatalogPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = useMemo(() => new URLSearchParams(location.search), [location.search]);
  const [category, setCategory] = useState(params.get('cat') || 'All');
  const [sort, setSort] = useState(params.get('sort') || 'Featured');
  const [page, setPage] = useState(parseInt(params.get('page') || '1', 10));
  const [q, setQ] = useState(params.get('q') || '');
  const [data, setData] = useState({ items: [], total: 0, totalPages: 1 });

  useEffect(() => {
    fetchCatalog({ q, category, sort, page }).then(setData);
  }, [q, category, sort, page]);

  useEffect(() => {
    const sp = new URLSearchParams();
    if (q) sp.set('q', q);
    if (category && category !== 'All') sp.set('cat', category);
    if (sort && sort !== 'Featured') sp.set('sort', sort);
    if (page && page !== 1) sp.set('page', String(page));
    navigate({ search: sp.toString() }, { replace: true });
  }, [q, category, sort, page, navigate]);

  return (
    <div className="catalog-layout">
      <aside className="filters">
        <div className="card" style={{ padding: 16 }}>
          <h3 style={{ marginTop: 0 }}>Filters</h3>
          <div className="chips" style={{ marginTop: 8 }}>
            {CATEGORIES.map(c => (
              <button key={c} className={`chip ${c === category ? 'active' : ''}`} onClick={()=>{ setCategory(c); setPage(1); }}>
                {c}
              </button>
            ))}
          </div>

          <div className="filter-group">
            <h4>Price</h4>
            <div className="row">
              <input className="input" type="number" placeholder="Min" style={{ width: 100 }} />
              <input className="input" type="number" placeholder="Max" style={{ width: 100 }} />
            </div>
          </div>

          <div className="filter-group">
            <h4>Format</h4>
            <div className="row"><input type="checkbox" id="hardcover" /> <label htmlFor="hardcover">Hardcover</label></div>
            <div className="row"><input type="checkbox" id="paperback" /> <label htmlFor="paperback">Paperback</label></div>
            <div className="row"><input type="checkbox" id="ebook" /> <label htmlFor="ebook">eBook</label></div>
            <div className="row"><input type="checkbox" id="audio" /> <label htmlFor="audio">Audiobook</label></div>
          </div>

          <button className="btn btn-secondary" onClick={()=>{ setCategory('All'); setSort('Featured'); setQ(''); setPage(1); }}>Clear filters</button>
        </div>
      </aside>

      <section>
        <div className="toolbar">
          <div style={{ color: 'var(--text-secondary)' }}>
            {data.total} results
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <label htmlFor="sort" style={{ color: 'var(--text-secondary)' }}>Sort</label>
            <select id="sort" className="select" value={sort} onChange={(e)=>{ setSort(e.target.value); setPage(1); }}>
              {SORTS.map(s => (<option key={s} value={s}>{s}</option>))}
            </select>
          </div>
        </div>

        <div className="product-grid" style={{ marginTop: 16 }}>
          {data.items.map(b => <ProductCard key={b.id} book={b} />)}
        </div>

        <Pagination page={page} totalPages={data.totalPages} onChange={setPage} />
      </section>
    </div>
  );
}
