import React, {useEffect, useState} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../graphql/apolloClient";
import { getRegistration} from "../../graphql/queries";
import Link from "next/link";


async function getData(id) {
    const {data} = await client.query({
        query: getRegistration,
        variables: {
            id: id
        }
    });
    //console.log(id)
    return data.getRegistration;
}

export default function Registro() {

    useEffect(() => {
        const token = localStorage.getItem('Token')
        if (!token){
            window.location.href = "/login"
        }
    }, [])

    const {id} = useRouter().query

    const [output, setOutput] = useState({
        idStudent:"",
        idProgram:"",
        subjects:[]
    })

    const card = (nameSubject, time) => {
        return(
            <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3">
                <h5 className="mb-2 text-xl font-bold tracking-tight text-blue">{nameSubject}</h5>
                <p className="mb-3 font-normal">Clase presencial</p>
            </div>
        )
    }

    function displayCards(sch, wDay, nameSubject, sct, time){
        if (wDay.includes(sch)){
            if (sct === time){
                return card(nameSubject, time)
            }
        }
    }

    function calculate(sct){
        const end = sct+2
        if (sct === 11){
            return "a.m. - 1:00 p.m."
        } else if (sct >= 7) {
            return "a.m. - " + end + ":00 a.m."
        } else {
        return "p.m. - " + end + ":00 p.m."
    }
    }

    function displayHours(sct, subjects){
        return (
            <tr>
                <td className="border border-black bg-ao text-white p-3 font-semibold text-center">
                    {sct}:00 {calculate(sct)}
                </td>
                <td className="border border-black bg-g p-3 font-semibold text-center">
                    {
                        subjects.map(({_, idStudent, nameSubject, days,time}) => displayCards("lunes",days,nameSubject,sct,time))
                    }
                </td>
                <td className="border border-black bg-g p-3 font-semibold text-center">
                    {
                        subjects.map(({_, idStudent, nameSubject, days,time}) => displayCards("martes",days,nameSubject,sct,time))
                    }
                </td>
                <td className="border border-black bg-g p-3 font-semibold text-center">
                    {
                        subjects.map(({_, idStudent, nameSubject, days,time}) => displayCards("miercoles",days,nameSubject,sct,time))
                    }
                </td>
                <td className="border border-black bg-g p-3 font-semibold text-center">
                    {
                        subjects.map(({_, idStudent, nameSubject, days,time}) => displayCards("juves",days,nameSubject,sct,time))
                    }
                </td>
                <td className="border border-black bg-g p-3 font-semibold text-center">
                    {
                        subjects.map(({_, idStudent, nameSubject, days,time}) => displayCards("viernes",days,nameSubject,sct,time))
                    }
                </td>
            </tr>
        )
    }

    function displayRegistro(subjects){
        if(subjects === null || subjects.length === 0){
            return (
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <tbody>
                    <tr>
                        <td className="border border-black text-center p-3 bg-g text-red text-md font-semibold">
                            No tienes materias inscritas para este período.
                        </td>
                    </tr>
                    </tbody>
                </table>)
        }
        else{
            return (
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <th className="border border-black text-center p-3 bg-ac text-blue text-md font-semibold">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className=" mx-auto w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </th>
                    <th className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                        Lunes
                    </th>
                    <th className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                        Martes
                    </th>
                    <th className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                        Miércoles
                    </th>
                    <th className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                        Jueves
                    </th>
                    <th className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                        Viernes
                    </th>
                    </thead>
                    <tbody>
                    {
                        displayHours(7, subjects)
                    }
                    {
                        displayHours(9, subjects)
                    }
                    {
                        displayHours(11, subjects)
                    }
                    {
                        displayHours(2, subjects)
                    }
                    {
                        displayHours(4, subjects)
                    }
                    {
                        displayHours(6, subjects)
                    }
                    </tbody>
                </table>
            )
        }
    }
    useEffect(() => {
        getData(id).then(res => {
            setOutput(res)
        }).catch(err => console.log(""))
    }, [id])

    return (
        <>
        <Head>
            <title>UNcademy</title>
            <meta name="description" content="Generated by create next app" />
            <link rel="icon" href="/6-removebg-preview.png" />
        </Head>
        <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
            <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3 flex justify-center">
                <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">Mi horario</h5>
            </div>
                {
                    displayRegistro(output.subjects)
                }
        </main>
    </>
    )

}