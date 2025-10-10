import { createContext, useContext } from "react"

export const ColorSchemeContext = createContext(null)
export const useColorSchemeContext = () => useContext(ColorSchemeContext)