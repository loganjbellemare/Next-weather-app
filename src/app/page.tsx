"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import Container from "./components/Container";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFarenheit";
import WeatherIcon from "./components/WeatherIcon";
import { getAmOrPmIcon } from "@/utils/getAmOrPmIcon";
import WeatherDetails from "./components/WeatherDetails";
import { convertMetersToMiles } from "@/utils/convertMetersToMiles";
import { convertToMph } from "@/utils/convertToMph";

type WeatherData = {
  cod: string;
  message: number;
  cnt: number;
  list: WeatherListItem[];
  city: CityInfo;
};

type WeatherListItem = {
  dt: number;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    sea_level: number;
    grnd_level: number;
    humidity: number;
    temp_kf: number;
  };
  weather: WeatherDescription[];
  clouds: {
    all: number;
  };
  wind: {
    speed: number;
    deg: number;
    gust: number;
  };
  visibility: number;
  pop: number;
  sys: {
    pod: string;
  };
  dt_txt: string;
};

type WeatherDescription = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type CityInfo = {
  id: number;
  name: string;
  coord: {
    lat: number;
    lon: number;
  };
  country: string;
  population: number;
  timezone: number;
  sunrise: number;
  sunset: number;
};

export default function Home() {
  const { isLoading, error, data } = useQuery<WeatherData>({
    queryKey: ["repoData"],
    queryFn: async () => {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?zip=32257&appid=${process.env.NEXT_PUBLIC_WEATHER_KEY}&cnt=56`
      );
      return data;
    },
  });

  console.log("data", data);

  if (isLoading)
    return (
      <div className="flex items-center min-h-screen justify-center">
        <p className="animate-bounce">Loading...</p>
      </div>
    );

  const todayData = data?.list[0];

  console.log("data", todayData);

  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar />
      <main className="px-3 max-w-7xl mx-auto flex flex-col gap-9 w-full pb-10 pt-4">
        {/* today data */}
        <section className="space-y-4">
          <div className="space-y-2">
            <h2 className="flex gap-1 text-2xl items-end">
              <p className="text-2xl">
                {format(parseISO(todayData?.dt_txt ?? ""), "EEEE")}
              </p>
              <p className="text-lg">
                ({format(parseISO(todayData?.dt_txt ?? ""), "dd.MM.yyyy")})
              </p>
            </h2>
            {/** main container */}
            <Container>
              {/* temperature */}
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToFahrenheit(todayData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-l whitespace-nowrap">
                  <span>Feels like </span>
                  <span>
                    {convertKelvinToFahrenheit(todayData?.main.feels_like ?? 0)}
                    °
                  </span>
                </p>
                <p className="text-xs space-x-2">
                  <span>
                    {convertKelvinToFahrenheit(todayData?.main.temp_min ?? 0)}°↓{" "}
                  </span>
                  <span>
                    {" "}
                    {convertKelvinToFahrenheit(todayData?.main.temp_max ?? 0)}°↑
                  </span>
                </p>
              </div>
              {/* time and weather icon */}
              <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                {data?.list.map((d, index) => (
                  <div
                    key={index}
                    className="flex flex-col justify-between gap-2 items-center text-xs font-semibold"
                  >
                    <p className="whitespace-nowrap">
                      {format(parseISO(d.dt_txt), "h:mm a")}
                    </p>
                    <WeatherIcon
                      iconName={getAmOrPmIcon(d.weather[0].icon, d.dt_txt)}
                    />
                    <p>{convertKelvinToFahrenheit(d.main.temp)}°</p>
                  </div>
                ))}
              </div>
            </Container>
          </div>
          <div className="flex gap-4">
            {/** left container */}
            <Container className="w-fit justify-center flex-col px-4 items-center">
              <p className="capitalize text-center">
                {todayData?.weather[0].description}
              </p>
              <WeatherIcon
                iconName={getAmOrPmIcon(
                  todayData?.weather[0].icon ?? "",
                  todayData?.dt_txt ?? ""
                )}
              />
            </Container>
            {/** right container */}
            <Container className="bg-yellow-300/80 px-6 gap-4 justify-between overflow-x-auto">
              <WeatherDetails
                visibility={convertMetersToMiles(
                  todayData?.visibility ?? 10000
                )}
                humidity={`${todayData?.main.humidity}%`}
                windSpeed={convertToMph(todayData?.wind.speed ?? 1.67)}
                airPressure={`${todayData?.main.pressure} hPa`}
                sunrise={format(
                  fromUnixTime(data?.city.sunrise ?? 1707135289),
                  "h:mm a"
                )}
                sunset={format(
                  fromUnixTime(data?.city.sunset ?? 1707174358),
                  "h:mm a"
                )}
              />
            </Container>
          </div>
        </section>
        {/* 7 day forecast data */}
        <section className="flex w-full flex-col gap-4">
          <p className=" text-2xl">Forecast (7 days)</p>
        </section>
      </main>
    </div>
  );
}
