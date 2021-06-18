import { LoadingSpinner } from '../components/LoadingSpinner';
import { CountriesList } from '../components/CountriesList';
import { RegionFilter } from "../components/RegionFilter";
import { SearchIcon } from "@heroicons/react/outline";
import { useDarkMode } from "../contexts/DarkModeContext";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";

const getCountries = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;region;capital;population;flag')
  return response.data
}

export default function Home() {
  const { darkMode } = useDarkMode()
  const { data: countries, isError, isLoading } = useQuery('countries', getCountries, { refetchOnWindowFocus: false })
  const [filter, setFilter] = useState('')

  const [displayedCountries, setDisplayedCountries] = useState([])


  useEffect(() => {
    const handleRegionSelection = () => {
      const filteredCountries = filter ? countries.filter(country => country.region.toLowerCase() === filter.toLowerCase()) : countries
      setDisplayedCountries(filteredCountries)
    }
    countries && handleRegionSelection()
  }, [countries, filter])

  return (
    <div className='container mx-auto min-h-screen'>
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col mx-4 md:mx-0 md:flex-row md:justify-between">
          <div className="flex items-center mb-4 h-14 md:w-2/5 shadow-md rounded-md p-4 dark:bg-dark-elements focus-within:ring-1 focus-within:ring-light-text dark:focus-within:ring-white">
            <div className="h-full flex justify-center items-center">
              <SearchIcon stroke={`${darkMode ? 'white' : 'black'}`} strokeOpacity='50' color='white' className='h-6' />
            </div>
            <input
              className='mx-2 h-full text-light-input dark:text-white dark:bg-dark-elements outline-none'
              placeholder='Search for a country...'
            />
          </div>
          <RegionFilter filter={filter} handleFilter={(region: string) => setFilter(region)} />
        </div>
        {isError && <h1>Error</h1>}
        {isLoading
          ?
          <LoadingSpinner />
          :
          <CountriesList countries={displayedCountries} />
        }
      </div>
    </div>
  )
}
