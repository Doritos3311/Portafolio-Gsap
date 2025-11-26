"use client";

import { useState } from "react";
import LoadingScreen from "@/modules/Loading/components/LoadingScreen";
import Landing from "@/modules/Landing/app/page";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => { 
    setIsLoading(false);
  };

  return (
    <>
      {/* Pantalla de carga */}
      {isLoading && (
        <div className="min-h-screen">
          <LoadingScreen onLoadingComplete={handleLoadingComplete} />
        </div>
      )}

      {/* Contenido principal - SIEMPRE VISIBLE, sin transición */}
      <div className="min-h-screen">
        <Landing />
      </div>
    </>
  );
}