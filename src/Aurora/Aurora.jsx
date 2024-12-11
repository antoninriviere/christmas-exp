import * as THREE from 'three'
import { createNoise2D } from 'simplex-noise'
import { useRef, useEffect } from 'react'

export default function Aurora({ width = 5, height = 1, segments = 32 }) {

    const mesh = useRef()

    useEffect(() => {
        if (mesh.current) {
            const geometry = mesh.current.geometry
            const position = geometry.attributes.position

            const noiseFactor = 0.5

            const noise2D = createNoise2D()

            for (let i = 0; i < position.count; i++) {
                const x = position.getX(i)
                const y = position.getY(i)
                const z = position.getZ(i)

                
                const noiseY = noise2D(x * 0.3, z * 0.3) * noiseFactor
                const noiseZ = noise2D(x * 0.2, y * 0.2) * noiseFactor

                position.setY(i, y + noiseY)
                position.setZ(i, z + noiseZ)
            }

            position.needsUpdate = true
        }
    }, [])


    return <>
        <mesh ref={mesh}>
            <planeGeometry args={[width, height, segments, segments]} />
            <meshStandardMaterial color="#f2f5ff" side={ THREE.DoubleSide } wireframe={true} />
        </mesh>
    </>
}