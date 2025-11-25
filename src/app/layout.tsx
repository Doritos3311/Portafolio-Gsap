import './globals.css';
import Sidebar from "@/modules/Landing/components/Hero/Sidebar";

export const metadata = {
  title: 'Portafolio',
  description: 'Portafolio ',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-cyber-black text-white overflow-x-hidden">
        <Sidebar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}