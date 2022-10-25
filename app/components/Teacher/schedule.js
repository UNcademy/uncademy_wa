import {getSchedule} from "../../graphql/queries";
import {client} from "../../graphql/apolloClient";
import React, {useState} from "react";
import Link from "next/link";

async function getData(inputs) {
    const { data } = await client.query({
        query: getSchedule,
        variables: {
            semester: inputs.semester
        }
    });
    return data.getSchedule;
}

export default function Schedule() {

    const [inputs, setInputs] = useState({
        semester: ""
    })

    const [output, setOutput] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    })

    const changeForm = e => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value
        })
    };

    const card = (id, schedule, course, classroom) => {
        return(
            <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">{schedule}</h5>
                <p className="mb-3 font-normal">{course}</p>
                <p className="mb-3 font-normal">{classroom}</p>
                <Link href={`/classList/${id}`}>
                    <a className="inline-flex items-center text-blue hover:underline">
                        Ir
                        <svg className="ml-2 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path><path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path></svg>
                    </a>
                </Link>
            </div>
        )
    }

     return(
         <>
             <form
                 className="flex justify-center"
                 onChange={changeForm}
                 onSubmit={e => {
                     e.preventDefault()
                     getData(inputs).then(res => setOutput(res))
                 }}
             >
                 <label htmlFor="semester" className="text-lg text-blue mr-5 my-auto">Semestre:</label>
                 <select id="semester"
                         name="semester"
                         className="w-1/3 bg-g border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                         value={inputs.semester}
                 >
                     <option defaultValue value="" disabled>Seleccione una opción</option>
                     <option value="2022-I">2022-I</option>
                     <option value="2022-II">2022-II</option>
                 </select>
                 <button className="bg-ac hover:bg-blue-700 hover:text-white text-blue font-bold py-2 px-2 ml-6 rounded flex">
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-3">
                         <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
                     </svg>
                     Ver horario
                 </button>
             </form>
            <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                <thead>
                <tr>
                    <th className="border border-black p-3 bg-ao text-white text-lg">Día de la semana</th>
                    <th className="border border-black p-3 bg-ao text-white text-lg">Horario</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Lunes</td>
                    <td className="border border-black bg-g p-3">
                        {
                        output.monday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Martes</td>
                    <td className="border border-black bg-g p-3">
                        {
                        output.tuesday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                    }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Miércoles</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.wednesday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Jueves</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.thursday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Viernes</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.friday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                        }
                    </td>
                </tr>
                <tr>
                    <td className="border border-black bg-g p-3 text-lg font-bold">Sábado</td>
                    <td className="border border-black bg-g p-3">
                        {
                            output.saturday.map(({_, id, course,schedule,classroom}) => card(id, schedule, course, classroom))
                        }
                    </td>
                </tr>
                </tbody>
            </table>
         </>
     )
}