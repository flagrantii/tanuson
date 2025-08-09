import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, ContactShadows, Environment, Stars, Float, Sparkles } from "@react-three/drei";
import * as THREE from "three";

function Satellites() {
  const group = useRef<THREE.Group>(null!);
  const count = 6;
  const radius = 2.2;
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.rotation.y = t * 0.2;
  });
  return (
    <group ref={group}>
      {Array.from({ length: count }).map((_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = Math.sin(angle * 2) * 0.3;
        return (
          <mesh key={i} position={[x, y, z]} castShadow receiveShadow>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={"#9f9f9f"} metalness={0.8} roughness={0.2} />
          </mesh>
        );
      })}
    </group>
  );
}

function InteractiveObject() {
  const group = useRef<THREE.Group>(null!);
  const meshRef = useRef<THREE.Mesh>(null!);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  const target = useRef({ x: 0, y: 0 });

  const prefersReducedMotion = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }, []);

  useFrame((_state, delta) => {
    if (!group.current || !meshRef.current) return;
    if (!prefersReducedMotion) {
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        target.current.x,
        0.08
      );
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        target.current.y,
        0.08
      );
      meshRef.current.rotation.z += delta * 0.1;
      const s = THREE.MathUtils.lerp(meshRef.current.scale.x, hovered ? 1.05 : 1, 0.2);
      meshRef.current.scale.setScalar(s);
    }
  });

  const floatConfig = useMemo(
    () => ({
      speed: prefersReducedMotion ? 0 : 1,
      floatIntensity: prefersReducedMotion ? 0 : 0.6,
      rotationIntensity: prefersReducedMotion ? 0 : 0.4,
    }),
    [prefersReducedMotion]
  );

  return (
    <Float {...floatConfig}>
      <group
      ref={group}
      onPointerMove={(e) => {
        // pointer.x/y are normalized -1..1
        // Subtle tilt mapped to cursor
        // Invert Y to feel natural
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const anyEvent: any = e as any;
        const px = anyEvent.pointer?.x ?? 0;
        const py = anyEvent.pointer?.y ?? 0;
        target.current.y = px * 0.4;
        target.current.x = -py * 0.3;
      }}
    >
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={() => setActive((v) => !v)}
        castShadow
        receiveShadow
      >
        <torusKnotGeometry args={[1, 0.35, 220, 32]} />
        <meshPhysicalMaterial
          color={active ? "#d4d4d4" : hovered ? "#0a0a0a" : "#e5e5e5"}
          metalness={active ? 0.2 : 0.4}
          roughness={active ? 0.1 : 0.35}
          clearcoat={0.8}
          clearcoatRoughness={0.2}
          sheen={0.3}
          transmission={active ? 0.55 : 0}
          ior={1.2}
          thickness={active ? 0.5 : 0}
          envMapIntensity={1.2}
        />
      </mesh>
        </group>
        {/* <Sparkles count={40} scale={4} size={1.5} speed={0.4} noise={0.2} color="#ffffff" /> */}
      </Float>
  );
}

export default function InteractiveScene() {
  return (
    <Canvas
      dpr={[1, 2]}
      camera={{ position: [0, 0, 4], fov: 70 }}
      shadows
      gl={{ antialias: true }}
      style={{ width: "100%", height: "100%", backgroundColor: "white" }}
    >
      {/* Lighting */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[3, 3, 5]} intensity={1} castShadow />

      {/* Subtle star field for tech ambiance */}
      {/* <Stars radius={50} depth={20} count={1000} factor={4} saturation={0} fade speed={0.5} /> */}

      <InteractiveObject />
      {/* <Satellites /> */}
      {/* <Sparkles count={80} scale={12} size={1.1} speed={0.25} noise={0.2} color="#ffffff" /> */}

      {/* Realistic ambient lighting */}
      <Environment preset="city" />

      <OrbitControls enablePan={false} minDistance={2} maxDistance={8} autoRotate autoRotateSpeed={0.6} enableZoom />
    </Canvas>
  );
}
