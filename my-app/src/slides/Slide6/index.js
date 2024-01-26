import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";

const KEYCODE_SPACE = 32;

function Slide() {
  const [action, setAction] = useState(0);
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  const registerKeyPress = useCallback(
    (e) => {
      if (e.keyCode === KEYCODE_SPACE) {
        setAction((c) => c + 1);
      }
    },
    [setAction]
  );

  useFrame((_state, delta) => {
    ref.current.iTime += delta;
  });

  useEffect(() => {
    window.addEventListener("keydown", registerKeyPress);

    // Clean event listener
    return () => {
      window.removeEventListener("keydown", registerKeyPress);
    };
  }, [action, registerKeyPress]);

  return (
    <>
      {action === 0 && (
        <Html
          className="w-100 s6__dependency"
          position={[-viewport.width * 0.24, viewport.height * 0.225, 0]}
        >
          <img src="./black_hole.png" alt="folder" />
        </Html>
      )}
      {action === 1 && (
        <>
          <Html
            className="w-100 s6__dependency"
            position={[-viewport.width * 0.05, viewport.height * 0.1, 0]}
          >
            <img src="./d_nanoid.png" alt="folder" />
          </Html>
          <Html
            className="w-100 s6__dependency"
            position={[-viewport.width * 0.05, -viewport.height * 0.1, 0]}
          >
            <img src="./d_react.png" alt="folder" />
          </Html>
        </>
      )}
      {action === 2 && (
        <Html
          className="w-100 s4__folder"
          position={[-viewport.width * 0.4, viewport.height * 0.42, 0]}
        >
          <img src="./d_vue.png" alt="folder" />
        </Html>
      )}
      {(action === 3 || action === 4) && (
        <Html
          className="w-100 s4__folder"
          position={[-viewport.width * 0.35, viewport.height * 0.35, 0]}
        >
          <div
            className={`s6__kuzzle__wrapper ${
              action === 4 ? "s6__kuzzle__wrapper__zoom" : ""
            }`}
          >
            <img
              className={`s6__kuzzle__image ${
                action === 4 ? "s6__kuzzle__image__zoom" : ""
              }`}
              src="./d_kuzzle.png"
              alt="kuzzle"
            />
          </div>
        </Html>
      )}
      <Html position={[-viewport.width * 0.95, viewport.height * 0.4, 0]}>
        <div className="s6__title">In the</div>
      </Html>
      <Html position={[-viewport.width * 0.15, viewport.height * 0.25, 0]}>
        <div className="s6__title">black hole</div>
      </Html>
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          6 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={1.1}
          x={0.5}
          y={-1.2}
        />
      </mesh>
    </>
  );
}

export default Slide;
