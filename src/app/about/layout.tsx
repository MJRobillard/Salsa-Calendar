import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "About Salsa @ Cal | UC Berkeley Salsa Dancing RSO & DeCal",
  description: "Learn about Salsa at Cal, UC Berkeley's premier salsa dancing community. Founded in 2009, we offer DeCal courses, RSO activities, competitive performance teams, and Open Practica sessions. Join our inclusive Latin dance community!",
  keywords: [
    "About Salsa at Cal",
    "Salsa at Cal history",
    "UC Berkeley salsa RSO",
    "Salsa DeCal course",
    "Berkeley salsa community",
    "Latin dance Berkeley",
    "Salsa performance team Berkeley",
    "Berkeley dance organization",
    "Salsa at Cal mission",
    "UC Berkeley dance community",
    "Berkeley Latin dance culture",
    "Salsa dancing at Berkeley"
  ],
  openGraph: {
    title: "About Salsa @ Cal | UC Berkeley Salsa Dancing RSO & DeCal",
    description: "Learn about Salsa at Cal, UC Berkeley's premier salsa dancing community. Founded in 2009, we offer DeCal courses, RSO activities, competitive performance teams, and Open Practica sessions.",
    type: 'website',
  },
}

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
