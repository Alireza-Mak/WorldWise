import { useParams } from "react-router-dom";
import { formatDate } from "../utils/reusableFunctions";
import styles from "./City.module.css";
import useCities from "../hooks/useCities";
import { useEffect } from "react";
import BackButton from "./BackButton";
import Spinner from "./Spinner";
function City() {
    const { id } = useParams();
    const { getCity, currentCity, isLoading } = useCities();

    useEffect(() => {
        getCity(id!);
    }, [id]);

    if (isLoading) return <Spinner />;
    if (currentCity) {
        const { cityName, tag, date, notes, country } = currentCity;
        return (
            <div className={styles.city}>
                <div className={styles.row}>
                    <h6>City name</h6>
                    <h6>{id}</h6>
                    <h3>
                        <img
                            src={`https://flagcdn.com/16x12/${tag}.png`}
                            width="16"
                            height="12"
                            alt={`${country}`}
                        />
                        {cityName}
                    </h3>
                </div>

                <div className={styles.row}>
                    <h6>You went to {cityName} on</h6>
                    <p>{formatDate(date) || null}</p>
                </div>

                {notes && (
                    <div className={styles.row}>
                        <h6>Your notes</h6>
                        <p>{notes}</p>
                    </div>
                )}

                <div className={styles.row}>
                    <h6>Learn more</h6>
                    <a
                        href={`https://en.wikipedia.org/wiki/${cityName}`}
                        target="_blank"
                        rel="noreferrer"
                    >
                        Check out {cityName} on Wikipedia &rarr;
                    </a>
                </div>

                <div>
                    <BackButton />
                </div>
            </div>
        );
    }
}

export default City;
