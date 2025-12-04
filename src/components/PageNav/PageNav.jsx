import { NavLink } from "react-router-dom";
import styles from "./PageNav.module.css";
import Logo from "../Logo/Logo";
function PageNav() {
	return (
		<nav className={styles.nav}>
			<Logo />
			<ul>
				<li className="hoverScale">
					<NavLink to="/pricing">Pricing</NavLink>
				</li>
				<li className="hoverScale">
					<NavLink to="/product">Product</NavLink>
				</li>
				<li className="hoverScale">
					<NavLink to="/login" className={styles.ctaLink}>
						Login
					</NavLink>
				</li>
			</ul>
		</nav>
	);
}

export default PageNav;
