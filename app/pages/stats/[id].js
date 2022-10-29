import React, {useState, useEffect} from 'react'
import Head from "next/head";
import {useRouter} from "next/router";
import {client} from "../../graphql/apolloClient";
import {statsByGroup} from "../../graphql/queries";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement} from 'chart.js';
import {Pie} from "react-chartjs-2";
import {Doughnut} from "react-chartjs-2";
import {Bar} from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement);

async function getData(id) {
    const {data} = await client.query({
        query: statsByGroup,
        variables: {
            id: id
        }
    });
    return data.statsByGroup[0]
}

export default function ClassList() {

    const {id} = useRouter().query

    const [output, setOutput] = useState({
        participation_percentage: 0,
        approbation_percentage: 0,
        average_grade: 0,
        standard_deviation: 0,
        best_grade: 0,
        worst_grade: 0
    })

    const dataPP = {
        labels: ['Attendance Rate', 'Absence Rate'],
        datasets: [
            {
                label: 'participation_percentage',
                data: [output.participation_percentage, 100-output.participation_percentage],
                backgroundColor: [
                    'rgba(169, 194, 217, 1)',
                    'rgba(166, 20, 20, 0.5)',
                ],
                borderColor: [
                    'rgba(3, 59, 134, 1)',
                    'rgba(166, 20, 20, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataAP = {
        labels: ['Approved', 'Failed'],
        datasets: [
            {
                label: 'approbation_percentage',
                data: [output.approbation_percentage, 100-output.approbation_percentage],
                backgroundColor: [
                    'rgba(169, 194, 217, 1)',
                    'rgba(166, 20, 20, 0.5)',
                ],
                borderColor: [
                    'rgba(3, 59, 134, 1)',
                    'rgba(166, 20, 20, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const dataGrades = {
        labels: ['Best Grade', 'Worst Grade', 'Average Grade'],
        datasets: [
            {
                label: "grades",
                data: [output.best_grade, output.worst_grade, output.average_grade],
                backgroundColor: [
                    'rgba(169, 194, 217, 1)',
                    'rgba(166, 20, 20, 0.5)',
                    'rgba(73, 42, 85, 0.5)'
                ],
                borderColor: [
                    'rgba(3, 59, 134, 1)',
                    'rgba(166, 20, 20, 1)',
                    'rgba(73, 42, 85, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const barOptions = {
        plugins: {
            legend: {
                display: false
            }
        }
    }

    useEffect(() => {
        getData(id).then(res => {
            setOutput(res)
        }).catch(err => console.log(""))
    }, [id])

    function displayPercentajes(stat){
        if (stat === "participation_percentage") {
            return (<tr>
                <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                    <p>Porcentaje de asistencia</p> <br/>
                </td>
                <td className="border border-black text-center bg-g p-3">
                    <b>{output[stat]} %</b>
                    <Pie className="mt-2" data={dataPP}/>
                </td>
            </tr>)
        } else if (stat === "approbation_percentage") {
            return (<tr>
                <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                    <p>Porcentaje de aprobación</p> <br/>
                </td>
                <td className="border border-black text-center bg-g p-3">
                    <b>{output[stat]} %</b>
                    <Doughnut className="mt-2" data={dataAP}/>
                </td>
            </tr>)
        }
    }

    return (
        <>
            <Head>
                <title>UNcademy</title>
                <meta name="description" content="Generated by create next app" />
                <link rel="icon" href="/6-removebg-preview.png" />
            </Head>
            <main className="w-5/6 my-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
                <div className="p-4 bg-ac rounded-lg border border-black shadow-md my-3 flex justify-center">
                    <h5 className="text-xl font-bold tracking-tight text-gray-900 mx-auto">Estadísticas de la clase #{id}</h5>
                </div>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                        <th className="border border-black text-center p-3 bg-ac text-blue text-md font-semibold" colSpan={2}>
                            Porcentajes
                        </th>
                    </thead>
                    <tbody>
                    {
                        Object.keys(output).map(stat => {
                            return(displayPercentajes(stat))
                        })
                    }
                    </tbody>
                </table>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <th className="border border-black text-center p-3 bg-ac text-blue text-md font-semibold" colSpan={2}>
                        Medidas de dispersión
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                            Desviación estándar
                        </td>
                        <td className="border border-black text-center bg-g p-3">
                            {output["standard_deviation"]}
                        </td>
                    </tr>
                    </tbody>
                </table>
                <table className="table-auto mx-auto mt-6 border-separate border-spacing-2 border border-black">
                    <thead>
                    <th className="border border-black text-center p-3 bg-ac text-blue text-md font-semibold" colSpan={3}>
                        Rango de calificaciones
                    </th>
                    </thead>
                    <tbody>
                    <tr>
                        <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                            Mejor nota
                        </td>
                        <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                            Peor nota
                        </td>
                        <td className="border border-black text-center p-3 bg-ao text-white text-md font-semibold">
                            Nota promedio
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black text-center bg-g p-3">
                            {output["best_grade"]}
                        </td>
                        <td className="border border-black text-center bg-g p-3">
                            {output["worst_grade"]}
                        </td>
                        <td className="border border-black text-center bg-g p-3">
                            {output["average_grade"]}
                        </td>
                    </tr>
                    <tr>
                        <td className="border border-black text-center bg-g p-3" colSpan={3}>
                            <Bar className="mt-2" data={dataGrades} options={barOptions}/>
                        </td>
                    </tr>
                    </tbody>
                </table>
            </main>
        </>
    )
}