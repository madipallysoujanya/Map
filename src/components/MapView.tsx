import { useEffect } from 'react';
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from 'react-leaflet';
import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, Map as MapIcon, Locate } from 'lucide-react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const singaporeCoords: [number, number] = [1.3521, 103.8198];

const exposurePolygon: [number, number][] = [
  [1.45, 103.65], [1.48, 103.72], [1.50, 103.80],
  [1.52, 103.88], [1.50, 103.95], [1.45, 104.00],
  [1.38, 104.02], [1.30, 104.00], [1.25, 103.95],
  [1.22, 103.88], [1.20, 103.80], [1.22, 103.72],
  [1.25, 103.68], [1.30, 103.65], [1.38, 103.64],
];

const locations = [
  { name: 'Senai', coords: [1.58, 103.60] as [number, number] },
  { name: 'Taman Johor Jaya', coords: [1.53, 103.78] as [number, number] },
  { name: 'Pasir Gudang', coords: [1.48, 103.90] as [number, number] },
  { name: 'Tebrau', coords: [1.52, 103.74] as [number, number] },
  { name: 'Kampung\nPasir Puteh', coords: [1.50, 103.82] as [number, number] },
  { name: 'Kampung\nTengah', coords: [1.48, 103.92] as [number, number] },
  { name: 'Layang\nLayang', coords: [1.35, 103.68] as [number, number] },
  { name: 'Sungai Tiram', coords: [1.48, 104.05] as [number, number] },
  { name: 'Pengerang', coords: [1.38, 104.10] as [number, number] },
  { name: 'Bandar\nPenawar', coords: [1.28, 104.15] as [number, number] },
  { name: 'Central\nWater\nCatchment', coords: [1.42, 103.72] as [number, number] },
  { name: 'Western\nWater\nCatchment', coords: [1.38, 103.70] as [number, number] },
  { name: 'Tanjong\nPagar', coords: [1.28, 103.72] as [number, number] },
];

const reservoirs = [
  { name: 'Kranji Reservoir', coords: [1.43, 103.72] as [number, number] },
  { name: 'Seletar Reservoir', coords: [1.40, 103.82] as [number, number] },
];

function MapControls() {
  const map = useMap();

  const handleZoomIn = () => map.zoomIn();
  const handleZoomOut = () => map.zoomOut();
  const handleHome = () => map.setView(singaporeCoords, 10);

  const handleLeftArrow = () => {
    const currentCenter = map.getCenter();
    map.setView([currentCenter.lat, currentCenter.lng - 0.05], map.getZoom());
  };

  const handleRightArrow = () => {
    const currentCenter = map.getCenter();
    map.setView([currentCenter.lat, currentCenter.lng + 0.05], map.getZoom());
  };

  return (
    <>
      {/* Search Button */}
      <div className="absolute top-3 left-3 z-[1000]">
        <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <Search className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-3 left-12 flex flex-col gap-1 z-[1000]">
        <button onClick={handleZoomIn} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
        <button onClick={handleZoomOut} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <ZoomOut className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Home and Locate */}
      <div className="absolute top-16 left-3 flex flex-col gap-1 z-[1000]">
        <button onClick={handleHome} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <Home className="w-4 h-4 text-gray-700" />
        </button>
        <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <Locate className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Right Side Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 z-[1000]">
        <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <MapIcon className="w-4 h-4 text-gray-700" />
        </button>
        <button className="w-8 h-8 bg-blue-600 rounded shadow flex items-center justify-center hover:bg-blue-700">
          <Layers className="w-4 h-4 text-white" />
        </button>
        <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
          <Menu className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Left and Right Arrows - Positioned more towards back */}
      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-[1000]">
        <button onClick={handleLeftArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
          <FaChevronLeft className="w-3 h-3 text-gray-700" />
        </button>
      </div>

      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-[1000]">
        <button onClick={handleRightArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
          <FaChevronRight className="w-3 h-3 text-gray-700" />
        </button>
      </div>
    </>
  );
}

function LocationLabels() {
  const map = useMap();

  useEffect(() => {
    locations.forEach(location => {
      const label = L.divIcon({
        className: 'location-label',
        html: `<div style="color:white;font-size:11px;font-weight:600;text-shadow:0 2px 4px rgba(0,0,0,0.8);white-space:pre-line;text-align:center;">${location.name}</div>`,
        iconSize: [0, 0],
      });
      L.marker(location.coords, { icon: label }).addTo(map);
    });

    const singaporeLabel = L.divIcon({
      className: 'singapore-label',
      html: '<div style="color:white;font-size:14px;font-weight:bold;text-shadow:0 2px 4px rgba(0,0,0,0.8);">Johor Bahru</div>',
      iconSize: [0, 0],
    });
    L.marker([1.47, 103.76], { icon: singaporeLabel }).addTo(map);
  }, [map]);

  return null;
}

export default function MapView() {
  return (
    <div className="relative w-full h-screen m-0 p-0 overflow-hidden">
      <MapContainer
        center={singaporeCoords}
        zoom={10}
        className="w-full h-full m-0 p-0"
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution='&copy; Esri'
        />

        <Polygon
          positions={exposurePolygon}
          pathOptions={{ fillOpacity: 0, color: '#404040', weight: 2, opacity: 0.8 }}
        >
          <Popup>
            <div className="text-center">
              <strong>Exposure Zone</strong>
              <br />
              Singapore Region
            </div>
          </Popup>
        </Polygon>

        <CircleMarker
          center={singaporeCoords}
          radius={8}
          pathOptions={{ fillOpacity: 0, color: '#404040', weight: 2 }}
        >
          <Popup><strong>Singapore</strong></Popup>
        </CircleMarker>

        {reservoirs.map((r, i) => (
          <CircleMarker key={i} center={r.coords} radius={6} pathOptions={{ fillOpacity: 0, color: '#404040', weight: 1 }}>
            <Popup>{r.name}</Popup>
          </CircleMarker>
        ))}

        <MapControls />
        <LocationLabels />
      </MapContainer>
    </div>
  );
}










// import { useEffect } from 'react';
// import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from 'react-leaflet';
// import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, Map as MapIcon, Locate } from 'lucide-react';
// import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const singaporeCoords: [number, number] = [1.3521, 103.8198];

// const exposurePolygon: [number, number][] = [
//   [1.45, 103.65], [1.48, 103.72], [1.50, 103.80],
//   [1.52, 103.88], [1.50, 103.95], [1.45, 104.00],
//   [1.38, 104.02], [1.30, 104.00], [1.25, 103.95],
//   [1.22, 103.88], [1.20, 103.80], [1.22, 103.72],
//   [1.25, 103.68], [1.30, 103.65], [1.38, 103.64],
// ];

// const locations = [
//   { name: 'Senai', coords: [1.58, 103.60] as [number, number] },
//   { name: 'Taman Johor Jaya', coords: [1.53, 103.78] as [number, number] },
//   { name: 'Pasir Gudang', coords: [1.48, 103.90] as [number, number] },
//   { name: 'Tebrau', coords: [1.52, 103.74] as [number, number] },
//   { name: 'Kampung\nPasir Puteh', coords: [1.50, 103.82] as [number, number] },
//   { name: 'Kampung\nTengah', coords: [1.48, 103.92] as [number, number] },
//   { name: 'Layang\nLayang', coords: [1.35, 103.68] as [number, number] },
//   { name: 'Sungai Tiram', coords: [1.48, 104.05] as [number, number] },
//   { name: 'Pengerang', coords: [1.38, 104.10] as [number, number] },
//   { name: 'Bandar\nPenawar', coords: [1.28, 104.15] as [number, number] },
//   { name: 'Central\nWater\nCatchment', coords: [1.42, 103.72] as [number, number] },
//   { name: 'Western\nWater\nCatchment', coords: [1.38, 103.70] as [number, number] },
//   { name: 'Tanjong\nPagar', coords: [1.28, 103.72] as [number, number] },
// ];

// const reservoirs = [
//   { name: 'Kranji Reservoir', coords: [1.43, 103.72] as [number, number] },
//   { name: 'Seletar Reservoir', coords: [1.40, 103.82] as [number, number] },
// ];

// function MapControls() {
//   const map = useMap();

//   const handleZoomIn = () => map.zoomIn();
//   const handleZoomOut = () => map.zoomOut();
//   const handleHome = () => map.setView(singaporeCoords, 10);

//   const handleLeftArrow = () => {
//     const currentCenter = map.getCenter();
//     map.setView([currentCenter.lat, currentCenter.lng - 0.05], map.getZoom());
//   };

//   const handleRightArrow = () => {
//     const currentCenter = map.getCenter();
//     map.setView([currentCenter.lat, currentCenter.lng + 0.05], map.getZoom());
//   };

//   return (
//     <>
//       <div className="absolute top-4 left-4 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Search className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 left-16 flex flex-col gap-2 z-[1000]">
//         <button onClick={handleZoomIn} className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomIn className="w-5 h-5 text-gray-700" />
//         </button>
//         <button onClick={handleZoomOut} className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomOut className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-20 left-4 flex flex-col gap-2 z-[1000]">
//         <button onClick={handleHome} className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Home className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Locate className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <MapIcon className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-blue-600 rounded shadow flex items-center justify-center hover:bg-blue-700">
//           <Layers className="w-5 h-5 text-white" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Menu className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Left and Right Arrows */}
//       <div className="absolute top-1/2 left-2 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleLeftArrow} className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <FaChevronLeft className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-2 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleRightArrow} className="w-10 h-10 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <FaChevronRight className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>
//     </>
//   );
// }

// function LocationLabels() {
//   const map = useMap();

//   useEffect(() => {
//     locations.forEach(location => {
//       const label = L.divIcon({
//         className: 'location-label',
//         html: `<div style="color:white;font-size:11px;font-weight:600;text-shadow:0 2px 4px rgba(0,0,0,0.8);white-space:pre-line;text-align:center;">${location.name}</div>`,
//         iconSize: [0, 0],
//       });
//       L.marker(location.coords, { icon: label }).addTo(map);
//     });

//     const singaporeLabel = L.divIcon({
//       className: 'singapore-label',
//       html: '<div style="color:white;font-size:14px;font-weight:bold;text-shadow:0 2px 4px rgba(0,0,0,0.8);">Johor Bahru</div>',
//       iconSize: [0, 0],
//     });
//     L.marker([1.47, 103.76], { icon: singaporeLabel }).addTo(map);
//   }, [map]);

//   return null;
// }

// export default function MapView() {
//   return (
//     <div className="relative w-full h-screen m-0 p-0 overflow-hidden">
//       <MapContainer
//         center={singaporeCoords}
//         zoom={10}
//         className="w-full h-full m-0 p-0"
//         zoomControl={false}
//       >
//         <TileLayer
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           attribution='&copy; Esri'
//         />

//         <Polygon
//           positions={exposurePolygon}
//           pathOptions={{ fillOpacity: 0, color: '#404040', weight: 2, opacity: 0.8 }}
//         >
//           <Popup>
//             <div className="text-center">
//               <strong>Exposure Zone</strong>
//               <br />
//               Singapore Region
//             </div>
//           </Popup>
//         </Polygon>

//         <CircleMarker
//           center={singaporeCoords}
//           radius={8}
//           pathOptions={{ fillOpacity: 0, color: '#404040', weight: 2 }}
//         >
//           <Popup><strong>Singapore</strong></Popup>
//         </CircleMarker>

//         {reservoirs.map((r, i) => (
//           <CircleMarker key={i} center={r.coords} radius={6} pathOptions={{ fillOpacity: 0, color: '#404040', weight: 1 }}>
//             <Popup>{r.name}</Popup>
//           </CircleMarker>
//         ))}

//         <MapControls />
//         <LocationLabels />
//       </MapContainer>
//     </div>
//   );
// }









// import { useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from 'react-leaflet';
// import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, Map as MapIcon, Locate, ArrowRight } from 'lucide-react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';
// import {  FaChevronLeft, FaChevronRight } from "react-icons/fa";

// const singaporeCoords: [number, number] = [1.3521, 103.8198];

// const exposurePolygon: [number, number][] = [
//   [1.45, 103.65],
//   [1.48, 103.72],
//   [1.50, 103.80],
//   [1.52, 103.88],
//   [1.50, 103.95],
//   [1.45, 104.00],
//   [1.38, 104.02],
//   [1.30, 104.00],
//   [1.25, 103.95],
//   [1.22, 103.88],
//   [1.20, 103.80],
//   [1.22, 103.72],
//   [1.25, 103.68],
//   [1.30, 103.65],
//   [1.38, 103.64],
// ];

// const locations = [
//   { name: 'Senai', coords: [1.58, 103.60] as [number, number] },
//   { name: 'Taman Johor Jaya', coords: [1.53, 103.78] as [number, number] },
//   { name: 'Pasir Gudang', coords: [1.48, 103.90] as [number, number] },
//   { name: 'Tebrau', coords: [1.52, 103.74] as [number, number] },
//   { name: 'Kampung\nPasir Puteh', coords: [1.50, 103.82] as [number, number] },
//   { name: 'Kampung\nTengah', coords: [1.48, 103.92] as [number, number] },
//   { name: 'Layang\nLayang', coords: [1.35, 103.68] as [number, number] },
//   { name: 'Sungai Tiram', coords: [1.48, 104.05] as [number, number] },
//   { name: 'Pengerang', coords: [1.38, 104.10] as [number, number] },
//   { name: 'Bandar\nPenawar', coords: [1.28, 104.15] as [number, number] },
//   { name: 'Central\nWater\nCatchment', coords: [1.42, 103.72] as [number, number] },
//   { name: 'Western\nWater\nCatchment', coords: [1.38, 103.70] as [number, number] },
//   { name: 'Tanjong\nPagar', coords: [1.28, 103.72] as [number, number] },
// ];

// const reservoirs = [
//   { name: 'Kranji Reservoir', coords: [1.43, 103.72] as [number, number] },
//   { name: 'Seletar Reservoir', coords: [1.40, 103.82] as [number, number] },
// ];

// function MapControls() {
//   const map = useMap();

//   const handleZoomIn = () => map.zoomIn();
//   const handleZoomOut = () => map.zoomOut();
//   const handleHome = () => map.setView(singaporeCoords, 10);

//   const handleLeftArrow = () => {
//     const currentCenter = map.getCenter();
//     map.setView([currentCenter.lat, currentCenter.lng - 0.05], map.getZoom()); // Pans to the left
//   };

//   const handleRightArrow = () => {
//     const currentCenter = map.getCenter();
//     map.setView([currentCenter.lat, currentCenter.lng + 0.05], map.getZoom()); // Pans to the right
//   };

//   return (
//     <>
//       <div className="absolute top-4 left-4 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Search className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 left-16 flex flex-col gap-2 z-[1000]">
//         <button
//           onClick={handleZoomIn}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <ZoomIn className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={handleZoomOut}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <ZoomOut className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-20 left-4 flex flex-col gap-2 z-[1000]">
//         <button
//           onClick={handleHome}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <Home className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Locate className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <MapIcon className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-blue-600 rounded shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
//           <Layers className="w-5 h-5 text-white" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Menu className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Centered Left Arrow */}
//       <div className="absolute top-1/2 left-4 transform -translate-y-1/2 z-[1000]">
//         <button
//           onClick={handleLeftArrow}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <FaChevronLeft className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       {/* Centered Right Arrow */}
//       <div className="absolute top-1/2 right-4 transform -translate-y-1/2 z-[1000]">
//         <button
//           onClick={handleRightArrow}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <FaChevronRight   className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute bottom-20 right-4 bg-white/95 backdrop-blur-sm rounded shadow-lg p-3 z-[1000]">
//         <div className="flex items-center gap-3">
//           <div className="font-bold text-gray-800 text-xs">Legend</div>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-4 bg-transparent rounded"></div>
//             <span className="text-xs text-gray-700">Exposure</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function LocationLabels() {
//   const map = useMap();

//   useEffect(() => {
//     locations.forEach(location => {
//       const label = L.divIcon({
//         className: 'location-label',
//         html: `<div style="color: white; font-size: 11px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: pre-line; text-align: center;">${location.name}</div>`,
//         iconSize: [0, 0],
//       });

//       L.marker(location.coords, { icon: label }).addTo(map);
//     });

//     const singaporeLabel = L.divIcon({
//       className: 'singapore-label',
//       html: '<div style="color: white; font-size: 14px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Johor Bahru</div>',
//       iconSize: [0, 0],
//     });
//     L.marker([1.47, 103.76], { icon: singaporeLabel }).addTo(map);
//   }, [map]);

//   return null;
// }

// export default function MapView() {
//   return (
//     <div className="relative w-full h-screen">
//       <MapContainer
//         center={singaporeCoords}
//         zoom={10}
//         className="w-full h-full"
//         zoomControl={false}
//       >
//         <TileLayer
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           attribution='&copy; Esri'
//         />

//         <Polygon
//           positions={exposurePolygon}
//           pathOptions={{
//             fillOpacity: 0, // Removed fill color
//             color: '#404040', // Kept outline for visibility
//             weight: 2,
//             opacity: 0.8,
//           }}
//         >
//           <Popup>
//             <div className="text-center">
//               <strong>Exposure Zone</strong>
//               <br />
//               Singapore Region
//             </div>
//           </Popup>
//         </Polygon>

//         <CircleMarker
//           center={singaporeCoords}
//           radius={8}
//           pathOptions={{
//             fillOpacity: 0, // Removed fill color
//             color: '#404040', // Kept outline for visibility
//             weight: 2,
//           }}
//         >
//           <Popup>
//             <strong>Singapore</strong>
//           </Popup>
//         </CircleMarker>

//         {reservoirs.map((reservoir, idx) => (
//           <CircleMarker
//             key={idx}
//             center={reservoir.coords}
//             radius={6}
//             pathOptions={{
//               fillOpacity: 0, // Removed fill color
//               color: '#404040', // Kept outline for visibility
//               weight: 1,
//             }}
//           >
//             <Popup>{reservoir.name}</Popup>
//           </CircleMarker>
//         ))}

//         <MapControls />
//         <LocationLabels />
//       </MapContainer>
//     </div>
//   );
// }

























// import { useEffect, useRef } from 'react';
// import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from 'react-leaflet';
// import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, Map as MapIcon, Locate } from 'lucide-react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// const singaporeCoords: [number, number] = [1.3521, 103.8198];

// const exposurePolygon: [number, number][] = [
//   [1.45, 103.65],
//   [1.48, 103.72],
//   [1.50, 103.80],
//   [1.52, 103.88],
//   [1.50, 103.95],
//   [1.45, 104.00],
//   [1.38, 104.02],
//   [1.30, 104.00],
//   [1.25, 103.95],
//   [1.22, 103.88],
//   [1.20, 103.80],
//   [1.22, 103.72],
//   [1.25, 103.68],
//   [1.30, 103.65],
//   [1.38, 103.64],
// ];

// const locations = [
//   { name: 'Senai', coords: [1.58, 103.60] as [number, number] },
//   { name: 'Taman Johor Jaya', coords: [1.53, 103.78] as [number, number] },
//   { name: 'Pasir Gudang', coords: [1.48, 103.90] as [number, number] },
//   { name: 'Tebrau', coords: [1.52, 103.74] as [number, number] },
//   { name: 'Kampung\nPasir Puteh', coords: [1.50, 103.82] as [number, number] },
//   { name: 'Kampung\nTengah', coords: [1.48, 103.92] as [number, number] },
//   { name: 'Layang\nLayang', coords: [1.35, 103.68] as [number, number] },
//   { name: 'Sungai Tiram', coords: [1.48, 104.05] as [number, number] },
//   { name: 'Pengerang', coords: [1.38, 104.10] as [number, number] },
//   { name: 'Bandar\nPenawar', coords: [1.28, 104.15] as [number, number] },
//   { name: 'Central\nWater\nCatchment', coords: [1.42, 103.72] as [number, number] },
//   { name: 'Western\nWater\nCatchment', coords: [1.38, 103.70] as [number, number] },
//   { name: 'Tanjong\nPagar', coords: [1.28, 103.72] as [number, number] },
// ];

// const reservoirs = [
//   { name: 'Kranji Reservoir', coords: [1.43, 103.72] as [number, number] },
//   { name: 'Seletar Reservoir', coords: [1.40, 103.82] as [number, number] },
// ];

// function MapControls() {
//   const map = useMap();

//   const handleZoomIn = () => map.zoomIn();
//   const handleZoomOut = () => map.zoomOut();
//   const handleHome = () => map.setView(singaporeCoords, 10);

//   return (
//     <>
//       <div className="absolute top-4 left-4 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Search className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 left-16 flex flex-col gap-2 z-[1000]">
//         <button
//           onClick={handleZoomIn}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <ZoomIn className="w-5 h-5 text-gray-700" />
//         </button>
//         <button
//           onClick={handleZoomOut}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <ZoomOut className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-20 left-4 flex flex-col gap-2 z-[1000]">
//         <button
//           onClick={handleHome}
//           className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
//         >
//           <Home className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Locate className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-4 right-4 flex flex-col gap-2 z-[1000]">
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <MapIcon className="w-5 h-5 text-gray-700" />
//         </button>
//         <button className="w-10 h-10 bg-blue-600 rounded shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
//           <Layers className="w-5 h-5 text-white" />
//         </button>
//         <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//           <Menu className="w-5 h-5 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute bottom-20 right-4 bg-white/95 backdrop-blur-sm rounded shadow-lg p-3 z-[1000]">
//         <div className="flex items-center gap-3">
//           <div className="font-bold text-gray-800 text-xs">Legend</div>
//           <div className="flex items-center gap-2">
//             <div className="w-8 h-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 rounded"></div>
//             <span className="text-xs text-gray-700">Exposure</span>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// function LocationLabels() {
//   const map = useMap();

//   useEffect(() => {
//     locations.forEach(location => {
//       const label = L.divIcon({
//         className: 'location-label',
//         html: `<div style="color: white; font-size: 11px; font-weight: 600; text-shadow: 0 2px 4px rgba(0,0,0,0.8); white-space: pre-line; text-align: center;">${location.name}</div>`,
//         iconSize: [0, 0],
//       });

//       L.marker(location.coords, { icon: label }).addTo(map);
//     });

//     const singaporeLabel = L.divIcon({
//       className: 'singapore-label',
//       html: '<div style="color: white; font-size: 14px; font-weight: bold; text-shadow: 0 2px 4px rgba(0,0,0,0.8);">Johor Bahru</div>',
//       iconSize: [0, 0],
//     });
//     L.marker([1.47, 103.76], { icon: singaporeLabel }).addTo(map);
//   }, [map]);

//   return null;
// }

// export default function MapView() {
//   return (
//     <div className="relative w-full h-screen">
//       <MapContainer
//         center={singaporeCoords}
//         zoom={10}
//         className="w-full h-full"
//         zoomControl={false}
//       >
//         <TileLayer
//           url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
//           attribution='&copy; Esri'
//         />

//         <Polygon
//           positions={exposurePolygon}
//           pathOptions={{
//             fillColor: '#FFD700',
//             fillOpacity: 0.5,
//             color: '#FFA500',
//             weight: 2,
//             opacity: 0.8,
//           }}
//         >
//           <Popup>
//             <div className="text-center">
//               <strong>Exposure Zone</strong>
//               <br />
//               Singapore Region
//             </div>
//           </Popup>
//         </Polygon>

//         <CircleMarker
//           center={singaporeCoords}
//           radius={8}
//           pathOptions={{
//             fillColor: '#FFD700',
//             fillOpacity: 0.9,
//             color: '#FFA500',
//             weight: 2,
//           }}
//         >
//           <Popup>
//             <strong>Singapore</strong>
//           </Popup>
//         </CircleMarker>

//         {reservoirs.map((reservoir, idx) => (
//           <CircleMarker
//             key={idx}
//             center={reservoir.coords}
//             radius={6}
//             pathOptions={{
//               fillColor: '#FFD700',
//               fillOpacity: 0.8,
//               color: '#FFA500',
//               weight: 1,
//             }}
//           >
//             <Popup>{reservoir.name}</Popup>
//           </CircleMarker>
//         ))}

//         <MapControls />
//         <LocationLabels />
//       </MapContainer>
//     </div>
//   );
// }









// import { Search, ZoomIn, ZoomOut, Home, Layers, Navigation, Minus, Menu, Map as MapIcon, Locate } from 'lucide-react';

// export default function MapView() {
//   return (
//     <div className="relative w-full h-full bg-gray-900 overflow-hidden">
//       <div
//         className="w-full h-full bg-cover bg-center relative"
//         style={{
//           backgroundImage: "url('https://images.pexels.com/photos/87651/earth-blue-planet-globe-planet-87651.jpeg?auto=compress&cs=tinysrgb&w=1920')",
//         }}
//       >
//         <div className="absolute inset-0 bg-black/20" />

//         <button className="absolute top-4 left-4 w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
//           <Search className="w-5 h-5 text-gray-700" />
//         </button>

//         <div className="absolute top-4 left-16 flex flex-col gap-2 z-10">
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <ZoomIn className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <ZoomOut className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>

//         <div className="absolute top-20 left-4 flex flex-col gap-2 z-10">
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Home className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Locate className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>

//         <div className="absolute top-4 right-4 flex flex-col gap-2 z-10">
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <MapIcon className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-blue-600 rounded shadow-lg flex items-center justify-center hover:bg-blue-700 transition-colors">
//             <Layers className="w-5 h-5 text-white" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Menu className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>

//         <div className="absolute top-1/4 left-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Senai
//         </div>
//         <div className="absolute top-1/3 left-1/3 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Taman Johor Jaya
//         </div>
//         <div className="absolute top-1/3 right-1/3 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Pasir Gudang
//         </div>
//         <div className="absolute top-1/2 left-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Tebrau
//         </div>
//         <div className="absolute top-1/2 left-1/3 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Kampung<br/>Pasir Puteh
//         </div>
//         <div className="absolute top-1/2 right-1/3 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Kampung<br/>Tengah
//         </div>
//         <div className="absolute top-2/3 left-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Layang<br/>Layang
//         </div>
//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white font-bold text-sm drop-shadow-lg z-10">
//           Johor Bahru
//         </div>

//         <div className="absolute top-1/2 right-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Sungai Tiram
//         </div>
//         <div className="absolute top-3/4 right-1/3 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Pengerang
//         </div>
//         <div className="absolute bottom-1/4 right-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Bandar<br/>Penawar
//         </div>

//         <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/4">
//           <div className="relative">
//             <svg viewBox="0 0 800 600" className="w-full h-full" style={{ width: '600px', height: '450px' }}>
//               <defs>
//                 <filter id="glow">
//                   <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
//                   <feMerge>
//                     <feMergeNode in="coloredBlur"/>
//                     <feMergeNode in="SourceGraphic"/>
//                   </feMerge>
//                 </filter>
//                 <radialGradient id="yellowGlow" cx="50%" cy="50%" r="50%">
//                   <stop offset="0%" stopColor="#FFE135" stopOpacity="0.9" />
//                   <stop offset="30%" stopColor="#FFD700" stopOpacity="0.7" />
//                   <stop offset="60%" stopColor="#FFA500" stopOpacity="0.5" />
//                   <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2" />
//                 </radialGradient>
//               </defs>

//               <path d="M 250 200 Q 280 180 320 190 L 340 210 Q 360 230 380 250 L 400 280 Q 420 320 440 340 L 460 360 Q 480 380 500 390 L 520 400 Q 540 405 560 400 L 580 390 Q 590 380 595 360 L 600 340 Q 600 320 595 300 L 585 280 Q 570 260 550 250 L 530 240 Q 510 235 490 240 L 470 250 Q 450 265 430 285 L 410 310 Q 390 330 370 340 L 350 345 Q 330 348 310 345 L 290 340 Q 270 330 255 315 L 240 295 Q 230 270 235 245 Z"
//                     fill="url(#yellowGlow)"
//                     opacity="0.7"
//                     filter="url(#glow)"
//               />

//               <ellipse cx="420" cy="320" rx="180" ry="140" fill="url(#yellowGlow)" opacity="0.6" filter="url(#glow)" />

//               <ellipse cx="430" cy="310" rx="140" ry="110" fill="url(#yellowGlow)" opacity="0.7" filter="url(#glow)" />

//               <ellipse cx="425" cy="315" rx="100" ry="80" fill="url(#yellowGlow)" opacity="0.8" filter="url(#glow)" />

//               <circle cx="425" cy="315" r="20" fill="#FFD700" filter="url(#glow)" />

//               <text x="425" y="365" textAnchor="middle" fill="white" fontSize="16" fontWeight="bold" filter="url(#glow)">
//                 Singapore
//               </text>

//               <circle cx="415" cy="240" r="8" fill="#FFD700" opacity="0.8" />
//               <text x="415" y="225" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
//                 Kranji Reservoir
//               </text>

//               <circle cx="480" cy="270" r="8" fill="#FFD700" opacity="0.8" />
//               <text x="480" y="255" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold">
//                 Seletar Reservoir
//               </text>
//             </svg>

//             <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-12 bg-white/95 backdrop-blur-sm px-3 py-1 rounded shadow-lg text-xs font-semibold z-20">
//               Senai
//             </div>
//           </div>
//         </div>

//         <div className="absolute top-1/3 left-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Central<br/>Water<br/>Catchment
//         </div>

//         <div className="absolute bottom-1/3 left-1/2 transform -translate-x-1/2 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Western<br/>Water<br/>Catchment
//         </div>

//         <div className="absolute bottom-1/4 left-1/4 text-white text-xs font-semibold drop-shadow-lg z-10">
//           Tanjong<br/>Pagar
//         </div>

//         <div className="absolute bottom-20 right-4 bg-white/95 backdrop-blur-sm rounded shadow-lg p-3 z-10">
//           <div className="flex items-center gap-3">
//             <div className="font-bold text-gray-800 text-xs">Legend</div>
//             <div className="flex items-center gap-2">
//               <div className="w-8 h-4 bg-gradient-to-r from-yellow-300 via-yellow-400 to-orange-500 rounded"></div>
//               <span className="text-xs text-gray-700">Exposure</span>
//             </div>
//           </div>
//         </div>

//         <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
//           <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Minus className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Menu className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <MapIcon className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <Navigation className="w-5 h-5 text-gray-700" />
//           </button>
//           <button className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors">
//             <ZoomIn className="w-5 h-5 text-gray-700" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
