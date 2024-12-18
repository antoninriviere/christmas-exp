import { useMemo } from 'react'
import { Points, PointMaterial } from '@react-three/drei'

export default function Stars() {
  const points = useMemo(() => {
    const positions = []
    const count = 1500

    for (let i = 0; i < count; i++) {
      // radius of the sphere
      const r = 70 + Math.random() * 200

      // theta is between 0 & π, phi 0 & 2π
      const u = Math.random()
      const v = Math.random()
      const theta = Math.acos(1 - 2 * u)
      const phi = 2 * Math.PI * v

      const x = r * Math.sin(theta) * Math.cos(phi)
      const y = r * Math.sin(theta) * Math.sin(phi)
      const z = r * Math.cos(theta)

      positions.push(x, y, z)
    }
    return new Float32Array(positions)
  }, [])

  return (
    <Points positions={points}>
      <PointMaterial transparent color="white" size={0.5} />
    </Points>
  )
}