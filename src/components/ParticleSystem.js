export const createWaterParticles = (THREE, scene, count = 300) => {
  const waterParticles = [];
  for (let i = 0; i < count; i++) {
    // Assign MORE particles to river for better visibility
    const isRiverParticle = i < 150; // First 150 particles start in river (more coverage)

    // River particles spread along entire river with random offsets
    const riverProgressValue = isRiverParticle ? Math.random() : 0; // Random spread along river

    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(isRiverParticle ? 0.5 : 0.35, 12, 12), // River particles
        new THREE.MeshLambertMaterial({
          color: isRiverParticle ? 0x1565c0 : 0x1e6091, // Dark blue for river
          transparent: true,
          opacity: isRiverParticle ? 0.85 : 0.95,
          emissive: isRiverParticle ? 0x0d47a1 : 0x003366, // Dark blue emissive
          emissiveIntensity: isRiverParticle ? 0.5 : 0.4,
          reflectivity: 0.9,
        })
      ),
      position: isRiverParticle
        ? new THREE.Vector3(
            -50 + riverProgressValue * 90, // Mountain (-50) to Ocean (40)
            20 + Math.random() * 5, // HIGH position - above river
            (Math.random() - 0.5) * 8 // Wider spread across river width
          )
        : new THREE.Vector3(
            45 + Math.random() * 40, // Ocean area
            -0.3,
            (Math.random() - 0.5) * 70
          ),
      velocity: new THREE.Vector3(0, 0, 0),
      stage: isRiverParticle ? "river" : "collection",
      riverProgress: riverProgressValue, // Spread along entire river
      riverOffset: isRiverParticle ? (Math.random() - 0.5) * 8 : 0, // Width offset
      riverSpeed: isRiverParticle ? 0.002 + Math.random() * 0.002 : 0, // Varied speeds
      age: 0,
      maxAge: 800 + Math.random() * 400,
      shimmerPhase: Math.random() * Math.PI * 2, // For shimmer effect
    };
    particle.mesh.position.copy(particle.position);
    particle.mesh.castShadow = true;
    particle.mesh.receiveShadow = true;
    if (isRiverParticle) {
      particle.mesh.scale.setScalar(2.0 + Math.random() * 2.0); // Varied sizes
    }
    scene.add(particle.mesh);
    waterParticles.push(particle);
  }
  return waterParticles;
};

export const createVaporParticles = (THREE, scene, count = 150) => {
  const vaporParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.4, 10, 10),
        new THREE.MeshLambertMaterial({
          color: 0x3a7ca5,
          transparent: true,
          opacity: 0,
          emissive: 0x2a5a7a,
          emissiveIntensity: 0.5,
          reflectivity: 0.4,
        })
      ),
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      active: false,
      age: 0,
      maxAge: 400,
      type: "evaporation",
      swayPhase: Math.random() * Math.PI * 2, // For swaying motion
      pulsPhase: Math.random() * Math.PI * 2, // For pulsing effect
    };
    particle.mesh.position.copy(particle.position);
    scene.add(particle.mesh);
    vaporParticles.push(particle);
  }
  return vaporParticles;
};

export const createClouds = (THREE, scene, count = 18) => {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const cloudGroup = new THREE.Group();
    const cloudParticles = [];

    // Create fluffy, beautiful cloud with more particles
    const numMainPuffs = 18 + Math.floor(Math.random() * 8);
    for (let j = 0; j < numMainPuffs; j++) {
      const size = 2 + Math.random() * 2.5;
      const cloudParticle = new THREE.Mesh(
        new THREE.SphereGeometry(size, 20, 20),
        new THREE.MeshLambertMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.9,
          emissive: 0xddeeff,
          emissiveIntensity: 0.15,
        })
      );

      // Create a more natural cloud shape
      const angle = (j / numMainPuffs) * Math.PI * 2;
      const radius = 3 + Math.random() * 2.5;
      const heightVar = Math.sin(angle * 1.5) * 1.5 + (Math.random() - 0.5) * 2;
      cloudParticle.position.x =
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      cloudParticle.position.y = heightVar;
      cloudParticle.position.z =
        Math.sin(angle) * radius * 0.7 + (Math.random() - 0.5) * 3;

      cloudGroup.add(cloudParticle);
      cloudParticles.push(cloudParticle);
    }

    // Add extra fluffy outer puffs
    for (let k = 0; k < 12; k++) {
      const wispSize = 1.2 + Math.random() * 1.0;
      const wispyParticle = new THREE.Mesh(
        new THREE.SphereGeometry(wispSize, 16, 16),
        new THREE.MeshLambertMaterial({
          color: 0xf8f8ff,
          transparent: true,
          opacity: 0.5,
          emissive: 0xeeeeff,
          emissiveIntensity: 0.1,
        })
      );
      const wispAngle = (k / 12) * Math.PI * 2;
      const wispRadius = 5 + Math.random() * 2;
      wispyParticle.position.x = Math.cos(wispAngle) * wispRadius;
      wispyParticle.position.y = (Math.random() - 0.5) * 2.5;
      wispyParticle.position.z = Math.sin(wispAngle) * wispRadius * 0.5;
      cloudGroup.add(wispyParticle);
      cloudParticles.push(wispyParticle);
    }

    const startX = 40 + Math.random() * 35;
    cloudGroup.position.set(
      startX,
      42 + Math.random() * 12,
      Math.random() * 80 - 40
    );
    cloudGroup.scale.set(1.0, 0.8, 1.0);
    scene.add(cloudGroup);

    clouds.push({
      mesh: cloudGroup,
      particles: cloudParticles,
      waterContent: 0,
      maxWaterContent: 2.0,
      speed: -0.06 - Math.random() * 0.03,
      driftPhase: Math.random() * Math.PI * 2,
      bobPhase: Math.random() * Math.PI * 2,
      puffPhase: Math.random() * Math.PI * 2,
      stage: "forming",
    });
  }
  return clouds;
};

export const createPrecipitationParticles = (THREE, scene, count = 120) => {
  const precipitationParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.28, 8, 8),
        new THREE.MeshLambertMaterial({
          color: 0x1a4670,
          transparent: true,
          opacity: 0,
          emissive: 0x0a2040,
        })
      ),
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      active: false,
      age: 0,
    };
    particle.mesh.position.copy(particle.position);
    particle.mesh.castShadow = true;
    scene.add(particle.mesh);
    precipitationParticles.push(particle);
  }
  return precipitationParticles;
};

export const createGroundwaterParticles = (THREE, scene, count = 40) => {
  const groundwaterParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.16, 8, 8),
        new THREE.MeshLambertMaterial({
          color: 0x1a4d72,
          transparent: true,
          opacity: 0,
          emissive: 0x001122,
        })
      ),
      position: new THREE.Vector3(0, -100, 0),
      velocity: new THREE.Vector3(0, 0, 0),
      active: false,
      depth: 0,
      age: 0,
    };
    particle.mesh.position.copy(particle.position);
    scene.add(particle.mesh);
    groundwaterParticles.push(particle);
  }
  return groundwaterParticles;
};

export const updateWaterParticles = (waterParticles, riverCurve) => {
  waterParticles.forEach((p) => {
    p.age++;
    p.shimmerPhase += 0.08;

    if (
      p.stage === "collection" ||
      p.stage === "runoff" ||
      p.stage === "river"
    ) {
      // RIVER FLOW - continuous water flowing in river
      if (p.stage === "river") {
        // Move along the river curve
        p.riverProgress =
          (p.riverProgress || 0) + 0.003 + Math.random() * 0.002;

        if (p.riverProgress >= 1) {
          // Reached the ocean - become collection
          p.stage = "collection";
          p.position.set(
            50 + Math.random() * 30,
            -0.2,
            Math.random() * 50 - 25
          );
          p.riverProgress = 0;
        } else if (riverCurve) {
          // Follow the river curve with some variation
          const point = riverCurve.getPoint(p.riverProgress);
          const offset = (Math.random() - 0.5) * 3;
          p.position.set(
            point.x + offset,
            point.y + Math.sin(p.shimmerPhase) * 0.3,
            point.z + offset * 0.5
          );
        }
      }

      // RUNOFF - water flowing from mountains toward river
      else if (p.stage === "runoff") {
        p.position.x += 0.15;
        p.position.y = Math.max(-0.2, p.position.y - 0.05);

        // When reaching river area, join the river
        if (p.position.x > -50 && p.position.x < 40) {
          p.stage = "river";
          p.riverProgress = Math.max(0, (p.position.x + 65) / 105); // Start at appropriate point
        }

        // If passed river, go to collection
        if (p.position.x > 45) {
          p.stage = "collection";
        }
      }

      // COLLECTION - water in ocean, gentle bobbing
      else if (p.stage === "collection") {
        p.position.y =
          -0.2 + Math.sin(Date.now() * 0.003 + p.position.x * 0.2) * 0.1;

        // Slight drift in ocean
        p.position.x += (Math.random() - 0.5) * 0.02;
        p.position.z += (Math.random() - 0.5) * 0.02;

        // Keep in ocean area
        if (p.position.x < 40) p.position.x = 40 + Math.random() * 40;
        if (p.position.x > 90) p.position.x = 90;
      }

      // Enhanced shimmer effect
      const shimmer = 0.85 + Math.sin(p.shimmerPhase) * 0.15;
      p.mesh.material.opacity = shimmer;
      p.mesh.material.emissiveIntensity =
        0.25 + Math.sin(p.shimmerPhase * 0.5) * 0.1;

      // Color based on stage - use ocean color for all
      if (p.stage === "river") {
        p.mesh.material.color.setHex(0x1e6091); // Match ocean blue
      } else {
        p.mesh.material.color.setHex(0x1e6091); // Ocean blue
      }
    }

    if (p.age > p.maxAge && p.stage === "evaporated") {
      p.stage = "collection";
      p.position.set(50 + Math.random() * 30, -0.2, Math.random() * 50 - 25);
      p.age = 0;
      p.mesh.material.opacity = 0.9;
      p.shimmerPhase = Math.random() * Math.PI * 2;
    }

    p.mesh.position.copy(p.position);
  });
};

export const processEvaporation = (
  waterParticles,
  vaporParticles,
  evapRate
) => {
  waterParticles.forEach((p) => {
    if (p.stage === "collection" && Math.random() < evapRate * 0.035) {
      const vapor = vaporParticles.find((v) => !v.active);
      if (vapor) {
        vapor.active = true;
        vapor.type = "evaporation";
        vapor.position.copy(p.position);
        vapor.position.y += 0.5;

        vapor.velocity.y = 0.15 + Math.random() * 0.1;
        vapor.velocity.x = (Math.random() - 0.5) * 0.04;
        vapor.velocity.z = (Math.random() - 0.5) * 0.04;

        vapor.mesh.position.copy(vapor.position);
        vapor.mesh.material.opacity = 0.7;
        vapor.mesh.material.color.setHex(0x3a7ca5);
        vapor.mesh.scale.setScalar(2.0);
        vapor.age = 0;

        p.stage = "evaporated";
        p.mesh.material.opacity = 0.4;
      }
    }
  });
};

export const processTranspiration = (
  treeLocations,
  vaporParticles,
  transpRate
) => {
  treeLocations.forEach(([x, z]) => {
    if (Math.random() < transpRate * 0.025) {
      const vapor = vaporParticles.find((v) => !v.active);
      if (vapor) {
        vapor.active = true;
        vapor.type = "transpiration";

        vapor.position.set(
          x + (Math.random() - 0.5) * 8,
          11 + Math.random() * 4,
          z + (Math.random() - 0.5) * 8
        );
        vapor.velocity.y = 0.1 + Math.random() * 0.06;
        vapor.velocity.x = (Math.random() - 0.5) * 0.05;
        vapor.velocity.z = (Math.random() - 0.5) * 0.05;

        vapor.mesh.position.copy(vapor.position);
        vapor.mesh.material.opacity = 0.35;
        vapor.mesh.material.color.setHex(0x90ee90);
        vapor.age = 0;
      }
    }
  });
};

export const updateVaporMovement = (vaporParticles, clouds, condensRate) => {
  vaporParticles.forEach((p) => {
    if (p.active) {
      p.age++;
      p.swayPhase += 0.05;
      p.pulsPhase += 0.08;

      p.position.add(p.velocity);

      // Enhanced swaying motion with more realistic drift
      const swayX = Math.sin(p.swayPhase + p.position.y * 0.1) * 0.015;
      const swayZ = Math.cos(p.swayPhase * 0.8 + p.position.y * 0.08) * 0.012;
      p.position.x += swayX;
      p.position.z += swayZ;

      // Pulsing opacity and size effect
      const pulseOpacity = Math.sin(p.pulsPhase) * 0.2;
      const pulseScale = 1 + Math.sin(p.pulsPhase * 0.7) * 0.3;

      p.mesh.material.opacity = Math.max(
        0.1,
        0.5 - p.position.y / 60 + pulseOpacity
      );
      p.mesh.scale.setScalar(pulseScale);

      // Enhanced emissive effect for vapor visibility
      p.mesh.material.emissiveIntensity = 0.4 + Math.sin(p.pulsPhase) * 0.3;

      p.mesh.position.copy(p.position);

      // Condense vapor into clouds - prefer clouds over ocean (x > 20)
      if (p.position.y > 20 && Math.random() < condensRate * 0.04) {
        // Find nearest cloud, preferring clouds over ocean
        const oceanClouds = clouds.filter((c) => c.mesh.position.x > 20);
        const targetClouds = oceanClouds.length > 0 ? oceanClouds : clouds;

        const nearestCloud = targetClouds.reduce((closest, cloud) => {
          const dist = p.position.distanceTo(cloud.mesh.position);
          return dist < (closest.dist || Infinity) ? { cloud, dist } : closest;
        }, {});

        if (nearestCloud.cloud && nearestCloud.dist < 30) {
          p.active = false;
          p.position.set(0, -100, 0);
          p.mesh.position.copy(p.position);
          p.mesh.material.opacity = 0;
          p.mesh.scale.setScalar(1);
          nearestCloud.cloud.waterContent += 0.18;
        }
      }

      if (p.position.y > 70 || p.age > p.maxAge) {
        p.active = false;
        p.position.set(0, -100, 0);
        p.mesh.position.copy(p.position);
        p.mesh.material.opacity = 0;
        p.mesh.scale.setScalar(1);
        p.age = 0;
      }
    }
  });
};

export const updateClouds = (clouds, precipitationParticles) => {
  clouds.forEach((cloud) => {
    cloud.waterContent = Math.max(cloud.waterContent - 0.001, 0);
    cloud.driftPhase += 0.015;
    cloud.bobPhase += 0.02;
    cloud.puffPhase += 0.008;

    // Beautiful cloud animation - gentle puffing and color changes
    cloud.particles.forEach((p, idx) => {
      const opacity = 0.75 + cloud.waterContent * 0.2;
      const grayness = cloud.waterContent > 1.0 ? 0.65 : 1.0;
      p.material.opacity = Math.min(0.92, opacity);
      p.material.color.setRGB(grayness, grayness, grayness);

      // Gentle puffing animation - particles breathe in and out
      const puffScale = 1 + Math.sin(cloud.puffPhase + idx * 0.3) * 0.08;
      p.scale.setScalar(puffScale);

      // Subtle glow based on water content
      const glowIntensity = 0.12 + cloud.waterContent * 0.08;
      p.material.emissiveIntensity = glowIntensity;
    });

    // Smooth cloud movement with gentle bobbing
    cloud.mesh.position.x += cloud.speed;
    cloud.mesh.position.y += Math.sin(cloud.bobPhase) * 0.04; // Gentle up/down bob
    cloud.mesh.position.z += Math.cos(cloud.driftPhase * 0.6) * 0.03; // Subtle drift

    // Gentle rotation for more life
    cloud.mesh.rotation.y += 0.0003;

    // Update cloud stage based on position
    if (cloud.mesh.position.x > 20) {
      cloud.stage = "forming";
    } else if (cloud.mesh.position.x > -40 && cloud.mesh.position.x <= 20) {
      cloud.stage = "traveling";
    } else if (cloud.mesh.position.x <= -40) {
      cloud.stage = "raining";
    }

    // Reset cloud to ocean side when it goes too far left
    if (cloud.mesh.position.x < -90) {
      cloud.mesh.position.x = 75;
      cloud.waterContent = 0;
      cloud.stage = "forming";
    }

    // Rain MORE over mountains (left side, x < -40)
    const isOverMountains = cloud.mesh.position.x < -40;
    const rainChance = isOverMountains ? 0.12 : 0.025;

    if (cloud.waterContent > 1.0 && Math.random() < rainChance) {
      const precip = precipitationParticles.find((p) => !p.active);
      if (precip) {
        precip.active = true;
        precip.position.set(
          cloud.mesh.position.x + (Math.random() - 0.5) * 14,
          cloud.mesh.position.y - 4,
          cloud.mesh.position.z + (Math.random() - 0.5) * 10
        );
        precip.velocity.y = -0.22 - Math.random() * 0.08;
        precip.velocity.x = (Math.random() - 0.5) * 0.03;
        precip.mesh.position.copy(precip.position);
        precip.mesh.material.opacity = 0.85;
        precip.age = 0;
        precip.landingX = precip.position.x;
        cloud.waterContent -= 0.12;
      }
    }
  });
};

export const updatePrecipitation = (
  precipitationParticles,
  waterParticles,
  groundwaterParticles
) => {
  precipitationParticles.forEach((p) => {
    if (p.active) {
      p.age++;
      p.position.add(p.velocity);

      p.mesh.material.opacity = 0.8 + Math.sin(p.position.y * 0.5) * 0.2;
      p.mesh.position.copy(p.position);

      if (p.position.y <= 0) {
        p.active = false;
        p.position.set(0, -100, 0);
        p.mesh.position.copy(p.position);
        p.mesh.material.opacity = 0;

        // Check if landed on mountains (left side, x < -20)
        const onMountains = p.position.x < -20;

        if (onMountains) {
          // Rain on mountains becomes RUNOFF toward ocean
          const water = waterParticles.find((w) => w.stage === "evaporated");
          if (water) {
            water.stage = "runoff"; // New stage for water flowing from mountains
            water.position.set(
              p.position.x + (Math.random() - 0.5) * 2,
              -0.2,
              p.position.z + (Math.random() - 0.5) * 2
            );
            water.age = 0;
            water.mesh.position.copy(water.position);
            water.mesh.material.opacity = 0.9;
          }
        } else {
          // Rain elsewhere becomes collection or groundwater
          if (Math.random() > 0.4) {
            const water = waterParticles.find((w) => w.stage === "evaporated");
            if (water) {
              water.stage = "collection";
              water.position.set(
                p.position.x + (Math.random() - 0.5) * 2,
                -0.2,
                p.position.z + (Math.random() - 0.5) * 2
              );
              water.age = 0;
              water.mesh.position.copy(water.position);
              water.mesh.material.opacity = 0.9;
            }
          } else {
            const gw = groundwaterParticles.find((g) => !g.active);
            if (gw) {
              gw.active = true;
              gw.position.set(
                p.position.x,
                -8 + Math.random() * 4,
                p.position.z
              );
              gw.velocity.x = (Math.random() - 0.5) * 0.02;
              gw.depth = Math.random() * 10;
              gw.mesh.position.copy(gw.position);
              gw.mesh.material.opacity = 0.7;
              gw.age = 0;
            }
          }
        }
      }
    }
  });
};

export const updateGroundwater = (groundwaterParticles, waterParticles) => {
  groundwaterParticles.forEach((p) => {
    if (p.active) {
      p.age++;

      p.position.x += p.velocity.x;
      p.position.y += Math.sin(Date.now() * 0.001 + p.position.x * 0.1) * 0.005;

      if (p.position.x > 20) {
        p.velocity.x = Math.max(p.velocity.x - 0.0005, -0.015);
      }
      if (p.position.x < -40) {
        p.velocity.x = Math.min(p.velocity.x + 0.0005, 0.015);
      }

      p.mesh.position.copy(p.position);

      if (
        Math.random() < 0.003 ||
        (Math.abs(p.position.x + 30) < 8 && Math.random() < 0.02)
      ) {
        p.active = false;
        p.position.set(0, -100, 0);
        p.mesh.position.copy(p.position);
        p.mesh.material.opacity = 0;

        const water = waterParticles.find((w) => w.stage === "evaporated");
        if (water) {
          water.stage = "collection";
          water.position.set(-30 + Math.random() * 8, -0.2, p.position.z);
          water.age = 0;
          water.mesh.position.copy(water.position);
          water.mesh.material.opacity = 0.9;
        }
      }

      if (p.age > 1500) {
        p.active = false;
        p.position.set(0, -100, 0);
        p.mesh.position.copy(p.position);
        p.mesh.material.opacity = 0;
        p.age = 0;
      }
    }
  });
};
