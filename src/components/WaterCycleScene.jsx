import React, { useEffect, useRef } from "react";
import {
  createEducationalLandscape,
  createSun,
  createLighting,
} from "./EnvironmentObjects.js";
import {
  createWaterParticles,
  createVaporParticles,
  createClouds,
  createPrecipitationParticles,
  createGroundwaterParticles,
  updateWaterParticles,
  processEvaporation,
  processTranspiration,
  updateVaporMovement,
  updateClouds,
  updatePrecipitation,
  updateGroundwater,
} from "./ParticleSystem";

const WaterCycleScene = ({ isPlaying, cameraView }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const particleSystemsRef = useRef(null);

  useEffect(() => {
    // Store container reference at the beginning of the effect
    const currentContainer = containerRef.current;

    const script = document.createElement("script");
    script.src =
      "https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js";
    script.onload = () => {
      // Load OBJ loader for 3D tree models
      const objLoaderScript = document.createElement("script");
      objLoaderScript.src =
        "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/OBJLoader.js";
      objLoaderScript.onload = () => {
        // Load MTL loader for material files
        const mtlLoaderScript = document.createElement("script");
        mtlLoaderScript.src =
          "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/loaders/MTLLoader.js";
        mtlLoaderScript.onload = () => {
          // Load OrbitControls for camera rotation
          const orbitControlsScript = document.createElement("script");
          orbitControlsScript.src =
            "https://cdn.jsdelivr.net/npm/three@0.128.0/examples/js/controls/OrbitControls.js";
          orbitControlsScript.onload = () => {
            initializeScene();
          };
          orbitControlsScript.onerror = () => {
            console.warn("Failed to load OrbitControls, camera won't rotate");
            initializeScene();
          };
          document.body.appendChild(orbitControlsScript);
        };
        mtlLoaderScript.onerror = () => {
          console.warn(
            "Failed to load MTLLoader, continuing without materials"
          );
          initializeScene();
        };
        document.body.appendChild(mtlLoaderScript);
      };
      objLoaderScript.onerror = () => {
        console.warn("Failed to load OBJLoader, using fallback trees");
        initializeScene();
      };
      document.body.appendChild(objLoaderScript);
    };
    document.body.appendChild(script);

    return () => {
      // Use the stored container reference from the beginning of the effect
      if (rendererRef.current && currentContainer) {
        try {
          currentContainer.removeChild(rendererRef.current.domElement);
        } catch (e) {
          // Element already removed
        }
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update camera view
  useEffect(() => {
    if (cameraRef.current && controlsRef.current) {
      const camera = cameraRef.current;
      const controls = controlsRef.current;

      // Define camera positions and targets for different views
      switch (cameraView) {
        case "top":
          // Top-down view - bird's eye
          camera.position.set(0, 150, 0);
          controls.target.set(0, 0, 0);
          break;
        case "side":
          // Side view - see the cross-section with elevation
          camera.position.set(0, 35, 120);
          controls.target.set(0, 15, 0);
          break;
        case "front":
          // Front view - looking from ocean towards mountains
          camera.position.set(100, 40, 0);
          controls.target.set(0, 15, 0);
          break;
        case "angle":
          // Angled view - nice perspective view
          camera.position.set(80, 60, 80);
          controls.target.set(0, 15, 0);
          break;
        default:
          break;
      }

      controls.update();
    }
  }, [cameraView]);

  const initializeScene = () => {
    const THREE = window.THREE;
    if (!THREE) return;

    // Create scene with enhanced visual settings
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x87ceeb);
    scene.fog = new THREE.Fog(0x87ceeb, 150, 500);
    sceneRef.current = scene;

    // Create camera positioned for TOP-DOWN view to see entire layout
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // Position camera HIGH ABOVE looking straight down - bird's eye view
    camera.position.set(0, 150, 0); // High above the scene
    camera.lookAt(0, 0, 0); // Looking straight down at center
    cameraRef.current = camera;

    // Create renderer with enhanced visual quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Add OrbitControls for camera rotation
    if (window.THREE.OrbitControls) {
      const controls = new window.THREE.OrbitControls(
        camera,
        renderer.domElement
      );
      controls.enableDamping = true;
      controls.dampingFactor = 0.05;
      controls.enableZoom = false; // Disable zoom
      controls.enablePan = false; // Disable panning
      controls.screenSpacePanning = false;
      controls.minPolarAngle = 0; // Allow looking straight down
      controls.maxPolarAngle = Math.PI / 1.5; // Can tilt camera
      controls.target.set(0, 0, 0); // Center of scene
      controlsRef.current = controls;
    }

    // Create environment objects
    createLighting(THREE, scene);
    const landscape = createEducationalLandscape(THREE, scene);
    const treeLocations = landscape.trees;
    createSun(THREE, scene);

    // Create particle systems
    const waterParticles = createWaterParticles(THREE, scene);
    const vaporParticles = createVaporParticles(THREE, scene);
    const clouds = createClouds(THREE, scene);
    const precipitationParticles = createPrecipitationParticles(THREE, scene);
    const groundwaterParticles = createGroundwaterParticles(THREE, scene);

    // Store particle systems for animation
    particleSystemsRef.current = {
      waterParticles,
      vaporParticles,
      clouds,
      precipitationParticles,
      groundwaterParticles,
      treeLocations,
    };

    // Start animation loop
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  };

  const animate = () => {
    animationRef.current = requestAnimationFrame(animate);

    if (isPlaying && particleSystemsRef.current) {
      const {
        waterParticles,
        vaporParticles,
        clouds,
        precipitationParticles,
        groundwaterParticles,
        treeLocations,
      } = particleSystemsRef.current;

      const evapRate = 0.4; // Moderate evaporation rate
      const transpRate = 0.35; // Moderate transpiration rate
      const condensRate = 0.5; // Moderate condensation rate

      // Update all particle systems
      updateWaterParticles(waterParticles);
      processEvaporation(waterParticles, vaporParticles, evapRate);
      processTranspiration(treeLocations, vaporParticles, transpRate);
      updateVaporMovement(vaporParticles, clouds, condensRate);
      updateClouds(clouds, precipitationParticles);
      updatePrecipitation(
        precipitationParticles,
        waterParticles,
        groundwaterParticles
      );
      updateGroundwater(groundwaterParticles, waterParticles);
    }

    // Update controls for smooth camera rotation
    if (controlsRef.current) {
      controlsRef.current.update();
    }

    if (rendererRef.current && sceneRef.current && cameraRef.current) {
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    }
  };

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        width: "100%",
        background: "linear-gradient(to bottom, #87ceeb, #e0f6ff)",
      }}
    />
  );
};

export default WaterCycleScene;
