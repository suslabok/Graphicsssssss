import React from "react";

const ControlPanel = ({ onViewChange }) => {
  return (
    <div
      style={{
        position: "absolute",
        top: 20,
        right: 20,
        background: "rgba(15, 23, 42, 0.95)",
        color: "#fff",
        padding: "16px",
        borderRadius: "12px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        minWidth: "280px",
        zIndex: 100,
        backdropFilter: "blur(10px)",
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }}
    >
      <h2
        style={{
          margin: "0 0 14px 0",
          fontSize: "16px",
          color: "#60a5fa",
          fontWeight: "600",
          textShadow: "0 2px 8px rgba(96, 165, 250, 0.3)",
        }}
      >
        💧 Water Cycle Simulator
      </h2>

      {/* Camera View Buttons */}
      <div style={{ marginBottom: "20px" }}>
        <label
          style={{
            display: "block",
            marginBottom: "8px",
            fontSize: "13px",
            fontWeight: "bold",
            color: "#60a5fa",
          }}
        >
          📷 Camera Views
        </label>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "8px",
          }}
        >
          <button
            onClick={() => onViewChange && onViewChange("top")}
            style={{
              background: "linear-gradient(135deg, #4c9aff 0%, #0065ff 100%)",
              color: "#fff",
              border: "none",
              padding: "10px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            🔝 Top View
          </button>
          <button
            onClick={() => onViewChange && onViewChange("side")}
            style={{
              background: "linear-gradient(135deg, #4c9aff 0%, #0065ff 100%)",
              color: "#fff",
              border: "none",
              padding: "10px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            👁️ Side View
          </button>
          <button
            onClick={() => onViewChange && onViewChange("front")}
            style={{
              background: "linear-gradient(135deg, #4c9aff 0%, #0065ff 100%)",
              color: "#fff",
              border: "none",
              padding: "10px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            📐 Front View
          </button>
          <button
            onClick={() => onViewChange && onViewChange("angle")}
            style={{
              background: "linear-gradient(135deg, #4c9aff 0%, #0065ff 100%)",
              color: "#fff",
              border: "none",
              padding: "10px 12px",
              borderRadius: "6px",
              cursor: "pointer",
              fontSize: "13px",
              fontWeight: "600",
              boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            }}
          >
            🎬 Angle View
          </button>
        </div>
      </div>
    </div>
  );
};

export default ControlPanel;
