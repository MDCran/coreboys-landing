"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

function BroadcastOrb() {
  const wireRef = useRef<THREE.LineSegments>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  const wireGeo = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(2.2, 2);
    return new THREE.EdgesGeometry(geo);
  }, []);

  const basePositions = useMemo(() => {
    const arr = wireGeo.attributes.position.array as Float32Array;
    return Float32Array.from(arr);
  }, [wireGeo]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (wireRef.current) {
      wireRef.current.rotation.x = t * 0.08;
      wireRef.current.rotation.y = t * 0.12;
      const positions = wireRef.current.geometry.attributes
        .position as THREE.BufferAttribute;
      const arr = positions.array as Float32Array;
      for (let i = 0; i < arr.length; i += 3) {
        const bx = basePositions[i];
        const by = basePositions[i + 1];
        const bz = basePositions[i + 2];
        const len = Math.sqrt(bx * bx + by * by + bz * bz) || 1;
        const wave =
          Math.sin(t * 1.6 + bx * 1.4 + by * 0.9) * 0.06 +
          Math.cos(t * 1.1 + bz * 1.2) * 0.04;
        const k = 1 + wave;
        arr[i] = (bx / len) * len * k;
        arr[i + 1] = (by / len) * len * k;
        arr[i + 2] = (bz / len) * len * k;
      }
      positions.needsUpdate = true;
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.05;
      innerRef.current.rotation.y = -t * 0.07;
      const m = innerRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.04 + (Math.sin(t * 2.0) + 1) * 0.03;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.18;
    }
  });

  return (
    <group>
      <mesh ref={innerRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial
          color="#ff3b1f"
          transparent
          opacity={0.06}
          wireframe={false}
        />
      </mesh>

      <lineSegments ref={wireRef} geometry={wireGeo.clone()}>
        <lineBasicMaterial color="#f2eee5" transparent opacity={0.85} />
      </lineSegments>

      <mesh ref={ringRef} rotation={[Math.PI / 2.2, 0, 0]}>
        <torusGeometry args={[3.4, 0.005, 8, 200]} />
        <meshBasicMaterial color="#ff3b1f" transparent opacity={0.55} />
      </mesh>

      <mesh rotation={[Math.PI / 1.6, 0.3, 0]}>
        <torusGeometry args={[3.0, 0.003, 8, 200]} />
        <meshBasicMaterial color="#f2eee5" transparent opacity={0.18} />
      </mesh>
    </group>
  );
}

function ParticleField() {
  const ref = useRef<THREE.Points>(null);

  const { geometry, material } = useMemo(() => {
    const count = 320;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 5 + Math.random() * 4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);
    }
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const material = new THREE.PointsMaterial({
      color: "#f2eee5",
      size: 0.02,
      transparent: true,
      opacity: 0.6,
      sizeAttenuation: true,
    });
    return { geometry, material };
  }, []);

  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.rotation.y = clock.getElapsedTime() * 0.03;
    }
  });

  return <points ref={ref} geometry={geometry} material={material} />;
}

export default function Scene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 45 }}
      dpr={[1, 1.6]}
      gl={{ antialias: true, alpha: true }}
      style={{ background: "transparent" }}
    >
      <BroadcastOrb />
      <ParticleField />
    </Canvas>
  );
}
