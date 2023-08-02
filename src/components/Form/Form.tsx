// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";

import styles from "./Form.module.css";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import BackButton from "../BackButton/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useCities } from "../../contexts/CitiesContext";

export function convertToEmoji(countryCode: string) {
  const codePoints: number[] = countryCode
    .toUpperCase()
    .split("")
    .map((char: string) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
  const [lat, lng] = useUrlPosition();

  const [cityName, setCityName] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");

  const [emoji, setEmoji] = useState("");

  const [geocodingError, setGeocodingError] = useState("");

  const { createCity, isLoading } = useCities();

  const navigate = useNavigate();

  useEffect(() => {
    if (!lat || !lng) return;
    const fetchCityData = async () => {
      try {
        setIsLoadingGeoCoding(true);
        setGeocodingError("");
        const res = await fetch(`${BASE_URL}?latitude=${lat}&longitude=${lng}`);

        const data = await res.json();

        if (!data.countryCode) {
          throw new Error("That doesn't seem to be a valid country😃");
        }

        console.log(data);

        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        if (error instanceof Error) {
          setGeocodingError(error.message);
        }
      } finally {
        setIsLoadingGeoCoding(false);
      }
    };

    fetchCityData();
  }, [lat, lng]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!cityName || !date) return;

    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng },
    };

    createCity(newCity);
    navigate("/app/cities");
  };

  if (isLoadingGeoCoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Click on the map to add a city" />;

  if (geocodingError) return <Message message={geocodingError} />;

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>

        <DatePicker
          id="date"
          selected={date}
          onChange={(date) => date && setDate(date)}
          dateFormat={"dd/MM/yyyy"}
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
