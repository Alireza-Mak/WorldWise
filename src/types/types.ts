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
    id: number;
}
type CitiesType = CityType[] | [];

export type { CitiesType, CityType };
