import { useEffect } from 'react'
import { MoonIcon } from '@heroicons/react/solid'
import { useDarkMode } from '../contexts/DarkModeContext'

export const DarkModeToggle = () => {
  const { darkMode, toggleDarkMode, setDarkMode, handleDarkMode } = useDarkMode()

  useEffect(() => {
    if (localStorage.darkMode === 'true' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [setDarkMode])

  useEffect(() => {
    handleDarkMode()
  })

  return (
    <div className='flex justify-end gap-2 h-6'>
      <MoonIcon
        className='cursor-pointer h-6'
        onClick={() => toggleDarkMode()}
        color={`${darkMode ? 'white' : 'black'}`}
      />
      <span className='font-semibold text-center dark:text-white whitespace-nowrap'>Dark Mode</span>
    </div>
  )
}
