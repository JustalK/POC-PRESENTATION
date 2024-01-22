import { useState, useEffect, useCallback } from "react";
import Slide1 from "../../slides/Slide1";
import Slide2 from "../../slides/Slide2";

function App() {
  const [slide, setSlide] = useState(0);

  const registerKeyPress = useCallback((e) => {
    setSlide((s) => s + 1);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", registerKeyPress);
  });

  return (
    <>
      {slide % 2 === 0 && <Slide2 />}
      {slide % 2 === 1 && <Slide1 />}
    </>
  );
}

export default App;
