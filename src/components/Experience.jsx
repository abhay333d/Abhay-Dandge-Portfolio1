import {
  ContactShadows,
  Environment,
  Float,
  MeshDistortMaterial,
  MeshWobbleMaterial,
  OrbitControls,
  Plane,
  Sky,
  Sparkles,
} from "@react-three/drei";
import React, { useEffect, useState, useRef } from "react";
import { Avatar3 } from "../assets/Avatar3.jsx";
import { useControls } from "leva";
import { Castle } from "../assets/Castle.jsx";
import { motion } from "framer-motion-3d";
import { useThree } from "@react-three/fiber";

const Experience = (props) => {
  const { section } = props;
  const { viewport } = useThree();

  // Main Avatar animation controller via Leva
  const { animation } = useControls({
    animation: {
      value: "Sitting",
      options: ["Sitting", "Falling", "FallingRolling", "Standing"],
    },
  });

  // Skills section Avatar animation state
  const [skillsAnimation, setSkillsAnimation] = useState("Falling");
  const prevSection = useRef(section);

  useEffect(() => {
    // Entering skills section
    if (section === 1 && prevSection.current !== 1) {
      setSkillsAnimation("FallingRolling");
      const timer = setTimeout(() => {
        setSkillsAnimation("Standing");
      }, 1900);
      prevSection.current = section;
      return () => clearTimeout(timer);
    }
    // Leaving skills section (to section 0)
    if (section === 0 && prevSection.current === 1) {
      setSkillsAnimation("Falling");
    }
    prevSection.current = section;
  }, [section]);

  return (
    <>
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
      {/* <OrbitControls /> */}

      {/* Main Avatar and Castle section */}
      <motion.group
        position={[0.4, 1, 3]}
        scale={0.38}
        rotation-y={(Math.PI / 6) * 0.4}
        animate={{
          y: section === 0 ? 1 : 0.9,
        }}
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
        <Avatar3 position={[0.3, 0.02, -0.8]} animation={animation} />
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

        {/* Optional floating meshes can be re-enabled here */}
        {/* <Float>
          <mesh position={[1, -3, -15]} scale={2}>
            <sphereGeometry />
            <MeshDistortMaterial
              opacity={0.8}
              transparent
              distort={0.4}
              speed={4}
              color={"red"}
            />
          </mesh>
        </Float> */}

        <Sparkles
          size={4}
          count={80}
          scale={[8, 6, 8]}
          speed={1}
          color={"#cea51e"}
        />

        <group position={[1.5, -0.1, -2]}  >
          <Avatar3
            animation={skillsAnimation}
            // Change position and scale when animation is "Standing"
            position={
              skillsAnimation === "Standing" ? [0.5, -2.3, 0] : [0, 0, 0]
            }
            scale={skillsAnimation === "Standing" ? 2 : 1}
            headFollowCursor={true}
          />
        </group>
      </motion.group>
    </>
  );
};

export default Experience;
