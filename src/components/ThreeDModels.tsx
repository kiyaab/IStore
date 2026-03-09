import * as THREE from 'three';
import { useRef, useMemo, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial, MeshWobbleMaterial, Text } from '@react-three/drei';

export function IPhoneModel({ color = '#1a1a1a' }: { color?: string }) {
  const groupRef = useRef<THREE.Group>(null);
  const lensRefs = useRef<(THREE.Mesh | null)[]>([]);
  const islandRef = useRef<THREE.Mesh>(null);
  const screenRef = useRef<THREE.Mesh>(null);
  const bodyRef = useRef<THREE.Mesh>(null);
  
  const [hovered, setHovered] = useState(false);
  const [currentColor, setCurrentColor] = useState(new THREE.Color(color));

  // Smooth color transition
  useEffect(() => {
    setCurrentColor(new THREE.Color(color));
  }, [color]);

  useFrame((state, delta) => {
    const t = state.clock.getElapsedTime();

    // Smoothly transition body color
    if (bodyRef.current) {
      const targetColor = new THREE.Color(color);
      (bodyRef.current.material as THREE.MeshStandardMaterial).color.lerp(targetColor, 0.1);
    }

    // Animate Lenses (Retraction/Extension)
    lensRefs.current.forEach((lens, i) => {
      if (lens) {
        // Base oscillation + hover effect
        const baseZ = -0.14;
        const targetZ = hovered ? baseZ - 0.05 : baseZ;
        lens.position.z = THREE.MathUtils.lerp(lens.position.z, targetZ + Math.sin(t * 2 + i) * 0.01, 0.1);
        
        // Subtle rotation
        lens.rotation.z += delta * 0.5;
      }
    });

    // Animate Dynamic Island (Pulse/Expand)
    if (islandRef.current) {
      const targetScale = hovered ? 1.2 : 1.0;
      const pulse = 1 + Math.sin(t * 4) * 0.05;
      islandRef.current.scale.setScalar(THREE.MathUtils.lerp(islandRef.current.scale.x, targetScale * pulse, 0.1));
    }

    // Animate Screen (Subtle Glow/Flicker)
    if (screenRef.current) {
      const material = screenRef.current.material as THREE.MeshStandardMaterial;
      const glowIntensity = hovered ? 0.5 : 0.2;
      material.emissiveIntensity = THREE.MathUtils.lerp(material.emissiveIntensity, glowIntensity + Math.sin(t * 10) * 0.05, 0.1);
      material.emissive.set(hovered ? '#1a1a1a' : '#000');
    }

    // Subtle group tilt on hover
    if (groupRef.current) {
      const targetRotationX = hovered ? -0.2 : 0;
      const targetRotationY = hovered ? 0.2 : 0;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotationX, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotationY, 0.05);
    }
  });

  return (
    <group 
      ref={groupRef}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        {/* Main Body */}
        <mesh ref={bodyRef} castShadow receiveShadow>
          <boxGeometry args={[2, 4, 0.2]} />
          <meshStandardMaterial roughness={0.1} metalness={0.8} />
        </mesh>

        {/* Screen */}
        <mesh ref={screenRef} position={[0, 0, 0.11]}>
          <planeGeometry args={[1.85, 3.85]} />
          <meshStandardMaterial 
            color="#000" 
            roughness={0} 
            metalness={1} 
            emissive="#000"
            emissiveIntensity={0}
          />
        </mesh>

        {/* Camera Bump */}
        <mesh position={[0.5, 1.4, -0.11]}>
          <boxGeometry args={[0.8, 0.8, 0.05]} />
          <meshStandardMaterial color={color} roughness={0.2} metalness={0.7} />
        </mesh>

        {/* Lenses */}
        {[
          [0.3, 1.6, -0.14],
          [0.7, 1.6, -0.14],
          [0.5, 1.2, -0.14]
        ].map((pos, i) => (
          <mesh 
            key={i} 
            ref={(el) => (lensRefs.current[i] = el)}
            position={pos as [number, number, number]} 
            rotation={[Math.PI / 2, 0, 0]}
          >
            <cylinderGeometry args={[0.15, 0.15, 0.02, 32]} />
            <meshStandardMaterial color="#111" roughness={0} metalness={1} />
          </mesh>
        ))}

        {/* Dynamic Island */}
        <mesh ref={islandRef} position={[0, 1.7, 0.12]} rotation={[0, 0, Math.PI / 2]}>
          <capsuleGeometry args={[0.08, 0.3, 4, 8]} />
          <meshStandardMaterial color="#000" />
        </mesh>

        {/* Subtle Screen Text on Hover */}
        {hovered && (
          <Text
            position={[0, 0, 0.13]}
            fontSize={0.2}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKbxmcSA.woff"
          >
            A19 Pro Chip
          </Text>
        )}
      </Float>
    </group>
  );
}

export function InteractiveParticles({ count = 200 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 20;
      p[i * 3 + 1] = (Math.random() - 0.5) * 20;
      p[i * 3 + 2] = (Math.random() - 0.5) * 20;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (!pointsRef.current) return;
    
    const t = state.clock.getElapsedTime();
    const { x, y } = state.mouse;

    // Slow rotation
    pointsRef.current.rotation.y = t * 0.05;
    pointsRef.current.rotation.x = t * 0.02;

    // React to mouse
    pointsRef.current.position.x = THREE.MathUtils.lerp(pointsRef.current.position.x, x * 2, 0.1);
    pointsRef.current.position.y = THREE.MathUtils.lerp(pointsRef.current.position.y, y * 2, 0.1);
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={0.08} 
        color="#f97316" 
        transparent 
        opacity={0.4} 
        sizeAttenuation 
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export function FloatingShapes() {
  const shapesRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!shapesRef.current) return;
    const t = state.clock.getElapsedTime();
    const scroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    shapesRef.current.children.forEach((child, i) => {
      child.rotation.x = t * 0.2 + i;
      child.rotation.y = t * 0.3 + i;
      child.position.y += Math.sin(t + i) * 0.002;
      
      // React to scroll
      child.position.z = Math.sin(scroll * Math.PI + i) * 2;
    });
  });

  return (
    <group ref={shapesRef}>
      <mesh position={[-5, 2, -5]}>
        <torusGeometry args={[1, 0.4, 16, 100]} />
        <meshStandardMaterial color="#f97316" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh position={[5, -3, -8]}>
        <octahedronGeometry args={[2]} />
        <meshStandardMaterial color="#3b82f6" wireframe transparent opacity={0.1} />
      </mesh>
      <mesh position={[-3, -5, -10]}>
        <icosahedronGeometry args={[1.5]} />
        <meshStandardMaterial color="#8b5cf6" wireframe transparent opacity={0.1} />
      </mesh>
    </group>
  );
}

export function Particles({ count = 100 }) {
  const points = useMemo(() => {
    const p = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (Math.random() - 0.5) * 10;
      p[i * 3 + 1] = (Math.random() - 0.5) * 10;
      p[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return p;
  }, [count]);

  const pointsRef = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y += 0.001;
      pointsRef.current.rotation.x += 0.0005;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={points}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#3b82f6" transparent opacity={0.6} />
    </points>
  );
}
