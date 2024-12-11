import { OrbitControls } from '@react-three/drei'
import { useGLTF } from '@react-three/drei'
import { useControls } from 'leva'
import { Perf } from 'r3f-perf'

export default function Experience()
{
    const { showStats } = useControls('stats', {
        showStats: false
    })

    const { showGround } = useControls('ground', {
        showGround: true,
    })

    const { showTree, scale } = useControls('tree', {
        showTree: true,
        scale: {
            value: 2,
            min: 0,
            max: 4,
            step: 0.1
        }
    })

    const tree = useGLTF('./christmas-tree.glb')

    return <>
        { showStats && <Perf position="top-left" /> }

        <OrbitControls />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 4.5 } />
        <ambientLight intensity={ 1.5 } />

        { showTree && <primitive object={ tree.scene } scale={scale} />}

        {showGround && <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="#f2f5ff" />
        </mesh>}

    </>
}