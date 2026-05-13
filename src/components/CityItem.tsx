import type { CityType } from "../types/types";
import { formatDate } from "../utils/reusableFunctions";
import styles from "./CityItem.module.css";
type Props = { city: CityType };

function CityItem({ city }: Props) {
    const {
        cityName,
        // country,
        date,
        // id,
        // notes,
        // position: { lat, lng },
        tag,
    } = city;

    return (
        <li className={styles.cityItem}>
            <img 
                src={`https://flagcdn.com/16x12/${tag}.png`}
                width="16"
                height="12"
                alt={`${cityName}`}
            />
            <h3 className={styles.name}>{cityName}</h3>
            <time className={styles.date}>{formatDate(date)}</time>
            <button className={styles.deleteBtn}>&times;</button>
        </li>
    );
}

export default CityItem;
