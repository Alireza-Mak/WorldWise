import { createContext, useEffect, useState } from "react";
import type { CitiesType } from "../types/types";
type StateType = {
    cities: CitiesType;
    isLoading: boolean;
    OnSelectedCityId: (id: number) => void;
    currentCityId: number | null;
};
const initialState = {
    cities: [],
    isLoading: false,
    OnSelectedCityId: () => {},
    currentCityId: null,
};
const CitiesContext = createContext<StateType>(initialState);

type Props = { children: React.ReactNode };
const URL = "http://localhost:9000/cities";
const CitiesProvider = ({ children }: Props) => {
    const [cities, setCities] = useState<CitiesType>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [currentCityId, setCurrentCityID] = useState<number | null>(null);

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
    const OnSelectedCityId = (id: number) => {
        setCurrentCityID(id);
    };
    const state: StateType = {
        cities,
        isLoading,
        currentCityId,
        OnSelectedCityId,
    };
    return (
        <CitiesContext.Provider value={state}>
            {children}
        </CitiesContext.Provider>
    );
};

export { CitiesProvider, CitiesContext };
