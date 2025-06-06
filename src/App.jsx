import { Canvas } from '@react-three/fiber'
import React, { useEffect } from 'react'
import Model from './assets/Model.jsx'
import Experience from './Experience.jsx'

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
      <color attach="background" args={['#ececec']} />
      {/* <Model /> */}
      <Experience/>
    </Canvas>
  )
}

export default App
