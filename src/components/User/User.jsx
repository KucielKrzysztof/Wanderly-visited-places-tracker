import { useAuthContext } from "../../context/FakeAuthContext";
import { useState } from "react";
import styles from "./User.module.css";
import { useNavigate } from "react-router-dom";

function User() {
	const { user, logout } = useAuthContext();
	const currUser = user;
	const navigate = useNavigate();

	function handleClick() {
		logout();
		navigate("/");
	}
	if (!user) return;

	return (
		<div className={styles.user}>
			<img src={currUser.avatar} alt={currUser.name} />
			<span>Welcome, {currUser.name}</span>
			<button onClick={handleClick}>Logout</button>
		</div>
	);
}

export default User;
