import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
import { useState } from 'react';

interface Solution {
  id: number;
  category: string;
  title: string;
  subtitle: string;
  type: string;
}

const solutions: Solution[] = [
  {
    id: 1,
    category: 'Pandemic',
    title: 'Ventilation improvements',
    subtitle: 'Category: Risk Reduction',
    type: 'Prevention'
  },
  {
    id: 2,
    category: 'Pandemic',
    title: 'Contact tracing',
    subtitle: 'Category: Insurance Penetration',
    type: 'Prevention'
  },
  {
    id: 3,
    category: 'Pandemic',
    title: 'Annual flu vaccination',
    subtitle: 'Category: Risk Financing',
    type: 'Policy & Governance'
  }
];

export default function KnowledgeRepository() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 6;

  return (
    <div className="mt-6">
      <h3 className="text-sm font-bold text-[#020264] mb-2">Knowledge Repository</h3>

      <div className="mb-3">
        <p className="text-[#2B83F6] text-xs font-semibold mb-2">Top 3 Risks - Solutions</p>

        <div className="space-y-2">
          {solutions.map((solution) => (
            <div key={solution.id} className="border border-gray-200 rounded p-2.5 bg-white hover:shadow-sm transition-shadow box-border-class">
              <div className="flex items-start justify-between mb-1.5">
                <span className="text-[#2B83F6] text-xs font-medium">{solution.category}</span>
                {/* <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" /> */}
              </div>
              <h4 className="text-sm font-bold text-[#020264] mb-0.5 leading-tight">{solution.title}</h4>
              <p className="text-xs text-gray-600 mb-0.5">{solution.subtitle}</p>
              <div className='inlne-flex'>
                <span className="text-xs text-gray-500 mb-1.5">Type: {solution.type}</span>
                <button className="text-[#020264] text-xs font-semibold hover:underline ms-12" >
                  Learn more ›
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between pt-2 border-t border-gray-200">
        <span className="text-xs text-gray-600">{currentPage}/{totalPages}</span>
        <div className="flex gap-1.5">
          <button
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}









// import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
// import { useState } from 'react';

// interface Solution {
//   id: number;
//   category: string;
//   title: string;
//   subtitle: string;
//   type: string;
// }

// const solutions: Solution[] = [
//   {
//     id: 1,
//     category: 'Pandemic',
//     title: 'Ventilation improvements',
//     subtitle: 'Category: Risk Reduction',
//     type: 'Prevention'
//   },
//   {
//     id: 2,
//     category: 'Pandemic',
//     title: 'Contact tracing',
//     subtitle: 'Category: Insurance Penetration',
//     type: 'Prevention'
//   },
//   {
//     id: 3,
//     category: 'Pandemic',
//     title: 'Annual flu vaccination',
//     subtitle: 'Category: Risk Financing',
//     type: 'Policy & Governance'
//   }
// ];

// export default function KnowledgeRepository() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 6;

//   return (
//     <div className="mt-6">
//       <h3 className="text-sm font-bold text-gray-900 mb-2">Knowledge Repository</h3>

//       <div className="mb-3">
//         <p className="text-blue-600 text-xs font-semibold mb-2">Top 3 Risks + Solutions</p>

//         <div className="space-y-2">
//           {solutions.map((solution) => (
//             <div key={solution.id} className="border border-gray-200 rounded p-2.5 bg-white hover:shadow-sm transition-shadow box-border-class">
//               <div className="flex items-start justify-between mb-1.5">
//                 <span className="text-blue-600 text-xs font-medium">{solution.category}</span>
//                 {/* <ExternalLink className="w-3 h-3 text-gray-400 flex-shrink-0" /> */}
//               </div>
//               <h4 className="text-sm font-bold text-gray-900 mb-0.5 leading-tight">{solution.title}</h4>
//               <p className="text-xs text-gray-600 mb-0.5">{solution.subtitle}</p>
//               <div className='inlne-flex'>
//                 <span className="text-xs text-gray-500 mb-1.5">Type: {solution.type}</span>
//                 <button className="text-blue-600 text-xs font-semibold hover:underline ms-12" >
//                   Learn more ›
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="flex items-center justify-between pt-2 border-t border-gray-200">
//         <span className="text-xs text-gray-600">{currentPage}/{totalPages}</span>
//         <div className="flex gap-1.5">
//           <button
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronLeft className="w-3.5 h-3.5" />
//           </button>
//           <button
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
//           >
//             <ChevronRight className="w-3.5 h-3.5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }











// import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
// import { useState } from 'react';

// interface Solution {
//   id: number;
//   category: string;
//   title: string;
//   subtitle: string;
//   type: string;
// }

// const solutions: Solution[] = [
//   {
//     id: 1,
//     category: 'Pandemic',
//     title: 'Ventilation improvements',
//     subtitle: 'Category: Risk Reduction',
//     type: 'Prevention'
//   },
//   {
//     id: 2,
//     category: 'Pandemic',
//     title: 'Contact tracing',
//     subtitle: 'Category: Insurance Penetration',
//     type: 'Prevention'
//   },
//   {
//     id: 3,
//     category: 'Pandemic',
//     title: 'Annual flu vaccination',
//     subtitle: 'Category: Risk Financing',
//     type: 'Policy & Governance'
//   }
// ];

// export default function KnowledgeRepository() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 6;

//   return (
//     <div className="bg-white p-4 rounded">
//       <h3 className="text-sm font-bold text-gray-800 mb-3">Knowledge Repository</h3>

//       <div className="mb-4">
//         <p className="text-blue-600 text-xs font-semibold mb-2">Top 3 Risks + Solutions</p>

//         <div className="space-y-3">
//           {solutions.map((solution) => (
//             <div key={solution.id} className="border border-gray-200 rounded p-3 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-2">
//                 <span className="text-blue-500 text-xs font-semibold">{solution.category}</span>
//                 <ExternalLink className="w-3 h-3 text-gray-400" />
//               </div>
//               <h4 className="text-sm font-bold text-gray-900 mb-1">{solution.title}</h4>
//               <p className="text-xs text-gray-600 mb-1">{solution.subtitle}</p>
//               <p className="text-xs text-gray-500">Type: {solution.type}</p>
//               <button className="text-blue-600 text-xs font-semibold mt-2 hover:underline">
//                 Learn more ›
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//         <span className="text-xs text-gray-600">{currentPage}/{totalPages}</span>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';
// import { useState } from 'react';

// interface Solution {
//   id: number;
//   category: string;
//   title: string;
//   subtitle: string;
//   type: string;
// }

// const solutions: Solution[] = [
//   {
//     id: 1,
//     category: 'Pandemic',
//     title: 'Ventilation improvements',
//     subtitle: 'Category: Risk Reduction',
//     type: 'Prevention'
//   },
//   {
//     id: 2,
//     category: 'Pandemic',
//     title: 'Contact tracing',
//     subtitle: 'Category: Insurance Penetration',
//     type: 'Prevention'
//   },
//   {
//     id: 3,
//     category: 'Pandemic',
//     title: 'Annual flu vaccination',
//     subtitle: 'Category: Risk Financing',
//     type: 'Policy & Governance'
//   }
// ];

// export default function KnowledgeRepository() {
//   const [currentPage, setCurrentPage] = useState(1);
//   const totalPages = 6;

//   return (
//     <div className="bg-white p-4 rounded">
//       <h3 className="text-sm font-bold text-gray-800 mb-3">Knowledge Repository</h3>

//       <div className="mb-4">
//         <p className="text-blue-600 text-xs font-semibold mb-2">Top 3 Risks + Solutions</p>

//         <div className="space-y-3">
//           {solutions.map((solution) => (
//             <div key={solution.id} className="border border-gray-200 rounded p-3 hover:shadow-md transition-shadow">
//               <div className="flex items-start justify-between mb-2">
//                 <span className="text-blue-500 text-xs font-semibold">{solution.category}</span>
//                 <ExternalLink className="w-3 h-3 text-gray-400" />
//               </div>
//               <h4 className="text-sm font-bold text-gray-900 mb-1">{solution.title}</h4>
//               <p className="text-xs text-gray-600 mb-1">{solution.subtitle}</p>
//               <p className="text-xs text-gray-500">Type: {solution.type}</p>
//               <button className="text-blue-600 text-xs font-semibold mt-2 hover:underline">
//                 Learn more ›
//               </button>
//             </div>
//           ))}
//         </div>
//       </div>
//       <div className="flex items-center justify-between pt-3 border-t border-gray-200">
//         <span className="text-xs text-gray-600">{currentPage}/{totalPages}</span>
//         <div className="flex gap-2">
//           <button
//             onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
//             disabled={currentPage === 1}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronLeft className="w-4 h-4" />
//           </button>
//           <button
//             onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
//             disabled={currentPage === totalPages}
//             className="w-6 h-6 flex items-center justify-center border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <ChevronRight className="w-4 h-4" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
