import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';
import jwtDecode from "jwt-decode";

export const Header = () => {

	const [openNav, setOpenNav] = useState(false);

	const [logged, setLogged] = useState(false);

	const [role, setRole] = useState("");


	useEffect(() => {
		const token = localStorage.getItem('Token')
		if (token){
			setLogged(true)
			setRole(jwtDecode(token).usertype)
		}
	}, [])

	useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className=" mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			{
				!logged ?
				<Typography
					as="li"
					variant="h6"
					color="black"
					className="p-1 font-normal"
				>
					<Link href="/login" className="flex items-center">
						Inicia sesión
					</Link>
				</Typography> : null
			}
			{
				!logged ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/register" className="flex items-center">
							Registra usuario
						</Link>
					</Typography> : null
			}
			{
				logged && (role === "student" || role === "both") ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/horario/105" className="flex items-center">
							Ver Horario
						</Link>
					</Typography> : null
			}
			{
				logged && (role === "student" || role === "both") ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/process" className="flex items-center">
							Proceso de inscripción
						</Link>
					</Typography> : null
			}
			{
				logged && (role === "student" || role === "both") ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/financial-info" className="flex items-center">
							Información Financiera
						</Link>
					</Typography> : null
			}
			{
				logged && (role === "student" || role === "both") ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/external" className="flex items-center">
							Intercambios
						</Link>
					</Typography> : null
			}
			{
				logged && (role === "professor" || role === "both") ?
					<Typography
						as="li"
						variant="h6"
						color="black"
						className="p-1 font-normal"
					>
						<Link href="/teacher" className="flex items-center">
							Rol de Docente
						</Link>
					</Typography> : null
			}
			{
				logged ?
					<button
						onClick={() => {
							localStorage.removeItem('Token')
							window.location.href = "/"
						}
					}
						className="bg-m hover:bg-blue-700 text-sm text-white py-2 px-2 mx-auto rounded flex">
						<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5 mr-2">
							<path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
						</svg>
						Cerrar sesión
					</button> : null
			}
		</ul>
	);

	return (
		<Navbar className="w-5/6 mt-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4">
			<div className="sticky container mx-auto flex items-center justify-between text-red text-2xl">
				<div className="flex items-center">
					<img className="mr-3 w-16" src="/6-removebg-preview.png" />
					<Link href="/" className="mr-4 py-1.5 font-normal">
						UNcademy
					</Link>
				</div>

				<div className="hidden lg:block">{navList}</div>

				<IconButton
					variant="text"
					className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
					ripple={false}
					onClick={() => setOpenNav(!openNav)}
				>
					{openNav ? (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							className="h-6 w-6"
							viewBox="0 0 24 24"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					) : (
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-6 w-6"
							fill="none"
							stroke="currentColor"
							strokeWidth={2}
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					)}
				</IconButton>
			</div>
			<MobileNav open={openNav}>{navList}</MobileNav>
		</Navbar>
	);
};
