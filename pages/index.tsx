import { CountryCard } from "../components/CountryCard";
import { RegionFilter } from "../components/RegionFilter";
import axios from "axios";
import { useQuery } from "react-query";
import ReactList from 'react-list'
import { SearchIcon } from "@heroicons/react/outline";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useCountries } from "../contexts/CountriesContext";
import { useEffect } from "react";

export default function Home() {
  const { darkMode } = useDarkMode()
  const { countries, fetchCountries } = useCountries()

  useEffect(() => {
    fetchCountries()
  }, [])

  return (
    <div className='min-h-screen'>
      <div className="flex flex-col gap-8">
        <div className="flex items-center mx-4 mb-4 h-14 shadow-md rounded-md p-4 dark:bg-dark-elements focus-within:ring-1 focus-within:ring-light-text dark:focus-within:ring-white">
          <div className="h-full flex justify-center items-center">
            <SearchIcon stroke={`${darkMode ? 'white' : 'black'}`} strokeOpacity='50' color='white' className='h-6' />
          </div>
          <input
            className='ml-4 pl-4 h-full text-light-input dark:text-white dark:bg-dark-elements outline-none'
            placeholder='Search for a country...'
          />
        </div>
        <RegionFilter />
        {countries &&
          <ReactList
            length={countries.length}
            itemRenderer={(index, key) => <CountryCard key={key} countryData={countries[index]} />}
          />
        }
      </div>
    </div>
  )
}
