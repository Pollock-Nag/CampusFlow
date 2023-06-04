import { Html, useIntersect } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import GlobeComponent from '../GlobeComponent';

function Objects() {
  const { height, width } = useThree((state) => state.viewport);

  return (
    <>
      <pointLight color="purple" position={[8, -25, 5]} intensity={20} />
      <pointLight
        color="red"
        position={[0, -height * 2.25, 5]}
        intensity={10}
      />
      <Item color="blue" position={[0, 1, 0]}>
        <boxGeometry />
      </Item>
      <Item color="red" position={[-width / 5, -height * 0.6, 0]}>
        <boxGeometry />
      </Item>
      <Item color="black" position={[-width / 5, -height * 1.8, -2]}>
        <coneGeometry args={[1, 1, 6]} />
      </Item>
      <Item color="purple" position={[width / 5, -height * 2.5, 0]}>
        <coneGeometry args={[1.5, 2, 3]} />
      </Item>
      <Item color="orange" position={[width / 20, -height * 3.8, -2]}>
        <coneGeometry args={[0.75, 2.5, 12]} />
      </Item>
    </>
  );
}

function Item({ color, position, children }) {
  const visible = useRef();
  const ref = useIntersect((isVisible) => (visible.current = isVisible));
  const [xRandomFactor, yRandomFactor] = useMemo(
    () => [(0.5 - Math.random()) * 0.5, (0.5 - Math.random()) * 0.5],
    []
  );

  useFrame(({ clock }, delta) => {
    const elapsedTime = clock.getElapsedTime();

    ref.current.rotation.x = elapsedTime * xRandomFactor;
    ref.current.rotation.y = elapsedTime * yRandomFactor;

    const scale = THREE.MathUtils.damp(
      ref.current.scale.x,
      visible.current ? 1.5 : 0.2,
      5,
      delta
    );
    ref.current.scale.set(scale, scale, scale);
  });

  return (
    <mesh ref={ref} position={position}>
      {children}
      <meshPhysicalMaterial transparent color={color} />
    </mesh>
  );
}

export { Objects };
