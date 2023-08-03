import {
  createContext,
  useEffect,
  useState,
  useContext,
  useReducer,
} from "react";
import { Cities } from "../types";

type CitiesContextType = {
  cities: Cities[] | null;
  isLoading: boolean;
  currentCity: Cities | null;
  getCity: (id: string) => void;
  createCity: (newCity: Omit<Cities, "id">) => void;
  deleteCity: (id: string) => void;
};

const CitiesContext = createContext<CitiesContextType>({
  cities: [],
  isLoading: false,
  currentCity: null,
  getCity: () => {},
  createCity: () => {},
  deleteCity: () => {},
});

type State = {
  cities: Cities[] | null;
  isLoading: boolean;
  currentCity: Cities | null;
  error: string | null;
};

type Action =
  | { type: "loading" }
  | { type: "cities/loaded"; payload: Cities[] }
  | { type: "city/loaded"; payload: Cities }
  | { type: "city/created"; payload: Cities }
  | { type: "cities/deleted"; payload: string }
  | { type: "rejected"; payload: string };

const initialState = {
  cities: null,
  isLoading: false,
  currentCity: null,
  error: "",
};

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "cities/loaded":
      return {
        ...state,
        isLoading: false,
        cities: action.payload,
      };
    case "city/loaded":
      return {
        ...state,
        isLoading: false,
        currentCity: action.payload,
      };
    case "city/created":
      return {
        ...state,
        isLoading: false,
        cities: state.cities && [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "cities/deleted":
      return {
        ...state,
        isLoading: false,
        cities:
          state.cities &&
          state.cities.filter((el) => Number(el.id) !== Number(action.payload)),
        currentCity: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

const BASE_URL = "http://localhost:5000";

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
  // const [cities, setCities] = useState<Cities[] | []>([]);
  // const [currentCity, setCurrentCity] = useState<Cities | null>(null);

  // const [isLoading, setIsLoading] = useState<boolean>(false);

  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(BASE_URL + "/cities");
        const data = await res.json();

        dispatch({ type: "cities/loaded", payload: data });
      } catch (error) {
        dispatch({ type: "rejected", payload: "Something went wrong" });
      }
    };

    fetchCities();
  }, []);

  const getCity = async (id: string) => {
    if (id === currentCity?.id) return;
    dispatch({ type: "loading" });
    try {
      const res = await fetch(BASE_URL + "/cities/" + id);
      const data = await res.json();

      dispatch({ type: "city/loaded", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  };

  const createCity = async (newCity: Omit<Cities, "id">) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(BASE_URL + "/cities/", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();

      dispatch({ type: "city/created", payload: data });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  };

  const deleteCity = async (id: string) => {
    try {
      dispatch({ type: "loading" });
      const res = await fetch(BASE_URL + "/cities/" + id, {
        method: "DELETE",
      });
      const data = await res.json();

      dispatch({ type: "cities/deleted", payload: id });
    } catch (error) {
      dispatch({ type: "rejected", payload: "Something went wrong" });
    }
  };

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity,
      }}
    >
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
