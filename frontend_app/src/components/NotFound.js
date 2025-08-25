import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="container" style={{ padding: '40px 0', textAlign: 'center' }}>
      <h2>404 - Page Not Found</h2>
      <p>We couldn’t find what you were looking for.</p>
      <Link className="btn btn-primary" to="/">Go Home</Link>
    </div>
  );
}
