import ErrorDisplay from "./components/ErrorDisplay";
import ForecastDisplay from "./components/ForecastDisplay";
import SearchInput from "./components/SearchInput";
import WeatherDisplay from "./components/WeatherDisplay";
import WeatherProvider from "./context/WeatherProvider";

const App = () => {
  return (
    <WeatherProvider>
      <div className="app">
        <SearchInput />
        <ErrorDisplay />
        <WeatherDisplay />
        <ForecastDisplay />
      </div>
    </WeatherProvider>
  );
};

export default App;
