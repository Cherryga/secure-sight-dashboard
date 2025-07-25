 'use client';
import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa';

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
}

interface TimelineProps {
  cameras: Camera[];
  incidents: Incident[];
  currentTime: number; // seconds since midnight
  onScrub: (time: number) => void;
}

const HOURS = 24;
const ROW_HEIGHT = 56;
const HEADER_HEIGHT = 70;
const EVENT_HEIGHT = 24;
const SCRUBBER_COLOR = '#FFD600';
const COLORS: Record<string, string> = {
  'Unauthorized Access': '#F59E42',
  'Gun Threat': '#B91C1C',
  'Face Recognised': '#2563EB',
  'Traffic congestion': '#059669',
  'Multiple Events': '#6B7280',
};

const LEFT_LABEL_WIDTH = 120;

function formatTime(seconds: number) {
  const h = Math.floor(seconds / 3600).toString().padStart(2, '0');
  const m = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
  const s = Math.floor(seconds % 60).toString().padStart(2, '0');
  return `${h}:${m}:${s}`;
}

export default function Timeline({ cameras, incidents, currentTime, onScrub }: TimelineProps) {
  const [dragging, setDragging] = useState(false);
  const [width, setWidth] = useState(900); // Default width
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const timeToX = (time: number) => (time / (HOURS * 3600)) * width;

  const handlePointerDown = (e: React.PointerEvent) => {
    setDragging(true);
    moveScrubber(e);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (dragging) moveScrubber(e);
  };

  const handlePointerUp = () => setDragging(false);

  const moveScrubber = (e: React.PointerEvent) => {
    const rect = svgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    let time = Math.round((x / width) * HOURS * 3600);
    time = Math.max(0, Math.min(time, HOURS * 3600));
    onScrub(time);
  };

  // Resize observer to detect container width
  useEffect(() => {
    const resize = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.offsetWidth);
      }
    };
    resize();
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  const incidentsByCamera: Record<string, Incident[]> = {};
  cameras.forEach((cam) => {
    incidentsByCamera[cam.id] = [];
  });
  incidents.forEach((inc) => {
    if (incidentsByCamera[inc.cameraId]) {
      incidentsByCamera[inc.cameraId].push(inc);
    }
  });

  return (
    <div ref={containerRef} className="w-full min-w-0 px-0 py-1 bg-black">
      {/* Header Controls */}
      <div className="flex items-center mb-2 space-x-4">
        <button className="text-gray-300 hover:text-white"><FaStepBackward /></button>
        <button className="text-gray-300 hover:text-white"><FaPlay /></button>
        <button className="text-gray-300 hover:text-white"><FaStepForward /></button>
        <span className="ml-4 text-white font-mono text-sm bg-[#23262F] px-2 py-1 rounded">
          {formatTime(currentTime)} (15-Jun-2025)
        </span>
      </div>

      <div className="text-white font-bold text-lg mb-1">Camera List</div>

      <svg
        ref={svgRef}
        width="100%"
        height={HEADER_HEIGHT + cameras.length * ROW_HEIGHT}
        viewBox={`0 0 ${width} ${HEADER_HEIGHT + cameras.length * ROW_HEIGHT}`}
        className="block"
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {/* Hour ticks and labels */}
        {[...Array(HOURS + 1)].map((_, h) => (
          <g key={h}>
            <line
              x1={timeToX(h * 3600)}
              y1={HEADER_HEIGHT - 8}
              x2={timeToX(h * 3600)}
              y2={HEADER_HEIGHT + cameras.length * ROW_HEIGHT}
              stroke="#3B4A6B"
              strokeWidth={h % 6 === 0 ? 2 : 1}
            />
            {h % 2 === 0 && (
              <text
                x={timeToX(h * 3600)}
                y={HEADER_HEIGHT - 12}
                fill="#B0C4E7"
                fontSize={11}
                textAnchor="middle"
              >
                {h.toString().padStart(2, '0')}:00
              </text>
            )}
          </g>
        ))}

        {/* Camera rows and incidents */}
        {cameras.map((cam, idx) => (
          <g key={cam.id}>
            <rect
              x={0}
              y={HEADER_HEIGHT + idx * ROW_HEIGHT}
              width={width}
              height={ROW_HEIGHT}
              fill={idx % 2 === 0 ? "#181A20" : "#111"}
            />
            <text
              x={16}
              y={HEADER_HEIGHT + idx * ROW_HEIGHT + ROW_HEIGHT / 2 + 7}
              fill="#fff"
              fontSize={20}
              fontWeight={700}
              alignmentBaseline="middle"
            >
              {cam.name}
            </text>
            {incidentsByCamera[cam.id].map((inc) => {
              const start = new Date(inc.tsStart);
              const end = new Date(inc.tsEnd);
              const startSec = start.getHours() * 3600 + start.getMinutes() * 60 + start.getSeconds();
              const endSec = end.getHours() * 3600 + end.getMinutes() * 60 + end.getSeconds();
              const x = Math.max(timeToX(startSec), LEFT_LABEL_WIDTH + 8);
              const w = Math.max(8, timeToX(endSec) - x);
              return (
                <g key={inc.id}>
                  <rect
                    x={x}
                    y={HEADER_HEIGHT + idx * ROW_HEIGHT + (ROW_HEIGHT - EVENT_HEIGHT) / 2}
                    width={w}
                    height={EVENT_HEIGHT}
                    rx={6}
                    fill={COLORS[inc.type] || "#6B7280"}
                  />
                  <foreignObject
  x={x + 2}
  y={HEADER_HEIGHT + idx * ROW_HEIGHT + (ROW_HEIGHT - EVENT_HEIGHT) / 2}
  width={Math.max(100, inc.type.length * 8)} // optional: ensures space
  height={EVENT_HEIGHT}
>
  <div
    style={{
      backgroundColor: COLORS[inc.type] || "#6B7280",
      color: "#fff",
      height: `${EVENT_HEIGHT}px`,
      display: "inline-flex",
      alignItems: "center",
      padding: "0 10px",
      borderRadius: "6px",
      fontSize: "13px",
      fontWeight: 600,
      whiteSpace: "nowrap",
    }}
  >
    {inc.type}
  </div>
</foreignObject>

                </g>
              );
            })}
          </g>
        ))}

        {/* Scrubber */}
        <line
          x1={timeToX(currentTime)}
          y1={HEADER_HEIGHT - 8}
          x2={timeToX(currentTime)}
          y2={HEADER_HEIGHT + cameras.length * ROW_HEIGHT}
          stroke={SCRUBBER_COLOR}
          strokeWidth={3}
        />
        <rect
          x={timeToX(currentTime) - 32}
          y={HEADER_HEIGHT - 36}
          width={64}
          height={22}
          rx={6}
          fill={SCRUBBER_COLOR}
          stroke="#fff"
          strokeWidth={1}
        />
        <text
          x={timeToX(currentTime)}
          y={HEADER_HEIGHT - 21}
          fill="#222"
          fontSize={13}
          fontWeight={700}
          textAnchor="middle"
        >
          {formatTime(currentTime)}
        </text>
      </svg>
    </div>
  );
}
