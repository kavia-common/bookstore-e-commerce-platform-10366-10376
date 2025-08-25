import React from 'react';

export default function Loader({ label = 'Loading...' }) {
  return (
    <div style={{ padding: '40px', textAlign: 'center', opacity: 0.8 }}>
      <span role="status" aria-live="polite">⏳ {label}</span>
    </div>
  );
}
