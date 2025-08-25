import React from 'react';

// PUBLIC_INTERFACE
export default function Pagination({ page, totalPages, onChange }) {
  /** Basic pagination control */
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 16 }}>
      <button className="btn" disabled={page === 1} onClick={()=>onChange(page-1)}>Prev</button>
      {pages.map(p => (
        <button
          key={p}
          className="btn"
          style={p === page ? { background: 'var(--primary)', color: '#fff' } : {}}
          onClick={()=>onChange(p)}
        >
          {p}
        </button>
      ))}
      <button className="btn" disabled={page === totalPages} onClick={()=>onChange(page+1)}>Next</button>
    </div>
  );
}
