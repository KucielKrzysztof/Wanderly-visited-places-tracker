import styles from "./CountryList.module.css";
import CountryItem from "../CountryItem/CountryItem";
import { useCitiesContext } from "../../context/CitiesContext";
import Message from "../Message/Message";
import Spinner from "../Spinner/Spinner";

function CountryList() {
	const { isLoading, cities } = useCitiesContext();

	const countries = cities.reduce((arr, city) => {
		if (!arr.map((el) => el.country).includes(city.country)) return [...arr, { country: city.country, emoji: city.emoji }];
		else return arr;
	}, []);

	if (isLoading) return <Spinner />;
	if (cities.length === 0) return <Message message="Add your first city by clicking on the city on the map" />;
	return (
		<ul className={styles.countryList}>
			{countries.map((countryObj) => (
				<CountryItem country={countryObj} key={countryObj.country} />
			))}
		</ul>
	);
}

export default CountryList;
