"use client";

export default function MainShowcase() {
  const clipPathStyle = {
    clipPath: `
      polygon(
        0% 0%, 14% 0%, 28% 0%, 42% 0%, 
        42% 12%, 70% 12%, 70% 0%, 100% 0%, 
        100% 60%, 40% 60%, 40% 100%, 42% 100%, 
        42% 100%, 0% 100%
      )
    `
  };

  return (
    <div
      className="z-11 absolute w-full h-full bg-black shadow-lg overflow-hidden border border-black/20"
      style={clipPathStyle}
    >
      {/* Contenedor interno con bordes redondeados */}
      <div className="w-full h-full rounded-3xl overflow-hidden">
        <img
          src="/your-image.jpg"
          alt="Showcase"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}