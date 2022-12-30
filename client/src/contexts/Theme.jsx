import { createContext, useContext, useState } from 'react'

const ThemeContext = createContext()

export default function Theme({ children }) {
    const [dark, setDark] = useState(false)
    function toggleDark() {
        setDark(prev => !prev)
    }
    return (
        <ThemeContext.Provider value={{ dark, toggleDark }}>
            {children}
        </ThemeContext.Provider>
    )
}

export function useThemeContext() {
    return useContext(ThemeContext)
}