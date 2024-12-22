import { Clone, useGLTF } from '@react-three/drei'
import { RigidBody } from '@react-three/rapier'

export default function Presents({ presents }) {
    const present1 = useGLTF('./models/present-1.glb')
    const present2 = useGLTF('./models/present-2.glb')
    const present3 = useGLTF('./models/present-3.glb')

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
                    <RigidBody key={index} restitution={0.4}>
                        <Clone 
                            object={model.scene} 
                            position={present.position} 
                            scale={present.scale} 
                        />
                    </RigidBody>
                )
            })}
        </>
    )
}