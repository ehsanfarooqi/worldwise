import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "./Map.module.css";

function Map() {
  const navigate = useNavigate();
  const [searchParms, setSearchParms] = useSearchParams();

  const lat = searchParms.get("lat");
  const lng = searchParms.get("lng");
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>Map</h1>
      <p>
        position {lat}, {lng}
      </p>
    </div>
  );
}

export default Map;
