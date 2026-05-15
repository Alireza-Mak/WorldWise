import { Link } from "react-router-dom";
import type { CityType } from "../types/types";
import { formatDate } from "../utils/reusableFunctions";
import styles from "./CityItem.module.css";
import useCities from "../hooks/useCities";
type Props = { city: CityType };

function CityItem({ city }: Props) {
    const { currentCityId } = useCities();
    const {
        cityName,
        country,
        date,
        id,
        position: { lat, lng },
        tag,
    } = city;

    return (
        <li>
            <Link
                to={`${id}?lat=${lat}&lng=${lng}`}
                className={`${styles.cityItem} ${id == currentCityId && styles["cityItem--active"]}`}
            >
                <img
                    src={`https://flagcdn.com/16x12/${tag}.png`}
                    width="16"
                    height="12"
                    alt={`${country}`}
                />
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>{formatDate(date)}</time>
                <button className={styles.deleteBtn}>&times;</button>
            </Link>
        </li>
    );
}

export default CityItem;
