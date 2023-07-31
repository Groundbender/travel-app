import { createContext, useEffect, useState, useContext } from "react";
import { Cities } from "../types";

type CitiesContextType = {
  cities: Cities[];
  isLoading: boolean;
  currentCity: Cities | null;
  getCity: (id: string) => void;
};

const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: () => {},
});

const BASE_URL = "http://localhost:5000";

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  const [cities, setCities] = useState<Cities[] | []>([]);
  const [currentCity, setCurrentCity] = useState<Cities | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(BASE_URL + "/cities");
        const data = await res.json();

        setCities(data);
      } catch (error) {
        alert("Something went wrong!");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(BASE_URL + "/cities/" + id);
      const data = await res.json();

      setCurrentCity(data);
    } catch (error) {
      alert("Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <CitiesContext.Provider value={{ cities, isLoading, currentCity, getCity }}>
      {children}
    </CitiesContext.Provider>
  );
};

const useCities = () => {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext must be used within a CitiesProvider");
  return context;
};

export { CitiesProvider, useCities };
