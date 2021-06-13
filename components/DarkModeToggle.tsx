import { useEffect } from 'react'
import { MoonIcon } from '@heroicons/react/solid'
import { useDarkMode } from '../contexts/DarkModeContext'

export const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode, setDarkMode, handleDarkMode, handleThemePreference } = useDarkMode()

  useEffect(() => {
    handleThemePreference()
  }, [])

  useEffect(() => {
    handleDarkMode()
  }, [darkMode])

  return (
    <div onClick={() => toggleDarkMode()} className='flex justify-end gap-2 justify-self-end cursor-pointer h-6 w-2/5'>
      <MoonIcon color={`${darkMode ? 'white' : 'black'}`} />
      <span className='font-semibold text-center dark:text-white'>Dark Mode</span>
    </div>
  )
}