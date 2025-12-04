import PageNav from "../components/PageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<img src="img-1.png" alt="kissing couple" className={styles.animateImg} />
				<div>
					<h2>What is Wanderly.</h2>
					<p>
						Wanderly is an interactive travel map that lets you mark every place you’ve visited. Explore your adventures visually and see how your
						personal map grows with every journey.
					</p>
					<p>
						Simply click on the map to add locations you’ve been to, track your travels, and create a beautiful record of your experiences. Perfect
						for wanderers who love to explore and share their journeys.
					</p>
					<p>
						Keep your memories organized, discover new destinations, and celebrate your global adventures all in one place. Wanderly makes travel
						tracking simple, intuitive, and fun.
					</p>
				</div>
			</section>
		</main>
	);
}
