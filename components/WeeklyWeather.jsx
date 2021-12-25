import moment from "moment-timezone";
import Image from "next/image";

const WeeklyWeather = ({ weeklyWeather, timezone }) => {
  //TODO
  return (
    <div className="w-full mt-5 text-white ">
      <h3 className="text-[2rem] ">
        Weekly <span className="opacity-90 font-extralight ">Weather</span>
      </h3>

      {weeklyWeather.length > 0 &&
        weeklyWeather.map((weather, index) => {
          if (index == 0) {
            return;
          }

          return (
            <div
              className="rounded-xl bg-[#22b0db] px-[20px] py-[10px] mb-[15px] flex flex-wrap justify-between items-center "
              key={weather.dt}
            >
              <div className="flex  items-center ">
                <div className="min-w-[161px] px-[15px] " >
                  <h3 className="text-[1.5rem] font-bold " >{moment.unix(weather.dt).tz(timezone).format("dddd")}</h3>

                  <h4>
                    <span className="text-[1rem] font-bold " >{weather.temp.max.toFixed(0)}&deg;C</span>
                    <span className="ml-[10px] text-[0.875rem] opacity-75 font-bold " >{weather.temp.min.toFixed(0)}&deg;C</span>
                  </h4>
                </div>

                <div className=" flex px-[15px] flex-wrap ">
                  <div className="flex flex-col mr-5 " >
                    <span className="font-bold " >Sunrise</span>
                    <span className="font-light " >
                      {moment.unix(weather.sunrise).tz(timezone).format("LT")}
                    </span>
                  </div>

                  <div className="flex flex-col " >
                    <span className="font-bold " >Sunset</span>
                    <span>
                      {moment.unix(weather.sunset).tz(timezone).format("LT")}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-center ml-5 ">

                  <Image
                    src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                    alt="Weather Icon"
                    width={120}
                    height={120}
                  />
 

                <h5 className="text-[1rem] font-bold text-center " >{weather.weather[0].description}</h5>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default WeeklyWeather;
