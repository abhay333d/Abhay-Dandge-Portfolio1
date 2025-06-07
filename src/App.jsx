import { Canvas } from "@react-three/fiber";
import React, { useEffect } from "react";
import Model from "./assets/Model.jsx";
import Experience from "./components/Experience.jsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface.jsx";

const App = () => {
  return (
    <Canvas shadows camera={{ position: [0, 2, 5], fov: 30 }}>
      <color attach="background" args={["#ececec"]} />
      {/* <Model /> */}
      <ScrollControls pages={4} damping={0.1}>
        <Experience />
        <Scroll html>
          <Interface />
        </Scroll>
      </ScrollControls>
    </Canvas>
  );
};

export default App;
