import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import Bird from '../components/Bird'

export default function BirdsPage() {
  const birds = useMemo(
    () =>
      new Array(2).fill().map((_, index) => {
        const x = 0
        const y = 0
        const z = 0
        const bird = 'ak'
        const speed = 5
        const factor =
          bird === 'ak'
          0.5

        return {
          key: index,
          index:index,
          position: [0, 0, 0],
          rotation: [0,0,0],
          speed,
          factor,
          url: `/glb/${bird}.glb`,
        }
      }),
    []
  )

  return (
    <Canvas camera={{ position: [0, 0, 0] }}>
      <ambientLight intensity={2} />
      <pointLight position={[40, 40, 40]} />
      <OrbitControls />
      <Suspense fallback={null}>
        {birds.map((props) => (
          <Bird {...props} key={props.key} index={props.index} />
        ))}
      </Suspense>
    </Canvas>
  )
}
