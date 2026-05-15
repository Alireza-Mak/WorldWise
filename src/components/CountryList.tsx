import useCities from "../hooks/useCities";
import type { CitiesType, CityType } from "../types/types";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

export default function CountryList() {
    const { cities, isLoading } = useCities();
    const countries = cities.reduce((data, city) => {
        if (!data.find((el) => el.country === city.country))
            return [...data, city];
        else {
            return data;
        }
    }, [] as CitiesType);

    if (isLoading) return <Spinner />;

    if (cities.length <= 0)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );

    return (
        <ul className={styles.countryList}>
            {countries.map((country: CityType) => (
                <CountryItem key={country.id} country={country} />
            ))}
        </ul>
    );
}
