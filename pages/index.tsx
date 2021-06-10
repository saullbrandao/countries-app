import { CountryCard } from "../components/CountryCard";
import { RegionFilter } from "../components/RegionFilter";
import { Header } from "../components/Header";
import axios from "axios";
import { useQuery } from "react-query";
import ReactList from 'react-list'

const getCountries = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all')
  return response.data
}

export default function Home() {
  const { data, isError, isFetched, isLoading, refetch } = useQuery('countries', getCountries, { refetchOnWindowFocus: false })

  return (
    <div className='min-h-screen  bg-light-background'>
      <Header />
      <div className="flex flex-col gap-8">
        <input className='rounded-md shadow-md p-4 mx-4 mb-4 text-light-input outline-none focus:ring-2 focus:ring-light-text' placeholder='Search for a country...' />
        <RegionFilter />
        {
          isFetched &&
          <div className='overflow-auto max-h-screen'>
            <ReactList
              length={data.length}
              itemRenderer={(index, key) => <CountryCard key={key} countryData={data[index]} />}
            /> </div>
        }
      </div>
    </div>
  )
}
