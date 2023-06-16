import { useEffect, useState } from 'react';
import { Interactive, XR, ARButton, Controllers } from '@react-three/xr';
import { Canvas } from '@react-three/fiber';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function SodaCanButton(props: any) {
  const [color, setColor] = useState<number>(0xff0000);

  const onSelect = () => {
    setColor((Math.random() * 0xffffff) | 0);
  };

  return (
    <Interactive onSelect={onSelect}>
      <group>
        <mesh position={[0, 0.1, 0]} scale={[0.01,0.01,0.01]} rotation={[-Math.PI / 2, 0, 0]}>
          <primitive object={props.gltf.scene} />
          <meshPhongMaterial color={color} />
        </mesh>
      </group>
    </Interactive>
  );
}

export default function Threexr() {
  const [sodaCanModel, setSodaCanModel] = useState<any>(null);

  const loadModel = async () => {
    const loader = new GLTFLoader();
    const gltf = await loader.loadAsync('/soda-can.gltf');
    setSodaCanModel(gltf);
  };

  useEffect(() => {
    loadModel();
  }, []);

  return (
    <>
      <ARButton />
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 1.6, 3], near: 0.01, far: 100 }}
      >
        <XR referenceSpace="local">
          <ambientLight />
          <pointLight position={[10, 10, 10]} />
          <mesh rotation={[-Math.PI / 2, 0, 0]}>
            <planeBufferGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.3} />
          </mesh>
          {sodaCanModel && <SodaCanButton gltf={sodaCanModel} position={[0, 0.05, 0]} />}
          <Controllers />
        </XR>
      </Canvas>
    </>
  );
}
