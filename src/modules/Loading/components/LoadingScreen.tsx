// portafolio\src\modules\Loading Page\components\LoadingScreen.tsx

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './LoadingScreen.scss';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// ⚙️ CONFIGURACIÓN SIMPLIFICADA Y EFECTIVA
const CONFIG = {
  // Grid flexible que se adapta al tamaño de pantalla
  BASE_COLS: 7,
  BASE_ROWS: 3,

  // Animación
  BLINK_MIN_DURATION: 0.01,
  BLINK_MAX_DURATION: 0.03,
  BLINK_MIN_REPEAT: 4,
  BLINK_MAX_REPEAT: 8,
  BLINK_DELAY_MULTIPLIER: 0.08,

  // Colores (solo rojo, blanco, negro)
  COLOR_PHASES: [
    { red: 0.6, black: 0.4 }, // Más rojo al inicio
    { red: 0.2, black: 0.8 }, // Más negro
    { red: 0.2, black: 0.8 }, // Más negro
    { red: 0.6, black: 0.4 }, // Vuelve a rojo
  ],

  // Patrones
  PATTERN_PROBABILITY: 0.7,
};

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rectanglesRef = useRef<(HTMLDivElement | null)[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  // Calcular grid responsive
  const calculateGrid = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // ↓↓↓ MANTENER 3 COLUMNAS EN TODOS LOS DISPOSITIVOS ↓↓↓
    let cols = CONFIG.BASE_COLS;

    let rows = CONFIG.BASE_ROWS;
    if (screenHeight < 600) {
      rows = 2;
    } else if (screenHeight > 1200) {
      rows = 4;
    }

    return { cols, rows, total: cols * rows };
  };

  const { cols, rows, total } = calculateGrid();

  useEffect(() => {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Audiowide&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);

    const ctx = gsap.context(() => {
      // Inicializar todos visibles
      gsap.set(rectanglesRef.current, { opacity: 1 });
      gsap.set(contentRef.current, { opacity: 0 });

      const masterTL = gsap.timeline();

      // FASE 1: Evolución de colores
      CONFIG.COLOR_PHASES.forEach((phase, phaseIndex) => {
        const phaseTime = (phaseIndex + 1) * (2 / CONFIG.COLOR_PHASES.length);

        masterTL.add(() => {
          rectanglesRef.current.forEach((rectangle, index) => {
            if (!rectangle) return;

            const newColor = getColorForPhase(phase);
            const newPattern = Math.random() < CONFIG.PATTERN_PROBABILITY ? 'solid' : 'diagonal';

            // Aplicar nuevas clases
            rectangle.className = `cyber-rectangle ${newPattern} ${newColor}`;
          });
        }, phaseTime);
      });

      // FASE 2: Parpadeo
      rectanglesRef.current.forEach((rectangle, index) => {
        if (!rectangle) return;

        const row = Math.floor(index / cols);
        const col = index % cols;

        const delay = (col * 0.05) + (row * 0.03) + (Math.random() * 0.15);
        const duration = CONFIG.BLINK_MIN_DURATION + (Math.random() * (CONFIG.BLINK_MAX_DURATION - CONFIG.BLINK_MIN_DURATION));
        const repeat = CONFIG.BLINK_MIN_REPEAT + Math.floor(Math.random() * (CONFIG.BLINK_MAX_REPEAT - CONFIG.BLINK_MIN_REPEAT));

        masterTL.to(rectangle, {
          opacity: 0.2,
          duration: duration,
          repeat: repeat,
          repeatDelay: Math.random() * 0.2,
          yoyo: true,
          ease: "power1.inOut",
          delay: delay
        }, 0.5);
      });

      // Mostrar contenido
      masterTL.to(contentRef.current, {
        opacity: 1,
        duration: 0.6,
        ease: "power2.out"
      }, 0.8)

        .to(".loading-progress", {
          scaleX: 1,
          duration: 2,
          ease: "power2.inOut",
          onComplete: exitAnimation
        }, 0);

    }, containerRef);

    return () => {
      ctx.revert();
      if (document.head.contains(link)) {
        document.head.removeChild(link);
      }
    };
  }, [cols, rows]);

  const exitAnimation = () => {
    const exitTL = gsap.timeline({
      onComplete: onLoadingComplete
    });

    // ANIMACIÓN DE SALIDA DIRECTA Y EFECTIVA
    exitTL
      // FASE 1: Todos a rojo sólido instantáneamente
      .add(() => {
        rectanglesRef.current.forEach((rectangle) => {
          if (!rectangle) return;
          rectangle.className = 'cyber-rectangle solid red';
        });
      })

      // FASE 2: Pantalla completamente roja
      .to(rectanglesRef.current, {
        opacity: 1,
        duration: 0.1,
        ease: "power2.out"
      })

      // FASE 3: Desvanecimiento rápido
      .to(rectanglesRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: {
          amount: 0.2,
          from: "center"
        }
      })

      // FASE 4: Ocultar contenido y mostrar landing inmediatamente
      .to(".cyber-content", {
        opacity: 0,
        duration: 0.2
      }, "-=0.3")

      .to(containerRef.current, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          // Forzar el callback para mostrar la landing
          onLoadingComplete();
        }
      });
  };

  const getColorForPhase = (phase: { red: number; black: number }): string => {
    const random = Math.random();
    if (random < phase.red) return 'red';
    return 'black';
  };

  const getInitialPattern = (): string => {
    return Math.random() < CONFIG.PATTERN_PROBABILITY ? 'solid' : 'diagonal';
  };

  return (
    <div ref={containerRef} className="cyberpunk-loading">
      {/* Grid simplificado - sin tamaños variables */}
      <div className="rectangles-grid">
        {Array.from({ length: total }, (_, index) => {
          const pattern = getInitialPattern();
          const color = 'red'; // Todos empiezan en rojo

          return (
            <div
              key={index}
              ref={el => {
                if (el) rectanglesRef.current[index] = el;
              }}
              className={`cyber-rectangle ${pattern} ${color}`}
            />
          );
        })}
      </div>

      {/* Contenido */}
      <div ref={contentRef} className="cyber-content">
        <div className="cyber-logo-container">
          <div className="cyber-logo">武</div>
        </div>

        <div className="cyber-text">
          <div className="main-title">PORTFOLIO</div>
        </div>

        <div className="cyber-progress-container">
          <div className="cyber-progress">
            <div className="loading-progress"></div>
          </div>
          <div className="progress-text">
            <span>LOADING SYSTEMS</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;