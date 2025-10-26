export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <svg
          width="180"
          height="180"
          viewBox="0 0 180 180"
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-auto"
        >
          <defs>
            <clipPath id="globeClip">
              <circle cx="90" cy="90" r="85" />
            </clipPath>
            <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#020264", stopOpacity: 1 }}
              />
              <stop
                offset="100%"
                style={{ stopColor: "#2B83F8", stopOpacity: 1 }}
              />
            </linearGradient>
          </defs>

          {/* Light background for the globe */}
          <circle cx="90" cy="90" r="85" fill="#e0f2fe" />

          <g clipPath="url(#globeClip)">
            {/* Black internal grid lines */}
            <ellipse
              cx="90"
              cy="90"
              rx="64"
              ry="85"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="90"
              cy="90"
              rx="42"
              ry="85"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="90"
              cy="90"
              rx="21"
              ry="85"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="90"
              y1="5"
              x2="90"
              y2="175"
              stroke="black"
              strokeWidth="2"
            />

            <ellipse
              cx="90"
              cy="90"
              rx="85"
              ry="64"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="90"
              cy="90"
              rx="85"
              ry="42"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <ellipse
              cx="90"
              cy="90"
              rx="85"
              ry="21"
              fill="none"
              stroke="black"
              strokeWidth="2"
            />
            <line
              x1="5"
              y1="90"
              x2="175"
              y2="90"
              stroke="black"
              strokeWidth="2"
            />

            {/* Asia highlight in gradient blue - proper coverage */}
            <path
              d="M 40 60 
                 Q 55 50 70 55 
                 Q 85 60 100 65 
                 Q 115 70 130 80 
                 Q 145 90 145 105 
                 Q 145 120 135 130 
                 Q 125 140 110 140 
                 Q 95 140 80 135 
                 Q 65 130 55 120 
                 Q 45 110 45 100 
                 Q 45 90 50 80 
                 Q 55 70 40 60 Z"
              fill="url(#asiaGradient)"
              opacity="0.85"
            />
            
            {/* Eastern extension */}
            <path
              d="M 140 55 
                 Q 150 65 152 75 
                 Q 154 85 150 90 
                 L 145 85 
                 Q 142 75 140 70 
                 Z"
              fill="url(#asiaGradient)"
              opacity="0.85"
            />
            
            {/* Southern extension */}
            <path
              d="M 50 110 
                 Q 60 120 70 125 
                 L 65 115 
                 Q 58 110 55 105 
                 Z"
              fill="url(#asiaGradient)"
              opacity="0.85"
            />
          </g>

          {/* Blue rounded globe border */}
          <circle
            cx="90"
            cy="90"
            r="85"
            fill="none"
            stroke="#020264"
            strokeWidth="4"
          />
        </svg>

        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-[#020264] leading-tight">
            Asia Risk Platform
          </h1>
          <p className="text-sm text-[#2B83F6] font-medium">
            Annotated by a Risk Management for a Sales Asia
          </p>
        </div>
      </div>

      <nav className="flex items-center gap-6">
        <a
          href="#"
          className="text-[#020264] font-semibold"
        >
          Risk Database
        </a>
        <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
          Risk Assessment Tool
        </a>
        <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
          Knowledge Repository
        </a>
      </nav>

      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#2B83F6] rounded-full flex items-center justify-center text-white">
            👤
          </div>
          <span className="text-sm font-semibold text-gray-700">
            Ida Farida ▼
          </span>
        </div>
      </div>
    </header>
  );
}









// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <svg
//           width="180"
//           height="180"
//           viewBox="0 0 180 180"
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-16 w-auto"
//         >
//           <defs>
//             <clipPath id="globeClip">
//               <circle cx="90" cy="90" r="85" />
//             </clipPath>
//             <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop
//                 offset="0%"
//                 style={{ stopColor: "#020264", stopOpacity: 1 }}
//               />
//               <stop
//                 offset="100%"
//                 style={{ stopColor: "#2B83F8", stopOpacity: 1 }}
//               />
//             </linearGradient>
//           </defs>

//           {/* Light background for the globe */}
//           <circle cx="90" cy="90" r="85" fill="#e0f2fe" />

//           <g clipPath="url(#globeClip)">
//             {/* Black internal grid lines */}
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="64"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="42"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="21"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="90"
//               y1="5"
//               x2="90"
//               y2="175"
//               stroke="black"
//               strokeWidth="2"
//             />

//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="64"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="42"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="21"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="5"
//               y1="90"
//               x2="175"
//               y2="90"
//               stroke="black"
//               strokeWidth="2"
//             />

//             {/* Asia highlight in gradient blue - proper coverage */}
//             <path
//               d="M 40 60 
//                  Q 55 50 70 55 
//                  Q 85 60 100 65 
//                  Q 115 70 130 80 
//                  Q 145 90 145 105 
//                  Q 145 120 135 130 
//                  Q 125 140 110 140 
//                  Q 95 140 80 135 
//                  Q 65 130 55 120 
//                  Q 45 110 45 100 
//                  Q 45 90 50 80 
//                  Q 55 70 40 60 Z"
//               fill="url(#asiaGradient)"
//               opacity="0.85"
//             />
            
//             {/* Eastern extension */}
//             <path
//               d="M 140 55 
//                  Q 150 65 152 75 
//                  Q 154 85 150 90 
//                  L 145 85 
//                  Q 142 75 140 70 
//                  Z"
//               fill="url(#asiaGradient)"
//               opacity="0.85"
//             />
            
//             {/* Southern extension */}
//             <path
//               d="M 50 110 
//                  Q 60 120 70 125 
//                  L 65 115 
//                  Q 58 110 55 105 
//                  Z"
//               fill="url(#asiaGradient)"
//               opacity="0.85"
//             />
//           </g>

//           {/* Blue rounded globe border */}
//           <circle
//             cx="90"
//             cy="90"
//             r="85"
//             fill="none"
//             stroke="#020264"
//             strokeWidth="4"
//           />
//         </svg>

//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-[#020264] leading-tight">
//             Asia Risk Platform
//           </h1>
//           <p className="text-sm text-[#2B83F6] font-medium">
//             Annotated by a Risk Management for a Sales Asia
//           </p>
//         </div>
//       </div>

//       <nav className="flex items-center gap-6">
//         <a
//           href="#"
//           className="text-[#020264] font-semibold border-b-2 border-[#020264] pb-1"
//         >
//           Risk Database
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Risk Assessment Tool
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Knowledge Repository
//         </a>
//       </nav>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-[#2B83F6] rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">
//             Ida Farida ▼
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }








// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <svg
//           width="180"
//           height="180"
//           viewBox="0 0 180 180"
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-16 w-auto"
//         >
//           <defs>
//             <clipPath id="globeClip">
//               <circle cx="90" cy="90" r="85" />
//             </clipPath>
//             <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop
//                 offset="0%"
//                 style={{ stopColor: "#020264", stopOpacity: 1 }}
//               />
//               <stop
//                 offset="100%"
//                 style={{ stopColor: "#2B83F8", stopOpacity: 1 }}
//               />
//             </linearGradient>
//           </defs>

//           {/* Light background for the globe */}
//           <circle cx="90" cy="90" r="85" fill="#e0f2fe" />

//           <g clipPath="url(#globeClip)">
//             {/* Black internal grid lines */}
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="64"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="42"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="21"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="90"
//               y1="5"
//               x2="90"
//               y2="175"
//               stroke="black"
//               strokeWidth="2"
//             />

//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="64"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="42"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="21"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="5"
//               y1="90"
//               x2="175"
//               y2="90"
//               stroke="black"
//               strokeWidth="2"
//             />

//             {/* Asia highlight in gradient blue - covering the Asian region */}
//             <path
//               d="M 40 60 
//                  Q 60 45 80 50 
//                  Q 100 55 120 65 
//                  Q 140 75 145 90 
//                  Q 150 105 145 120 
//                  Q 140 135 120 140 
//                  Q 100 145 80 135 
//                  Q 60 125 50 110 
//                  Q 40 95 40 80 
//                  Z"
//               fill="url(#asiaGradient)"
//               opacity="0.8"
//             />
            
//             {/* Additional smaller shapes for detailed coverage */}
//             <path
//               d="M 130 50 
//                  Q 140 60 145 70 
//                  Q 150 80 148 90 
//                  Q 146 100 140 110 
//                  L 135 105 
//                  Q 130 95 128 85 
//                  Q 126 75 130 65 
//                  Z"
//               fill="url(#asiaGradient)"
//               opacity="0.8"
//             />
            
//             <path
//               d="M 35 100 
//                  Q 40 110 50 115 
//                  Q 60 120 70 118 
//                  L 65 110 
//                  Q 55 105 50 95 
//                  Q 45 85 40 80 
//                  Z"
//               fill="url(#asiaGradient)"
//               opacity="0.8"
//             />
//           </g>

//           {/* Blue rounded globe border */}
//           <circle
//             cx="90"
//             cy="90"
//             r="85"
//             fill="none"
//             stroke="#020264"
//             strokeWidth="4"
//           />
//         </svg>

//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-[#020264] leading-tight">
//             Asia Risk Platform
//           </h1>
//           <p className="text-sm text-[#2B83F6] font-medium">
//             Annotated by a Risk Management for a Sales Asia
//           </p>
//         </div>
//       </div>

//       <nav className="flex items-center gap-6">
//         <a
//           href="#"
//           className="text-[#020264] font-semibold border-b-2 border-[#020264] pb-1"
//         >
//           Risk Database
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Risk Assessment Tool
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Knowledge Repository
//         </a>
//       </nav>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-[#2B83F6] rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">
//             Ida Farida ▼
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }









// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <svg
//           width="180"
//           height="180"
//           viewBox="0 0 180 180"
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-16 w-auto"
//         >
//           <defs>
//             <clipPath id="globeClip">
//               <circle cx="90" cy="90" r="85" />
//             </clipPath>
//             <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop
//                 offset="0%"
//                 style={{ stopColor: "#020264", stopOpacity: 1 }}
//               />
//               <stop
//                 offset="100%"
//                 style={{ stopColor: "#2B83F8", stopOpacity: 1 }}
//               />
//             </linearGradient>
//           </defs>

//           {/* Light background for the globe */}
//           <circle cx="90" cy="90" r="85" fill="#e0f2fe" />

//           <g clipPath="url(#globeClip)">
//             {/* Black internal grid lines */}
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="64"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="42"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="21"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="90"
//               y1="5"
//               x2="90"
//               y2="175"
//               stroke="black"
//               strokeWidth="2"
//             />

//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="64"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="42"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="21"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="5"
//               y1="90"
//               x2="175"
//               y2="90"
//               stroke="black"
//               strokeWidth="2"
//             />

//             {/* Asia highlight in gradient blue */}
//             <path
//               d="M 110 50 Q 125 55 135 65 Q 145 75 150 85 Q 155 95 155 105 Q 155 115 150 125 Q 145 135 135 140 L 130 135 Q 120 125 115 115 L 110 105 Q 105 95 100 90 L 95 85 Q 100 75 105 65 Z"
//               fill="url(#asiaGradient)"
//               opacity="0.7"
//             />
//           </g>

//           {/* Blue rounded globe border */}
//           <circle
//             cx="90"
//             cy="90"
//             r="85"
//             fill="none"
//             stroke="#020264"
//             strokeWidth="4"
//           />
//         </svg>

//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-[#020264] leading-tight">
//             Asia Risk Platform
//           </h1>
//           <p className="text-sm text-[#2B83F6] font-medium">
//             Annotated by a Risk Management for a Sales Asia
//           </p>
//         </div>
//       </div>

//       <nav className="flex items-center gap-6">
//         <a
//           href="#"
//           className="text-[#020264] font-semibold border-b-2 border-[#020264] pb-1"
//         >
//           Risk Database
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Risk Assessment Tool
//         </a>
//         <a href="#" className="text-[#2B83F6] hover:text-[#020264]">
//           Knowledge Repository
//         </a>
//       </nav>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-[#2B83F6] rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">
//             Ida Farida ▼
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }







// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <svg
//           width="180"
//           height="180"
//           viewBox="0 0 180 180"
//           xmlns="http://www.w3.org/2000/svg"
//           className="h-16 w-auto"
//         >
//           <defs>
//             <clipPath id="globeClip">
//               <circle cx="90" cy="90" r="85" />
//             </clipPath>
//             <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop
//                 offset="0%"
//                 style={{ stopColor: "#1e40af", stopOpacity: 1 }}
//               />
//               <stop
//                 offset="100%"
//                 style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
//               />
//             </linearGradient>
//           </defs>

//           {/* Light background for the globe */}
//           <circle cx="90" cy="90" r="85" fill="#e0f2fe" />

//           <g clipPath="url(#globeClip)">
//             {/* Black internal grid lines */}
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="64"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="42"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="21"
//               ry="85"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="90"
//               y1="5"
//               x2="90"
//               y2="175"
//               stroke="black"
//               strokeWidth="2"
//             />

//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="64"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="42"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <ellipse
//               cx="90"
//               cy="90"
//               rx="85"
//               ry="21"
//               fill="none"
//               stroke="black"
//               strokeWidth="2"
//             />
//             <line
//               x1="5"
//               y1="90"
//               x2="175"
//               y2="90"
//               stroke="black"
//               strokeWidth="2"
//             />

//             {/* Asia highlight in gradient blue */}
//             <path
//               d="M 110 50 Q 125 55 135 65 Q 145 75 150 85 Q 155 95 155 105 Q 155 115 150 125 Q 145 135 135 140 L 130 135 Q 120 125 115 115 L 110 105 Q 105 95 100 90 L 95 85 Q 100 75 105 65 Z"
//               fill="url(#asiaGradient)"
//               opacity="0.7"
//             />
//           </g>

//           {/* Blue rounded globe border */}
//           <circle
//             cx="90"
//             cy="90"
//             r="85"
//             fill="none"
//             stroke="#1e3a8a"
//             strokeWidth="4"
//           />
//         </svg>

//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-[#1e3a8a] leading-tight">
//             Asia Risk Platform
//           </h1>
//           <p className="text-sm text-[#3b82f6] font-medium">
//             Revolutionizing Risk Management for a Safer Asia
//           </p>
//         </div>
//       </div>

//       <nav className="flex items-center gap-6">
//         <a
//           href="#"
//           className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1"
//         >
//           Risk Database
//         </a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">
//           Risk Assessment Tool
//         </a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">
//           Knowledge Repository
//         </a>
//       </nav>

//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">
//             Ida Farida ▼
//           </span>
//         </div>
//       </div>
//     </header>
//   );
// }










// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <svg width="180" height="180" viewBox="0 0 180 180" xmlns="http://www.w3.org/2000/svg" className="h-16 w-auto">
//           <defs>
//             <clipPath id="globeClip">
//               <circle cx="90" cy="90" r="85"/>
//             </clipPath>
//             <linearGradient id="asiaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
//               <stop offset="0%" style={{ stopColor: '#1e40af', stopOpacity: 1 }} />
//               <stop offset="100%" style={{ stopColor: '#3b82f6', stopOpacity: 1 }} />
//             </linearGradient>
//           </defs>

//           <circle cx="90" cy="90" r="85" fill="#e0f2fe"/>

//           <g clipPath="url(#globeClip)">
//             <ellipse cx="90" cy="90" rx="64" ry="85" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <ellipse cx="90" cy="90" rx="42" ry="85" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <ellipse cx="90" cy="90" rx="21" ry="85" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <line x1="90" y1="5" x2="90" y2="175" stroke="#1e40af" strokeWidth="2"/>

//             <ellipse cx="90" cy="90" rx="85" ry="64" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <ellipse cx="90" cy="90" rx="85" ry="42" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <ellipse cx="90" cy="90" rx="85" ry="21" fill="none" stroke="#1e40af" strokeWidth="2"/>
//             <line x1="5" y1="90" x2="175" y2="90" stroke="#1e40af" strokeWidth="2"/>

//             <path d="M 110 50 Q 125 55 135 65 Q 145 75 150 85 Q 155 95 155 105 Q 155 115 150 125 Q 145 135 135 140 L 130 135 Q 120 125 115 115 L 110 105 Q 105 95 100 90 L 95 85 Q 100 75 105 65 Z" fill="url(#asiaGradient)" opacity="0.7"/>
//           </g>

//           <circle cx="90" cy="90" r="85" fill="none" stroke="#1e3a8a" strokeWidth="4"/>
//         </svg>

//         <div className="flex flex-col">
//           <h1 className="text-2xl font-bold text-[#1e3a8a] leading-tight">Asia Risk Platform</h1>
//           <p className="text-sm text-[#3b82f6] font-medium">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>
//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }









// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* Logo Container */}
//         <div className="w-16 h-16 flex items-center justify-center">
//           <svg width="64" height="64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <clipPath id="globeClip">
//                 <circle cx="100" cy="100" r="92"/>
//               </clipPath>
//             </defs>

//             {/* White background circle */}
//             <circle cx="100" cy="100" r="92" fill="white"/>

//             {/* Globe grid lines - BLACK LINES ONLY */}
//             <g clipPath="url(#globeClip)">
//               {/* Vertical longitude lines */}
//               <line x1="100" y1="8" x2="100" y2="192" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="69" ry="92" fill="none" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="46" ry="92" fill="none" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="23" ry="92" fill="none" stroke="black" strokeWidth="2.5"/>

//               {/* Horizontal latitude lines */}
//               <line x1="8" y1="100" x2="192" y2="100" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="69" fill="none" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="46" fill="none" stroke="black" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="23" fill="none" stroke="black" strokeWidth="2.5"/>
//             </g>

//             {/* Outer border circle - BLACK */}
//             <circle cx="100" cy="100" r="92" fill="none" stroke="black" strokeWidth="4"/>
//           </svg>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-blue-900">Asia Risk Platform</h1>
//           <p className="text-xs text-gray-600">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>
//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }







// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* Logo Container */}
//         <div className="w-16 h-16 flex items-center justify-center">
//           <svg width="64" height="64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <clipPath id="globeClip">
//                 <circle cx="100" cy="100" r="92"/>
//               </clipPath>
//               <radialGradient id="blueGradient" cx="50%" cy="50%">
//                 <stop offset="0%" stopColor="#60a5fa" />
//                 <stop offset="100%" stopColor="#3b82f6" />
//               </radialGradient>
//             </defs>

//             {/* Background circle - bright blue gradient */}
//             <circle cx="100" cy="100" r="92" fill="url(#blueGradient)"/>

//             {/* Globe grid lines */}
//             <g clipPath="url(#globeClip)">
//               {/* Vertical longitude lines - creating globe segments */}
//               <line x1="100" y1="8" x2="100" y2="192" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="69" ry="92" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="46" ry="92" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="23" ry="92" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>

//               {/* Horizontal latitude lines */}
//               <line x1="8" y1="100" x2="192" y2="100" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="69" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="46" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>
//               <ellipse cx="100" cy="100" rx="92" ry="23" fill="none" stroke="#1e3a8a" strokeWidth="2.5"/>
//             </g>

//             {/* Asia continent shapes */}
//             <g clipPath="url(#globeClip)">
//               {/* Northern/Central Asia - large connected mass */}
//               <path d="M 80 40 Q 90 35 100 36 Q 115 38 130 45 Q 145 52 155 65 L 158 75 Q 157 85 153 95 L 148 105 Q 143 112 135 118 L 125 123 Q 115 125 105 124 L 95 122 Q 85 118 78 112 L 72 103 Q 68 93 67 82 L 68 70 Q 70 58 75 48 Z"
//                     fill="#1e40af" opacity="0.85"/>

//               {/* Eastern extension */}
//               <path d="M 135 75 Q 142 72 148 75 L 152 82 Q 153 90 150 97 L 145 103 Q 140 105 135 103 L 132 97 Q 131 90 133 83 Z"
//                     fill="#1e40af" opacity="0.75"/>

//               {/* South Asia - Indian subcontinent */}
//               <path d="M 88 125 Q 95 122 103 123 Q 112 125 118 132 L 121 142 Q 121 152 117 161 L 111 168 Q 103 172 95 171 L 87 168 Q 81 162 78 154 L 76 144 Q 77 134 82 127 Z"
//                     fill="#2563eb" opacity="0.8"/>

//               {/* Southeast Asia peninsula */}
//               <path d="M 108 130 Q 115 128 121 131 L 126 138 Q 128 146 126 154 L 121 161 Q 115 164 109 162 L 105 156 Q 103 148 105 140 Z"
//                     fill="#3b82f6" opacity="0.75"/>

//               {/* Maritime Southeast Asia - islands */}
//               <ellipse cx="118" cy="148" rx="7" ry="10" fill="#3b82f6" opacity="0.7" transform="rotate(-15 118 148)"/>
//               <ellipse cx="128" cy="145" rx="6" ry="8" fill="#60a5fa" opacity="0.7"/>

//               {/* East Asia - Japan/Korea area */}
//               <ellipse cx="145" cy="85" rx="7" ry="14" fill="#1e40af" opacity="0.75" transform="rotate(15 145 85)"/>
//               <ellipse cx="152" cy="100" rx="5" ry="9" fill="#2563eb" opacity="0.7"/>

//               {/* Additional small islands */}
//               <circle cx="135" cy="155" r="4" fill="#60a5fa" opacity="0.6"/>
//               <circle cx="115" cy="160" r="3" fill="#60a5fa" opacity="0.6"/>
//             </g>

//             {/* Outer border circle - dark blue */}
//             <circle cx="100" cy="100" r="92" fill="none" stroke="#1e3a8a" strokeWidth="4"/>
//           </svg>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-blue-900">Asia Risk Platform</h1>
//           <p className="text-xs text-gray-600">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>
//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }












// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* Logo Container */}
//         <div className="w-16 h-16 flex items-center justify-center">
//           <svg width="64" height="64" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
//             <defs>
//               <clipPath id="globeClip">
//                 <circle cx="100" cy="100" r="95"/>
//               </clipPath>
//             </defs>

//             {/* Background circle - light blue */}
//             <circle cx="100" cy="100" r="95" fill="#3b9ff3"/>

//             {/* Globe grid lines */}
//             <g clipPath="url(#globeClip)">
//               {/* Vertical longitude lines */}
//               <ellipse cx="100" cy="100" rx="95" ry="95" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="71" ry="95" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="47" ry="95" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="24" ry="95" fill="none" stroke="#1e3a8a" strokeWidth="2"/>

//               {/* Horizontal latitude lines */}
//               <line x1="5" y1="100" x2="195" y2="100" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="95" ry="47" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="95" ry="71" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="95" ry="24" fill="none" stroke="#1e3a8a" strokeWidth="2"/>

//               {/* Additional horizontal lines for top and bottom */}
//               <ellipse cx="100" cy="100" rx="88" ry="12" fill="none" stroke="#1e3a8a" strokeWidth="2"/>
//               <ellipse cx="100" cy="100" rx="60" ry="8" fill="none" stroke="#1e3a8a" strokeWidth="2" transform="translate(0, -30)"/>
//               <ellipse cx="100" cy="100" rx="60" ry="8" fill="none" stroke="#1e3a8a" strokeWidth="2" transform="translate(0, 30)"/>
//             </g>

//             {/* Asia continent - main landmass */}
//             <g clipPath="url(#globeClip)">
//               {/* Northern Asia - Russia/Siberia */}
//               <path d="M 85 45 Q 95 42 105 43 Q 120 45 135 50 Q 145 55 150 60 L 148 65 Q 145 68 140 68 L 130 67 Q 120 65 110 63 L 95 62 Q 85 60 80 58 L 78 52 Q 80 48 85 45 Z"
//                     fill="#2563eb" opacity="0.9"/>

//               {/* Central/Eastern Asia */}
//               <path d="M 95 65 Q 105 64 115 65 Q 125 67 135 72 Q 145 78 148 85 L 150 95 Q 148 102 145 108 L 140 115 Q 135 118 128 120 L 120 121 Q 112 120 105 118 L 95 115 Q 88 112 83 108 L 80 100 Q 78 92 80 85 L 85 75 Q 90 68 95 65 Z"
//                     fill="#1d4ed8" opacity="0.95"/>

//               {/* South Asia - India */}
//               <path d="M 90 120 Q 95 118 100 118 Q 108 119 112 123 L 115 130 Q 116 138 114 145 L 110 152 Q 105 156 98 157 L 92 156 Q 87 153 84 148 L 82 140 Q 81 132 83 125 L 87 120 Z"
//                     fill="#2563eb" opacity="0.9"/>

//               {/* Southeast Asia */}
//               <path d="M 105 125 Q 112 124 118 127 L 122 132 Q 124 138 123 144 L 120 150 Q 116 154 110 155 L 105 154 Q 100 151 98 147 L 97 140 Q 98 133 102 128 Z"
//                     fill="#3b82f6" opacity="0.85"/>

//               {/* Middle East connection */}
//               <path d="M 75 95 Q 78 93 82 93 Q 88 94 92 97 L 95 103 Q 94 108 90 111 L 85 113 Q 80 112 76 109 L 74 103 Q 74 98 75 95 Z"
//                     fill="#60a5fa" opacity="0.8"/>

//               {/* East Asia islands */}
//               <ellipse cx="140" cy="95" rx="8" ry="12" fill="#2563eb" opacity="0.85"/>
//               <ellipse cx="145" cy="110" rx="6" ry="10" fill="#3b82f6" opacity="0.8"/>
//             </g>

//             {/* Outer border circle */}
//             <circle cx="100" cy="100" r="95" fill="none" stroke="#1e3a8a" strokeWidth="3.5"/>
//           </svg>
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-blue-900">Asia Risk Platform</h1>
//           <p className="text-xs text-gray-600">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>
//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }















// import { Globe } from 'lucide-react';

// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         {/* Logo Container */}
//         <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
//           <img
//             src="logo.jpg" // Replace with the actual file path or URL of the uploaded logo
//             alt="Asia Risk Platform Logo"
//             className="w-full h-full object-contain"
//           />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-blue-900">Asia Risk Platform</h1>
//           <p className="text-xs text-gray-600">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>
//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>
//       <div className="flex items-center gap-3">
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }










// import { Globe } from 'lucide-react';

// export default function Header() {
//   return (
//     <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
//       <div className="flex items-center gap-3">
//         <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
//           <Globe className="w-7 h-7 text-white" />
//         </div>
//         <div>
//           <h1 className="text-2xl font-bold text-blue-900">Asia Risk Platform</h1>
//           <p className="text-xs text-gray-600">Revolutionizing Risk Management for a Safer Asia</p>
//         </div>
//       </div>

//       <nav className="flex items-center gap-6">
//         <a href="#" className="text-blue-600 font-semibold border-b-2 border-blue-600 pb-1">Risk Database</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Risk Assessment Tool</a>
//         <a href="#" className="text-blue-500 hover:text-blue-700">Knowledge Repository</a>
//       </nav>

//       <div className="flex items-center gap-3">
//         {/* <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
//           C
//         </div> */}
//         {/* <div className="w-10 h-10 bg-gradient-to-br from-pink-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
//           A
//         </div> */}
//         <div className="flex items-center gap-2">
//           <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-white">
//             👤
//           </div>
//           <span className="text-sm font-semibold text-gray-700">Ida Farida ▼</span>
//         </div>
//       </div>
//     </header>
//   );
// }
