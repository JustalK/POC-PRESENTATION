import React, { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";

function Slide() {
  const { viewport } = useThree();
  const ref = useRef();
  const { size } = useThree();

  useFrame((_state, delta) => {
    ref.current.iTime -= delta;
  });

  return (
    <>
      <Html position={[-viewport.width * 0.42, viewport.height * 0.315, 0]}>
        <div className="s4__title">NPM</div>
      </Html>
      <Html position={[-viewport.width * 0.42, -viewport.height * 0.2, 0]}>
        <div className="s4__subtitle">How does it work?</div>
      </Html>
      <Html position={[-viewport.width * 0.42, viewport.height * 0.0, 0]}>
        <img src="./user.png" alt="user" />
        <div className="s4__user__line" />
        <div className="s4__user__title">user</div>
      </Html>
      <Html
        className="w-100 s4__folder"
        position={[-viewport.width * 0.268, -viewport.height * 0.01, 0]}
      >
        <img src="./folder.png" alt="folder" />
        <div className="s4__t1">
          package.json
          <br />
          package-lock.json
        </div>
        <div className="s4__package__line" />
      </Html>
      <Html position={[-viewport.width * 0.015, viewport.height * 0.0, 0]}>
        <img src="./registry.png" alt="registry" />
        <div className="s4__registry__title">npm registry</div>
        <div className="s4__registry__line" />
      </Html>
      <Html
        className="w-100 s4__folder"
        position={[-viewport.width * 0.05, -viewport.height * 0.265, 0]}
      >
        <img src="./folder.png" alt="folder" />
        <div className="s4__t1">node_modules</div>
      </Html>
      <Html position={[-viewport.width * 0.019, viewport.height * 0.27, 0]}>
        <img src="./tar.png" alt="tar" />
        <div className="s4__tar__title">tarball uploaded</div>
        <div className="s4__tar__line" />
        <div className="s4__tar__line2" />
      </Html>
      <Html
        className="w-100 s4__folder"
        position={[viewport.width * 0.12, viewport.height * 0.25, 0]}
      >
        <img src="./folder.png" alt="folder" />
        <div className="s4__t1">package.json</div>
        <div className="s4__package2__line" />
        <div className="s4__package3__line" />
      </Html>
      <Html position={[viewport.width * 0.34, viewport.height * 0.27, 0]}>
        <img src="./user.png" alt="user" />
        <div className="s4__maintainer__title">library maintainer</div>
      </Html>
      <Html position={[viewport.width * 0.172, viewport.height * 0.04, 0]}>
        <img src="./gitClone.png" alt="gitClone" />
        <div className="s4__git__title">clone project</div>
      </Html>
      <Html
        className="w-100 s4__folder"
        position={[viewport.width * 0.12, -viewport.height * 0.265, 0]}
      >
        <img src="./folder.png" alt="folder" />
        <div className="s4__t1">package.json</div>
        <div className="s4__package2__line" />
        <div className="s4__package4__line" />
      </Html>
      <Html position={[viewport.width * 0.34, -viewport.height * 0.245, 0]}>
        <img src="./user.png" alt="user" />
        <div className="s4__maintainer__title">library contributor</div>
      </Html>
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          5 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={3.6}
          x={0.0}
          y={0.6}
        />
      </mesh>
    </>
  );
}

export default Slide;
