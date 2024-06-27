import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthenticationContextProvider } from './services/authentication/Authentication.context.jsx'
import { TokenProvider } from './components/tokenContext/TokenContext.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthenticationContextProvider>
        <TokenProvider>
          <App />
        </TokenProvider>
      </AuthenticationContextProvider>
  </React.StrictMode>,
)
