import { Canvas } from '@react-three/fiber';
import React, { Suspense } from 'react';
import GlobeComponent from '../GlobeComponent';
import { Scene } from './Scene';
import { Html } from '@react-three/drei';

export default function Landing() {
  return (
    <Canvas>
      <ambientLight />
      <directionalLight color="red" intensity={10} />
      <Suspense fallback={null}>
        <Scene />
      </Suspense>
    </Canvas>
  );
}
