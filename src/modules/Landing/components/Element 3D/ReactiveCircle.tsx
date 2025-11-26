'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

interface Particle {
  x: number;
  y: number;
  z: number;
  baseX: number;
  baseY: number;
  baseZ: number;
  vx: number;
  vy: number;
  vz: number;
  originalColor: boolean; // true = rojo, false = blanco
  currentColor: boolean;
  element: HTMLDivElement;
  size: number;
}

export default function ParticleCloud3D() {
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mousePos = useRef({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;
    const particleCount = 180;
    const cloudRadius = 100;

    // Crear partículas
    particlesRef.current = [];
    
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const elevation = Math.random() * Math.PI;
      const radius = cloudRadius + Math.random() * 25;

      const baseX = Math.cos(angle) * Math.sin(elevation) * radius;
      const baseY = Math.sin(angle) * Math.sin(elevation) * radius;
      const baseZ = Math.cos(elevation) * radius;

      const isRed = Math.random() > 0.6;
      const size = Math.random() * 5 + 2;

      const element = document.createElement('div');
      element.className = 'particle-dot';
      element.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${isRed ? '#ef4444' : '#ffffff'};
        border-radius: 50%;
        box-shadow: 0 0 ${Math.random() * 20 + 5}px ${isRed ? 'rgba(239, 68, 68, 0.8)' : 'rgba(255, 255, 255, 0.6)'};
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        pointer-events: none;
        transition: background 0.3s ease, box-shadow 0.3s ease;
      `;

      container.appendChild(element);

      particlesRef.current.push({
        x: baseX,
        y: baseY,
        z: baseZ,
        baseX,
        baseY,
        baseZ,
        vx: 0,
        vy: 0,
        vz: 0,
        originalColor: isRed,
        currentColor: isRed,
        element,
        size,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mousePos.current.x = (e.clientX - rect.left - width / 2) / width;
      mousePos.current.y = (e.clientY - rect.top - height / 2) / height;
    };

    const handleMouseLeave = () => {
      mousePos.current.x = 0;
      mousePos.current.y = 0;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Loop de animación
    let rotation = 0;

    const animate = () => {
      rotation += 0.003;

      particlesRef.current.forEach((particle) => {
        // Rotación 3D del círculo base
        const cos = Math.cos(rotation);
        const sin = Math.sin(rotation);

        let rx = particle.baseX;
        let ry = particle.baseY * cos - particle.baseZ * sin;
        let rz = particle.baseY * sin + particle.baseZ * cos;

        // Rotación en eje Y
        const cosY = Math.cos(rotation * 0.7);
        const sinY = Math.sin(rotation * 0.7);
        const rotX = rx * cosY - rz * sinY;
        const rotZ = rx * sinY + rz * cosY;
        const rotY = ry;

        // Calcular distancia individual de cada partícula al mouse
        const particleScreenX = rotX;
        const particleScreenY = rotY;

        const distToMouse = Math.sqrt(
          (mousePos.current.x * 300 - particleScreenX) ** 2 +
          (mousePos.current.y * 300 - particleScreenY) ** 2
        );

        const repulsionRadius = 80;
        const repulsionStrength = Math.max(0, 1 - distToMouse / repulsionRadius);

        // Dirección de repulsión desde el mouse hacia la partícula
        let repulseX = 0;
        let repulseY = 0;
        let repulseZ = 0;

        if (repulsionStrength > 0.05) {
          const dx = particleScreenX - mousePos.current.x * 300;
          const dy = particleScreenY - mousePos.current.y * 300;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;

          repulseX = (dx / dist) * repulsionStrength * 70;
          repulseY = (dy / dist) * repulsionStrength * 70;
          repulseZ = repulsionStrength * 30;
        }

        // Aplicar velocidad con amortiguamiento
        particle.vx += (repulseX - particle.vx) * 0.15;
        particle.vy += (repulseY - particle.vy) * 0.15;
        particle.vz += (repulseZ - particle.vz) * 0.15;

        particle.x = rotX + particle.vx;
        particle.y = rotY + particle.vy;
        particle.z = rotZ + particle.vz;

        // Colisión suave entre partículas
        for (let j = 0; j < particlesRef.current.length; j++) {
          if (j === particlesRef.current.indexOf(particle)) continue;
          const other = particlesRef.current[j];
          const dx = other.x - particle.x;
          const dy = other.y - particle.y;
          const dz = other.z - particle.z;
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
          const minDist = particle.size + other.size + 5;

          if (dist < minDist) {
            const force = (minDist - dist) * 0.02;
            const nx = dx / (dist || 1);
            const ny = dy / (dist || 1);
            const nz = dz / (dist || 1);

            particle.vx -= nx * force;
            particle.vy -= ny * force;
            particle.vz -= nz * force;
          }
        }

        // Determinar si la partícula debe cambiar de color
        const shouldChangeColor = repulsionStrength > 0.3;
        const targetColor = shouldChangeColor ? !particle.originalColor : particle.originalColor;

        if (particle.currentColor !== targetColor) {
          particle.currentColor = targetColor;
          const newColor = targetColor ? '#ef4444' : '#ffffff';
          const newGlow = targetColor
            ? `0 0 ${particle.size * 3}px rgba(239, 68, 68, 0.9)`
            : `0 0 ${particle.size * 2}px rgba(255, 255, 255, 0.6)`;

          particle.element.style.background = newColor;
          particle.element.style.boxShadow = newGlow;
        }

        // Perspectiva 3D
        const perspective = 800;
        const scale = perspective / (perspective + particle.z);

        const screenX = particle.x * scale;
        const screenY = particle.y * scale;

        gsap.set(particle.element, {
          x: screenX,
          y: screenY,
          scale: scale * 0.8 + 0.2,
          opacity: Math.max(0.3, scale * 0.8 + 0.2),
          zIndex: Math.round(scale * 1000),
        });
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      particlesRef.current.forEach(p => p.element.remove());
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-screen bg-black flex items-center justify-center overflow-hidden"
      style={{ perspective: '1000px' }}
    >
      {/* Fondo con efecto grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        ></div>
      </div>

      {/* Glow central */}
      <div
        className="absolute w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, rgba(239, 68, 68, 0.05) 50%, transparent 100%)',
          filter: 'blur(40px)',
        }}
      ></div>

      {/* Instrucciones */}
      <div className="absolute top-10 text-center text-white opacity-40 text-sm font-light pointer-events-none">
        <p>Mueve tu mouse para repeler las partículas</p>
      </div>
    </div>
  );
}