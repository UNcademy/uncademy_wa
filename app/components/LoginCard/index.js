import React  ,{ useState } from 'react';
import { login } from '../../graphql/queries';
import {client} from "../../graphql/apolloClient";

async function getData(inputs) {
    const { data } = await client.query({
        query: login,
        variables: {
            username: inputs.username,
			password: inputs.password
        }
    });
    return data;
}

export const LoginCard = () => {

	const [inputs, setInputs] = useState({
		username: "",
		password: ""
	  });
	  

	  const changeForm = e => {
		setInputs({
		  ...inputs,
		  [e.target.name]: e.target.value
		});
	  };

	  const login = async e =>{
		e.preventDefault();

		console.log(inputs)
		getData(inputs).then(res =>{
			localStorage.setItem('Token', res.login.data.accessToken)
			if(res.login.statusCode === 200){
				window.location.href = '/'
			}
		} 
			).catch(err =>{
			alert(err.message)
		})
	  }



	return (
		<section className="">
			<div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
				<div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
					<div className="p-6 space-y-4 md:space-y-6 sm:p-8" onChange={changeForm} onSubmit={login}>
						<h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
							Autenticación
						</h1>
						<form className="space-y-4 md:space-y-6" action="#">
							<div>
								<label
									htmlFor="username"
									className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
								>
									Nombre de usuario (Sin el @unal.edu.co)
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
								/>
							</div>
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
											htmlFor="remember"
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
								//className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
							>
								Sign in
							</button>
							<p className="text-sm font-light text-gray-500 dark:text-gray-400">
								¿No tiene una cuenta aún?{' '}
								<a
									href="#"
									className="font-medium text-primary-600 hover:underline dark:text-primary-500"
								>
									Registrate
								</a>
							</p>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
};
