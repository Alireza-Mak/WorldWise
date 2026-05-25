import "leaflet/dist/leaflet.css";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useState } from "react";
import useCities from "../hooks/useCities";
import Button from "./Button";
import { useGeolocation } from "../hooks/useGeolocation";

function ChangeCenter({
    position,
}: {
    position: { lat: number; lng: number };
}) {
    const map = useMap();

    useEffect(() => {
        map.setView(position);
    }, [map, position]);

    return null;
}

function DetectClick() {
    const navigate = useNavigate();
    useMapEvents({
        click(e) {
            const { lat, lng } = e.latlng;
            navigate(`form?lat=${lat}&lng=${lng}`);
        },
    });
    return <></>;
}

export default function Map() {
    const [searchParams] = useSearchParams();
    const [mapPosition, setMapPosition] = useState({ lat: 40, lng: 0 });
    const {  isLoading, getPosition, position } = useGeolocation();
    const { cities } = useCities();
    const mapLat = searchParams.get("lat");
    const mapLng = searchParams.get("lng");

    useEffect(() => {
        function changePosition() {
            if (mapLat && mapLng)
                setMapPosition((PrevPos) =>
                    PrevPos.lat != +mapLat || PrevPos.lng != +mapLng
                        ? { lat: +mapLat, lng: +mapLng }
                        : PrevPos,
                );
        }
        changePosition();
    }, [mapLat, mapLng]);

    useEffect(() => {
        function changePosition() {
            if (position) setMapPosition(position);
        }
        changePosition();
    }, [position]);
    return (
        <div className={styles.mapContainer}>
            {!position && (
                <Button type="position" OnBtnClick={getPosition}>
                    {isLoading ? "Loading..." : "Get current position"}
                </Button>
            )}
            <MapContainer
                center={mapPosition}
                zoom={10}
                scrollWheelZoom={true}
                className={styles.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker key={city.id} position={city.position}>
                        <Popup className="leaflet-popup ">
                            <img
                                width="16"
                                height="12"
                                alt={city.cityName}
                                src={`https://flagcdn.com/16x12/${city.tag}.png`}
                            />
                            {city.cityName}
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter
                    position={
                        mapLat && mapLng
                            ? { lat: +mapLat, lng: +mapLng }
                            : mapPosition
                    }
                />
                <DetectClick />
            </MapContainer>
        </div>
    );
}
