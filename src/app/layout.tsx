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
  metadataBase: new URL('https://salsa-at-cal.vercel.app'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Salsa @ Cal - UC Berkeley's Premier Salsa Dancing Community",
    description: "Join the vibrant salsa community at UC Berkeley! Learn LA style salsa through our DeCal course, join our RSO, participate in Open Practica, and connect with fellow dancers. Free events, competitive team, and networking opportunities.",
    url: 'https://salsa-at-cal.vercel.app',
    siteName: 'Salsa @ Cal',
    images: [
      {
        url: '/dance_classes.png',
        width: 1200,
        height: 630,
        alt: 'Salsa @ Cal Dance Classes at UC Berkeley',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Salsa @ Cal - UC Berkeley Salsa Dancing Community",
    description: "Join UC Berkeley's premier salsa dancing community! DeCal course, RSO, Open Practica, competitive team, and networking opportunities for all skill levels.",
    images: ['/dance_classes.png'],
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
    google: 'J8lhr6xJmUejj6IQxBnTudEWrQMxkhhtWPbxy7sFKcc',
  },
  category: 'Education',
  classification: 'Student Organization',
  icons: {
    icon: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">💃</text></svg>',
        type: 'image/svg+xml',
      }
    ],
    apple: [
      {
        url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><text y="80" font-size="80">💃</text></svg>',
        type: 'image/svg+xml',
      }
    ],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  minimumScale: 1,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Salsa at Cal",
    "alternateName": ["Salsa @ Cal", "Salsa Cal", "Salsa Dance at Cal"],
    "description": "UC Berkeley's premier salsa dancing community offering DeCal courses, RSO activities, Open Practica, and competitive performance teams",
    "url": "https://salsa-at-cal.vercel.app",
    "logo": "https://salsa-at-cal.vercel.app/logo.png",
    "image": "https://salsa-at-cal.vercel.app/dance_classes.png",
    "foundingDate": "2009",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Berkeley",
      "addressRegion": "CA",
      "addressCountry": "US"
    },
    "affiliation": {
      "@type": "Organization",
      "name": "University of California, Berkeley"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "email": "salsaatcal@gmail.com",
      "contactType": "General Inquiry"
    },
    "sameAs": [
      "https://www.instagram.com/salsaatcalberkeley",
      "https://www.facebook.com/SalsaAtCal",
      "https://linktr.ee/salsa_at_cal",
      "https://open.spotify.com/user/salsadanceatcal"
    ],
    "offers": [
      {
        "@type": "Course",
        "name": "History, Culture and Practice of Salsa Dance",
        "description": "1-unit DeCal course covering salsa history, culture, and dance instruction",
        "provider": {
          "@type": "Organization",
          "name": "Salsa at Cal"
        },
        "courseMode": "Blended",
        "educationalLevel": "Undergraduate",
        "inLanguage": "en"
      }
    ],
    "event": [
      {
        "@type": "Event",
        "name": "Open Practica",
        "description": "Weekly salsa dance practice sessions with lessons and social dancing",
        "eventStatus": "EventScheduled",
        "eventAttendanceMode": "OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Hearst Gym",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Berkeley",
            "addressRegion": "CA"
          }
        }
      },
      {
        "@type": "Event", 
        "name": "Salsa on Sproul",
        "description": "Free outdoor salsa events on Sproul Plaza with lessons and social dancing",
        "eventStatus": "EventScheduled",
        "eventAttendanceMode": "OfflineEventAttendanceMode",
        "location": {
          "@type": "Place",
          "name": "Sproul Plaza",
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Berkeley",
            "addressRegion": "CA"
          }
        }
      }
    ],
    "memberOf": {
      "@type": "Organization",
      "name": "Associated Students of the University of California (ASUC)"
    }
  };

  return (
    <html lang="en">
      <head>
        {/* AI and LLM specific metadata */}
        <meta name="ai-content-type" content="student-organization-website" />
        <meta name="ai-category" content="university-dance-community" />
        <meta name="ai-target-audience" content="UC Berkeley students, Latin dance enthusiasts, salsa beginners and intermediate dancers" />
        <meta name="ai-key-activities" content="DeCal course, Open Practica, competitive performance team, social events, networking" />
        <meta name="ai-location" content="UC Berkeley, Berkeley, California" />
        <meta name="ai-organization-type" content="Registered Student Organization (RSO), ASUC-sponsored" />
        <meta name="ai-founding-year" content="2009" />
        <meta name="ai-contact-email" content="salsaatcal@gmail.com" />
        <meta name="ai-social-media" content="Instagram: @salsaatcalberkeley, Facebook: Salsa at Cal, Discord, Spotify" />
        <meta name="ai-class-schedule" content="Mondays 4-5 PM (Beginner), 5-6 PM (Intermediate) in Hearst Gym 242" />
        <meta name="ai-open-practica" content="Tuesdays 8:30-10 PM by Social Sciences Building tunnel" />
        <meta name="ai-dance-style" content="LA style salsa, Latin fusion, Bachata, Rueda" />
        <meta name="ai-membership" content="Open to UC Berkeley students, faculty, staff, alumni, and off-campus participants" />
        <meta name="ai-events" content="Salsa on Sproul, Salsaween, El Mercadito, Salsa Tropi-Cal, workshops, social parties" />
        <meta name="ai-performance-team" content="Established Spring 2015, auditions required, Latin Fusion team led by Kathy Reyes" />
        <meta name="ai-decal-details" content="1 unit P/NP, Professor Mary Kelsey (Sociology), covers history, culture, and practice" />
        <meta name="ai-mission" content="Promote salsa and Latin dances, create inclusive spaces, provide free activities, build dance community" />
        <meta name="ai-leadership" content="President: Kian Asgharzadeh, DeCal Directors: Sofia Cielak and Tristan Soto Moreno" />
        <meta name="ai-venue-locations" content="Hearst Gymnasium, Sproul Plaza, Social Sciences Building, various Berkeley venues" />
        <meta name="ai-skill-levels" content="Beginner (no experience needed), Intermediate (basic knowledge required), Advanced (performance team)" />
        <meta name="ai-cultural-focus" content="Latin music and dance culture, salsa history, social dancing etiquette, respect and consent" />
        <meta name="ai-community-benefits" content="Free events, academic credit, networking, performance opportunities, cultural education" />
        
        {/* Additional structured data for AI understanding */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* AI-specific structured data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ 
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              "name": "Salsa at Cal",
              "description": "UC Berkeley's premier salsa dancing community offering educational courses, social events, and performance opportunities",
              "educationalLevel": "Undergraduate",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Salsa at Cal Programs",
                "itemListElement": [
                  {
                    "@type": "Course",
                    "name": "History, Culture and Practice of Salsa Dance",
                    "description": "1-unit DeCal course covering salsa history, culture, and dance instruction",
                    "courseMode": "Blended",
                    "educationalLevel": "Undergraduate",
                    "inLanguage": "en",
                    "provider": {
                      "@type": "Organization",
                      "name": "Salsa at Cal"
                    },
                    "offers": {
                      "@type": "Offer",
                      "price": "0",
                      "priceCurrency": "USD",
                      "description": "Free for UC Berkeley students"
                    }
                  }
                ]
              },
              "memberOf": {
                "@type": "Organization",
                "name": "University of California, Berkeley"
              },
              "foundingDate": "2009",
              "location": {
                "@type": "Place",
                "name": "University of California, Berkeley",
                "address": {
                  "@type": "PostalAddress",
                  "addressLocality": "Berkeley",
                  "addressRegion": "CA",
                  "addressCountry": "US"
                }
              }
            })
          }}
        />
      </head>
      <body className="antialiased touch-manipulation overflow-x-hidden max-w-full bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000]">
        <FirebaseProvider>
          {children}
        </FirebaseProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
