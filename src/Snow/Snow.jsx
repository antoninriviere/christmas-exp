import * as THREE from 'three'
import { useRef, useMemo, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

export default function Snow({ count = 500 }) {
  const materialRef = useRef()
  const geometryRef = useRef()

  const [initialPositions, speeds, seeds] = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const seeds = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 30
      positions[i3 + 1] = Math.random() * 10
      positions[i3 + 2] = (Math.random() - 0.5) * 30

      speeds[i] = 0.1 + Math.random() * 0.4
      seeds[i] = Math.random()
    }
    return [positions, speeds, seeds]
  }, [count])

  useEffect(() => {
    const geometry = geometryRef.current
    geometry.setAttribute(
      'position',
      new THREE.BufferAttribute(initialPositions, 3)
    )

    geometry.setAttribute(
      'aInitialPosition', 
      new THREE.BufferAttribute(initialPositions, 3)
    )

    geometry.setAttribute(
      'aSpeed', 
      new THREE.BufferAttribute(speeds, 1)
    )

    geometry.setAttribute(
      'aSeed',
      new THREE.BufferAttribute(seeds, 1)
    )
  }, [initialPositions, speeds, seeds])

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
    }
  })

  return (
    <points>
      <bufferGeometry ref={geometryRef} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={{
          uTime: { value: 0 },
          uSpeed: { value: 1 },
          uWind: { value: 1 }
        }}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}
