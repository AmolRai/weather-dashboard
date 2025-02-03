import { useContext, useState } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import { WEATHER_ICON_URL } from "../../constants";
import styles from "./style.module.css";

const WeatherDisplay = () => {
  const { weather, isLoading } = useContext(WeatherContext);
  const [unit, setUnit] = useState("C");

  if (isLoading) return <p>Loading weather data... ⏳</p>;
  if (!weather) return null;

  const { main, weather: weatherDetails, wind, name } = weather;
  const condition = weatherDetails[0];

  const temperatureCelsius = (main.temp - 273.15).toFixed(2);
  const temperatureFahrenheit = ((temperatureCelsius * 9) / 5 + 32).toFixed(2);

  return (
    <div className={styles.weatherDetails}>
      <div className={styles.weatherHeader}>
        {condition?.icon ? (
          <img
            src={`${WEATHER_ICON_URL}/${condition.icon}@2x.png`}
            alt={condition.description}
          />
        ) : null}
        <div className={styles.degree}>
          <span>
            {unit === "C" ? temperatureCelsius : temperatureFahrenheit}
          </span>
          <span
            onClick={() => setUnit("C")}
            className={styles.unit}
            style={{
              pointerEvents: unit === "C" ? "none" : "auto",
              color: unit === "C" ? "white" : "lightgray",
            }}
          >
            °c
          </span>
          <span className={styles.line}></span>
          <span
            onClick={() => setUnit("F")}
            className={styles.unit}
            style={{
              pointerEvents: unit === "F" ? "none" : "auto",
              color: unit === "F" ? "white" : "lightgray",
            }}
          >
            °f
          </span>
        </div>
        <h2>{name}</h2>
      </div>

      <div className={styles.weatherCondition}>
        <div className={styles.condition}>
          <p>💧 Humidity</p>
          <p>{main.humidity}%</p>
        </div>
        <div className={styles.condition}>
          <p>💨 Wind Speed</p>
          <p>{wind.speed} m/s</p>
        </div>
        <div className={styles.condition}>
          <p>☁️ Condition</p>
          <p>{condition.main}</p>
        </div>
      </div>
    </div>
  );
};

export default WeatherDisplay;
