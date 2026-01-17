export const createEducationalLandscape = (THREE, scene) => {
  const landscape = {};

  // Terrain
  const terrainGeometry = new THREE.PlaneGeometry(200, 120, 80, 50);
  const terrainVertices = terrainGeometry.attributes.position;

  for (let i = 0; i < terrainVertices.count; i++) {
    const x = terrainVertices.getX(i);
    const z = terrainVertices.getZ(i);

    const normalizedX = (100 - x) / 200;
    const baseElevation = Math.pow(normalizedX, 2.2) * 40;

    let height = baseElevation;

    if (x < -30) {
      const mountainNoise = Math.sin(x * 0.15) * Math.cos(z * 0.12) * 15;
      const ridges = Math.abs(Math.sin(x * 0.08)) * 8;
      height += mountainNoise + ridges;
    } else if (x < 20) {
      height += Math.sin(x * 0.1) * Math.cos(z * 0.1) * 20;
      height += Math.sin(x * 0.05 + z * 0.05) * 12;
      if (x > -25 && x < 15) {
        height += 15;
      }
    } else {
      height += Math.sin(x * 0.06) * Math.cos(z * 0.06) * 2;
    }

    height += (Math.random() - 0.5) * 1.5;
    terrainVertices.setY(i, Math.max(height, 0));
  }
  terrainVertices.needsUpdate = true;
  terrainGeometry.computeVertexNormals();

  const terrainMaterial = new THREE.MeshLambertMaterial({
    color: 0x5a8c3e,
    roughness: 0.9,
    wireframe: false,
    flatShading: false,
    side: THREE.DoubleSide,
  });

  const colors = [];
  for (let i = 0; i < terrainVertices.count; i++) {
    const x = terrainVertices.getX(i);
    const height = terrainVertices.getY(i);
    let r, g, b;

    if (x > -25) {
      if (height < 6) {
        r = 0.3 + Math.random() * 0.08;
        g = 0.6 + Math.random() * 0.1;
        b = 0.2 + Math.random() * 0.05;
      } else {
        r = 0.35 + Math.random() * 0.08;
        g = 0.55 + Math.random() * 0.1;
        b = 0.25 + Math.random() * 0.05;
      }
    } else if (x > -30) {
      r = 0.45 + Math.random() * 0.1;
      g = 0.5 + Math.random() * 0.1;
      b = 0.3 + Math.random() * 0.05;
    } else {
      if (height > 25) {
        r = 0.9 + Math.random() * 0.1;
        g = 0.9 + Math.random() * 0.1;
        b = 0.95 + Math.random() * 0.05;
      } else if (height > 18) {
        r = 0.55 + Math.random() * 0.1;
        g = 0.45 + Math.random() * 0.1;
        b = 0.35 + Math.random() * 0.05;
      } else {
        r = 0.5 + Math.random() * 0.1;
        g = 0.48 + Math.random() * 0.1;
        b = 0.35 + Math.random() * 0.05;
      }
    }
    colors.push(r, g, b);
  }
  terrainGeometry.setAttribute(
    "color",
    new THREE.Float32BufferAttribute(colors, 3),
  );
  terrainMaterial.vertexColors = true;

  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrain.rotation.x = -Math.PI / 2;
  terrain.position.y = 0;
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  scene.add(terrain);

  // Hills
  const hillsGroup = new THREE.Group();
  const hillPositions = [
    { x: -48, z: -40, radius: 16, height: 20 },
    { x: -48, z: -20, radius: 18, height: 20 },
    { x: -48, z: 20, radius: 16, height: 20 },
    { x: -48, z: 40, radius: 18, height: 20 },
    { x: -45, z: -35, radius: 20, height: 18 },
    { x: -45, z: -18, radius: 18, height: 18 },
    { x: -45, z: 18, radius: 20, height: 18 },
    { x: -45, z: 50, radius: 16, height: 18 },
    { x: -42, z: -45, radius: 18, height: 15 },
    { x: -42, z: -25, radius: 16, height: 15 },
    { x: -42, z: 25, radius: 20, height: 15 },
    { x: -42, z: 40, radius: 18, height: 15 },
    { x: -38, z: -35, radius: 20, height: 14 },
    { x: -38, z: -18, radius: 18, height: 14 },
    { x: -38, z: 20, radius: 16, height: 14 },
    { x: -38, z: 45, radius: 20, height: 14 },
    { x: -35, z: -50, radius: 16, height: 14 },
    { x: -35, z: -25, radius: 18, height: 15 },
    { x: -35, z: 22, radius: 20, height: 16 },
    { x: -35, z: 50, radius: 16, height: 14 },
    { x: -32, z: -40, radius: 18, height: 14 },
    { x: -32, z: -20, radius: 20, height: 15 },
    { x: -32, z: 20, radius: 18, height: 14 },
    { x: -32, z: 40, radius: 20, height: 15 },
    { x: -28, z: -35, radius: 22, height: 13 },
    { x: -28, z: -18, radius: 24, height: 14 },
    { x: -28, z: 18, radius: 22, height: 13 },
    { x: -28, z: 35, radius: 22, height: 13 },
    { x: -25, z: -45, radius: 20, height: 12 },
    { x: -25, z: -20, radius: 22, height: 13 },
    { x: -25, z: 20, radius: 24, height: 14 },
    { x: -25, z: 45, radius: 20, height: 12 },
    { x: -22, z: -30, radius: 22, height: 12 },
    { x: -22, z: 30, radius: 22, height: 12 },
    { x: -18, z: 28, radius: 20, height: 11 },
    { x: -15, z: -28, radius: 22, height: 12 },
    { x: -10, z: 25, radius: 24, height: 13 },
    { x: -8, z: -22, radius: 20, height: 11 },
    { x: -5, z: 30, radius: 18, height: 10 },
    { x: -3, z: -30, radius: 20, height: 11 },
    { x: 0, z: 25, radius: 22, height: 12 },
    { x: 3, z: -28, radius: 18, height: 10 },
    { x: 5, z: -25, radius: 20, height: 11 },
    { x: 8, z: 22, radius: 18, height: 10 },
    { x: 10, z: -20, radius: 20, height: 10 },
    { x: 12, z: 25, radius: 18, height: 9 },
    { x: 15, z: -18, radius: 20, height: 10 },
    { x: 18, z: 20, radius: 18, height: 9 },
    { x: 20, z: -40, radius: 20, height: 8 },
    { x: 20, z: -22, radius: 18, height: 8 },
    { x: 20, z: 22, radius: 20, height: 9 },
    { x: 20, z: 40, radius: 18, height: 8 },
    { x: 24, z: -50, radius: 18, height: 7 },
    { x: 24, z: -30, radius: 18, height: 7 },
    { x: 24, z: -18, radius: 20, height: 8 },
    { x: 24, z: 18, radius: 18, height: 7 },
    { x: 24, z: 35, radius: 20, height: 8 },
    { x: 24, z: 50, radius: 18, height: 7 },
    { x: 28, z: -45, radius: 16, height: 6 },
    { x: 28, z: -25, radius: 16, height: 6 },
    { x: 28, z: 20, radius: 18, height: 7 },
    { x: 28, z: 35, radius: 16, height: 6 },
    { x: 28, z: 55, radius: 16, height: 6 },
    { x: 30, z: -50, radius: 14, height: 5 },
    { x: 30, z: -28, radius: 14, height: 5 },
    { x: 30, z: 22, radius: 16, height: 6 },
    { x: 30, z: 50, radius: 14, height: 5 },
    { x: 33, z: -40, radius: 12, height: 4 },
    { x: 33, z: -20, radius: 12, height: 4 },
    { x: 33, z: 20, radius: 14, height: 3 },
    { x: 33, z: 40, radius: 12, height: 4 },
    { x: 33, z: 55, radius: 12, height: 4 },
    { x: 36, z: -50, radius: 10, height: 2 },
    { x: 36, z: -30, radius: 10, height: 2 },
    { x: 36, z: -18, radius: 12, height: 2 },
    { x: 36, z: 25, radius: 10, height: 2 },
    { x: 36, z: 45, radius: 10, height: 2 },
    { x: 38, z: -12, radius: 10, height: 1 },
    { x: 38, z: 0, radius: 12, height: 1 },
    { x: 38, z: 12, radius: 10, height: 1 },
    { x: 40, z: -8, radius: 8, height: 1 },
    { x: 40, z: 5, radius: 10, height: 1 },
    { x: 42, z: -5, radius: 5, height: 1 },
    { x: 42, z: 8, radius: 15, height: 1 },
    { x: -50, z: 0, radius: 18, height: 19 },
    { x: -47, z: -50, radius: 17, height: 17 },
    { x: -47, z: 50, radius: 17, height: 17 },
    { x: -43, z: -10, radius: 19, height: 16 },
    { x: -43, z: 10, radius: 19, height: 16 },
    { x: -40, z: 0, radius: 20, height: 15 },
    { x: -40, z: -50, radius: 18, height: 14 },
    { x: -40, z: 50, radius: 18, height: 14 },
  ];

  hillPositions.forEach(({ x, z, radius, height }) => {
    const hillGeometry = new THREE.SphereGeometry(
      radius,
      32,
      32,
      0,
      Math.PI * 2,
      0,
      Math.PI / 2,
    );
    const hillMaterial = new THREE.MeshLambertMaterial({
      color: 0x4a7c3e,
      vertexColors: false,
    });
    const hill = new THREE.Mesh(hillGeometry, hillMaterial);
    hill.position.set(x, 0, z);
    hill.scale.y = height / radius;
    hill.receiveShadow = true;
    hill.castShadow = true;
    hillsGroup.add(hill);
  });

  scene.add(hillsGroup);
  const soilGeometry = new THREE.BoxGeometry(140, 8, 120);
  const soilMaterial = new THREE.MeshLambertMaterial({
    color: 0x8b4513,
    roughness: 0.9,
    emissive: 0x221100,
    emissiveIntensity: 0.05,
  });
  const soil = new THREE.Mesh(soilGeometry, soilMaterial);
  soil.position.set(-30, -8, 0);
  scene.add(soil);

  const rockGeometry = new THREE.BoxGeometry(140, 15, 120);
  const rockMaterial = new THREE.MeshLambertMaterial({
    color: 0x696969,
    roughness: 1.0,
    emissive: 0x111111,
    emissiveIntensity: 0.03,
  });
  const rock = new THREE.Mesh(rockGeometry, rockMaterial);
  rock.position.set(-30, -20, 0);
  scene.add(rock);

  const groundCoverGeometry = new THREE.PlaneGeometry(60, 120);
  const groundCoverMaterial = new THREE.MeshLambertMaterial({
    color: 0x5a8c3e,
    side: THREE.DoubleSide,
  });
  const groundCover = new THREE.Mesh(groundCoverGeometry, groundCoverMaterial);
  groundCover.rotation.x = -Math.PI / 2;
  groundCover.position.set(10, 0.1, 0);
  groundCover.receiveShadow = true;
  scene.add(groundCover);

  const mountainGroundGeometry = new THREE.PlaneGeometry(80, 120);
  const mountainGroundMaterial = new THREE.MeshLambertMaterial({
    color: 0x6b5344,
    side: THREE.DoubleSide,
  });
  const mountainGround = new THREE.Mesh(
    mountainGroundGeometry,
    mountainGroundMaterial,
  );
  mountainGround.rotation.x = -Math.PI / 2;
  mountainGround.position.set(-60, 0.2, 0);
  mountainGround.receiveShadow = true;
  scene.add(mountainGround);

  // Ocean
  const oceanGeometry = new THREE.BoxGeometry(65, 15, 120);
  const oceanMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e6091,
    transparent: true,
    opacity: 0.9,
    emissive: 0x003366,
    emissiveIntensity: 0.25,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.position.set(67.5, -3, 0);
  ocean.receiveShadow = true;
  scene.add(ocean);

  // River
  const riverPoints = [
    new THREE.Vector3(-60, 8, 12),
    new THREE.Vector3(-50, 12, 10),
    new THREE.Vector3(-40, 12, 8),
    new THREE.Vector3(-30, 12, 4),
    new THREE.Vector3(-20, 10, 0),
    new THREE.Vector3(-5, 8, -5),
    new THREE.Vector3(10, 6, 0),
    new THREE.Vector3(20, 5, -10),
    new THREE.Vector3(30, 5, -20),
    new THREE.Vector3(40, 1, -30),
  ];

  const riverCurve = new THREE.CatmullRomCurve3(riverPoints);

  const riverTubeGeometry = new THREE.TubeGeometry(
    riverCurve,
    100,
    5,
    24,
    false,
  );
  const riverMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e6091,
    transparent: true,
    opacity: 0.88,
    emissive: 0x003366,
    emissiveIntensity: 0.25,
    side: THREE.DoubleSide,
  });
  const river = new THREE.Mesh(riverTubeGeometry, riverMaterial);
  river.position.y = 0;
  river.receiveShadow = true;
  scene.add(river);

  const riverSurfaceGeometry = new THREE.TubeGeometry(
    riverCurve,
    100,
    5.5,
    24,
    false,
  );
  const riverSurfaceMaterial = new THREE.MeshLambertMaterial({
    color: 0x5599cc,
    transparent: true,
    opacity: 0.45,
    emissive: 0x4488bb,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  });
  const riverSurfaceMesh = new THREE.Mesh(
    riverSurfaceGeometry,
    riverSurfaceMaterial,
  );
  riverSurfaceMesh.position.y = 0.5;
  scene.add(riverSurfaceMesh);

  const riverMouthGeometry = new THREE.CircleGeometry(10, 32);
  const riverMouthMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e6091,
    transparent: true,
    opacity: 0.8,
    emissive: 0x003366,
    emissiveIntensity: 0.25,
    side: THREE.DoubleSide,
  });
  const riverMouth = new THREE.Mesh(riverMouthGeometry, riverMouthMaterial);
  riverMouth.rotation.x = -Math.PI / 2;
  riverMouth.position.set(42, 2.5, -10);
  scene.add(riverMouth);

  landscape.river = river;
  landscape.riverSurface = riverSurfaceMesh;
  landscape.riverCurve = riverCurve;

  // Mountains
  const mountains = [];
  const mountainData = [
    { x: -55, z: -25, height: 35, color: 0x8b7355 },
    { x: -60, z: 30, height: 38, color: 0x9d8464 },
    { x: -70, z: -35, height: 42, color: 0x9d8464 },
    { x: -70, z: 0, height: 45, color: 0x8b7355 },
    { x: -80, z: -20, height: 50, color: 0x8b7355 },
    { x: -80, z: 15, height: 55, color: 0x9d8464 },
    { x: -75, z: 45, height: 44, color: 0x8b7355 },
  ];

  mountainData.forEach(({ x, z, height, color }) => {
    createRealisticMountain(x, z, height, color);
  });

  function createRealisticMountain(x, z, height, color) {
    const baseRadius = 20 + Math.random() * 5;
    const mountainGeometry = new THREE.ConeGeometry(baseRadius, height, 24, 8);
    const positions = mountainGeometry.attributes.position;

    for (let i = 0; i < positions.count; i++) {
      const px = positions.getX(i);
      const py = positions.getY(i);
      const pz = positions.getZ(i);

      const heightFactor = (py + height / 2) / height;
      const roughness = (1 - heightFactor) * 4 + 0.5;

      const noiseX = Math.sin(py * 0.3 + px * 0.5) * roughness;
      const noiseZ = Math.cos(py * 0.3 + pz * 0.5) * roughness;
      const randomDisp = (Math.random() - 0.5) * roughness * 1.5;

      positions.setX(i, px + noiseX + randomDisp);
      positions.setZ(i, pz + noiseZ + randomDisp);

      if (heightFactor < 0.9) {
        positions.setY(i, py + (Math.random() - 0.5) * roughness * 0.5);
      }
    }
    positions.needsUpdate = true;
    mountainGeometry.computeVertexNormals();

    const colors = [];
    for (let i = 0; i < positions.count; i++) {
      const py = positions.getY(i);
      const heightFactor = (py + height / 2) / height;

      let r, g, b;
      if (heightFactor > 0.75) {
        r = 0.95 + Math.random() * 0.05;
        g = 0.95 + Math.random() * 0.05;
        b = 0.98 + Math.random() * 0.02;
      } else if (heightFactor > 0.55) {
        const grey = 0.45 + Math.random() * 0.15;
        r = grey;
        g = grey * 0.95;
        b = grey * 0.9;
      } else if (heightFactor > 0.3) {
        r = 0.45 + Math.random() * 0.1;
        g = 0.35 + Math.random() * 0.1;
        b = 0.25 + Math.random() * 0.08;
      } else {
        r = 0.35 + Math.random() * 0.1;
        g = 0.38 + Math.random() * 0.1;
        b = 0.28 + Math.random() * 0.08;
      }
      colors.push(r, g, b);
    }
    mountainGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(colors, 3),
    );

    const mountainMaterial = new THREE.MeshLambertMaterial({
      vertexColors: true,
      flatShading: true,
    });
    const mountain = new THREE.Mesh(mountainGeometry, mountainMaterial);
    mountain.position.set(x, height / 2, z);
    mountain.castShadow = true;
    mountain.receiveShadow = true;
    scene.add(mountain);
    mountains.push(mountain);

    // Secondary peaks
    const numSecondaryPeaks = 2 + Math.floor(Math.random() * 2);
    for (let p = 0; p < numSecondaryPeaks; p++) {
      const peakAngle =
        (p / numSecondaryPeaks) * Math.PI * 2 + Math.random() * 0.5;
      const peakDist = baseRadius * 0.4 + Math.random() * baseRadius * 0.3;
      const peakHeight = height * (0.5 + Math.random() * 0.3);
      const peakRadius = baseRadius * (0.3 + Math.random() * 0.2);

      const peakGeometry = new THREE.ConeGeometry(
        peakRadius,
        peakHeight,
        12,
        4,
      );
      const peakPositions = peakGeometry.attributes.position;

      for (let i = 0; i < peakPositions.count; i++) {
        const ppx = peakPositions.getX(i);
        const ppy = peakPositions.getY(i);
        const ppz = peakPositions.getZ(i);
        const disp = (1 - (ppy + peakHeight / 2) / peakHeight) * 2;
        peakPositions.setX(i, ppx + (Math.random() - 0.5) * disp);
        peakPositions.setZ(i, ppz + (Math.random() - 0.5) * disp);
      }
      peakPositions.needsUpdate = true;
      peakGeometry.computeVertexNormals();

      const peakColors = [];
      for (let i = 0; i < peakPositions.count; i++) {
        const ppy = peakPositions.getY(i);
        const hf = (ppy + peakHeight / 2) / peakHeight;
        let r, g, b;
        if (hf > 0.7) {
          r = 0.9 + Math.random() * 0.1;
          g = 0.9 + Math.random() * 0.1;
          b = 0.95 + Math.random() * 0.05;
        } else {
          const grey = 0.4 + Math.random() * 0.2;
          r = grey * 1.1;
          g = grey;
          b = grey * 0.9;
        }
        peakColors.push(r, g, b);
      }
      peakGeometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(peakColors, 3),
      );

      const peakMaterial = new THREE.MeshLambertMaterial({
        vertexColors: true,
        flatShading: true,
      });
      const peak = new THREE.Mesh(peakGeometry, peakMaterial);
      peak.position.set(
        x + Math.cos(peakAngle) * peakDist,
        peakHeight / 2,
        z + Math.sin(peakAngle) * peakDist,
      );
      peak.castShadow = true;
      peak.receiveShadow = true;
      scene.add(peak);
    }
    // Add rocky outcrops and cliff faces
    const numCliffs = 3 + Math.floor(Math.random() * 3);
    for (let c = 0; c < numCliffs; c++) {
      const cliffAngle = Math.random() * Math.PI * 2;
      const cliffHeight = height * (0.2 + Math.random() * 0.3);
      const cliffDist = baseRadius * (0.6 + Math.random() * 0.3);

      const cliffGeometry = new THREE.BoxGeometry(
        3 + Math.random() * 4,
        cliffHeight,
        2 + Math.random() * 3,
      );

      // Distort cliff for natural look
      const cliffPos = cliffGeometry.attributes.position;
      for (let i = 0; i < cliffPos.count; i++) {
        cliffPos.setX(i, cliffPos.getX(i) + (Math.random() - 0.5) * 1.5);
        cliffPos.setZ(i, cliffPos.getZ(i) + (Math.random() - 0.5) * 1.5);
      }
      cliffPos.needsUpdate = true;
      cliffGeometry.computeVertexNormals();

      const cliffColors = [0x5a5a5a, 0x6a6a6a, 0x555555, 0x4a4a4a];
      const cliffMaterial = new THREE.MeshLambertMaterial({
        color: cliffColors[Math.floor(Math.random() * cliffColors.length)],
        flatShading: true,
      });
      const cliff = new THREE.Mesh(cliffGeometry, cliffMaterial);
      cliff.position.set(
        x + Math.cos(cliffAngle) * cliffDist,
        cliffHeight / 2 + Math.random() * height * 0.2,
        z + Math.sin(cliffAngle) * cliffDist,
      );
      cliff.rotation.y = cliffAngle + Math.PI / 2;
      cliff.rotation.x = (Math.random() - 0.5) * 0.3;
      cliff.castShadow = true;
      cliff.receiveShadow = true;
      scene.add(cliff);
    }
    // Rocks, gems, crystals...
    const rockColors = [
      0x5a5a5a, 0x6b6b6b, 0x4a4a4a, 0x7a7a7a, 0x5c544a, 0x4d4639,
    ];

    const numRocks = 12 + Math.floor(Math.random() * 8);
    for (let i = 0; i < numRocks; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.2 + Math.random() * 0.5;
      const radius = (1 - heightRatio) * 14;

      const rockX = x + Math.cos(angle) * radius * (0.5 + Math.random() * 0.5);
      const rockY = heightRatio * height + Math.random() * 3;
      const rockZ = z + Math.sin(angle) * radius * (0.5 + Math.random() * 0.5);

      const rockSize = 0.8 + Math.random() * 1.5;
      const rockGeometry = new THREE.DodecahedronGeometry(rockSize, 0);
      const rockColor =
        rockColors[Math.floor(Math.random() * rockColors.length)];
      const rockMaterial = new THREE.MeshLambertMaterial({
        color: rockColor,
        emissive: rockColor,
        emissiveIntensity: 0.05,
      });
      const rock = new THREE.Mesh(rockGeometry, rockMaterial);
      rock.position.set(rockX, rockY, rockZ);
      rock.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );
      rock.scale.set(
        0.8 + Math.random() * 0.4,
        0.6 + Math.random() * 0.8,
        0.8 + Math.random() * 0.4,
      );
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    }

    // Gem crystals
    const gemColors = [
      { color: 0xf0f4f8, emissive: 0xd0e0f0, name: "white" },
      { color: 0xe8eef4, emissive: 0xc0d0e0, name: "ice" },
      { color: 0xffffff, emissive: 0xe0e0ff, name: "diamond" },
      { color: 0xc8d4dc, emissive: 0xa8b4bc, name: "platinum" },
      { color: 0x8899aa, emissive: 0x667788, name: "grey" },
      { color: 0xa0a8b0, emissive: 0x889098, name: "silver" },
    ];

    const numGemClusters = 6 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numGemClusters; i++) {
      const angle = (i / numGemClusters) * Math.PI * 2 + Math.random() * 0.5;
      const heightRatio = 0.15 + Math.random() * 0.6;
      const radius = (1 - heightRatio) * 15;

      const clusterX = x + Math.cos(angle) * radius;
      const clusterY = heightRatio * height + 1;
      const clusterZ = z + Math.sin(angle) * radius;

      const gemsInCluster = 2 + Math.floor(Math.random() * 3);
      const gemType = gemColors[Math.floor(Math.random() * gemColors.length)];

      for (let j = 0; j < gemsInCluster; j++) {
        const gemSize = 1.0 + Math.random() * 1.5;
        const gemGeometry = new THREE.OctahedronGeometry(gemSize, 0);
        const gemMaterial = new THREE.MeshLambertMaterial({
          color: gemType.color,
          emissive: gemType.emissive,
          emissiveIntensity: 0.5,
          transparent: true,
          opacity: 0.92,
        });
        const gem = new THREE.Mesh(gemGeometry, gemMaterial);

        const offsetX = (Math.random() - 0.5) * 3;
        const offsetZ = (Math.random() - 0.5) * 3;
        gem.position.set(
          clusterX + offsetX,
          clusterY + j * 0.7,
          clusterZ + offsetZ,
        );
        gem.rotation.set(
          Math.random() * Math.PI * 0.3,
          Math.random() * Math.PI,
          Math.random() * Math.PI * 0.3,
        );
        gem.scale.y = 2.0 + Math.random() * 2.0;
        gem.castShadow = true;
        scene.add(gem);
      }
    }

    // Crystal formations
    const numCrystals = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numCrystals; i++) {
      const angle = (i / numCrystals) * Math.PI * 2 + Math.random() * 0.3;
      const heightRatio = 0.2 + Math.random() * 0.45;
      const radius = (1 - heightRatio) * 14;

      const crystalX = x + Math.cos(angle) * radius;
      const crystalY = heightRatio * height;
      const crystalZ = z + Math.sin(angle) * radius;

      const crystalSize = 2.0 + Math.random() * 2.0;
      const crystalGeometry = new THREE.ConeGeometry(
        crystalSize * 0.6,
        crystalSize * 3,
        6,
      );
      const gemType = gemColors[Math.floor(Math.random() * gemColors.length)];
      const crystalMaterial = new THREE.MeshLambertMaterial({
        color: gemType.color,
        emissive: gemType.emissive,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.9,
      });
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
      crystal.position.set(crystalX, crystalY + crystalSize, crystalZ);
      crystal.rotation.x = (Math.random() - 0.5) * 0.4;
      crystal.rotation.z = (Math.random() - 0.5) * 0.4;
      crystal.castShadow = true;
      scene.add(crystal);

      const numSurrounding = 3 + Math.floor(Math.random() * 2);
      for (let j = 0; j < numSurrounding; j++) {
        const smallSize = 0.8 + Math.random() * 1.0;
        const smallGeometry = new THREE.ConeGeometry(
          smallSize * 0.4,
          smallSize * 2.2,
          6,
        );
        const smallCrystal = new THREE.Mesh(smallGeometry, crystalMaterial);
        const smallAngle =
          (j / numSurrounding) * Math.PI * 2 + Math.random() * 0.4;
        smallCrystal.position.set(
          crystalX + Math.cos(smallAngle) * 1.8,
          crystalY + smallSize * 0.5,
          crystalZ + Math.sin(smallAngle) * 1.8,
        );
        smallCrystal.rotation.x = (Math.random() - 0.5) * 0.6;
        smallCrystal.rotation.z = (Math.random() - 0.5) * 0.6;
        smallCrystal.castShadow = true;
        scene.add(smallCrystal);
      }
    }

    // Crystal spires
    const numSpires = 1 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numSpires; i++) {
      const spireAngle = (i / numSpires) * Math.PI * 2 + Math.random() * 0.5;
      const spireRadius = baseRadius * 0.55;
      const spireX = x + Math.cos(spireAngle) * spireRadius;
      const spireZ = z + Math.sin(spireAngle) * spireRadius;
      const spireY = height * 0.3;

      const spireHeight = 6 + Math.random() * 5;
      const spireGeometry = new THREE.ConeGeometry(1.8, spireHeight, 6);
      const spireType = gemColors[Math.floor(Math.random() * gemColors.length)];
      const spireMaterial = new THREE.MeshLambertMaterial({
        color: spireType.color,
        emissive: spireType.emissive,
        emissiveIntensity: 0.55,
        transparent: true,
        opacity: 0.92,
      });
      const spire = new THREE.Mesh(spireGeometry, spireMaterial);
      spire.position.set(spireX, spireY + spireHeight / 2, spireZ);
      spire.rotation.x = (Math.random() - 0.5) * 0.15;
      spire.rotation.z = (Math.random() - 0.5) * 0.15;
      spire.castShadow = true;
      scene.add(spire);

      for (let k = 0; k < 3; k++) {
        const miniAngle = (k / 3) * Math.PI * 2;
        const miniSize = 1.2 + Math.random() * 0.8;
        const miniGeometry = new THREE.ConeGeometry(0.6, miniSize * 2, 6);
        const miniCrystal = new THREE.Mesh(miniGeometry, spireMaterial);
        miniCrystal.position.set(
          spireX + Math.cos(miniAngle) * 2,
          spireY + miniSize * 0.4,
          spireZ + Math.sin(miniAngle) * 2,
        );
        miniCrystal.rotation.x = (Math.random() - 0.5) * 0.5;
        miniCrystal.rotation.z = (Math.random() - 0.5) * 0.5;
        miniCrystal.castShadow = true;
        scene.add(miniCrystal);
      }
    }

    if (Math.random() > 0.6) {
      const massiveType =
        gemColors[Math.floor(Math.random() * gemColors.length)];
      const massiveHeight = 8 + Math.random() * 4;
      const massiveGeometry = new THREE.ConeGeometry(2.5, massiveHeight, 8);
      const massiveMaterial = new THREE.MeshLambertMaterial({
        color: massiveType.color,
        emissive: massiveType.emissive,
        emissiveIntensity: 0.6,
        transparent: true,
        opacity: 0.88,
      });
      const massiveCrystal = new THREE.Mesh(massiveGeometry, massiveMaterial);
      massiveCrystal.position.set(x, height * 0.45 + massiveHeight / 2, z);
      massiveCrystal.rotation.x = (Math.random() - 0.5) * 0.1;
      massiveCrystal.rotation.z = (Math.random() - 0.5) * 0.1;
      massiveCrystal.castShadow = true;
      scene.add(massiveCrystal);

      for (let r = 0; r < 4; r++) {
        const ringAngle = (r / 4) * Math.PI * 2;
        const ringSize = 1.5 + Math.random() * 1;
        const ringGeometry = new THREE.ConeGeometry(0.8, ringSize * 2.5, 6);
        const ringCrystal = new THREE.Mesh(ringGeometry, massiveMaterial);
        ringCrystal.position.set(
          x + Math.cos(ringAngle) * 4,
          height * 0.4 + ringSize * 0.5,
          z + Math.sin(ringAngle) * 4,
        );
        ringCrystal.rotation.x = (Math.random() - 0.5) * 0.3;
        ringCrystal.rotation.z = (Math.random() - 0.5) * 0.3;
        ringCrystal.castShadow = true;
        scene.add(ringCrystal);
      }
    }

    const numVeins = 1 + Math.floor(Math.random() * 2);
    for (let v = 0; v < numVeins; v++) {
      const veinAngle = (v / numVeins) * Math.PI * 2 + Math.random() * 0.5;
      const veinType = gemColors[Math.floor(Math.random() * gemColors.length)];
      const veinLength = 4 + Math.floor(Math.random() * 4);

      for (let g = 0; g < veinLength; g++) {
        const veinRadius = baseRadius * (0.4 + g * 0.05);
        const veinHeightRatio = 0.2 + g * 0.06;
        const gemX = x + Math.cos(veinAngle + g * 0.1) * veinRadius;
        const gemY = veinHeightRatio * height;
        const gemZ = z + Math.sin(veinAngle + g * 0.1) * veinRadius;

        const veinGemSize = 0.8 + Math.random() * 0.8;
        const veinGemGeometry = new THREE.OctahedronGeometry(veinGemSize, 0);
        const veinGemMaterial = new THREE.MeshLambertMaterial({
          color: veinType.color,
          emissive: veinType.emissive,
          emissiveIntensity: 0.45,
          transparent: true,
          opacity: 0.88,
        });
        const veinGem = new THREE.Mesh(veinGemGeometry, veinGemMaterial);
        veinGem.position.set(
          gemX + (Math.random() - 0.5) * 1.5,
          gemY,
          gemZ + (Math.random() - 0.5) * 1.5,
        );
        veinGem.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        );
        veinGem.scale.y = 1.5 + Math.random() * 1.5;
        veinGem.castShadow = true;
        scene.add(veinGem);
      }
    }

    const mineralColors = [0x5a5a5a, 0x6a6a6a, 0x4a4a4a, 0x7a7a7a, 0x888888];

    const numMinerals = 3 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numMinerals; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.15 + Math.random() * 0.5;
      const radius = (1 - heightRatio) * 14;

      const mineralX = x + Math.cos(angle) * radius;
      const mineralY = heightRatio * height + 2;
      const mineralZ = z + Math.sin(angle) * radius;

      const mineralSize = 1.0 + Math.random() * 1.2;
      const mineralGeometry = new THREE.OctahedronGeometry(mineralSize, 0);
      const mineralColor =
        mineralColors[Math.floor(Math.random() * mineralColors.length)];
      const mineralMaterial = new THREE.MeshLambertMaterial({
        color: mineralColor,
        emissive: mineralColor,
        emissiveIntensity: 0.15,
      });
      const mineral = new THREE.Mesh(mineralGeometry, mineralMaterial);
      mineral.position.set(mineralX, mineralY, mineralZ);
      mineral.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mineral.scale.y = 1.5 + Math.random() * 1.2;
      mineral.castShadow = true;
      scene.add(mineral);
    }

    const numLedges = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numLedges; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.15 + Math.random() * 0.35;
      const radius = (1 - heightRatio) * 15;

      const ledgeX = x + Math.cos(angle) * radius;
      const ledgeY = heightRatio * height;
      const ledgeZ = z + Math.sin(angle) * radius;

      const ledgeGeometry = new THREE.BoxGeometry(
        3 + Math.random() * 2,
        1 + Math.random() * 1.5,
        2 + Math.random() * 2,
      );
      const ledgeColor =
        rockColors[Math.floor(Math.random() * rockColors.length)];
      const ledgeMaterial = new THREE.MeshLambertMaterial({
        color: ledgeColor,
        emissive: ledgeColor,
        emissiveIntensity: 0.05,
      });
      const ledge = new THREE.Mesh(ledgeGeometry, ledgeMaterial);
      ledge.position.set(ledgeX, ledgeY, ledgeZ);
      ledge.rotation.y = angle;
      ledge.rotation.x = (Math.random() - 0.5) * 0.3;
      ledge.castShadow = true;
      ledge.receiveShadow = true;
      scene.add(ledge);
    }

    const snowCapGeometry = new THREE.ConeGeometry(8, height * 0.35, 16);
    const snowCapMaterial = new THREE.MeshLambertMaterial({
      color: 0xffffff,
      emissive: 0xccddff,
      emissiveIntensity: 0.2,
    });
    const snowCap = new THREE.Mesh(snowCapGeometry, snowCapMaterial);
    snowCap.position.set(x, height - 5, z);
    scene.add(snowCap);

    const numSnowPatches = 2 + Math.floor(Math.random() * 3);
    for (let i = 0; i < numSnowPatches; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.5 + Math.random() * 0.3;
      const radius = (1 - heightRatio) * 10;

      const snowPatchGeometry = new THREE.SphereGeometry(
        1 + Math.random(),
        8,
        6,
        0,
        Math.PI * 2,
        0,
        Math.PI / 2,
      );
      const snowPatchMaterial = new THREE.MeshLambertMaterial({
        color: 0xf5f5f5,
        emissive: 0xddeeff,
        emissiveIntensity: 0.1,
      });
      const snowPatch = new THREE.Mesh(snowPatchGeometry, snowPatchMaterial);
      snowPatch.position.set(
        x + Math.cos(angle) * radius,
        heightRatio * height,
        z + Math.sin(angle) * radius,
      );
      snowPatch.scale.y = 0.3;
      scene.add(snowPatch);
    }
  }

  // Trees
  const treeLocations = [
    [-44, -35],
    [-44, 40],
    [-40, -50],
    [-40, 50],
    [-42, 0],
    [-38, -20],
    [-46, 25],
    [-46, -10],
    [-28, 45],
    [-28, -45],
    [-22, 35],
    [-22, -38],
    [-18, 40],
    [-18, -40],
    [-12, 45],
    [-8, 35],
    [-8, -38],
    [-5, 48],
    [0, 38],
    [5, 42],
    [5, -45],
    [10, 38],
    [15, 38],
    [15, -42],
    [20, 35],
    [25, 35],
    [25, -48],
    [30, -45],
    [-15, 45],
    [8, -50],
    [22, -38],
    [-35, 22],
    [-30, 20],
    [-20, 18],
    [-15, 18],
    [0, 15],
    [15, 12],
    [-28, -20],
    [-25, -18],
    [-15, -22],
    [-10, -20],
    [5, -25],
    [10, -22],
    [-40, 18],
    [20, -28],
  ];
  // Function to find hill height at tree location
  function getHillHeightAtLocation(treeX, treeZ) {
    let closestHill = null;
    let closestDistance = Infinity;

    hillPositions.forEach((hill) => {
      const distance = Math.sqrt(
        Math.pow(treeX - hill.x, 2) + Math.pow(treeZ - hill.z, 2),
      );
      if (distance < closestDistance) {
        closestDistance = distance;
        closestHill = hill;
      }
    });

    if (closestHill && closestDistance < 20) {
      // Hill mesh is positioned at y=0 and scaled by height/radius
      // The top of the hill is at: (height / radius) * radius = height
      const hillTopHeight = closestHill.height;
      return hillTopHeight; // No offset - trees sit directly on hill surface
    }

    // Fallback: calculate terrain height using same algorithm as terrain
    const normalizedX = (100 - treeX) / 200;
    let height = Math.pow(normalizedX, 2.2) * 40;

    if (treeX < -30) {
      const mountainNoise =
        Math.sin(treeX * 0.15) * Math.cos(treeZ * 0.12) * 15;
      const ridges = Math.abs(Math.sin(treeX * 0.08)) * 8;
      height += mountainNoise + ridges;
    } else if (treeX < 20) {
      height += Math.sin(treeX * 0.1) * Math.cos(treeZ * 0.1) * 20;
      height += Math.sin(treeX * 0.05 + treeZ * 0.05) * 12;
      if (treeX > -25 && treeX < 15) {
        height += 15;
      }
    } else {
      height += Math.sin(treeX * 0.06) * Math.cos(treeZ * 0.06) * 2;
    }

    return Math.max(height, 0);
  }

  treeLocations.forEach(([x, z]) => {
    const treeHeight = getHillHeightAtLocation(x, z);

    if (window.THREE && window.THREE.OBJLoader) {
      const loader = new THREE.OBJLoader();

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
                object.traverse((child) => {
                  if (child.isMesh) {
                    child.castShadow = true;
                    child.receiveShadow = true;
                    if (child.material) {
                      child.material.side = THREE.DoubleSide;
                    }
                  }
                });

                const treeScale = 0.4 + Math.random() * 0.2;
                object.position.set(x, treeHeight, z);
                object.scale.set(treeScale, treeScale, treeScale);
                object.rotation.y = Math.random() * Math.PI * 2;

                scene.add(object);
              },
              undefined,
              (error) => {
                console.warn(
                  "Failed to load 3D tree model, using fallback:",
                  error,
                );
                createSimpleTree(x, z, treeHeight);
              },
            );
          },
          undefined,
          (error) => {
            console.warn(
              "Failed to load MTL, loading OBJ without materials:",
              error,
            );
            loadTreeWithoutMaterial(x, z, treeHeight);
          },
        );
      } else {
        loadTreeWithoutMaterial(x, z, treeHeight);
      }
    } else {
      createSimpleTree(x, z, treeHeight);
    }
  });

  function loadTreeWithoutMaterial(x, z, treeHeight) {
    const loader = new THREE.OBJLoader();
    loader.load(
      "/Lowpoly_tree_sample.obj",
      (object) => {
        object.traverse((child) => {
          if (child.isMesh) {
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

        const treeScale = 0.4 + Math.random() * 0.2;
        object.position.set(x, treeHeight, z);
        object.scale.set(treeScale, treeScale, treeScale);
        object.rotation.y = Math.random() * Math.PI * 2;

        scene.add(object);
      },
      undefined,
      (error) => {
        console.warn("Failed to load 3D tree model, using fallback:", error);
        createSimpleTree(x, z, treeHeight);
      },
    );
  }

  function createSimpleTree(x, z, treeHeight) {
    const treeHeightScale = 4 + Math.random() * 2;
    const yOffset = treeHeight;

    const trunkGeometry = new THREE.CylinderGeometry(
      0.3,
      0.45,
      treeHeightScale * 0.6,
      12,
    );
    const trunkMaterial = new THREE.MeshLambertMaterial({
      color: 0x5c4033,
      roughness: 1.0,
      emissive: 0x1a0f0a,
      emissiveIntensity: 0.05,
    });
    const trunk = new THREE.Mesh(trunkGeometry, trunkMaterial);
    trunk.position.set(x, yOffset + treeHeightScale * 0.3, z);
    trunk.castShadow = true;
    trunk.receiveShadow = true;
    scene.add(trunk);

    const canopyColors = [0x228b22, 0x2e8b57, 0x2d5016, 0x3cb371, 0x4ca656];
    for (let i = 0; i < 3; i++) {
      const canopyGeometry = new THREE.ConeGeometry(
        2 - i * 0.45,
        treeHeightScale * 0.5,
        14,
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
        yOffset + treeHeightScale * 0.65 + i * 0.75,
        z + (Math.random() - 0.5) * 0.5,
      );
      canopy.castShadow = true;
      canopy.receiveShadow = true;
      scene.add(canopy);
    }

    for (let j = 0; j < 4; j++) {
      const branchGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.75, 6);
      const branch = new THREE.Mesh(branchGeometry, trunkMaterial);
      const angle = (j / 4) * Math.PI * 2;
      branch.position.set(
        x + Math.cos(angle) * 0.35,
        yOffset + treeHeightScale * 0.4 + j * 0.25,
        z + Math.sin(angle) * 0.35,
      );
      branch.rotation.z = Math.PI / 4;
      branch.rotation.y = angle;
      branch.castShadow = true;
      scene.add(branch);
    }
  }

  landscape.trees = treeLocations;
  landscape.mountains = mountains;
  landscape.ocean = ocean;
  landscape.river = river;

  return landscape;
};

export const createSun = (THREE, scene) => {
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(8, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffd700,
      emissive: 0xffd700,
      emissiveIntensity: 1.0,
    }),
  );
  sun.position.set(65, 75, -30);
  scene.add(sun);

  const coronaGeometry = new THREE.SphereGeometry(12, 32, 32);
  const coronaMaterial = new THREE.MeshBasicMaterial({
    color: 0xffaa00,
    transparent: true,
    opacity: 0.35,
    emissive: 0xffaa00,
    emissiveIntensity: 0.6,
  });
  const corona = new THREE.Mesh(coronaGeometry, coronaMaterial);
  corona.position.set(65, 75, -30);
  scene.add(corona);

  const outerGlow = new THREE.Mesh(
    new THREE.SphereGeometry(16, 32, 32),
    new THREE.MeshBasicMaterial({
      color: 0xffcc66,
      transparent: true,
      opacity: 0.15,
      emissive: 0xffaa00,
      emissiveIntensity: 0.3,
    }),
  );
  outerGlow.position.set(65, 75, -30);
  scene.add(outerGlow);

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
    ray.position.set(65 + x, 75, -30 + z);
    ray.lookAt(new THREE.Vector3(65 + x * 2, 75, -30 + z * 2));
    scene.add(ray);
  }

  for (let i = 0; i < 20; i++) {
    const particle = new THREE.Mesh(
      new THREE.SphereGeometry(0.2, 6, 4),
      new THREE.MeshBasicMaterial({
        color: 0xffee88,
        transparent: true,
        opacity: 0.4,
      }),
    );
    const radius = 25 + Math.random() * 15;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.random() * Math.PI;
    particle.position.set(
      65 + radius * Math.sin(phi) * Math.cos(theta),
      75 + radius * Math.cos(phi),
      0 + radius * Math.sin(phi) * Math.sin(theta),
    );
    scene.add(particle);
  }

  return sun;
};

export const createLighting = (THREE, scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xfff4e6, 1.0);
  directionalLight.position.set(60, 80, -30);
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

  const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.4);
  scene.add(hemisphereLight);

  const fillLight = new THREE.DirectionalLight(0x9eb4d4, 0.3);
  fillLight.position.set(-50, 30, -40);
  scene.add(fillLight);

  return { ambientLight, directionalLight, hemisphereLight, fillLight };
};
