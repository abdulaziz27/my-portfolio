"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useState, Suspense, useRef } from "react";
import { useInView } from "framer-motion";
import { locations, LocationData } from "./mapData";
import MapMarker from "./MapMarker";
import * as THREE from "three";

function Globe() {
  // Load standard Earth texture
  const colorMap = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');

  return (
    <group>
      {/* 1. Core Earth Sphere with Texture - HIGH VISIBILITY */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial 
            map={colorMap} 
            color="#ffffff" // Full brightness (No dark tint)
            roughness={0.5} // Smoother for better light reflection
            metalness={0.1}
            emissive="#001133" // Subtle blueish self-illumination
            emissiveIntensity={0.2}
        />
      </mesh>

      {/* 2. Holographic Grid (Wireframe) - Floating above */}
      <mesh>
        <sphereGeometry args={[2.02, 32, 32]} />
        <meshBasicMaterial 
            color="#00f0ff" // Cyber Blue Grid
            wireframe 
            transparent 
            opacity={0.15} 
        />
      </mesh>

      {/* 3. Atmosphere Glow - VIBRANT */}
      <mesh scale={[1.2, 1.2, 1.2]}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshBasicMaterial 
            color="#0088ff" 
            transparent 
            opacity={0.15} 
            side={THREE.BackSide}
            blending={THREE.AdditiveBlending}
        />
      </mesh>
      
      {/* 4. Horizon Rim (Fake Fresnel) */}
       <mesh scale={[1.01, 1.01, 1.01]}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial 
            color="#004466"
            transparent
            opacity={0.3}
            side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}

export default function GlobalFootprint() {
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);
  const containerRef = useRef<HTMLElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "200px" });

  return (
    <section 
        id="map"
        ref={containerRef}
        className="relative w-full h-[600px] md:h-[800px] bg-black overflow-hidden flex flex-col items-center justify-center border-t border-white/10"
    >
      
      {/* Section Header */}
      <div className="absolute top-10 z-10 text-center pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-2 text-white">
          GLOBAL <span className="text-accent text-glow">FOOTPRINT</span>
        </h2>
        <p className="text-gray-500 uppercase tracking-widest text-sm">
          Select a node to inspect payload
        </p>
      </div>

      {/* 3D Scene - Only Render if In View */}
      <div className="absolute inset-0 w-full h-full">
        {isInView && (
            <Canvas camera={{ position: [0, 0, 6.5], fov: 45 }} dpr={[1, 2]}>
            <fog attach="fog" args={['#000000', 5, 20]} />
            
            {/* HIGH INTENSITY LIGHTING */}
            <ambientLight intensity={1.2} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={3.5} color="#ffffff" />
            <pointLight position={[-10, -10, -5]} intensity={2} color="#00f0ff" />
            
            <Suspense fallback={null}>
                <group rotation={[0.2, 0, 0]}> {/* Tilt the earth slightly */}
                    <Globe />
                    {locations.map((loc) => (
                    <MapMarker 
                        key={loc.id} 
                        data={loc} 
                        radius={2.04} // Ensure markers are above texture and grid
                        onSelect={setSelectedLocation} 
                    />
                    ))}
                </group>
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
            </Suspense>

            <OrbitControls 
                enablePan={false} 
                enableZoom={false} 
                rotateSpeed={0.5} 
                autoRotate 
                autoRotateSpeed={0.5}
                minPolarAngle={Math.PI / 3}
                maxPolarAngle={Math.PI / 1.5}
            />
            </Canvas>
        )}
      </div>

      {/* High-Tech Popup Overlay */}
      {selectedLocation && (
        <div className="absolute bottom-10 md:bottom-20 z-20 w-full max-w-md px-4">
          <div className="bg-glass-bg border border-glass-border p-6 backdrop-blur-md rounded-none relative overflow-hidden group animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Decorative Corner */}
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-accent opacity-50"></div>
            
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-2xl font-bold text-white mb-1">{selectedLocation.city}</h3>
                    <p className="text-accent text-xs tracking-widest font-mono uppercase">{selectedLocation.country}</p>
                </div>
                <button 
                    onClick={() => setSelectedLocation(null)}
                    className="text-gray-500 hover:text-white transition-colors"
                >
                    ✕
                </button>
            </div>
            
            <div className="space-y-4">
                <div className="flex items-center gap-4">
                    <div className="text-4xl font-bold text-white">{selectedLocation.projects}</div>
                    <div className="text-sm text-gray-400 leading-tight">
                        Active<br/>Projects
                    </div>
                </div>
                <p className="text-gray-300 text-sm border-l-2 border-accent/30 pl-3">
                    {selectedLocation.description}
                </p>
            </div>

            {/* Scanning Line Animation */}
            <div className="absolute top-0 left-0 w-full h-[2px] bg-accent/20 animate-scan"></div>
          </div>
        </div>
      )}
    </section>
  );
}