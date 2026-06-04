interface CityType {
    cityName: string;
    country: string;
    tag: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
    id: string;
}
interface NewCityType {
    cityName: string;
    country: string;
    tag: string;
    date: string;
    notes: string;
    position: {
        lat: number;
        lng: number;
    };
}
type CitiesType = CityType[] | [];

type StateType = {
    cities: CitiesType;
    isLoading: boolean;
    error: string;
    currentCity: CityType | null;
    getCity: (id: string) => Promise<void>;
    addCity: (city: NewCityType) => Promise<void>;
    deleteCity: (id: string) => Promise<void>;
};

type UserType = {
    name: string;
    avatar: string;
    email: string;
    password: string;
};
interface AuthType {
    user: UserType | null;
    isAuthenticated: boolean;
    login: (username: string, password: string) => void;
    logout: () => void;
}

export type {
    CitiesType,
    CityType,
    NewCityType,
    StateType,
    AuthType,
    UserType,
};
