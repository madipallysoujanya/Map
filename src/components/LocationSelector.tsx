import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface Country {
  id: string;
  name: string;
}

interface Region {
  id: string;
  name: string;
  country_id: string;
}

interface State {
  id: string;
  name: string;
  region_id: string;
}

interface LocationSelectorProps {
  onLocationChange: (country: string, region: string, state: string) => void;
}

export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
  const [countries] = useState<Country[]>([
    { id: '1', name: 'Singapore' },
    { id: '2', name: 'Malaysia' },
    { id: '3', name: 'Indonesia' }
  ]);
  const [regions, setRegions] = useState<Region[]>([]);
  const [states, setStates] = useState<State[]>([]);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [selectedState, setSelectedState] = useState('');

  useEffect(() => {
    if (selectedCountry) {
      setRegions([
        { id: '1', name: 'North Region', country_id: selectedCountry },
        { id: '2', name: 'South Region', country_id: selectedCountry }
      ]);
      setSelectedRegion('');
      setSelectedState('');
      setStates([]);
    }
  }, [selectedCountry]);

  useEffect(() => {
    if (selectedRegion) {
      setStates([
        { id: '1', name: 'Johor', region_id: selectedRegion },
        { id: '2', name: 'Selangor', region_id: selectedRegion }
      ]);
      setSelectedState('');
    }
  }, [selectedRegion]);

  useEffect(() => {
    onLocationChange(selectedCountry, selectedRegion, selectedState);
  }, [selectedCountry, selectedRegion, selectedState, onLocationChange]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-[#020264] mb-2">Location</h3>

      <div className="space-y-2">
        <div className="relative">
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#020264] focus:border-[#020264]"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedRegion}
            onChange={(e) => setSelectedRegion(e.target.value)}
            disabled={!selectedCountry}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#020264] focus:border-[#020264] disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <option value="">Select Region</option>
            {regions.map((region) => (
              <option key={region.id} value={region.id}>
                {region.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>

        <div className="relative">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            disabled={!selectedRegion}
            className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#020264] focus:border-[#020264] disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
          >
            <option value="">Select Province/State</option>
            {states.map((state) => (
              <option key={state.id} value={state.id}>
                {state.name}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>
    </div>
  );
}









// import { useEffect, useState } from 'react';
// import { ChevronDown } from 'lucide-react';

// interface Country {
//   id: string;
//   name: string;
// }

// interface Region {
//   id: string;
//   name: string;
//   country_id: string;
// }

// interface State {
//   id: string;
//   name: string;
//   region_id: string;
// }

// interface LocationSelectorProps {
//   onLocationChange: (country: string, region: string, state: string) => void;
// }

// export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
//   const [countries] = useState<Country[]>([
//     { id: '1', name: 'Singapore' },
//     { id: '2', name: 'Malaysia' },
//     { id: '3', name: 'Indonesia' }
//   ]);
//   const [regions, setRegions] = useState<Region[]>([]);
//   const [states, setStates] = useState<State[]>([]);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [selectedState, setSelectedState] = useState('');

//   useEffect(() => {
//     if (selectedCountry) {
//       setRegions([
//         { id: '1', name: 'North Region', country_id: selectedCountry },
//         { id: '2', name: 'South Region', country_id: selectedCountry }
//       ]);
//       setSelectedRegion('');
//       setSelectedState('');
//       setStates([]);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedRegion) {
//       setStates([
//         { id: '1', name: 'Johor', region_id: selectedRegion },
//         { id: '2', name: 'Selangor', region_id: selectedRegion }
//       ]);
//       setSelectedState('');
//     }
//   }, [selectedRegion]);

//   useEffect(() => {
//     onLocationChange(selectedCountry, selectedRegion, selectedState);
//   }, [selectedCountry, selectedRegion, selectedState, onLocationChange]);

//   return (
//     <div className="mb-4">
//       <h3 className="text-sm font-bold text-gray-900 mb-2">Location</h3>

//       <div className="space-y-2">
//         <div className="relative">
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//             disabled={!selectedCountry}
//             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
//           >
//             <option value="">Select Region</option>
//             {regions.map((region) => (
//               <option key={region.id} value={region.id}>
//                 {region.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             disabled={!selectedRegion}
//             className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-50 disabled:cursor-not-allowed disabled:text-gray-400"
//           >
//             <option value="">Select Province/State</option>
//             {states.map((state) => (
//               <option key={state.id} value={state.id}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
//         </div>
//       </div>
//     </div>
//   );
// }










// import { useEffect, useState } from 'react';
// // import { supabase, Country, Region, State } from '../lib/supabase';
// import { ChevronDown } from 'lucide-react';

// interface LocationSelectorProps {
//   onLocationChange: (country: string, region: string, state: string) => void;
// }

// export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [regions, setRegions] = useState<Region[]>([]);
//   const [states, setStates] = useState<State[]>([]);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [selectedState, setSelectedState] = useState('');

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       loadRegions(selectedCountry);
//       setSelectedRegion('');
//       setSelectedState('');
//       setStates([]);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedRegion) {
//       loadStates(selectedRegion);
//       setSelectedState('');
//     }
//   }, [selectedRegion]);

//   useEffect(() => {
//     onLocationChange(selectedCountry, selectedRegion, selectedState);
//   }, [selectedCountry, selectedRegion, selectedState]);

//   const loadCountries = async () => {
//     const { data } = await supabase.from('countries').select('*');
//     if (data) setCountries(data);
//   };

//   const loadRegions = async (countryId: string) => {
//     const { data } = await supabase
//       .from('regions')
//       .select('*')
//       .eq('country_id', countryId);
//     if (data) setRegions(data);
//   };

//   const loadStates = async (regionId: string) => {
//     const { data } = await supabase
//       .from('states')
//       .select('*')
//       .eq('region_id', regionId);
//     if (data) setStates(data);
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex items-center gap-2 mb-3">
//         <h3 className="text-sm font-bold text-gray-800">Location</h3>
//       </div>

//       <div className="space-y-3">
//         <div className="relative">
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="w-[260px] px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//             disabled={!selectedCountry}
//             className="w-[260px] px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">Select Region</option>
//             {regions.map((region) => (
//               <option key={region.id} value={region.id}>
//                 {region.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             disabled={!selectedRegion}
//             className="w-[260px] px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">Select Province/State</option>
//             {states.map((state) => (
//               <option key={state.id} value={state.id}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>
//       </div>
//     </div>
//   );
// }









// import { useEffect, useState } from 'react';
// // import { supabase, Country, Region, State } from '../lib/supabase';
// import { ChevronDown } from 'lucide-react';

// interface LocationSelectorProps {
//   onLocationChange: (country: string, region: string, state: string) => void;
// }

// export default function LocationSelector({ onLocationChange }: LocationSelectorProps) {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [regions, setRegions] = useState<Region[]>([]);
//   const [states, setStates] = useState<State[]>([]);

//   const [selectedCountry, setSelectedCountry] = useState('');
//   const [selectedRegion, setSelectedRegion] = useState('');
//   const [selectedState, setSelectedState] = useState('');

//   useEffect(() => {
//     loadCountries();
//   }, []);

//   useEffect(() => {
//     if (selectedCountry) {
//       loadRegions(selectedCountry);
//       setSelectedRegion('');
//       setSelectedState('');
//       setStates([]);
//     }
//   }, [selectedCountry]);

//   useEffect(() => {
//     if (selectedRegion) {
//       loadStates(selectedRegion);
//       setSelectedState('');
//     }
//   }, [selectedRegion]);

//   useEffect(() => {
//     onLocationChange(selectedCountry, selectedRegion, selectedState);
//   }, [selectedCountry, selectedRegion, selectedState]);

//   const loadCountries = async () => {
//     const { data } = await supabase.from('countries').select('*');
//     if (data) setCountries(data);
//   };

//   const loadRegions = async (countryId: string) => {
//     const { data } = await supabase
//       .from('regions')
//       .select('*')
//       .eq('country_id', countryId);
//     if (data) setRegions(data);
//   };

//   const loadStates = async (regionId: string) => {
//     const { data } = await supabase
//       .from('states')
//       .select('*')
//       .eq('region_id', regionId);
//     if (data) setStates(data);
//   };

//   return (
//     <div className="mb-6">
//       <div className="flex items-center gap-2 mb-3">
//         <h3 className="text-sm font-bold text-gray-800">Location</h3>
//         {/* <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//           C
//         </div> */}
//         {/* <div className="w-8 h-8 bg-pink-500 rounded-full flex items-center justify-center text-white text-xs font-bold">
//           A
//         </div> */}
//       </div>

//       <div className="space-y-3">
//         <div className="relative">
//           <select
//             value={selectedCountry}
//             onChange={(e) => setSelectedCountry(e.target.value)}
//             className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//           >
//             <option value="">Select Country</option>
//             {countries.map((country) => (
//               <option key={country.id} value={country.id}>
//                 {country.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedRegion}
//             onChange={(e) => setSelectedRegion(e.target.value)}
//             disabled={!selectedCountry}
//             className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">Select Region</option>
//             {regions.map((region) => (
//               <option key={region.id} value={region.id}>
//                 {region.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>

//         <div className="relative">
//           <select
//             value={selectedState}
//             onChange={(e) => setSelectedState(e.target.value)}
//             disabled={!selectedRegion}
//             className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
//           >
//             <option value="">Select Province/State</option>
//             {states.map((state) => (
//               <option key={state.id} value={state.id}>
//                 {state.name}
//               </option>
//             ))}
//           </select>
//           <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//         </div>
//       </div>
//     </div>
//   );
// }
