import { useControls } from 'leva'

export default function Lights() {
    const { directionalIntensity, hemisphereIntensity, spotIntensity, spotPenumbra, spotAngle } = useControls('Lights', {
        directionalIntensity: {
            label: 'directional',
            value: 0.2,
            step: 0.01,
            min: 0,
            max: 2,
        },
        hemisphereIntensity: {
            label: 'hemisphere',
            value: 0.025,
            step: 0.001,
            min: 0,
            max: 0.1,
        },
        spotIntensity: {
            label: 'spot',
            value: 16,
            step: 1,
            min: 0,
            max: 30,
        },
        spotPenumbra: {
            label: 'spot penumbra',
            value: 1,
            step: 0.01,
            min: 0,
            max: 1,
        },
        spotAngle: {
            label: 'spot angle',
            value: 1,
            step: 0.1,
            min: 0,
            max: Math.PI / 2,
        },
    }, {
        collapsed: true
    })

    return <>
        <directionalLight 
            color="#9bbcf0" // light blue
            intensity={directionalIntensity} 
            position={[ 1, 2, 3 ]} 
        />

        <hemisphereLight 
            skyColor="#101628" // dark blue
            groundColor="#000000"
            intensity={hemisphereIntensity}
        />

        <spotLight
            color="#9bbcf0"
            intensity={spotIntensity}
            position={[0, 6, 0]}
            angle={spotAngle}
            penumbra={spotPenumbra}
        />
    </>
}