import * as THREE from 'three'
import { useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useControls, } from 'leva'
import { Perf } from 'r3f-perf'
import Aurora from './Aurora/Aurora.jsx'
import Stars from './Stars/Stars.jsx'
import Forest from './Forest/Forest.jsx'



export default function Experience()
{
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

        <Stars />
        <Aurora />
        
        { showTree && <primitive object={ tree.scene } scale={scale} position={[0, 1.5, 0]} />}
        <Forest />

        { showGround && <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 }>
            <planeGeometry args={[30, 30, 1, 1]}/>
            <meshStandardMaterial color="#f2f5ff" side={THREE.DoubleSide} />
        </mesh> }


    </>
}