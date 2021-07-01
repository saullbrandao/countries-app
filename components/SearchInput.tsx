import { SearchIcon } from "@heroicons/react/outline";
import { Dispatch, SetStateAction } from "react";
import { useDarkMode } from "../contexts/DarkModeContext";

type SearchInputProps = {
  handleSearchTerm: Dispatch<SetStateAction<string>>
}

export const SearchInput = ({ handleSearchTerm }: SearchInputProps) => {
  const { darkMode } = useDarkMode()

  return (
    <div className="flex gap-2 items-center mb-4 h-14 md:w-2/5 shadow-md rounded-md p-4 dark:bg-dark-elements focus-within:ring-1 focus-within:ring-light-text dark:focus-within:ring-white">
      <SearchIcon
        stroke={`${darkMode ? 'white' : 'black'}`}
        strokeOpacity='50'
        color='white'
        className='h-6'
      />
      <input
        placeholder='Search for a country...'
        onChange={(e) => handleSearchTerm(e.target.value)}
        className='mx-2 h-full w-full text-light-input dark:text-white dark:bg-dark-elements outline-none bg-light-background'
      />
    </div>
  )
}