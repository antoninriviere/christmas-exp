import * as THREE from 'three'

import { useRef } from 'react'

import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { ToneMapping, Vignette, EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'
console.log(ToneMappingMode)

import { useControls, } from 'leva'
import { Perf } from 'r3f-perf'

import Aurora from './Aurora/Aurora.jsx'
import Stars from './Stars/Stars.jsx'
import Forest from './Forest/Forest.jsx'



export default function Experience()
{
    const christmasTree = useRef()

    const { scene } = useThree()
    scene.fog = new THREE.FogExp2('#000826', 0.038) 

    const { showStats } = useControls('stats', {
        showStats: true
    })

    const { showGround } = useControls('ground', {
        showGround: true,
    })

    const { showTree, scale } = useControls('tree', {
        showTree: true,
        scale: {
            value: 4.5,
            min: 0,
            max: 4,
            step: 0.1
        }
    })

    const tree = useGLTF('./models/christmas-tree.glb')

    return <>
        { showStats && <Perf position="top-left" /> }

        <OrbitControls />

        <EffectComposer>
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
            <Bloom />
            <Vignette
                offset={ 0.3 }
                darkness={ 0.9 }
                blendFunction={ BlendFunction.NORMAL }
            />
        </EffectComposer>

        <directionalLight 
            color="#9bbcf0" // light blue
            intensity={0.2} 
            position={[ 1, 2, 3 ]} 
        />
        <hemisphereLight 
            skyColor="#101628" // dark blue
            groundColor="#000000"
            intensity={0.025}
        />

        <spotLight
            color="#9bbcf0"
            intensity={10}
            position={[0, 6, 0]}
            angle={1}
            penumbra={1}
            target={christmasTree.current}
        />

        <pointLight 
            color="#ffa000"
            intensity={3}        // Ajuste selon l’effet souhaité
            position={[3, 2, 0]}   // Supposons que le sapin est au centre à (0,0,0)
            distance={3}           // Distance jusqu’à laquelle la lumière éclaire
            decay={1}              // Comment la lumière s'atténue avec la distance
        />

        <Stars />
        <Aurora />
        
        { showTree && <primitive ref={christmasTree} object={ tree.scene } scale={scale} position={[0, 1.5, 0]} />}
        <Forest />

        { showGround && <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 }>
            <planeGeometry args={[30, 30, 1, 1]}/>
            <meshStandardMaterial color="#f2f5ff" side={THREE.DoubleSide} />
        </mesh> }


    </>
}