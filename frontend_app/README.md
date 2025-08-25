# BookNest Frontend (React)

A lightweight, modern React frontend for the bookstore e-commerce platform.

## Key Features
- Browse and search book catalog
- View detailed book information
- User registration/login/logout
- Shopping cart (add/remove/update quantity, persistent via localStorage)
- Checkout with Stripe (redirect to hosted checkout)
- Order history for authenticated users
- Responsive design and simple theming (light/dark)

## Environment Variables
Copy `.env.example` to `.env` and fill the values:
- `REACT_APP_STRIPE_PUBLISHABLE_KEY` — Stripe publishable key (client-side)
- `REACT_APP_API_BASE_URL` — Backend API base URL (default `/api`)

Note: Only public (non-secret) values should be exposed to the frontend.

## Scripts
- `npm start` — start dev server
- `npm test` — run tests
- `npm run build` — production build

## API Integration
The frontend expects a backend with the following endpoints (JSON):
- `GET /books` with query params: `q`, `page`, `pageSize`
- `GET /books/:id`
- `POST /auth/register`
- `POST /auth/login` — returns `{ token, user }`
- `POST /auth/logout`
- `GET /auth/me`
- `POST /payments/create-checkout-session` — body `{ items: [{ bookId, quantity }] }`, returns `{ sessionId }` (optionally `{ publicKey }`)
- `GET /orders` — returns list of orders

Authentication uses Bearer token stored in `localStorage` as `auth_token`.

## Styling
Base styles are defined in `src/App.css`. Components avoid heavy UI libraries to keep bundle size small.

## Routing
Uses `react-router-dom@6`. Protected routes wrap components requiring authentication.
