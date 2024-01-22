import React, { useRef } from "react";
import { useFrame, useThree, useLoader } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import "./style.css";
import slide3Material from "./Materials";

function Background() {
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  useFrame((state, delta) => {
    ref.current.iTime += delta;
  });

  return (
    <>
      <Html
        className="w-100"
        position={[-viewport.width * 0.45, viewport.height * 0.36, 0]}
      >
        <div className="s1__title1">Package Managers</div>
      </Html>
      <Html
        className="w-100"
        position={[-viewport.width * 0.45, viewport.height * 0.26, 0]}
      >
        <div className="s1__title2">&</div>
      </Html>
      <Html
        className="w-100"
        position={[-viewport.width * 0.39, viewport.height * 0.26, 0]}
      >
        <div className="s1__title3">Their secrets</div>
      </Html>
      <Html
        className="w-100"
        position={[-viewport.width * 0.1, viewport.height * 0.245, 0]}
      >
        <div className="s1__who">By Justal Kevin</div>
      </Html>
      <Html
        className="w-100"
        position={[-viewport.width * 0.1, viewport.height * 0.22, 0]}
      >
        <div className="s1__who">On 6 February 2024</div>
      </Html>
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          3 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slide3Material ref={ref} iResolution={[size.width, size.height, 1]} />
      </mesh>
    </>
  );
}

export default Background;
