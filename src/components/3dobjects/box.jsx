import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

function MyBox() {
  const meshRef = useRef();

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.z += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default MyBox;