import type { CityType } from "../types/types";
import styles from "./CountryItem.module.css";
type Props = { country: CityType };
function CountryItem({ country }: Props) {
    return (
        <li className={styles.countryItem}>
            <img
                src={`https://flagcdn.com/16x12/${country.tag}.png`}
                width="16"
                height="12"
                alt={`${country.country}`}
            />
            <span>{country.country}</span>
        </li>
    );
}

export default CountryItem;
