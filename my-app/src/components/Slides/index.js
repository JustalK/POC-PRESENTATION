import { useState, useEffect, useCallback } from "react";
import OneSlide from "../../slides";

const KEYCODE_RIGHT = 39;
const KEYCODE_LEFT = 37;

function Slides() {
  const [slide, setSlide] = useState(1);

  const registerKeyPress = useCallback(
    (e) => {
      if (e.keyCode === KEYCODE_RIGHT) {
        setSlide((s) => s + 1);
      }
      if (e.keyCode === KEYCODE_LEFT && slide >= 1) {
        setSlide((s) => s - 1);
      }
    },
    [slide]
  );

  useEffect(() => {
    window.addEventListener("keydown", registerKeyPress);

    // Clean event listener
    return () => {
      window.removeEventListener("keydown", registerKeyPress);
    };
  });

  return (
    <>
      {Object.keys(OneSlide).map((e, index) => {
        const Type = OneSlide[e];
        return slide === index + 1 ? <Type /> : null;
      })}
    </>
  );
}

export default Slides;
