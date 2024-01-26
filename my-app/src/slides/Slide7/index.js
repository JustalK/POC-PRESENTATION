import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";
// eslint-disable-next-line
import noiseMaterial from "../../components/Materials/Noise";

const KEYCODE_SPACE = 32;

function Slide() {
  const [action, setAction] = useState(0);
  const { viewport } = useThree();
  const [text1Loaded, setText1Loaded] = useState(false);
  const [_text2Loaded, setText2Loaded] = useState(false);
  const [drawio, setDrawio] = useState(false);
  const [graph, setGraph] = useState(false);
  const ref = useRef();
  const refNoise = useRef();
  const refNoise2 = useRef();
  const refText1 = useRef();
  const refText2 = useRef();
  const refText3 = useRef();
  const refText4 = useRef();
  const refsText = [refText1, refText2, refText3, refText4];
  const { size } = useThree();

  const registerKeyPress = useCallback(
    (e) => {
      if (e.keyCode === KEYCODE_SPACE) {
        switch (action) {
          case 0:
            setText2Loaded(true);
            break;
          case 1:
            setGraph(true);
            break;
          case 2:
            if (refsText.every((r) => r.current !== undefined)) {
              for (const r of refsText) {
                r.current.innerHTML = "";
              }
              typing([
                `const minimatch = require("minimatch")`,
                `const expand = require("brace-expansion")`,
                `console.log(minimatch("bar.foo", "*.foo"))`,
                `console.log(expand('file-{(a, b, c)}.jpg'))`,
              ]);
            }
            break;
          case 3:
            setText1Loaded(true);
            break;
          case 4:
            setDrawio(true);
            break;
          default:
        }
        setAction((c) => c + 1);
      }
    },
    [setAction, action]
  );

  useEffect(() => {
    window.addEventListener("keydown", registerKeyPress);

    return () => {
      window.removeEventListener("keydown", registerKeyPress);
    };
  }, [action, registerKeyPress]);

  useFrame((_state, delta) => {
    ref.current.iTime += delta;
    if (refNoise.current) {
      refNoise.current.iTime += delta;
    }
    if (refNoise2.current) {
      refNoise2.current.iTime += delta;
    }
  });

  const typing = (txt, index = 0, pos = 0) => {
    if (index !== txt.length - 1 || pos < txt[txt.length - 1].length - 1) {
      refsText[index].current.innerHTML += txt[index].charAt(pos);
      pos++;
      const newIndex = pos < txt[index].length ? index : index + 1;
      const newPos = index === newIndex ? pos++ : 0;
      setTimeout(() => {
        typing(txt, newIndex, newPos);
      }, 20);
    } else {
      refsText[index].current.innerHTML += txt[index].charAt(pos);
    }
  };

  return (
    <>
      <Html position={[viewport.width * 0.34, viewport.height * 0.42, 0]}>
        <div className="s7__title">Phantom dependency</div>
      </Html>
      <Html position={[-viewport.width * 0.0195, viewport.height * 0.2, 0]}>
        <div className={`s7__code ${text1Loaded ? "hide" : ""}`}>
          <div ref={refText1}></div>
          <div ref={refText2}></div>
          <br />
          <div ref={refText3}></div>
          <div ref={refText4}></div>
        </div>
      </Html>
      <Html position={[-viewport.width * 0.0195, viewport.height * 0.2, 0]}>
        <div className={`s7__code ${text1Loaded ? "" : "hide"}`}>
          <div>
            <span className="red">const</span> minimatch ={" "}
            <span className="purple">require</span>(
            <span className="blue">"minimatch"</span>)
          </div>
          <div>
            <span className="red">const</span> expand ={" "}
            <span className="purple">require</span>(
            <span className="blue">"brace-expansion"</span>)
          </div>
          <br />
          <div>
            console.<span className="purple">log</span>(minimatch(
            <span className="blue">"bar.foo"</span>,
            <span className="blue"> "*.foo"</span>))
          </div>
          <div>
            console.<span className="purple">log</span>(expand(
            <span className="blue">'file-&#123;(a, b, c)&#125;.jpg'</span>))
          </div>
        </div>
      </Html>
      {action > 2 && (
        <mesh
          opacity={0}
          position={[viewport.width * 0.10, viewport.height * 0.13, 0.1]}
        >
          <planeGeometry args={[3.5, 2.0, 32, 32]} />
          <noiseMaterial
            ref={refNoise}
            iResolution={[size.width, size.height, 1]}
            angle={1.0}
            x={0.5}
            y={1.35}
          />
        </mesh>
      )}
      {action > 0 && ( <><mesh
        opacity={0}
        position={[-viewport.width * 0.275, viewport.height * 0.13, 0.1]}
      >
        <planeGeometry args={[3.5, 2.0, 32, 32]} />
        <noiseMaterial
          ref={refNoise2}
          iResolution={[size.width, size.height, 1]}
          angle={1.0}
          x={0.5}
          y={1.35}
        />
      </mesh>
      <Html position={[-viewport.width * 0.4, viewport.height * 0.255, 0]}>
        <div className={`s7__code`}>
          &#123;<br />
            <span className="green space1">"name"</span>: "phantom-dependency",<br />
            <span className="green space1">"main"</span>: "index.js",<br />
            <span className="green space1">"scripts"</span>: &#123;<br />
            <span className="green space2">"start"</span>: "node index.js",<br />
            <span className="space1">&#125;</span>,<br />
            <span className="green space1">"dependencies"</span>: &#123;<br />
            <span className="green space2">"minimatch"</span>: "^5.1.0"<br />
            <span className="space1">&#125;</span><br />
          &#125;
        </div>
      </Html></>)}
      {graph && (<Html
            className="w-100 s6__dependency"
            position={[-viewport.width * 0.368, -viewport.height * 0.15, 0]}
          >
            <img src="./d_minimatch.png" alt="folder" />
          </Html>)}
      {drawio && (<Html
        className="w-100 s6__dependency"
        position={[viewport.width * 0.015, -viewport.height * 0.025, 0]}
      >
        <img src="./phantom.png" alt="folder" />
      </Html>)}
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          7 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={1.0}
          x={0.5}
          y={1.35}
        />
      </mesh>
    </>
  );
}

export default Slide;
