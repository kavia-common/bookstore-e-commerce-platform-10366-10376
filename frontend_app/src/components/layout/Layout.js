import React from 'react';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <a href="#main" style={{ position: 'absolute', left: -10000 }}>Skip to content</a>
      <header className="header">
        <div className="container header-inner">
          <Header />
        </div>
      </header>
      <main id="main" className="main">
        <div className="container">
          {children}
        </div>
      </main>
      <footer className="footer">
        <div className="container">
          <Footer />
        </div>
      </footer>
    </>
  );
};

export default Layout;
