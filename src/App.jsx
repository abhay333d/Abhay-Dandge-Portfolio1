import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import Experience from "./components/Experience.jsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface.jsx";
import ScrollMannager from "./components/ScrollMannager.jsx";
import Menu from "./components/Menu.jsx";
import { MotionConfig } from "framer-motion";
import { Cursor } from "./components/Cursor.jsx";

const App = () => {
  const [section, setSection] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [section]);

  return (
    <>
      <Canvas shadows camera={{ position: [1, 2, 5], fov: 40 }}>
        <color attach="background" args={["#ececec"]} />
        {/* <Model /> */}
        <ScrollControls pages={4} damping={0.1}>
          <ScrollMannager section={section} onSectionChange={setSection} />
          <Scroll>
            <Experience section={section} menuOpen={menuOpen} />
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
      <Cursor />
    </>
  );
};

export default App;
