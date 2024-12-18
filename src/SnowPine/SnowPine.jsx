import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function SnowPine(props) {
  const { nodes, materials } = useGLTF('./models/snow-pine.glb')
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.group1839540034.geometry}
        material={materials.mat20}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh116569604.geometry}
        material={materials.mat11}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh116569604_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1852343849.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1852343849_1.geometry}
        material={materials.mat11}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh558928348.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh558928348_1.geometry}
        material={materials.mat11}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh302406045.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh302406045_1.geometry}
        material={materials.mat11}
      />
    </group>
  )
}

useGLTF.preload('./models/snow-pine.glb')

