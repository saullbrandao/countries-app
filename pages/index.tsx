import { LoadingSpinner } from '../components/LoadingSpinner';
import { CountriesList } from '../components/CountriesList';
import { RegionFilter } from "../components/RegionFilter";
import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { SearchInput } from '../components/SearchInput';

const getCountries = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;region;capital;population;flag')
  return response.data
}

export default function Home() {
  const { data: countries, isError, isLoading } = useQuery('countries', getCountries, { refetchOnWindowFocus: false })
  const [filter, setFilter] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredCountries, setFilteredCountries] = useState([])
  const [displayedCountries, setDisplayedCountries] = useState([])

  useEffect(() => {
    const handleCountrySearch = () => {
      const searchResult = filteredCountries.filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
      setDisplayedCountries(searchResult)
    }

    handleCountrySearch()
  }, [searchTerm, filteredCountries])

  useEffect(() => {
    const handleRegionSelection = () => {
      const filteredCountries = filter ? countries.filter(country => country.region.toLowerCase() === filter.toLowerCase()) : countries
      setFilteredCountries(filteredCountries)
    }

    countries && handleRegionSelection()
  }, [countries, filter])


  return (
    <div className='container mx-auto min-h-screen'>
      <div className="flex flex-col gap-8 ">
        <div className="flex flex-col mx-4 md:mx-0 md:flex-row md:justify-between">
          <SearchInput handleSearchTerm={setSearchTerm} />
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
