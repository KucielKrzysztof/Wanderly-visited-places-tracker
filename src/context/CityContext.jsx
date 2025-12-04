import { useContext, createContext, useReducer, useCallback } from "react";

const API_URL = "http://localhost:8000";

const CityContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "loading":
			return { ...state, cityLoading: true };
		case "city/loaded":
			return { ...state, currentCity: action.payload, cityLoading: false };
		case "rejected":
			return { ...state, error: action.payload, isLoading: false };
		default:
			throw new Error("Unknown action type");
	}
}

const initialState = {
	currentCity: {},
	cityLoading: false,
	error: "",
};

function CityProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { currentCity, cityLoading } = state;

	const getCity = useCallback(
		async function getCity(id) {
			if (!id) return;
			if (id === currentCity.id) return;
			dispatch({ type: "loading" });
			try {
				const res = await fetch(`${API_URL}/cities?id=${id}`);
				const data = await res.json();
				dispatch({ type: "city/loaded", payload: data });
			} catch (error) {
				dispatch({ type: "rejected", payload: error.message });
			}
		},
		[currentCity.id]
	);
	return <CityContext.Provider value={{ getCity, currentCity, cityLoading }}>{children}</CityContext.Provider>;
}

function useCityContext() {
	const context = useContext(CityContext);
	if (context === undefined) throw new Error("CityContext used outside the CityContextProvider");
	return context;
}

export { useCityContext, CityProvider };
