










import React, { Fragment, useEffect, useState } from 'react'
import PieChart from '../charts/piechart'
import BarChart from '../charts/barchart'
import { TiExport } from "react-icons/ti";

interface DemographicData {
  age_group: string;
  percentage?: number;
}

interface LocationData {
  location: string;
  population: number;
}

const Content = () => {
    const[ageData, setAgeData] = useState<DemographicData[]>([]);
    const [locationData, setLocationData] = useState<LocationData[]>([]);
   

    useEffect(() => {
        loadDemographicData();
    }, []);

    const loadDemographicData = async () => {
        const ageGroups = [
            { age_group: "0-14", percentage: 18.5 },
            { age_group: "15-24", percentage: 12.3 },
            { age_group: "25-54", percentage: 45.1 },
            { age_group: "55-64", percentage: 14.2 },
            { age_group: "65+", percentage: 9.9 },
        ];
        setAgeData(ageGroups);

        const locations = [
            { location: "Central Area", population: 284.6 },
            { location: "Bukit Merah", population: 135.6 },
            { location: "Central Water Catchment", population: 80.0 },
            { location: "Marine Parade", population: 52.4 },
            { location: "Outram", population: 30.0 },
        ];
        setLocationData(locations);
    };



    return (
        <Fragment>
            <div>
                {/* select */}
                <div className="grid grid-cols-3 gap-1 w-[320px] text-xs">
                    <div className="col-span-1">
                        <select className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400">
                            <option value="">Select Year</option>
                            <option value="1">2022</option>
                            <option value="2">2023</option>
                            <option value="3">2024</option>
                            <option value="4">2025</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <select className="w-full px-1.5 py-1 text-xs border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400">
                            <option value="">Select Region</option>
                            <option value="1">Region 1</option>
                            <option value="2">Region 2</option>
                            <option value="3">Region 3</option>
                            <option value="4">Region 4</option>
                        </select>
                    </div>
                    <div className="col-span-1">
                        <button className="w-full px-1.5 py-1 text-xs border rounded flex items-center justify-center gap-1 hover:bg-blue-0">
                            <TiExport className="text-sm" /> Export
                        </button>
                    </div>
                </div>

                {/* charts */}
                <div className="demography-class">Demography</div>

                <div className="grid grid-cols-2 gap-4">
                    <div className="age-section">
                     <h1 className="text-center font-bold">Age</h1>
                       <PieChart data={ageData} />
                </div>


                    <div className="location-section">
  <h1 className="text-center font-bold">Location</h1>
  <BarChart data={locationData} />
</div>

                </div>

                {/* table */}
                <div className="table-class w-[320px] mt-3">
    <table className="min-w-full border border-black divide-y divide-black text-xs">
    <thead>
        <tr>
            <th colSpan={4} className="px-2 py-1 text-center font-semibold text-black border-b border-black whitespace-normal break-words">
                Recent Pandemic Impact: US$ 280 Million
            </th>
        </tr>
    </thead>
    <thead>
        <tr>
            <th className="px-2 py-1 text-left border-r border-black font-semibold text-black border-b-0 whitespace-normal break-words bg-white">
                Location Impact
            </th>
            <th className="px-2 py-1 text-left border-r border-black font-semibold text-black border-b-0 whitespace-normal break-words bg-white">
                Impact Exposure (US$ Million)
            </th>
            <th className="px-2 py-1 text-left border-r border-black font-semibold text-black border-b-0 whitespace-normal break-words bg-white">
                Death Toll (Lives)
            </th>
            <th className="px-2 py-1 text-left border-r border-black font-semibold text-black border-b-0 whitespace-normal break-words bg-white">
                Pandemic Name
            </th>
        </tr>
    </thead>
    <tbody className="bg-white divide-y divide-black text-xs">
        <tr>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Central Area</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">50</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">20</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">COVID-19</td>
        </tr>
        <tr>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Bukit Merah</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">100</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">30</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Measles</td>
        </tr>
        <tr>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Central Water Catchment</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">30</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">15</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Measles</td>
        </tr>
        <tr>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Marine Parade</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">40</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">25</td>
            <td className="px-2 py-1 border-b border-r border-black whitespace-normal break-words">Influenza A/H1N1</td>
        </tr>
    </tbody>
</table>

</div>
            </div>
        </Fragment>
    )
}

export default Content