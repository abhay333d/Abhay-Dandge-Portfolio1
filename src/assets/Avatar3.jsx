import React, { useEffect, useRef } from "react";
import { useFrame, useGraph } from "@react-three/fiber";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";
import { useControls } from "leva";
import * as THREE from "three";

export function Avatar3({ animation, ...props }) {
  // const { HeadFollow, CursorFollow, WireFrame } = useControls({
  //   HeadFollow: false,
  //   CursorFollow: true,
  //   WireFrame: false,
  // });

  const group = useRef();
  // Remove useControls and hardcode the values
  const HeadFollow = false;
  const CursorFollow = true;
  const WireFrame = false;
  const raycaster = useRef(new THREE.Raycaster());
  const plane = useRef(new THREE.Plane(new THREE.Vector3(0, 0, 1), -1)); // plane 1 unit in front

  const { scene } = useGLTF("models/avatar3.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);

  const { animations: Sitting } = useFBX("fbx/animations/Sitting.fbx");
  const { animations: Falling } = useFBX("fbx/animations/Falling_Idle.fbx");
  const { animations: FallRoll } = useFBX("fbx/animations/Falling_To_Roll.fbx");
  const { animations: Standing } = useFBX("fbx/animations/Happy_Idle.fbx");

  Sitting[0].name = "Sitting";
  Falling[0].name = "Falling";
  FallRoll[0].name = "FallingRolling";
  Standing[0].name = "Standing";

  const { actions } = useAnimations(
    [Sitting[0], Falling[0], FallRoll[0], Standing[0]],
    group
  );

  useFrame((state) => {
    const targetBone =
      props.headFollowCursor && CursorFollow
        ? group.current?.getObjectByName("Head")
        : group.current?.getObjectByName("Neck");
    if (!targetBone) return;

    if (animation === "FallingRolling") return;

    if (CursorFollow) {
      raycaster.current.setFromCamera(state.pointer, state.camera);

      const boneWorld = new THREE.Vector3();
      targetBone.getWorldPosition(boneWorld);
      plane.current.setFromNormalAndCoplanarPoint(
        new THREE.Vector3(0, 0, 1).applyQuaternion(state.camera.quaternion),
        boneWorld.clone().add(new THREE.Vector3(0, 0, 1))
      );

      const intersection = new THREE.Vector3();
      raycaster.current.ray.intersectPlane(plane.current, intersection);
      if (intersection) targetBone.lookAt(intersection);
    }

    if (HeadFollow && !CursorFollow) {
      targetBone.lookAt(state.camera.position);
    }
  });

  useEffect(() => {
    const action = actions[animation];
    if (action) {
      action.reset().fadeIn(0.1).play();
      return () => action.fadeOut(1);
    }
  }, [animation, actions]);

  useEffect(() => {
    Object.values(materials).forEach((mat) => {
      mat.wireframe = WireFrame;
    });
  }, [WireFrame, materials]);

  return (
    <group
      {...props}
      ref={group}
      dispose={null}
      rotation-x={-Math.PI / 2}
      // position={[0.3, 0.02, -0.8]}
    >
      <primitive object={nodes.Hips} />
      <skinnedMesh
        name="Wolf3D_Avatar"
        geometry={nodes.Wolf3D_Avatar.geometry}
        material={materials.Wolf3D_Avatar}
        skeleton={nodes.Wolf3D_Avatar.skeleton}
        morphTargetDictionary={nodes.Wolf3D_Avatar.morphTargetDictionary}
        morphTargetInfluences={nodes.Wolf3D_Avatar.morphTargetInfluences}
      />
    </group>
  );
}

useGLTF.preload("models/avatar3.glb");
