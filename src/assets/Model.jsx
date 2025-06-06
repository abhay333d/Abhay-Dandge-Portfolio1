import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { useEffect } from "react";

const Model = () => {
  const { scene } = useGLTF("/models/Walking.glb");
  const { animations: IdleAnimations } = useFBX(
    "/fbx/Standing_Torch_Idle_02.fbx"
  );
  IdleAnimations[0].name = "Idle";

  const { actions } = useAnimations(IdleAnimations, scene);
  console.log(scene.children[0].children[0], actions);
  scene.children[0].children[0].rotateX(Math.PI / 2);

  useEffect(() => {
    actions["Idle"]?.reset().play();
  }, [actions]);

  return (
    <primitive
      object={scene}
      scale={3}
      position-y={0}
      rotation={[Math.PI / 2, Math.PI, Math.PI]}
    />
  );
};

export default Model;
