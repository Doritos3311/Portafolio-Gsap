"use client";

import HeaderBar from "@/modules/Landing/components/Hero/HeaderBar";
import MainShowcase from "@/modules/Landing/components/Hero/MainShowcase";
import BottomCard from "@/modules/Landing/components/Hero/BottomCard";
import GridBackground from "@/modules/Landing/components/Hero/GridBackground";

export default function Page() {
  return (
    <div className="w-full min-h-full pl-25">

      <GridBackground />

      <HeaderBar />

      <div className="flex flex-col gap-6 h-full">

        {/* CONTENEDOR CENTRAL — Imagen grande */}
        <MainShowcase />

        {/* TARJETA INFERIOR DERECHA */}
        <div className="flex justify-end">
          <BottomCard />
        </div>

      </div>
    </div>
  );
}
