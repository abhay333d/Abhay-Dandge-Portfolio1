import { useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import gsap from "gsap";
import React, { useEffect, useRef } from "react";

const ScrollMannager = (props) => {
  const { section, onSectionChange } = props;
  const data = useScroll();
  const lastScroll = useRef(0);
  const isAnimating = useRef(false);

  data.fill.classList.add("top-0");
  data.fill.classList.add("absolute");

  useEffect(() => {
    gsap.to(data.el, {
      duration: 1,
      scrollTop: section * data.el.clientHeight,
      onStart: () => {
        isAnimating.current = true;
      },
      onComplete: () => {
        isAnimating.current = false;
      },
    });
  }, [section]);

  useFrame(() => {
    if (isAnimating.current) {
      lastScroll.current = data.scroll.current;
      return;
    }
    const currentSection = Math.floor(data.scroll.current * data.pages);

    if (currentSection !== section) {
      onSectionChange(currentSection);
    }
    lastScroll.current = data.scroll.current;
  });

  return null;
};

export default ScrollMannager;
