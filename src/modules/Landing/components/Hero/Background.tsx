'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Background: React.FC = () => {
  const svgRef = useRef<SVGSVGElement>(null);
  const leftRect1Ref = useRef<SVGPathElement>(null);
  const leftRect2Ref = useRef<SVGPathElement>(null);
  const centerRectRef = useRef<SVGPathElement>(null);
  const topRectRef = useRef<SVGPathElement>(null);
  const bottomRectRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 0.5 });

    // Animaciones normales para otros elementos
    tl.fromTo([leftRect1Ref.current, leftRect2Ref.current, topRectRef.current, bottomRectRef.current], 
      { opacity: 0 },
      { opacity: 1, duration: 1.2, stagger: 0.2, ease: "power2.out" }
    )
    // SVG central SIN blur y visible inmediatamente
    .fromTo(centerRectRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1.5, ease: "sine.out" },
      "-=1"
    );

  }, []);

  return (
    <div className="fixed inset-0 -z-10 bg-white">
      <svg
        ref={svgRef}
        width="100%"
        height="100%"
        viewBox="0 0 1920 1080"
        className="w-full h-full"
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Rectángulo izquierdo superior */}
        <path
          ref={leftRect1Ref}
          className="fill-[#1A1A1A]"
          d="M179.36,689.57h-55c-27.61,0-50-22.39-50-50v-531c0-27.61,22.39-50,50-50h55c27.61,0,50,22.39,50,50v531 C229.36,667.19,206.97,689.57,179.36,689.57z"
        />

        {/* Rectángulo central - SIN BLUR */}
        <path
          ref={centerRectRef}
          className="fill-[#333333] opacity-100" // Forzar opacidad
          d="M1735.36,58.57h68c27.61,0,50,22.39,50,50v531.1c0,27.58-22.33,49.95-49.9,50l-937.54,1.81 c-27.58,0.05-49.9,22.42-49.9,50v228.1c0,27.61-22.39,50-50,50H308.36c-27.61,0-50-22.39-50-50v-861c0-27.61,22.39-50,50-50h849.59 c27.77,0,50.22,22.63,50,50.41l-0.18,22.4c-0.23,27.69,22.1,50.29,49.79,50.41l377.59,1.58c27.7,0.12,50.21-22.3,50.21-50v-24.79 C1685.36,80.96,1707.75,58.57,1735.36,58.57z"
        />

        {/* Rectángulo izquierdo inferior */}
        <path
          ref={leftRect2Ref}
          className="fill-[#1A1A1A]"
          d="M179.36,1019.57h-55c-27.61,0-50-22.39-50-50v-199c0-27.61,22.39-50,50-50h55c27.61,0,50,22.39,50,50v199 C229.36,997.19,206.97,1019.57,179.36,1019.57z"
        />

        {/* Rectángulo inferior */}
        <path
          ref={bottomRectRef}
          className="fill-[#1A1A1A]"
          d="M838.36,969.57v-204c0-27.61,22.39-50,50-50h915c27.61,0,50,22.39,50,50v204c0,27.61-22.39,50-50,50h-915 C860.75,1019.57,838.36,997.19,838.36,969.57z"
        />

        {/* Rectángulo superior */}
        <path
          ref={topRectRef}
          className="fill-[#1A1A1A]"
          d="M1283.86,58.57h322c27.61,0,50,22.39,50,50v5.31c0,27.61-22.39,50-50,50h-322c-27.61,0-50-22.39-50-50v-5.31 C1233.86,80.96,1256.25,58.57,1283.86,58.57z"
        />
      </svg>
    </div>
  );
};

export default Background;