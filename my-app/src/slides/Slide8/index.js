import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";
import noiseMaterial from "../../components/Materials/Noise";

const KEYCODE_SPACE = 32;

function Slide() {
  const [text1Loaded, setText1Loaded] = useState(true);
  const { viewport } = useThree();
  const ref = useRef();
  const refNoise = useRef();
  const { size } = useThree();

  useFrame((_state, delta) => {
    ref.current.iTime += delta;
    if (refNoise.current) {
      refNoise.current.iTime += delta;
    }
  });

  return (
    <>
      <Html position={[-viewport.width * 0.45, viewport.height * 0.42, 0]}>
        <div className="s8__title">Doppelganger</div>
      </Html>
      <mesh
        opacity={0}
        position={[-viewport.width * 0.15, viewport.height * 0.13, 0.1]}
      >
        <planeGeometry args={[3.0, 3.0, 32, 32]} />
        <noiseMaterial
          ref={refNoise}
          iResolution={[size.width, size.height, 1]}
          angle={1.0}
          x={0.5}
          y={1.35}
        />
      </mesh>
      <Html position={[-viewport.width * 0.23, viewport.height * 0.26, 0]}>
        <div className={`s8__code`}>
          &#123;
          <br />
          <span className="green space1">"name"</span>: "doppelganger",
          <br />
          <span className="green space1">"main"</span>: "index.js",
          <br />
          <span className="green space1">"scripts"</span>: &#123;
          <br />
          <span className="green space2">"start"</span>: "echo \"test\"",
          <br />
          <span className="space1">&#125;</span>,<br />
          <span className="green space1">"dependencies"</span>: &#123;
          <br />
          <span className="green space2">"s3glob"</span>: "^0.1.1"
          <br />
          <span className="green space2">"unglob"</span>: "^0.1.2"
          <br />
          <span className="space1">&#125;</span>
          <br />
          &#125;
        </div>
      </Html>
      <Html position={[-viewport.width * 0.368, -viewport.height * 0.15, 0]}>
        <img src="./d_unglob.png" alt="folder" />
      </Html>
      <Html position={[viewport.width * 0.1, -viewport.height * 0.15, 0]}>
        <img src="./d_s3glob.png" alt="folder" />
      </Html>
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          8 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={1.6}
          x={0.5}
          y={1.95}
        />
      </mesh>
    </>
  );
}

export default Slide;
