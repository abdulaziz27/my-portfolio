"use client";

import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { LocationData } from "./mapData";

interface MapMarkerProps {
  data: LocationData;
  radius: number;
  onSelect: (data: LocationData) => void;
}

export default function MapMarker({ data, radius, onSelect }: MapMarkerProps) {
  const meshRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);

  // Convert Lat/Lng to 3D Cartesian Coordinates
  // Phi = 90 - lat (polar angle from top)
  // Theta = lng + 180 (azimuthal angle)
  const phi = (90 - data.lat) * (Math.PI / 180);
  const theta = (data.lng + 180) * (Math.PI / 180); // Adjust rotation offset if needed

  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.lookAt(0, 0, 0);
      
      // Pulse animation
      const scale = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
      meshRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={[x, y, z]} ref={meshRef}>
      {/* Clickable Area */}
      <mesh 
        onClick={() => onSelect(data)} 
        onPointerOver={() => { document.body.style.cursor = 'pointer'; setHovered(true); }}
        onPointerOut={() => { document.body.style.cursor = 'auto'; setHovered(false); }}
      >
        <circleGeometry args={[0.08, 16]} />
        <meshBasicMaterial color={hovered ? "#ffffff" : "var(--accent)"} transparent opacity={0.8} side={THREE.DoubleSide} />
      </mesh>

      {/* Pulsing Ring */}
      <mesh position={[0, 0, -0.01]}>
        <ringGeometry args={[0.08, 0.12, 32]} />
        <meshBasicMaterial color="var(--accent)" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>

      {/* Label (Visible on Hover) */}
      <Html distanceFactor={15}>
        <div className={`
            pointer-events-none transition-opacity duration-300 
            ${hovered ? 'opacity-100' : 'opacity-0'}
            text-xs font-bold text-accent tracking-widest uppercase bg-black/80 px-2 py-1 backdrop-blur-sm border border-white/10 whitespace-nowrap
        `}>
            {data.city}
        </div>
      </Html>
    </group>
  );
}
