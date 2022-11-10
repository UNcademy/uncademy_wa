import {soapService} from "../../graphql/queries";
import {client} from "../../graphql/apolloClient";
import React, {useState} from "react";
import Link from "next/link";
import jwtDecode from "jwt-decode";

async function getData(id) {
    const {data} = await client.query({
        query: soapService,
        variables: {
            id: id
        }
    });
    return data.consumeSubject
}

export default function Search() {

    const [inputs, setInputs] = useState({
        code: ""
    })

    const [output, setOutput] = useState({
        code: "",
        name: "",
        vigency: false,
        level: "",
        credits: 0,
        campus: "",
        faculty: "",
        departament: "",
        basic_academic_unit: "",
        academic_level: "",
        content: []
    })

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    function vigente(bool){
        if (bool){
            return "Sí"
        }
        else{
            return "-"
        }
    }

    function contenido(x){
        return(<p>{x}</p>)
    }

    return(
        <>
            <form
                className="flex justify-center mt-5"
                onChange={changeForm}
                onSubmit={e => {
                    e.preventDefault()
                    getData(inputs.code).then(res => setOutput(res))
                }}
            >
                <input  id="code"
                        name="code"
                        type="text"
                        placeholder=""
                        className="w-1/3 bg-g border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={inputs.code}
                >
                </input>
                <button className="bg-m hover:bg-blue-700 hover:text-white text-white font-bold py-2 px-2 ml-6 rounded flex">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
                    </svg>
                </button>
            </form>
            <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                <thead>
                <tr>
                    <th className="border border-black p-3 bg-ao text-white text-lg" colSpan={2}>Resultados de la búsqueda</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Código ingresado</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.code
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Nombre de la asignatura</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.name
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">¿Se encuentra vigente?</td>
                    <td className="border border-black bg-g p-3">
                        {
                            vigente(output.vigency)
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Nivel Académico</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.level
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Número de créditos</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.credits
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Sede</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.campus
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Facultad</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.faculty
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Departamento</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.departament
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Programa curricular</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.basic_academic_unit
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Abierto a estudiantes de</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.academic_level
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-ac p-3 text-blue font-semibold">Contenido</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.content.map(
                                x => contenido(x)
                            )
                        }
                    </td>
                </tr>
                </tbody>
            </table>
        </>
    )
}