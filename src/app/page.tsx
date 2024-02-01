"use client";

import Image from "next/image";
import Navbar from "./components/Navbar";
import { useQuery } from "react-query";
import axios from "axios";
import { format, parseISO } from "date-fns";
import Container from "./components/Container";
import { convertKelvinToFahrenheit } from "@/utils/convertKelvinToFarenheit";

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
            <Container>
              <div className="flex flex-col px-4">
                <span className="text-5xl">
                  {convertKelvinToFahrenheit(todayData?.main.temp ?? 0)}°
                </span>
                <p className="text-xs space-x-l whitespace-nowrap">
                  <span>Feels like</span>
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
            </Container>
          </div>
        </section>
        <section></section>
      </main>
    </div>
  );
}
