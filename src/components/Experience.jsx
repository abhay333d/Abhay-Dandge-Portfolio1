import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  OrbitControls,
  Sky,
  Sparkles,
  useScroll,
} from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import { Avatar3 } from "../assets/Avatar3.jsx";
import { useControls } from "leva";
import { Castle } from "../assets/Castle.jsx";
import { motion } from "framer-motion-3d";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, scale, useMotionValue } from "framer-motion";
import { framerMotionConfig } from "../config.js";
import * as THREE from "three";
import Projects from "./projects.jsx";

const Experience = (props) => {
  const { menuOpen } = props;
  const { viewport } = useThree();
  const data = useScroll();

  const [section, setSection] = useState(0);

  const cameraPositionX = useMotionValue();
  const cameraLookAtX = useMotionValue();

  useEffect(() => {
    animate(cameraPositionX, menuOpen ? -1 : 1, { ...framerMotionConfig });
    animate(cameraLookAtX, menuOpen ? 3 : 0, { ...framerMotionConfig });
  }, [menuOpen]);

  const characterContainerAboutRef = useRef();

  useFrame((state) => {
    const currentSection = Math.floor(data.scroll.current * data.pages);

    if (currentSection !== section) {
      setSection(currentSection);
    }

    state.camera.position.x = cameraPositionX.get();
    state.camera.lookAt(cameraLookAtX.get(), 0, 0);

    const position = new THREE.Vector3();
    characterContainerAboutRef.current.getWorldPosition(position);
  });

  // const { animation } = useControls({
  //   animation: {
  //     value: "Sitting",
  //     options: ["Sitting", "Falling", "FallingRolling", "Standing"],
  //   },
  // });

  const [charAnimation, setCharAnimation] = useState("Sitting");

  useEffect(() => {
    setCharAnimation("Falling");
    setTimeout(() => {
      setCharAnimation(section === 0 ? "Sitting" : "Standing");
    }, 600);
  }, [section]);

  // const [skillsAnimation, setSkillsAnimation] = useState("Falling");
  // const [section2Animation, setSection2Animation] = useState("Standing");
  // const prevSection = useRef(section);

  // useEffect(() => {
  //   if (section === 1 && prevSection.current !== 1) {
  //     setSkillsAnimation("FallingRolling");
  //     const timer = setTimeout(() => {
  //       setSkillsAnimation("Standing");
  //     }, 1900);
  //   }

  //   if (section === 0 && prevSection.current === 1) {
  //     setSkillsAnimation("Falling");
  //   }

  //   if (section === 2 && prevSection.current !== 2) {
  //     setSection2Animation("FallingRolling");
  //     const timer = setTimeout(() => {
  //       setSection2Animation("Standing");
  //     }, 2000);
  //     return () => clearTimeout(timer);
  //   }

  //   prevSection.current = section;
  // }, [section]);

  return (
    <>
      <motion.group
        position={[0.47, 0.985, 2.7]}
        animate={"" + section}
        // headFollowCursor={true}
        // transition={{ duration: 0.6 }}
        transition={{ duration: 0.2 }}
        rotation={[-0, 0.20943951023931948, -0]}
        variants={{
          0: {
            scaleX: 0.4,
            scaleY: 0.4,
            scaleZ: 0.4,
            headFollowCursor: false,
          },
          1: {
            y: -viewport.height ,
            x: 1,
            z: 2,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.8,
            headFollowCursor: true,
          },
          2: {
            x: -2,
            y: -viewport.height * 2 + 0.5,
            z: 0,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scale: 0.6,
          },
          3: {
            y: -viewport.height * 3.7,
            x: 1.5,
            z: 1,
            rotateX: 0,
            rotateY: -Math.PI / 6,
            rotateZ: 0,
            scale: 2.2,
          },
        }}
      >
        <Avatar3 animation={charAnimation} headFollowCursor={section !== 2} />
      </motion.group>

      <Sky
        scale={[20, 30, 4]}
        position-z={1.5}
        turbidity={11.5}
        rayleigh={3.019}
        mieCoefficient={0.055}
        mieDirectionalG={0.95}
        elevation={-2.2}
        sunPosition={[0, -180, 0]}
      />

      <Environment preset="sunset" />

      <motion.group
        ref={characterContainerAboutRef}
        position={[0.4, 1, 3]}
        scale={0.38}
        rotation-y={(Math.PI / 6) * 0.4}
        animate={{ y: section === 0 ? 1 : 0.9 }}
      >
        <Sparkles
          size={4}
          count={60}
          scale={[8, 4, 10]}
          speed={1}
          color={"#cea51e"}
        />
        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color={"black"}
        />
        <Castle
          scale={0.004}
          position={[0, 0, -2]}
          rotation-y={0.5}
          section={section}
        />
      </motion.group>

      {/* Skills Section */}
      <motion.group
        section={section}
        position={[0, -1.5, -10]}
        animate={{
          x: section === 1 ? 0 : -viewport.width * 0.1,
          z: section === 1 ? 0 : -20,
          y: section === 1 ? -viewport.height : -5,
        }}
      >
        <directionalLight position={[-5, 3, 5]} intensity={0.4} />

        <Sparkles
          size={4}
          count={80}
          scale={[8, 6, 8]}
          speed={1}
          color={"#cea51e"}
        />

        {/* <group position={[1.5, -0.1, -2]}>
          <Avatar3
            animation={skillsAnimation}
            position={
              skillsAnimation === "Standing" ? [0.5, -2.3, 0] : [0, 0, 0]
            }
            scale={skillsAnimation === "Standing" ? 2 : 1}
            headFollowCursor={true}
          />
        </group> */}
      </motion.group>

      {/* Section 2 Avatar (e.g. Projects or Contact Section) */}
      <motion.group
        section={section}
        position={[0, -1.5, -20]}
        animate={{
          x: section === 2 ? 0 : viewport.width,
          y: section === 2 ? -viewport.height * 1.9 : -10,
          z: 0,
        }}
      >
        {/* <Avatar3
          animation={section2Animation}
          position={[0.5, -2.5, 0]}
          scale={section2Animation === "Standing" ? 2 : 1}
          headFollowCursor={true}
        /> */}
      </motion.group>
      <Projects/>
    </>
  );
};

export default Experience;
