import { useQuery } from '@apollo/client';
import {getSchedule} from "../../graphql/queries";
import {client} from "../../graphql/apolloClient";
import {useState, useEffect} from "react";

async function getData() {
    const { data } = await client.query({
        query: getSchedule,
    });

    return data.getSchedule;
}

export default function Schedule() {

    const [output, setOutput] = useState({
        monday: [],
        tuesday: [],
        wednesday: [],
        thursday: [],
        friday: [],
        saturday: []
    })

    getData().then(res => setOutput(res))

     return(
        <table className="table-auto mx-auto mt-6">
            <thead>
            <tr>
                <th>Día de la semana</th>
                <th>Horario</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>Lunes</td>
                <td>
                    {
                        output.monday.map(({_, id, course,schedule,classroom}) =>
                            <>
                            <b>{schedule}</b>
                            <p>{course}</p>
                            <p>{classroom}</p>
                            </>
                        )
                    }
                </td>
            </tr>
            <tr>
                <td>Martes</td>
                <td>
                    {
                    output.tuesday.map(({_, id, course,schedule,classroom}) =>
                        <>
                            <b>{schedule}</b>
                            <p>{course}</p>
                            <p>{classroom}</p>
                        </>
                    )
                }
                </td>
            </tr>
            <tr>
                <td>Miercoles</td>
                <td>
                    {
                        output.wednesday.map(({_, id, course,schedule,classroom}) =>
                            <>
                                <b>{schedule}</b>
                                <p>{course}</p>
                                <p>{classroom}</p>
                            </>
                        )
                    }
                </td>
            </tr>
            <tr>
                <td>Jueves</td>
                <td>
                    {
                        output.thursday.map(({_, id, course,schedule,classroom}) =>
                            <>
                                <b>{schedule}</b>
                                <p>{course}</p>
                                <p>{classroom}</p>
                            </>
                        )
                    }
                </td>
            </tr>
            <tr>
                <td>Viernes</td>
                <td>
                    {
                        output.friday.map(({_, id, course,schedule,classroom}) =>
                            <>
                                <b>{schedule}</b>
                                <p>{course}</p>
                                <p>{classroom}</p>
                            </>
                        )
                    }
                </td>
            </tr>
            <tr>
                <td>Sábado</td>
                <td>
                    {
                        output.saturday.map(({_, id, course,schedule,classroom}) =>
                            <>
                                <b>{schedule}</b>
                                <p>{course}</p>
                                <p>{classroom}</p>
                            </>
                        )
                    }
                </td>
            </tr>
            </tbody>
        </table>
     )
}