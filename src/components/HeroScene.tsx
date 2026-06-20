"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Float, Sphere, MeshDistortMaterial } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

function AbstractShape() {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
      <Sphere args={[1.5, 64, 64]} ref={meshRef}>
        <MeshDistortMaterial
          color="#FF3131"
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      <Sphere args={[1.2, 32, 32]} position={[-2, -1, -2]}>
         <MeshDistortMaterial
          color="#00E5FF"
          attach="material"
          distort={0.5}
          speed={3}
          roughness={0.1}
          metalness={0.9}
        />
      </Sphere>
      <Sphere args={[0.8, 32, 32]} position={[2, 1, -1]}>
         <MeshDistortMaterial
          color="#121212"
          attach="material"
          distort={0.2}
          speed={1}
          roughness={0.8}
          metalness={0.1}
        />
      </Sphere>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full pointer-events-none opacity-60">
      <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FF3131" />
        <directionalLight position={[-10, -10, -5]} intensity={1} color="#00E5FF" />
        <Environment preset="city" />
        <AbstractShape />
      </Canvas>
    </div>
  );
}
