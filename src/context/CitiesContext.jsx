import { useContext, createContext, useReducer } from "react";
import { useEffect } from "react";

const API_URL = "http://localhost:8000";
const CitiesContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, isLoading: true };
		case "cities/loaded":
			return { ...state, isLoading: false, cities: action.payload };
		case "cities/created":
			return { ...state, isLoading: false, cities: [...state.cities, action.payload], newCity: action.payload };
		case "cities/deleted":
			return { ...state, isLoading: false, newCity: {}, cities: state.cities.filter((c) => c.id !== action.payload) };
		case "rejected":
			return { ...state, error: action.payload, isLoading: false };
		default:
			throw new Error("Unknown action type");
	}
}

const initialState = {
	cities: [],
	isLoading: false,
	error: "",
	newCity: {},
};
function CitiesProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { cities, isLoading, newCity } = state;

	useEffect(() => {
		async function fetchCities() {
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${API_URL}/cities`);
				const data = await res.json();
				dispatch({ type: "cities/loaded", payload: data });
			} catch (error) {
				dispatch({ type: "rejected", payload: error.message });
			}
		}
		fetchCities();
	}, []);

	async function addCity(newCity) {
		if (!newCity) return;
		dispatch({ type: "loading" });
		try {
			const res = await fetch(`${API_URL}/cities`, {
				method: "POST",
				body: JSON.stringify(newCity),
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			dispatch({ type: "cities/created", payload: data });
		} catch (error) {
			dispatch({ type: "rejected", payload: error.message });
		}
	}

	async function removeCity(id) {
		if (!id) return;
		dispatch({ type: "loading" });
		try {
			await fetch(`${API_URL}/cities/${id}`, {
				method: "DELETE",
			});
			dispatch({ type: "cities/deleted", payload: id });
		} catch (error) {
			dispatch({ type: "rejected", payload: error.message });
		}
	}

	return <CitiesContext.Provider value={{ cities: cities, isLoading: isLoading, addCity, removeCity, newCity }}>{children}</CitiesContext.Provider>;
}

function useCitiesContext() {
	const context = useContext(CitiesContext);
	if (context === undefined) throw new Error("CitiesContext was used outside context Provider");
	return context;
}

export { CitiesProvider, useCitiesContext };
