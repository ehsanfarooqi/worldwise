import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const BASE_URL = "http://localhost:9000";

// Create Context
const CitiesContext = createContext();

const intialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: "",
};

function reducer(state, action) {
  switch (action.type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "rejected":
      return {
        ...state,
        error: payload,
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
        cities: [...state.cities, action.payload],
        currentCity: action.payload,
      };
    case "city/deleted":
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== action.payload),
      };
    default:
      throw new Error("Unkowing action");
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity }, dispatch] = useReducer(
    reducer,
    intialState
  );

  // Fetch cities data from fake API
  useEffect(() => {
    async function fetchCities() {
      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        dispatch({ type: "cities/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading cities",
        });
      }
    }
    fetchCities();
  }, []);

  // Get current city bei ID
  const getCity = useCallback(
    async function getCity(id) {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: "loading" });
      try {
        const res = await fetch(`${BASE_URL}/cities/${id}`);
        const data = await res.json();
        dispatch({ type: "city/loaded", payload: data });
      } catch (err) {
        dispatch({
          type: "rejected",
          payload: "There was an error loading city",
        });
      }
    },
    [currentCity.id]
  );

  // Create new City
  async function createCity(newCity) {
    dispatch({ type: "loading" });
    try {
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      dispatch({ type: "city/created", payload: data });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error creating city",
      });
    }
  }

  // Delete City bei ID
  async function deleteCity(id) {
    dispatch({ type: "loading" });
    try {
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      dispatch({ type: "city/deleted", payload: id });
    } catch (err) {
      dispatch({
        type: "rejected",
        payload: "There was an error deleting city",
      });
    }
  }

  // Props
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
}

// Create useContext hook
function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was use outside of the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
