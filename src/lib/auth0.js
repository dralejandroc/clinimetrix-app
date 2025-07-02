// Auth0 configuration
export const auth0Config = {
  domain: process.env.AUTH0_ISSUER_BASE_URL?.replace('https://', '') || 'your-tenant.auth0.com',
  clientId: process.env.AUTH0_CLIENT_ID || 'your-auth0-client-id',
  authorizationParams: {
    redirect_uri: typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000',
  },
}