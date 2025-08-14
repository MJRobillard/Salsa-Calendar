import type { Metadata } from "next";
import "./globals.css";
import { FirebaseProvider } from './contexts/FirebaseContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Salsa @ Cal",
  description: "Join the vibrant salsa community at UC Berkeley",
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">💃</text></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
