import * as THREE from 'three'
import React, { useState, useEffect } from 'react'
import { Howl } from 'howler'

import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

import { Physics, RigidBody, CylinderCollider } from '@react-three/rapier'

import { useControls, } from 'leva'
import { Perf } from 'r3f-perf'

import Lights from './webgl/Lights/Lights.jsx'
import Postprocessing from './webgl/Postprocessing/Postprocessing.jsx'
import Aurora from './webgl/Aurora/Aurora.jsx'
import Stars from './webgl/Stars/Stars.jsx'
import Snow from './webgl/Snow/Snow.jsx'
import Forest from './webgl/Forest/Forest.jsx'
import ChristmasTree from './webgl/ChristmasTree/ChristmasTree.jsx'
import Presents from './webgl/Presents/Presents.jsx'



export default function Experience({debug = false, quality = 1, showIntro = true})
{
    const maxPresents = quality > 0 ? 9 : 
    const { scene } = useThree()
    scene.fog = new THREE.FogExp2('#000826', 0.045) 

    const { showStats } = useControls('Stats', {
        showStats: false
    }, {
        collapsed: true
    })

    const [presents, setPresents] = useState([])

    useEffect(() => {
        const sound = new Howl({
            src: ['./sounds/ice-dance.mp3'],
            autoplay: true,
            loop: true,
            volume: 0.5
        })

        sound.play()

        return () => {
            sound.stop()
        }
    }, [])

    const onClickFloor = (event) => {
        if (presents.length >= maxPresents) return

        const { point } = event

        const newPresent = {
            // y = 8 so the present falls from the sky
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

        { debug && <OrbitControls /> }

        {!showIntro && quality > 0 && <Postprocessing />}

        <Lights />

        <Snow />
        <Stars />
        <Aurora />
        
        { !showIntro && <Forest quality={quality}/> }

        <Physics debug={false}>
            <RigidBody type="fixed" restitution={0.2}>
                <mesh
                    position-y={ - 1 }
                    onClick={onClickFloor}
                    onPointerDown={(e) => e.stopPropagation()}
                >
                    <boxGeometry args={[50, 0.5, 50]}/>
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