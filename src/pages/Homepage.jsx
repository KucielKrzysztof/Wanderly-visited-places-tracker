import { Link } from "react-router-dom";
import styles from "./Homepage.module.css";
import PageNav from "../components/PageNav/PageNav";
import BackgroundSlideshow from "../components/HomeBackground/BackgroundSlideShow";

export default function Homepage() {
	return (
		<main className={styles.homepage}>
			<PageNav />

			<BackgroundSlideshow />

			<section>
				<h1>Wanderly </h1>
				<h2>
					Wanderly is a simple and beautiful way to mark every place you've visited — from small towns to entire countries. Build your personal travel
					map, track your journey across the globe, and see how your world grows with every new adventure
				</h2>
				<Link to="/login" className={`cta  ${styles.button}`}>
					Start now
				</Link>
			</section>
		</main>
	);
}
