"use client";

export default function HeaderBar() {
  return (
    <header className="w-100 h-20 absolute top-0 right-100 z-10 bg-white rounded-3xl shadow-md border border-black/10 flex items-center justify-between px-10">
      <h1 className="text-2xl font-audiowide text-black">
        ポートフォリオ
      </h1>
      <span className="text-cyber-accentRed font-audiowide">DORIAN</span>
    </header>
  );
}
