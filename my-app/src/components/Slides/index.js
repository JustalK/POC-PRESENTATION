import { useState, useEffect, useCallback } from "react";
import Slide1 from "../../slides/Slide1";
import Slide2 from "../../slides/Slide2";
import Slide3 from "../../slides/Slide3";
import Slide4 from "../../slides/Slide4";

const KEYCODE_RIGHT = 39;
const KEYCODE_LEFT = 37;

function App() {
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
      {slide === 1 && <Slide1 />}
      {slide === 2 && <Slide2 />}
      {slide === 3 && <Slide3 />}
      {slide === 4 && <Slide4 />}
    </>
  );
}

export default App;
