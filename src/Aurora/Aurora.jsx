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
            label: 'aurora noise',
            value: 3.0,
            step: 0.1,
            min: 0,
            max: 10,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseScale.value = value
            }
        },
        uPlaneNoiseFactor: {
            label: 'plane noise',
            value: 0.75,
            step: 0.01,
            min: 0,
            max: 3,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseFactor.value = value
            }
        },
        uColorTop: {
            label: 'color top',
            value: '#66ffff',
            onChange: (value) => {
                materialRef.current.uniforms.uColorTop.value = new THREE.Color(value)
            }
        },
        uColorBottom: {
            label: 'color bottom',
            value: '#45ed00',
            onChange: (value) => {
                materialRef.current.uniforms.uColorBottom.value = new THREE.Color(value)
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
                    uPlaneNoiseScale: {value: 5.0 },
                    uColorBottom: {value: new THREE.Color(0x45ed00)},
                    uColorTop: {value: new THREE.Color(0x66ffff)}
                }}
                wireframe={false}
                blending={THREE.AdditiveBlending}
                transparent={true}
            />
        </mesh>
    </>
}