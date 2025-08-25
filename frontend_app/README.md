# Bookstore Frontend (React)

A responsive React application for a bookstore e-commerce platform. This app implements catalog browsing, product detail, cart, checkout (Stripe-ready), authentication (mock), and order history with a clean layout. Styles follow the placeholder style_guide.md and catalog_page_design_notes.md.

Features
- Catalog with filters, category chips, sorting, and pagination
- Product detail page with ratings and add-to-cart
- Cart with quantity updates and order summary
- Checkout page ready for Stripe Integration (mocked for now)
- Authentication (mock login/register) and order history
- Responsive header, search, and footer newsletter

Tech
- React 18, react-router-dom 6
- Minimal CSS with custom properties in src/index.css
- Context-based state for Auth and Cart
- Mock API layer in src/services/api.js (replace with backend API later)

Getting Started
1. Install dependencies:
   npm install
2. Optional: Copy .env.example to .env and set:
   REACT_APP_STRIPE_PUBLISHABLE_KEY=
   REACT_APP_API_BASE_URL=
3. Run development server:
   npm start
4. Build:
   npm run build
5. Tests:
   npm test

Stripe Integration
- The checkout page currently simulates a successful checkout.
- To integrate Stripe:
  - Install @stripe/stripe-js and @stripe/react-stripe-js
  - Use getEnv().stripeKey for Stripe loadStripe()
  - Replace services/api.createCheckoutSession with real backend call
  - Implement Elements and confirmCardPayment or redirectToCheckout

Notes
- Replace placeholder colors, sizes, and component details using the values from assets/style_guide.md once finalized.
- Use assets/catalog_page_design_notes.md as a structure guide for further refinements.
