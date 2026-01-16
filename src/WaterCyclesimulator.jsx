import React, { useState } from "react";
import WaterCycleScene from "./components/WaterCycleScene";
import ControlPanel from "./components/ControlPanel";

const WaterCycleSimulator = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [cameraView, setCameraView] = useState("side");

  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <WaterCycleScene isPlaying={isPlaying} cameraView={cameraView} />

      <ControlPanel
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onViewChange={setCameraView}
      />
    </div>
  );
};

export default WaterCycleSimulator;
