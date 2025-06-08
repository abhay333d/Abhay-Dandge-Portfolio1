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
      options: ["Sitting", "Falling", "FallingRolling"],
    },
  });

  return (
    <>
      <Sky />
      <Environment preset="sunset" />
      {/* <OrbitControls /> */}
      <motion.group
        position={[0.4, 1, 3]}
        scale={0.38}
        rotation-y={Math.PI / 6 * 0.4}
        animate={{
          y: section === 0 ? 1 : 0.9,
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
        <Castle
          scale={0.004}
          position={[0, 0, -2]}
          rotation-y={0.5}
          section={section}
        />

        {/* Skills */}

        

        <Avatar3 animation={animation} />

      </motion.group>
    </>
  );
};

export default Experience;
