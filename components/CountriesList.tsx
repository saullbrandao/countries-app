import { CountryCard } from "./CountryCard"

export const CountriesList = ({ countries }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  xl:grid-cols-4 2xl:grid-cols-5 justify-items-center gap-4' >
      {countries.map(country => <CountryCard key={country.name} countryData={country} />)}
    </div>
  )
}