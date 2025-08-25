import React, { useEffect, useState } from 'react';

export default function SearchBar({ onSearch, initial = '' }) {
  const [q, setQ] = useState(initial);

  useEffect(() => {
    setQ(initial);
  }, [initial]);

  const submit = (e) => {
    e.preventDefault();
    onSearch(q.trim());
  };

  return (
    <form onSubmit={submit} className="searchbar">
      <input
        type="search"
        placeholder="Search books, authors, ISBN…"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        aria-label="Search books"
      />
      <button className="btn btn-primary" type="submit">Search</button>
    </form>
  );
}
