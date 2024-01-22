import React, { useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import spaceMaterial from "./Materials/Space";

function Background() {
  const { viewport } = useThree();
  const ref = useRef();
  const [iTexture] = useLoader(THREE.TextureLoader, ["./bg.jpeg"]);
  if (iTexture) {
    iTexture.wrapS = THREE.RepeatWrapping;
    iTexture.wrapT = THREE.RepeatWrapping;
  }
  const { size } = useThree();

  useFrame((state, delta) => {
    ref.current.uTime += delta;
    ref.current.iTime += delta;
  });

  return (
    <>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <spaceMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          iTexture={iTexture}
        />
      </mesh>
    </>
  );
}

export default Background;
