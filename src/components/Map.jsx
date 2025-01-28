import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvent,
} from "react-leaflet";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import styles from "./Map.module.css";

function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPostion] = useState([40, 0]);
  const [searchParms, setSearchParms] = useSearchParams();
  const {
    isLoading: isLoadingPostion,
    position: geoloacationPotion,
    getPosition,
  } = useGeolocation();

  const mapLat = searchParms.get("lat");
  const mapLng = searchParms.get("lng");

  // Change center position effect
  useEffect(() => {
    if (mapLat && mapLng) setMapPostion([mapLat, mapLng]);
  }, [mapLat, mapLng]);

  // Get your current postion
  useEffect(() => {
    if (geoloacationPotion)
      setMapPostion([geoloacationPotion.lat, geoloacationPotion.lng]);
  }, [geoloacationPotion]);

  return (
    <div className={styles.mapContainer}>
      // Buttun get your current postion
      {!geoloacationPotion && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPostion ? "Loading..." : "use your loaction"}
        </Button>
      )}
      // React components for Leaflet maps
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.fr/hot/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span> <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}

// Change center position Component
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

// Deteckt or MapEvent Component
function DetectClick() {
  const navigate = useNavigate();

  useMapEvent({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}

export default Map;
