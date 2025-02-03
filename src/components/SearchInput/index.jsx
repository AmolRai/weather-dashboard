import { useCallback, useContext } from "react";
import { WeatherContext } from "../../context/WeatherContext";
import styles from "./style.module.css";

const SearchInput = () => {
  const { updateCity } = useContext(WeatherContext);

  const debounceInput = useCallback((cb, interval) => {
    let timer;
    return (...args) => {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => cb(...args), interval);
    };
  }, []);

  const debounce = debounceInput((value) => {
    if (value.trim()) updateCity(value);
  }, 500);

  return (
    <div className={styles.searchContainer}>
      <input
        className={styles.searchInput}
        type="text"
        placeholder="Search City"
        onChange={(e) => debounce(e.target.value)}
      />
    </div>
  );
};

export default SearchInput;
