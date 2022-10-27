import React from 'react';

export const RegisterCard = () => {

	const handleSubmit = (event) => {
		alert('A name was submitted: ' + this.state.value);
		event.preventDefault();
	  }

	return (
		<section className="">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Registro de usuario
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									for="username"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Nombre de usuario
								</label>
								<input
									type="text"
									name="username"
									id="username"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="username"
									required=""
								/>
							</div>
							<div>
								<label
									for="usertype"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Tipo de usuario
								</label>
								<input
									type="text"
									name="usertype"
									id="usertype"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="student"
									required=""
								/>
							</div>
							<div>
								<label
									for="password"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Contraseña
								</label>
								<input
									type="password"
									name="password"
									id="password"
									placeholder="••••••••"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									required=""
								/>
							</div>
							<div>
								<label
									for="fullname"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Nombre completo
								</label>
								<input
									type="text"
									name="fullname"
									id="fullname"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Juan Perez"
									required=""
								/>
							</div>
							<div>
								<label
									for="document"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Documento de identidad
								</label>
								<input
									type="number"
									name="document"
									id="document"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
								/>
							</div>
							{/**
							"dep_document": "Cundinamarca",
							"city_document": "Bogota",
							"genre": "no binario",
							"email": "paula",
							"un_mail": "maacalderonj111@gmail.com",
							"birth_place": "cucuta",
							"cel": 7738297263,
							"age":20,
							"country": "Colombia",
							"blood_type":"o+",
							"address": "carrera 21",
							"army_card": false,
							"program": "9999999"
						*/}
							<div className="flex items-center justify-between">
								<div className="flex items-start">
									<div className="flex items-center h-5">
										<input
											id="remember"
											aria-describedby="remember"
											type="checkbox"
											className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
											required=""
										/>
									</div>
									<div className="ml-3 text-sm">
										<label
											for="remember"
											className="text-gray-500 dark:text-gray-300"
										>
											Remember me
										</label>
									</div>
								</div>
								<a
									href="#"
									className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									¿Olvidó su contraseña?
								</a>
							</div>
							<button
								type="submit"
								className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Sign in
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
