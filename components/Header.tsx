import { DarkModeToggle } from "./DarkModeToggle"

export const Header = () => {
  return (
    <header className='bg-white dark:bg-dark-elements shadow-md text-lg text-light-text'>
      <div className='container mx-auto flex justify-between px-2 md:px-0 py-8 mb-8 w-full '>
        <span className='font-bold dark:text-white whitespace-nowrap'>Where in the world?</span>
        <DarkModeToggle />
      </div>
    </header>
  )
}