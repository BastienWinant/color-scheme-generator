import { StrictMode } from 'react'
import { Provider as ChakraProvider } from "@/components/ui/provider.jsx"
import { ColorSchemeProvider } from "@/contexts/colorSchemeContext/ColorSchemeProvider.jsx"
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider>
      <ColorSchemeProvider>
        <App />
      </ColorSchemeProvider>
    </ChakraProvider>
  </StrictMode>,
)
