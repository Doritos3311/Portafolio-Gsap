import './globals.css';

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
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}