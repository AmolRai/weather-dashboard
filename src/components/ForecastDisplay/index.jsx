import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { WEATHER_ICON_URL } from "../../constants";
import styles from "./style.module.css";

const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(2);

const ForecastDisplay = () => {
  const { forecast, isForecastLoading } = useContext(WeatherContext);

  if (isForecastLoading) return <p>Loading forecast... ⏳</p>;
  if (!forecast?.list) return null;

  const dailyForecast = forecast.list.reduce((acc, entry) => {
    const date = entry.dt_txt.split(" ")[0];
    if (!acc[date]) acc[date] = [];
    acc[date].push(entry);
    return acc;
  }, {});

  return (
    <div>
      <div className={styles.forecast}>
        {Object.entries(dailyForecast)
          .slice(0, 5)
          .map(([date, dailyEntries]) => {
            const avgTemp =
              dailyEntries.reduce((sum, item) => sum + item.main.temp, 0) /
              dailyEntries.length;
            const weatherCondition = dailyEntries[0].weather[0];

            const dayName = new Date(date).toLocaleDateString("en-US", {
              weekday: "long",
              timeZone: "Asia/Kolkata",
            });

            return (
              <div key={date} className={styles.dailyForecast}>
                <h3>{dayName}</h3>
                <span>{kelvinToCelsius(avgTemp)}°C</span>
                <img
                  src={`${WEATHER_ICON_URL}/${weatherCondition.icon}@2x.png`}
                  alt={weatherCondition.description}
                  width="50"
                />
                <p>{weatherCondition.main}</p>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ForecastDisplay;
