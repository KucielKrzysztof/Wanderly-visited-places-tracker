import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
/* import { useCityContext } from "../../context/CityContext"; */
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCitiesContext } from "../../context/CitiesContext";
import { useGeolocation } from "../../hooks/useGeolocation";
import Button from "../Button/Button";
import { useUrlPosition } from "../../hooks/useUrlPosition";

function Map() {
	const navigate = useNavigate();

	const { getPosition: getGeolocationPosition, isLoading: isLoadingPosition, position: geolocationPosition } = useGeolocation();
	/* const { currentCity } = useCityContext(); */
	const { cities } = useCitiesContext();
	const defaultPosition = cities?.[0]?.position ? [cities[0].position.lat, cities[0].position.lng] : [40, 0];
	const [mapPosition, setMapPosition] = useState(defaultPosition);
	const { lat: mapLat, lng: mapLng } = useUrlPosition();

	useEffect(() => {
		if (mapLat && mapLng) {
			setMapPosition([mapLat, mapLng]);
		}
	}, [mapLat, mapLng]);

	useEffect(() => {
		if (geolocationPosition) {
			const { lat: geoLat, lng: geoLng } = geolocationPosition;
			setMapPosition([geoLat, geoLng]);
			navigate(`form?lat=${geoLat}&lng=${geoLng}`);
		}
	}, [geolocationPosition]);

	return (
		<div className={styles.mapContainer}>
			<Button type="position" onClick={getGeolocationPosition}>
				{isLoadingPosition ? "Loading" : "Use yor posision"}
			</Button>

			<MapContainer className={styles.map} center={mapPosition} zoom={6} scrollWheelZoom={true}>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
				/>
				{cities.map((city) => (
					<Marker position={[city.position.lat, city.position.lng]} key={city.id}>
						<Popup>
							<>
								<span>{city.emoji}</span>
								<span>{city.cityName}</span>
							</>
						</Popup>
					</Marker>
				))}
				{mapPosition && <Marker position={mapPosition}></Marker>}
				<ChangeCenter position={mapPosition} />
				<DetectClick />
			</MapContainer>
		</div>
	);
}

//Komponent służący tylko do zmieniania pozycji mapy, używa dostarczonego przez leaflet-react hook useMap do ustawiania metodą mapView obecnej pozycji na mapie, musi być w <MapContainer>
function ChangeCenter({ position }) {
	const map = useMap();
	map.setView(position);
	return null;
}

//Komponent dostarczający funkcjonalność, ze jak klikniemy na mapie to przeniesie nas do formularza z możliwością dodania miejsca kliknięteog do odwiedzonych
// Oczywiście w komponencie formularza musimy przechwycić te dane z url
//Używamy dostarczonego przez Leaflef-react useMapEvents( które pozwala obsługiwać eventy na mapie). Tutaj używamy eventu click który ma w sobie różne wartości, np. latlng zawierające pozycje lat i lag miejsca kliknietego.
function DetectClick() {
	const navigate = useNavigate();
	useMapEvents({
		click: (event) => navigate(`form?lat=${event.latlng.lat}&lng=${event.latlng.lng}`),
	});
}

export default Map;
