import { Link } from "react-router-dom";
import styles from "./CityItem.module.css";
import { useCitiesContext } from "../../context/CitiesContext";

const formatDate = (date) =>
	new Intl.DateTimeFormat("en", {
		day: "numeric",
		month: "long",
		year: "numeric",
	}).format(new Date(date));

function CityItem({ cityObj }) {
	const { cityName, emoji, date, id, position } = cityObj;
	const { lat, lng } = position;

	const { removeCity, newCity } = useCitiesContext();

	function handleClick(event) {
		event.preventDefault();
		removeCity(id);
	}
	return (
		<li className="hoverScale">
			<Link className={`${id === newCity.id ? styles["cityItem--active"] : ""}   ${styles.cityItem}`} to={`${id}?lat=${lat}&lng=${lng}`}>
				<span className={styles.emoji}>{emoji}</span>
				<h3 className={styles.name}>{cityName}</h3>
				<time className={styles.date}>{formatDate(date)}</time>
				<button className={styles.deleteBtn} onClick={handleClick}>
					&times;
				</button>
			</Link>
		</li>
	);
}

export default CityItem;
