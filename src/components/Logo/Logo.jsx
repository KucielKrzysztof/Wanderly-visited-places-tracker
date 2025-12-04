import { Link } from "react-router-dom";
import styles from "./Logo.module.css";

function Logo() {
	return (
		<>
			<Link to="/">
				<img src="/logo.png" alt="Wanderly logo" className={` hoverScale ${styles.logo}`} />
			</Link>
		</>
	);
}

export default Logo;
