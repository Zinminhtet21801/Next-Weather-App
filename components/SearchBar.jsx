import { useEffect, useState } from "react";
import Cities from "../data/city.list.json";
import Router from "next/router";
import Link from "next/link";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    const clearQuery = () => setQuery("");
    Router.events.on("routeChangeComplete", clearQuery);

    return () => {
      Router.events.off("routeChangeComplete", clearQuery);
    };
  }, []);

  const onChange = (e) => {
    const { value } = e.target;
    setQuery(value);

    let matchingCities = [];

    if (value.length > 3) {
      for (let city of Cities) {
        if (matchingCities.length >= 5) {
          break;
        }
        const match = city.name.toLowerCase().startsWith(value.toLowerCase());

        if (match) {
          const cityData = {
            ...city,
            slug: `${city.name.toLowerCase().replace(/ /g, "-")}-${city.id}`,
          };

          matchingCities.push(cityData);
          continue;
        }
      }
    }
    return setResults(matchingCities);
  };

  return (
    <div className="w-full dark:text-white font-nunito  ">
      <div className={`max-w-[800px] mx-auto`}>
        <input
          type="text"
          value={query}
          onChange={onChange}
          placeholder="Search for a city..."
          className=" h-[61px] bg-transparent shadow-md
         border-[#4361ee] outline-none rounded-[10px] border-2 p-[15px] text-[20px] w-full   text-[#242424] dark:text-white "
        />

        {query.length > 3 && (
          <div className="relative " >
          <ul className={`absolute z-50 w-full max-w-[800px] font-semibold bg-blue-400  mx-auto rounded-[10px] mt-2 divide-y`}>
            {results.length > 0 ? (
              results.map((city) => {
                return (
                  <li key={city.slug} className="text-left p-4 cursor-pointer ">
                    <Link href={`/location/${city.slug}`} passHref>
                      <p>
                        {city.name}
                        {city.state ? `, ${city.state}` : ""}{" "}
                        <span>({city.country})</span>
                      </p>
                    </Link>
                  </li>
                );
              })
            ) : (
              <li className="p-[15px] ">No results found</li>
            )}
          </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
