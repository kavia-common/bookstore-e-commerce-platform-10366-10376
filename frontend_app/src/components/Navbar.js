import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './navbar.css';

export default function Navbar() {
  const { user, logout, isAuthenticated } = useAuth();
  const { totals } = useCart();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-content container">
        <Link className="brand" to="/">BookNest</Link>
        <div className="nav-links">
          <NavLink to="/" end>Home</NavLink>
          <NavLink to="/catalog">Catalog</NavLink>
          {isAuthenticated && <NavLink to="/orders">Orders</NavLink>}
        </div>
        <div className="nav-actions">
          <NavLink to="/cart" className="cart-link" aria-label="Cart">
            🛒 <span className="badge">{totals.count}</span>
          </NavLink>
          {!isAuthenticated ? (
            <>
              <NavLink to="/login" className="btn btn-text">Login</NavLink>
              <NavLink to="/register" className="btn btn-primary">Sign Up</NavLink>
            </>
          ) : (
            <div className="user-menu">
              <span className="user-name">Hi, {user?.name || user?.email}</span>
              <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}
