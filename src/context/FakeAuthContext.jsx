import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

function reducer(state, action) {
	switch (action.type) {
		case "login":
			return { ...state, user: action.payload, isAuth: true };
		case "logout":
			return { ...state, user: null, isAuth: false };
		case "error":
			return { ...state, error: "Incorrect user or password" };
		default:
			throw new Error("Unknown action type");
	}
}
const initialState = {
	user: null,
	isAuth: false,
	error: "",
};

const FAKE_USER = {
	name: "Example",
	email: "example@example.com",
	password: "qwerty",
	avatar: "https://i.pravatar.cc/100?u=gg",
};

function AuthProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { user, isAuth, error } = state;

	function login(email, password) {
		if (email === FAKE_USER.email && password === FAKE_USER.password) {
			dispatch({ type: "login", payload: FAKE_USER });
		} else {
			dispatch({ type: "error" });
		}
	}
	function logout() {
		dispatch({ type: "logout" });
	}

	return <AuthContext.Provider value={{ user, isAuth, login, logout, error }}>{children}</AuthContext.Provider>;
}

function useAuthContext() {
	const context = useContext(AuthContext);
	if (context === undefined) throw new Error("AuthContext used outside the AuthContextProvider");
	return context;
}

export { useAuthContext, AuthProvider };
