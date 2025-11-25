"use client";

export default function BottomCard() {
  return (
    <div
      className="
        w-[380px] h-[200px] 
        bg-white rounded-3xl shadow-lg 
        border border-black/10 p-6
      "
    >
      <h2 className="font-audiowide text-xl mb-2">メイン情報</h2>
      <p className="text-black/70 text-sm">
        Aquí va el texto o información que quieras destacar.
      </p>
    </div>
  );
}
