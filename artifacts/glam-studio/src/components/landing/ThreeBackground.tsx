import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export function ThreeBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let renderer: THREE.WebGLRenderer;
    try {
      const testCanvas = document.createElement('canvas');
      const gl =
        testCanvas.getContext('webgl2') ||
        testCanvas.getContext('webgl') ||
        testCanvas.getContext('experimental-webgl');
      if (!gl) {
        return;
      }
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } catch {
      return;
    }

    // SCENE SETUP
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0xfcf9f9, 0.002);

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    // Detect mobile/performance constraints
    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1 : 2));
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pinkLight = new THREE.PointLight(0xc48b8b, 2, 50);
    pinkLight.position.set(5, 5, 5);
    scene.add(pinkLight);

    const goldLight = new THREE.PointLight(0xb88645, 2, 50);
    goldLight.position.set(-5, -5, 5);
    scene.add(goldLight);

    const directionalLight = new THREE.DirectionalLight(0xffeedd, 1);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    // MATERIALS
    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf7e4e4,
      metalness: 0.1,
      roughness: 0.1,
      transmission: 0.9,
      thickness: 0.5,
      transparent: true,
      opacity: 0.8
    });

    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xb88645,
      metalness: 0.8,
      roughness: 0.2,
    });

    const roseGoldMaterial = new THREE.MeshStandardMaterial({
      color: 0xc48b8b,
      metalness: 0.7,
      roughness: 0.3,
    });

    const blackMaterial = new THREE.MeshStandardMaterial({
      color: 0x2a1a21,
      metalness: 0.2,
      roughness: 0.8,
    });

    const blushMaterial = new THREE.MeshStandardMaterial({
      color: 0xf7e4e4,
      metalness: 0.1,
      roughness: 0.6,
    });

    // OBJECT GENERATORS
    const createLipstick = () => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1, 32), goldMaterial);
      base.position.y = -0.5;
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 1.2, 32), blackMaterial);
      body.position.y = 0.6;
      const tip = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.8, 32), roseGoldMaterial);
      tip.position.y = 1.6;
      tip.rotation.x = -Math.PI / 6;
      group.add(base, body, tip);
      return group;
    };

    const createNailPolish = () => {
      const group = new THREE.Group();
      const bottle = new THREE.Mesh(new THREE.BoxGeometry(0.8, 1, 0.8), glassMaterial);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32), blackMaterial);
      cap.position.y = 0.9;
      group.add(bottle, cap);
      return group;
    };

    const createCompact = () => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.2, 32), roseGoldMaterial);
      const mirror = new THREE.Mesh(new THREE.CylinderGeometry(0.9, 0.9, 0.05, 32), glassMaterial);
      mirror.position.y = 0.15;
      const powder = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.1, 32), blushMaterial);
      powder.position.y = 0.15;
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(1, 1, 0.1, 32), roseGoldMaterial);
      lid.position.set(0, 0.15, -1);
      lid.rotation.x = Math.PI / 4;
      group.add(base, powder, lid);
      return group;
    };

    const createBrush = () => {
      const group = new THREE.Group();
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.1, 0.15, 2, 32), blackMaterial);
      const ferrule = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.5, 32), goldMaterial);
      ferrule.position.y = 1.25;
      const bristles = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), blushMaterial);
      bristles.position.y = 1.7;
      bristles.scale.y = 1.5;
      group.add(handle, ferrule, bristles);
      return group;
    };

    const createFoundationBottle = () => {
      const group = new THREE.Group();
      const bottle = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.5, 32), glassMaterial);
      const pump = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.3, 0.4, 32), goldMaterial);
      pump.position.y = 0.95;
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.8, 32), blackMaterial);
      cap.position.y = 1.5;
      group.add(bottle, pump, cap);
      return group;
    };

    const createEyeshadowPalette = () => {
      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(2, 0.2, 1.5), blackMaterial);
      for(let i=0; i<3; i++) {
        for(let j=0; j<2; j++) {
          const pan = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.05, 0.4), i===0 ? roseGoldMaterial : (i===1 ? goldMaterial : blushMaterial));
          pan.position.set(-0.6 + i*0.6, 0.1, -0.3 + j*0.6);
          group.add(pan);
        }
      }
      group.add(base);
      return group;
    };

    const createMascara = () => {
      const group = new THREE.Group();
      const tube = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.5, 32), blackMaterial);
      const cap = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.8, 32), goldMaterial);
      cap.position.y = 1.15;
      group.add(tube, cap);
      return group;
    };

    const createHairCreamJar = () => {
      const group = new THREE.Group();
      const jar = new THREE.Mesh(new THREE.CylinderGeometry(0.8, 0.8, 0.8, 32), glassMaterial);
      const lid = new THREE.Mesh(new THREE.CylinderGeometry(0.82, 0.82, 0.2, 32), roseGoldMaterial);
      lid.position.y = 0.5;
      group.add(jar, lid);
      return group;
    };

    const createHairDryer = () => {
      const group = new THREE.Group();
      const body = new THREE.Mesh(new THREE.CylinderGeometry(0.4, 0.4, 1.5, 32), blackMaterial);
      body.rotation.z = Math.PI / 2;
      const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 1.2, 32), blackMaterial);
      handle.position.set(-0.3, -0.7, 0);
      handle.rotation.z = -Math.PI / 12;
      const nozzle = new THREE.Mesh(new THREE.ConeGeometry(0.4, 0.8, 32), roseGoldMaterial);
      nozzle.position.set(1.1, 0, 0);
      nozzle.rotation.z = -Math.PI / 2;
      group.add(body, handle, nozzle);
      return group;
    };

    const pearlMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      metalness: 0.1,
      roughness: 0.2,
      envMapIntensity: 1.0,
    });
    
    const createPearl = () => {
      return new THREE.Mesh(new THREE.SphereGeometry(0.2, 32, 32), pearlMaterial);
    };

    // POPULATE SCENE
    const objects: { mesh: THREE.Object3D, speed: number, rotSpeed: number }[] = [];
    const generators = [
      createLipstick, createNailPolish, createCompact, createBrush, 
      createFoundationBottle, createEyeshadowPalette, createMascara, 
      createHairCreamJar, createHairDryer
    ];

    const numObjects = isMobile ? 8 : 18;
    const numPearls = isMobile ? 5 : 15;

    // Add cosmetics
    for (let i = 0; i < numObjects; i++) {
      const gen = generators[i % generators.length];
      const mesh = gen();
      
      mesh.position.set(
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 10 - 5
      );
      
      mesh.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
      
      const scale = Math.random() * 0.5 + 0.5;
      mesh.scale.set(scale, scale, scale);

      objects.push({
        mesh,
        speed: (Math.random() * 0.02 + 0.01) * (Math.random() < 0.5 ? 1 : -1),
        rotSpeed: (Math.random() * 0.02 + 0.01)
      });
      
      scene.add(mesh);
    }

    // Add pearls
    for (let i = 0; i < numPearls; i++) {
      const mesh = createPearl();
      mesh.position.set(
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 5
      );
      
      objects.push({
        mesh,
        speed: (Math.random() * 0.01 + 0.005),
        rotSpeed: Math.random() * 0.05
      });
      scene.add(mesh);
    }

    // Gold dust particles
    const particleCount = isMobile ? 200 : 500;
    const particleGeo = new THREE.BufferGeometry();
    const particlePos = new Float32Array(particleCount * 3);
    for(let i=0; i<particleCount * 3; i++) {
      particlePos[i] = (Math.random() - 0.5) * 30;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb88645,
      size: 0.05,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });
    const particles = new THREE.Points(particleGeo, particleMat);
    scene.add(particles);

    camera.position.z = 8;

    // INTERACTION & ANIMATION
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX - window.innerWidth / 2) * 0.001;
      mouseY = (event.clientY - window.innerHeight / 2) * 0.001;
    };

    const onScroll = () => {
      targetY = window.scrollY * 0.002;
    };

    if (!isMobile) {
      document.addEventListener('mousemove', onMouseMove);
      window.addEventListener('scroll', onScroll);
    }

    const clock = new THREE.Clock();
    let isVisible = true;

    const handleVisibility = () => {
      isVisible = document.visibilityState === 'visible';
    };
    document.addEventListener('visibilitychange', handleVisibility);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || prefersReducedMotion) return;

      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      // Camera parallax
      targetX = mouseX * 2;
      camera.position.x += (targetX - camera.position.x) * 0.05;
      camera.position.y += (-targetY - mouseY * 2 - camera.position.y) * 0.05;
      camera.lookAt(scene.position);

      // Light pulse
      pinkLight.intensity = 2 + Math.sin(elapsed * 2) * 0.5;
      goldLight.intensity = 2 + Math.cos(elapsed * 1.5) * 0.5;

      // Objects animation
      objects.forEach((obj, i) => {
        obj.mesh.position.y += Math.sin(elapsed * 0.5 + i) * obj.speed;
        obj.mesh.rotation.x += obj.rotSpeed * delta;
        obj.mesh.rotation.y += obj.rotSpeed * delta;
      });

      // Particles animation
      const positions = particles.geometry.attributes.position.array as Float32Array;
      for(let i=1; i<particleCount*3; i+=3) {
        positions[i] += delta * 0.5;
        if(positions[i] > 15) positions[i] = -15;
      }
      particles.geometry.attributes.position.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animationFrameId);
      
      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement);
      }
      
      // Cleanup
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
          object.geometry.dispose();
          if (Array.isArray(object.material)) {
            object.material.forEach(m => m.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="fixed inset-0 z-0 pointer-events-none" />;
}
