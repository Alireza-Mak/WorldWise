import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";
import { useEffect, useRef, useState } from "react";
import type { Map as MapType } from "leaflet";

export default function Map() {
    const mapRef = useRef<MapType>(null);
    const navigate = useNavigate();
    const [searchParams, SetSearchParams] = useSearchParams();
    const [position, setPosition] = useState({ lat: 0, lng: 0 });
    const lat = Number(searchParams.get("lat"))!;
    const lng = Number(searchParams.get("lng"))!;

    useEffect(() => {
        function setNewLocation() {
            setPosition({ lat, lng });
            if (mapRef.current) {
                mapRef.current.flyTo([lat, lng], 13, {
                    animate: true,
                    duration: 2,
                });
            }
        }
        setNewLocation();
    }, [lat, lng]);

    return (
        <>
            <div
                className={styles.mapContainer}
                // onClick={() => navigate("form")}
            >
                <MapContainer
                    center={position}
                    zoom={13}
                    scrollWheelZoom={true}
                    className={styles.map}
                    ref={mapRef}
                >
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <Marker position={position}>
                        <Popup>{}</Popup>
                    </Marker>
                </MapContainer>
            </div>
        </>
    );
}
