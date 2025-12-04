import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./BackgroundSlideShow.module.css";

export default function BackgroundSlideshow() {
	const images = ["/bg1.jpg", "/bg2.jpg", "/bg3.jpg"];

	const [index, setIndex] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className={styles.bg}>
			<AnimatePresence>
				<motion.div
					key={index}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 1.5, ease: "easeInOut" }}
					className={styles.slide}
					style={{
						backgroundImage: `linear-gradient(rgba(36,42,46,0.8), rgba(36,42,46,0.8)), url(${images[index]})`,
					}}
				/>
			</AnimatePresence>
		</div>
	);
}
