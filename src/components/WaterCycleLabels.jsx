import React from "react";

const WaterCycleLabels = ({ activeStep, onStepClick }) => {
  const steps = [
    {
      number: 1,
      id: "evaporation",
      title: "Evaporation",
      description: "Sun heats water in oceans, lakes and rivers",
      color: "#00bfff",
      icon: "☀️",
    },
    {
      number: 2,
      id: "condensation",
      title: "Condensation",
      description: "Water vapor rises and forms clouds in the sky",
      color: "#87ceeb",
      icon: "☁️",
    },
    {
      number: 3,
      id: "precipitation",
      title: "Precipitation",
      description: "Water falls as rain when clouds get heavy",
      color: "#4169e1",
      icon: "🌧️",
    },
    {
      number: 4,
      id: "collection",
      title: "Collection",
      description: "Water gathers in rivers, lakes and oceans",
      color: "#1e90ff",
      icon: "🌊",
    },
  ];

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        display: "flex",
        justifyContent: "center",
        gap: "10px",
        padding: "15px 20px",
        background:
          "linear-gradient(to top, rgba(15, 23, 42, 0.95), rgba(15, 23, 42, 0.7), transparent)",
        zIndex: 100,
      }}
    >
      {/* All Steps button */}
      <div
        onClick={() => onStepClick("all")}
        style={{
          background:
            activeStep === "all"
              ? "rgba(80, 200, 120, 0.3)"
              : "rgba(30, 41, 59, 0.95)",
          borderRadius: "12px",
          padding: "12px 16px",
          minWidth: "120px",
          backdropFilter: "blur(10px)",
          border: activeStep === "all" ? "2px solid #50c878" : "2px solid #666",
          boxShadow:
            activeStep === "all"
              ? "0 4px 20px rgba(80, 200, 120, 0.5)"
              : "0 4px 20px rgba(100, 100, 100, 0.3)",
          transition: "all 0.3s ease",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <span
          style={{
            fontSize: "14px",
            fontWeight: "600",
            color: activeStep === "all" ? "#50c878" : "#aaa",
            fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
          }}
        >
          🔄 All Steps
        </span>
      </div>

      {steps.map((step) => {
        const isActive = activeStep === step.id;
        return (
          <div
            key={step.number}
            onClick={() => onStepClick(step.id)}
            style={{
              background: isActive
                ? `${step.color}30`
                : "rgba(30, 41, 59, 0.95)",
              borderRadius: "12px",
              padding: "12px 16px",
              minWidth: "180px",
              maxWidth: "220px",
              backdropFilter: "blur(10px)",
              border: `2px solid ${step.color}`,
              boxShadow: isActive
                ? `0 8px 30px ${step.color}80, inset 0 0 20px ${step.color}30`
                : `0 4px 20px ${step.color}40`,
              transition: "all 0.3s ease",
              cursor: "pointer",
              transform: isActive
                ? "translateY(-5px) scale(1.02)"
                : "translateY(0)",
            }}
            onMouseEnter={(e) => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow = `0 8px 30px ${step.color}60`;
              }
            }}
            onMouseLeave={(e) => {
              if (!isActive) {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = `0 4px 20px ${step.color}40`;
              }
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                marginBottom: "6px",
              }}
            >
              <span
                style={{
                  background: step.color,
                  color: "#fff",
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "12px",
                  fontWeight: "bold",
                  boxShadow: isActive ? `0 0 10px ${step.color}` : "none",
                }}
              >
                {step.number}
              </span>
              <span style={{ fontSize: "14px" }}>{step.icon}</span>
              <h3
                style={{
                  margin: 0,
                  fontSize: "14px",
                  fontWeight: "600",
                  color: step.color,
                  fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
                }}
              >
                {step.title}
              </h3>
            </div>
            <p
              style={{
                margin: 0,
                fontSize: "11px",
                color: isActive
                  ? "rgba(255, 255, 255, 0.95)"
                  : "rgba(255, 255, 255, 0.75)",
                lineHeight: "1.4",
                fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              }}
            >
              {step.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

export default WaterCycleLabels;
