export const createEducationalLandscape = (THREE, scene) => {
  const landscape = {};

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
    new THREE.Float32BufferAttribute(colors, 3)
  );
  terrainMaterial.vertexColors = true;

  const terrain = new THREE.Mesh(terrainGeometry, terrainMaterial);
  terrain.rotation.x = -Math.PI / 2;
  terrain.rotation.y = 0;
  terrain.position.y = 0;
  terrain.receiveShadow = true;
  terrain.castShadow = true;
  scene.add(terrain);

  const hillsGroup = new THREE.Group();

  const hillPositions = [
    { x: -48, z: -40, radius: 16, height: 14 },
    { x: -48, z: -20, radius: 18, height: 15 },
    { x: -48, z: 20, radius: 16, height: 14 },
    { x: -48, z: 40, radius: 18, height: 15 },
    { x: -45, z: -35, radius: 20, height: 16 },
    { x: -45, z: -18, radius: 18, height: 15 },
    { x: -45, z: 18, radius: 20, height: 16 },
    { x: -45, z: 50, radius: 16, height: 14 },
    { x: -42, z: -45, radius: 18, height: 15 },
    { x: -42, z: -25, radius: 16, height: 14 },
    { x: -42, z: 25, radius: 20, height: 16 },
    { x: -42, z: 40, radius: 18, height: 15 },
    { x: -38, z: -35, radius: 20, height: 16 },
    { x: -38, z: -18, radius: 18, height: 15 },
    { x: -38, z: 20, radius: 16, height: 14 },
    { x: -38, z: 45, radius: 20, height: 16 },
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
    { x: 33, z: 20, radius: 14, height: 5 },
    { x: 33, z: 40, radius: 12, height: 4 },
    { x: 33, z: 55, radius: 12, height: 4 },
    { x: 36, z: -50, radius: 10, height: 3 },
    { x: 36, z: -30, radius: 10, height: 3 },
    { x: 36, z: -18, radius: 12, height: 4 },
    { x: 36, z: 25, radius: 10, height: 3 },
    { x: 36, z: 45, radius: 10, height: 3 },
  ];

  hillPositions.forEach(({ x, z, radius, height }) => {
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
    mountainGroundMaterial
  );
  mountainGround.rotation.x = -Math.PI / 2;
  mountainGround.position.set(-60, 0.2, 0);
  mountainGround.receiveShadow = true;
  scene.add(mountainGround);

  const oceanGeometry = new THREE.BoxGeometry(90, 15, 120);
  const oceanMaterial = new THREE.MeshLambertMaterial({
    color: 0x1e6091,
    transparent: true,
    opacity: 0.9,
    emissive: 0x003366,
    emissiveIntensity: 0.25,
  });
  const ocean = new THREE.Mesh(oceanGeometry, oceanMaterial);
  ocean.position.set(55, -3, 0);
  ocean.receiveShadow = true;
  scene.add(ocean);

  // Create natural flowing river from mountains to ocean
  // River flows naturally at ground level with curved path

  // Create river using curved tube geometry for natural look
  const riverPoints = [
    new THREE.Vector3(-65, 18, 12),
    new THREE.Vector3(-50, 16, 8),
    new THREE.Vector3(-35, 14, 4),
    new THREE.Vector3(-20, 12, 0),
    new THREE.Vector3(-5, 10, -4),
    new THREE.Vector3(10, 8, -8),
    new THREE.Vector3(25, 5, -10),
    new THREE.Vector3(40, 2, -10),
  ];

  const riverCurve = new THREE.CatmullRomCurve3(riverPoints);

  // River water - using tube geometry for natural curved flow
  const riverTubeGeometry = new THREE.TubeGeometry(
    riverCurve,
    64,
    4,
    16,
    false
  );
  const riverMaterial = new THREE.MeshLambertMaterial({
    color: 0x2a7ab8,
    transparent: true,
    opacity: 0.85,
    emissive: 0x1a5276,
    emissiveIntensity: 0.25,
    side: THREE.DoubleSide,
  });
  const river = new THREE.Mesh(riverTubeGeometry, riverMaterial);
  river.position.y = 0;
  river.receiveShadow = true;
  scene.add(river);

  // River surface - flat water on top for shimmer effect
  const riverSurfacePoints = [];
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const point = riverCurve.getPoint(t);
    riverSurfacePoints.push(point);
  }

  // River width for bed segments
  const offset = 5;

  // Create river bed with natural look
  for (let i = 0; i < riverSurfacePoints.length; i++) {
    const p = riverSurfacePoints[i];
    const nextP =
      riverSurfacePoints[Math.min(i + 1, riverSurfacePoints.length - 1)];
    const dir = new THREE.Vector3().subVectors(nextP, p).normalize();

    // Add small random variation for natural look
    const variation = Math.sin(i * 0.3) * 0.5;
    const width = offset + variation;

    // Create river bed segment
    const bedGeometry = new THREE.PlaneGeometry(3, width * 2.2);
    const bedMaterial = new THREE.MeshLambertMaterial({
      color: 0x3d5a4a,
      side: THREE.DoubleSide,
    });
    const bedSegment = new THREE.Mesh(bedGeometry, bedMaterial);
    bedSegment.rotation.x = -Math.PI / 2;
    bedSegment.rotation.z = Math.atan2(dir.z, dir.x);
    bedSegment.position.set(p.x, p.y + 0.1, p.z);
    scene.add(bedSegment);
  }

  // River water surface - flowing water on top
  const riverWaterGeometry = new THREE.PlaneGeometry(110, 10, 60, 8);
  const riverWaterMaterial = new THREE.MeshLambertMaterial({
    color: 0x3498db,
    transparent: true,
    opacity: 0.8,
    emissive: 0x2980b9,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  });

  // Deform the water plane to follow the river path
  const waterVertices = riverWaterGeometry.attributes.position;
  for (let i = 0; i < waterVertices.count; i++) {
    const x = waterVertices.getX(i);
    const z = waterVertices.getZ(i);
    // Add gentle ripples
    const ripple = Math.sin(x * 0.2 + z * 0.1) * 0.3 + Math.cos(x * 0.15) * 0.2;
    waterVertices.setY(i, ripple);
  }
  waterVertices.needsUpdate = true;

  const riverWater = new THREE.Mesh(riverWaterGeometry, riverWaterMaterial);
  riverWater.rotation.x = -Math.PI / 2;
  riverWater.rotation.z = Math.PI * 0.08;
  riverWater.position.set(-12, 14, 0);
  riverWater.receiveShadow = true;
  scene.add(riverWater);

  // Add highlight layer for shimmer
  const riverHighlightGeometry = new THREE.PlaneGeometry(105, 6, 50, 5);
  const riverHighlightMaterial = new THREE.MeshLambertMaterial({
    color: 0x85c1e9,
    transparent: true,
    opacity: 0.4,
    emissive: 0x5dade2,
    emissiveIntensity: 0.15,
    side: THREE.DoubleSide,
  });
  const riverHighlight = new THREE.Mesh(
    riverHighlightGeometry,
    riverHighlightMaterial
  );
  riverHighlight.rotation.x = -Math.PI / 2;
  riverHighlight.rotation.z = Math.PI * 0.08;
  riverHighlight.position.set(-12, 14.3, 0);
  scene.add(riverHighlight);

  // Natural river rocks scattered along the path
  const riverRockMaterial = new THREE.MeshLambertMaterial({
    color: 0x5a6a7a,
  });

  // River rocks positioned along the new river path (z from 12 to -10)
  const riverRockPositions = [
    { x: -58, z: 10, y: 17, size: 1.5 },
    { x: -52, z: 8, y: 16, size: 1.2 },
    { x: -45, z: 6, y: 15, size: 1.8 },
    { x: -38, z: 4, y: 14, size: 1.0 },
    { x: -30, z: 2, y: 13, size: 1.6 },
    { x: -22, z: 0, y: 12, size: 1.3 },
    { x: -15, z: -2, y: 11, size: 1.5 },
    { x: -8, z: -4, y: 10, size: 1.1 },
    { x: 0, z: -5, y: 9, size: 1.4 },
    { x: 8, z: -6, y: 8, size: 1.2 },
    { x: 15, z: -7, y: 7, size: 1.6 },
    { x: 22, z: -8, y: 6, size: 1.0 },
    { x: 30, z: -9, y: 4, size: 1.3 },
    { x: 38, z: -10, y: 3, size: 1.1 },
  ];

  riverRockPositions.forEach(({ x, z, y, size }) => {
    const rockGeometry = new THREE.DodecahedronGeometry(size, 0);
    const rock = new THREE.Mesh(rockGeometry, riverRockMaterial);
    // Position rocks along river edges
    const offsetZ = (Math.random() - 0.5) * 6;
    rock.position.set(x, y, z + offsetZ);
    rock.rotation.set(
      Math.random() * Math.PI,
      Math.random() * Math.PI,
      Math.random() * Math.PI
    );
    rock.scale.set(1, 0.6, 1);
    rock.castShadow = true;
    rock.receiveShadow = true;
    scene.add(rock);
  });

  // Small waterfall/cascade from mountains
  const waterfallGeometry = new THREE.PlaneGeometry(8, 20);
  const waterfallMaterial = new THREE.MeshLambertMaterial({
    color: 0x87ceeb,
    transparent: true,
    opacity: 0.8,
    emissive: 0x5dade2,
    emissiveIntensity: 0.3,
    side: THREE.DoubleSide,
  });
  const waterfall = new THREE.Mesh(waterfallGeometry, waterfallMaterial);
  waterfall.position.set(-65, 25, 12);
  waterfall.rotation.y = Math.PI / 2.5;
  scene.add(waterfall);

  // Waterfall mist/splash
  const splashGeometry = new THREE.SphereGeometry(
    4,
    12,
    8,
    0,
    Math.PI * 2,
    0,
    Math.PI / 2
  );
  const splashMaterial = new THREE.MeshLambertMaterial({
    color: 0xb8d4e8,
    transparent: true,
    opacity: 0.5,
    emissive: 0x87ceeb,
    emissiveIntensity: 0.2,
  });
  const splash = new THREE.Mesh(splashGeometry, splashMaterial);
  splash.position.set(-63, 18, 12);
  scene.add(splash);

  // River mouth where it meets ocean
  const riverMouthGeometry = new THREE.CircleGeometry(8, 16);
  const riverMouthMaterial = new THREE.MeshLambertMaterial({
    color: 0x2a7ab8,
    transparent: true,
    opacity: 0.75,
    emissive: 0x1a5276,
    emissiveIntensity: 0.2,
    side: THREE.DoubleSide,
  });
  const riverMouth = new THREE.Mesh(riverMouthGeometry, riverMouthMaterial);
  riverMouth.rotation.x = -Math.PI / 2;
  riverMouth.position.set(42, 2, -10);
  scene.add(riverMouth);

  // Store river reference for animation
  landscape.river = river;
  landscape.riverSurface = riverWater;

  const waveGeometry = new THREE.PlaneGeometry(90, 120, 30, 30);
  const waveMaterial = new THREE.MeshLambertMaterial({
    color: 0x5599cc,
    transparent: true,
    opacity: 0.6,
    wireframe: false,
    side: THREE.DoubleSide,
  });
  const waves = new THREE.Mesh(waveGeometry, waveMaterial);
  waves.rotation.x = -Math.PI / 2;
  waves.position.set(55, 5, 0);
  waves.receiveShadow = true;

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

  waves.userData.originalPositions = originalPositions;
  waves.userData.time = 0;

  scene.add(waves);

  const mountains = [];
  const mountainData = [
    { x: -55, z: -25, height: 35, color: 0x8b7355 },
    { x: -55, z: 10, height: 32, color: 0x7a6b47 },
    { x: -60, z: 30, height: 38, color: 0x9d8464 },
    { x: -70, z: -35, height: 42, color: 0x9d8464 },
    { x: -70, z: 0, height: 45, color: 0x8b7355 },
    { x: -70, z: 35, height: 40, color: 0x7a6b47 },
    { x: -80, z: -20, height: 50, color: 0x8b7355 },
    { x: -80, z: 15, height: 55, color: 0x9d8464 },
    { x: -85, z: -5, height: 52, color: 0x7a6b47 },
    { x: -75, z: 45, height: 44, color: 0x8b7355 },
  ];

  mountainData.forEach(({ x, z, height, color }) => {
    createFallbackMountain(x, z, height, color);
  });

  function createFallbackMountain(x, z, height, color) {
    const mountainGeometry = new THREE.ConeGeometry(18, height, 16);

    const positions = mountainGeometry.attributes.position;
    for (let i = 0; i < positions.count; i++) {
      const px = positions.getX(i);
      const py = positions.getY(i);
      const pz = positions.getZ(i);
      const displacement = (1 - py / (height / 2)) * 2;
      positions.setX(i, px + (Math.random() - 0.5) * displacement);
      positions.setZ(i, pz + (Math.random() - 0.5) * displacement);
    }
    positions.needsUpdate = true;
    mountainGeometry.computeVertexNormals();

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

    const rockColors = [
      0x5a5a5a, 0x6b6b6b, 0x4a4a4a, 0x7a7a7a, 0x5c544a, 0x4d4639,
    ];

    const numRocks = 8 + Math.floor(Math.random() * 5);
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
        Math.random() * Math.PI
      );
      rock.scale.set(
        0.8 + Math.random() * 0.4,
        0.6 + Math.random() * 0.8,
        0.8 + Math.random() * 0.4
      );
      rock.castShadow = true;
      rock.receiveShadow = true;
      scene.add(rock);
    }

    // Realistic gem crystals - grey, white, and blue colors
    const gemColors = [
      { color: 0x8899aa, emissive: 0x667788, name: "grey" }, // Grey crystal
      { color: 0xa0a8b0, emissive: 0x889098, name: "silver" }, // Silver grey
      { color: 0xf0f4f8, emissive: 0xd0e0f0, name: "white" }, // White crystal
      { color: 0xe8eef4, emissive: 0xc0d0e0, name: "ice" }, // Ice white
      { color: 0x4a90d9, emissive: 0x2a70b9, name: "blue" }, // Blue crystal
      { color: 0x6bb3f0, emissive: 0x4b93d0, name: "lightblue" }, // Light blue
      { color: 0x3a6ea5, emissive: 0x1a4e85, name: "darkblue" }, // Dark blue
      { color: 0x7ec8e3, emissive: 0x5ea8c3, name: "aqua" }, // Aqua blue
    ];

    // Add gem clusters on mountains
    const numGemClusters = 4 + Math.floor(Math.random() * 4);
    for (let i = 0; i < numGemClusters; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.25 + Math.random() * 0.5;
      const radius = (1 - heightRatio) * 13;

      const clusterX = x + Math.cos(angle) * radius;
      const clusterY = heightRatio * height + 1;
      const clusterZ = z + Math.sin(angle) * radius;

      // Create a cluster of 2-4 gems
      const gemsInCluster = 2 + Math.floor(Math.random() * 3);
      const gemType = gemColors[Math.floor(Math.random() * gemColors.length)];

      for (let j = 0; j < gemsInCluster; j++) {
        const gemSize = 0.4 + Math.random() * 0.8;
        const gemGeometry = new THREE.OctahedronGeometry(gemSize, 0);
        const gemMaterial = new THREE.MeshLambertMaterial({
          color: gemType.color,
          emissive: gemType.emissive,
          emissiveIntensity: 0.3,
          transparent: true,
          opacity: 0.9,
        });
        const gem = new THREE.Mesh(gemGeometry, gemMaterial);

        // Position gems in a small cluster
        const offsetX = (Math.random() - 0.5) * 2;
        const offsetZ = (Math.random() - 0.5) * 2;
        gem.position.set(
          clusterX + offsetX,
          clusterY + j * 0.5,
          clusterZ + offsetZ
        );
        gem.rotation.set(
          Math.random() * Math.PI * 0.3,
          Math.random() * Math.PI,
          Math.random() * Math.PI * 0.3
        );
        gem.scale.y = 1.5 + Math.random() * 1.5;
        gem.castShadow = true;
        scene.add(gem);
      }
    }

    // Add larger crystal formations
    const numCrystals = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numCrystals; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.3 + Math.random() * 0.35;
      const radius = (1 - heightRatio) * 12;

      const crystalX = x + Math.cos(angle) * radius;
      const crystalY = heightRatio * height;
      const crystalZ = z + Math.sin(angle) * radius;

      // Large main crystal
      const crystalSize = 1.0 + Math.random() * 1.2;
      const crystalGeometry = new THREE.ConeGeometry(
        crystalSize * 0.4,
        crystalSize * 2,
        6
      );
      const gemType = gemColors[Math.floor(Math.random() * gemColors.length)];
      const crystalMaterial = new THREE.MeshLambertMaterial({
        color: gemType.color,
        emissive: gemType.emissive,
        emissiveIntensity: 0.25,
        transparent: true,
        opacity: 0.85,
      });
      const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
      crystal.position.set(crystalX, crystalY + crystalSize, crystalZ);
      crystal.rotation.x = (Math.random() - 0.5) * 0.4;
      crystal.rotation.z = (Math.random() - 0.5) * 0.4;
      crystal.castShadow = true;
      scene.add(crystal);

      // Smaller surrounding crystals
      for (let j = 0; j < 3; j++) {
        const smallSize = 0.4 + Math.random() * 0.5;
        const smallGeometry = new THREE.ConeGeometry(
          smallSize * 0.3,
          smallSize * 1.5,
          6
        );
        const smallCrystal = new THREE.Mesh(smallGeometry, crystalMaterial);
        const smallAngle = (j / 3) * Math.PI * 2 + Math.random() * 0.5;
        smallCrystal.position.set(
          crystalX + Math.cos(smallAngle) * 0.8,
          crystalY + smallSize * 0.5,
          crystalZ + Math.sin(smallAngle) * 0.8
        );
        smallCrystal.rotation.x = (Math.random() - 0.5) * 0.6;
        smallCrystal.rotation.z = (Math.random() - 0.5) * 0.6;
        smallCrystal.castShadow = true;
        scene.add(smallCrystal);
      }
    }

    // Keep some grey minerals for texture variety
    const mineralColors = [0x5a5a5a, 0x6a6a6a, 0x4a4a4a, 0x7a7a7a];

    const numMinerals = 2 + Math.floor(Math.random() * 2);
    for (let i = 0; i < numMinerals; i++) {
      const angle = Math.random() * Math.PI * 2;
      const heightRatio = 0.2 + Math.random() * 0.4;
      const radius = (1 - heightRatio) * 12;

      const mineralX = x + Math.cos(angle) * radius;
      const mineralY = heightRatio * height + 2;
      const mineralZ = z + Math.sin(angle) * radius;

      const mineralSize = 0.5 + Math.random() * 0.8;
      const mineralGeometry = new THREE.OctahedronGeometry(mineralSize, 0);
      const mineralColor =
        mineralColors[Math.floor(Math.random() * mineralColors.length)];
      const mineralMaterial = new THREE.MeshLambertMaterial({
        color: mineralColor,
        emissive: mineralColor,
        emissiveIntensity: 0.1,
      });
      const mineral = new THREE.Mesh(mineralGeometry, mineralMaterial);
      mineral.position.set(mineralX, mineralY, mineralZ);
      mineral.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, 0);
      mineral.scale.y = 1.5 + Math.random();
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
        2 + Math.random() * 2
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
        Math.PI / 2
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
        z + Math.sin(angle) * radius
      );
      snowPatch.scale.y = 0.3;
      scene.add(snowPatch);
    }
  }

  const trees = [];
  const treeLocations = [
    [-44, -40],
    [-44, -25],
    [-44, 35],
    [-44, 50],
    [-40, -50],
    [-40, -35],
    [-40, 40],
    [-40, 55],
    [-36, -45],
    [-36, -30],
    [-36, 38],
    [-36, 50],

    // Hill area trees - North side of river (z > river path)
    [-33, 35],
    [-33, 45],
    [-33, 55],
    [-28, 32],
    [-28, 42],
    [-28, 52],
    [-22, 30],
    [-22, 40],
    [-22, 50],
    [-18, 32],
    [-18, 42],
    [-18, 55],
    [-12, 30],
    [-12, 40],
    [-12, 50],
    [-8, 28],
    [-8, 38],
    [-8, 48],
    [-5, 30],
    [-5, 42],
    [-5, 52],
    [0, 28],
    [0, 40],
    [0, 50],
    [5, 25],
    [5, 38],
    [5, 48],
    [10, 22],
    [10, 35],
    [10, 45],
    [15, 20],
    [15, 32],
    [15, 45],
    [20, 18],
    [20, 30],
    [20, 42],
    [25, 15],
    [25, 28],
    [25, 40],
    [30, 12],
    [30, 25],
    [30, 38],
    [34, 10],
    [34, 22],
    [34, 35],

    // Hill area trees - South side of river (z < river path)
    [-33, -35],
    [-33, -45],
    [-33, -55],
    [-28, -30],
    [-28, -42],
    [-28, -52],
    [-22, -28],
    [-22, -38],
    [-22, -50],
    [-18, -25],
    [-18, -38],
    [-18, -50],
    [-12, -28],
    [-12, -40],
    [-12, -52],
    [-8, -30],
    [-8, -42],
    [-8, -52],
    [-5, -32],
    [-5, -45],
    [-5, -55],
    [0, -35],
    [0, -48],
    [5, -38],
    [5, -50],
    [10, -40],
    [10, -52],
    [15, -42],
    [15, -52],
    [20, -45],
    [20, -55],
    [25, -48],
    [25, -55],
    [30, -50],
    [34, -52],

    // Beach area trees (closer to ocean, x > 20)
    [22, 55],
    [26, 52],
    [30, 48],
    [22, -55],
    [26, -52],

    // Trees in empty spaces around river area (not too close to river)
    // North side - spread out from river (z > 15)
    [-55, 22],
    [-50, 25],
    [-45, 20],
    [-40, 24],
    [-35, 18],
    [-30, 22],
    [-25, 16],
    [-20, 20],
    [-15, 18],
    [-10, 16],
    [-5, 15],
    [0, 16],
    [5, 14],
    [10, 12],
    [15, 10],
    [20, 8],
    // South side - spread out from river (z < -15)
    [-55, -20],
    [-50, -22],
    [-45, -18],
    [-40, -20],
    [-35, -16],
    [-30, -18],
    [-25, -14],
    [-20, -16],
    [-15, -18],
    [-10, -20],
    [-5, -22],
    [0, -24],
    [5, -22],
    [10, -20],
    [15, -18],
    [20, -20],
  ];

  treeLocations.forEach(([x, z]) => {
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
                object.position.set(x, 12, z);
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
            loadTreeWithoutMaterial(x, z);
          }
        );
      } else {
        loadTreeWithoutMaterial(x, z);
      }
    } else {
      createSimpleTree(x, z);
    }

    trees.push([x, z]);
  });

  function loadTreeWithoutMaterial(x, z) {
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
        object.position.set(x, 12, z);
        object.scale.set(treeScale, treeScale, treeScale);
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

  function createSimpleTree(x, z) {
    const treeHeight = 4 + Math.random() * 2;
    const yOffset = 12;

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

    const canopyColors = [0x228b22, 0x2e8b57, 0x2d5016, 0x3cb371, 0x4ca656];
    for (let i = 0; i < 3; i++) {
      const canopyGeometry = new THREE.ConeGeometry(
        2 - i * 0.45,
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
    for (let j = 0; j < 4; j++) {
      const branchGeometry = new THREE.CylinderGeometry(0.08, 0.1, 0.75, 6);
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

  const createLabelSign = (text, subtext, position, color) => {
    const signGroup = new THREE.Group();

    const signWidth = 18;
    const signHeight = 8;
    const signGeometry = new THREE.PlaneGeometry(signWidth, signHeight);
    const signMaterial = new THREE.MeshBasicMaterial({
      color: 0x1e293b,
      transparent: true,
      opacity: 0.9,
      side: THREE.DoubleSide,
    });
    const signBoard = new THREE.Mesh(signGeometry, signMaterial);
    signGroup.add(signBoard);

    const borderGeometry = new THREE.PlaneGeometry(
      signWidth + 0.5,
      signHeight + 0.5
    );
    const borderMaterial = new THREE.MeshBasicMaterial({
      color: color,
      transparent: true,
      opacity: 0.8,
      side: THREE.DoubleSide,
    });
    const border = new THREE.Mesh(borderGeometry, borderMaterial);
    border.position.z = -0.1;
    signGroup.add(border);

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    canvas.width = 512;
    canvas.height = 256;

    ctx.fillStyle = "rgba(30, 41, 59, 0.95)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.strokeStyle = `#${color.toString(16).padStart(6, "0")}`;
    ctx.lineWidth = 8;
    ctx.strokeRect(4, 4, canvas.width - 8, canvas.height - 8);

    ctx.fillStyle = `#${color.toString(16).padStart(6, "0")}`;
    ctx.font = "bold 48px Segoe UI, Arial, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText(text, canvas.width / 2, 80);

    ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
    ctx.font = "24px Segoe UI, Arial, sans-serif";

    const words = subtext.split(" ");
    let line = "";
    let y = 140;
    const maxWidth = 460;

    for (let i = 0; i < words.length; i++) {
      const testLine = line + words[i] + " ";
      const metrics = ctx.measureText(testLine);
      if (metrics.width > maxWidth && i > 0) {
        ctx.fillText(line, canvas.width / 2, y);
        line = words[i] + " ";
        y += 35;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, canvas.width / 2, y);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;

    const textSignMaterial = new THREE.MeshBasicMaterial({
      map: texture,
      transparent: true,
      side: THREE.DoubleSide,
    });
    const textSign = new THREE.Mesh(signGeometry, textSignMaterial);
    textSign.position.z = 0.1;
    signGroup.add(textSign);

    signGroup.position.copy(position);
    signGroup.rotation.y = Math.PI;

    scene.add(signGroup);
    return signGroup;
  };

  createLabelSign(
    "1. Evaporation",
    "Sun heats water in oceans",
    new THREE.Vector3(55, -15, 55),
    0x00bfff
  );
  createLabelSign(
    "2. Condensation",
    "Water vapor forms clouds",
    new THREE.Vector3(0, -15, 55),
    0x87ceeb
  );
  createLabelSign(
    "3. Precipitation",
    "Water falls as rain when clouds get heavy",
    new THREE.Vector3(-30, -15, 55),
    0x4169e1
  );
  createLabelSign(
    "4. Collection",
    "Water gathers in rivers, lakes and oceans",
    new THREE.Vector3(-70, -15, 55),
    0x1e90ff
  );

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
    })
  );
  sun.position.set(70, 80, 40);
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
  corona.position.set(70, 80, 40);
  scene.add(corona);

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

export const createLighting = (THREE, scene) => {
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

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

  const hemisphereLight = new THREE.HemisphereLight(0x87ceeb, 0x8b7355, 0.4);
  scene.add(hemisphereLight);

  const fillLight = new THREE.DirectionalLight(0x9eb4d4, 0.3);
  fillLight.position.set(-50, 30, -40);
  scene.add(fillLight);

  return { ambientLight, directionalLight, hemisphereLight, fillLight };
};
