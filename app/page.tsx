// app/page.tsx
"use client";

import Navbar from './components/Navbar';
import IncidentPlayer from './components/IncidentPlayer';
import IncidentList from './components/IncidentList';
import Timeline from './components/Timeline';
import React, { useEffect, useState } from 'react';

interface Camera {
  id: string;
  name: string;
}

interface Incident {
  id: string;
  cameraId: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: { location: string };
}

export default function Home() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [cameras, setCameras] = useState<Camera[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentTime, setCurrentTime] = useState(0); // seconds since midnight

  useEffect(() => {
    // Fetch incidents
    fetch('/api/incidents?resolved=false')
      .then(res => res.json())
      .then(data => {
        setIncidents(data);
        setLoading(false);
      });
    // Fetch cameras (mocked here, replace with API if available)
    setCameras([
      { id: '1', name: 'Camera - 01' },
      { id: '2', name: 'Camera - 02' },
      { id: '3', name: 'Camera - 03' },
    ]);
  }, []);

  // Optimistic UI for resolving incidents
  const handleResolve = async (id: string) => {
    setIncidents(prev => prev.map(inc => inc.id === id ? { ...inc, resolved: true } : inc));
    await fetch(`/api/incidents/${id}/resolve`, { method: 'PATCH' });
    // Optionally, re-fetch incidents here for full sync
  };

  // Prepare timeline incidents (all incidents for now)
  const timelineIncidents = incidents.map(inc => ({
    id: inc.id,
    cameraId: inc.cameraId,
    type: inc.type,
    tsStart: inc.tsStart,
    tsEnd: inc.tsEnd,
  }));

 return (
     <div className="flex flex-col h-screen bg-black text-white">
      <Navbar />
      <div className="flex flex-1 min-h-0">
        {/* Incident Player (left) */}
        <div className="w-[60%] min-w-[320px] max-w-[900px] border-r border-gray-700 flex flex-col items-center overflow-y-auto scrollbar-hide">
          <IncidentPlayer />
        </div>
        {/* Incident List (right) */}
        <div className="w-[40%] min-w-[400px] max-w-[800px] overflow-y-auto scrollbar-hide">
          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading incidents...</div>
          ) : (
            <IncidentList incidents={incidents} onResolve={handleResolve} />
          )}
        </div>
      </div>
      <div className="w-full">
        <Timeline
          cameras={cameras}
          incidents={timelineIncidents}
          currentTime={currentTime}
          onScrub={setCurrentTime}
        />
      </div>
    </div>
  );
}
