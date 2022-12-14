import Head from 'next/head';
import styles from '../styles/Home.module.css';
import {useEffect} from 'react';

export default function Home() {

	useEffect(() => {
		const token = localStorage.getItem('Token')
		if (!token){
			window.location.href = "/login"
		}
	}, [])

		return (
			<div className={styles.container}>
				<Head>
					<title>UNcademy</title>
					<meta name="description" content="Generated by create next app"/>
					<link rel="icon" href="/6-removebg-preview.png"/>
				</Head>

				<main>
					<div
						className="w-5/6 mt-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
						<div className="flex justify-center">
							<img className="mr-3 w-48" src="/6-removebg-preview.png"/>
						</div>
						<div className="flex justify-center">
							<h1>Le damos la bienvenida al Sistema de Información Académica <b>UNcademy</b></h1>
						</div>
					</div>
				</main>
			</div>
		);
}
