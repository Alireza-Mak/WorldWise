import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import type { AuthType } from "../types/types";

export function useAuth(): AuthType {
    const state = useContext(AuthContext);
    if (state === undefined) {
        throw new Error("AuthContext was used out of the AuthProvider");
    }
    return state;
}
