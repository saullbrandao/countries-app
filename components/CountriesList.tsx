import { CountryCard } from "./CountryCard"

export const CountriesList = ({ countries }) => {
  return (
    <div className='flex flex-wrap justify-center sm:justify-between gap-2' >
      {countries.map(country => <CountryCard key={country.name} countryData={country} />)}
    </div>
  )
}