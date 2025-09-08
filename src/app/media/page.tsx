'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import Image from 'next/image';
import {
  GraduationCap,
  BookOpen,
  PlayCircle,
  Calendar,
  Users,
  Link as LinkIcon,
} from 'lucide-react';
import BottomNavigation from '../components/BottomNavigation';

type LearnResource = {
  title: string;
  description: string;
  cta: string;
  href?: string;
  icon: React.ReactNode;
};

export default function LearnPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  useEffect(() => {
    if (!loading) {
      // Require authentication: redirect to sign-in with returnUrl
      if (!user) {
        const returnUrl = encodeURIComponent('/media');
        router.push(`/signin?returnUrl=${returnUrl}`);
        return;
      }
      // Optional existing behavior: if user hasn't visited landing, send them there first
      if (user && !hasVisitedLanding) {
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  // Fallback UI while redirecting unauthenticated users
  if (!user) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Redirecting to sign in…</div>
      </div>
    );
  }

  const beginnerResources: LearnResource[] = [
    {
      title: 'Start Here: Salsa Basics',
      description: 'Posture, timing, frame, and the basic step to get you moving.',
      cta: 'View basics guide',
      href: '#basics',
      icon: <GraduationCap className="w-6 h-6 text-brand-gold" />,
    },
    {
      title: 'Beginner Video Drills',
      description: 'Short, focused drills to build comfort and rhythm at home.',
      cta: 'Watch drills',
      href: '#videos',
      icon: <PlayCircle className="w-6 h-6 text-brand-gold" />,
    },
    {
      title: 'Glossary: Salsa Terms',
      description: 'Common terms you will hear in class and on the dance floor.',
      cta: 'Open glossary',
      href: '#glossary',
      icon: <BookOpen className="w-6 h-6 text-brand-gold" />,
    },
  ];

  const practiceResources: LearnResource[] = [
    {
      title: 'Weekly Classes & Practicas',
      description: 'Find where to learn and practice on campus and nearby.',
      cta: 'See schedule',
      href: '/events',
      icon: <Calendar className="w-6 h-6 text-brand-gold" />,
    },
    {
      title: 'Find Practice Partners',
      description: 'Connect with peers to practice fundamentals and patterns.',
      cta: 'Browse network',
      href: '/network',
      icon: <Users className="w-6 h-6 text-brand-gold" />,
    },
    {
      title: 'Curated External Resources',
      description: 'Recommended videos, channels, and articles for deeper learning.',
      cta: 'Open links',
      href: '#links',
      icon: <LinkIcon className="w-6 h-6 text-brand-gold" />,
    },
  ];

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden">
      <div className="absolute inset-0">
        <Image
          src="/dance_classes.png"
          alt="Learning background"
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#0b1939]/60 to-[#000000]/80"></div>
      </div>

      <div className="flex w-full overflow-hidden relative z-10">
        {user && (
          <Sidebar
            isOpen={isMobileNavOpen}
            onToggle={() => setIsMobileNavOpen(false)}
            isCollapsed={isSidebarCollapsed}
            onCollapseToggle={toggleSidebar}
          />
        )}

        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out ${user ? (isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64') : ''}`}>
          {user ? (
            <TopBar
              user={user}
              onSidebarToggle={toggleSidebar}
              isSidebarCollapsed={isSidebarCollapsed}
              isMobileNavOpen={isMobileNavOpen}
            />
          ) : null}

          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              <div className="mb-8 sm:mb-12">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-brand-gold mb-4 drop-shadow-lg">
                      Learn Salsa
                    </h1>
                    <p className="text-xl sm:text-2xl text-brand-sand max-w-4xl leading-relaxed">
                      Everything you need to get started and keep growing—on campus and beyond.
                    </p>
                  </div>
                </div>
              </div>

              <section id="basics" className="mb-10 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-2xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-6 h-6" /> Getting Started
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {beginnerResources.map((r) => (
                    <a
                      key={r.title}
                      href={r.href}
                      className="group block rounded-xl border border-brand-maroon/30 bg-brand-charcoal/40 p-5 hover:border-brand-gold/60 hover:shadow-glow transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {r.icon}
                        <h3 className="text-lg font-semibold text-brand-gold">{r.title}</h3>
                      </div>
                      <p className="text-brand-sand mb-3">{r.description}</p>
                      <span className="text-accentFrom group-hover:text-accentTo font-medium">
                        {r.cta} →
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <section id="videos" className="mb-10 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-2xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                  <PlayCircle className="w-6 h-6" /> Featured Drill
                </h2>
                <div className="relative aspect-video rounded-xl overflow-hidden">
                  <video src="/Video-544.mp4" controls className="w-full h-full object-cover" />
                </div>
                <p className="text-brand-sand mt-3">Practice along with this timing and weight transfer drill.</p>
              </section>

              <section id="practice" className="mb-10 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-2xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                  <Calendar className="w-6 h-6" /> Practice & Community
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {practiceResources.map((r) => (
                    <a
                      key={r.title}
                      href={r.href}
                      className="group block rounded-xl border border-brand-maroon/30 bg-brand-charcoal/40 p-5 hover:border-brand-gold/60 hover:shadow-glow transition-all"
                    >
                      <div className="flex items-center gap-3 mb-2">
                        {r.icon}
                        <h3 className="text-lg font-semibold text-brand-gold">{r.title}</h3>
                      </div>
                      <p className="text-brand-sand mb-3">{r.description}</p>
                      <span className="text-accentFrom group-hover:text-accentTo font-medium">
                        {r.cta} →
                      </span>
                    </a>
                  ))}
                </div>
              </section>

              <section id="glossary" className="mb-10 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-2xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                  <BookOpen className="w-6 h-6" /> Quick Glossary
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-brand-sand">
                  <div>
                    <p><span className="text-brand-gold font-semibold">Basic Step:</span> The foundational step pattern for salsa on1.</p>
                    <p><span className="text-brand-gold font-semibold">Frame:</span> The tone and connection in your arms and body.</p>
                    <p><span className="text-brand-gold font-semibold">Cross Body Lead:</span> A staple traveling move across the slot.</p>
                  </div>
                  <div>
                    <p><span className="text-brand-gold font-semibold">Shines:</span> Solo footwork patterns done without partner.</p>
                    <p><span className="text-brand-gold font-semibold">Connection:</span> The conversation between partners via touch.</p>
                    <p><span className="text-brand-gold font-semibold">Musicality:</span> How movement reflects the music.</p>
                  </div>
                </div>
              </section>

              <section id="links" className="mb-4 bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal p-6 rounded-2xl shadow-card border border-brand-maroon/30">
                <h2 className="text-2xl font-bold text-brand-gold mb-4 flex items-center gap-2">
                  <LinkIcon className="w-6 h-6" /> External Links
                </h2>
                <ul className="list-disc list-inside text-brand-sand space-y-1">
                  <li><a href="https://www.youtube.com/results?search_query=salsa+beginner+basics" target="_blank" rel="noreferrer" className="text-accentFrom hover:text-accentTo">YouTube: Salsa beginner basics</a></li>
                  <li><a href="https://www.youtube.com/results?search_query=cross+body+lead+salsa" target="_blank" rel="noreferrer" className="text-accentFrom hover:text-accentTo">YouTube: Cross body lead</a></li>
                </ul>
              </section>
            </div>
          </main>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}
