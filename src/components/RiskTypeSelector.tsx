import { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface RiskType {
  id: string;
  name: string;
}

interface RiskTypeSelectorProps {
  onRiskTypeChange: (riskTypeId: string) => void;
}

export default function RiskTypeSelector({ onRiskTypeChange }: RiskTypeSelectorProps) {
  const [riskTypes] = useState<RiskType[]>([
    { id: '1', name: 'Pandemic' },
    { id: '2', name: 'Natural Disaster' },
    { id: '3', name: 'Climate Risk' },
    { id: '4', name: 'Economic Risk' }
  ]);
  const [selectedRiskType, setSelectedRiskType] = useState('');

  useEffect(() => {
    onRiskTypeChange(selectedRiskType);
  }, [selectedRiskType, onRiskTypeChange]);

  return (
    <div className="mb-4">
      <h3 className="text-sm font-bold text-[#020264] mb-2">Risk Type</h3>
      <div className="relative">
        <select
          value={selectedRiskType}
          onChange={(e) => setSelectedRiskType(e.target.value)}
          className="w-full px-3 py-1.5 text-sm border border-gray-300 rounded bg-white appearance-none cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#020264] focus:border-[#020264]"
        >
          <option value="">Select Risk Type</option>
          {riskTypes.map((type) => (
            <option key={type.id} value={type.id}>
              {type.name}
            </option>
          ))}
        </select>
        <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}












// import { useEffect, useState } from 'react';
// // import { supabase, RiskType } from '../lib/supabase';
// import { ChevronDown } from 'lucide-react';

// interface RiskTypeSelectorProps {
//   onRiskTypeChange: (riskTypeId: string) => void;
// }

// export default function RiskTypeSelector({ onRiskTypeChange }: RiskTypeSelectorProps) {
//   const [riskTypes, setRiskTypes] = useState<RiskType[]>([]);
//   const [selectedRiskType, setSelectedRiskType] = useState('');

//   useEffect(() => {
//     loadRiskTypes();
//   }, []);

//   useEffect(() => {
//     onRiskTypeChange(selectedRiskType);
//   }, [selectedRiskType]);

//   const loadRiskTypes = async () => {
//     const { data } = await supabase.from('risk_types').select('*');
//     if (data) setRiskTypes(data);
//   };

//   return (
//     <div className="mb-6">
//       <h3 className="text-sm font-bold text-gray-800 mb-3">Risk Type</h3>
//       <div className="relative">
//         <select
//           value={selectedRiskType}
//           onChange={(e) => setSelectedRiskType(e.target.value)}
//           className="w-full px-3 py-2 border border-gray-300 rounded bg-white text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500"
//         >
//           <option value="">Select Risk Type</option>
//           {riskTypes.map((type) => (
//             <option key={type.id} value={type.id}>
//               {type.name}
//             </option>
//           ))}
//         </select>
//         <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
//       </div>
//     </div>
//   );
// }
