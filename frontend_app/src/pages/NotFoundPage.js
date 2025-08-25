import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className="card" style={{ padding: 16 }}>
      <h1>404</h1>
      <p>We couldn’t find the page you’re looking for.</p>
      <Link className="btn btn-primary" to="/">Back to home</Link>
    </div>
  );
}
