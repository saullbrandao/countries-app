import axios from "axios"
import { createContext, ReactNode, useContext } from "react"
import { useQuery } from "react-query"

const getCountries = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=name;nativeName;region;subregion;capital;population;topLevelDomain;currencies;languages;borders;alpha3Code;flag')
  return response.data
}

export type Country = {
  name: string;
  nativeName: string;
  region: string;
  subregion: string;
  capital: string;
  population: number;
  topLevelDomain: string[];
  currencies: string[];
  languages: string[];
  borders: string[];
  alpha3Code: string;
  flag: string;
}
type CountriesContextData = {
  countries: Country[],
  fetchCountries: () => void;
  getCountryData: (name: string) => Promise<Country> | undefined;
}

type CountriesProviderProps = {
  children: ReactNode;
}

export const CountriesContext = createContext({} as CountriesContextData)

export const CountriesContextProvider = ({ children }: CountriesProviderProps) => {
  const { data: countries, isError, isFetched, isLoading, refetch } = useQuery('countries', getCountries, { refetchOnWindowFocus: false })

  const fetchCountries = async () => {
    await refetch()
  }

  const getCountryData = async (name) => {
    const country = countries && countries.filter(country => country.name.toLowerCase() === name.toLowerCase())[0]

    if (country) {

      const borderCountries = country.borders.join(';')
      const borders = await axios.get(`https://restcountries.eu/rest/v2/alpha?fields=name&codes=${borderCountries}`)

      const bordersArr = borders.data.map(border => border.name)
      const languagesArr = country.languages.map(language => language.name)
      const currenciesArr = country.currencies.map(currency => currency.name)

      const countryData = {
        ...country,
        borders: bordersArr,
        languages: languagesArr,
        currencies: currenciesArr
      }
      return countryData
    }
    return country


  }

  return (
    <CountriesContext.Provider
      value={{
        countries,
        fetchCountries,
        getCountryData
      }}
    >
      {children}
    </CountriesContext.Provider>
  )
}

export const useCountries = () => {
  return useContext(CountriesContext)
}