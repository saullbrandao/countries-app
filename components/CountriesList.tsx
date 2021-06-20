import { useEffect, useState } from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import { CountryCard } from "./CountryCard"
import { LoadingSpinner } from "./LoadingSpinner";

export const CountriesList = ({ countriesArr }) => {
  const [items, setItems] = useState([]);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setPage(1)
    setItems(countriesArr[0])
    countriesArr.length > 1 && setHasNextPage(true)
  }, [countriesArr])

  function handleLoadMore() {
    setLoading(true);

    function loadNextPage() {
      setLoading(false);
      setPage(prev => prev + 1)
      setHasNextPage(countriesArr.length > page + 1);
      countriesArr[page] && setItems(prev => prev.concat(countriesArr[page]));
    };

    hasNextPage && loadNextPage()
  }

  const [infiniteRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: handleLoadMore,
  });

  return (
    <section className="flex flex-col justify-center gap-4 mb-8">
      <ul className='flex flex-wrap justify-around gap-4' >
        {items.map((country, index) => <CountryCard key={index} countryData={country} />)}

        {hasNextPage && <li ref={infiniteRef} className='w-full flex justify-center'>
          <LoadingSpinner />
        </li>
        }
      </ul>
    </section>
  )
}