import React, { useEffect, useRef, useState } from "react"
import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from "react-leaflet"
import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, MapIcon, Locate } from "lucide-react"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import L from "leaflet"
import "leaflet/dist/leaflet.css"

// Constants
const SINGAPORE_COORDS = [1.3521, 103.8198]

const EXPOSURE_POLYGON = [
  [1.45, 103.65],
  [1.48, 103.72],
  [1.5, 103.8],
  [1.52, 103.88],
  [1.5, 103.95],
  [1.45, 104.0],
  [1.38, 104.02],
  [1.3, 104.0],
  [1.25, 103.95],
  [1.22, 103.88],
  [1.2, 103.8],
  [1.22, 103.72],
  [1.25, 103.68],
  [1.3, 103.65],
  [1.38, 103.64],
]

const LOCATIONS = [
  { name: "Senai", coords: [1.58, 103.6] },
  { name: "Taman Johor Jaya", coords: [1.53, 103.78] },
  { name: "Pasir Gudang", coords: [1.48, 103.9] },
  { name: "Tebrau", coords: [1.52, 103.74] },
  { name: "Kampung\nPasir Puteh", coords: [1.5, 103.82] },
  { name: "Kampung\nTengah", coords: [1.48, 103.92] },
  { name: "Layang\nLayang", coords: [1.35, 103.68] },
  { name: "Sungai Tiram", coords: [1.48, 104.05] },
  { name: "Pengerang", coords: [1.38, 104.1] },
  { name: "Bandar\nPenawar", coords: [1.28, 104.15] },
  { name: "Central\nWater\nCatchment", coords: [1.42, 103.72] },
  { name: "Western\nWater\nCatchment", coords: [1.38, 103.7] },
  { name: "Tanjong\nPagar", coords: [1.28, 103.72] },
]

const RESERVOIRS = [
  { name: "Kranji Reservoir", coords: [1.43, 103.72] },
  { name: "Seletar Reservoir", coords: [1.4, 103.82] },
]

// Map Controls Component
const MapControls = () => {
  const map = useMap()

  const handleZoomIn = () => map.zoomIn()
  const handleZoomOut = () => map.zoomOut()
  const handleHome = () => map.setView(SINGAPORE_COORDS, 10)

  const handleLeftArrow = () => {
    const currentCenter = map.getCenter()
    map.setView([currentCenter.lat, currentCenter.lng - 0.05], map.getZoom())
  }

  const handleRightArrow = () => {
    const currentCenter = map.getCenter()
    map.setView([currentCenter.lat, currentCenter.lng + 0.05], map.getZoom())
  }

  return (
    <>
      {/* Search Button */}
      <div className="absolute top-3 left-3 z-[1000]">
        <button 
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Search"
        >
          <Search className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Zoom Controls */}
      <div className="absolute top-3 left-12 flex flex-col gap-1 z-[1000]">
        <button
          onClick={handleZoomIn}
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Zoom in"
        >
          <ZoomIn className="w-4 h-4 text-gray-700" />
        </button>
        <button
          onClick={handleZoomOut}
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Zoom out"
        >
          <ZoomOut className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Home and Locate */}
      <div className="absolute top-16 left-3 flex flex-col gap-1 z-[1000]">
        <button
          onClick={handleHome}
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Reset to home"
        >
          <Home className="w-4 h-4 text-gray-700" />
        </button>
        <button 
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Locate me"
        >
          <Locate className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Right Side Controls */}
      <div className="absolute top-3 right-3 flex flex-col gap-1 z-[1000]">
        <button 
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Map settings"
        >
          <MapIcon className="w-4 h-4 text-gray-700" />
        </button>
        <button 
          className="w-8 h-8 bg-blue-600 rounded shadow flex items-center justify-center hover:bg-blue-700 transition-colors"
          aria-label="Layers"
        >
          <Layers className="w-4 h-4 text-white" />
        </button>
        <button 
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 transition-colors"
          aria-label="Menu"
        >
          <Menu className="w-4 h-4 text-gray-700" />
        </button>
      </div>

      {/* Left and Right Arrows */}
      <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-[1000]">
        <button
          onClick={handleLeftArrow}
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80 transition-colors"
          aria-label="Pan left"
        >
          <FaChevronLeft className="w-3 h-3 text-gray-700" />
        </button>
      </div>

      <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-[1000]">
        <button
          onClick={handleRightArrow}
          className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80 transition-colors"
          aria-label="Pan right"
        >
          <FaChevronRight className="w-3 h-3 text-gray-700" />
        </button>
      </div>
    </>
  )
}

// Location Labels Component
const LocationLabels = () => {
  const map = useMap()

  useEffect(() => {
    // Add location labels
    LOCATIONS.forEach((location) => {
      const label = L.divIcon({
        className: "location-label",
        html: `<div style="color:white;font-size:11px;font-weight:600;text-shadow:0 2px 4px rgba(0,0,0,0.8);white-space:pre-line;text-align:center;">${location.name}</div>`,
        iconSize: [0, 0],
      })
      L.marker(location.coords, { icon: label }).addTo(map)
    })

    // Add Singapore label
    const singaporeLabel = L.divIcon({
      className: "singapore-label",
      html: '<div style="color:white;font-size:14px;font-weight:bold;text-shadow:0 2px 4px rgba(0,0,0,0.8);">Johor Bahru</div>',
      iconSize: [0, 0],
    })
    L.marker([1.47, 103.76], { icon: singaporeLabel }).addTo(map)
  }, [map])

  return null
}

// Resize Handle Component
interface ResizeHandleProps {
  position: string;
  onResizeStart: (e: React.MouseEvent, direction: string) => void;
  title: string;
  className: string;
  children: React.ReactNode;
}

const ResizeHandle = ({ position, onResizeStart, title, className, children }: ResizeHandleProps) => (
  <div onMouseDown={(e) => onResizeStart(e, position)} className={className} title={title}>
    {children}
  </div>
)

// Main Map View Component
const MapView = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [dimensions, setDimensions] = useState({ 
    width: "100%", 
    height: "100vh" 
  })
  const [isResizing, setIsResizing] = useState<string | null>(null)
  const [startPos, setStartPos] = useState({ x: 0, y: 0 })
  const [startDims, setStartDims] = useState({ width: 0, height: 0 })

  const handleResizeStart = (e: React.MouseEvent, direction: string) => {
    e.preventDefault()
    setIsResizing(direction)
    setStartPos({ x: e.clientX, y: e.clientY })
    if (containerRef.current) {
      setStartDims({
        width: containerRef.current.offsetWidth,
        height: containerRef.current.offsetHeight,
      })
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isResizing || !containerRef.current) return

      const deltaX = e.clientX - startPos.x
      const deltaY = e.clientY - startPos.y

      let newWidth = startDims.width
      let newHeight = startDims.height

      switch (isResizing) {
        case "right":
          newWidth = startDims.width + deltaX
          break
        case "left":
          newWidth = startDims.width - deltaX
          break
        case "bottom":
          newHeight = startDims.height + deltaY
          break
        case "top":
          newHeight = startDims.height - deltaY
          break
        case "bottom-right":
          newWidth = startDims.width + deltaX
          newHeight = startDims.height + deltaY
          break
        case "bottom-left":
          newWidth = startDims.width - deltaX
          newHeight = startDims.height + deltaY
          break
        case "top-right":
          newWidth = startDims.width + deltaX
          newHeight = startDims.height - deltaY
          break
        case "top-left":
          newWidth = startDims.width - deltaX
          newHeight = startDims.height - deltaY
          break
      }

      setDimensions({
        width: `${Math.max(300, newWidth)}px`,
        height: `${Math.max(300, newHeight)}px`,
      })
    }

    const handleMouseUp = () => {
      setIsResizing(null)
    }

    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove)
      document.addEventListener("mouseup", handleMouseUp)
    }

    return () => {
      document.removeEventListener("mousemove", handleMouseMove)
      document.removeEventListener("mouseup", handleMouseUp)
    }
  }, [isResizing, startPos, startDims])

  return (
    <div
      ref={containerRef}
      className="relative m-0 p-0 overflow-hidden bg-gray-100"
      style={{
        width: dimensions.width,
        height: dimensions.height,
      }}
    >
      <MapContainer 
        center={SINGAPORE_COORDS} 
        zoom={10} 
        className="w-full h-full m-0 p-0" 
        zoomControl={false}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
        />

        {/* Exposure Zone Polygon */}
        <Polygon
          positions={EXPOSURE_POLYGON}
          pathOptions={{ 
            fillOpacity: 0, 
            color: "#404040", 
            weight: 2, 
            opacity: 0.8 
          }}
        >
          <Popup>
            <div className="text-center">
              <strong>Exposure Zone</strong>
              <br />
              Singapore Region
            </div>
          </Popup>
        </Polygon>

        {/* Singapore Marker */}
        <CircleMarker 
          center={SINGAPORE_COORDS} 
          radius={8} 
          pathOptions={{ 
            fillOpacity: 0, 
            color: "#404040", 
            weight: 2 
          }}
        >
          <Popup>
            <strong>Singapore</strong>
          </Popup>
        </CircleMarker>

        {/* Reservoir Markers */}
        {RESERVOIRS.map((reservoir, index) => (
          <CircleMarker
            key={`reservoir-${index}`}
            center={reservoir.coords}
            radius={6}
            pathOptions={{ 
              fillOpacity: 0, 
              color: "#404040", 
              weight: 1 
            }}
          >
            <Popup>{reservoir.name}</Popup>
          </CircleMarker>
        ))}

        <MapControls />
        <LocationLabels />
      </MapContainer>

      {/* Resize Handles */}
      {/* Top resize handle */}
      <ResizeHandle
        position="top"
        onResizeStart={handleResizeStart}
        title="Drag to resize height"
        className="absolute top-0 left-1/2 transform -translate-x-1/2 w-12 h-1 cursor-ns-resize hover:bg-blue-400 hover:opacity-50 z-50 group"
      >
        <div className="flex items-center justify-center h-full text-xs text-gray-600 group-hover:text-blue-600">↕</div>
      </ResizeHandle>

      {/* Bottom resize handle */}
      <ResizeHandle
        position="bottom"
        onResizeStart={handleResizeStart}
        title="Drag to resize height"
        className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-12 h-1 cursor-ns-resize hover:bg-blue-400 hover:opacity-50 z-50 group"
      >
        <div className="flex items-center justify-center h-full text-xs text-gray-600 group-hover:text-blue-600">↕</div>
      </ResizeHandle>

      {/* Left resize handle */}
      <ResizeHandle
        position="left"
        onResizeStart={handleResizeStart}
        title="Drag to resize width"
        className="absolute left-0 top-1/2 transform -translate-y-1/2 w-1 h-12 cursor-ew-resize hover:bg-blue-400 hover:opacity-50 z-50 group"
      >
        <div className="flex items-center justify-center w-full h-full text-xs text-gray-600 group-hover:text-blue-600">↔</div>
      </ResizeHandle>

      {/* Right resize handle */}
      <ResizeHandle
        position="right"
        onResizeStart={handleResizeStart}
        title="Drag to resize width"
        className="absolute right-0 top-1/2 transform -translate-y-1/2 w-1 h-12 cursor-ew-resize hover:bg-blue-400 hover:opacity-50 z-50 group"
      >
        <div className="flex items-center justify-center w-full h-full text-xs text-gray-600 group-hover:text-blue-600">↔</div>
      </ResizeHandle>

      {/* Corner resize handles */}
      <ResizeHandle
        position="top-left"
        onResizeStart={handleResizeStart}
        title="Drag to resize"
        className="absolute top-0 left-0 w-2 h-2 cursor-nwse-resize hover:bg-blue-400 z-50"
      />
      <ResizeHandle
        position="top-right"
        onResizeStart={handleResizeStart}
        title="Drag to resize"
        className="absolute top-0 right-0 w-2 h-2 cursor-nesw-resize hover:bg-blue-400 z-50"
      />
      <ResizeHandle
        position="bottom-left"
        onResizeStart={handleResizeStart}
        title="Drag to resize"
        className="absolute bottom-0 left-0 w-2 h-2 cursor-nesw-resize hover:bg-blue-400 z-50"
      />
      <ResizeHandle
        position="bottom-right"
        onResizeStart={handleResizeStart}
        title="Drag to resize"
        className="absolute bottom-0 right-0 w-2 h-2 cursor-nwse-resize hover:bg-blue-400 z-50"
      />
    </div>
  )
}

export default MapView









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
//       {/* Search Button */}
//       <div className="absolute top-3 left-3 z-[1000]">
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Search className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Zoom Controls */}
//       <div className="absolute top-3 left-12 flex flex-col gap-1 z-[1000]">
//         <button onClick={handleZoomIn} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomIn className="w-4 h-4 text-gray-700" />
//         </button>
//         <button onClick={handleZoomOut} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomOut className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Home and Locate */}
//       <div className="absolute top-16 left-3 flex flex-col gap-1 z-[1000]">
//         <button onClick={handleHome} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Home className="w-4 h-4 text-gray-700" />
//         </button>
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Locate className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Right Side Controls */}
//       <div className="absolute top-3 right-3 flex flex-col gap-1 z-[1000]">
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <MapIcon className="w-4 h-4 text-gray-700" />
//         </button>
//         <button className="w-8 h-8 bg-blue-600 rounded shadow flex items-center justify-center hover:bg-blue-700">
//           <Layers className="w-4 h-4 text-white" />
//         </button>
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Menu className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Left and Right Arrows - Positioned more towards back */}
//       <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleLeftArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
//           <FaChevronLeft className="w-3 h-3 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleRightArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
//           <FaChevronRight className="w-3 h-3 text-gray-700" />
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

















// import { useEffect, useState } from 'react';
// import { MapContainer, TileLayer, Polygon, CircleMarker, Popup, useMap } from 'react-leaflet';
// import { Search, ZoomIn, ZoomOut, Home, Layers, Menu, Map as MapIcon, Locate, X } from 'lucide-react';
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

// // Draggable Side Panel Component
// function DraggablePanel({ 
//   side, 
//   children, 
//   isOpen, 
//   onToggle 
// }: { 
//   side: 'left' | 'right';
//   children: React.ReactNode;
//   isOpen: boolean;
//   onToggle: () => void;
// }) {
//   const [width, setWidth] = useState(300);
//   const [isDragging, setIsDragging] = useState(false);

//   const handleMouseDown = (e: React.MouseEvent) => {
//     e.preventDefault();
//     setIsDragging(true);
//   };

//   const handleMouseMove = (e: MouseEvent) => {
//     if (!isDragging) return;
    
//     const newWidth = side === 'left' 
//       ? e.clientX 
//       : window.innerWidth - e.clientX;
    
//     if (newWidth >= 200 && newWidth <= 500) {
//       setWidth(newWidth);
//     }
//   };

//   const handleMouseUp = () => {
//     setIsDragging(false);
//   };

//   useEffect(() => {
//     if (isDragging) {
//       document.addEventListener('mousemove', handleMouseMove);
//       document.addEventListener('mouseup', handleMouseUp);
//       return () => {
//         document.removeEventListener('mousemove', handleMouseMove);
//         document.removeEventListener('mouseup', handleMouseUp);
//       };
//     }
//   }, [isDragging]);

//   const panelStyle = {
//     width: isOpen ? `${width}px` : '0px',
//     [side]: 0,
//   };

//   return (
//     <>
//       {/* Toggle Button */}
//       <button
//         onClick={onToggle}
//         className={`absolute ${side}--3 top-1/2 transform -translate-y-1/2 z-[1001] w-6 h-16 bg-blue-600 hover:bg-blue-700 rounded shadow flex items-center justify-center transition-all duration-200 ${
//           isOpen ? `${side}--${width + 12}px` : ''
//         }`}
//         style={isOpen ? { [side]: `${width + 12}px` } : {}}
//       >
//         {side === 'left' ? (
//           <FaChevronRight className={`w-3 h-3 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//         ) : (
//           <FaChevronLeft className={`w-3 h-3 text-white transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
//         )}
//       </button>

//       {/* Panel */}
//       <div
//         className={`absolute ${side}-0 top-0 h-full bg-white shadow-lg z-[1000] transition-all duration-300 overflow-hidden border-${side}-2 border-gray-200`}
//         style={panelStyle}
//       >
//         {/* Drag Handle */}
//         {isOpen && (
//           <div
//             className={`absolute top-0 h-full w-2 cursor-col-resize hover:bg-blue-200 active:bg-blue-300 transition-colors ${
//               side === 'left' ? 'right-0' : 'left-0'
//             }`}
//             onMouseDown={handleMouseDown}
//           />
//         )}
        
//         {/* Panel Content */}
//         {isOpen && (
//           <div className="h-full flex flex-col">
//             {/* Header */}
//             <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gray-50">
//               <h2 className="text-lg font-semibold text-gray-800">
//                 {side === 'left' ? 'Locations Panel' : 'Information Panel'}
//               </h2>
//               <button
//                 onClick={onToggle}
//                 className="w-6 h-6 rounded-full hover:bg-gray-200 flex items-center justify-center transition-colors"
//               >
//                 <X className="w-4 h-4 text-gray-600" />
//               </button>
//             </div>
            
//             {/* Content */}
//             <div className="flex-1 overflow-y-auto p-4">
//               {children}
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

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
//       {/* Search Button */}
//       <div className="absolute top-3 left-3 z-[1000]">
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Search className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Zoom Controls */}
//       <div className="absolute top-3 left-12 flex flex-col gap-1 z-[1000]">
//         <button onClick={handleZoomIn} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomIn className="w-4 h-4 text-gray-700" />
//         </button>
//         <button onClick={handleZoomOut} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <ZoomOut className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Home and Locate */}
//       <div className="absolute top-16 left-3 flex flex-col gap-1 z-[1000]">
//         <button onClick={handleHome} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Home className="w-4 h-4 text-gray-700" />
//         </button>
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Locate className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Right Side Controls */}
//       <div className="absolute top-3 right-3 flex flex-col gap-1 z-[1000]">
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <MapIcon className="w-4 h-4 text-gray-700" />
//         </button>
//         <button className="w-8 h-8 bg-blue-600 rounded shadow flex items-center justify-center hover:bg-blue-700">
//           <Layers className="w-4 h-4 text-white" />
//         </button>
//         <button className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50">
//           <Menu className="w-4 h-4 text-gray-700" />
//         </button>
//       </div>

//       {/* Left and Right Arrows - Positioned more towards back */}
//       <div className="absolute top-1/2 left-1 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleLeftArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
//           <FaChevronLeft className="w-3 h-3 text-gray-700" />
//         </button>
//       </div>

//       <div className="absolute top-1/2 right-1 transform -translate-y-1/2 z-[1000]">
//         <button onClick={handleRightArrow} className="w-8 h-8 bg-white rounded shadow flex items-center justify-center hover:bg-gray-50 opacity-80">
//           <FaChevronRight className="w-3 h-3 text-gray-700" />
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
//   const [leftPanelOpen, setLeftPanelOpen] = useState(false);
//   const [rightPanelOpen, setRightPanelOpen] = useState(false);

//   return (
//     <div className="relative w-full h-screen m-0 p-0 overflow-hidden">
//       {/* Left Panel - Locations */}
//       <DraggablePanel 
//         side="left" 
//         isOpen={leftPanelOpen}
//         onToggle={() => setLeftPanelOpen(!leftPanelOpen)}
//       >
//         <div className="space-y-3">
//           <h3 className="font-semibold text-gray-700 mb-3">Locations List</h3>
//           {locations.map((location, index) => (
//             <div key={index} className="p-3 bg-gray-50 rounded-lg border border-gray-200 hover:bg-blue-50 transition-colors cursor-pointer">
//               <div className="font-medium text-gray-800 whitespace-pre-line">{location.name}</div>
//               <div className="text-sm text-gray-600 mt-1">
//                 Lat: {location.coords[0].toFixed(4)}, Lng: {location.coords[1].toFixed(4)}
//               </div>
//             </div>
//           ))}
//         </div>
//       </DraggablePanel>

//       {/* Right Panel - Information */}
//       <DraggablePanel 
//         side="right" 
//         isOpen={rightPanelOpen}
//         onToggle={() => setRightPanelOpen(!rightPanelOpen)}
//       >
//         <div className="space-y-4">
//           <h3 className="font-semibold text-gray-700 mb-3">Map Information</h3>
          
//           <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
//             <h4 className="font-semibold text-blue-800 mb-2">Exposure Zone</h4>
//             <p className="text-sm text-blue-700">
//               This area shows the regional exposure analysis for Singapore and surrounding regions.
//             </p>
//           </div>

//           <div className="p-3 bg-green-50 rounded-lg border border-green-200">
//             <h4 className="font-semibold text-green-800 mb-2">Water Reservoirs</h4>
//             <ul className="text-sm text-green-700 space-y-1">
//               {reservoirs.map((reservoir, index) => (
//                 <li key={index}>• {reservoir.name}</li>
//               ))}
//             </ul>
//           </div>

//           <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
//             <h4 className="font-semibold text-yellow-800 mb-2">Map Controls</h4>
//             <ul className="text-sm text-yellow-700 space-y-1">
//               <li>• Use arrow buttons to pan the map</li>
//               <li>• Zoom controls adjust map scale</li>
//               <li>• Home button resets view</li>
//               <li>• Drag panels to resize</li>
//             </ul>
//           </div>

//           <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
//             <h4 className="font-semibold text-gray-800 mb-2">Statistics</h4>
//             <div className="text-sm text-gray-700 space-y-1">
//               <div>Total Locations: {locations.length}</div>
//               <div>Reservoirs: {reservoirs.length}</div>
//               <div>Region: Johor Bahru Area</div>
//             </div>
//           </div>
//         </div>
//       </DraggablePanel>

//       {/* Map Container */}
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
