import Slides from "./components/Slides";
import { Canvas } from "@react-three/fiber";

function App() {
  return (
    <div className="App">
      <Canvas>
        <Slides />
      </Canvas>
    </div>
  );
}

export default App;
