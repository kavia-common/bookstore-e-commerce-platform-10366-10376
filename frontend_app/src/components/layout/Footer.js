import React from 'react';

const Footer = () => {
  return (
    <>
      <section className="newsletter">
        <h3>Get updates and offers</h3>
        <p style={{ color: 'var(--text-secondary)' }}>
          Join our newsletter for the latest arrivals, deals, and reading lists.
        </p>
        <form onSubmit={(e)=>e.preventDefault()} style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
          <input className="input" type="email" placeholder="Your email" aria-label="Email" />
          <button className="btn btn-primary" type="submit">Subscribe</button>
        </form>
      </section>

      <section className="links">
        <div>
          <h4>About</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
            <li><a href="#company">Our Story</a></li>
            <li><a href="#team">Team</a></li>
            <li><a href="#careers">Careers</a></li>
          </ul>
        </div>
        <div>
          <h4>Help</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
            <li><a href="#support">Support</a></li>
            <li><a href="#shipping">Shipping</a></li>
            <li><a href="#returns">Returns</a></li>
          </ul>
        </div>
        <div>
          <h4>Policies</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
            <li><a href="#terms">Terms</a></li>
            <li><a href="#privacy">Privacy</a></li>
            <li><a href="#cookies">Cookies</a></li>
          </ul>
        </div>
        <div>
          <h4>Social</h4>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, color: 'var(--text-secondary)' }}>
            <li><a href="#twitter">Twitter</a></li>
            <li><a href="#instagram">Instagram</a></li>
            <li><a href="#facebook">Facebook</a></li>
          </ul>
        </div>
      </section>

      <div className="legal">
        <small>© {new Date().getFullYear()} Bookstore. All rights reserved.</small>
      </div>
    </>
  );
};

export default Footer;
