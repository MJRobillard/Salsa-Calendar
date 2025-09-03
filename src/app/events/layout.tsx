import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Salsa Events Calendar | Salsa @ Cal - UC Berkeley",
  description: "View upcoming salsa events at UC Berkeley including DeCal classes, Open Practica, Salsa on Sproul, and social dance events. RSVP and stay connected with the Salsa @ Cal community.",
  keywords: [
    "Salsa events Berkeley",
    "Salsa calendar UC Berkeley", 
    "Salsa on Sproul",
    "Open Practica Berkeley",
    "Salsa DeCal events",
    "Berkeley salsa social events",
    "Salsa workshops Berkeley",
    "Latin dance events Berkeley",
    "UC Berkeley dance events",
    "Salsa community events",
    "Berkeley salsa parties",
    "Salsa networking events"
  ],
  openGraph: {
    title: "Salsa Events Calendar | Salsa @ Cal - UC Berkeley",
    description: "View upcoming salsa events at UC Berkeley including DeCal classes, Open Practica, Salsa on Sproul, and social dance events.",
    type: 'website',
  },
}

export default function EventsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
