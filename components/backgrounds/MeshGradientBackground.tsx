"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

// Custom ShaderMaterial interface extension
interface CustomShaderMaterial extends THREE.ShaderMaterial {
  uniforms: {
    uTime: { value: number };
    uColor1: { value: THREE.Color };
    uColor2: { value: THREE.Color };
    uColor3: { value: THREE.Color };
  }
}

const GradientShader = {
  // ... (keeping shader strings same as logic does not change)
  uniforms: {
    uTime: { value: 0 },
    uColor1: { value: new THREE.Color("#050505") }, // Deep Obsidian
    uColor2: { value: new THREE.Color("#0a0a0a") }, // Slightly lighter obsidian
    uColor3: { value: new THREE.Color("#00151a") }, // Very dark teal/blue hint
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: `
    uniform float uTime;
    uniform vec3 uColor1;
    uniform vec3 uColor2;
    uniform vec3 uColor3;
    varying vec2 vUv;

    // Simplex noise function (simplified)
    vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
               -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy) );
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1;
      i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod289(i);
      vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
      + i.x + vec3(0.0, i1.x, 1.0 ));
      vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
      m = m*m ;
      m = m*m ;
      vec3 x = 2.0 * fract(p * C.www) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    void main() {
      // Slow moving noise
      float noise = snoise(vUv * 3.0 + uTime * 0.1);
      
      // Mix colors based on noise
      vec3 color = mix(uColor1, uColor2, noise * 0.5 + 0.5);
      color = mix(color, uColor3, snoise(vUv * 2.0 - uTime * 0.05) * 0.3);
      
      // Add a very subtle glowing grain
      float grain = fract(sin(dot(vUv, vec2(12.9898, 78.233))) * 43758.5453);
      color += grain * 0.02;

      gl_FragColor = vec4(color, 1.0);
    }
  `,
};

const MeshPlane = () => {
  const mesh = useRef<THREE.Mesh>(null);
  
  // Clone the shader to avoid modifying the original object reference in memory across re-renders
  const shaderArgs = useMemo(() => ({
      uniforms: {
        uTime: { value: 0 },
        uColor1: { value: new THREE.Color("#050505") },
        uColor2: { value: new THREE.Color("#0e0e0e") }, 
        uColor3: { value: new THREE.Color("#001a20") }, 
      },
      vertexShader: GradientShader.vertexShader,
      fragmentShader: GradientShader.fragmentShader,
  }), []);

  useFrame((state) => {
    if (mesh.current) {
        // Cast the material to our custom interface
        (mesh.current.material as CustomShaderMaterial).uniforms.uTime.value = state.clock.getElapsedTime();
    }
  });

  return (
    <mesh ref={mesh} scale={[20, 10, 1]}>
      <planeGeometry args={[1, 1, 32, 32]} />
      <shaderMaterial args={[shaderArgs]} />
    </mesh>
  );
};

export default function MeshGradientBackground() {
  return (
    <div className="absolute inset-0 -z-10 w-full h-full bg-[#050505]">
      <Canvas camera={{ position: [0, 0, 1] }} dpr={[1, 2]}>
        <MeshPlane />
      </Canvas>
    </div>
  );
}
