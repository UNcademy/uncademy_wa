import React, {useEffect} from 'react'
import Schedule from "../components/Subject/search";
import Head from "next/head";

export default function External() {

    useEffect(() => {
        const token = localStorage.getItem('Token')
        if (!token){
            window.location.href = "/login"
        }
    }, [])

    return (
        <>
            <Head>
                <title>UNcademy</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/6-removebg-preview.png" />
            </Head>
            <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3 flex justify-center">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">Búsqueda externa de intercambios</h5>
                </div>
                <div className="text-center mt-6">
                    <p>A continuación podrá consultar qué asignaturas están disponibles para realizar intercambios con otras universidades.</p>
                    <br/>
                    <p>Ingrese el código de la materia para buscarla dentro del sistema <b>[NOMBRE]</b>.</p>
                </div>

                <Schedule></Schedule>

            </main>
        </>
    )
}