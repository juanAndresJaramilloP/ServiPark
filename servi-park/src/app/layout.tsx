import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import AuthProvider from '@/app/context/AuthProvider';
import { VariablesProvider } from '@/app/context/ParkingState';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" data-theme="lofi">
      <body className={`${inter.className} antialiased`}>
        <AuthProvider>
          <VariablesProvider>
            {children}
          </VariablesProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
