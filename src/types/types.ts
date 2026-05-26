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

export type { CitiesType, CityType, NewCityType };
