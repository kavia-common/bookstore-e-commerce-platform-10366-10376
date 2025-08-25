import React from 'react';

export default function Footer() {
  return (
    <footer style={{ borderTop: '1px solid var(--border-color)', marginTop: 40 }}>
      <div className="container" style={{ padding: '16px 0', fontSize: 14, opacity: 0.8 }}>
        © {new Date().getFullYear()} BookNest. All rights reserved.
      </div>
    </footer>
  );
}
