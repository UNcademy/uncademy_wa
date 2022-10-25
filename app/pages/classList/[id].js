import React, {useState} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../graphql/apolloClient";
import {classListDetails} from "../../graphql/queries";
import Link from "next/link";

async function getData(id) {
    const {data} = await client.query({
        query: classListDetails,
        variables: {
            id: id
        }
    });
    return data.classListDetails;
}

export default function ClassList() {

    const {id} = useRouter().query

    const [output, setOutput] = useState({
        semester: "",
        courseName: "",
        courseGroup: 0,
        EnrolledStudents: [],
        Teachers: []
    })

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
                <td className="border border-black bg-g p-3 text-center" colSpan="4">
                    <p>No hay estudiantes inscritos</p>
                </td>
            </tr>)
        }
        else {
            return (students.map(({_, Student, absences, Tasks}) =>
                <tr>
                    <td className="border border-black bg-g p-3">{Student.studentName}</td>
                    <td className="border border-black bg-g p-3">{Student.studyProgram}</td>
                    <td className="border border-black bg-g p-3 justify-center items-center">
                        <div className="flex items-center justify-center">
                        <p className="mx-auto">
                            {
                            displayAbsences(absences)
                            }
                        </p>
                        <Link href={`/${id}/addAbsences/${Student.studentId}`}>
                            <button className="bg-ac hover:bg-blue-700 hover:text-white text-blue font-bold py-2 px-2 mx-auto rounded flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                                     stroke="currentColor" className="w-6 h-6 mr-2">
                                    <path strokeLinecap="round" strokeLinejoin="round"
                                          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                </svg>
                                Editar
                            </button>
                        </Link>
                        </div>
                    </td>

                    <td className="border border-black bg-g p-3 text-center">
                        <div className="flex items-center">
                        <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mr-3 rounded flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 7.5h-.75A2.25 2.25 0 004.5 9.75v7.5a2.25 2.25 0 002.25 2.25h7.5a2.25 2.25 0 002.25-2.25v-7.5a2.25 2.25 0 00-2.25-2.25h-.75m0-3l-3-3m0 0l-3 3m3-3v11.25m6-2.25h.75a2.25 2.25 0 012.25 2.25v7.5a2.25 2.25 0 01-2.25 2.25h-7.5a2.25 2.25 0 01-2.25-2.25v-.75" />
                            </svg>
                            Cargar
                        </button>
                        <button className="bg-ac hover:bg-blue-700 hover:text-white text-blue font-bold py-2 px-2 mx-auto rounded flex">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-2">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                            Ver y editar
                        </button>
                        </div>
                    </td>
                </tr>
            ))
        }
    }

    function displayTaskButton(teacher){
        let check = false
        output.Teachers.map(({_, teacherId, teacherName, TeacherRole}) => {
            if (teacher === teacherName){
                if (TeacherRole.isHead){
                    check = true
                }
            }
        })
        if (check){
            return (
                <Link href={`/addTasks/${id}`}>
                    <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6 mr-3">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Asignar Tareas
                    </button>
                </Link>
            )
        } else {
            return null
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
                <div className="mt-4">
                    {
                        displayTaskButton("Carmen Aleida Fernandez Moreno")
                    }
                </div>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <tr>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Estudiante</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Programa</th>
                        <th className="border border-black p-3 bg-ao text-white text-lg font-semibold">Número de fallas</th>
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
                    <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                        Consolidar Notas
                    </button>
                    <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                        Obtener Estadísticas
                    </button>
                    <button className="bg-m hover:bg-blue-700 text-white font-bold py-2 px-2 mx-auto rounded flex">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2}
                             stroke="currentColor" className="w-6 h-6 mr-2">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                        </svg>
                        Generar Acta
                    </button>
                </div>
            </>
            )
        }
    }

    getData(id).then(res => setOutput(res))

    return (
        <>
            <Head>
                <title>UNcademy</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/6-removebg-preview.png" />
            </Head>
            <main className="w-5/6 mt-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                {
                    displayClassList(output.courseGroup)
                }
            </main>
        </>
    )
}