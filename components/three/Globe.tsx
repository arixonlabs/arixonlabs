"use client";

import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Sphere, Float, MeshDistortMaterial, Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { useTheme } from "next-themes";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const Globe = () => {
  const meshRef = useRef<THREE.Mesh>(null);
  const groupRef = useRef<THREE.Group>(null);
  const pointsRef = useRef<THREE.Points>(null);
  const { mouse } = useThree();
  const { theme } = useTheme();

  const isDark = theme === "dark";
  const primaryColor = isDark ? "#38BDF8" : "#0284C7";
  const secondaryColor = isDark ? "#818CF8" : "#4F46E5";

  // Create points for the network effect
  const pointsCount = 1200;
  const positions = useMemo(() => {
    const pos = new Float32Array(pointsCount * 3);
    for (let i = 0; i < pointsCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / pointsCount);
      const theta = Math.sqrt(pointsCount * Math.PI) * phi;
      const radius = 1.8; 
      
      pos[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
      pos[i * 3 + 1] = radius * Math.sin(theta) * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  useGSAP(() => {
    if (!groupRef.current) return;

    // SCROLL-DRIVEN ANIMATION
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#services-section",
        start: "top bottom",
        end: "bottom top",
        scrub: 1.5,
      },
    });

    // 1. Position & Rotation on scroll
    tl.fromTo(groupRef.current.position, 
      { y: -2, x: 2, z: -2 }, 
      { y: 0, x: -2, z: 0, ease: "power1.inOut" }
    );

    tl.to(groupRef.current.rotation, {
      y: Math.PI * 4,
      x: Math.PI * 0.5,
      ease: "none",
    }, 0);

    // 2. The Reveal (Zoom)
    gsap.set(groupRef.current.scale, { x: 0, y: 0, z: 0 });

    tl.to(groupRef.current.scale, {
      x: 1.2,
      y: 1.2,
      z: 1.2,
      ease: "power2.out",
    }, 0);
    
    tl.to(groupRef.current.scale, {
      x: 0.5,
      y: 0.5,
      z: 0.5,
      opacity: 0,
      ease: "power2.in",
    }, 0.7);

  }, []);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.15;

      // Subtle mouse influence
      const targetRotationX = -mouse.y * 0.3;
      const targetRotationY = mouse.x * 0.3;
      
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y += (targetRotationY * 0.05);
    }
    
    if (pointsRef.current) {
      pointsRef.current.rotation.y -= delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        {/* Main Globe Body */}
        <Sphere ref={meshRef as any} args={[1.5, 64, 64]}>
          <MeshDistortMaterial
            color={primaryColor}
            roughness={0.2}
            metalness={0.9}
            distort={0.3}
            speed={3}
            transparent
            opacity={isDark ? 0.6 : 0.4}
            emissive={primaryColor}
            emissiveIntensity={isDark ? 0.8 : 0.4}
          />
        </Sphere>

        {/* Network Points */}
        <Points ref={pointsRef as any} positions={positions} stride={3}>
          <PointMaterial
            transparent
            color={primaryColor}
            size={0.025}
            sizeAttenuation={true}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            opacity={isDark ? 0.8 : 0.6}
          />
        </Points>

        {/* Inner Core Architecture */}
        <Sphere args={[1.4, 32, 32]}>
          <meshStandardMaterial
            color={secondaryColor}
            wireframe
            transparent
            opacity={0.15}
          />
        </Sphere>
      </Float>

      <ambientLight intensity={isDark ? 0.4 : 0.8} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} color={primaryColor} />
      <pointLight position={[-10, -10, -10]} intensity={1.5} color={secondaryColor} />
    </group>
  );
};

export default Globe;
