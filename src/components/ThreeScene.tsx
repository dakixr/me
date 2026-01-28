"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export default function ThreeScene() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true,
      powerPreference: "high-performance"
    });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    camera.position.z = 30;

    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 150 : 400;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const originalPositions = new Float32Array(particleCount * 3);
    const velocities = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color(0x60a5fa),
      new THREE.Color(0xa78bfa),
      new THREE.Color(0x22d3ee),
      new THREE.Color(0x34d399),
      new THREE.Color(0xfbbf24),
      new THREE.Color(0xf472b6),
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = (Math.random() - 0.5) * 60;
      const y = (Math.random() - 0.5) * 45;
      const z = (Math.random() - 0.5) * 30;

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      originalPositions[i * 3] = x;
      originalPositions[i * 3 + 1] = y;
      originalPositions[i * 3 + 2] = z;

      velocities[i * 3] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 1] = (Math.random() - 0.5) * 0.02;
      velocities[i * 3 + 2] = (Math.random() - 0.5) * 0.02;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
      colors[i * 3] = color.r;
      colors[i * 3 + 1] = color.g;
      colors[i * 3 + 2] = color.b;

      sizes[i] = Math.random() * 2 + 0.3;
    }

    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.PointsMaterial({
      size: 1,
      vertexColors: true,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    const lineGeometry = new THREE.BufferGeometry();
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.08,
      blending: THREE.AdditiveBlending,
    });

    const maxLines = isMobile ? 100 : 300;
    const linePositions = new Float32Array(maxLines * 6);
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    const codeSymbols: THREE.Mesh[] = [];
    const symbolGeometries = [
      new THREE.TorusGeometry(2, 0.3, 8, 32),
      new THREE.TorusGeometry(1.5, 0.25, 8, 24),
      new THREE.TorusKnotGeometry(1.2, 0.4, 64, 8),
    ];

    for (let i = 0; i < 8; i++) {
      const geo = symbolGeometries[i % symbolGeometries.length].clone();
      const mat = new THREE.MeshBasicMaterial({
        color: colorPalette[i % colorPalette.length],
        wireframe: true,
        transparent: true,
        opacity: 0.12,
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      mesh.position.set(
        (Math.random() - 0.5) * 45,
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.015,
          y: (Math.random() - 0.5) * 0.015,
          z: (Math.random() - 0.5) * 0.015,
        },
        floatSpeed: Math.random() * 0.4 + 0.4,
        floatOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 1.5 + 0.5,
      };
      
      codeSymbols.push(mesh);
      scene.add(mesh);
    }

    const techShapes: THREE.Mesh[] = [];
    const geometries = [
      new THREE.IcosahedronGeometry(2.5, 0),
      new THREE.OctahedronGeometry(2, 0),
      new THREE.TetrahedronGeometry(1.8, 0),
      new THREE.BoxGeometry(1.8, 1.8, 1.8),
    ];

    for (let i = 0; i < 5; i++) {
      const geo = geometries[i % geometries.length].clone();
      const mat = new THREE.MeshBasicMaterial({
        color: colorPalette[(i + 2) % colorPalette.length],
        wireframe: true,
        transparent: true,
        opacity: 0.1,
      });
      const mesh = new THREE.Mesh(geo, mat);
      
      mesh.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 25,
        (Math.random() - 0.5) * 18
      );
      mesh.userData = {
        rotationSpeed: {
          x: (Math.random() - 0.5) * 0.018,
          y: (Math.random() - 0.5) * 0.018,
          z: (Math.random() - 0.5) * 0.018,
        },
        floatSpeed: Math.random() * 0.45 + 0.45,
        floatOffset: Math.random() * Math.PI * 2,
        floatAmplitude: Math.random() * 2 + 1,
      };
      
      techShapes.push(mesh);
      scene.add(mesh);
    }

    const centerGeometry = new THREE.IcosahedronGeometry(7, 1);
    const centerMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    const centerMesh = new THREE.Mesh(centerGeometry, centerMaterial);
    scene.add(centerMesh);

    const innerGeometry = new THREE.OctahedronGeometry(4.5, 0);
    const innerMaterial = new THREE.MeshBasicMaterial({
      color: 0xa78bfa,
      wireframe: true,
      transparent: true,
      opacity: 0.1,
    });
    const innerMesh = new THREE.Mesh(innerGeometry, innerMaterial);
    scene.add(innerMesh);

    const coreGeometry = new THREE.SphereGeometry(2, 16, 16);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.15,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    scene.add(coreMesh);

    const mouse = { x: 0, y: 0 };
    const targetMouse = { x: 0, y: 0 };

    const handleMouseMove = (event: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };

    const handleTouchMove = (event: TouchEvent) => {
      const rect = container.getBoundingClientRect();
      targetMouse.x = ((event.touches[0].clientX - rect.left) / rect.width) * 2 - 1;
      targetMouse.y = -((event.touches[0].clientY - rect.top) / rect.height) * 2 + 1;
    };

    container.addEventListener("mousemove", handleMouseMove, { passive: true });
    container.addEventListener("touchmove", handleTouchMove, { passive: true });

    let animationFrameId: number;
    let time = 0;
    let initialProgress = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.006;

      mouse.x += (targetMouse.x - mouse.x) * 0.04;
      mouse.y += (targetMouse.y - mouse.y) * 0.04;

      if (initialProgress < 1) {
        initialProgress += 0.006;
        if (initialProgress >= 1) {
          initialProgress = 1;
        }
      }

      const positions = particles.geometry.attributes.position.array as Float32Array;
      const easeOut = 1 - Math.pow(1 - initialProgress, 3);
      
      for (let i = 0; i < particleCount; i++) {
        const ix = i * 3;
        const iy = i * 3 + 1;
        const iz = i * 3 + 2;

        const originalX = originalPositions[ix];
        const originalY = originalPositions[iy];
        const originalZ = originalPositions[iz];

        const waveX = Math.sin(time + originalY * 0.08) * 0.25;
        const waveY = Math.cos(time + originalX * 0.08) * 0.25;
        const waveZ = Math.sin(time + originalX * 0.04 + originalY * 0.04) * 0.2;

        const mouseInfluenceX = mouse.x * 5;
        const mouseInfluenceY = mouse.y * 3.5;

        const targetX = originalX + waveX + mouseInfluenceX * 0.35;
        const targetY = originalY + waveY + mouseInfluenceY * 0.35;
        const targetZ = originalZ + waveZ;

        positions[ix] += (targetX - positions[ix]) * 0.08;
        positions[iy] += (targetY - positions[iy]) * 0.08;
        positions[iz] += (targetZ - positions[iz]) * 0.08;

        positions[ix] *= easeOut;
        positions[iy] *= easeOut;
        positions[iz] *= easeOut;
      }

      particles.geometry.attributes.position.needsUpdate = true;

      let lineIndex = 0;
      const linePositions = lines.geometry.attributes.position.array as Float32Array;
      const connectionDistance = isMobile ? 8 : 12;
      
      for (let i = 0; i < particleCount && lineIndex < maxLines; i++) {
        for (let j = i + 1; j < particleCount && lineIndex < maxLines; j++) {
          const ix = i * 3;
          const jx = j * 3;
          
          const dx = positions[ix] - positions[jx];
          const dy = positions[ix + 1] - positions[jx + 1];
          const dz = positions[ix + 2] - positions[jx + 2];
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          if (dist < connectionDistance) {
            linePositions[lineIndex * 6] = positions[ix];
            linePositions[lineIndex * 6 + 1] = positions[ix + 1];
            linePositions[lineIndex * 6 + 2] = positions[ix + 2];
            linePositions[lineIndex * 6 + 3] = positions[jx];
            linePositions[lineIndex * 6 + 4] = positions[jx + 1];
            linePositions[lineIndex * 6 + 5] = positions[jx + 2];
            
            lineIndex++;
          }
        }
      }
      
      for (let i = lineIndex * 6; i < linePositions.length; i++) {
        linePositions[i] = 0;
      }
      
      lines.geometry.attributes.position.needsUpdate = true;

      centerMesh.rotation.x = time * 0.12 + mouse.y * 0.18;
      centerMesh.rotation.y = time * 0.16 + mouse.x * 0.18;
      centerMesh.scale.setScalar(0.5 + easeOut * 0.5);

      innerMesh.rotation.x = time * 0.2 - mouse.y * 0.25;
      innerMesh.rotation.y = time * 0.28 - mouse.x * 0.25;
      innerMesh.scale.setScalar(0.5 + easeOut * 0.5);

      coreMesh.rotation.x = time * 0.3 + mouse.y * 0.15;
      coreMesh.rotation.y = time * 0.4 + mouse.x * 0.15;
      coreMesh.scale.setScalar(0.5 + easeOut * 0.5);

      codeSymbols.forEach((mesh, index) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        const floatY = Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * mesh.userData.floatAmplitude;
        mesh.position.y += (floatY - mesh.position.y) * 0.04;

        const distToMouse = Math.sqrt(
          Math.pow(mesh.position.x - mouse.x * 18, 2) +
          Math.pow(mesh.position.y - mouse.y * 14, 2)
        );

        if (distToMouse < 12) {
          const attractFactor = (12 - distToMouse) / 12;
          mesh.position.x += (mouse.x * 18 - mesh.position.x) * attractFactor * 0.015;
          mesh.position.y += (mouse.y * 14 - mesh.position.y) * attractFactor * 0.015;
        }

        mesh.scale.setScalar(easeOut * (0.7 + Math.sin(time * 0.4 + index * 0.5) * 0.15));
      });

      techShapes.forEach((mesh, index) => {
        mesh.rotation.x += mesh.userData.rotationSpeed.x;
        mesh.rotation.y += mesh.userData.rotationSpeed.y;
        mesh.rotation.z += mesh.userData.rotationSpeed.z;

        const floatY = Math.sin(time * mesh.userData.floatSpeed + mesh.userData.floatOffset) * mesh.userData.floatAmplitude;
        mesh.position.y += (floatY - mesh.position.y) * 0.04;

        const distToMouse = Math.sqrt(
          Math.pow(mesh.position.x - mouse.x * 15, 2) +
          Math.pow(mesh.position.y - mouse.y * 12, 2)
        );

        if (distToMouse < 10) {
          const pushFactor = (10 - distToMouse) / 10;
          mesh.position.x += (mouse.x * 15 - mesh.position.x) * pushFactor * 0.018;
          mesh.position.y += (mouse.y * 12 - mesh.position.y) * pushFactor * 0.018;
        }

        mesh.scale.setScalar(easeOut * (0.75 + Math.sin(time * 0.45 + index * 0.4) * 0.18));
      });

      camera.position.x += (mouse.x * 4 - camera.position.x) * 0.03;
      camera.position.y += (mouse.y * 3 - camera.position.y) * 0.03;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);
    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);
      resizeObserver.disconnect();
      
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      
      geometry.dispose();
      material.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();
      centerGeometry.dispose();
      centerMaterial.dispose();
      innerGeometry.dispose();
      innerMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      geometries.forEach(geo => geo.dispose());
      symbolGeometries.forEach(geo => geo.dispose());
      techShapes.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      codeSymbols.forEach(mesh => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, [mounted]);

  if (!mounted) return null;

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 overflow-hidden pointer-events-auto"
      style={{ zIndex: 0 }}
      aria-hidden="true"
    />
  );
}
