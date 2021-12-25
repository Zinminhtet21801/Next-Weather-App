import Image from "next/image";
import moment from "moment-timezone";

const HourlyWeather = ({ hourlyWeather, timezone }) => {
    //TODO fix 3 cards width
  const dummy = hourlyWeather.map((weather, index) => (
    <div
      key={weather.dt}
      className="rounded-[5px] min-w-[110px] bg-[#5e60ce] text-center p-[10px] text-white  "
    >
      <p className="font-light text-[1rem] ">
        {index == 0 ? "Now" : moment.unix(weather.dt).tz(timezone).format("LT")}
      </p>
      <Image
        src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
        alt="Weather Icon"
        width={140}
        height={140}
        className="object-contain  "
      />
      <p>{weather.temp.toFixed(0)}&deg;C</p>
    </div>
  ));
  return <div className="w-full flex space-x-5 mt-5 overflow-x-auto  ">{dummy}</div>;
};

export default HourlyWeather;
