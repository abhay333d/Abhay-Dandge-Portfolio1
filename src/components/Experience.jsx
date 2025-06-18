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
  const { viewport, gl } = useThree();
  const data = useScroll();

  const isMobile = window.innerWidth < 768;
  const responsiveRatio = viewport.width / 12;

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
    const lookAtTarget = new THREE.Vector3(cameraLookAtX.get(), 0, 0);
    state.camera.lookAt(lookAtTarget);

    const position = new THREE.Vector3();
    characterContainerAboutRef.current.getWorldPosition(position);
  });

  const [charAnimation, setCharAnimation] = useState("Sitting");

  useEffect(() => {
    setCharAnimation("Falling");
    setTimeout(() => {
      setCharAnimation(section === 0 ? "Sitting" : "Standing");
    }, 600);
  }, [section]);

  return (
    <>
      <motion.group
        position={[0.47, 0.985, 2.7]}
        animate={"" + section}
        transition={{ duration: 0.6 }}
        rotation={[-0, 0.20943951023931948, -0]}
        variants={{
          0: {
            scaleX: 0.4,
            scaleY: 0.4,
            scaleZ: 0.4,
          },
          1: {
            y: -viewport.height,
            x: 1,
            z: 2,
            rotateX: 0,
            rotateY: 0,
            rotateZ: 0,
            scale: 0.8,
          },
          2: {
            x: -0.3,
            y: -viewport.height * 2 + 1,
            z: 2,
            rotateX: 0,
            rotateY: Math.PI / 2,
            rotateZ: 0,
            scale: 0.5,
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

      {/* --- Custom Sky and Lighting Setup --- */}
      {(() => {
        const azimuth = 180; // degrees
        const elevation = -2.2; // degrees

        const phi = THREE.MathUtils.degToRad(90 - elevation);
        const theta = THREE.MathUtils.degToRad(azimuth);

        const sun = new THREE.Vector3().setFromSphericalCoords(1, phi, theta);

        return (
          <>
            <Sky
              distance={950000}
              sunPosition={sun.toArray()}
              turbidity={7.5}
              rayleigh={1.9}
              mieCoefficient={0.038}
              mieDirectionalG={0.95}
              inclination={0}
              azimuth={180}
            />
            {/* Optional visual helper:
            <sprite position={sun.toArray()} scale={[10, 10, 1]}>
              <spriteMaterial
                attach="material"
                color="#fff7b2"
                opacity={1}
                transparent
              />
            </sprite> */}
          </>
        );
      })()}

      {/* Comment out to avoid overriding Sky gradient */}
      <Environment preset="sunset" />

      <motion.group
        ref={characterContainerAboutRef}
        position={[0.4, 1, 3]}
        scale={0.38}
        rotation-y={(Math.PI / 6) * 0.4}
        animate={{ y: section === 0 ? 1 : 0.9 }}
      >
        <Castle
          scale={0.004}
          position={[0, 0, -2]}
          rotation-y={0.5}
          section={section}
        />
      </motion.group>

      <motion.group
        ref={characterContainerAboutRef}
        position={[0.4, 1, 3]}
        scale={0.38}
        rotation-y={(Math.PI / 6) * 0.4}
        animate={{ y: section === 0 ? 1 : 0.9 }}
      >
      <Sparkles
        size={4}
        count={500}
        scale={[8, 60, 10]}
        speed={1}
        color={"#cea51e"}
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
      />

      <Projects />
    </>
  );
};

export default Experience;
