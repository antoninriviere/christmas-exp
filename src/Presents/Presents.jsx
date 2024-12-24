import { Clone, useGLTF } from '@react-three/drei'
import { RigidBody, CuboidCollider } from '@react-three/rapier'
import { useRef } from 'react'

export default function Presents({ presents }) {
    const present1 = useGLTF('./models/present-1.glb')
    const present2 = useGLTF('./models/present-2.glb')
    const present3 = useGLTF('./models/present-3.glb')

    const presentsRefs= useRef([])

    const onClickPresent = (index, event) => {
        event.stopPropagation()

        const present = presentsRefs.current[index]
        present.wakeUp()

        // reset speeds
        present.setLinvel({ x: 0, y: 0, z: 0 }, true)
        present.setAngvel({ x: 0, y: 0, z: 0 }, true)

        const { x, z } = present.translation()

        // get the distance to center (0, 0, 0)
        let direction = { x: 0 - x, z: 0 - z }

        // normalize vector to get 0 to 1 value
        const length = Math.sqrt(direction.x ** 2 + direction.z ** 2)
        if (length > 0) {
            direction.x = direction.x / length
            direction.z = direction.z / length
        }


        // apply force to the center
        const impulseRatio = Math.random() * 5
        present.applyImpulse({
            x: direction.x * impulseRatio,
            y: 4 + Math.random() * 6,
            z: direction.z * impulseRatio
        })

        // apply random rotation to add some fun
        present.applyTorqueImpulse({
            x: Math.random() - 0.5,
            y: Math.random() - 0.5,
            z: Math.random() - 0.5,
        })
    }

    return (
        <>
            {presents.map((present, index) => {
                let model
                switch (present.model) {
                    case 1:
                        model = present1
                        break
                    case 2:
                        model = present2
                        break
                    case 3:
                        model = present3
                        break
                    default:
                        model = present1
                }
                return (
                    <RigidBody
                        ref={el => presentsRefs.current[index] = el}
                        key={index}
                        restitution={0.4}
                        position={present.position}
                        scale={present.scale}
                        colliders={ false }
                    >
                        <Clone
                            object={model.scene} 
                            onClick={(event) => onClickPresent(index, event)}
                        />
                        <CuboidCollider args={ [ 0.5, 0.5, 0.5 ] } position={[0, -0.5, 0]} mass={1} />
                    </RigidBody>
                )
            })}
        </>
    )
}

useGLTF.preload('./models/present-1.glb')
useGLTF.preload('./models/present-2.glb')
useGLTF.preload('./models/present-3.glb')