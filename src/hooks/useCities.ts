import { useContext } from "react";
import { CitiesContext } from "../contexts/CitiesContext";

export default function useCities() {
    const state = useContext(CitiesContext);
    if (state === undefined) {
        throw new Error("CItiesContext was used out of the CitiesProvider");
    }
    return state;
}
