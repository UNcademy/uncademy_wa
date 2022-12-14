import React, {useState, useEffect} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../../../graphql/apolloClient";
import {addGrade} from "../../../../graphql/mutations";
import {editGrade} from "../../../../graphql/mutations";
import {getTasks} from "../../../../graphql/queries";

async function doMutation(classId, studentId, taskId, grade) {
    const {data} = await client.mutate({
        mutation: addGrade,
        variables: {
            classId: classId,
            studentId: studentId,
            taskId: taskId,
            grade: grade
        }
    });
    return data.addGrade.value;
}

async function doMutation2(classId, studentId, taskId, grade) {
    const {data} = await client.mutate({
        mutation: editGrade,
        variables: {
            classId: classId,
            studentId: studentId,
            taskId: taskId,
            grade: grade
        }
    });
    return data.editGrade.message;
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

export default function Grade() {

    useEffect(() => {
        const token = localStorage.getItem('Token')
        if (!token){
            window.location.href = "/login"
        }
    }, [])

    const {tid, cid, sid} = useRouter().query

    const [inputs, setInputs] = useState([])

    const [tasks, setTasks] = useState([])

    const changeForm = (index) => e => {
        setInputs(inputs => ({
            ...inputs,
            [index]:{
                [e.target.name]: e.target.value
            }
        }))
    };

    const sendData = e => {
        for (const grade in inputs) {
            doMutation(cid, sid, grade, inputs[grade].value).then().catch(_ => {
                doMutation2(cid, sid, grade, inputs[grade].value).then()
            })
        }
        window.location.href = `/classList/${cid}`
    }

    useEffect(() => {
        getData(cid, tid).then(res => {
            setTasks(res)
        }).catch()
    }, [cid])

    return (
        <>
            <Head>
                <title>UNcademy</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/6-removebg-preview.png" />
            </Head>
            <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3 flex justify-center">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">Calificaciones del estudiante {sid}</h5>
                </div>
                <p className="text-center">Diligencie <b>??nicamente</b> los campos de las tareas que desea calificar, o bien tan solo aquellos cuya nota desea modificar.</p>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <tr>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Nombre de la tarea</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Calificaci??n</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tasks.map(({_, taskId, taskName, weight}) =>
                        <tr>
                            <td className="border border-black bg-g px-3 bg-ac text-center text-blue text-md font-semibold">
                                {taskName}
                            </td>
                            <td className="border border-black bg-g p-3 text-center font-semibold">
                                <input
                                    id={`value${taskId}`}
                                    name="value"
                                    className="w-96 text-center bg-white border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="XX"
                                    onChange={changeForm(taskId)}
                                />
                            </td>
                        </tr>
                    )
                    }
                    </tbody>
                </table>
                <div className="flex mt-6 justify-center items-center">
                    <button
                        onClick={sendData}
                        className="bg-m enabled:hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex disabled:opacity-50" type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                        Enviar
                    </button>
                </div>
            </main>
        </>
    )
}