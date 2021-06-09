import { CountryCard } from "../components/CountryCard";
import { RegionFilter } from "../components/RegionFilter";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div className='min-h-screen  bg-light-background'>
      <Header />
      <div className="flex flex-col gap-8">
        <input className='rounded-md shadow-md p-4 mx-4 mb-4 text-light-input outline-none focus:ring-2 focus:ring-light-text' placeholder='Search for a country...' />
        <RegionFilter />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
      </div>
    </div>
  )
}
