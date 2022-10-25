import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
	Navbar,
	MobileNav,
	Typography,
	Button,
	IconButton,
} from '@material-tailwind/react';

export const Header = () => {
	const [openNav, setOpenNav] = useState(false);

	useEffect(() => {
		window.addEventListener(
			'resize',
			() => window.innerWidth >= 960 && setOpenNav(false)
		);
	}, []);

	const navList = (
		<ul className=" mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
			<Typography
				as="li"
				variant="h6"
				color="black"
				className="p-1 font-normal"
			>
				<Link href="/" className="flex items-center">
					Inicio
				</Link>
			</Typography>
<Typography
				as="li"
				variant="h6"
				color="black"
				className="p-1 font-normal"
			>
				<Link href="/login" className="flex items-center">
					Inicia sesión
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="h6"
				color="black"
				className="p-1 font-normal"
			>
				<Link href="/register" className="flex items-center">
					Registra usuario
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="h6"
				color="black"
				className="p-1 font-normal"
			>
				<Link href="/financial-info" className="flex items-center">
					Información Financiera
				</Link>
			</Typography>
			<Typography
				as="li"
				variant="h6"
				color="black"
				className="p-1 font-normal"
			>
				<Link href="/teacher" className="flex items-center">
					Rol de Docente
				</Link>
			</Typography>
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
