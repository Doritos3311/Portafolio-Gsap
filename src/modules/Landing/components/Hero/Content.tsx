'use client';

import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Content: React.FC = () => {
  // Refs para animaciones
  const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const tl = gsap.timeline({ delay: 1 });
    
    tl.fromTo(contentRefs.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: "power2.out" }
    );
  }, []);

  const addToRefs = (el: HTMLDivElement | null) => {
    if (el && !contentRefs.current.includes(el)) {
      contentRefs.current.push(el);
    }
  };

  return (
    <>
      {/* CONTENEDOR IZQUIERDO SUPERIOR - SOBRE MÍ */}
      <div
        ref={addToRefs}
        className="absolute left-[4%] top-[18%] w-[12%] min-w-[180px]"
      >
        <div className="bg-white border-2 border-black p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300">
          <h3 className="text-2xl font-bold text-black mb-4 font-japanese">私について</h3>
          <p className="text-gray-700 mb-4 text-sm leading-relaxed">
            Full Stack Developer con enfoque en experiencyas digitales innovadoras y minimalistas.
          </p>
          <button className="w-full bg-black text-white py-2 px-4 text-sm font-bold hover:bg-red-600 transition-colors duration-300 border-2 border-black">
            VER MÁS
          </button>
        </div>
      </div>

      {/* CONTENEDOR IZQUIERDO INFERIOR - CONTACTO */}
      <div
        ref={addToRefs}
        className="absolute left-[4%] bottom-[18%] w-[12%] min-w-[180px]"
      >
        <div className="bg-black text-white p-6 shadow-2xl transform hover:scale-105 transition-transform duration-300 border-2 border-white">
          <h3 className="text-2xl font-bold text-white mb-4 font-japanese">連絡先</h3>
          <div className="space-y-2 text-sm">
            <p>📧 email@ejemplo.com</p>
            <p>📱 +123 456 7890</p>
            <p>📍 Tokyo, Japan</p>
          </div>
          <button className="w-full bg-white text-black py-2 px-4 text-sm font-bold hover:bg-red-500 hover:text-white transition-colors duration-300 mt-4 border-2 border-white">
            コンタクト
          </button>
        </div>
      </div>

      {/* CONTENEDOR SUPERIOR - TÍTULO */}
      <div
        ref={addToRefs}
        className="absolute top-[5%] left-1/2 transform -translate-x-1/2 text-center"
      >
        <div className="bg-white border-2 border-black px-12 py-8 shadow-2xl">
          <h1 className="text-5xl md:text-6xl font-bold text-black mb-4 font-japanese tracking-wider">
            ポートフォリオ
          </h1>
          <p className="text-xl text-gray-700 font-light">FULL STACK DEVELOPER</p>
          <div className="w-20 h-1 bg-red-600 mx-auto mt-4"></div>
        </div>
      </div>

      {/* CONTENEDOR INFERIOR - PROYECTOS */}
      <div
        ref={addToRefs}
        className="absolute bottom-[12%] left-1/2 transform -translate-x-1/2 w-[40%] min-w-[500px]"
      >
        <div className="bg-black text-white p-8 shadow-2xl border-2 border-white">
          <h3 className="text-3xl font-bold text-white mb-6 text-center font-japanese">プロジェクト</h3>
          <div className="grid grid-cols-2 gap-6">
            <div className="bg-white text-black p-4 border-2 border-red-600 transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg mb-2">E-commerce AI</h4>
              <p className="text-sm mb-3">Plataforma inteligente</p>
              <button className="bg-red-600 text-white px-3 py-1 text-xs font-bold w-full hover:bg-red-700 transition-colors">
                詳細
              </button>
            </div>
            <div className="bg-white text-black p-4 border-2 border-red-600 transform hover:scale-105 transition-transform duration-300">
              <h4 className="font-bold text-lg mb-2">Tech Dashboard</h4>
              <p className="text-sm mb-3">Analytics en tiempo real</p>
              <button className="bg-red-600 text-white px-3 py-1 text-xs font-bold w-full hover:bg-red-700 transition-colors">
                詳細
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* CONTENEDOR CENTRAL - HABILIDADES */}
      <div
        ref={addToRefs}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[25%] min-w-[300px]"
      >
        <div className="bg-white border-2 border-black p-8 shadow-2xl text-center">
          <h3 className="text-2xl font-bold text-black mb-6 font-japanese">スキル</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">React/Next.js</span>
              <div className="w-2/3 bg-gray-300 h-2">
                <div className="bg-red-600 h-2 w-4/5"></div>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm font-bold">TypeScript</span>
              <div className="w-2/3 bg-gray-300 h-2">
                <div className="bg-red-600 h-2 w-3/4"></div>
              </div>
            </div>
            <button className="w-full bg-black text-white py-2 px-4 text-sm font-bold hover:bg-red-600 transition-colors duration-300 mt-4 border-2 border-black">
              全スキル
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Content;