import React, {useState, useEffect} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../graphql/apolloClient";
import {classListDetails} from "../../graphql/queries";
import {getAct} from "../../graphql/queries";
import {generateAct} from "../../graphql/queries";
import {statsByGroup} from "../../graphql/queries";
import {createFinalGrade} from "../../graphql/mutations";
import Link from "next/link";
import jwtDecode from "jwt-decode";

async function getData(id, teacher) {
    let check = false
    let tid = 0

    const {data} = await client.query({
        query: classListDetails,
        variables: {
            id: id
        }
    });

    data.classListDetails.Teachers.map(({_, teacherId, teacherName, TeacherRole}) => {
        if (teacher === teacherName){
            tid = teacherId
            if (TeacherRole.isHead){
                check = true
            }
        }
    })

    return {
        ...data.classListDetails,
        check: check,
        tid: tid
    };
}

async function getData2(id) {
    const {data} = await client.query({
        query: statsByGroup,
        variables: {
            id: id
        }
    });
    return data.statsByGroup
}

async function generatePDF(id, teacher) {
    await client.query({
        query: generateAct,
        variables: {
            id: id,
            name: teacher
        }
    });
    const {data} = await client.query({
        query: getAct,
        variables: {
            id: id,
        }
    });

    return data.getAct.message
}

async function doMutation(id) {
    const {data} = await client.mutate({
        mutation: createFinalGrade,
        variables: {
            id: id
        }
    });

    return data.createFinalGrade.message
}

export default function ClassList() {

    useEffect(() => {
        const token = localStorage.getItem('Token')
        if (!token){
            window.location.href = "/login"
        }
    }, [])

    const {id} = useRouter().query

    const [output, setOutput] = useState({
        semester: "",
        courseName: "",
        courseGroup: 0,
        EnrolledStudents: [],
        Teachers: [],
        check: false,
        closed: false,
        tid: 0
    })

    useEffect(() => {
        getData(id, jwtDecode(localStorage.getItem('Token')).fullname).then(res => {
            setOutput(res)
        }).catch(err => console.log(""))
    }, [id])

    function displayTasks(t, sid){
        if (t.length === 0){
            return (
                <div className="items-center">
                    {
                        !output.closed ?
                            <Link href={`/grade/${output.tid}/${id}/${sid}`}>
                                <button
                                    className="bg-ao hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                         strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round"
                                              d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75"/>
                                    </svg>
                                    Cargar
                                </button>
                            </Link> : null
                    }
                </div>
            )
        } else {
            return(
                <div className="items-center">
                    <table className="table-auto mx-auto border-separate border-spacing-2 border border-black">
                        <tbody>
                        {
                            t.map(({_, taskName, Grade}) =>
                                <tr>
                                    <td className="border border-black bg-g px-3 bg-ac text-blue text-md font-semibold">{taskName}</td>
                                    <td className="border border-black bg-g px-3">{Grade.value}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                    {
                        !output.closed ?
                        <Link href={`/grade/${output.tid}/${id}/${sid}`}>
                            <button
                                className="bg-ao hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto mt-3 rounded flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                     stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                </svg>
                                Editar
                            </button>
                        </Link> : null
                    }
                </div>
            )
        }
    }

    function displayAbsences(val){
        if (val == null){
            return ("-")
        } else {
            return (val)
        }
    }

    function displayStudents(students){
        if (students.length === 0){
            return (
            <tr>
                <td className="border border-black bg-g p-3 text-center" colSpan="5">
                    <p>No hay estudiantes inscritos</p>
                </td>
            </tr>)
        }
        else {
            return (students.map(({_, Student, absences, Tasks}) =>
                <tr>
                    <td className="border border-black p-3 bg-ao text-white text-lg font-semibold">{Student.studentId}</td>
                    <td className="border border-black text-center bg-g p-3">{Student.studentName}</td>
                    <td className="border border-black text-center bg-g p-3">{Student.studyProgram}</td>
                    <td className="border border-black bg-g p-3 justify-center items-center">
                        <div className="flex items-center justify-center">
                        <p className="mx-auto">
                            {
                            displayAbsences(absences)
                            }
                        </p>
                            {
                                !output.closed ?
                                    <Link
                                        href={`/${id}/addAbsences/${Student.studentId}`}>
                                        <button
                                            className="bg-r hover:bg-blue-700 text-white font-bold py-2 px-2 ml-4 rounded flex">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth={2}
                                                 stroke="currentColor" className="w-6 h-6 mr-2">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                            </svg>
                                            Editar
                                        </button>
                                    </Link> : null
                            }
                        </div>
                    </td>

                    <td className="border border-black bg-g p-3 text-center">
                        {displayTasks(Tasks, Student.studentId)}
                    </td>
                </tr>
            ))
        }
    }

    function displayClassList(val){
        if (val === 0){
            return <div className="text-center">
                <p>Esta clase no existe o no está autorizado para acceder a ella.</p>
            </div>
        } else {
            return (
            <>
                <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3 flex justify-center">
                    <p className="font-normal mx-auto">{output.semester}</p>
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">{output.courseName}</h5>
                    <p className="font-normal mx-auto">Grupo #{output.courseGroup}</p>
                </div>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <tr>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold" colSpan={2}>Estudiante</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Programa</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Inasistencias</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Calificaciones</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        displayStudents(output.EnrolledStudents)
                    }
                    </tbody>
                </table>
                <div className="flex mt-6 justify-center items-center">
                    {
                        output.check && !output.closed ? <Link href={`/manageTasks/${id}/${output.tid}`}>
                            <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122" />
                                </svg>

                                Administrar Tareas
                            </button>
                        </Link> : null
                    }
                    {
                        !output.closed ?
                            <button
                                className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex"
                                onClick={() => {
                                    doMutation(id).then().catch(err => {
                                        console.log(err.message)
                                    })
                                    window.location.href = "/teacher"
                                }}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                                </svg>

                                Consolidar Notas
                            </button> : null
                    }
                    {
                        output.closed ?
                            <Link href={`/stats/${id}`}>
                                <button
                                    className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z" />
                                    </svg>
                                    Obtener Estadísticas
                                </button>
                            </Link> : null
                    }
                    {
                        output.closed ?
                            <button
                                onClick={() => {
                                    generatePDF(id,jwtDecode(localStorage.getItem('Token')).fullname).then(res => {
                                        const downloadLink = document.createElement("a");
                                        downloadLink.href = "data:application/octet-stream;base64," + res;
                                        downloadLink.download = `Acta${id}.pdf`;
                                        downloadLink.click();
                                    })
                                }}
                                className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                </svg>
                                Generar Acta
                            </button> : null
                    }
                </div>
            </>
            )
        }
    }

    getData2(id).then(res => {
        if (res.length > 0){
            setOutput({
                ...output,
                closed: true
            })
        }
    }).catch(err => console.log(""))

    return (
        <>
            <Head>
                <title>UNcademy</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/6-removebg-preview.png" />
            </Head>
            <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                {
                    displayClassList(output.courseGroup)
                }
            </main>
        </>
    )
}