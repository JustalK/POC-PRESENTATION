import React, { useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import "./style.css";
import noiseMaterial from "./Materials/Noise";

function Background() {
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  useFrame((state, delta) => {
    ref.current.iTime += delta;
  });

  return (
    <>
      <Html className="w-100" position={[0, 1, 0]}>
        <div className="s1__title1">Les packages managers</div>
        <div className="s1__title2">&</div>
        <div className="s1__title3">leurs secrets</div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <noiseMaterial ref={ref} iResolution={[size.width, size.height, 1]} />
      </mesh>
    </>
  );
}

export default Background;
