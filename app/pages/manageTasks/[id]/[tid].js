import React, {useState, useEffect} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../../graphql/apolloClient";
import {createTasks} from "../../../graphql/mutations";
import {updateTask} from "../../../graphql/mutations";
import {deleteTasks} from "../../../graphql/mutations";
import {getTasks} from "../../../graphql/queries";
import Link from "next/link";
import jwtDecode from "jwt-decode";

async function doMutation(id, tasks, teach) {
    const {data} = await client.mutate({
        mutation: createTasks,
        variables: {
            classId: id,
            tasks: tasks,
            teacher: teach
        }
    });
    return data.createTasks.message;
}

async function doMutation2(id, task) {
    const {data} = await client.mutate({
        mutation: updateTask,
        variables: {
            id: id,
            task: task
        }
    });
    return data.updateTask.message;
}

async function doMutation3(id) {
    const {data} = await client.mutate({
        mutation: deleteTasks,
        variables: {
            classId: id
        }
    });
    return data.deleteTasks.message;
}

async function getData(id, tid) {
    const {data} = await client.query({
        query: getTasks,
        variables: {
            classId: id,
            teacherId: tid
        }
    });
    return data.getTasks;
}

export default function ManageTasks() {

    useEffect(() => {
        const token = localStorage.getItem('Token')
        if (!token){
            window.location.href = "/login"
        }
    }, [])

    const {id} = useRouter().query
    const {tid} = useRouter().query

    const [lock, setLock] = useState(false)

    const [counter, setCounter] = useState(0)

    const [inputs, setInputs] = useState([])

    const [view, setView] = useState(0)

    const [tasks, setTasks] = useState([])

    const [newTask, setNewTask] = useState({
        assigned: "",
        taskName: "",
        weight: 0
    })

    const [taskDef, setTaskDef] = useState({})

    const changeForm = (index) => e => {
        setInputs(inputs => ({
            ...inputs,
            [index]:{
                ...inputs[index],
                [e.target.name]: e.target.value
            }
        }))
        setLock(true)
    };

    const changeForm2 = (index) => e => {
        setTaskDef(taskDef => ({
            ...taskDef,
            [index]:{
                [e.target.name]: e.target.value
            }
        }))
    };

    const [output, setOutput] = useState(<div></div>)

    const sendData = e => {
        e.preventDefault()
        doMutation(id, Object.values(inputs), jwtDecode(localStorage.getItem('Token')).fullname).then(_ => setOutput(<div className="w-3/4 p-4 bg-ac rounded-lg border border-black shadow-md justify-center mt-6">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">¡Las tareas se guardaron con éxito!</h5>
            <Link href={`/classList/${id}`}>
                <a className="text-xl font-bold tracking-tight text-blue mx-auto">Volver</a>
            </Link>
        </div>)).catch(
            err => {
                if (err.message === "Total sum of weights should be 100%."){
                    setOutput(<div className="w-3/4 p-4 bg-g rounded-lg border border-black shadow-md justify-center mt-6">
                        <h5 className="text-xl font-bold tracking-tight text-red mx-auto">La suma de los pesos porcentuales debe ser igual al 100%</h5>
                    </div>)
                } else {
                    setOutput(<div className="w-3/4 p-4 bg-g rounded-lg border border-black shadow-md justify-center mt-6">
                        <h5 className="text-xl font-bold tracking-tight text-red mx-auto">{err.message}</h5>
                    </div>)
                }
        }
        )
    }

    const sendData2 = e => {
        for (const modifiedTask in taskDef) {
            doMutation2(modifiedTask, taskDef[modifiedTask].taskName).then()
        }
        window.location.href = `/classList/${id}`
    }

    const removeData = e => {
        e.preventDefault()
        doMutation3(id).then(_ => setOutput(<div
            className="w-3/4 p-4 bg-ac rounded-lg border border-black shadow-md justify-center mt-6">
            <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">¡Las tareas fueron removidas!</h5>
        </div>)).catch(
            err => {
                setOutput(<div
                    className="w-3/4 p-4 bg-g rounded-lg border border-black shadow-md justify-center mt-6">
                    <h5 className="text-xl font-bold tracking-tight text-red mx-auto">{err.message}</h5>
                </div>)
            }
        )
        window.location.href = `/classList/${id}`
    }

    useEffect(() => {
        getData(id, tid).then(res => {
            setTasks(res)
            setView(2)
        }).catch(err => {
            if (err.message === "No tasks were found."){
                setView(1)
            }
        })

    }, [id])

    if (view === 1){
        return (
            <>
                <Head>
                    <title>UNcademy</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/6-removebg-preview.png" />
                </Head>
                <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                    <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                        <thead>
                        <tr>
                            <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Nombre de la tarea</th>
                            <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Docente asignado</th>
                            <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Peso porcentual</th>
                        </tr>
                        </thead>
                        <tbody>
                        {[...Array(counter)].map((e, i) =>
                            <tr>
                                <td className="border border-black bg-g p-3">
                                    <input
                                        id={`taskName${i}`}
                                        name="taskName"
                                        className="w-96 bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={inputs[i].taskName}
                                        placeholder={`Tarea ${i+1}`}
                                        onChange={changeForm(i)}
                                    />
                                </td>
                                <td className="border border-black bg-g p-3">
                                    <input
                                        id={`assigned${i}`}
                                        name="assigned"
                                        className="w-96 bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={inputs[i].assigned}
                                        placeholder={`Docente ${i+1}`}
                                        onChange={changeForm(i)}
                                    />
                                </td>
                                <td className="border border-black bg-g p-3">
                                    <div className="flex items-center justify-center">
                                        <input
                                            id={`weight${i}`}
                                            name="weight"
                                            className="w-3/4 mr-2 bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={inputs[i].weight}
                                            placeholder="100"
                                            onChange={changeForm(i)}
                                        />
                                        <b>%</b>
                                    </div>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                    <div className="flex justify-center items-center my-3">
                        <button className="bg-ao enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="button"
                                onClick={() => {
                                    setCounter(counter+1)
                                    setInputs([...inputs, newTask])
                                }}
                                disabled={lock}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Añadir una tarea
                        </button>
                        <button className="bg-r enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="button"
                                onClick={() => {
                                    setCounter(counter-1)
                                    setInputs([...inputs.slice(0,inputs.length-1)])
                                }}
                                disabled={!(counter>0) || lock}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" />
                            </svg>

                            Quitar una tarea
                        </button>
                        <button
                            onClick={() => window.location.reload()}
                            disabled={!lock}
                            className="bg-r enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
                            </svg>
                            Reestablecer
                        </button>
                        <button
                            onClick={sendData}
                            disabled={!lock}
                            className="bg-m enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                            </svg>
                            Guardar cambios
                        </button>
                    </div>
                    <div className="text-center flex justify-center">
                        {output}
                    </div>
                </main>
            </>
        )
    } else if (view === 2) {
        return (
            <>
                <Head>
                    <title>UNcademy</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/6-removebg-preview.png" />
                </Head>
                <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                    <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                        <thead>
                        <tr>
                            <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Nombre de la tarea</th>
                            <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Peso porcentual</th>
                        </tr>
                        </thead>
                        <tbody>
                        {tasks.map(({_, taskId, taskName, weight}) =>
                        <tr>
                            <td className="border border-black bg-g p-3">
                                <input
                                    id={`taskName${taskId}`}
                                    name="taskName"
                                    className="w-96 bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    defaultValue={taskName}
                                    placeholder={taskName}
                                    onChange={changeForm2(taskId)}
                                />
                            </td>
                            <td className="border border-black bg-g p-3 text-center font-semibold">{weight} %</td>
                        </tr>
                        )
                        }
                        </tbody>
                    </table>
                    <div className="flex mt-6 justify-center items-center">
                        <button
                            onClick={sendData2}
                            className="bg-m enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12" />
                            </svg>
                            Aceptar cambios
                        </button>
                        <button
                            onClick={removeData}
                            className="bg-r enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="submit">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                            </svg>
                            Eliminar todas las tareas
                        </button>
                    </div>
                    <div className="text-center flex justify-center">
                        {output}
                    </div>
                </main>
            </>
        )
    } else {
        return (
            <>
                <Head>
                    <title>UNcademy</title>
                    <meta name="description" content="Generated by create next app" />
                    <link rel="icon" href="/6-removebg-preview.png" />
                </Head>
                <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                    <div className="text-center">
                        <p>Esta clase no existe o no está autorizado para acceder a ella.</p>
                    </div>
                </main>
            </>
        )
    }
}