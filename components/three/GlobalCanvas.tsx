"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Points, PointMaterial, Float, Icosahedron } from "@react-three/drei";
import { inSphere } from "maath/random";
import { useScroll } from "framer-motion";
import * as THREE from "three";

import Globe from "./Globe";

function HeroScene() {
  const ref = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  
  // Create 5000 points
  const [sphere] = useState(() => 
    inSphere(new Float32Array(5000 * 3), { radius: 1.5 }) as Float32Array
  );

  const { scrollYProgress } = useScroll();

  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 10;
      ref.current.rotation.y -= delta / 15;
    }
    
    // Fade out particles as we scroll past the hero section
    if (materialRef.current) {
      const scroll = scrollYProgress.get();
      // Completely faded out by 20% scroll
      const opacity = 1 - scroll * 5; 
      materialRef.current.opacity = THREE.MathUtils.clamp(opacity, 0, 1);
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref as any} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial
          ref={materialRef as any}
          transparent
          color="#38BDF8"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function GlobalCanvas() {
  return (
    <div className="fixed inset-0 z-0 bg-transparent pointer-events-none transition-colors duration-500">
      <Canvas camera={{ position: [0, 0, 3], fov: 45 }}>
        <HeroScene />
        <Globe />
      </Canvas>
    </div>
  );
}
