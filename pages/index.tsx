import { CountryCard } from "../components/CountryCard";
import { RegionFilter } from "../components/RegionFilter";
import { Header } from "../components/Header";
import axios from "axios";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

const getCountries = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all')
  return response.data
}

export default function Home() {
  const { data, isError, isLoading } = useQuery('countries', getCountries)
  const [countries, setCountries] = useState([])

  useEffect(() => {
    let countriesArr = []
    if (data) {
      for (let i = 0; i < 10; i++) {
        countriesArr.push(data[i])
      }
    }
    setCountries(countriesArr)

  }, [data])



  return (
    <div className='min-h-screen  bg-light-background'>
      <Header />
      <div className="flex flex-col gap-8">
        <input className='rounded-md shadow-md p-4 mx-4 mb-4 text-light-input outline-none focus:ring-2 focus:ring-light-text' placeholder='Search for a country...' />
        <RegionFilter />

        {!isLoading && countries?.map(country => <CountryCard key={country.name} countryData={country} />)}
      </div>
    </div>
  )
}
