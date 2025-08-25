import React, { useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../state/CartContext';
import { useAuth } from '../../state/AuthContext';

const Header = () => {
  const [query, setQuery] = useState('');
  const { cartCount } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const onSearchSubmit = (e) => {
    e.preventDefault();
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  return (
    <>
      <Link to="/" className="brand" aria-label="Bookstore Home">Bookstore</Link>

      <nav className="nav" aria-label="Primary">
        <NavLink to="/" end>Home</NavLink>
        <a href="#categories" onClick={(e)=>e.preventDefault()}>Categories</a>
        <a href="#bestsellers" onClick={(e)=>e.preventDefault()}>Bestsellers</a>
        <a href="#new" onClick={(e)=>e.preventDefault()}>New Arrivals</a>
        <a href="#deals" onClick={(e)=>e.preventDefault()}>Deals</a>
        <a href="#about" onClick={(e)=>e.preventDefault()}>About</a>
      </nav>

      <form className="search" role="search" onSubmit={onSearchSubmit}>
        <div className="search-field">
          <span className="icon" aria-hidden>🔎</span>
          <input
            className="input"
            type="search"
            placeholder="Search books, authors, ISBN..."
            value={query}
            onChange={(e)=>setQuery(e.target.value)}
            aria-label="Search"
          />
        </div>
      </form>

      <div className="header-actions">
        {user ? (
          <>
            <button className="icon-btn" title="Account" aria-label="Account" onClick={()=>navigate('/orders')}>👤</button>
            <button className="icon-btn" title="Logout" aria-label="Logout" onClick={logout}>⎋</button>
          </>
        ) : (
          <>
            <button className="icon-btn" title="Login" aria-label="Login" onClick={()=>navigate('/auth/login')}>👤</button>
          </>
        )}
        <button className="icon-btn" title="Wishlist" aria-label="Wishlist" onClick={(e)=>e.preventDefault()}>♡</button>
        <button className="icon-btn" title="Cart" aria-label="Cart" onClick={()=>navigate('/cart')}>
          🛒
          {cartCount > 0 && <span className="badge" aria-label={`${cartCount} items in cart`}>{cartCount}</span>}
        </button>
        <button className="icon-btn hide-desktop" title="Menu" aria-label="Menu" onClick={(e)=>e.preventDefault()}>☰</button>
      </div>
    </>
  );
};

export default Header;
