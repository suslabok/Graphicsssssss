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

const WaterCycleScene = ({ isPlaying, cameraView, activeStep }) => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const particleSystemsRef = useRef(null);
  const riverRef = useRef(null);
  const activeStepRef = useRef(activeStep);
  const previousStepRef = useRef(activeStep);

  // Update the ref when activeStep changes and reset particles
  useEffect(() => {
    activeStepRef.current = activeStep;

    // Reset particles when step changes
    if (previousStepRef.current !== activeStep && particleSystemsRef.current) {
      const { vaporParticles, precipitationParticles, waterParticles, clouds } =
        particleSystemsRef.current;

      // Reset vapor particles
      vaporParticles.forEach((v) => {
        v.active = false;
        v.position.set(0, -100, 0);
        v.mesh.position.copy(v.position);
        v.mesh.material.opacity = 0;
        v.mesh.scale.setScalar(1);
      });

      // Reset precipitation particles
      precipitationParticles.forEach((p) => {
        p.active = false;
        p.position.set(0, -100, 0);
        p.mesh.position.copy(p.position);
        p.mesh.material.opacity = 0;
        p.mesh.scale.set(1, 1, 1);
      });

      // Reset water particles stage
      waterParticles.forEach((w) => {
        if (w.stage === "runoff" || w.stage === "collection") {
          w.stage = "ocean";
          w.position.set(
            40 + Math.random() * 45,
            -0.5 + Math.random() * 0.5,
            (Math.random() - 0.5) * 70
          );
          w.mesh.position.copy(w.position);
          w.mesh.scale.setScalar(1);
        }
      });

      // Reset clouds visibility and position
      clouds.forEach((cloud, index) => {
        cloud.mesh.visible = true;
        cloud.waterContent = 0.3;
        cloud.mesh.scale.set(1, 1, 1);
      });
    }

    previousStepRef.current = activeStep;
  }, [activeStep]);

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
    scene.background = new THREE.Color(0xb5e3f5);
    scene.fog = new THREE.Fog(0xb5e3f5, 150, 500);
    sceneRef.current = scene;

    // Create camera positioned for ANGLE view (default view)
    const camera = new THREE.PerspectiveCamera(
      60,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    // Position camera for angle view - nice perspective view
    camera.position.set(80, 60, 80);
    camera.lookAt(0, 15, 0);
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
      controls.target.set(0, 15, 0); // Target for side view
      controlsRef.current = controls;
    }

    // Create environment objects
    createLighting(THREE, scene);
    const landscape = createEducationalLandscape(THREE, scene);
    const treeLocations = landscape.trees;
    riverRef.current = landscape.river;
    const riverCurve = landscape.riverCurve;
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
      riverCurve,
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

    // Animate river (always flows)
    if (riverRef.current && riverRef.current.userData.animate) {
      riverRef.current.userData.animate();
    }

    if (isPlaying && particleSystemsRef.current) {
      const {
        waterParticles,
        vaporParticles,
        clouds,
        precipitationParticles,
        groundwaterParticles,
        treeLocations,
        riverCurve,
      } = particleSystemsRef.current;

      const evapRate = 0.4;
      const transpRate = 0.35;
      const condensRate = 0.5;

      const currentStep = activeStepRef.current;

      // Update particle systems based on active step
      if (currentStep === "all") {
        // Run all steps - complete water cycle
        // Make all clouds visible
        clouds.forEach((cloud) => {
          cloud.mesh.visible = true;
        });
        updateWaterParticles(waterParticles, riverCurve);
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
      } else if (currentStep === "evaporation") {
        // EVAPORATION: Vapor rises from ocean surface

        // Hide precipitation particles (no rain during evaporation)
        precipitationParticles.forEach((p) => {
          if (p.active) {
            p.active = false;
            p.mesh.material.opacity = 0;
          }
        });

        // Only show 1-2 clouds above ocean, hide all others
        clouds.forEach((cloud, index) => {
          if (index < 2) {
            // Show only first 2 clouds above ocean
            cloud.mesh.visible = true;
            cloud.mesh.position.x = 50 + index * 20; // Position above ocean
            cloud.mesh.position.y = 42 + index * 5;
            cloud.mesh.position.z = (index - 0.5) * 15;
            // Make clouds white and fluffy
            cloud.particles.forEach((cp) => {
              cp.material.color.setRGB(1, 1, 1);
              cp.material.opacity = 0.85;
            });
          } else {
            // Hide all other clouds
            cloud.mesh.visible = false;
          }
        });

        // Create MANY MORE larger vapor particles rising from ocean
        if (Math.random() < 0.35) {
          const vapor = vaporParticles.find((v) => !v.active);
          if (vapor) {
            vapor.active = true;
            vapor.type = "evaporation";
            // Start from ocean surface (right side)
            vapor.position.set(
              40 + Math.random() * 45, // Ocean area (x: 40-85)
              0.5 + Math.random() * 1.5, // Near water surface
              (Math.random() - 0.5) * 70
            );
            vapor.velocity.y = 0.12 + Math.random() * 0.1; // Rise upward
            vapor.velocity.x = -0.015; // Slight drift toward land
            vapor.velocity.z = (Math.random() - 0.5) * 0.02;
            vapor.mesh.position.copy(vapor.position);
            vapor.mesh.material.opacity = 0.85;
            vapor.mesh.material.color.setHex(0x3a7ca5);
            // Start with larger size
            vapor.mesh.scale.setScalar(2.5 + Math.random() * 1.5);
            vapor.age = 0;
          }
        }

        // Update rising vapor particles with visible animation
        vaporParticles.forEach((p) => {
          if (p.active) {
            p.age++;
            p.position.add(p.velocity);

            // Swaying motion as vapor rises
            p.position.x += Math.sin(p.age * 0.06) * 0.03;
            p.position.z += Math.cos(p.age * 0.05) * 0.02;

            // Pulsing size effect - keep large
            const baseScale = 2.5;
            const scale = baseScale + Math.sin(p.age * 0.08) * 0.8;
            p.mesh.scale.setScalar(scale);

            // High visibility opacity that slowly fades as it rises
            p.mesh.material.opacity = Math.max(0.3, 0.9 - p.position.y / 70);
            p.mesh.position.copy(p.position);

            // Deactivate when too high (reached cloud level)
            if (p.position.y > 45) {
              p.active = false;
              p.position.set(0, -100, 0);
              p.mesh.position.copy(p.position);
              p.mesh.material.opacity = 0;
              p.mesh.scale.setScalar(1);
            }
          }
        });

        // Show ocean water with gentle waves
        waterParticles.forEach((p) => {
          if (p.position.x > 35) {
            p.position.y =
              -0.2 + Math.sin(Date.now() * 0.003 + p.position.x * 0.15) * 0.15;
            p.mesh.position.copy(p.position);
          }
        });
      } else if (currentStep === "condensation") {
        // CONDENSATION: Clouds form and travel toward mountains

        // Make all clouds visible again
        // Hide precipitation particles (no rain during condensation)
        precipitationParticles.forEach((p) => {
          if (p.active) {
            p.active = false;
            p.mesh.material.opacity = 0;
          }
        });

        // Make all clouds visible again
        clouds.forEach((cloud) => {
          cloud.mesh.visible = true;
        });

        // Clouds visibly grow and move toward mountains
        clouds.forEach((cloud) => {
          cloud.driftPhase += 0.025;

          // Gradually increase water content (cloud forming)
          cloud.waterContent = Math.min(
            cloud.maxWaterContent,
            cloud.waterContent + 0.008
          );

          // Make clouds visibly grow with water content
          const growthScale = 0.9 + cloud.waterContent * 0.35;
          cloud.mesh.scale.set(growthScale, growthScale, growthScale);

          // Update cloud color - darker as they fill with water
          cloud.particles.forEach((cp) => {
            const grayness = Math.max(0.55, 1.0 - cloud.waterContent * 0.25);
            cp.material.color.setRGB(grayness, grayness, grayness + 0.05);
            cp.material.opacity = 0.75 + cloud.waterContent * 0.15;
          });

          // Move clouds toward mountains (leftward) - visible movement
          cloud.mesh.position.x += cloud.speed * 2.0;
          cloud.mesh.position.y += Math.sin(cloud.driftPhase) * 0.06;
          cloud.mesh.position.z += Math.cos(cloud.driftPhase * 0.7) * 0.04;

          // Reset clouds that reach mountains back to ocean
          if (cloud.mesh.position.x < -70) {
            cloud.mesh.position.x = 75;
            cloud.waterContent = 0.2;
            cloud.mesh.scale.set(0.9, 0.9, 0.9);
          }
        });

        // Show some vapor condensing into clouds
        if (Math.random() < 0.08) {
          const vapor = vaporParticles.find((v) => !v.active);
          if (vapor) {
            // Find a cloud to move toward
            const targetCloud =
              clouds[Math.floor(Math.random() * clouds.length)];
            vapor.active = true;
            vapor.position.set(
              targetCloud.mesh.position.x + 20 + Math.random() * 15,
              targetCloud.mesh.position.y + (Math.random() - 0.5) * 10,
              targetCloud.mesh.position.z + (Math.random() - 0.5) * 15
            );
            vapor.velocity.x = -0.15;
            vapor.velocity.y = 0.02;
            vapor.mesh.position.copy(vapor.position);
            vapor.mesh.material.opacity = 0.5;
            vapor.mesh.material.color.setHex(0x4a7a9a);
            vapor.age = 0;
          }
        }

        // Update vapor moving toward clouds
        vaporParticles.forEach((p) => {
          if (p.active) {
            p.age++;
            p.position.add(p.velocity);
            p.mesh.position.copy(p.position);

            // Find nearest cloud
            const nearestCloud = clouds.reduce((closest, cloud) => {
              const dist = p.position.distanceTo(cloud.mesh.position);
              return dist < (closest.dist || Infinity)
                ? { cloud, dist }
                : closest;
            }, {});

            // Condense into cloud when close
            if (nearestCloud.cloud && nearestCloud.dist < 12) {
              p.active = false;
              p.position.set(0, -100, 0);
              p.mesh.position.copy(p.position);
              p.mesh.material.opacity = 0;
              nearestCloud.cloud.waterContent += 0.25;
            }

            if (p.age > 150 || p.position.x < -80) {
              p.active = false;
              p.position.set(0, -100, 0);
              p.mesh.position.copy(p.position);
              p.mesh.material.opacity = 0;
            }
          }
        });
      } else if (currentStep === "precipitation") {
        // PRECIPITATION: Heavy rain falls mostly over mountains and hills

        // Hide vapor particles (no evaporation during precipitation)
        vaporParticles.forEach((v) => {
          if (v.active) {
            v.active = false;
            v.mesh.material.opacity = 0;
          }
        });

        // Make all clouds visible
        clouds.forEach((cloud) => {
          cloud.mesh.visible = true;
        });

        // Position clouds over mountain/hill region for rain
        clouds.forEach((cloud, index) => {
          cloud.driftPhase += 0.015;
          cloud.mesh.position.y += Math.sin(cloud.driftPhase) * 0.02;

          // Move clouds toward mountain/hill region (left side: x < 0)
          if (cloud.mesh.position.x > -50) {
            cloud.mesh.position.x -= 0.1;
          }

          // Make clouds very dark (full of water - storm clouds)
          cloud.particles.forEach((cp) => {
            cp.material.color.setRGB(0.4, 0.4, 0.45);
            cp.material.opacity = 0.95;
          });

          // Rain heavily - more over mountains (x < -30), less over hills (-30 < x < 10)
          const isOverMountains = cloud.mesh.position.x < -30;
          const isOverHills =
            cloud.mesh.position.x >= -30 && cloud.mesh.position.x < 10;

          // Mountain region gets more rain
          let rainChance = 0.05; // Default low
          if (isOverMountains) {
            rainChance = 0.45; // Heavy rain over mountains
          } else if (isOverHills) {
            rainChance = 0.25; // Moderate rain over hills
          }

          const rainCount =
            Math.random() < rainChance
              ? isOverMountains
                ? 3
                : 2
              : Math.random() < rainChance * 0.5
              ? 1
              : 0;

          for (let i = 0; i < rainCount; i++) {
            const precip = precipitationParticles.find((p) => !p.active);
            if (precip) {
              precip.active = true;
              // Rain position biased toward mountains/hills
              const rainX = isOverMountains
                ? cloud.mesh.position.x + (Math.random() - 0.5) * 20
                : cloud.mesh.position.x + (Math.random() - 0.5) * 15;
              precip.position.set(
                rainX,
                cloud.mesh.position.y - 4,
                cloud.mesh.position.z + (Math.random() - 0.5) * 14
              );
              precip.velocity.y = -0.5 - Math.random() * 0.3; // Fast falling rain
              precip.velocity.x = (Math.random() - 0.5) * 0.03;
              precip.mesh.position.copy(precip.position);
              precip.mesh.material.opacity = 0.9;
              precip.mesh.material.color.setHex(0x1a4670);
              precip.age = 0;
            }
          }
        });

        // Update falling rain with stretch effect
        precipitationParticles.forEach((p) => {
          if (p.active) {
            p.age++;
            p.position.add(p.velocity);

            // Stretch rain drops for falling effect
            p.mesh.scale.set(1, 1.8 + Math.abs(p.velocity.y) * 0.6, 1);

            // Slight opacity variation
            p.mesh.material.opacity = 0.75 + Math.sin(p.age * 0.2) * 0.2;
            p.mesh.position.copy(p.position);

            // Rain hits ground - different levels for mountains vs hills
            const groundLevel =
              p.position.x < -40 ? 8 : p.position.x < 0 ? 3 : 1;
            if (p.position.y <= groundLevel) {
              p.active = false;
              p.position.set(0, -100, 0);
              p.mesh.position.copy(p.position);
              p.mesh.material.opacity = 0;
              p.mesh.scale.set(1, 1, 1);
            }
          }
        });
      } else if (currentStep === "collection") {
        // COLLECTION: Continuous water flowing through river to ocean

        // Hide clouds during collection to focus on river
        clouds.forEach((cloud) => {
          cloud.mesh.visible = false;
        });

        // Hide vapor particles
        vaporParticles.forEach((v) => {
          if (v.active) {
            v.active = false;
            v.mesh.material.opacity = 0;
          }
        });

        // Hide precipitation particles
        precipitationParticles.forEach((p) => {
          if (p.active) {
            p.active = false;
            p.mesh.material.opacity = 0;
          }
        });

        // CONTINUOUS river flow - spawn water at mountain start
        const spawnCount = 3;
        for (let i = 0; i < spawnCount; i++) {
          const water = waterParticles.find(
            (w) =>
              w.stage === "evaporated" ||
              w.stage === "collection" ||
              w.position.y < -50
          );
          if (water) {
            water.stage = "river";
            water.riverProgress = 0; // Start at beginning of river
            water.mesh.material.opacity = 0.95;
            water.mesh.material.color.setHex(0x1e6091); // Match ocean color
            water.mesh.scale.setScalar(1.8 + Math.random() * 0.5);
          }
        }

        // Update all water particles for continuous river flow
        waterParticles.forEach((p) => {
          if (p.stage === "river") {
            // Move along the river curve continuously
            p.riverProgress =
              (p.riverProgress || 0) + 0.004 + Math.random() * 0.002;

            if (p.riverProgress >= 1) {
              // Reached ocean - reset to start for continuous flow
              p.riverProgress = 0;
            }

            if (riverCurve) {
              // Follow the smooth river curve
              const point = riverCurve.getPoint(p.riverProgress);
              const offset = (Math.random() - 0.5) * 2;
              p.position.set(
                point.x + offset,
                point.y +
                  0.5 +
                  Math.sin(Date.now() * 0.01 + p.riverProgress * 10) * 0.3,
                point.z + offset * 0.3
              );
            }

            p.mesh.position.copy(p.position);

            // Shimmer effect for flowing water
            const shimmer =
              0.9 + Math.sin(Date.now() * 0.008 + p.riverProgress * 20) * 0.1;
            p.mesh.material.opacity = shimmer;

            // Color variation for sparkle - matching ocean tones
            const sparkle = Math.sin(Date.now() * 0.012 + p.riverProgress * 15);
            if (sparkle > 0.5) {
              p.mesh.material.color.setHex(0x5599cc); // Light sparkle (wave color)
            } else if (sparkle > 0) {
              p.mesh.material.color.setHex(0x2878a8); // Medium ocean blue
            } else {
              p.mesh.material.color.setHex(0x1e6091); // Base ocean blue
            }
          }
        });

        // Also show groundwater movement
        updateGroundwater(groundwaterParticles, waterParticles);
      }
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
