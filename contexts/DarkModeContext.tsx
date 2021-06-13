import { createContext, ReactNode, useContext, useState } from "react"

type DarkModeContextData = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  handleDarkMode: () => void;
  handleThemePreference: () => void;
}

type DarkModeProviderProps = {
  children: ReactNode;
}

export const DarkModeContext = createContext({} as DarkModeContextData)

export const DarkModeContextProvider = ({ children }: DarkModeProviderProps) => {
  const [darkMode, setDarkMode] = useState(false)

  function toggleDarkMode() {
    setDarkMode(!darkMode)
  }

  function handleDarkMode() {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.darkMode = true
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.darkMode = false
    }
  }

  function handleThemePreference() {
    if (localStorage.darkMode === 'true' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        toggleDarkMode,
        handleDarkMode,
        handleThemePreference
      }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  return useContext(DarkModeContext)
}