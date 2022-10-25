import React from 'react'
import Schedule from "../components/teacher/schedule";

export default function teacher() {
    return (
        <div className="w-5/6 mt-5 bg-white bg-opacity-100 mx-auto sticky py-2 px-4 lg:px-8 lg:py-4 rounded-lg">
            <div className="flex justify-center">
                <label htmlFor="countries" className="text-lg text-blue mr-5 my-auto">Semestre:</label>
                <select id="countries"
                        className="w-1/3 bg-g border border-black text-black text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="2022-II">2022-II</option>
                </select>
            </div>
            <Schedule />
        </div>
    )
}