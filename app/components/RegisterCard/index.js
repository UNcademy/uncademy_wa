import React, { useState } from 'react';
import { client } from '../../graphql/apolloClient';
import {registerUser} from "../../graphql/mutations";

async function doMutation(registerBody) {
	const { data } = await client.mutate({
		mutation: registerUser,
		variables: {
			registerBody: registerBody,
		},
	});
	return data.register.message
}

export const RegisterCard = () => {
	const [username, setUsername] = useState('');
	const [usertype, setUsertype] = useState('');
	const [password, setPassword] = useState('');
	const [fullname, setFullname] = useState();
	const [idDoc, setIdDoc] = useState();
	const [depDocument, setDepDocument] = useState('');
	const [cityDocument, setCityDocument] = useState('');
	const [genre, setGenre] = useState('');
	const [email, setEmail] = useState('');
	const [unmail, setUnmail] = useState('');
	const [birthPlace, setBirthPlace] = useState('');
	const [cel, setCel] = useState('');
	const [age, setAge] = useState();
	const [country, setCountry] = useState();
	const [bloodType, setBloodType] = useState();
	const [address, setAddress] = useState();
	const [armyCard, setArmyCard] = useState(false);
	const [program, setProgram] = useState();

	const responseBody = {
		user_name: '',
		user_type: '',
		password: '',
		full_name: '',
		document: '',
		dep_document: '',
		city_document: '',
		genre: '',
		email: '',
	};

	const inputChangeHandler = (setFunction, event) => {
		
		const target = event.target;
    	const value = target.type === 'checkbox' ? setFunction(event.target.checked) : setFunction(event.target.value);
		// setFunction(event.target.value);
		console.log(value)
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		responseBody.user_name = username;
		responseBody.user_type = usertype;
		responseBody.password = password;
		responseBody.full_name = fullname;
		responseBody.document = idDoc;
		responseBody.dep_document = depDocument;
		responseBody.city_document = cityDocument;
		responseBody.genre = genre;
		responseBody.email = email;
		responseBody.un_mail = unmail;
		responseBody.birth_place = birthPlace;
		responseBody.cel = cel;
		responseBody.age = age;
		responseBody.country = country;
		responseBody.blood_type = bloodType;
		responseBody.address = address;
		responseBody.army_card = armyCard;
		responseBody.program = program;
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
							<div>
								<label
									htmlFor="dep_document"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Departamento
								</label>
								<input
									type="text"
									name="dep_document"
									id="dep_document"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setDepDocument, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="city_document"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Ciudad
								</label>
								<input
									type="text"
									name="city_document"
									id="city_document"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setDepDocument, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="genre"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Género
								</label>
								<input
									type="text"
									name="genre"
									id="genre"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setGenre, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Correo electrónico
								</label>
								<input
									type="text"
									name="email"
									id="email"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setEmail, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="un_mail"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Correo electrónico unal
								</label>
								<input
									type="text"
									name="un_mail"
									id="un_mail"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setUnmail, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="birth_place"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Lugar de nacimiento
								</label>
								<input
									type="text"
									name="birth_place"
									id="birth_place"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setBirthPlace, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="cel"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Celular
								</label>
								<input
									type="number"
									name="cel"
									id="cel"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setCel, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="age"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Edad
								</label>
								<input
									type="number"
									name="age"
									id="age"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setAge, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="country"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									País
								</label>
								<input
									type="text"
									name="country"
									id="country"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setCountry, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="blood_type"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Tipo de sangre
								</label>
								<input
									type="text"
									name="blood_type"
									id="blood_type"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="79940745"
									required=""
									onChange={(e) => inputChangeHandler(setBloodType, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="address"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Dirección de residencia
								</label>
								<input
									type="text"
									name="address"
									id="address"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="Carrera 21"
									required=""
									onChange={(e) => inputChangeHandler(setAddress, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="army_card"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Tarjeta militar
								</label>
								<input
									type="checkbox"
									checked={armyCard}			
									name="army_card"
									id="army_card"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="true"
									required=""
									onChange={(e) => inputChangeHandler(setArmyCard, e)}
								/>
							</div>
							<div>
								<label
									htmlFor="program"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Programa
								</label>
								<input
									type="number"
									name="program"
									id="program"
									className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
									placeholder="999999"
									required=""
									onChange={(e) => inputChangeHandler(setProgram, e)}
								/>
							</div>
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
