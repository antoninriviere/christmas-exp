import * as THREE from 'three'
import { useRef } from 'react'
import { useControls } from 'leva'

import { extend, useFrame } from '@react-three/fiber'
import { ShaderMaterial } from 'three'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

extend({ ShaderMaterial })

export default function Aurora({ width = 5, height = 1, segments = 32 }) {

    const mesh = useRef()
    const materialRef = useRef()

    const {uPlaneNoiseScale, uPlaneNoiseFactor } = useControls('Aurora', {
        uPlaneNoiseScale: {
            value: 5,
            step: 0.1,
            min: 0,
            max: 10,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseScale.value = value
            }
        },
        uPlaneNoiseFactor: {
            value: 0.5,
            step: 0.01,
            min: 0,
            max: 3,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseFactor.value = value
            }
        }
    })

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return <>
        <mesh ref={mesh}>
            <planeGeometry args={[width, height, segments, segments]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uPlaneNoiseFactor: { value: 0.5 },
                    uPlaneNoiseScale: {value: 5.0 }
                }}
                side={THREE.DoubleSide}
                wireframe={false}
                blending={THREE.AdditiveBlending}
                transparent={true}
            />
        </mesh>
    </>
}