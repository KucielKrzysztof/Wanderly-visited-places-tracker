import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/FakeAuthContext";
import { useEffect } from "react";

function ProtectedRoute({ children }) {
	const { isAuth } = useAuthContext();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuth) navigate("/");
	}, [isAuth, navigate]);

	return <>{isAuth ? children : null}</>;
}

export default ProtectedRoute;
