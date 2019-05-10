import React from "react";
import Map from "./components/Map";
import CameraDetails from "./components/CameraDetails";

const App: React.FC = () => {
  return (
    <div className="App">
      <Map />
      <CameraDetails />
    </div>
  );
};

export default App;
