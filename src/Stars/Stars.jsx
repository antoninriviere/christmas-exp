import { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'

export default function Stars() {
  const points = useMemo(() => {
    const positions = []
    const count = 300

    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 200
      const y = 8 + Math.random() * 50
      const z = -50 + Math.random() * -200

      positions.push(x, y, z)
    }
  
    return new Float32Array(positions)
  }, [])

  return (
    <Points positions={points}>
      <PointMaterial transparent color="white" size={0.25} fog={false} />
    </Points>
  )
}