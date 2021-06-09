import { CountryCard } from "../components/CountryCard";
import { Header } from "../components/Header";

export default function Home() {
  return (
    <div className='min-h-screen  bg-light-background'>
      <Header />
      <div className="flex flex-col gap-8">
        <input className='rounded-md shadow-md p-4 mx-4 mb-4 text-light-input' placeholder='Search for a country...' />
        <div className='bg-white p-4 shadow-md mx-4 w-1/2 rounded-md flex justify-between'>
          <span>Filter by region</span>
          <span>V</span>
        </div>
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
        <CountryCard />
      </div>
    </div>
  )
}
