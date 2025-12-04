// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useEffect, useState } from "react";
import Button from "../Button/Button";
import BackButton from "../Button/BackButton";
import { useUrlPosition } from "../../hooks/useUrlPosition.js";
import Message from "../Message/Message.jsx";
import Spinner from "../Spinner/Spinner.jsx";
import { useCitiesContext } from "../../context/CitiesContext.jsx";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


import styles from "./Form.module.css";

export function convertToEmoji(countryCode) {
	const codePoints = countryCode
		.toUpperCase()
		.split("")
		.map((char) => 127397 + char.charCodeAt());
	return String.fromCodePoint(...codePoints);
}

const GEOCODING_API = "https://api.bigdatacloud.net/data/reverse-geocode-client";

function Form() {
	const [cityName, setCityName] = useState("");
	const [country, setCountry] = useState("");
	const [date, setDate] = useState(new Date());
	const [notes, setNotes] = useState("");
	const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
	const [emoji, setEmoji] = useState();
	const [fetchError, setFetchError] = useState("");

	const { lat: mapLat, lng: mapLng } = useUrlPosition();

	const { addCity, isLoading } = useCitiesContext();
	const navigate = useNavigate();

	useEffect(() => {
		async function fetchCityData(lat, lng) {
			if (!mapLat && !mapLng) return;
			try {
				setFetchError("");
				setIsLoadingGeocoding(true);
				const res = await fetch(`${GEOCODING_API}?latitude=${lat}&longitude=${lng}`);
				const data = await res.json();
				if (!data.countryCode) throw new Error("This doesn't seem to be a city. Click somewhere else! 😊");
				setCityName(data.city || data.locality || "");
				setCountry(data.countryName || "");
				setEmoji(convertToEmoji(data.countryCode));
			} catch (error) {
				setFetchError(error.message);
			} finally {
				setIsLoadingGeocoding(false);
			}
		}
		fetchCityData(mapLat, mapLng);
	}, [mapLat, mapLng]);

	async function handleSubmit(event) {
		event.preventDefault();
		if (!date || !cityName) return;

		const newCity = {
			cityName: cityName,
			country: country,
			emoji: emoji,
			date: date,
			notes: notes,
			position: {
				lat: mapLat,
				lng: mapLng,
			},
			/* id: x, json.server creates automatically so no need*/
		};
		await addCity(newCity);
		navigate("/app/cities");
	}

	if (isLoadingGeocoding) return <Spinner />;
	if (fetchError) return <Message message={fetchError} />;

	if (!mapLat && !mapLng) return <Message message="Start by clicking somewhere on the map" />;
	return (
		<form className={`${styles.form} ${isLoading ? styles.loading : ""}`} onSubmit={handleSubmit}>
			<div className={styles.row}>
				<label htmlFor="cityName">City name</label>
				<input id="cityName" onChange={(e) => setCityName(e.target.value)} value={cityName} />
				<span className={styles.flag}>{emoji}</span>
			</div>

			<div className={styles.row}>
				<label htmlFor="date">When did you go to {cityName}?</label>
				{/* <input id="date" onChange={(e) => setDate(e.target.value)} value={date} /> */}
				<DatePicker startDate={date} onChange={(date) => setDate(date)} selected={date} dateFormat="dd/MM/yyyy" id="date" />
			</div>

			<div className={styles.row}>
				<label htmlFor="notes">Notes about your trip to {cityName}</label>
				<textarea id="notes" onChange={(e) => setNotes(e.target.value)} value={notes} />
			</div>

			<div className={styles.buttons}>
				<Button type="primary">Add</Button>
				<BackButton />
			</div>
		</form>
	);
}

export default Form;
