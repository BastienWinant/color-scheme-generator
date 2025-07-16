import { StrictMode } from 'react'
import { Provider } from "@/components/ui/provider"
import AuthUserProvider from "@/contexts/authContext/authUserProvider.jsx";
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<AuthUserProvider>
			<Provider>
				<App />
			</Provider>
		</AuthUserProvider>
  </StrictMode>,
)
