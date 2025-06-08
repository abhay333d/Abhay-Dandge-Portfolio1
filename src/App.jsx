import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import Model from "./assets/Model.jsx";
import Experience from "./components/Experience.jsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface.jsx";
import ScrollMannager from "./components/ScrollMannager.jsx";
import Menu from "./components/Menu.jsx";
import { MotionConfig } from "framer-motion";

const App = () => {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  return (
    <>
      <MotionConfig
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 15,
          mass: 5,
          restDelta: 0.0001,
        }}
      >
        <Canvas shadows camera={{ position: [1, 2, 5], fov: 40 }}>
          <color attach="background" args={["#ececec"]} />
          {/* <Model /> */}
          <ScrollControls pages={4} damping={0.1}>
            <ScrollMannager section={section} onSectionChange={setSection} />
            <Scroll>
              <Experience section={section} />
            </Scroll>
            <Scroll html>
              <Interface />
            </Scroll>
          </ScrollControls>
        </Canvas>
        <Menu
          onSectionChange={setSection}
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
        />
      </MotionConfig>
    </>
  );
};

export default App;
