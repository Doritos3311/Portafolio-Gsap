export default function MobileLayout() {
  return (
    <div className="lg:hidden min-h-screen bg-white p-4">
      {/* Diseño vertical simple para móviles */}
      <div className="space-y-6">
        <div className="bg-black text-white p-6 text-center">
          <h1 className="text-3xl font-bold">ポートフォリオ</h1>
        </div>
        {/* ... contenido móvil */}
      </div>
    </div>
  );
}