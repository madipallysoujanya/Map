import { useState } from "react";
import { FaUsers, FaMapMarkedAlt, FaExclamationTriangle,  } from "react-icons/fa";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

import Content from "./content/content";

export default function DemographyPanel() {
  const [activeTab, setActiveTab] = useState<string>("demographics");

  const tabsData = [
    {
      label: "Exposure",
      icon: <FaUsers className="inline-block mr-1 w-[16px] md:w-[20px]" />,
      value: "demographics",
      content: (<Content />),
    },
    {
      label: "Loss",
      icon: <FaMapMarkedAlt className="inline-block mr-1 w-[16px] md:w-[20px]" />,
      value: "locations",
      content: (<Content />),
    },
    {
      label: "Incident",
      icon: <FaExclamationTriangle className="inline-block mr-1 w-[16px] md:w-[20px]" />,
      value: "incident",
      content: (<Content />),
    },
    
  ];

  return (
    <div className="p-4 max-w-[400px]">
      <Tabs value={activeTab} onChange={setActiveTab}>
        <TabsHeader className="space-x-4">
          {tabsData.map(({ label, value, icon }) => (
            <Tab key={value} value={value} className="flex items-center text-xs md:text-sm">
              {icon} {label}
            </Tab>
          ))}
        </TabsHeader>
        <TabsBody>
          {tabsData.map(({ value, content }) => (
            <TabPanel key={value} value={value}>
              {content}
            </TabPanel>
          ))}
        </TabsBody>
      </Tabs>
    </div>
  );
}





{/* <div className="bg-white h-screen overflow-y-auto flex flex-col">
      
      <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-gray-900">Demography</h2>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs mb-3">
          <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
            <Eye className="w-3 h-3" />
            Exposure
          </button>
          <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
            <Shield className="w-3 h-3" />
            Loss
          </button>
          <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
            <AlertTriangle className="w-3 h-3" />
            Incident
          </button>
        </div>

        <div className="flex items-center justify-between">
          <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
            <option>2025</option>
            <option>2024</option>
            <option>2023</option>
          </select>
          <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
            <option>Select Return Period</option>
          </select>
          <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-semibold">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      
      <div className="grid grid-cols-2 gap-4 p-4 border-b border-gray-200">
        
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Age</h3>
          <div className="flex flex-col items-center">
            <div className="relative w-32 h-32 mb-3">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
                <circle cx="100" cy="100" r="70" fill="none" stroke="#FFA500" strokeWidth="25" strokeDasharray="110 329" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#FF6B6B" strokeWidth="25" strokeDasharray="49 329" strokeDashoffset="-110" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#4ECDC4" strokeWidth="25" strokeDasharray="231 329" strokeDashoffset="-159" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#95E1D3" strokeWidth="25" strokeDasharray="46 329" strokeDashoffset="-390" />
                <circle cx="100" cy="100" r="70" fill="none" stroke="#F3A683" strokeWidth="25" strokeDasharray="33 329" strokeDashoffset="-436" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-xl font-bold text-gray-900">18.4</div>
                <div className="text-xl font-bold text-gray-900">35.3</div>
              </div>
            </div>
            
            <div className="space-y-2 text-xs w-full">
              {ageData.map((age, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{
                        backgroundColor: ["#FFA500", "#FF6B6B", "#4ECDC4", "#95E1D3", "#F3A683"][index],
                      }}
                    ></div>
                    <span className="text-gray-700">{age.age_group}</span>
                  </div>
                 
                </div>
              ))}
            </div>
          </div>
        </div>

        {
        <div>
          <h3 className="text-sm font-bold text-gray-900 mb-3">Location</h3>
          <div className="space-y-3">
            {locationData.map((loc, index) => (
              <div key={index} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-gray-700">{loc.location}</span>
                  <span className="font-semibold text-gray-900">{loc.population}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(loc.population / 300) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
        
          <div className="flex justify-between text-[10px] text-gray-500 mt-3 px-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>200</span>
            <span>250</span>
            <span>300</span>
          </div>
          <div className="text-center text-[10px] text-gray-500 mt-1">
            Population (US$ Million)
          </div>
        </div>
      </div>

      
      <div className="flex-1 p-4">
        <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-t font-bold text-sm mb-0">
          Recent Pandemic Impact - US$ 280 Million
        </div>
        <div className="overflow-x-auto border border-gray-200 border-t-0 rounded-b">
          <table className="w-full text-xs">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">
                  Location Impacted
                </th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">
                  Impacted Exposure<br />(US$ Million)
                </th>
                <th className="text-right px-4 py-2 font-semibold text-gray-700">
                  Death Toll<br />(Lives)
                </th>
                <th className="text-left px-4 py-2 font-semibold text-gray-700">
                  Pandemic Name
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">Central Area</td>
                <td className="px-4 py-3 text-right text-gray-900">50</td>
                <td className="px-4 py-3 text-right text-gray-900">20</td>
                <td className="px-4 py-3 text-gray-700">COVID-19</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">Bukit Merah</td>
                <td className="px-4 py-3 text-right text-gray-900">100</td>
                <td className="px-4 py-3 text-right text-gray-900">30</td>
                <td className="px-4 py-3 text-gray-700">Measles</td>
              </tr>
              <tr className="border-b border-gray-200 hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">Central Water Catchment</td>
                <td className="px-4 py-3 text-right text-gray-900">30</td>
                <td className="px-4 py-3 text-right text-gray-900">15</td>
                <td className="px-4 py-3 text-gray-700">Measles</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3 text-gray-700">Marine Parade</td>
                <td className="px-4 py-3 text-right text-gray-900">40</td>
                <td className="px-4 py-3 text-right text-gray-900">25</td>
                <td className="px-4 py-3 text-gray-700">Influenza A(H1N1)</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div> */}












// import { useEffect, useState } from 'react';
// // import { supabase } from '../lib/supabase';
// import { Eye, Shield, AlertTriangle, TrendingUp, FileText, Download } from 'lucide-react';

// interface DemographicData {
//   age_group: string;
//   percentage: number;
// }

// interface LocationData {
//   location: string;
//   population: number;
// }

// export default function DemographyPanel() {
//   const [ageData, setAgeData] = useState<DemographicData[]>([]);
//   const [locationData, setLocationData] = useState<LocationData[]>([]);

//   useEffect(() => {
//     loadDemographicData();
//   }, []);

//   const loadDemographicData = async () => {
//     const { data } = await supabase
//       .from('demographic_data')
//       .select('*');

//     if (data) {
//       const ageGroups = [
//         { age_group: '0-14', percentage: 18.4 },
//         { age_group: '15-24', percentage: 11.2 },
//         { age_group: '25-54', percentage: 52.3 },
//         { age_group: '55-64', percentage: 10.5 },
//         { age_group: '65 and above', percentage: 7.6 }
//       ];
//       setAgeData(ageGroups);

//       const locations = [
//         { location: 'Central Area', population: 284.6 },
//         { location: 'Bukit Merah', population: 135.6 },
//         { location: 'Central Water Catchment', population: 80.0 },
//         { location: 'Marine Parade', population: 52.4 },
//         { location: 'Outram', population: 30.0 }
//       ];
//       setLocationData(locations);
//     }
//   };

//   return (
//     <div className="bg-white h-full overflow-y-auto">
//       <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//               C
//             </div> */}
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
//               A
//             </div> */}
//           </div>
//         </div>

//         <div className="flex items-center gap-4 text-xs mb-3">
//           <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
//             <Eye className="w-3 h-3" />
//             Exposure
//           </button>
//           <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <Shield className="w-3 h-3" />
//             Loss
//           </button>
//           <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <AlertTriangle className="w-3 h-3" />
//             Incident
//           </button>
//           {/* <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <TrendingUp className="w-3 h-3" />
//             Protection Gap
//           </button> */}
//           {/* <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <FileText className="w-3 h-3" />
//             Insurance
//           </button> */}
//         </div>

//         <div className="flex items-center justify-between">
//           <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
//             <option>2025</option>
//             <option>2024</option>
//             <option>2023</option>
//           </select>
//           <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
//             <option>Select Return Period</option>
//           </select>
//           <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-semibold">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-t font-bold text-sm">
//           Demography
//         </div>

//         <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-b">
//           <div>
//             <h4 className="text-xs font-bold text-gray-700 mb-3">Age</h4>
//             <div className="relative w-40 h-40 mx-auto">
//               <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#FFA500"
//                   strokeWidth="30"
//                   strokeDasharray="110 329"
//                   strokeDashoffset="0"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#FF6B6B"
//                   strokeWidth="30"
//                   strokeDasharray="49 329"
//                   strokeDashoffset="-110"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#4ECDC4"
//                   strokeWidth="30"
//                   strokeDasharray="231 329"
//                   strokeDashoffset="-159"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#95E1D3"
//                   strokeWidth="30"
//                   strokeDasharray="46 329"
//                   strokeDashoffset="-390"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#F3A683"
//                   strokeWidth="30"
//                   strokeDasharray="33 329"
//                   strokeDashoffset="-436"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-800">100%</div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-3 space-y-1 text-xs">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span>0-14</span>
//                 </div>
//                 <span className="font-semibold">18.4</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                   <span>15-24</span>
//                 </div>
//                 <span className="font-semibold">11.2</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
//                   <span>25-54</span>
//                 </div>
//                 <span className="font-semibold">52.3</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-teal-300 rounded-full"></div>
//                   <span>55-64</span>
//                 </div>
//                 <span className="font-semibold">10.5</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
//                   <span>65 and above</span>
//                 </div>
//                 <span className="font-semibold">7.6</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-xs font-bold text-gray-700 mb-3">Location</h4>
//             <div className="space-y-2 text-xs">
//               {locationData.map((loc, index) => (
//                 <div key={index}>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-gray-700 text-xs">{loc.location}</span>
//                     <span className="font-semibold">{loc.population}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-blue-500 h-2 rounded-full"
//                       style={{ width: `${(loc.population / 284.6) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//               <div className="text-right text-gray-500 text-xs mt-2">
//                 * Population (US$ Million)
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-t font-bold text-sm">
//             Recent Pandemic Impact - US$ 280 Million
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-xs">
//               <thead className="bg-gray-100 border-b border-gray-300">
//                 <tr>
//                   <th className="text-left px-4 py-2 font-semibold text-gray-700">Location Impacted</th>
//                   <th className="text-right px-4 py-2 font-semibold text-gray-700">Impacted Exposure<br />(US$ Million)</th>
//                   <th className="text-right px-4 py-2 font-semibold text-gray-700">Death Toll<br />(Lives)</th>
//                   <th className="text-left px-4 py-2 font-semibold text-gray-700">Pandemic Name</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Central Area</td>
//                   <td className="px-4 py-3 text-right">50</td>
//                   <td className="px-4 py-3 text-right">20</td>
//                   <td className="px-4 py-3">COVID-19</td>
//                 </tr>
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Bukit Merah</td>
//                   <td className="px-4 py-3 text-right">100</td>
//                   <td className="px-4 py-3 text-right">30</td>
//                   <td className="px-4 py-3">Measles</td>
//                 </tr>
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Central Water Catchment</td>
//                   <td className="px-4 py-3 text-right">30</td>
//                   <td className="px-4 py-3 text-right">15</td>
//                   <td className="px-4 py-3">Measles</td>
//                 </tr>
//                 <tr className="hover:bg-gray-50">
//                   <td className="px-4 py-3">Marine Parade</td>
//                   <td className="px-4 py-3 text-right">40</td>
//                   <td className="px-4 py-3 text-right">25</td>
//                   <td className="px-4 py-3">Influenza A(H1N1)</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }












// import { useEffect, useState } from 'react';
// // import { supabase } from '../lib/supabase';
// import { Eye, Shield, AlertTriangle, TrendingUp, FileText, Download } from 'lucide-react';

// interface DemographicData {
//   age_group: string;
//   percentage: number;
// }

// interface LocationData {
//   location: string;
//   population: number;
// }

// export default function DemographyPanel() {
//   const [ageData, setAgeData] = useState<DemographicData[]>([]);
//   const [locationData, setLocationData] = useState<LocationData[]>([]);

//   useEffect(() => {
//     loadDemographicData();
//   }, []);

//   const loadDemographicData = async () => {
//     const { data } = await supabase
//       .from('demographic_data')
//       .select('*');

//     if (data) {
//       const ageGroups = [
//         { age_group: '0-14', percentage: 18.4 },
//         { age_group: '15-24', percentage: 11.2 },
//         { age_group: '25-54', percentage: 52.3 },
//         { age_group: '55-64', percentage: 10.5 },
//         { age_group: '65 and above', percentage: 7.6 }
//       ];
//       setAgeData(ageGroups);

//       const locations = [
//         { location: 'Central Area', population: 284.6 },
//         { location: 'Bukit Merah', population: 135.6 },
//         { location: 'Central Water Catchment', population: 80.0 },
//         { location: 'Marine Parade', population: 52.4 },
//         { location: 'Outram', population: 30.0 }
//       ];
//       setLocationData(locations);
//     }
//   };

//   return (
//     <div className="bg-white h-full overflow-y-auto">
//       <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-200">
//         <div className="flex items-center justify-between mb-3">
//           <div className="flex items-center gap-3">
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//               C
//             </div> */}
//             {/* <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
//               A
//             </div> */}
//           </div>
//         </div>

//         <div className="flex items-center gap-4 text-xs mb-3">
//           <button className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded font-semibold">
//             <Eye className="w-3 h-3" />
//             Exposure
//           </button>
//           <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <Shield className="w-3 h-3" />
//             Loss
//           </button>
//           <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <AlertTriangle className="w-3 h-3" />
//             Incident
//           </button>
//           {/* <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <TrendingUp className="w-3 h-3" />
//             Protection Gap
//           </button> */}
//           {/* <button className="flex items-center gap-1 px-3 py-1 hover:bg-gray-100 text-gray-700 rounded">
//             <FileText className="w-3 h-3" />
//             Insurance
//           </button> */}
//         </div>

//         <div className="flex items-center justify-between">
//           <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
//             <option>2025</option>
//             <option>2024</option>
//             <option>2023</option>
//           </select>
//           <select className="px-3 py-1 border border-gray-300 rounded text-sm bg-white">
//             <option>Select Return Period</option>
//           </select>
//           <button className="flex items-center gap-1 px-3 py-1 text-blue-600 hover:bg-blue-50 rounded text-sm font-semibold">
//             <Download className="w-4 h-4" />
//             Export
//           </button>
//         </div>
//       </div>

//       <div className="p-4">
//         <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-t font-bold text-sm">
//           Demography
//         </div>

//         <div className="grid grid-cols-2 gap-6 p-4 bg-gray-50 rounded-b">
//           <div>
//             <h4 className="text-xs font-bold text-gray-700 mb-3">Age</h4>
//             <div className="relative w-40 h-40 mx-auto">
//               <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-90">
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#FFA500"
//                   strokeWidth="30"
//                   strokeDasharray="110 329"
//                   strokeDashoffset="0"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#FF6B6B"
//                   strokeWidth="30"
//                   strokeDasharray="49 329"
//                   strokeDashoffset="-110"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#4ECDC4"
//                   strokeWidth="30"
//                   strokeDasharray="231 329"
//                   strokeDashoffset="-159"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#95E1D3"
//                   strokeWidth="30"
//                   strokeDasharray="46 329"
//                   strokeDashoffset="-390"
//                 />
//                 <circle
//                   cx="100"
//                   cy="100"
//                   r="70"
//                   fill="none"
//                   stroke="#F3A683"
//                   strokeWidth="30"
//                   strokeDasharray="33 329"
//                   strokeDashoffset="-436"
//                 />
//               </svg>
//               <div className="absolute inset-0 flex items-center justify-center">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-gray-800">100%</div>
//                 </div>
//               </div>
//             </div>
//             <div className="mt-3 space-y-1 text-xs">
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
//                   <span>0-14</span>
//                 </div>
//                 <span className="font-semibold">18.4</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-red-400 rounded-full"></div>
//                   <span>15-24</span>
//                 </div>
//                 <span className="font-semibold">11.2</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-teal-400 rounded-full"></div>
//                   <span>25-54</span>
//                 </div>
//                 <span className="font-semibold">52.3</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-teal-300 rounded-full"></div>
//                   <span>55-64</span>
//                 </div>
//                 <span className="font-semibold">10.5</span>
//               </div>
//               <div className="flex items-center justify-between">
//                 <div className="flex items-center gap-2">
//                   <div className="w-3 h-3 bg-orange-300 rounded-full"></div>
//                   <span>65 and above</span>
//                 </div>
//                 <span className="font-semibold">7.6</span>
//               </div>
//             </div>
//           </div>

//           <div>
//             <h4 className="text-xs font-bold text-gray-700 mb-3">Location</h4>
//             <div className="space-y-2 text-xs">
//               {locationData.map((loc, index) => (
//                 <div key={index}>
//                   <div className="flex items-center justify-between mb-1">
//                     <span className="text-gray-700 text-xs">{loc.location}</span>
//                     <span className="font-semibold">{loc.population}</span>
//                   </div>
//                   <div className="w-full bg-gray-200 rounded-full h-2">
//                     <div
//                       className="bg-blue-500 h-2 rounded-full"
//                       style={{ width: `${(loc.population / 284.6) * 100}%` }}
//                     ></div>
//                   </div>
//                 </div>
//               ))}
//               <div className="text-right text-gray-500 text-xs mt-2">
//                 * Population (US$ Million)
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="mt-6">
//           <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white px-4 py-2 rounded-t font-bold text-sm">
//             Recent Pandemic Impact - US$ 280 Million
//           </div>
//           <div className="overflow-x-auto">
//             <table className="w-full text-xs">
//               <thead className="bg-gray-100 border-b border-gray-300">
//                 <tr>
//                   <th className="text-left px-4 py-2 font-semibold text-gray-700">Location Impacted</th>
//                   <th className="text-right px-4 py-2 font-semibold text-gray-700">Impacted Exposure<br />(US$ Million)</th>
//                   <th className="text-right px-4 py-2 font-semibold text-gray-700">Death Toll<br />(Lives)</th>
//                   <th className="text-left px-4 py-2 font-semibold text-gray-700">Pandemic Name</th>
//                 </tr>
//               </thead>
//               <tbody className="bg-white">
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Central Area</td>
//                   <td className="px-4 py-3 text-right">50</td>
//                   <td className="px-4 py-3 text-right">20</td>
//                   <td className="px-4 py-3">COVID-19</td>
//                 </tr>
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Bukit Merah</td>
//                   <td className="px-4 py-3 text-right">100</td>
//                   <td className="px-4 py-3 text-right">30</td>
//                   <td className="px-4 py-3">Measles</td>
//                 </tr>
//                 <tr className="border-b border-gray-200 hover:bg-gray-50">
//                   <td className="px-4 py-3">Central Water Catchment</td>
//                   <td className="px-4 py-3 text-right">30</td>
//                   <td className="px-4 py-3 text-right">15</td>
//                   <td className="px-4 py-3">Measles</td>
//                 </tr>
//                 <tr className="hover:bg-gray-50">
//                   <td className="px-4 py-3">Marine Parade</td>
//                   <td className="px-4 py-3 text-right">40</td>
//                   <td className="px-4 py-3 text-right">25</td>
//                   <td className="px-4 py-3">Influenza A(H1N1)</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
