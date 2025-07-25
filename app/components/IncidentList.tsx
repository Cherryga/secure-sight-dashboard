"use client";
import React from "react";
import { FaDoorOpen, FaUserSecret } from "react-icons/fa";
import { GiPistolGun } from "react-icons/gi";

interface Incident {
  id: string;
  cameraId: string;
  type: string;
  tsStart: string;
  tsEnd: string;
  thumbnailUrl: string;
  resolved: boolean;
  camera: { location: string };
  fading?: boolean; // Added for optimistic UI
}

interface Props {
  incidents: Incident[];
  onResolve: (id: string) => void;
}

const typeIconMap: Record<string, { icon: React.ReactNode; color: string }> = {
  "Unauthorized Access": { icon: <FaDoorOpen />, color: "text-orange-400" },
  "Gun Threat": { icon: <GiPistolGun />, color: "text-red-500" },
  "Face Recognised": { icon: <FaUserSecret />, color: "text-blue-400" },
};

export default function IncidentList({ incidents, onResolve }: Props) {
  const unresolved = incidents.filter((i) => !i.resolved);
  const resolved = incidents.filter((i) => i.resolved);

  return (
    <div className="w-full min-w-[400px] max-w-none bg-black border-l border-gray-900 h-screen p-6 overflow-y-auto overflow-x-hidden">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-white flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-red-500 mr-2"></span>
          {unresolved.length} Unresolved Incidents
        </h2>
        {resolved.length > 0 && (
          <span className="text-xs text-gray-400">{resolved.length} resolved incidents</span>
        )}
      </div>
      <ul className="space-y-5">
        {unresolved.map((incident: Incident) => {
          const typeMeta = typeIconMap[incident.type] || { icon: <FaDoorOpen />, color: "text-gray-400" };
          return (
            <li
              key={incident.id}
              className={`
                bg-[#181A20] p-4 rounded-lg shadow-md hover:bg-[#23262F] transition cursor-pointer flex items-start space-x-4
                ${incident.fading ? "opacity-50 transition-opacity duration-500" : ""}
              `}
            >
              <img
                src={incident.thumbnailUrl}
                alt={incident.type}
                className="w-16 h-16 rounded-md object-cover border-2 border-gray-900"
              />
              <div className="flex-1">
                <div className="flex items-center mb-1">
                  <span className={`mr-2 text-base ${typeMeta.color}`}>{typeMeta.icon}</span>
                  <span className="text-base font-semibold text-white">{incident.type}</span>
                </div>
                <div className="text-xs text-gray-300 mb-1">{incident.camera.location}</div>
                <div className="text-xs text-gray-400 mb-2">
                  {new Date(incident.tsStart).toLocaleString()} - {new Date(incident.tsEnd).toLocaleString()}
                </div>
              </div>
              <button
                onClick={() => onResolve(incident.id)}
                className="ml-4 text-sm text-yellow-400 hover:text-yellow-300 font-semibold transition whitespace-nowrap"
              >
                Resolve &rarr;
              </button>
            </li>
          );
        })}
        {resolved.length > 0 && (
          <li className="mt-4 pt-2 border-t border-gray-900">
            <span className="text-xs text-gray-400">Resolved incidents</span>
            <ul className="space-y-2 mt-2">
              {resolved.map((incident: Incident) => {
                const typeMeta = typeIconMap[incident.type] || { icon: <FaDoorOpen />, color: "text-gray-400" };
                return (
                  <li key={incident.id} className="bg-[#181A20] p-4 rounded-lg opacity-50 flex items-start space-x-4">
                    <img
                      src={incident.thumbnailUrl}
                      alt={incident.type}
                      className="w-16 h-16 rounded-md object-cover border-2 border-gray-900"
                    />
                    <div className="flex-1">
                      <div className="flex items-center mb-1">
                        <span className={`mr-2 text-base ${typeMeta.color}`}>{typeMeta.icon}</span>
                        <span className="text-base font-semibold text-white">{incident.type}</span>
                      </div>
                      <div className="text-xs text-gray-300 mb-1">{incident.camera.location}</div>
                      <div className="text-xs text-gray-400 mb-2">
                        {new Date(incident.tsStart).toLocaleString()} - {new Date(incident.tsEnd).toLocaleString()}
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </li>
        )}
      </ul>
    </div>
  );
}
