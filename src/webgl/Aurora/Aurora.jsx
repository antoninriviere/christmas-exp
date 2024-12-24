import * as THREE from 'three'
import React, { useRef } from 'react'
import { useControls } from 'leva'

import { useFrame } from '@react-three/fiber'

import vertexShader from './shaders/vertex.glsl'
import fragmentShader from './shaders/fragment.glsl'

const Aurora = React.memo(function AuroraComponent({ width = 10, height = 2, segments = 32 }) {

    const mesh = useRef()
    const materialRef = useRef()

    useControls('Aurora', {
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
        uPlaneNoiseFactorX: {
            label: 'plane noiseX',
            value: 0.42,
            step: 0.01,
            min: 0,
            max: 3,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseFactorX.value = value
            }
        },
        uPlaneNoiseFactorY: {
            label: 'plane noiseY',
            value: 0.85,
            step: 0.01,
            min: 0,
            max: 3,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseFactorY.value = value
            }
        },
        uPlaneNoiseFactorZ: {
            label: 'plane noiseZ',
            value: 0.85,
            step: 0.01,
            min: 0,
            max: 3,
            onChange: (value) => {
                materialRef.current.uniforms.uPlaneNoiseFactorZ.value = value
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
        },
        uOpacity: {
            label: 'opacity',
            value: 0.6,
            step: 0.01,
            min: 0,
            max: 1,
            onChange: (value) => {
                materialRef.current.uniforms.uOpacity.value = value
            }
        }
    }, {
        collapsed: true
    })

    useFrame(({ clock }) => {
        if (materialRef.current) {
            materialRef.current.uniforms.uTime.value = clock.getElapsedTime()
        }
    })

    return <>
        <mesh ref={mesh} position={[-20, 6, -60]} scale={[12, 5, 0]} rotation-y={ Math.PI * 0.4 }>
            <planeGeometry args={[width, height, segments, segments]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={{
                    uTime: { value: 0 },
                    uOpacity: {value: 1 },
                    uPlaneNoiseFactorX: { value: 0.5 },
                    uPlaneNoiseFactorY: { value: 0.5 },
                    uPlaneNoiseFactorZ: { value: 0.5 },
                    uPlaneNoiseScale: {value: 5.0 },
                    uColorBottom: {value: new THREE.Color(0x45ed00)},
                    uColorTop: {value: new THREE.Color(0x66ffff)}
                }}
                blending={THREE.AdditiveBlending}
                transparent={true}
            />
        </mesh>
    </>
})

export default Aurora