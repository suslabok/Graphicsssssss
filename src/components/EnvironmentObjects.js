// EnvironmentObjects.js - Create a comprehensive 3D landscape like educational diagrams

export const createEducationalLandscape = (THREE, scene) => {
  const landscape = {};

  // Create realistic terrain with slopes from mountains to ocean

  // Create terrain mesh with height variations - better resolution
  const terrainGeometry = new THREE.PlaneGeometry(200, 120, 80, 50);
  const terrainVertices = terrainGeometry.attributes.position;

  // Create height map for realistic terrain with smooth gradient from right to left
  for (let i = 0; i < terrainVertices.count; i++) {
    const x = terrainVertices.getX(i);
    const z = terrainVertices.getZ(i);

    // Create smooth slope from right (ocean, low) to left (mountains, high)
    // Using normalized position: right (x=100) is 0, left (x=-100) is 1
    const normalizedX = (100 - x) / 200; // 0 at right edge, 1 at left edge

    // Base elevation increases smoothly from right to left with steeper curve
    const baseElevation = Math.pow(normalizedX, 2.2) * 40; // More dramatic slope

    // Add terrain variation based on location
    let height = baseElevation;

    // Mountain area (left side) - add dramatic peaks with better shape
    if (x < -30) {
      const mountainNoise = Math.sin(x * 0.15) * Math.cos(z * 0.12) * 15;
      const ridges = Math.abs(Math.sin(x * 0.08)) * 8;
      height += mountainNoise + ridges;
    }
    // Hills area (middle x: -25 to 20) - PROMINENT rolling hills with trees
    else if (x < 20) {
      // Make hills MUCH more visible - add massive elevation
      height += Math.sin(x * 0.1) * Math.cos(z * 0.1) * 20; // Increased significantly
      height += Math.sin(x * 0.05 + z * 0.05) * 12; // Increased significantly
      // Extra LARGE boost for the green hills area where trees are
      if (x > -25 && x < 15) {
        height += 15; // MUCH larger elevation boost to make hills clearly visible
      }
    }
    // Plains area (right side near ocean) - keep relatively flat
    else {
      height += Math.sin(x * 0.06) * Math.cos(z * 0.06) * 2; // Reduced to emphasize hills
    }

    // Add small random variation for natural texture
    height += (Math.random() - 0.5) * 1.5;

    terrainVertices.setY(i, Math.max(height, 0));
  }
  terrainVertices.needsUpdate = true;
  terrainGeometry.computeVertexNormals();
  // Enhanced terrain material with better visual quality
  const terrainMaterial = new THREE.MeshLambertMaterial({
    color: 0x5a8c3e,
    roughness: 0.9,
    wireframe: false,
    flatShading: false,
    side: THREE.DoubleSide, // Render both sides to prevent black areas
  });

  // Add vertex colors for variation - green hills, brown mountains, white snow
  const colors = [];
  for (let i = 0; i < terrainVertices.count; i++) {
    const x = terrainVertices.getX(i);
    const height = terrainVertices.getY(i);
    let r, g, b;

    // Ocean area (right side, x > 55) - light sandy beach color (only at ocean edge)
    if (x > 55) {
      r = 0.92 + Math.random() * 0.05;
      g = 0.88 + Math.random() * 0.08;
      b = 0.75 + Math.random() * 0.1;
    }
    // Plains and orange area (x: 20-55) - NOW MAKE GREEN like hills
    else if (x > 20) {
      r = 0.35 + Math.random() * 0.08;
      g = 0.55 + Math.random() * 0.1;
      b = 0.25 + Math.random() * 0.05;
    }
    // Hills area with trees (x: -25 to 20) - rich vibrant green
    else if (x > -25) {
      if (height < 6) {
        // Lower hills - bright green
        r = 0.3 + Math.random() * 0.08;
        g = 0.6 + Math.random() * 0.1;
        b = 0.2 + Math.random() * 0.05;
      } else {
        // Higher hills - rich green
        r = 0.35 + Math.random() * 0.08;
        g = 0.55 + Math.random() * 0.1;
        b = 0.25 + Math.random() * 0.05;
      }
    }
    // Mountain foothills (x: -30 to -25) - transition green to brown
    else if (x > -30) {
      r = 0.45 + Math.random() * 0.1;
      g = 0.5 + Math.random() * 0.1;
      b = 0.3 + Math.random() * 0.05;
    }
    // Mountain area (x < -30) - brown rocky with snow on peaks
    else {
      if (height > 25) {
        // Snow-capped peaks
        r = 0.9 + Math.random() * 0.1;
        g = 0.9 + Math.random() * 0.1;
        b = 0.95 + Math.random() * 0.05;
      } else if (height > 18) {
        // Rocky brown
        r = 0.55 + Math.random() * 0.1;
        g = 0.45 + Math.random() * 0.1;
        b = 0.35 + Math.random() * 0.05;
      } else {
        // Lower mountain - dark green/brown
        r = 0.5 + Math.random() * 0.1;
        g = 0.48 + Math.random() * 0.1;
        b = 0.35 + Math.random() * 0.05;
      }
    }
    colors.push(r, g, b);
  }
  terrainGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3)
  );
  terrainMaterial.vertexColors = true;

  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
  // Rotate for cross-sectional side view to show elevation changes
  terrain.rotation.x = -Math.PI / 2; // Lay flat horizontally
  terrain.rotation.y = 0; // No Y rotation
  terrain.position.y = 0;
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  scene.add(terrain);

  // Add 3D volumetric hills for better visibility from all angles
  const hillsGroup = new THREE.Group();

  // Create hills ONLY on land - cover entire land area, STOP before ocean at x: 60
  const hillPositions = [
    // Main green hills area (x: -25 to 20)
    { x: -22, z: 0, radius: 22, height: 12 },
    { x: -18, z: 25, radius: 20, height: 11 },
    { x: -15, z: -25, radius: 22, height: 12 },
    { x: -10, z: 10, radius: 24, height: 13 },
    { x: -8, z: -15, radius: 20, height: 11 },
    { x: -5, z: 30, radius: 18, height: 10 },
    { x: -3, z: -30, radius: 20, height: 11 },
    { x: 0, z: 5, radius: 22, height: 12 },
    { x: 3, z: 25, radius: 18, height: 10 },
    { x: 5, z: -20, radius: 20, height: 11 },
    { x: 8, z: 15, radius: 18, height: 10 },
    { x: 10, z: -10, radius: 20, height: 10 },
    { x: 12, z: 20, radius: 18, height: 9 },
    { x: 15, z: -5, radius: 20, height: 10 },
    { x: 18, z: 12, radius: 18, height: 9 },
    // Extended hills on plains area (x: 20-55)
    { x: 22, z: 0, radius: 18, height: 8 },
    { x: 25, z: -25, radius: 17, height: 8 },
    { x: 28, z: 20, radius: 16, height: 7 },
    { x: 31, z: -12, radius: 16, height: 7 },
    { x: 34, z: 15, radius: 15, height: 7 },
    { x: 37, z: -18, radius: 14, height: 6 },
    { x: 40, z: 8, radius: 12, height: 6 },
    { x: 43, z: -15, radius: 14, height: 6 },
    { x: 46, z: 18, radius: 13, height: 6 },
    { x: 49, z: -8, radius: 12, height: 5 },
    { x: 52, z: 12, radius: 12, height: 5 },
    { x: 55, z: -20, radius: 11, height: 5 },
  ];

  hillPositions.forEach(({ x, z, radius, height }) => {
    // Create sphere geometry for rounded hills - LARGE to cover all orange areas
    const hillGeometry = new THREE.SphereGeometry(
      radius,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2
    );
    const hillMaterial = new THREE.MeshLambertMaterial({
      color: 0x4a7c3e, // Rich green color
      vertexColors: false,
    });
    const hill = new THREE.Mesh(hillGeometry, hillMaterial);
    hill.position.set(x, 0, z);
    hill.scale.y = height / radius; // Stretch vertically to create hill shape
    hill.receiveShadow = true;
    hill.castShadow = true;
    hillsGroup.add(hill);
  });

  scene.add(hillsGroup);

  // Soil layer (brown) with realistic dirt texture
  const soilGeometry = new THREE.BoxGeometry(200, 8, 120);
  const soilMaterial = new THREE.MeshLambertMaterial({
    color: 0x8b4513,
    roughness: 0.9,
    // Add brownish variations
    emissive: 0x221100,
    emissiveIntensity: 0.05,
  });
  const soil = new THREE.Mesh(soilGeometry, soilMaterial);
  soil.position.y = -8;
  scene.add(soil);

  // Rock layer (gray) with stone-like appearance
  const rockGeometry = new THREE.BoxGeometry(200, 15, 120);
  const rockMaterial = new THREE.MeshLambertMaterial({
    color: 0x696969,
    roughness: 1.0,
    // Add rocky variations
    emissive: 0x111111,
    emissiveIntensity: 0.03,
  });
  const rock = new THREE.Mesh(rockGeometry, rockMaterial);
  rock.position.y = -20;
  scene.add(rock);

  // Add scattered rocks on surface for realism
  for (let i = 0; i < 25; i++) {
    const rockSize = 0.3 + Math.random() * 1.2;
    const surfaceRock = new THREE.Mesh(
      new THREE.DodecahedronGeometry(rockSize, 0),
      new THREE.MeshLambertMaterial({
        color: 0x555555 + Math.floor(Math.random() * 0x333333),
      })
    );
    surfaceRock.position.set(
      (Math.random() - 0.5) * 180,
      rockSize / 2,
      (Math.random() - 0.5) * 100
    );
    surfaceRock.castShadow = true;
    scene.add(surfaceRock);
  }

  // Create ocean on the right side with realistic water effects
  const oceanGeometry = new THREE.BoxGeometry(80, 15, 120);
  const oceanMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e6091,
    transparent: true,
    opacity: 0.9,
    emissive: 0x003366,
    emissiveIntensity: 0.25,
    reflectivity: 0.9,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.position.set(60, -3, 0);
  ocean.receiveShadow = true;
  scene.add(ocean);

  // Add water surface waves effect with animation
  const waveGeometry = new THREE.PlaneGeometry(80, 120, 30, 30);
  const waveMaterial = new THREE.MeshLambertMaterial({
    color: 0x5599cc,
    transparent: true,
    opacity: 0.6,
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const waves = new THREE.Mesh(waveGeometry, waveMaterial);
  waves.rotation.x = -Math.PI / 2;
  waves.position.set(60, 5, 0);
  waves.receiveShadow = true;

  // Animate waves with more dynamic motion
  const vertices = waveGeometry.attributes.position;
  const originalPositions = [];
  for (let i = 0; i < vertices.count; i++) {
    const x = vertices.getX(i);
    const z = vertices.getZ(i);
    originalPositions.push({ x, z });
    const waveHeight =
      Math.sin(x * 0.15) * Math.cos(z * 0.15) * 0.6 + Math.sin(x * 0.3) * 0.3;
    vertices.setY(i, waveHeight);
  }
  vertices.needsUpdate = true;

  // Store for animation (could be animated in render loop)
  waves.userData.originalPositions = originalPositions;
  waves.userData.time = 0;

  scene.add(waves);

  // Create mountains on the left side (where they belong in the diagram)
  const mountains = [];
  const mountainData = [
    { x: -70, z: -20, height: 45, color: 0x8b7355 },
    { x: -60, z: 10, height: 40, color: 0x7a6b47 },
    { x: -80, z: 30, height: 50, color: 0x9d8464 },
    { x: -50, z: -40, height: 35, color: 0x8b7355 },
    { x: -65, z: 0, height: 38, color: 0x9d8464 },
  ];

  mountainData.forEach(({ x, z, height, color }) => {
    // Use fallback cone mountains only - 3D models were causing black areas
    createFallbackMountain(x, z, height, color);
  });

  function createFallbackMountain(x, z, height, color) {
    console.log(
      `Creating fallback mountain at (${x}, ${z}) with height ${height}`
    );

    // Make mountains much larger and more visible
    const mountainGeometry = new THREE.ConeGeometry(18, height, 16);
    const mountainMaterial = new THREE.MeshLambertMaterial({
      color,
      roughness: 0.9,
      emissive: color,
      emissiveIntensity: 0.15,
    });
    const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountain.position.set(x, height / 2, z);
    mountain.castShadow = true;
    mountain.receiveShadow = true;
    scene.add(mountain);
    mountains.push(mountain);

    // Add rocky texture details to mountains - more visible
    for (let i = 0; i < 12; i++) {
      const rockDetail = new THREE.Mesh(
        new THREE.DodecahedronGeometry(2 + Math.random() * 3, 0),
        new THREE.MeshLambertMaterial({
          color: color - 0x222222 + Math.floor(Math.random() * 0x444444),
        })
      );
      const angle = (i / 12) * Math.PI * 2;
      const radius = 8 + Math.random() * 6;
      const rockHeight = height * 0.25 + Math.random() * height * 0.5;
      rockDetail.position.set(
        x + Math.cos(angle) * radius,
        rockHeight,
        z + Math.sin(angle) * radius
      );
      rockDetail.castShadow = true;
      scene.add(rockDetail);
    }

    // Add snow caps to ALL mountains with more detail
    const snowCapGeometry = new THREE.ConeGeometry(10, height * 0.45, 16);
    const snowCapMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xccddff,
      emissiveIntensity: 0.2,
      roughness: 0.1,
    });
    const snowCap = new THREE.Mesh(snowCapGeometry, snowCapMaterial);
    snowCap.position.set(x, height - 5, z);
    scene.add(snowCap);

    // Add snow patches
    for (let j = 0; j < 8; j++) {
      const snowPatch = new THREE.Mesh(
        new THREE.SphereGeometry(1.5 + Math.random() * 1.5, 12, 8),
        new THREE.MeshLambertMaterial({
          color: 0xf0f8ff,
          emissive: 0xaabbcc,
          emissiveIntensity: 0.1,
        })
      );
      const patchAngle = (j / 8) * Math.PI * 2;
      const patchRadius = 6 + Math.random() * 5;
      snowPatch.position.set(
        x + Math.cos(patchAngle) * patchRadius,
        height - 12 + Math.random() * 8,
        z + Math.sin(patchAngle) * patchRadius
      );
      scene.add(snowPatch);
    }
  }

  // Create forest ONLY on land - trees covering x: -25 to x: 40 (LEAVE OCEAN AREA CLEAR)
  const trees = [];
  const treeLocations = [
    // Trees on main green hills (x: -25 to 20)
    [-22, 15],
    [-18, 25],
    [-15, -10],
    [-12, 20],
    [-8, -5],
    [-5, 30],
    [-2, -15],
    [0, 25],
    [3, -20],
    [6, 15],
    [10, -25],
    [12, 20],
    [15, -10],
    [-20, 8],
    [-10, 18],
    [-6, -25],
    [8, 28],
    [5, -8],
    [13, 12],
    // Trees on plains area (x: 20-40 ONLY - leave ocean clear!)
    [22, 5],
    [25, -22],
    [28, 18],
    [31, -10],
    [34, 15],
    [37, -18],
    [40, 8],
    [23, 25],
    [30, -25],
    [36, 10],
  ];

  treeLocations.forEach(([x, z]) => {
    // Try to load 3D tree model if OBJLoader is available
    if (window.THREE && window.THREE.OBJLoader) {
      const loader = new THREE.OBJLoader();

      // Load with MTL materials if available
      if (window.THREE.MTLLoader) {
        const mtlLoader = new THREE.MTLLoader();
        mtlLoader.load(
          "/Lowpoly_tree_sample.mtl",
          (materials) => {
            materials.preload();
            loader.setMaterials(materials);
            loader.load(
              "/Lowpoly_tree_sample.obj",
              (object) => {
                // Configure the loaded tree model
                object.traverse((child) => {
                  if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    // Enhance materials if needed
                    if (child.material) {
                      child.material.side = THREE.DoubleSide;
                    }
                  }
                });

                // Position and scale the tree - smaller scale and on top of hills
                const treeScale = 0.4 + Math.random() * 0.2; // Reduced from 0.8-1.2 to 0.4-0.6
                object.position.set(x, 12, z); // Elevated to be on top of hills
                object.scale.set(treeScale, treeScale, treeScale);
                object.rotation.y = Math.random() * Math.PI * 2;

                scene.add(object);
              },
              undefined,
              (error) => {
                console.warn(
                  "Failed to load 3D tree model, using fallback:",
                  error
                );
                createSimpleTree(x, z);
              }
            );
          },
          undefined,
          (error) => {
            console.warn(
              "Failed to load MTL, loading OBJ without materials:",
              error
            );
            // Load OBJ without materials
            loadTreeWithoutMaterial(x, z);
          }
        );
      } else {
        loadTreeWithoutMaterial(x, z);
      }
    } else {
      // Fallback to simple tree if OBJ loader not available
      createSimpleTree(x, z);
    }

    trees.push([x, z]);
  });

  // Function to load tree without material file
  function loadTreeWithoutMaterial(x, z) {
    const loader = new THREE.OBJLoader();
    loader.load(
      "/Lowpoly_tree_sample.obj",
      (object) => {
        // Configure the loaded tree model
        object.traverse((child) => {
          if (child.isMesh) {
            // Apply natural tree materials with variation
            const treeColors = [0x228b22, 0x32cd32, 0x2d5016, 0x3cb371];
            const randomColor =
              treeColors[Math.floor(Math.random() * treeColors.length)];

            child.material = new THREE.MeshLambertMaterial({
              color: randomColor,
              roughness: 0.8,
              side: THREE.DoubleSide,
            });
            child.castShadow = true;
            child.receiveShadow = true;
          }
        });

        // Position and scale the tree - smaller scale and on top of hills
        const treeScale = 0.4 + Math.random() * 0.2; // Reduced from 0.8-1.2 to 0.4-0.6
        object.position.set(x, 12, z); // Elevated to be on top of hills
        object.scale.set(treeScale, treeScale, treeScale);

        // Add some rotation variation for natural randomness
        object.rotation.y = Math.random() * Math.PI * 2;

        scene.add(object);
      },
      undefined,
      (error) => {
        console.warn("Failed to load 3D tree model, using fallback:", error);
        createSimpleTree(x, z);
      }
    );
  }

  // Function to create simple trees with enhanced visuals
  function createSimpleTree(x, z) {
    const treeHeight = 4 + Math.random() * 2; // Reduced from 8-12 to 4-6
    const yOffset = 12; // Position on top of hills

    // Enhanced trunk with texture-like appearance
    const trunkGeometry = new THREE.CylinderGeometry(
      0.3,
      0.45,
      treeHeight * 0.6,
      12
    );
    const trunkMaterial = new THREE.MeshLambertMaterial({
      color: 0x5c4033,
      roughness: 1.0,
      emissive: 0x1a0f0a,
      emissiveIntensity: 0.05,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, yOffset + treeHeight * 0.3, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    scene.add(trunk);

    // Enhanced canopy using multiple cones for realistic look
    const canopyColors = [0x228b22, 0x2e8b57, 0x2d5016, 0x3cb371, 0x4ca656];
    for (let i = 0; i < 3; i++) {
      const canopyGeometry = new THREE.ConeGeometry(
        2 - i * 0.45, // Reduced from 4 to 2
        treeHeight * 0.5,
        14
      );
      const canopyMaterial = new THREE.MeshLambertMaterial({
        color: canopyColors[Math.floor(Math.random() * canopyColors.length)],
        transparent: false,
        emissive: 0x0a1f0a,
        emissiveIntensity: 0.03,
      });
      const canopy = new THREE.Mesh(canopyGeometry, canopyMaterial);
      canopy.position.set(
        x + (Math.random() - 0.5) * 0.5,
        yOffset + treeHeight * 0.65 + i * 0.75,
        z + (Math.random() - 0.5) * 0.5
      );
      canopy.castShadow = true;
      canopy.receiveShadow = true;
      scene.add(canopy);
    }

    // Add some small branch details
    for (let j = 0; j < 4; j++) {
      const branchGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.75, 6); // Smaller branches
      const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
      const angle = (j / 4) * Math.PI * 2;
      branch.position.set(
        x + Math.cos(angle) * 0.35,
        yOffset + treeHeight * 0.4 + j * 0.25,
        z + Math.sin(angle) * 0.35
      );
      branch.rotation.z = Math.PI / 4;
      branch.rotation.y = angle;
      branch.castShadow = true;
      scene.add(branch);
    }
  }

  // Underground water table (visible through cross-section) with enhanced effects
  const waterTableGeometry = new THREE.BoxGeometry(200, 1.5, 120);
  const waterTableMaterial = new THREE.MeshLambertMaterial({
    color: 0x4169e1,
    transparent: true,
    opacity: 0.8,
    emissive: 0x001155,
    emissiveIntensity: 0.4,
  });
  const waterTable = new THREE.Mesh(waterTableGeometry, waterTableMaterial);
  waterTable.position.y = -12;
  scene.add(waterTable);

  // Add groundwater flow indicators
  for (let i = 0; i < 15; i++) {
    const flowIndicator = new THREE.Mesh(
      new THREE.SphereGeometry(0.3, 8, 6),
      new THREE.MeshLambertMaterial({
        color: 0x6495ed,
        transparent: true,
        opacity: 0.6,
        emissive: 0x001144,
        emissiveIntensity: 0.5,
      })
    );
    flowIndicator.position.set(
      (Math.random() - 0.5) * 180,
      -12 + (Math.random() - 0.5) * 3,
      (Math.random() - 0.5) * 100
    );
    scene.add(flowIndicator);
  }

  // Create directional flow arrows (like in educational diagrams)
  const createFlowArrow = (start, end, color, size = 1) => {
    const direction = new THREE.Vector3().subVectors(end, start).normalize();
    const length = start.distanceTo(end);

    // Arrow body
    const arrowBodyGeometry = new THREE.CylinderGeometry(
      0.2 * size,
      0.2 * size,
      length - 1,
      8
    );
    const arrowMaterial = new THREE.MeshLambertMaterial({
      color,
      emissive: color,
      emissiveIntensity: 0.2,
    });
    const arrowBody = new THREE.Mesh(arrowBodyGeometry, arrowMaterial);

    const midPoint = new THREE.Vector3()
      .addVectors(start, end)
      .multiplyScalar(0.5);
    arrowBody.position.copy(midPoint);
    arrowBody.lookAt(end);
    arrowBody.rotateX(Math.PI / 2);
    scene.add(arrowBody);

    // Arrow head
    const arrowHeadGeometry = new THREE.ConeGeometry(0.5 * size, 2 * size, 8);
    const arrowHead = new THREE.Mesh(arrowHeadGeometry, arrowMaterial);
    arrowHead.position.copy(end).sub(direction.multiplyScalar(1));
    arrowHead.lookAt(end);
    scene.add(arrowHead);
  };

  // Evaporation arrows (blue, from ocean upward)
  createFlowArrow(
    new THREE.Vector3(60, 4, 10),
    new THREE.Vector3(50, 20, 15),
    0x00bfff,
    0.8
  );
  createFlowArrow(
    new THREE.Vector3(70, 4, -10),
    new THREE.Vector3(60, 22, -5),
    0x87ceeb,
    0.8
  );
  createFlowArrow(
    new THREE.Vector3(65, 4, 20),
    new THREE.Vector3(55, 18, 25),
    0x00bfff,
    0.8
  );

  // Transpiration arrows (green, from forest areas)
  createFlowArrow(
    new THREE.Vector3(-20, 12, 15),
    new THREE.Vector3(-10, 25, 20),
    0x32cd32,
    0.7
  );
  createFlowArrow(
    new THREE.Vector3(15, 12, 20),
    new THREE.Vector3(25, 24, 25),
    0x228b22,
    0.7
  );

  // Precipitation arrows (dark blue, downward)
  createFlowArrow(
    new THREE.Vector3(5, 30, 5),
    new THREE.Vector3(0, 8, 8),
    0x191970,
    0.9
  );
  createFlowArrow(
    new THREE.Vector3(25, 28, -15),
    new THREE.Vector3(20, 6, -12),
    0x000080,
    0.9
  );

  // Runoff arrows (flowing toward ocean)
  createFlowArrow(
    new THREE.Vector3(10, 2, 10),
    new THREE.Vector3(35, 2, 5),
    0x4682b4,
    0.6
  );

  // Infiltration arrows (downward into ground)
  createFlowArrow(
    new THREE.Vector3(-5, 1, 15),
    new THREE.Vector3(-8, -6, 18),
    0x4169e1,
    0.5
  );
  createFlowArrow(
    new THREE.Vector3(10, 1, -5),
    new THREE.Vector3(7, -6, -2),
    0x1e90ff,
    0.5
  );

  // Groundwater flow arrows (underground, toward ocean)
  createFlowArrow(
    new THREE.Vector3(-20, -12, 10),
    new THREE.Vector3(20, -12, 5),
    0x0066cc,
    0.4
  );

  landscape.trees = treeLocations;
  landscape.mountains = mountains;
  landscape.ocean = ocean;

  return landscape;
};

export const createSun = (THREE, scene) => {
  // Enhanced sun with realistic glow effects
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 1.0,
    })
  );
  sun.position.set(70, 80, 40);
  scene.add(sun);

  // Add sun corona/glow effect with multiple layers
  const coronaGeometry = new THREE.SphereGeometry(12, 32, 32);
  const coronaMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.35,
    emissive: 0xffaa00,
    emissiveIntensity: 0.6,
  });
  const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
  corona.position.set(70, 80, 40);
  scene.add(corona);

  // Outer glow layer
  const outerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(16, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffcc66,
      transparent: true,
      opacity: 0.15,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    })
  );
  outerGlow.position.set(70, 80, 40);
  scene.add(outerGlow);

  // Enhanced sun rays with better visibility
  for (let i = 0; i < 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    const rayLength = 20 + Math.random() * 5;
    const rayGeometry = new THREE.CylinderGeometry(0.4, 0.1, rayLength, 6);
    const rayMaterial = new THREE.MeshBasicMaterial({
      color: 0xffff66,
      transparent: true,
      opacity: 0.8,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    });
    const ray = new THREE.Mesh(rayGeometry, rayMaterial);

    const x = Math.cos(angle) * 15;
    const z = Math.sin(angle) * 15;
    ray.position.set(70 + x, 80, 40 + z);
    ray.lookAt(new THREE.Vector3(70 + x * 2, 80, 40 + z * 2));
    scene.add(ray);
  }

  // Add atmospheric particles around sun
  for (let i = 0; i < 20; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 4),
      new THREE.MeshBasicMaterial({
        color: 0xffee88,
        transparent: true,
        opacity: 0.4,
      })
    );
    const radius = 25 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    particle.position.set(
      70 + radius * Math.sin(phi) * Math.cos(theta),
      80 + radius * Math.cos(phi),
      40 + radius * Math.sin(phi) * Math.sin(theta)
    );
    scene.add(particle);
  }

  return sun;
};

export const createSoilLayers = (THREE, scene) => {
  const soil = new THREE.Mesh(
    new THREE.BoxGeometry(100, 15, 70),
    new THREE.MeshStandardMaterial({ color: 0x8b6f47 })
  );
  soil.position.set(0, -7.5, 15);
  scene.add(soil);

  const groundwater = new THREE.Mesh(
    new THREE.BoxGeometry(100, 10, 70),
    new THREE.MeshStandardMaterial({ color: 0x4a6fa5 })
  );
  groundwater.position.set(0, -17.5, 15);
  scene.add(groundwater);

  return { soil, groundwater };
};

export const createRiver = (THREE, scene) => {
  const riverGeometry = new THREE.PlaneGeometry(3, 80);
  const riverMaterial = new THREE.MeshStandardMaterial({
    color: 0x4682b4,
    transparent: true,
    opacity: 0.7,
  });
  const river = new THREE.Mesh(riverGeometry, riverMaterial);
  river.rotation.x = -Math.PI / 2;
  river.position.set(-20, 0.1, 0);
  scene.add(river);
  return river;
};

export const createLighting = (THREE, scene) => {
  // Enhanced ambient lighting for better visibility
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  // Main directional light (sun)
  const directionalLight = new THREE.DirectionalLight(0xfff4e6, 1.0);
  directionalLight.position.set(60, 80, 40);
  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 2048;
  directionalLight.shadow.mapSize.height = 2048;
  directionalLight.shadow.camera.left = -150;
  directionalLight.shadow.camera.right = 150;
  directionalLight.shadow.camera.top = 100;
  directionalLight.shadow.camera.bottom = -100;
  directionalLight.shadow.camera.near = 0.5;
  directionalLight.shadow.camera.far = 500;
  directionalLight.shadow.bias = -0.0001;
  scene.add(directionalLight);

  // Add hemisphere light for natural sky/ground lighting
  const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.4);
  scene.add(hemisphereLight);

  // Subtle fill light from the opposite side
  const fillLight = new THREE.DirectionalLight(0x9eb4d4, 0.3);
  fillLight.position.set(-50, 30, -40);
  scene.add(fillLight);

  return { ambientLight, directionalLight, hemisphereLight, fillLight };
};
