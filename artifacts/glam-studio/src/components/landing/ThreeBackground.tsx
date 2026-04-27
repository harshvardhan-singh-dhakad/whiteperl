import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) return;
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.25 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfcf9f9, 0.018);

    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      200,
    );
    camera.position.set(0, 0, 22);

    /* ───────────────  LIGHTING  ─────────────── */
    scene.add(new THREE.AmbientLight(0xffffff, 0.55));

    const keyLight = new THREE.DirectionalLight(0xfff4e8, 1.4);
    keyLight.position.set(8, 14, 10);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xfde2f0, 0.8);
    rimLight.position.set(-12, 8, -6);
    scene.add(rimLight);

    const magentaLight = new THREE.PointLight(0xff5fa2, 3, 60);
    magentaLight.position.set(-15, -8, 6);
    scene.add(magentaLight);

    const goldLight = new THREE.PointLight(0xffb347, 2.6, 60);
    goldLight.position.set(16, 10, 6);
    scene.add(goldLight);

    const tealLight = new THREE.PointLight(0x6fd6d6, 2.2, 70);
    tealLight.position.set(0, -14, 10);
    scene.add(tealLight);

    const violetLight = new THREE.PointLight(0xa07cff, 2.2, 70);
    violetLight.position.set(0, 14, -8);
    scene.add(violetLight);

    /* ───────────────  PALETTE  ─────────────── */
    // Vibrant cosmetic colors — chosen to pop against soft blush/cream text
    const lipstickShades = [
      0xc8203a, // classic red
      0x8b1e3f, // wine
      0xd94d6a, // hot pink
      0xff6f6f, // coral
      0x6b1f4a, // deep plum
      0xb84a8c, // fuchsia
      0xe85a7d, // raspberry
    ];
    const nailPolishShades = [
      0x6e2a8e, // royal purple
      0x009ca6, // teal
      0x0e3b6e, // navy
      0xc8203a, // red
      0xff8aa8, // bubblegum
      0x2f5d3a, // emerald
      0xff5fa2, // hot pink
      0x1a1a2e, // midnight
    ];
    const eyeshadowShades = [
      0xd4a574, // bronze
      0x7d4f9c, // amethyst
      0x3a6f8b, // peacock
      0xffd166, // honey gold
      0xc97b63, // terracotta
      0x4a3a5e, // smoky violet
      0xb0d8d8, // mint shimmer
      0xe8a0bf, // blush
    ];
    const perfumeShades = [
      0xffe4a8, // champagne
      0xff9bbf, // pink amber
      0xa8d8e8, // aqua
      0xc8a8e8, // lavender
    ];
    const creamShades = [0xfff5ee, 0xf2e3c6, 0xfde2f0, 0xeaeaea];

    const pick = (arr: number[]) => arr[Math.floor(Math.random() * arr.length)];

    /* ───────────────  MATERIALS  ─────────────── */
    const matRoseGold = new THREE.MeshStandardMaterial({
      color: 0xd4a3a3, metalness: 0.95, roughness: 0.18,
    });
    const matGold = new THREE.MeshStandardMaterial({
      color: 0xc89253, metalness: 0.92, roughness: 0.2,
    });
    const matChrome = new THREE.MeshStandardMaterial({
      color: 0xeeeeee, metalness: 1.0, roughness: 0.1,
    });
    const matBlack = new THREE.MeshStandardMaterial({
      color: 0x1c1418, metalness: 0.4, roughness: 0.55,
    });
    const matMirror = new THREE.MeshStandardMaterial({
      color: 0xffffff, metalness: 1.0, roughness: 0.02,
    });
    const matBristle = new THREE.MeshStandardMaterial({
      color: 0x3a2a30, roughness: 0.9, metalness: 0.05,
    });

    const makeColorMat = (hex: number, opts: Partial<THREE.MeshStandardMaterialParameters> = {}) =>
      new THREE.MeshStandardMaterial({
        color: hex,
        metalness: 0.25,
        roughness: 0.4,
        ...opts,
      });

    const makeGlassMat = (hex: number) =>
      new THREE.MeshPhysicalMaterial({
        color: hex,
        metalness: 0,
        roughness: 0.05,
        transmission: 0.85,
        thickness: 0.6,
        ior: 1.45,
        transparent: true,
        opacity: 0.95,
      });

    const makeShimmerMat = (hex: number) =>
      new THREE.MeshStandardMaterial({
        color: hex,
        metalness: 0.7,
        roughness: 0.25,
        emissive: hex,
        emissiveIntensity: 0.1,
      });

    /* ───────────────  REAL SALON ITEM GENERATORS  ───────────────
       Each generator picks fresh colors so every instance is unique.   */

    // 1. LIPSTICK — gold base, colored bullet
    const createLipstick = () => {
      const g = new THREE.Group();
      const shade = pick(lipstickShades);
      const colorMat = makeShimmerMat(shade);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.4, 32), matGold);
      base.position.y = -0.7;
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.36, 0.36, 0.8, 32), matChrome);
      tube.position.y = 0.4;
      const bullet = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.34, 0.85, 32), colorMat);
      bullet.position.y = 1.05;
      const tip = new THREE.Mesh(new THREE.SphereGeometry(0.34, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), colorMat);
      tip.position.y = 1.48;
      tip.scale.set(1, 1.4, 1);
      g.add(base, tube, bullet, tip);
      return g;
    };

    // 2. NAIL POLISH BOTTLE — colorful liquid inside clear glass
    const createNailPolish = () => {
      const g = new THREE.Group();
      const shade = pick(nailPolishShades);
      const liquidMat = makeShimmerMat(shade);
      const bottle = new THREE.Mesh(new THREE.BoxGeometry(1.1, 1.4, 1.1), makeGlassMat(0xfafafa));
      const liquid = new THREE.Mesh(new THREE.BoxGeometry(0.92, 1.05, 0.92), liquidMat);
      liquid.position.y = -0.1;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.28, 0.25, 24), makeGlassMat(0xfafafa));
      neck.position.y = 0.85;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 1.4, 32), matBlack);
      cap.position.y = 1.65;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.04, 12, 24), matGold);
      ring.position.y = 0.98;
      ring.rotation.x = Math.PI / 2;
      g.add(bottle, liquid, neck, cap, ring);
      return g;
    };

    // 3. PERFUME BOTTLE — luxurious atomizer
    const createPerfume = () => {
      const g = new THREE.Group();
      const shade = pick(perfumeShades);
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.85, 0.95, 1.5, 6),
        makeGlassMat(shade),
      );
      const liquid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.78, 1.0, 6),
        makeShimmerMat(shade),
      );
      liquid.position.y = -0.2;
      const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.18, 24), matGold);
      collar.position.y = 0.85;
      const cap = new THREE.Mesh(new THREE.SphereGeometry(0.42, 32, 24), matRoseGold);
      cap.position.y = 1.15;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.45, 24, 24), matBlack);
      bulb.position.set(1.1, 0.6, 0);
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.04, 0.04, 0.9, 12), matGold);
      tube.position.set(0.55, 0.7, 0);
      tube.rotation.z = Math.PI / 2;
      g.add(body, liquid, collar, cap, bulb, tube);
      return g;
    };

    // 4. COMPACT POWDER with mirror lid
    const createCompact = () => {
      const g = new THREE.Group();
      const powderShade = pick([0xe8c8b8, 0xeec5b0, 0xf5d5c2, 0xddb09a, 0xe8a0bf]);
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.28, 48), matRoseGold);
      const powder = new THREE.Mesh(new THREE.CylinderGeometry(1.15, 1.15, 0.1, 48), makeColorMat(powderShade, { roughness: 0.95 }));
      powder.position.y = 0.18;
      const lid = new THREE.Group();
      const lidShell = new THREE.Mesh(new THREE.CylinderGeometry(1.4, 1.4, 0.18, 48), matRoseGold);
      const mirror = new THREE.Mesh(new THREE.CylinderGeometry(1.18, 1.18, 0.06, 48), matMirror);
      mirror.position.y = 0.1;
      lid.add(lidShell, mirror);
      lid.position.set(0, 0.1, -1.4);
      lid.rotation.x = -Math.PI / 2.4;
      g.add(base, powder, lid);
      return g;
    };

    // 5. MAKEUP BRUSH — angled handle, colorful bristles
    const createBrush = () => {
      const g = new THREE.Group();
      const handleShade = pick([0x6b1f4a, 0x1a1a2e, 0x8b1e3f, 0x2f1c2e, 0x4a2a4a]);
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.13, 0.2, 3, 24),
        makeColorMat(handleShade, { metalness: 0.6, roughness: 0.3 }),
      );
      handle.position.y = -1.5;
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.22, 0.13, 0.85, 24), matRoseGold);
      ferrule.position.y = 0.4;
      const bristleColor = pick([0xe8c8b8, 0xddb09a, 0x3a2a30, 0xc89253]);
      const bristles = new THREE.Mesh(
        new THREE.SphereGeometry(0.5, 24, 16),
        new THREE.MeshStandardMaterial({ color: bristleColor, roughness: 0.95 }),
      );
      bristles.position.y = 1.05;
      bristles.scale.set(1, 1.9, 1);
      g.add(handle, ferrule, bristles);
      return g;
    };

    // 6. SERUM / FOUNDATION DROPPER BOTTLE
    const createSerum = () => {
      const g = new THREE.Group();
      const shade = pick([0xf5d5c2, 0xe8a0bf, 0xc8a8e8, 0xffe4a8, 0xeec5b0]);
      const bottle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 2.0, 32),
        makeGlassMat(shade),
      );
      const liquid = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 1.5, 32),
        makeColorMat(shade, { roughness: 0.3, metalness: 0.1 }),
      );
      liquid.position.y = -0.2;
      const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.28, 0.3, 24), matGold);
      neck.position.y = 1.15;
      const dropper = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.6, 24), matBlack);
      dropper.position.y = 1.6;
      const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 24, 24), matBlack);
      bulb.position.y = 2.0;
      g.add(bottle, liquid, neck, dropper, bulb);
      return g;
    };

    // 7. EYESHADOW PALETTE — varied vibrant pans
    const createPalette = () => {
      const g = new THREE.Group();
      const caseBase = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.22, 2.2), matBlack);
      g.add(caseBase);
      const positions: [number, number][] = [
        [-1.0, -0.55], [0.0, -0.55], [1.0, -0.55],
        [-1.0, 0.55], [0.0, 0.55], [1.0, 0.55],
      ];
      positions.forEach(([x, z]) => {
        const pan = new THREE.Mesh(
          new THREE.BoxGeometry(0.78, 0.26, 0.78),
          makeShimmerMat(pick(eyeshadowShades)),
        );
        pan.position.set(x, 0.05, z);
        g.add(pan);
      });
      return g;
    };

    // 8. MASCARA tube
    const createMascara = () => {
      const g = new THREE.Group();
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 2.4, 32), matBlack);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.4, 32), matRoseGold);
      cap.position.y = 1.9;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.3, 0.04, 12, 24), matGold);
      ring.position.y = 1.2;
      ring.rotation.x = Math.PI / 2;
      g.add(tube, cap, ring);
      return g;
    };

    // 9. HAIR CREAM JAR — colored tinted glass
    const createCreamJar = () => {
      const g = new THREE.Group();
      const jarShade = pick(creamShades);
      const jar = new THREE.Mesh(
        new THREE.CylinderGeometry(1.2, 1.0, 1.6, 32),
        makeColorMat(jarShade, { roughness: 0.4 }),
      );
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(1.25, 1.25, 0.4, 32), matRoseGold);
      lid.position.y = 1.0;
      const knob = new THREE.Mesh(new THREE.CylinderGeometry(0.25, 0.25, 0.1, 24), matGold);
      knob.position.y = 1.25;
      g.add(jar, lid, knob);
      return g;
    };

    // 10. HAIR DRYER
    const createHairDryer = () => {
      const g = new THREE.Group();
      const bodyShade = pick([0xc8203a, 0x6e2a8e, 0x1a1a2e, 0xff5fa2, 0x009ca6]);
      const body = new THREE.Mesh(
        new THREE.CylinderGeometry(0.6, 0.6, 2.2, 32),
        makeColorMat(bodyShade, { metalness: 0.5, roughness: 0.35 }),
      );
      body.rotation.z = Math.PI / 2;
      const nozzle = new THREE.Mesh(
        new THREE.ConeGeometry(0.6, 1.0, 32),
        makeColorMat(bodyShade, { metalness: 0.5, roughness: 0.35 }),
      );
      nozzle.rotation.z = -Math.PI / 2;
      nozzle.position.x = 1.6;
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.3, 1.6, 24),
        makeColorMat(bodyShade, { metalness: 0.5, roughness: 0.35 }),
      );
      handle.position.set(-0.2, -1.0, 0);
      handle.rotation.z = -0.25;
      const ring = new THREE.Mesh(new THREE.TorusGeometry(0.6, 0.07, 16, 32), matGold);
      ring.rotation.y = Math.PI / 2;
      ring.position.x = -1.1;
      g.add(body, nozzle, handle, ring);
      return g;
    };

    // 11. SCISSORS — salon shears
    const createScissors = () => {
      const g = new THREE.Group();
      const blade1 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.18), matChrome);
      blade1.position.set(0.6, 0.05, 0);
      blade1.rotation.z = 0.12;
      const blade2 = new THREE.Mesh(new THREE.BoxGeometry(2.2, 0.08, 0.18), matChrome);
      blade2.position.set(0.6, -0.05, 0);
      blade2.rotation.z = -0.12;
      const pivot = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 0.2, 24), matGold);
      pivot.rotation.x = Math.PI / 2;
      const handleColor = pick([0x8b1e3f, 0x6e2a8e, 0x1a1a2e, 0x009ca6]);
      const ring1 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 12, 24), makeColorMat(handleColor, { metalness: 0.5 }));
      ring1.position.set(-0.7, 0.45, 0);
      const ring2 = new THREE.Mesh(new THREE.TorusGeometry(0.32, 0.07, 12, 24), makeColorMat(handleColor, { metalness: 0.5 }));
      ring2.position.set(-0.7, -0.45, 0);
      g.add(blade1, blade2, pivot, ring1, ring2);
      return g;
    };

    // 12. HAIR COMB
    const createComb = () => {
      const g = new THREE.Group();
      const combColor = pick([0x1a1a2e, 0x6b1f4a, 0x4a2a4a, 0xc89253]);
      const back = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.35, 0.1), makeColorMat(combColor, { metalness: 0.4, roughness: 0.4 }));
      g.add(back);
      for (let i = 0; i < 16; i++) {
        const tooth = new THREE.Mesh(
          new THREE.BoxGeometry(0.08, 0.7, 0.1),
          makeColorMat(combColor, { metalness: 0.4, roughness: 0.4 }),
        );
        tooth.position.set(-1.2 + i * 0.16, -0.5, 0);
        g.add(tooth);
      }
      return g;
    };

    // 13. ROUND HAIR BRUSH
    const createRoundBrush = () => {
      const g = new THREE.Group();
      const handleColor = pick([0x8b1e3f, 0x6e2a8e, 0x1a1a2e, 0x009ca6]);
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.18, 0.22, 1.6, 24),
        makeColorMat(handleColor, { metalness: 0.5, roughness: 0.3 }),
      );
      handle.position.y = -1.2;
      const barrel = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 1.4, 32), matChrome);
      barrel.position.y = 0.3;
      // bristle ring
      for (let i = 0; i < 24; i++) {
        const angle = (i / 24) * Math.PI * 2;
        const bristle = new THREE.Mesh(
          new THREE.CylinderGeometry(0.02, 0.02, 0.45, 8),
          matBristle,
        );
        bristle.position.set(Math.cos(angle) * 0.78, 0.3, Math.sin(angle) * 0.78);
        bristle.lookAt(new THREE.Vector3(Math.cos(angle) * 2, 0.3, Math.sin(angle) * 2));
        bristle.rotation.x += Math.PI / 2;
        g.add(bristle);
      }
      g.add(handle, barrel);
      return g;
    };

    // 14. HAIR STRAIGHTENER
    const createStraightener = () => {
      const g = new THREE.Group();
      const bodyColor = pick([0xc8203a, 0x6e2a8e, 0x1a1a2e, 0xff5fa2]);
      const top = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.32, 0.7),
        makeColorMat(bodyColor, { metalness: 0.5, roughness: 0.3 }),
      );
      top.position.y = 0.18;
      const bottom = new THREE.Mesh(
        new THREE.BoxGeometry(2.2, 0.32, 0.7),
        makeColorMat(bodyColor, { metalness: 0.5, roughness: 0.3 }),
      );
      bottom.position.y = -0.18;
      const plateTop = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.55), matChrome);
      plateTop.position.set(0.3, 0.02, 0);
      const plateBot = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.05, 0.55), matChrome);
      plateBot.position.set(0.3, -0.02, 0);
      const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.18, 0.18, 0.75, 24), matGold);
      hinge.rotation.x = Math.PI / 2;
      hinge.position.set(-1.1, 0, 0);
      g.add(top, bottom, plateTop, plateBot, hinge);
      return g;
    };

    // 15. HAND MIRROR
    const createHandMirror = () => {
      const g = new THREE.Group();
      const frame = new THREE.Mesh(new THREE.TorusGeometry(0.95, 0.12, 16, 48), matRoseGold);
      const glass = new THREE.Mesh(new THREE.CircleGeometry(0.95, 48), matMirror);
      glass.position.z = 0.02;
      const handle = new THREE.Mesh(
        new THREE.CylinderGeometry(0.12, 0.16, 1.7, 24),
        matRoseGold,
      );
      handle.position.y = -1.7;
      const knob = new THREE.Mesh(new THREE.SphereGeometry(0.2, 24, 24), matRoseGold);
      knob.position.y = -2.55;
      g.add(frame, glass, handle, knob);
      return g;
    };

    // 16. BLUSH POT
    const createBlushPot = () => {
      const g = new THREE.Group();
      const blushShade = pick([0xff8aa8, 0xe85a7d, 0xff6f6f, 0xc97b63, 0xe8a0bf]);
      const tin = new THREE.Mesh(new THREE.CylinderGeometry(0.85, 0.85, 0.45, 32), matRoseGold);
      const blush = new THREE.Mesh(
        new THREE.CylinderGeometry(0.7, 0.7, 0.18, 32),
        makeShimmerMat(blushShade),
      );
      blush.position.y = 0.28;
      g.add(tin, blush);
      return g;
    };

    /* ───────────────  POPULATE  ─────────────── */
    const generators: Array<() => THREE.Group> = [
      createLipstick, createNailPolish, createPerfume, createCompact, createBrush,
      createSerum, createPalette, createMascara, createCreamJar, createHairDryer,
      createScissors, createComb, createRoundBrush, createStraightener,
      createHandMirror, createBlushPot,
    ];

    type Item = {
      mesh: THREE.Object3D;
      rotX: number;
      rotY: number;
      rotZ: number;
      floatSpeed: number;
      floatAmp: number;
      baseY: number;
      phase: number;
    };
    const items: Item[] = [];

    const numItems = isMobile ? 14 : 32;

    // Distribute items in two rings: a back ring (deeper) and a side ring (off the text column)
    for (let i = 0; i < numItems; i++) {
      const gen = generators[i % generators.length];
      const mesh = gen();

      // Push items toward the sides so the central text column stays clean.
      // ~70% of items go to the side bands; rest scatter wider in the back.
      const useSideBand = Math.random() < 0.7;
      let x: number, y: number, z: number;
      if (useSideBand) {
        const side = Math.random() < 0.5 ? -1 : 1;
        x = side * (10 + Math.random() * 22); // |x| between 10 and 32
        y = (Math.random() - 0.5) * 28;
        z = -8 - Math.random() * 22; // -8 to -30
      } else {
        x = (Math.random() - 0.5) * 70;
        y = (Math.random() - 0.5) * 30;
        z = -18 - Math.random() * 18; // pushed further back
      }
      mesh.position.set(x, y, z);
      mesh.rotation.set(
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
        Math.random() * Math.PI * 2,
      );
      const scale = 0.7 + Math.random() * 0.6;
      mesh.scale.setScalar(scale);

      items.push({
        mesh,
        rotX: (Math.random() - 0.5) * 0.012,
        rotY: (Math.random() - 0.5) * 0.012,
        rotZ: (Math.random() - 0.5) * 0.006,
        floatSpeed: 0.3 + Math.random() * 0.7,
        floatAmp: 0.4 + Math.random() * 0.9,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
      });
      scene.add(mesh);
    }

    // Floating pearls — soft pearl colors
    const pearlColors = [0xffffff, 0xfff0e8, 0xfde2f0, 0xf0e8ff];
    const numPearls = isMobile ? 10 : 22;
    for (let i = 0; i < numPearls; i++) {
      const size = 0.25 + Math.random() * 0.55;
      const color = pearlColors[Math.floor(Math.random() * pearlColors.length)];
      const mesh = new THREE.Mesh(
        new THREE.SphereGeometry(size, 32, 32),
        new THREE.MeshStandardMaterial({
          color,
          metalness: 0.2,
          roughness: 0.15,
          emissive: color,
          emissiveIntensity: 0.05,
        }),
      );
      const side = Math.random() < 0.5 ? -1 : 1;
      const x = side * (8 + Math.random() * 24);
      const y = (Math.random() - 0.5) * 28;
      const z = -5 - Math.random() * 22;
      mesh.position.set(x, y, z);
      items.push({
        mesh,
        rotX: (Math.random() - 0.5) * 0.005,
        rotY: (Math.random() - 0.5) * 0.005,
        rotZ: 0,
        floatSpeed: 0.5 + Math.random() * 0.8,
        floatAmp: 0.3 + Math.random() * 0.6,
        baseY: y,
        phase: Math.random() * Math.PI * 2,
      });
      scene.add(mesh);
    }

    /* ───────────────  MULTI-COLOR SPARKLE PARTICLES  ─────────────── */
    const sparkleColors = [0xffd166, 0xff9bbf, 0xc8a8e8, 0xa8e8d8, 0xffe4a8];
    const sparkleGroups = sparkleColors.map((color) => {
      const count = isMobile ? 60 : 140;
      const geom = new THREE.BufferGeometry();
      const positions = new Float32Array(count * 3);
      const velocities: number[] = [];
      for (let i = 0; i < count; i++) {
        positions[i * 3] = (Math.random() - 0.5) * 80;
        positions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        positions[i * 3 + 2] = (Math.random() - 0.5) * 30 - 5;
        velocities.push(0.02 + Math.random() * 0.06);
      }
      geom.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const mat = new THREE.PointsMaterial({
        color,
        size: 0.18 + Math.random() * 0.12,
        transparent: true,
        opacity: 0.75,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const points = new THREE.Points(geom, mat);
      scene.add(points);
      return { points, velocities, count };
    });

    /* ───────────────  INTERACTION  ─────────────── */
    let mouseX = 0;
    let mouseY = 0;
    let scrollY = 0;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollY = window.scrollY;
    };
    if (!isMobile) {
      document.addEventListener('mousemove', onMouseMove);
    }
    window.addEventListener('scroll', onScroll, { passive: true });

    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', onResize);

    let isVisible = true;
    const onVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', onVisibility);

    /* ───────────────  ANIMATE  ─────────────── */
    const clock = new THREE.Clock();
    let frameId = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      const dt = clock.getDelta();

      if (!prefersReducedMotion) {
        // Camera parallax + scroll drift
        const targetX = mouseX * 2.5;
        const targetY = -mouseY * 1.8 - scrollY * 0.003;
        camera.position.x += (targetX - camera.position.x) * 0.04;
        camera.position.y += (targetY - camera.position.y) * 0.04;
        camera.position.z = 22 - scrollY * 0.006;
        camera.lookAt(0, 0, 0);

        // Animate items
        items.forEach((it) => {
          it.mesh.rotation.x += it.rotX;
          it.mesh.rotation.y += it.rotY;
          it.mesh.rotation.z += it.rotZ;
          it.mesh.position.y =
            it.baseY + Math.sin(t * it.floatSpeed + it.phase) * it.floatAmp;
        });

        // Animate sparkles upward
        sparkleGroups.forEach(({ points, velocities, count }) => {
          const pos = points.geometry.attributes.position.array as Float32Array;
          for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += velocities[i];
            if (pos[i * 3 + 1] > 25) pos[i * 3 + 1] = -25;
          }
          points.geometry.attributes.position.needsUpdate = true;
        });

        // Pulse the colored point lights for the disco-glow effect
        magentaLight.intensity = 2.6 + Math.sin(t * 1.6) * 0.9;
        goldLight.intensity = 2.4 + Math.cos(t * 1.3) * 0.8;
        tealLight.intensity = 2.0 + Math.sin(t * 0.9 + 1) * 0.7;
        violetLight.intensity = 2.0 + Math.cos(t * 1.1 + 2) * 0.7;
      }

      renderer.render(scene, camera);
      void dt;
    };
    animate();

    /* ───────────────  CLEANUP  ─────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose();
          if (Array.isArray(obj.material)) {
            obj.material.forEach((m) => m.dispose());
          } else {
            obj.material.dispose();
          }
        }
        if (obj instanceof THREE.Points) {
          obj.geometry.dispose();
          (obj.material as THREE.Material).dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden="true"
    />
  );
}
