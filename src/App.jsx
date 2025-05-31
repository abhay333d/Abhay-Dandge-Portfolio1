import { OrbitControls, useAnimations, useFBX, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import Model from './assets/Model.jsx'

const App = () => {
  return (
    <Canvas>
      <OrbitControls />
      <directionalLight intensity={2} position={[10, 10, 10]} />
      <pointLight intensity={2} position={[-10, -10, -10]} />
      <ambientLight intensity={1} />
      <Model />
    </Canvas>
  )
}

export default App
