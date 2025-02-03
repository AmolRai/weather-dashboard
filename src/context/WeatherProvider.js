import { useState } from "react";
import { WeatherContext } from "./WeatherContext";
import { WEATHER_API_URL } from "../constants";
import { useQuery } from "@tanstack/react-query";

const fetchWeather = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/weather?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
};

const fetchForecast = async (city) => {
  try {
    const response = await fetch(
      `${WEATHER_API_URL}/forecast?q=${city}&appid=${process.env.REACT_APP_OPENWEATHER_API_KEY}`
    );
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || "Something went wrong");
    }

    return data;
  } catch (error) {
    throw new Error(error?.message || "Something went wrong");
  }
};

const WeatherProvider = ({ children }) => {
  const [city, setCity] = useState(
    () => localStorage.getItem("lastCity") || "London"
  );

  const {
    data: weather,
    error,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeather(city),
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });

  const {
    data: forecast,
    error: forecastError,
    isLoading: isForecastLoading,
    refetch: refetchForecast,
  } = useQuery({
    queryKey: ["forecast", city],
    queryFn: () => fetchForecast(city),
    staleTime: 30000,
    refetchInterval: 30000,
    retry: false,
  });

  const updateCity = (newCity) => {
    setCity(newCity);
    localStorage.setItem("lastCity", newCity);
    refetch();
    refetchForecast();
  };

  return (
    <WeatherContext.Provider
      value={{
        weather,
        forecast,
        error,
        forecastError,
        isLoading,
        isForecastLoading,
        updateCity,
      }}
    >
      {children}
    </WeatherContext.Provider>
  );
};

export default WeatherProvider;
