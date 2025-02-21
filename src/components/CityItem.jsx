import { Link } from "react-router-dom";
import styles from "./CItyItem.module.css";
import { useCities } from "../contexts/CitiesContext";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function CityItem({ city }) {
  const { currentCity, deleteCity } = useCities();
  const { cityName, emoji, date, id, position } = city;

  function handleDelete(e) {
    e.preventDefault();
    deleteCity(id);
  }

  return (
    <Link
      className={`${styles.cityItem} ${
        id === currentCity.id ? styles["cityItem--active"] : ""
      }`}
      to={`${id}?lat=${position.lat}&lng=${position.lng}`}
    >
      <span className={styles.emoji}>{emoji}</span>
      <h4 className={styles.name}>{cityName}</h4>
      <time className={styles.time}>({formatDate(date)})</time>
      <button className={styles.deleteBtn} onClick={handleDelete}>
        &times;
      </button>
    </Link>
  );
}

export default CityItem;
