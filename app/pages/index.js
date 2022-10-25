import Head from 'next/head';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>UNcademy</title>
				<meta name="description" content="Generated by create next app" />
				<link rel="icon" href="/6-removebg-preview.png" />
			</Head>

			<main className={styles.main}>
				<h1 className="text-5xl font-bold underline">Hello world!</h1>
			</main>
		</div>
	);
}