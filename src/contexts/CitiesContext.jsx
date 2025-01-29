import { createContext, useContext, useEffect, useState } from "react";

const BASE_URL = "http://localhost:9000";

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCites] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentCity, setCurrentCity] = useState([]);

  useEffect(() => {
    async function fetchCities() {
      try {
        setIsloading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCites(data);
      } catch (err) {
        alert("There was an error fetching data");
      } finally {
        setIsloading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (err) {
      alert("There was an error get city data");
    } finally {
      setIsloading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsloading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCites((cities) => [...cities, data]);
    } catch (err) {
      alert("There was an error Crating city");
    } finally {
      setIsloading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsloading(true);
      await fetch(`${BASE_URL}/cities/${id}`, { method: "DELETE" });
      setCites((cities) => cities.filter((city) => city.id !== id));
    } catch (err) {
      alert("There was an error Deleting city");
    } finally {
      setIsloading(false);
    }
  }

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

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error("CitiesContext was use outside of the CitiesProvider");
  return context;
}

export { CitiesProvider, useCities };
