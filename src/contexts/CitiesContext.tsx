import { createContext, useEffect, useState } from "react";
import type { CitiesType, NewCityType, CityType } from "../types/types";
type StateType = {
    cities: CitiesType;
    isLoading: boolean;
    currentCity: CityType | null;
    getCity: (id: string) => Promise<void>;
    addCity: (city: NewCityType) => Promise<void>;
    deleteCity: (id: string) => Promise<void>;
};
type Props = { children: React.ReactNode };

const URL = "http://localhost:9000/cities";
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    getCity: async () => {},
    addCity: async () => {},
    deleteCity: async () => {},
};

const CitiesContext = createContext<StateType>(initialState);

const CitiesProvider = ({ children }: Props) => {
    const [cities, setCities] = useState<CitiesType>([]);
    const [currentCity, setCurrentCity] = useState<CityType | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(function () {
        (() => setIsLoading(true))();
        async function fetchCities() {
            try {
                const res = await fetch(URL);
                if (!res.ok)
                    throw new Error(`${res.status}: ${res.statusText}`);
                const data = await res.json();
                setCities(data);
            } catch (error) {
                alert(error);
            } finally {
                setIsLoading(false);
            }
        }
        const id = setTimeout(() => fetchCities(), 500);
        return () => clearTimeout(id);
    }, []);

    async function getCity(id: string) {
        console.log(id);
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const res = await fetch(`${URL}/${id}`);
                if (!res.ok)
                    throw new Error(`${res.status}: ${res.statusText}`);
                const data = await res.json();
                setCurrentCity(data);
            } catch (error) {
                alert("Error getting the city: " + error);
            } finally {
                setIsLoading(false);
            }
        }, 500);
    }

    async function addCity(city: NewCityType) {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const res = await fetch(URL, {
                    method: "POST",
                    body: JSON.stringify(city),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const data = await res.json();
                setCities((prevCities) => [...prevCities, data]);
            } catch (error) {
                alert("Error creating new city: " + error);
            } finally {
                setIsLoading(false);
            }
        }, 500);
    }

    async function deleteCity(id: string) {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                await fetch(`${URL}/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                setCities((prevCities) => [
                    ...prevCities.filter((c) => c.id !== id),
                ]);
            } catch (error) {
                alert("Error deleting the city: " + error);
            } finally {
                setIsLoading(false);
            }
        }, 500);
    }

    const state: StateType = {
        cities,
        isLoading,
        currentCity,
        getCity,
        addCity,
        deleteCity,
    };
    return (
        <CitiesContext.Provider value={state}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider, CitiesContext };
