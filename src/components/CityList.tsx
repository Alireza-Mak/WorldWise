import type { CitiesType, CityType } from "../types/types";
import CityItem from "./CityItem";
import styles from "./CityList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";
type Props = {
    cities: CitiesType;
    isLoading: boolean;
};
export default function CityList({ cities, isLoading }: Props) {
    if (isLoading) return <Spinner />;
    if (cities.length <= 0)
        return (
            <Message message="Add your first city by clicking on a city on the map" />
        );
    return (
        <ul className={styles.cityList}>
            {cities.map((city: CityType) => (
                <CityItem key={city.id} city={city} />
            ))}
        </ul>
    );
}
