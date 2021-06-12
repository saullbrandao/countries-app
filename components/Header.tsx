import { DarkModeToggle } from "./DarkModeToggle"

export const Header = () => {
  return (
    <header className='flex justify-between px-4 py-8 mb-8 w-full bg-white dark:bg-dark-elements shadow-md text-lg text-light-text'>
      <span className='font-bold dark:text-white w-3/5'>Where in the world?</span>
      <DarkModeToggle />
    </header>
  )
}