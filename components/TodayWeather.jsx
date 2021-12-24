import Image from "next/image";
import moment from "moment-timezone";

const TodayWeather = ({ city, weather, timezone }) => {
  return (
    <div className="w-full flex justify-center md:justify-between lg:justify-between
      items-center flex-wrap p-[30px] bg-[#4361ee] text-white mt-5 rounded-[10px] ">
      <div>
        <div className="mb-[15px] sm:w-full ">
          <p className="text-[2rem] font-bold ">{city.name} ({city.country})</p>
          <span className="text-[1.5rem] font-bold ">{weather.temp.max.toFixed(0)}&deg;C</span>
          <span className="ml-[10px] opacity-70 text-[1.25rem] font-bold ">
          {weather.temp.min.toFixed(0)}&deg;C
          </span>
        </div>
        <div className="flex justify-between flex-wrap ">
          <div>
            <p className="font-bold ">Sunrise</p>
            <p className="font-light ">{moment.unix(weather.sunrise).tz(timezone).format("LT")}</p>
          </div>
          <div>
            <p className="font-bold ">Sunset</p>
            <p className="font-light ">{moment.unix(weather.sunset).tz(timezone).format("LT")}</p>
          </div>
        </div>
      </div>

      <div className="ml-6 " >
        <Image
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="Weather Icon"
          width={140}
          height={140}
          className="object-contain max-w-full "
        />
        <h3 className="font-bold text-[1.17rem] " >heavy intensity rain</h3>
      </div>

    </div>
  );
};

export default TodayWeather;
