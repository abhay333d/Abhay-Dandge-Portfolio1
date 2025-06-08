import {
  ContactShadows,
  Environment,
  OrbitControls,
  Plane,
  Sky,
} from "@react-three/drei";
import React from "react";
import { Avatar3 } from "../assets/Avatar3.jsx";
import { useControls } from "leva";
import { Castle } from "../assets/Castle.jsx";
import { motion } from "framer-motion-3d";

const Experience = (props) => {
  const { section } = props;
  const { animation } = useControls({
    animation: {
      value: "Sitting",
      options: [
        "Sitting",
        "Standing",
        "StartWalking",
        "Walking",
        "StopWalking",
        "Falling",
        "FallingRolling",
      ],
    },
  });

  return (
    <>
      <Sky />
      <Environment preset="sunset" />
      {/* <OrbitControls /> */}
      <motion.group
        position={[1, 1.15, 3]}
        scale={0.3}
        rotation-y={Math.PI / 6}
        animate={{
          y: section === 0 ? 1.15 : 0.9,
        }}
      >
        <ContactShadows
          opacity={0.4}
          scale={10}
          blur={1}
          far={10}
          resolution={256}
          color={"black"}
        />

        {/* <Walking /> */}
        {/* <Avatar1 /> */}
        <Avatar3
          animation={animation}
          position={
            animation === "Standing" ||
            animation === "Walking" ||
            animation === "StartWalking" ||
            animation === "StopWalking"
              ? [0.3, 0, 0.5]
              : [0.3, 0, -0.8]
          }
        />
        <Castle
          scale={0.004}
          position={[0, 0, -2]}
          rotation-y={0.5}
          section={section}
        />

        {/* {animation === "Sitting" && (
          <mesh scale={[0.8, 0.8, 0.8]} position={[0, 0.37, -0.3]}>
            <boxGeometry />
            <meshStandardMaterial color="White" />
          </mesh>
        )} */}

        {/* <mesh scale={5} rotation-x={-Math.PI / 2} position-y={-0.0001}>
          <planeGeometry />
          <meshStandardMaterial color="White" />
        </mesh> */}
      </motion.group>
    </>
  );
};

export default Experience;
