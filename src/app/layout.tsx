import type { Metadata, Viewport } from "next";
import "./globals.css";
import { FirebaseProvider } from './contexts/FirebaseContext';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata: Metadata = {
  title: "Salsa @ Cal - UC Berkeley Salsa Dancing Community | RSO & DeCal",
  description: "Join Salsa at Cal, UC Berkeley's premier salsa dancing community! Learn LA style salsa through our DeCal course, join our RSO, participate in Open Practica, and connect with fellow dancers. Free events, competitive team, and networking opportunities for all skill levels.",
  keywords: [
    "Salsa at Cal",
    "Salsa Cal",
    "Dancing at Cal",
    "Dancing at Berkeley", 
    "Salsa Calendar",
    "Networking at Cal",
    "Networking at Berkeley",
    "UC Berkeley salsa",
    "Berkeley dancing",
    "Salsa DeCal",
    "Latin dance Berkeley",
    "Salsa RSO",
    "Berkeley dance community",
    "Salsa classes Berkeley",
    "Latin dancing UC Berkeley",
    "Salsa performance team",
    "Berkeley salsa events",
    "Salsa on Sproul",
    "Hearst Gym salsa",
    "Salsa workshops Berkeley",
    "Latin dance community",
    "Berkeley dance networking",
    "Salsa social events",
    "UC Berkeley dance club",
    "Salsa beginners Berkeley",
    "Salsa intermediate Berkeley",
    "LA style salsa",
    "Salsa culture Berkeley",
    "Berkeley Latin music",
    "Salsa community events"
  ],
  authors: [{ name: "Salsa at Cal" }],
  creator: "Salsa at Cal - UC Berkeley",
  publisher: "Salsa at Cal RSO",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://salsaatcal.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Salsa @ Cal - UC Berkeley's Premier Salsa Dancing Community",
    description: "Join the vibrant salsa community at UC Berkeley! Learn LA style salsa through our DeCal course, join our RSO, participate in Open Practica, and connect with fellow dancers. Free events, competitive team, and networking opportunities.",
    url: 'https://salsaatcal.com',
    siteName: 'Salsa @ Cal',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'Salsa @ Cal - UC Berkeley Salsa Dancing Community',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Salsa @ Cal - UC Berkeley's Premier Salsa Dancing Community",
    description: "Join the vibrant salsa community at UC Berkeley! Learn LA style salsa through our DeCal course, join our RSO, participate in Open Practica, and connect with fellow dancers.",
    images: ['/logo.png'],
    creator: '@salsaatcalberkeley',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
  category: 'Education',
  classification: 'Student Organization',
  icons: {
    icon: [
      {
        url: '/favicon.ico',
        sizes: 'any',
      },
      {
        url: '/favicon.svg',
        type: 'image/svg+xml',
      },
      {
        url: '/logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/logo.png',
        sizes: '16x16',
        type: 'image/png',
      },
    ],
    apple: [
      {
        url: '/apple-touch-icon.svg',
        sizes: '180x180',
        type: 'image/svg+xml',
      },
      {
        url: '/logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon.svg',
        color: '#FFD54F',
      },
    ],
  },
  manifest: '/site.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FFD54F' },
    { media: '(prefers-color-scheme: dark)', color: '#0b1939' },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#FFD54F" />
        <meta name="msapplication-TileColor" content="#0b1939" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.svg" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className="min-h-screen bg-brand-paper text-white antialiased">
        <FirebaseProvider>
          {children}
          <Analytics />
          <SpeedInsights />
        </FirebaseProvider>
      </body>
    </html>
  );
}