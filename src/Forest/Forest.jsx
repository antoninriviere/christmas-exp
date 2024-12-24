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
    for (let i = 0; i < 65; i++) {
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
          (Math.random() - 0.5) * 25,
          yPos,
          (Math.random() - 0.5) * 25
        ]
      } while (
        Math.sqrt(position[0] ** 2 + position[2] ** 2) < 5 || // circle in center to avoid
        (position[0] > -5 && position[0] < 5 && position[2] > 0 && position[2] < 12) // zone in front of camera to avoid x -5 to 5, z 0 to 8
      )

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

      <Clone object={models.snowPine} position={[2, 0.35, 10]} scale={[3, 3, 3]} />
      <Clone object={models.pine} position={[-2.5, 0.3, 11]} scale={[4, 4, 4]} />
      <Clone object={models.pine} position={[-0.65, 0.3, 11.25]} scale={[3, 3, 3]} />
      <Clone object={models.snowPine} position={[-3.65, 0.3, 10]} scale={[4, 4, 4]} />
    </>
  )
}

useGLTF.preload('./models/snow-pine.glb')
useGLTF.preload('./models/pine.glb')
