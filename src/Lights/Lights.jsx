export default function Lights() {
    return <>
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
        />
    </>
}