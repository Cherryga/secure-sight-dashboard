"use client";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Html,
  Line,
  Center,
} from "@react-three/drei";
import { Suspense, useRef } from "react";

// Annotation box component
function Annotation({
  position,
  children,
}: {
  position: [number, number, number];
  children: React.ReactNode;
}) {
  return (
    <group>
      <Line points={[[0, 0, 0], position]} color="#FFD600" lineWidth={2} />
      <Html position={position} center>
        <div className="bg-zinc-800/80 border border-yellow-400 rounded-lg px-3 py-2 text-xs text-white shadow-lg max-w-[200px] leading-snug backdrop-blur-md">
          {children}
        </div>
      </Html>
    </group>
  );
}

// Device box that floats and rotates
function RotatingBox() {
  const mesh = useRef<any>(null);
  useFrame((state) => {
    mesh.current.rotation.y += 0.005;
    mesh.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
  });
  return (
    <mesh ref={mesh} castShadow receiveShadow>
      <boxGeometry args={[1.5, 0.8, 1]} />
      <meshStandardMaterial color="#balck" metalness={0.5} roughness={0.5} />
    </mesh>
  );
}

// All floating annotations around the box
function DeviceScene() {
  const annotations = [
    {
      pos: [0, 0.9, 0],
      label: (
        <>
          <b>MandlacX Edge Processor</b>
          <br />
          AI-powered, first-generation device for on-site threat detection.
        </>
      ),
    },
    {
      pos: [1.8, 0.4, 0],
      label: (
        <>
          <b>Key Specifications</b>
          <ul className="list-disc ml-4">
            <li>USB 3.0 support</li>
            <li>16 GB RAM</li>
            <li>A7 Cortex Processor</li>
            <li>Three multi-axis survelllance lenses</li>
          </ul>
        </>
      ),
    },
    {
      pos: [-1.8, -0.2, 0],
      label: (
        <>
          <b>Real-Time Threat Detection</b>
          <ul className="list-disc ml-4">
            <li>Intrusions</li>
            <li>Firearms & Sharp Objects</li>
            <li>Human falls</li>
            <li>Unusual or Aggressive Motion</li>
          </ul>
        </>
      ),
    },
    {
      pos: [0, -0.9, 0],
      label: (
        <>
          <b>On-Device Intelligence</b>
          <br />
          Engineered to deliver intelligent surveillance without relying on the cloud, it gives you control, speed, and reliability right where you need it.
        </>
      ),
    },
    {
      pos: [-2.5, 1.3, 0],
      label: (
        <>
          <b>Privacy by Design</b>
          <br />
          Your footage stays on-site. No cloud syncs, no external servers—just full control over your data.
        </>
      ),
    },
    {
      pos: [2.5, 1.3, 0],
      label: (
        <>
          <b>Latency That Saves Seconds</b>
          <br />
          Instant decision-making with edge computing.
        </>
      ),
    },
    {
      pos: [-2.5, -1.3, 0],
      label: (
        <>
          <b>Future-Proof AI Stack</b>
          <br />
          Easily upgradable. Stay ahead with evolving detection.
        </>
      ),
    },
    {
      pos: [2.5, -1.3, 0],
      label: (
        <div className="text-yellow-400 font-bold text-center">
          Built for Speed.
          <br />
          Designed for Action.
        </div>
      ),
    },
  ];

  return (
    <group>
      <RotatingBox />
      {annotations.map((a, i) => (
        <Annotation key={i} position={a.pos as [number, number, number]}>
          {a.label}
        </Annotation>
      ))}
    </group>
  );
}

export default function MandlacX3DPage() {
  return (
    <div className="w-full h-screen bg-black">
      <h1 className="text-white text-3xl font-bold text-center pt-8 mb-2">
        MandlacX Edge Processor (3D Demo)
      </h1>
      <div className="w-full h-[80vh]">
        <Canvas camera={{ position: [0, 0, 6], fov: 50 }} shadows>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} castShadow />
          <Suspense fallback={null}>
            <Center>
              <DeviceScene />
            </Center>
          </Suspense>
          <OrbitControls enablePan={false} />
        </Canvas>
      </div>
    </div>
  );
}
