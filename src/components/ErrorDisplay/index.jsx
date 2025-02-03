import { useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import styles from "./style.module.css";

const ErrorDisplay = () => {
  const { error } = useContext(WeatherContext);

  if (!error) return null;

  return <div className={styles.error}>{error.message} 🏙️</div>;
};

export default ErrorDisplay;
