import * as THREE from 'three'
import React, { useState } from 'react'

import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Physics, RigidBody, CylinderCollider } from '@react-three/rapier'

import { useControls, } from 'leva'
import { Perf } from 'r3f-perf'

import Lights from './Lights/Lights.jsx'
import Postprocessing from './Postprocessing/Postprocessing.jsx'
import Aurora from './Aurora/Aurora.jsx'
import Stars from './Stars/Stars.jsx'
import Snow from './Snow/Snow.jsx'
import Forest from './Forest/Forest.jsx'
import ChristmasTree from './ChristmasTree/ChristmasTree.jsx'
import Presents from './Presents/Presents.jsx'



export default function Experience()
{
    const { scene } = useThree()
    scene.fog = new THREE.FogExp2('#000826', 0.045) 

    const { showStats } = useControls('stats', {
        showStats: true
    })

    const [presents, setPresents] = useState([])

    const handleFloorClick = (event) => {
        if (presents.length >= 6) return

        const { point } = event

        const newPresent = {
            // y = 10 so the present falls from the sky
            position: [point.x, 8, point.z],
            // random model between 1 and 3
            model: Math.floor(Math.random() * 3) + 1,
            // random scale
            scale: [0.6 + Math.random() * 0.7, 0.5 + Math.random() * 0.9, 0.5 + Math.random() * 0.5],
        }

        setPresents([...presents, newPresent])
    }

    return <>
        { showStats && <Perf position="top-left" /> }

        <OrbitControls />

        <Postprocessing />

        <Lights />

        <Snow />
        {/* <Stars /> */}
        <Aurora />
        
        <Forest />

        <Physics debug={false}>
            <RigidBody type="fixed" restitution={0.2}>
                <mesh
                    position-y={ - 1 }
                    onClick={handleFloorClick}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    <boxGeometry args={[30, 0.5, 30]}/>
                    <meshStandardMaterial color="#f2f5ff" side={THREE.DoubleSide} />
                </mesh>
            </RigidBody>

            <RigidBody type="fixed" colliders={ false } restitution={0.2}>
                <ChristmasTree />
                <CylinderCollider args={ [ 3, 1 ] } position={[0, 1.8, 0]} />
            </RigidBody>

            <Presents presents={presents}/>
        </Physics>

    </>
}