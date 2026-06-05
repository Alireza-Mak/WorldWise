import { createContext, useEffect, useReducer, useCallback } from "react";
import type { CityType, NewCityType, StateType } from "../types/types";

const URL = "http://localhost:9000/cities";
const initialState = {
    cities: [],
    isLoading: false,
    currentCity: null,
    error: "",
    getCity: async () => {},
    addCity: async () => {},
    deleteCity: async () => {},
};
type ActionType =
    | { type: "loading"; payload: boolean }
    | { type: "rejected"; payload: string }
    | { type: "cities/loaded"; payload: CityType[] }
    | { type: "city/loaded"; payload: CityType }
    | { type: "city/created"; payload: CityType }
    | { type: "city/deleted"; payload: string };

const CitiesContext = createContext<StateType>(initialState);

function reducer(state: StateType, action: ActionType): StateType {
    const { type, payload } = action;
    switch (type) {
        case "loading":
            return { ...state, isLoading: payload };
        case "rejected":
            return { ...state, isLoading: false, error: payload };
        case "cities/loaded":
            return { ...state, isLoading: false, cities: payload };
        case "city/loaded":
            return { ...state, isLoading: false, currentCity: payload };
        case "city/created":
            return {
                ...state,
                isLoading: false,
                currentCity: action.payload,
                cities: [...state.cities, action.payload],
            };
        case "city/deleted":
            return {
                ...state,
                isLoading: false,
                currentCity: null,
                cities: [...state.cities.filter((c) => c.id !== payload)],
            };
        default:
            throw new Error("Action does not exist");
    }
}

const CitiesProvider = ({ children }: { children: React.ReactNode }) => {
    const [{ cities, currentCity, isLoading, error }, dispatch] = useReducer(
        reducer,
        initialState,
    );

    useEffect(function () {
        dispatch({ type: "loading", payload: true });

        async function fetchCities() {
            try {
                const res = await fetch(URL);
                if (!res.ok)
                    throw new Error(`${res.status}: ${res.statusText}`);
                const data = await res.json();
                dispatch({ type: "cities/loaded", payload: data });
            } catch {
                dispatch({ type: "rejected", payload: "Error to get cities" });
            }
        }
        const id = setTimeout(() => fetchCities(), 500);
        return () => clearTimeout(id);
    }, []);

    const getCity = useCallback(
        async function getCity(id: string) {
            if (id === currentCity?.id) return;

            dispatch({ type: "loading", payload: true });

            setTimeout(async () => {
                try {
                    const res = await fetch(`${URL}/${id}`);
                    if (!res.ok)
                        throw new Error(`${res.status}: ${res.statusText}`);
                    const data = await res.json();
                    dispatch({ type: "city/loaded", payload: data });
                } catch {
                    dispatch({
                        type: "rejected",
                        payload: "Error to get current city",
                    });
                }
            }, 500);
        },
        [currentCity?.id],
    );

    async function addCity(city: NewCityType) {
        dispatch({ type: "loading", payload: true });

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
                dispatch({ type: "city/created", payload: data });
            } catch {
                dispatch({ type: "rejected", payload: "Error to add a city" });
            }
        }, 500);
    }

    async function deleteCity(id: string) {
        dispatch({ type: "loading", payload: true });

        setTimeout(async () => {
            try {
                await fetch(`${URL}/${id}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                dispatch({ type: "city/deleted", payload: id });
            } catch {
                dispatch({
                    type: "rejected",
                    payload: "Error to delete the city",
                });
            }
        }, 500);
    }

    const state: StateType = {
        cities,
        isLoading,
        error,
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
