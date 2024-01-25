import React, { useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";

function Background() {
  const [show, setShow] = useState(false);
  const [menu1, setMenu1] = useState(false);
  const [menu2, setMenu2] = useState(false);
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  useFrame((_state, delta) => {
    ref.current.iTime += delta;
  });

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  const handleMouseOver = (setMenu) => {
    setMenu(true);
  };

  const handleMouseOut = (setMenu) => {
    setMenu(false);
  };

  return (
    <>
      <Html
        className={show ? "s2__block s2__show" : "s2__block s2__hide"}
        position={[-viewport.width * 0.325, viewport.height * 0.1, 0]}
      >
        <img
          className="link"
          src="./box.png"
          alt="box"
          onMouseOver={(_e) => handleMouseOver(setMenu1)}
          onMouseOut={(_e) => handleMouseOut(setMenu1)}
        />
      </Html>
      {menu1 && (
        <>
          <Html
            className="w-100 s2__folder"
            position={[-viewport.width * 0.315, -viewport.height * 0.04, 0]}
          >
            <div className="s2__line" />
            <img src="./folder.png" alt="folder" />
            <div className="s2__t1">A bit of my life</div>
          </Html>
          <Html
            className="w-100 s2__folder"
            position={[-viewport.width * 0.315, -viewport.height * 0.14, 0]}
          >
            <div className="s2__line" />
            <img src="./folder.png" alt="folder" />
            <div className="s2__t1">What is a Package Manager?</div>
          </Html>
        </>
      )}
      <Html
        className={show ? "s2__block s2__show" : "s2__block s2__hide"}
        position={[-viewport.width * 0.175, viewport.height * 0.1, 0]}
      >
        <img
          className="link"
          src="./npm.png"
          alt="npm"
          onMouseOver={(_e) => handleMouseOver(setMenu2)}
          onMouseOut={(_e) => handleMouseOut(setMenu2)}
        />
      </Html>
      {menu2 && (
        <>
          <Html
            className="w-100 s2__folder"
            position={[-viewport.width * 0.155, -viewport.height * 0.04, 0]}
          >
            <div className="s2__line" />
            <img src="./folder.png" alt="folder" />
            <div className="s2__t1">How does it work?</div>
          </Html>
          <Html
            className="w-100 s2__folder"
            position={[-viewport.width * 0.155, -viewport.height * 0.14, 0]}
          >
            <div className="s2__line" />
            <img src="./folder.png" alt="folder" />
            <div className="s2__t1">In the black hole</div>
          </Html>
          <Html
            className="w-100 s2__folder"
            position={[-viewport.width * 0.155, -viewport.height * 0.24, 0]}
          >
            <div className="s2__line" />
            <img src="./folder.png" alt="folder" />
            <div className="s2__t1">
              The weaknesses: Phantom dependency, Doppelganger and Dependency
              confusion
            </div>
          </Html>
        </>
      )}
      <Html
        className={show ? "s2__block s2__show" : "s2__block s2__hide"}
        position={[-viewport.width * 0.025, viewport.height * 0.1, 0]}
      >
        <img className="link" src="./yarn.png" alt="yarn" />
      </Html>
      <Html
        className={show ? "s2__block s2__show" : "s2__block s2__hide"}
        position={[viewport.width * 0.15, viewport.height * 0.1, 0]}
      >
        <img className="link" src="./pnpm.png" alt="pnpm" />
      </Html>
      <Html
        className={show ? "s2__block s2__show" : "s2__block s2__hide"}
        position={[viewport.width * 0.3, viewport.height * 0.1, 0]}
      >
        <img className="link" src="./story.png" alt="story" />
      </Html>

      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          2 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={-0.35}
          x={0.5}
          y={0.35}
        />
      </mesh>
    </>
  );
}

export default Background;
