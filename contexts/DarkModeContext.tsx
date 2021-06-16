import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useState } from "react"

type DarkModeContextData = {
  darkMode: boolean;
  setDarkMode: Dispatch<SetStateAction<boolean>>;
  toggleDarkMode: () => void;
  handleDarkMode: () => void;
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

  return (
    <DarkModeContext.Provider
      value={{
        darkMode,
        setDarkMode,
        toggleDarkMode,
        handleDarkMode,
      }}
    >
      {children}
    </DarkModeContext.Provider>
  )
}

export const useDarkMode = () => {
  return useContext(DarkModeContext)
}