import { useEffect, useState } from "react";
import styles from "./Form.module.css";
import Button from "./Button";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useURLPosition";
import { useFetch } from "../hooks/useFetch";
import Spinner from "./Spinner";
import Message from "./Message";
import type { NewCityType } from "../types/types";
import useCities from "../hooks/useCities";
import { formatDateInput } from "../utils/reusableFunctions";
import { useNavigate } from "react-router-dom";

function Form() {
    const { lat, lng } = useUrlPosition();
    const { addCity, isLoading: cityLoading } = useCities();
    const [cityName, setCityName] = useState("");
    const [country, setCountry] = useState("");
    const [tag, setTag] = useState("");
    const [date, setDate] = useState<string>(formatDateInput(new Date()));
    const [notes, setNotes] = useState("");
    const URL = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`;
    const { data, error, isLoading } = useFetch(URL);
    const navigate = useNavigate();
    useEffect(() => {
        function getChanges() {
            if (data && data["countryCode"]) {
                setCityName(data["city"]);
                setCountry(data["countryName"]);
                setTag(String(data["countryCode"]).toLowerCase());
            }
        }
        getChanges();
    }, [data]);

    const handleSubmitForm = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!date || !cityName) return;

        const newCity: NewCityType = {
            cityName,
            country,
            date,
            notes,
            position: { lat: +lat!, lng: +lng! },
            tag,
        };
        await addCity(newCity);
        navigate("/app");
    };

    if (!lat || !lng)
        return <Message message="Start by clicking somewhere on a map!" />;
    if (error && !isLoading) return <Message message={error} />;
    if (data && !data["city"])
        return <Message message="Please select a correct city. 🙂" />;
    if (isLoading) return <Spinner />;

    return (
        <form
            className={`${styles.form} ${cityLoading ? styles.loading : ""}`}
            onSubmit={handleSubmitForm}
        >
            <div className={styles.row}>
                <label htmlFor="cityName">City name</label>
                <input
                    id="cityName"
                    onChange={(e) => setCityName(e.target.value)}
                    value={cityName}
                />
                <span className={styles.flag}>
                    <img
                        src={`https://flagcdn.com/16x12/${tag}.png`}
                        width="16"
                        height="12"
                        alt={`${country}`}
                    />
                </span>
            </div>

            <div className={styles.row}>
                <label htmlFor="date">When did you go to {cityName}?</label>
                <input
                    type="datetime-local"
                    id="date"
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setDate(e.target.value)
                    }
                    value={date}
                />
            </div>

            <div className={styles.row}>
                <label htmlFor="notes">
                    Notes about your trip to {cityName}
                </label>
                <textarea
                    id="notes"
                    onChange={(e) => setNotes(e.target.value)}
                    value={notes}
                />
            </div>

            <div className={styles.buttons}>
                <Button type="primary">Add</Button>
                <BackButton />
            </div>
        </form>
    );
}

export default Form;
