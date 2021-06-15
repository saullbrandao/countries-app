import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { Country, useCountries } from '../../contexts/CountriesContext'
import axios from 'axios'
import { ArrowLeftIcon } from '@heroicons/react/outline'

export default function CountryInfo() {
  const router = useRouter()
  const { slug } = Array.isArray(router.query) ? router.query[0] : router.query
  const { getCountryData } = useCountries()
  const [countryData, setCountryData] = useState<Country | undefined>()

  console.log(slug)

  useEffect(() => {
    const fetchCountryData = async () => {
      try {

        const response = await axios.get(`https://restcountries.eu/rest/v2/name/${slug}?fullText=true&fields=name;nativeName;region;subregion;capital;population;topLevelDomain;currencies;languages;borders;alpha3Code;flag`)

        const borderCountries = response.data[0].borders.join(';')

        const borders = borderCountries && await axios.get(`https://restcountries.eu/rest/v2/alpha?fields=name&codes=${borderCountries}`)

        const bordersArr = borderCountries && borders.data.map(border => border.name)
        const languagesArr = response.data[0].languages.map(language => language.name)
        const currenciesArr = response.data[0].currencies.map(currency => currency.name)

        const countries = {
          ...response.data[0],
          borders: bordersArr,
          languages: languagesArr,
          currencies: currenciesArr
        }

        setCountryData(countries)
      } catch (error) {
        console.log(error)
      }
    }

    const getCountryInfo = async () => {
      const response = await getCountryData(slug)
      response ? setCountryData(response) : fetchCountryData()
    }

    slug && fetchCountryData()


  }, [slug])

  return countryData ?
    <div className="min-h-screen mx-6">
      <Link href='/'><a className='flex w-28 h-8 items-center justify-center gap-2 mb-8 bg-white dark:bg-dark-elements dark:text-white rounded-md shadow-lg' ><ArrowLeftIcon className='h-6' /> Back</a></Link>
      <div className="flex flex-col gap-6  dark:text-white rounded-md">
        <Image className='rounded-md' src={countryData.flag} width={600} height={400} objectFit='cover' />
        <div className='flex flex-col gap-1' >
          <h2 className='font-bold text-2xl mb-2' >{countryData.name}</h2>
          <p><strong className='font-semibold'>Native Name:</strong> {countryData.nativeName}</p>
          <p><strong className='font-semibold'>Population:</strong> {countryData.population}</p>
          <p><strong className='font-semibold'>Region:</strong> {countryData.region}</p>
          <p><strong className='font-semibold'>Sub Region:</strong> {countryData.subregion}</p>
          <p className='mb-8'><strong className='font-semibold'>Capital:</strong> {countryData.capital}</p>
          <p><strong className='font-semibold'>Top Level Domain:</strong> {countryData.topLevelDomain[0]}</p>
          <p><strong className='font-semibold'>Currencies:</strong> {countryData.currencies.map(currency => `${currency} `)}</p>
          <p className='mb-8'><strong className=' font-semibold'>Languages:</strong> {countryData.languages.map(language => `${language} `)}</p>
          <div className="">
            <h2 className='font-semibold text-lg mb-2' >Border Countries:</h2>
            <div className='grid grid-cols-3 gap-2'>
              {countryData.borders ? countryData.borders.map(countryName => <Link key={countryName} href={`/countries/${countryName.split(' ').join('-')}`} ><a className='bg-white dark:bg-dark-elements shadow-lg rounded-md h-12 flex justify-center items-center text-center'>{countryName} </a></Link>) : 'None'}
            </div>
          </div>
        </div>
      </div>
    </div>
    : <h1>Loading...</h1>
}