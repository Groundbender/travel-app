import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import { useCities } from "../../contexts/CitiesContext";

const CityList = () => {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (cities && !cities.length)
    return <Message message="Click on the map to add a city" />;

  return (
    <ul className={styles.cityList}>
      {cities?.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
};

export default CityList;
