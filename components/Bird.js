import { useEffect, useRef, useState } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useAnimations, useGLTF } from '@react-three/drei'
import * as THREE from 'three'




export default function Bird({ speed,index, factor, url, ...props }) {
  const { nodes, materials } = useGLTF(url)
  const ref = useRef()
  // useEffect(
  //   () => void mixer.clipAction(animations[0], ref.current).play(),
  //   [mixer, animations, ref]
  // )

  const mat = new THREE.MeshStandardMaterial({
    color: new THREE.Color(1.000, 0.766, 0.336),
    roughness: .25,
    metalness: 1
  });

  const { viewport,camera } = useThree()
  const {width, height} = viewport.getCurrentViewport(camera, [0,0,0])
  

  const [data] = useState({
    // Randomly distributing the objects along the vertical
    y: THREE.MathUtils.randFloatSpread(height * 2),
    // This gives us a random value between -1 and 1, we will multiply it with the viewport width
    x: THREE.MathUtils.randFloatSpread(1),

    z:THREE.MathUtils.randFloatSpread(-1000,-500),
    // How fast objects spin
    spin: THREE.MathUtils.randFloat(8, 12),
    // Some random rotations
    rX: Math.random() * Math.PI,
    rZ: Math.random() * Math.PI
  })
  

  // useFrame executes 60 times per second
  useFrame((state, dt) => {
    // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
    // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
    // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
    if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x * width, (data.y += dt * 40), data.z)
    // Rotate the object around
    console.log(ref.current.position)
    ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
    // If they're too far up, set them back to the bottom
    if (data.y > height * (index === 0 ? 1 : 2)) data.y = -(height * (index === 0 ? 3 : 2))
  })

  return (
    <group position={[0,0,0]} scale={10} ref={ref} {...props} dispose={null}>
      <mesh geometry={nodes.Cube_001_Cube_002.geometry} material={mat} />
      <mesh geometry={nodes.Cube_002_Cube_004.geometry} material={mat} />
      <mesh geometry={nodes.Cube_003_Cube.geometry} material={mat} />
      <mesh geometry={nodes.Cube_Cube_001.geometry} material={mat} />
    </group>
  )
}
