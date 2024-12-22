import * as THREE from 'three'
import { useMemo } from 'react'
import { Clone, useGLTF } from '@react-three/drei'

export default function Forest() {
  const snowPine = useGLTF('./models/snow-pine.glb')
  const pine = useGLTF('./models/pine.glb')

  const models = useMemo(() => ({
    snowPine: snowPine.scene,
    pine: pine.scene
  }), [snowPine, pine])

  const trees = useMemo(() => {
    const treesArray = []
    for (let i = 0; i < 60; i++) {
      const isPine = Math.random() < 0.3

      const scales = [
        { scale: 2.5, yPos: 0.125 },
        { scale: 3, yPos: 0.35 },
        { scale: 3.5, yPos: 0.5 }
      ]

      const { scale, yPos } = scales[Math.floor(Math.random() * scales.length)]

      let position

      do {
        position = [
          (Math.random() - 0.5) * 20,
          yPos,
          (Math.random() - 0.5) * 20
        ]
      } while (Math.sqrt(position[0] ** 2 + position[2] ** 2) < 6)

      treesArray.push({ isPine, scale, position })
    }
    return treesArray
  }, [])

  return (
    <>
      {trees.map((tree, index) => (
        <Clone
          key={index}
          object={tree.isPine ? models.pine : models.snowPine}
          scale={tree.scale}
          position={tree.position}
        />
      ))}
    </>
  )
}

useGLTF.preload('./models/snow-pine.glb')
useGLTF.preload('./models/pine.glb')
