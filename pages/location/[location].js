import Link from "next/link";
import { useContext } from "react";
import cities from "../../data/city.list.json";
import DarkModeToggle from "../../components/DarkModeToggle";
import HourlyWeather from "../../components/HourlyWeather";
import SearchBar from "../../components/SearchBar";
import TodayWeather from "../../components/TodayWeather";
import WeeklyWeather from "../../components/WeeklyWeather";
import { DarkModeContext } from "../../contexts/DarkMode";
import moment from "moment-timezone";
import Head from "next/head";

export async function getServerSideProps(context) {
  const city = getCityId(context.params.location);
  if (!city) {
    return {
      notFound: true,
    };
  }


  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${city.coord.lat}&lon=${city.coord.lon}&appid=${process.env.WEATHER_API}&exclude=minutely&units=metric`
  );
  const data = await response.json();

  if (!data) {
    return {
      notFound: true,
    };
  }

  const hourlyWeather = getHourlyWeather(data.hourly, data.timezone);
  const weeklyWeather = data.daily;

  return {
    props: {
      city: city,
      timezone: data.timezone,
      currentWeather: data.current,
      hourlyWeather: hourlyWeather,
      weeklyWeather: weeklyWeather,
    },
  };
}

const getCityId = (param) => {
  const cityParam = param.trim();
  // get the id of the city
  const splitCity = cityParam.split("-");
  const id = splitCity[splitCity.length - 1];

  if (!id) {
    return null;
  }

  const city = cities.find((city) => city.id.toString() == id);

  if (city) {
    return city;
  } else {
    return null;
  }
};

const getHourlyWeather = (hourlyData, timezone) => {
  const endOfDay = moment().tz(timezone).endOf("day").valueOf();
  const eodTimeStamp = Math.floor(endOfDay / 1000);

  const todaysData = hourlyData.filter((data) => data.dt < eodTimeStamp);

  return todaysData;
};

const Location = ({
  city,
  weather,
  currentWeather,
  hourlyWeather,
  weeklyWeather,
  timezone,
}) => {
  const [darkMode, setDarkMode] = useContext(DarkModeContext);
  return (
    <>
      <Head>
        <title>Weather App-Next</title>
      </Head>
      <div className={` ${darkMode && "dark"} max-w-full font-nunito `}>
        <div className=" flex flex-col min-h-screen dark:bg-[#121212] text-[#242424] dark:text-white  ">
          <DarkModeToggle />
          <div className="max-w-[800px] w-full mx-auto px-4  ">
            <div className="w-full flex flex-col items-center justify-center ">
              <div className="self-start my-[15px] ">
                <Link passHref href={"/"}>
                  <span className="text-[#4361ee] font-semibold cursor-pointer hover:opacity-30 transition ">
                    &larr; Home
                  </span>
                </Link>
              </div>
              <SearchBar mWidth={`800px`} />
              <TodayWeather
                city={city}
                weather={weeklyWeather[0]}
                timezone={timezone}
              />
              <HourlyWeather
                hourlyWeather={hourlyWeather}
                timezone={timezone}
              />
              <WeeklyWeather
                weeklyWeather={weeklyWeather}
                timezone={timezone}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Location;
