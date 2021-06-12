import { useState, useEffect } from 'react'
import { MoonIcon } from '@heroicons/react/solid'

export function DarkModeToggle() {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (localStorage.darkMode === 'true' || (!('darkMode' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setDarkMode(true)
    } else {
      setDarkMode(false)
    }
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.darkMode = true
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.darkMode = false
    }

  }, [darkMode])

  return (
    <div onClick={() => setDarkMode(prev => !prev)} className='flex justify-end gap-2 justify-self-end cursor-pointer h-6 w-2/5'>
      <MoonIcon color={`${darkMode ? 'white' : 'black'}`} />
      <span className='font-semibold text-center dark:text-white'>Dark Mode</span>
    </div>
  )
}

{/* <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
</svg> */}