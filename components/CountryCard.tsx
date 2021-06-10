import Image from 'next/image'

export const CountryCard = ({ countryData }) => {
  return countryData && (
    <div className='w-full flex mb-6 justify-center'>
      <div className="flex flex-col bg-white rounded-md w-60">
        <div className='h-40 rounded-md'>
          <Image src={countryData.flag} width={300} height={200} objectFit='cover' />
        </div>
        <div className="pl-6 pt-6 mb-12">
          <h2 className='font-bold text-lg mb-2' >{countryData?.name}</h2>
          <p><strong className='font-semibold'>Population:</strong> {countryData?.population}</p>
          <p><strong className='font-semibold'>Region:</strong> {countryData?.region}</p>
          <p><strong className='font-semibold'>Capital:</strong> {countryData?.capital}</p>
        </div>
      </div>
    </div>
  )
}