import { createContext, useEffect, useState } from "react";
import type { CitiesType, CityType } from "../types/types";
type StateType = {
    cities: CitiesType;
    isLoading: boolean;
    currentCity: CityType | null;
    getCity: (id: number) => Promise<void>;
};
type Props = { children: React.ReactNode };

const URL = "http://localhost:9000/cities";
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    getCity: async () => {},
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

    async function getCity(id: number) {
        setIsLoading(true);
        setTimeout(async () => {
            try {
                const res = await fetch(`${URL}/${id}`);
                if (!res.ok)
                    throw new Error(`${res.status}: ${res.statusText}`);
                const data = await res.json();
                setCurrentCity(data);
            } catch (error) {
                alert(error);
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
    };
    return (
        <CitiesContext.Provider value={state}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider, CitiesContext };
