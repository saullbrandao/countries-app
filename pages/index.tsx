import ReactList from 'react-list'
import { CountryCard } from "../components/CountryCard";
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
        <RegionFilter filter={filter} handleFilter={(region) => setFilter(region)} />
        {!countries ?
          <h1>Loading...</h1>
          : <ReactList
            length={countries.length}
            itemRenderer={(index, key) => <CountryCard key={key} countryData={countries[index]} />}
          />
        }
      </div>
    </div>
  )
}
