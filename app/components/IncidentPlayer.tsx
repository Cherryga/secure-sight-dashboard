import React from 'react';

export default function IncidentPlayer() {
  return (
    <div className="flex flex-col items-center w-full bg-black p-6 rounded-xl">
      <div className="relative w-full h-96 bg-black rounded-xl overflow-hidden shadow-lg mb-4">
        <video
          src="/static/incident-clip.mp4"
          className="object-cover w-full h-full opacity-80"
          autoPlay
          muted
          loop
          playsInline
        />

        {/* Timestamp overlay */}
        <div className="absolute top-3 left-3 bg-black bg-opacity-90 text-xs text-white px-3 py-1 rounded shadow">
          11/7/2025 - 03:12:37
        </div>

        {/* Camera label */}
        <div className="absolute bottom-3 left-3 flex items-center space-x-2 bg-black bg-opacity-90 px-3 py-1 rounded-full shadow">
          <span className="w-2 h-2 bg-red-500 rounded-full"></span>
          <span className="text-xs text-white font-semibold">Camera - 01</span>
        </div>
      </div>
    </div>
  );
}
