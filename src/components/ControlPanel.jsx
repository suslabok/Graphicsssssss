import React from "react";

const ControlPanel = ({ isPlaying, setIsPlaying, onViewChange }) => {
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

      <div style={{ marginBottom: "15px" }}>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          style={{
            background: isPlaying
              ? "linear-gradient(135deg, #f06595 0%, #e64980 100%)"
              : "linear-gradient(135deg, #51cf66 0%, #37b24d 100%)",
            color: "#fff",
            border: "none",
            padding: "14px 22px",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            fontWeight: "600",
            width: "100%",
            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
            transition: "all 0.3s ease",
          }}
        >
          {isPlaying ? "⏸ Pause Simulation" : "▶ Start Simulation"}
        </button>
      </div>

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

      <div style={{ marginTop: "15px", fontSize: "11px", color: "#999" }}>
        💡 <strong>Tips:</strong>
        <br />
        • Watch the water cycle in action!
        <br />
        • Use different views to see all angles
        <br />• Rotate with mouse to explore
      </div>
    </div>
  );
};

export default ControlPanel;
