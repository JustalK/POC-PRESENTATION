import React, { useRef, useEffect, useCallback, useState } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import "./style.css";
// eslint-disable-next-line
import slideMaterial from "../../components/Materials";

const KEYCODE_SPACE = 32;

function Slide() {
  const [action, setAction] = useState(0);
  const [year, setYear] = useState(new Date());
  const { viewport } = useThree();
  const ref = useRef();
  const refTimer = useRef();
  const refTimerReverse = useRef();
  const { size } = useThree();

  const registerKeyPress = useCallback(
    (e) => {
      switch (action) {
        case 0:
          clearInterval(refTimer.current);
          break;
        case 1:
          comeBackInTime();
          break;
        default:
          clearInterval(refTimerReverse.current);
      }
      if (e.keyCode === KEYCODE_SPACE) {
        setAction((c) => c + 1);
      }
    },
    [action]
  );

  useFrame((_state, delta) => {
    switch (action) {
      case 1:
        ref.current.iTime += 0;
        break;
      case 2:
        ref.current.iTime -= delta * 20;
        break;
      default:
        ref.current.iTime += delta;
    }
  });

  const comeBackInTime = () => {
    refTimerReverse.current = setInterval(() => {
      setYear((prevDate) => new Date(prevDate.getTime() - 1234567891));
    }, 10);
  };

  const updateTime = useCallback(() => {
    refTimer.current = setInterval(
      () => setYear((prevDate) => new Date(prevDate.getTime() + 1000)),
      1000
    );
  }, []);

  useEffect(() => {
    if (action === 0 || action > 1) {
      updateTime();
    }
    window.addEventListener("keydown", registerKeyPress);

    // Clean event listener
    return () => {
      clearInterval(refTimer.current);
      window.removeEventListener("keydown", registerKeyPress);
    };
  }, [action, registerKeyPress, updateTime]);

  return (
    <>
      <Html position={[-viewport.width * 0.42, viewport.height * 0.315, 0]}>
        <div className="s3__title">A little bit of history</div>
      </Html>
      <Html
        className="w-100 s4__date"
        position={[viewport.width * 0.2, -viewport.height * 0.17, 0]}
      >
        {year.toLocaleString()}
      </Html>
      <Html
        className="w-100"
        position={[viewport.width * 0.45, -viewport.height * 0.44, 0]}
      >
        <div className="s1__slide__number">
          4 <span className="s1__slide__number__small">/ 20</span>
        </div>
      </Html>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[viewport.width, viewport.height, 32, 32]} />
        <slideMaterial
          ref={ref}
          iResolution={[size.width, size.height, 1]}
          angle={0.6}
          x={0.5}
          y={0.6}
        />
      </mesh>
    </>
  );
}

export default Slide;
