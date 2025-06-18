import { Canvas } from "@react-three/fiber";
import React, { useEffect, useState } from "react";
import Experience from "./components/Experience.jsx";
import { Scroll, ScrollControls } from "@react-three/drei";
import Interface from "./components/Interface.jsx";
import Menu from "./components/Menu.jsx";
import { Cursor } from "./components/Cursor.jsx";
import ScrollMannager from "./components/ScrollManager.jsx";

// const FullscreenButton = () => {
//   const handleFullscreen = () => {
//     const el = document.documentElement;
//     if (el.requestFullscreen) {
//       el.requestFullscreen();
//     } else if (el.webkitRequestFullscreen) {
//       el.webkitRequestFullscreen();
//     } else if (el.msRequestFullscreen) {
//       el.msRequestFullscreen();
//     }
//   };

//   return <button onClick={handleFullscreen}>Enter Fullscreen</button>;
// };

// const FullscreenButton = () => {
//   const [isFullscreen, setIsFullscreen] = useState(false);

//   useEffect(() => {
//     const handleChange = () => {
//       setIsFullscreen(
//         document.fullscreenElement ||
//         document.webkitFullscreenElement ||
//         document.msFullscreenElement
//           ? true
//           : false
//       );
//     };
//     document.addEventListener("fullscreenchange", handleChange);
//     document.addEventListener("webkitfullscreenchange", handleChange);
//     document.addEventListener("msfullscreenchange", handleChange);
//     return () => {
//       document.removeEventListener("fullscreenchange", handleChange);
//       document.removeEventListener("webkitfullscreenchange", handleChange);
//       document.removeEventListener("msfullscreenchange", handleChange);
//     };
//   }, []);

//   const handleFullscreen = () => {
//     const el = document.documentElement;
//     if (el.requestFullscreen) {
//       el.requestFullscreen();
//     } else if (el.webkitRequestFullscreen) {
//       el.webkitRequestFullscreen();
//     } else if (el.msRequestFullscreen) {
//       el.msRequestFullscreen();
//     }
//   };

//   if (isFullscreen) return null;

//   return (
//     <button
//       onClick={handleFullscreen}
//       className="fixed bottom-8 right-8 z-50 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-400 via-amber-500 to-yellow-600 shadow-lg text-white font-bold text-lg flex items-center gap-2 hover:scale-105 hover:shadow-2xl transition-all duration-300"
//       style={{
//         backdropFilter: "blur(6px)",
//         border: "2px solid #fff7b2",
//       }}
//     >
//       <svg
//         xmlns="http://www.w3.org/2000/svg"
//         className="w-6 h-6"
//         fill="none"
//         viewBox="0 0 24 24"
//         stroke="currentColor"
//         strokeWidth={2}
//       >
//         <path
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           d="M4 8V4h4M20 8V4h-4M4 16v4h4M20 16v4h-4"
//         />
//       </svg>
//       Fullscreen
//     </button>
//   );
// };



const App = () => {
  const [section, setSection] = useState(0);
  const [menuOpened, setMenuOpened] = useState(false);

  useEffect(() => {
    setMenuOpened(false);
  }, [section]);

  return (
    <>
      {/* <FullscreenButton/> */}
      <Canvas shadows camera={{ position: [1, 2, 5], fov: 40 }}>
        <color attach="background" args={["#ececec"]} />
        {/* <Model /> */}
        <ScrollControls pages={4} damping={0.1}>
          <ScrollMannager section={section} onSectionChange={setSection} />
          <Scroll>
            <Experience section={section} menuOpen={menuOpened} />
          </Scroll>
          <Scroll html>
            <Interface />
          </Scroll>
        </ScrollControls>
      </Canvas>
      {/* <Menu
        onSectionChange={setSection} 
        menuOpened={menuOpened}
        setMenuOpened={setMenuOpened}
      /> */}
      <Cursor />
    </>
  );
};

export default App;
