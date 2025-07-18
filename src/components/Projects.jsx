import { Image, Text } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { animate, useMotionValue } from "framer-motion";
import { motion } from "framer-motion-3d";
import { atom, useAtom } from "jotai";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export const project = [
  {
    title: "Marble Race",
    url: "https://a-game-with-r3f.vercel.app/",
    image: "projects/MarbleRace.png",
    description: "A physics-based 3D marble game built with React-Three-Fiber.",
  },
  {
    title: "Portal Scene",
    url: "https://portal-scene-with-r3f-chi.vercel.app/",
    image: "projects/Portal.png",
    description: "A stylized Blender portal with shaders and R3F animation.",
  },
  {
    title: "Morphing",
    url: "https://particles-morphing-nu.vercel.app/",
    image: "projects/ParticlesMorphing.png",
    description: "Shader-driven particles that morph fluidly between shapes.",
  },
  {
    title: "Planets in AR",
    url: "https://planets-livid.vercel.app/",
    image: "projects/Planets.png",
    description: "An AR experience of planets using Three.js and MindAR.js.",
  },
  {
    title: "Earth",
    url: "https://earth-psi.vercel.app/",
    image: "projects/Earth.png",
    description: "A 3D Earth model with realistic shaders and lighting.",
  },
  {
    title: "Forever",
    url: "https://capstone-project-mern-frontend.onrender.com/",
    image: "projects/Forever.png",
    description: "A full-stack MERN e-commerce app with payments and auth.",
  },
  {
    title: "Portfolio",
    url: "https://abhay-dandge-portfolio.vercel.app/",
    image: "projects/Portfolio.png",
    description: "A 3D portfolio site showcasing my work and creativity.",
  },
];

const Project = (props) => {
  const { project, highlighted } = props;

  const background = useRef();
  const bgOpacity = useMotionValue(0.4);

  useEffect(() => {
    animate(bgOpacity, highlighted ? 0.7 : 0.4);
  }, [highlighted]);

  useFrame(() => {
    background.current.material.opacity = bgOpacity.get();
  });

  return (
    <group {...props} rotation={[0, 0.05 * Math.PI, 0]}>
      <mesh
        position-z={-0.01}
        onClick={() => window.open(project.url, "_blank")}
        ref={background}
      >
        <planeGeometry args={[2.2, 2.2]} />
        <meshBasicMaterial color="gold" transparent opacity={0.3} />
      </mesh>
      <Image
        scale={[2, 1.4, 1]}
        url={project.image}
        toneMapped={false}
        position-y={0.3}
      />
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.2}
        position={[-1, -0.4, 0]}
        color={"black"}
      >
        {project.title.toUpperCase()}
      </Text>
      <Text
        maxWidth={2}
        anchorX={"left"}
        anchorY={"top"}
        fontSize={0.1}
        position={[-1, -0.7, 0]}
        color={"black"}
      >
        {project.description}
      </Text>
    </group>
  );
};

export const currentProjectAtom = atom(Math.floor(project.length / 2));

const Projects = () => {
  const { viewport } = useThree();
  const [currentProject] = useAtom(currentProjectAtom);

  const isMobile = window.innerWidth < 768;

  return (
    <group
      position-y={isMobile ? -viewport.height * 2 : -viewport.height * 2 - 1}
    >
      {project.map((project, index) => (
        <motion.group
          key={"project_" + index}
          position={[index * 2.5, 0, -3]}
          animate={{
            x: isMobile
              ? 0 + (index - currentProject) * 1.5
              : 0 + (index - currentProject) * 2,
            y: currentProject === index ? 0 : -0.1,
            z: currentProject === index ? -1 : -3,
            rotateX: currentProject === index ? 0 : -Math.PI / 3,
            rotateZ: currentProject === index ? 0 : (-0.1 * Math.PI) / 3,
          }}
        >
          <Project
            project={project}
            highlighted={index === currentProject}
            position-y={0.7}
            scale={isMobile ? 0.55 : 0.8}
          />
        </motion.group>
      ))}
    </group>
  );
};

export default Projects;
