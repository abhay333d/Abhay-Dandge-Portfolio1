import { OrbitControls, useGLTF } from '@react-three/drei'
import { Canvas } from '@react-three/fiber'
import React from 'react'

const App = () => {
  const model = useGLTF('/models/avatar1.glb')
  return (
    <>
      <Canvas>
        <OrbitControls />
        <directionalLight intensity={2} position={[10, 10, 10]} />
        <pointLight intensity={2} position={[-10, -10, -10]} />
        <ambientLight intensity={1} />
        <primitive object={model.scene} scale={3} position-y={-2.5} />
      </Canvas>
    </>
  )
}

export default App