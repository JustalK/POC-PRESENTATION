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
      <Html className="w-100" position={[-5.5, 3, 0]}>
        <div className="s1__title1">Les packages managers</div>
      </Html>
      <Html className="w-100" position={[-5.5, 2, 0]}>
        <div className="s1__title2">&</div>
      </Html>
      <Html className="w-100" position={[-4.75, 2, 0]}>
        <div className="s1__title3">leurs secrets</div>
      </Html>
      <Html className="w-100" position={[-1.15, 1.9, 0]}>
        <div className="s1__who">Par</div>
      </Html>
      <Html className="w-100" position={[-1.15, 1.7, 0]}>
        <div className="s1__who">Justal Kevin</div>
      </Html>
      <Html className="w-100" position={[5.0, -3.3, 0]}>
        <div className="s1__slide__number">1 / 20</div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <noiseMaterial ref={ref} iResolution={[size.width, size.height, 1]} />
      </mesh>
    </>
  );
}

export default Background;
