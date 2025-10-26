import { useState } from 'react';
import Header from './components/Header';
import LocationSelector from './components/LocationSelector';
import RiskTypeSelector from './components/RiskTypeSelector';
import KnowledgeRepository from './components/KnowledgeRepository';
import MapView from './components/MapView';
import DemographyPanel from './components/DemographyPanel';

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    country: '',
    region: '',
    state: ''
  });
  const [selectedRiskType, setSelectedRiskType] = useState('');

  const handleLocationChange = (country: string, region: string, state: string) => {
    setSelectedLocation({ country, region, state });
  };

  const handleRiskTypeChange = (riskTypeId: string) => {
    setSelectedRiskType(riskTypeId);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      <Header />

      <div className="flex-1 flex overflow-hidden">
        <aside className="w-64 bg-white border-r border-gray-200 p-4 overflow-y-auto">
          <LocationSelector onLocationChange={handleLocationChange} />
          <RiskTypeSelector onRiskTypeChange={handleRiskTypeChange} />
          <KnowledgeRepository />
        </aside>

        <main className="flex-1 p-4">
          <MapView />
        </main>

        <aside className="w-96 bg-white border-l border-gray-200 overflow-y-auto">
          <DemographyPanel />
        </aside>
      </div>

      {/* <footer className="bg-gradient-to-r from-blue-900 to-blue-800 text-white text-center py-2 text-xs">
        Copyright © 2025 Asia Risk Platform. All rights reserved
      </footer> */}
    </div>
  );
}

export default App;
