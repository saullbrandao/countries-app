import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext, GetStaticPropsResult, InferGetStaticPropsType, NextPageContext } from 'next'
import axios from 'axios'
import { LoadingSpinner } from 'components/LoadingSpinner'
import { ArrowLeftIcon } from '@heroicons/react/outline'

type BorderCountry = {
  name: string
  alpha3Code: string
}

type CountryDataProps = {
  currencies: string[]
  languages: string[]
  flag: string
  name: string
  topLevelDomain: string[]
  alpha3Code: string
  capital: string
  region: string
  subregion: string
  population: number
  nativeName: string
  borders: BorderCountry[]
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await axios.get('https://restcountries.eu/rest/v2/all?fields=alpha3Code')

  const paths = response.data.map((country) => ({
    params: { slug: country.alpha3Code },
  }))

  return {
    paths,
    fallback: true
  }
}

export const getStaticProps = async (context: GetStaticPropsContext) => {
  const slug = Array.isArray(context.params.slug) ? context.params.slug[0] : context.params.slug

  const response = await axios.get(`https://restcountries.eu/rest/v2/alpha/${slug}?fields=name;nativeName;region;subregion;capital;population;topLevelDomain;currencies;languages;borders;alpha3Code;flag`)

  const borderCountries = response.data.borders.join(';')

  const borders = borderCountries && await axios.get(`https://restcountries.eu/rest/v2/alpha?fields=name;alpha3Code&codes=${borderCountries}`)

  const bordersArr = borderCountries && borders.data.map(border => ({ name: border.name, alpha3Code: border.alpha3Code }))
  const languagesArr = response.data.languages.map(language => language.name)
  const currenciesArr = []
  response.data.currencies.forEach(currency => {
    if (currency.name) currenciesArr.push(currency.name)
  })

  const countryData: CountryDataProps = {
    ...response.data,
    borders: bordersArr,
    languages: languagesArr,
    currencies: currenciesArr
  }

  return {
    props: {
      countryData
    }
  }
}

export default function CountryInfo({ countryData }: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  if (router.isFallback) {
    return <LoadingSpinner />
  }

  return (
    <div className="min-h-screen flex flex-col mx-4 md:container md:mx-auto gap-4 md:gap-12">
      <Link href='/'>
        <a className='flex w-28 h-8 items-center justify-center gap-2 mb-8 bg-white dark:bg-dark-elements dark:text-white rounded-md shadow-lg' >
          <ArrowLeftIcon className='h-6' />
          Back
        </a>
      </Link>
      <div className="flex flex-col lg:flex-row lg:justify-evenly gap-12 mb-8 dark:text-white rounded-md">
        <Image
          className='rounded-md'
          src={countryData.flag}
          width={720}
          height={480}
          objectFit='cover'
          alt={`${countryData.name}'s flag`}
        />
        <div className='flex flex-col gap-4 lg:grid grid-cols-2' >
          <h2 className='font-bold text-2xl mb-2 col-span-full'>
            {countryData.name}
          </h2>
          <div>
            <p><strong className='font-semibold'>Native Name:</strong> {countryData.nativeName}</p>
            <p><strong className='font-semibold'>Population:</strong> {new Intl.NumberFormat('pt-BR').format(countryData.population)}</p>
            <p><strong className='font-semibold'>Region:</strong> {countryData.region}</p>
            <p><strong className='font-semibold'>Sub Region:</strong> {countryData.subregion}</p>
            <p className='mb-8'><strong className='font-semibold'>Capital:</strong> {countryData.capital}</p>
          </div>

          <div>
            <p><strong className='font-semibold'>Top Level Domain:</strong> {countryData.topLevelDomain[0]}</p>
            <p><strong className='font-semibold'>Currencies:</strong> {countryData.currencies.join(', ')}</p>
            <p className='mb-8'><strong className=' font-semibold'>Languages:</strong> {countryData.languages.join(', ')}</p>
          </div>

          <div className="col-span-full">
            <h2 className='font-semibold text-lg mb-2' >Border Countries:</h2>
            <div className='grid grid-cols-3 gap-2'>
              {countryData.borders
                ? countryData.borders.map(country => {
                  return (
                    <Link
                      key={country.alpha3Code}
                      href={`/countries/${country.alpha3Code}`}
                    >
                      <a className='bg-white dark:bg-dark-elements max-w-12 px-2 shadow-lg rounded-md h-12 flex justify-center items-center text-center overflow-hidden overflow-ellipsis'>
                        {country.name.split(/\(.*$/)[0]}
                      </a>
                    </Link>
                  )
                }
                )
                : 'None'
              }
            </div>
          </div>
        </div>
      </div>

    </div>)
}