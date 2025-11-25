"use client";

export default function MainShowcase() {
  return (
    <div
      className="
        absolute
        w-full h-full
        bg-black rounded-3xl shadow-lg overflow-hidden
        border border-black/20
      "
      style={{
        clipPath: `
          polygon(
            0% 0%,        /* esquina superior izquierda */
            70% 0%,       /* hasta columna 3 */
            85% 0%,       /* pequeño salto (V,V) */
            100% 0%,      /* extremo derecho */

            100% 55%,     /* baja hasta antes de mordida */

            70% 55%,      /* inicio mordida abajo derecha */
            70% 100%,     /* baja completamente */
            0% 100%,      /* esquina inferior izquierda */
            0% 0%         /* cerrar polígono */
          )
        `
      }}
    >
      <img
        src="/your-image.jpg"
        className="w-full h-full object-cover"
      />
    </div>
  );
}
