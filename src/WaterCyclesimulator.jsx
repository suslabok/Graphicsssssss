import React, { useState } from "react";
import WaterCycleScene from "./components/WaterCycleScene";
import ControlPanel from "./components/ControlPanel";
import WaterCycleLabels from "./components/WaterCycleLabels";

const WaterCycleSimulator = () => {
  const [cameraView, setCameraView] = useState("angle");
  const [activeStep, setActiveStep] = useState("all");

  const handleStepClick = (stepId) => {
    setActiveStep(stepId);
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
        isPlaying={true}
        cameraView={cameraView}
        activeStep={activeStep}
      />

      <ControlPanel onViewChange={setCameraView} />

      <WaterCycleLabels activeStep={activeStep} onStepClick={handleStepClick} />
    </div>
  );
};

export default WaterCycleSimulator;
