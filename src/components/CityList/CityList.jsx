import styles from "./CityList.module.css";
import Spinner from "../Spinner/Spinner";
import CityItem from "../CityItem/CityItem";
import Message from "../Message/Message";
import { useCitiesContext } from "../../context/CitiesContext";

function CityList() {
	const { isLoading, cities } = useCitiesContext();

	if (isLoading) return <Spinner />;
	if (cities.length === 0) return <Message message="Add your first city by clicking on the city on the map" />;
	return (
		<ul className={`${styles.cityList} `}>
			{cities.map((cityObj) => (
				<CityItem cityObj={cityObj} key={cityObj.id} />
			))}
		</ul>
	);
}

export default CityList;
