import { StrictMode } from 'react'
import { Provider as ChakraProvider } from "src/components/ui/provider.jsx"
import { AuthUserProvider } from "src/contexts/auth/AuthUserProvider.jsx"
import { ColorSchemeProvider } from "src/contexts/colorScheme/ColorSchemeProvider.jsx"
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
		<ChakraProvider>
			<AuthUserProvider>
				<ColorSchemeProvider>
					<App />
				</ColorSchemeProvider>
			</AuthUserProvider>
		</ChakraProvider>
  </StrictMode>,
)
