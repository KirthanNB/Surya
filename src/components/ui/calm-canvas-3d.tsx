"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

export function CalmCanvas3D() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === "undefined") return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 1000);
    // Medium distance for perfect containment on all screens
    camera.position.z = 24;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const chakraGroup = new THREE.Group();
    scene.add(chakraGroup);

    // 1. Subtle, Calm Bronze Gold Material with soft opacity (high contrast for text readability)
    const goldMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      roughness: 0.4,
      metalness: 0.6,
      transparent: true,
      opacity: 0.22, // Subtle so text on top is 100% crisp and readable
    });

    const blueAshokaMaterial = new THREE.MeshStandardMaterial({
      color: 0x1e3a8a,
      roughness: 0.5,
      metalness: 0.4,
      transparent: true,
      opacity: 0.2,
    });

    // 2. Medium-sized Outer Rim (Medium size: radius 5.8 - fits on mobile and laptop without clipping)
    const outerRadius = 5.8;
    const rimGeometry = new THREE.TorusGeometry(outerRadius, 0.16, 16, 100);
    const outerRim = new THREE.Mesh(rimGeometry, goldMaterial);
    chakraGroup.add(outerRim);

    // Secondary Inner Concentric Ring
    const innerRimGeometry = new THREE.TorusGeometry(outerRadius - 0.65, 0.06, 16, 80);
    const innerRim = new THREE.Mesh(innerRimGeometry, goldMaterial);
    chakraGroup.add(innerRim);

    // 3. Central Hub (Nabhi)
    const hubGeometry = new THREE.CylinderGeometry(1.0, 1.0, 0.35, 24);
    hubGeometry.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubGeometry, goldMaterial);
    chakraGroup.add(hubMesh);

    // Central Core
    const coreSphereGeometry = new THREE.SphereGeometry(0.45, 16, 16);
    const coreSphere = new THREE.Mesh(coreSphereGeometry, blueAshokaMaterial);
    chakraGroup.add(coreSphere);

    // 4. The 24 Spokes of Law, Truth & Accountability
    const spokeCount = 24;
    const spokeLength = outerRadius - 1.0;

    for (let i = 0; i < spokeCount; i++) {
      const angle = (i * Math.PI * 2) / spokeCount;

      const spokeGeometry = new THREE.CylinderGeometry(0.035, 0.065, spokeLength, 6);
      spokeGeometry.translate(0, spokeLength / 2 + 0.9, 0);

      const spokeMesh = new THREE.Mesh(spokeGeometry, goldMaterial);
      spokeMesh.rotation.z = angle;
      chakraGroup.add(spokeMesh);

      // Spoke Tip Diamond
      const tipGeometry = new THREE.ConeGeometry(0.1, 0.28, 5);
      tipGeometry.translate(0, outerRadius - 0.14, 0);
      const tipMesh = new THREE.Mesh(tipGeometry, goldMaterial);
      tipMesh.rotation.z = angle;
      chakraGroup.add(tipMesh);
    }

    // 5. Subtle Ambient Light Motes
    const particleCount = 60;
    const particleGeometry = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 28;
      particlePositions[i + 1] = (Math.random() - 0.5) * 28;
      particlePositions[i + 2] = (Math.random() - 0.5) * 12;
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0xd97706,
      size: 0.12,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);

    // 6. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0xffedd5, 1.2);
    dirLight1.position.set(10, 10, 10);
    scene.add(dirLight1);

    // Mouse Parallax Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const onMouseMove = (event: MouseEvent) => {
      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;
      mouseX = (event.clientX - windowHalfX) * 0.0003;
      mouseY = (event.clientY - windowHalfY) * 0.0003;
    };

    window.addEventListener("mousemove", onMouseMove);

    const onResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", onResize);

    // Position & Angle
    chakraGroup.rotation.x = 0.15;
    chakraGroup.rotation.y = -0.15;

    // Animation Loop
    let animationFrameId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      targetX += (mouseX - targetX) * 0.04;
      targetY += (mouseY - targetY) * 0.04;

      chakraGroup.rotation.z = -elapsedTime * 0.05;
      chakraGroup.rotation.y = -0.15 + targetX;
      chakraGroup.rotation.x = 0.15 + targetY;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden" 
      aria-hidden="true"
    />
  );
}
