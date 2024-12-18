import * as THREE from 'three'
import { useRef, useEffect } from 'react'
import { Clone, useGLTF } from '@react-three/drei'

export default function Forest() {
  const snowPine = useGLTF('./models/snow-pine.glb')
  const pine = useGLTF('./models/pine.glb')

  return <>
    {Array.from({ length: 50 }).map((_, index) => {
      const isPine = Math.random() < 0.3;

      // Define scales and corresponding Y positions
      const scales = [
        { scale: 2.5, yPos: 0.125 },
        { scale: 3, yPos: 0.35 },
        { scale: 3.5, yPos: 0.5 }
      ];

      // Randomly select a scale and its corresponding Y position
      const { scale, yPos } = scales[Math.floor(Math.random() * scales.length)];
      
      let position;

      // Generate random position avoiding the center circle
      do {
        position = [
          (Math.random() - 0.5) * 20, // Random x between -10 and 10
          yPos, // Use the corresponding Y position
          (Math.random() - 0.5) * 20  // Random z between -10 and 10
        ];
      } while (Math.sqrt(position[0] ** 2 + position[2] ** 2) < 6); // Avoid circle with radius 4

      return (
        <Clone 
          key={index} 
          object={isPine ? pine.scene : snowPine.scene} 
          scale={scale} 
          position={position} 
        />
      );
    })}
  </>
}

useGLTF.preload('./models/snow-pine.glb')
useGLTF.preload('./models/pine.glb')