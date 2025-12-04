import PageNav from "../components/PageNav/PageNav";
import styles from "./Login.module.css";
import { useEffect, useState } from "react";
import { useAuthContext } from "../context/FakeAuthContext";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button/Button";
import Message from "../components/Message/Message";

export default function Login() {
	// PRE-FILL FOR DEV PURPOSES
	const [email, setEmail] = useState("example@example.com");
	const [password, setPassword] = useState("qwerty");
	const { login, isAuth, error } = useAuthContext();
	const navigate = useNavigate();

	function handleLogin(event) {
		event.preventDefault();
		if (email && password) login(email, password);
	}

	useEffect(() => {
		if (isAuth) navigate("/app", { replace: true }); // to replace sprawia że po loginie w historii  strona loginu jest usuwana, więc jak  ktoś da strzałkę do tyłu w apce to go cofnie do / zamiast do /login, które go znowu wrzuciłoby do /app
	}, [isAuth, navigate]);

	return (
		<main className={styles.login}>
			<PageNav />
			<form className={styles.form} onSubmit={handleLogin}>
				<div className={styles.row}>
					<label htmlFor="email">Email address</label>
					<input type="email" id="email" onChange={(e) => setEmail(e.target.value)} value={email} />
				</div>

				<div className={styles.row}>
					<label htmlFor="password">Password</label>
					<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} value={password} />
				</div>

				<div>
					<Button type="primary">Login</Button>
				</div>
			</form>
			{error && <Message message={error} />}
		</main>
	);
}
