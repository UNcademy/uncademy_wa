import React, { useState } from 'react';
import { client } from '../../graphql/apolloClient';

async function doMutation(registerBody) {
	const { data } = await client.mutate({
		mutation: registerUser,
		variables: {
			registerBody: registerBody,
		},
	});
	return data
}

export const RegisterCard = () => {
	const [username, setUsername] = useState();
	const [usertype, setUsertype] = useState();
	const [password, setPassword] = useState();
	const [fullname, setFullname] = useState();
	const [idDoc, setIdDoc] = useState();
	const responseBody = {
		username: '',
		usertype: '',
		password: '',
		fullname: '',
		idDoc: '',
	};

	const inputChangeHandler = (setFunction, event) => {
		setFunction(event.target.value);
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		responseBody.username = username;
		responseBody.usertype = usertype;
		responseBody.password = password;
		responseBody.fullname = fullname;
		responseBody.idDoc = idDoc;
		doMutation(responseBody)
			.then(d => {alert(d)})
			.catch(err => {alert(err)})
	};

	return (
		<section className="mt-8">
			<div className="flex flex-col items-center justify-center px-6 py-12 mx-auto md:h-screen lg:py-0 mt-8">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8">
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Registro de usuario
						</h1>
						<form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="username"
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
									onChange={(e) => inputChangeHandler(setUsername, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="usertype"
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
									onChange={(e) => inputChangeHandler(setUsertype, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="password"
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
									onChange={(e) => inputChangeHandler(setPassword, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="fullname"
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
									onChange={(e) => inputChangeHandler(setFullname, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="document"
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
									onChange={(e) => inputChangeHandler(setIdDoc, e)}
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
							<button
								type="submit"
								className="w-full bg-blue-600  focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Registrar
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
