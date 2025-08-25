// PUBLIC_INTERFACE
export function getEnv() {
  /** Returns required environment variables used by the frontend. 
   Required variables (set via .env):
   - REACT_APP_STRIPE_PUBLISHABLE_KEY: Publishable key for Stripe client
   - REACT_APP_API_BASE_URL: Backend API base URL (for real integration)
   */
  return {
    stripeKey: process.env.REACT_APP_STRIPE_PUBLISHABLE_KEY || '',
    apiBaseUrl: process.env.REACT_APP_API_BASE_URL || ''
  };
}
