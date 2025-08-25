import React from 'react';

// PUBLIC_INTERFACE
export default function RatingStars({ rating = 0, count = 0 }) {
  /** Displays a 5-star rating with count. */
  const full = Math.floor(rating);
  const half = rating - full >= 0.5;
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i < full) return '★';
    if (i === full && half) return '⯪';
    return '☆';
  });
  return (
    <div aria-label={`Rating ${rating} out of 5`} title={`${rating} (${count})`} style={{ color: '#F59E0B' }}>
      <span aria-hidden>{stars.join(' ')}</span>
      <span style={{ marginLeft: 6, color: 'var(--text-secondary)', fontSize: 14 }}>({count})</span>
    </div>
  );
}
