import React, { Suspense, useState } from 'react';
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr';
import { Text, Shadow } from '@react-three/drei';
import './index.css';
import { Canvas } from '@react-three/fiber';

function CylinderButton(props: any) {
  const [hover, setHover] = useState(false);
  const [color, setColor] = useState<any>('blue');

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive
      onHover={() => setHover(true)}
      onBlur={() => setHover(false)}
      onSelect={onSelect}
    >
      <group>
        <mesh position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <cylinderBufferGeometry args={[0.1, 0.1, 0.3, 32]} />
          <meshPhongMaterial color={color} />
        </mesh>

        {hover && (
          <Shadow
            opacity={0.3}
            scale={[0.6, 0.6, 0.6]}
            rotation={[-Math.PI / 2, 0, 0]}
          />
        )}
      </group>
    </Interactive>
  );
}

export default function App() {
  return (
    <>
      <ARButton />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.6, 3], near: 0.01, far: 100 }}
      >
        <XR referenceSpace="local">
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} castShadow />
          <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
            <planeBufferGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          <CylinderButton position={[0, 0.05, 0]} />
          <Controllers />
        </XR>
      </Canvas>
    </>
  );
}
