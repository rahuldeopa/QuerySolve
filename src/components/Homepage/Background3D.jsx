import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';

function AnimatedSphere() {
  const sphereRef = useRef();

  useFrame((state) => {
    sphereRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    sphereRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  return (
    <Sphere ref={sphereRef} visible args={[1, 100, 200]} scale={2.5}>
      <MeshDistortMaterial 
        color="#6366f1" 
        attach="material" 
        distort={0.4} 
        speed={2} 
        roughness={0.2}
      />
    </Sphere>
  );
}

export default function Background3D() {
  return (
    <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-auto">
      <Canvas className="w-full h-full">
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 1, 1]} intensity={1} />
        <AnimatedSphere />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      </Canvas>
    </div>
  );
}
