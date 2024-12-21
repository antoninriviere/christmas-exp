import * as THREE from 'three'

import { useRef } from 'react'

import { useThree } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'

import { ToneMapping, Vignette, EffectComposer, Bloom } from '@react-three/postprocessing'
import { BlendFunction, ToneMappingMode } from 'postprocessing'

import { useControls, } from 'leva'
import { Perf } from 'r3f-perf'

import Aurora from './Aurora/Aurora.jsx'
import Stars from './Stars/Stars.jsx'
import Snow from './Snow/Snow.jsx'
import Forest from './Forest/Forest.jsx'
import ChristmasTree from './ChristmasTree/ChristmasTree.jsx'



export default function Experience()
{
    const christmasTree = useRef()

    const { scene } = useThree()
    scene.fog = new THREE.FogExp2('#000826', 0.045) 

    const { showStats } = useControls('stats', {
        showStats: true
    })

    return <>
        { showStats && <Perf position="top-left" /> }

        <OrbitControls />

        <EffectComposer>
            <ToneMapping mode={ ToneMappingMode.ACES_FILMIC } />
            <Bloom luminanceThreshold={ 0 } mipmapBlur intensity={ 2 } />
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

        <Snow />
        {/* <Stars /> */}
        <Aurora />
        
        <group ref={christmasTree}>
            <ChristmasTree />
        </group>
        <Forest />

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 }>
            <planeGeometry args={[30, 30, 1, 1]}/>
            <meshStandardMaterial color="#f2f5ff" side={THREE.DoubleSide} />
        </mesh>


    </>
}