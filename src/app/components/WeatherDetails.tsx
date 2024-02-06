import React from "react";
import { FiDroplet } from "react-icons/fi";
import { ImMeter } from "react-icons/im";
import { LuEye, LuSunrise, LuSunset } from "react-icons/lu";
import { MdAir } from "react-icons/md";

type Props = {};

export interface WeatherDetailProps {
  visibility: string;
  humidity: string;
  windSpeed: string;
  airPressure: string;
  sunrise: string;
  sunset: string;
}

export default function WeatherDetails(props: WeatherDetailProps) {
  const {
    visibility = "15mi",
    humidity = "61%",
    windSpeed = "4mph",
    airPressure = "1012hPa",
    sunrise = "6.20",
    sunset = "18:48",
  } = props;

  return (
    <>
      <SingleWeatherDetail
        information="Visibility"
        icon={<LuEye />}
        value={visibility}
      />
      <SingleWeatherDetail
        information="Humidity"
        icon={<FiDroplet />}
        value={humidity}
      />
      <SingleWeatherDetail
        information="Wind speed"
        icon={<MdAir />}
        value={windSpeed}
      />
      <SingleWeatherDetail
        information="Air pressure"
        icon={<ImMeter />}
        value={airPressure}
      />
      <SingleWeatherDetail
        information="Sunrise"
        icon={<LuSunrise />}
        value={sunrise}
      />
      <SingleWeatherDetail
        information="Sunset"
        icon={<LuSunset />}
        value={sunset}
      />
    </>
  );
}

export interface SingleWeatherDetailProps {
  information: string;
  icon: React.ReactNode;
  value: string;
}

function SingleWeatherDetail(props: SingleWeatherDetailProps) {
  return (
    <div className="flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80">
      <p className="whitespace-nowrap">{props.information}</p>
      <div className=" text-3xl">{props.icon}</div>
      <p>{props.value}</p>
    </div>
  );
}
