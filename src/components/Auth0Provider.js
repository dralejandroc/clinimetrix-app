'use client'

import { Auth0Provider } from '@auth0/auth0-react'
import { auth0Config } from '../lib/auth0'

export default function Auth0ProviderWrapper({ children }) {
  return (
    <Auth0Provider
      domain={auth0Config.domain}
      clientId={auth0Config.clientId}
      authorizationParams={auth0Config.authorizationParams}
      useRefreshTokens={true}
      cacheLocation="localstorage"
    >
      {children}
    </Auth0Provider>
  )
}