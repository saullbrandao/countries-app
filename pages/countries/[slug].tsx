import { useRouter } from 'next/router'
import { LoadingSpinner } from '../../components/LoadingSpinner'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect } from 'react'
import axios from 'axios'
import { ArrowLeftIcon } from '@heroicons/react/outline'
import { useQuery } from 'react-query'

const getCountryData = async (slug: string) => {
  const name = slug.split('-').join(' ')

  const response = await axios.get(`https://restcountries.eu/rest/v2/name/${name}?fullText=true&fields=name;nativeName;region;subregion;capital;population;topLevelDomain;currencies;languages;borders;alpha3Code;flag`)

  const borderCountries = response.data[0].borders.join(';')

  const borders = borderCountries && await axios.get(`https://restcountries.eu/rest/v2/alpha?fields=name&codes=${borderCountries}`)

  const bordersArr = borderCountries && borders.data.map(border => border.name)
  const languagesArr = response.data[0].languages.map(language => language.name)
  const currenciesArr = response.data[0].currencies.map(currency => currency.name)

  const country = {
    ...response.data[0],
    borders: bordersArr,
    languages: languagesArr,
    currencies: currenciesArr
  }
  return country
}

export default function CountryInfo() {
  const router = useRouter()
  const { slug } = Array.isArray(router.query) ? router.query[0] : router.query
  const { data: countryData, isError, isFetched, isLoading, refetch } = useQuery(['country', slug], () => getCountryData(slug), { refetchOnWindowFocus: false, enabled: false })

  useEffect(() => {
    slug && refetch()
  }, [slug, refetch])
  // finish responsive design
  return (
    <div className="min-h-screen flex flex-col mx-4 md:container md:mx-auto gap-4 md:gap-12">
      <Link href='/'><a className='flex w-28 h-8 items-center justify-center gap-2 mb-8 bg-white dark:bg-dark-elements dark:text-white rounded-md shadow-lg' ><ArrowLeftIcon className='h-6' /> Back</a></Link>
      {isError && <h1>Error</h1>}
      {isFetched && !isError ?
        <div className="flex flex-col lg:flex-row lg:justify-evenly gap-12 mb-8 dark:text-white rounded-md">
          <Image className='rounded-md' src={countryData.flag} width={720} height={480} objectFit='cover' alt={`${countryData.name}'s flag`} />
          <div className='flex flex-col gap-4 lg:grid grid-cols-2' >
            <h2 className='font-bold text-2xl mb-2 col-span-full ' >{countryData.name}</h2>
            <div className="">

              <p><strong className='font-semibold'>Native Name:</strong> {countryData.nativeName}</p>
              <p><strong className='font-semibold'>Population:</strong> {new Intl.NumberFormat('pt-BR').format(countryData.population)}</p>
              <p><strong className='font-semibold'>Region:</strong> {countryData.region}</p>
              <p><strong className='font-semibold'>Sub Region:</strong> {countryData.subregion}</p>
              <p className='mb-8'><strong className='font-semibold'>Capital:</strong> {countryData.capital}</p>
            </div>

            <div className="">

              <p><strong className='font-semibold'>Top Level Domain:</strong> {countryData.topLevelDomain[0]}</p>
              <p><strong className='font-semibold'>Currencies:</strong> {countryData.currencies.join(', ')}</p>
              <p className='mb-8'><strong className=' font-semibold'>Languages:</strong> {countryData.languages.join(', ')}</p>
            </div>


            <div className="col-span-full">
              <h2 className='font-semibold text-lg mb-2' >Border Countries:</h2>
              <div className='grid grid-cols-3 gap-2'>
                {countryData.borders ? countryData.borders.map(countryName => <Link key={countryName} href={`/countries/${countryName.split(' ').join('-')}`} >
                  <a className='bg-white dark:bg-dark-elements shadow-lg rounded-md h-12 flex justify-center items-center text-center overflow-hidden overflow-ellipsis'>
                    {countryName.split(/\(.*$/)[0]}
                  </a></
                Link>
                ) : 'None'}
              </div>
            </div>
          </div>
        </div>
        : isLoading && <LoadingSpinner />
      }
    </div>)
}