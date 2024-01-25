import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";

const KEYCODE_SPACE = 32;

function Slide() {
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  useFrame((_state, delta) => {
    ref.current.iTime += delta;
  });

  return (
    <>
      <Html position={[-viewport.width * 0.42, viewport.height * 0.315, 0]}>
        <div className="s3__title">What is a package?</div>
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
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={0.0}
          x={0.5}
          y={1.35}
        />
      </mesh>
    </>
  );
}

export default Slide;
