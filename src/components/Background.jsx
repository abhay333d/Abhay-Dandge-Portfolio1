import { Sphere, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

const Background = () => {
  const material = useRef();
  const color = useRef({
    color: "#0a0a0f",
  });
  const data = useScroll();

  const tl = useRef();

  useFrame(() => {
    tl.current.progress(data.scroll.current);
    material.current.color = new THREE.Color(color.current.color);
  });

  useEffect(() => {
    tl.current = gsap.timeline();
    tl.current.to(color.current, { color: "#101018" });
    tl.current.to(color.current, { color: "#161621" });
    tl.current.to(color.current, { color: "#1e1e2a" });
  }, []);

  return (
    <group>
      <Sphere scale={30}>
        <meshBasicMaterial
          ref={material}
          side={THREE.BackSide}
          toneMapped={false}
        ></meshBasicMaterial>
      </Sphere>
    </group>
  );
};

export default Background;
