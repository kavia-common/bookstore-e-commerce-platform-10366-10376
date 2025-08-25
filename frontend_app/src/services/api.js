//
// Centralized API client using axios with env-based baseURL.
// PUBLIC_INTERFACE
// getApiClient returns a configured axios instance for making requests.
//
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || '/api';

// PUBLIC_INTERFACE
export function getApiClient() {
  /** Returns a configured Axios instance bound to the API base URL. */
  const instance = axios.create({
    baseURL: API_BASE_URL,
    headers: { 'Content-Type': 'application/json' },
    withCredentials: true
  });

  // Attach auth token if present
  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });

  return instance;
}

// Convenience API methods

// PUBLIC_INTERFACE
export async function fetchBooks(params = {}) {
  /** Fetch books list with optional query params { q, page, pageSize, category } */
  const api = getApiClient();
  const res = await api.get('/books', { params });
  return res.data;
}

// PUBLIC_INTERFACE
export async function fetchBookById(bookId) {
  /** Fetch detailed book information by ID */
  const api = getApiClient();
  const res = await api.get(`/books/${bookId}`);
  return res.data;
}

// PUBLIC_INTERFACE
export async function registerUser(payload) {
  /** Register a new user with { name, email, password } */
  const api = getApiClient();
  const res = await api.post('/auth/register', payload);
  return res.data;
}

// PUBLIC_INTERFACE
export async function loginUser(payload) {
  /** Login user with { email, password } -> returns token, user */
  const api = getApiClient();
  const res = await api.post('/auth/login', payload);
  return res.data;
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /** Fetch the currently authenticated user using token cookie/header */
  const api = getApiClient();
  const res = await api.get('/auth/me');
  return res.data;
}

// PUBLIC_INTERFACE
export async function logoutUser() {
  /** Logout current user (invalidate token) */
  const api = getApiClient();
  const res = await api.post('/auth/logout');
  return res.data;
}

// PUBLIC_INTERFACE
export async function createStripeCheckoutSession(items) {
  /**
   * Create Stripe checkout session with items: [{ bookId, quantity }]
   * Returns { sessionId, publicKey? }
   */
  const api = getApiClient();
  const res = await api.post('/payments/create-checkout-session', { items });
  return res.data;
}

// PUBLIC_INTERFACE
export async function fetchOrders() {
  /** Fetch list of orders for the current user */
  const api = getApiClient();
  const res = await api.get('/orders');
  return res.data;
}
