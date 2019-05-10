import React, { useState } from "react";
import Map from "./components/Map";
import CameraDetails from "./components/CameraDetails";

const App: React.FC = () => {
  const [camera, setCamera] = useState({});

  function handleCameraChange(newCamera: object) {
    setCamera(newCamera);
  }

  return (
    <div className="App">
      <Map
        onCameraChange={(newCamera: object) => {
          handleCameraChange(newCamera);
        }}
      />
      <CameraDetails camera={camera} />
    </div>
  );
};

export default App;
