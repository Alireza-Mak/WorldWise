import { createContext, useReducer } from "react";
import type { AuthType, UserType } from "../types/types";
const initialState: AuthType = {
    user: null,
    isAuthenticated: false,
    login: () => {},
    logout: () => {},
};

const FAKE_USER: UserType = {
    name: "alex",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "jack@example.com",
    password: "qwerty",
};

const AuthContext = createContext<AuthType | undefined>(undefined);
type AuthActionType = { type: "login"; payload: UserType } | { type: "logout" };
function reducer(state: AuthType, action: AuthActionType): AuthType {
    switch (action.type) {
        case "login":
            return {
                ...state,
                isAuthenticated: true,
                user: action.payload,
            };
        case "logout":
            return {
                ...state,
                isAuthenticated: false,
                user: null,
            };
        default:
            throw new Error("Action does not exist.");
    }
}
function AuthProvider({ children }: { children: React.ReactNode }) {
    const [{ isAuthenticated, user }, dispatch] = useReducer(
        reducer,
        initialState,
    );
    function login(email: string, password: string) {
        if (email === FAKE_USER.email && password === FAKE_USER.password) {
            dispatch({ type: "login", payload: FAKE_USER });
        }
    }
    function logout() {
        dispatch({ type: "logout" });
    }

    const state: AuthType = { user, isAuthenticated, login, logout };
    return <AuthContext value={state}>{children}</AuthContext>;
}

export { AuthProvider, AuthContext };
