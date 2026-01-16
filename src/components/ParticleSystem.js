// Enhanced ParticleSystem.js - Clear water cycle visualization with step-by-step processes

export const createWaterParticles = (THREE, scene, count = 120) => {
  const waterParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.25, 12, 12),
        new THREE.MeshLambertMaterial({
          color: 0x0077ff,
          transparent: true,
          opacity: 0.9,
          emissive: 0x003388,
          emissiveIntensity: 0.3,
          reflectivity: 0.8,
        })
      ),
      position: new THREE.Vector3(
        Math.random() * 80 - 40,
        -0.3,
        Math.random() * 50 - 25
      ),
      velocity: new THREE.Vector3(0, 0, 0),
      stage: "collection",
      age: 0,
      maxAge: 800 + Math.random() * 400,
      shimmerPhase: Math.random() * Math.PI * 2, // For shimmer effect
    };
    particle.mesh.position.copy(particle.position);
    particle.mesh.castShadow = true;
    particle.mesh.receiveShadow = true;
    scene.add(particle.mesh);
    waterParticles.push(particle);
  }
  return waterParticles;
};

export const createVaporParticles = (THREE, scene, count = 80) => {
  const vaporParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.18, 8, 8),
        new THREE.MeshLambertMaterial({
          color: 0x87ceeb,
          transparent: true,
          opacity: 0,
          emissive: 0x4488bb,
          emissiveIntensity: 0.4,
          reflectivity: 0.3,
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

export const createClouds = (THREE, scene, count = 15) => {
  const clouds = [];
  for (let i = 0; i < count; i++) {
    const cloudGroup = new THREE.Group();
    const cloudParticles = [];

    for (let j = 0; j < 15; j++) {
      const size = 1.5 + Math.random() * 2;
      const cloudParticle = new THREE.Mesh(
        new THREE.SphereGeometry(size, 16, 16),
        new THREE.MeshLambertMaterial({
          color: 0xffffff,
          transparent: true,
          opacity: 0.85,
          emissive: 0xaabbcc,
          emissiveIntensity: 0.1,
        })
      );

      const angle = (j / 15) * Math.PI * 2;
      const radius = 2.5 + Math.random() * 2;
      const height = Math.sin(angle * 2) * 1.5; // Vary height for natural shape
      cloudParticle.position.x =
        Math.cos(angle) * radius + (Math.random() - 0.5) * 2;
      cloudParticle.position.y = height + (Math.random() - 0.5);
      cloudParticle.position.z =
        Math.sin(angle) * radius * 0.8 + (Math.random() - 0.5) * 3;

      cloudGroup.add(cloudParticle);
      cloudParticles.push(cloudParticle);
    }

    // Add wispy cloud edges
    for (let k = 0; k < 8; k++) {
      const wispyParticle = new THREE.Mesh(
        new THREE.SphereGeometry(0.8 + Math.random() * 0.7, 12, 12),
        new THREE.MeshLambertMaterial({
          color: 0xf5f5f5,
          transparent: true,
          opacity: 0.4,
        })
      );
      const wispAngle = (k / 8) * Math.PI * 2;
      const wispRadius = 4 + Math.random() * 2;
      wispyParticle.position.x = Math.cos(wispAngle) * wispRadius;
      wispyParticle.position.y = (Math.random() - 0.5) * 2;
      wispyParticle.position.z = Math.sin(wispAngle) * wispRadius * 0.6;
      cloudGroup.add(wispyParticle);
      cloudParticles.push(wispyParticle);
    }

    // Start clouds above ocean (right side, x: 40-70) at higher altitude
    const startX = 40 + Math.random() * 30;
    cloudGroup.position.set(
      startX,
      40 + Math.random() * 15,
      Math.random() * 80 - 40
    );
    cloudGroup.scale.set(0.9, 0.9, 0.9);
    scene.add(cloudGroup);

    clouds.push({
      mesh: cloudGroup,
      particles: cloudParticles,
      waterContent: 0,
      maxWaterContent: 2.0,
      speed: -0.08 - Math.random() * 0.04, // Negative = move left toward mountains
      driftPhase: Math.random() * Math.PI * 2,
      stage: "forming", // forming -> traveling -> raining
    });
  }
  return clouds;
};

export const createPrecipitationParticles = (THREE, scene, count = 60) => {
  const precipitationParticles = [];
  for (let i = 0; i < count; i++) {
    const particle = {
      mesh: new THREE.Mesh(
        new THREE.SphereGeometry(0.22, 8, 8),
        new THREE.MeshLambertMaterial({
          color: 0x2e5cb8,
          transparent: true,
          opacity: 0,
          emissive: 0x001144,
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

export const updateWaterParticles = (waterParticles) => {
  waterParticles.forEach((p) => {
    p.age++;
    p.shimmerPhase += 0.1;

    if (p.stage === "collection" || p.stage === "runoff") {
      p.position.y =
        -0.2 + Math.sin(Date.now() * 0.004 + p.position.x * 0.3) * 0.08;

      // Water flows toward ocean (rightward if on mountains/left side)
      if (p.stage === "runoff" && p.position.x < 50) {
        p.position.x += 0.12; // Flow toward ocean faster
      } else if (p.position.x > -35 && p.stage === "collection") {
        p.position.x -= 0.008; // Normal water movement
      }

      // Convert runoff to collection when reaching ocean area
      if (p.stage === "runoff" && p.position.x > 40) {
        p.stage = "collection";
      }

      // Enhanced shimmer effect
      const shimmer = 0.85 + Math.sin(p.shimmerPhase) * 0.2;
      const colorShift = Math.sin(p.shimmerPhase * 0.5) * 0.1;
      p.mesh.material.opacity = shimmer;
      p.mesh.material.emissiveIntensity = 0.3 + colorShift;

      // Add slight color variation for realism
      const baseColor = 0x0077ff;
      const variation = Math.floor(Math.sin(p.shimmerPhase) * 0x001122);
      p.mesh.material.color.setHex(baseColor + variation);
    }

    if (p.age > p.maxAge && p.stage === "evaporated") {
      p.stage = "collection";
      p.position.set(Math.random() * 80 - 40, -0.2, Math.random() * 50 - 25);
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
        vapor.mesh.material.opacity = 0.5;
        vapor.mesh.material.color.setHex(0x87ceeb);
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
    cloud.driftPhase += 0.02;

    cloud.particles.forEach((p) => {
      const opacity = 0.7 + cloud.waterContent * 0.3;
      const grayness = cloud.waterContent > 1.0 ? 0.6 : 1.0;
      p.material.opacity = Math.min(0.95, opacity);
      p.material.color.setRGB(grayness, grayness, grayness);

      // Add subtle emissive glow to clouds
      const glowIntensity = 0.1 + cloud.waterContent * 0.05;
      p.material.emissiveIntensity = glowIntensity;
    });

    // Move clouds from ocean (right) toward mountains (left)
    cloud.mesh.position.x += cloud.speed;
    cloud.mesh.position.y += Math.sin(cloud.driftPhase) * 0.08; // Gentle vertical drift
    cloud.mesh.position.z += Math.cos(cloud.driftPhase * 0.7) * 0.05; // Subtle depth movement

    // Update cloud stage based on position
    if (cloud.mesh.position.x > 20) {
      cloud.stage = "forming"; // Above ocean
    } else if (cloud.mesh.position.x > -40 && cloud.mesh.position.x <= 20) {
      cloud.stage = "traveling"; // Moving toward mountains
    } else if (cloud.mesh.position.x <= -40) {
      cloud.stage = "raining"; // Over mountains
    }

    // Reset cloud to ocean side when it goes too far left
    if (cloud.mesh.position.x < -90) {
      cloud.mesh.position.x = 70; // Reset to ocean
      cloud.waterContent = 0;
      cloud.stage = "forming";
    }

    // Rain MORE over mountains (left side, x < -40)
    const isOverMountains = cloud.mesh.position.x < -40;
    const rainChance = isOverMountains ? 0.15 : 0.03; // Much higher rain over mountains

    if (cloud.waterContent > 1.0 && Math.random() < rainChance) {
      const precip = precipitationParticles.find((p) => !p.active);
      if (precip) {
        precip.active = true;
        precip.position.set(
          cloud.mesh.position.x + (Math.random() - 0.5) * 12,
          cloud.mesh.position.y - 3,
          cloud.mesh.position.z + (Math.random() - 0.5) * 8
        );
        precip.velocity.y = -0.25 - Math.random() * 0.1;
        precip.velocity.x = (Math.random() - 0.5) * 0.04;
        precip.mesh.position.copy(precip.position);
        precip.mesh.material.opacity = 0.9;
        precip.age = 0;
        precip.landingX = precip.position.x; // Store where it will land
        cloud.waterContent -= 0.15;
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
