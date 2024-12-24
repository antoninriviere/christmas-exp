import * as THREE from 'three'

import React, { useRef } from 'react'
import { useGLTF } from '@react-three/drei'

export default function ChristmasTree(props) {
  const { nodes, materials } = useGLTF('./models/christmas-tree.glb')

  const redMaterial = <meshStandardMaterial color="#F53F30" emissive="#F53F30" emissiveIntensity={4} />
  const yellowMaterial = <meshStandardMaterial color="#d4fa19" emissive="#d4fa19" emissiveIntensity={6} />
  const blueMaterial = <meshStandardMaterial color="#1818cc" emissive="#4d4dff" emissiveIntensity={6} />

  return (
    <group {...props} dispose={null} scale={4.5} position={[0, 1.5, 0]} rotation-y={Math.PI * 0.35 }>
      <mesh
        geometry={nodes.group1089073295.geometry}
        // material={materials.mat8}
        // red one
      >
        {redMaterial}
      </mesh>
      <mesh
        geometry={nodes.group314590998.geometry}
        // material={materials.mat12}
        // yellow
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group214022184.geometry}
        // material={materials.mat2}
        // purple one
      >
        {blueMaterial}
      </mesh>
      <mesh
        geometry={nodes.group922588407.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group1410509470.geometry}
        // material={materials.mat2}
      >
        {blueMaterial}
      </mesh>
      <mesh
        geometry={nodes.group179461400.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group1832615123.geometry}
        // material={materials.mat8}
      >
        {redMaterial}
      </mesh>
      <mesh
        geometry={nodes.group411241951.geometry}
        // material={materials.mat8}
      >
        {redMaterial}
      </mesh>
      <mesh
        geometry={nodes.group1633066821.geometry}
        // material={materials.mat8}
      >
        {redMaterial}
      </mesh>

      <mesh
        geometry={nodes.group1164989660.geometry}
        // material={materials.mat8}
      >
        {redMaterial}
      </mesh>
      <mesh
        geometry={nodes.group1127207942.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group2051798186.geometry}
        // material={materials.mat2}
      >
        {blueMaterial}
      </mesh>
      <mesh
        geometry={nodes.group1084830891.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group75024073.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.group615263083.geometry}
        material={materials.mat10}
        // leaf
      />
      <mesh
        geometry={nodes.group148092846.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group667748054.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group558281359.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1540402439.geometry}
        material={materials.mat10}
      />
      <mesh
        geometry={nodes.group1263511113.geometry}
        material={materials.mat20}
        // wood
      />
      <mesh
        geometry={nodes.group1827880687.geometry}
        // material={materials.mat12}
      >
        {yellowMaterial}
      </mesh>
      <mesh
        geometry={nodes.mesh1781168731.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1781168731_1.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh948351503.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh948351503_1.geometry}
        material={materials.mat21}
        // candy
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh792452036.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh792452036_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh814621041.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh814621041_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1969426104.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1969426104_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh77345095.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh77345095_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1157521227.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh1157521227_1.geometry}
        material={materials.mat21}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh662924655.geometry}
        material={materials.mat8}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.mesh662924655_1.geometry}
        material={materials.mat21}
      />
    </group>
  )
}

useGLTF.preload('./models/christmas-tree.glb')