import React, { useState } from "react";
import WaterCycleScene from "./components/WaterCycleScene";
import ControlPanel from "./components/ControlPanel";
import WaterCycleLabels from "./components/WaterCycleLabels";

const WaterCycleSimulator = () => {
  const [isPlaying, setIsPlaying] = useState(true);
  const [cameraView, setCameraView] = useState("side");
  const [activeStep, setActiveStep] = useState("all");

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
    setIsPlaying(true); // Start playing when a step is clicked
  };

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
      <WaterCycleScene
        isPlaying={isPlaying}
        cameraView={cameraView}
        activeStep={activeStep}
      />

      <ControlPanel
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        onViewChange={setCameraView}
      />

      <WaterCycleLabels activeStep={activeStep} onStepClick={handleStepClick} />
    </div>
  );
};

export default WaterCycleSimulator;
