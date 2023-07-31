import { useCities } from "../../contexts/CitiesContext";
import { Cities } from "../../types";
import CityItem from "../CityItem/CityItem";
import CountryItem from "../CountryItem/CountryItem";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import styles from "./CountryList.module.css";

interface Countries {
  country: string;
  emoji: string;
}

const CountryList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return <Message message="Click on the map to add a city" />;

  const countries = cities.reduce((arr: Countries[] | [], city: Countries) => {
    if (!arr.map((el) => el.country).includes(city.country)) {
      return [...arr, { city, country: city.country, emoji: city.emoji }];
    } else {
      return arr;
    }
  }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.country} />
      ))}
    </ul>
  );
};

export default CountryList;
