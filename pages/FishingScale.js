import * as THREE from 'three'
import React, { Suspense, useRef, useMemo, useState } from 'react'
import { Canvas, extend, useThree, useLoader, useFrame } from '@react-three/fiber'
import { OrbitControls, Sky } from '@react-three/drei'
import { Water } from 'three-stdlib'
import Bird from '../components/Bird'
import FishingRod from '../components/FishingRod'
extend({ Water })

function Ocean() {
  const ref = useRef()
  const gl = useThree((state) => state.gl)
  const waterNormals = useLoader(THREE.TextureLoader, './img/waterNormal.jpg')
  waterNormals.wrapS = waterNormals.wrapT = THREE.RepeatWrapping
  const geom = useMemo(() => new THREE.PlaneGeometry(10000, 10000), [])
  const config = useMemo(
    () => ({
      textureWidth: 512,
      textureHeight: 512,
      waterNormals,
      sunDirection: new THREE.Vector3(),
      sunColor: 0xffffff,
      waterColor: 0x001e0f,
      distortionScale: 3.7,
      fog: false,
      format: gl.encoding
    }),
    [waterNormals]
  )
  useFrame((state, delta) => (ref.current.material.uniforms.time.value += delta))
  return <water ref={ref} args={[geom, config]} rotation-x={-Math.PI / 2} />
}

function Box() {
  const ref = useRef()
  useFrame((state, delta) => {
    ref.current.position.y = 10 + Math.sin(state.clock.elapsedTime) * 20
    ref.current.rotation.x = ref.current.rotation.y = ref.current.rotation.z += delta
  })
  return (
    <mesh ref={ref} scale={20}>
      <boxGeometry />
      <meshStandardMaterial />
    </mesh>
  )
}

const easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2))



export default function FishinScale() {
const birds = useMemo(
    () =>
      new Array(20).fill().map((_, index) => {
       
        // const x =  Math.random() * 500
        // const y = 10 + Math.random() * 50
        const bird = 'ak'


        return {
          key: index,
        //   position: [x, y, z],
           rotation: [0, Math.PI/2, 0],

          url: `/glb/${bird}.glb`,
        }
      }),
    []
  )
  return (
    <Canvas camera={{ position: [0, 15, 110], fov: 50, near: 1, far: 20000 }}>
      <pointLight position={[100, 100, 100]} />
      <pointLight position={[-100, -100, -100]} />
      <Suspense fallback={null}>
        <Ocean />
       
        {birds.map((props) => (
          <Bird {...props} key={props.key} index={props.key} />
        ))}
     
      </Suspense>
      <FishingRod />
      <Sky scale={1000} sunPosition={[500, 100, -1000]} turbidity={1} />
      {/* <OrbitControls maxPolarAngle={1.5}/> */}
      {/* <OrbitControls /> */}
    </Canvas>
  )
}
