import PageNav from "../components/PageNav/PageNav";
import styles from "./Product.module.css";

export default function Product() {
	return (
		<main className={styles.product}>
			<PageNav />
			<section>
				<img src="img-2.png" alt="tokyo shibuya street" className={styles.animateImg} />
				<div>
					<h2>
						Just <span className={styles.price}>$5</span>/month.
					</h2>
					<p>
						For the price of a coffee, you can unlock a clean, intuitive way to document your travels. Wanderly’s premium plan gives you unlimited map
						pins, detailed location insights, personalized travel statistics, and cloud sync across all your devices.
					</p>
					<p>
						Whether you're exploring new cities or revisiting old favorites, Wanderly helps you keep track of every place that shaped your journey —
						simply, beautifully, and without limits.
					</p>
				</div>
			</section>
		</main>
	);
}
