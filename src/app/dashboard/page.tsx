'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import QRCheckinCard from '../components/QRCheckinCard';
import ProgressSummary from '../components/ProgressSummary';
import LatestPhotos from '../components/LatestPhotos';
import JourneyLineChart from '../components/JourneyLineChart';
import SkillMixDonut from '../components/SkillMixDonut';
import EventHistory from '../components/EventHistory';
import AddCalendarCard from '../components/AddCalendarCard';
import BayAreaNetworkEvents from '../components/BayAreaNetworkEvents';

interface SalsaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}

export default function DashboardPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'interested' | 'not_going'>('going');
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Unified sidebar toggle function
  const toggleSidebar = () => {
    if (window.innerWidth < 768) {
      // Mobile: toggle mobile nav
      setIsMobileNavOpen(!isMobileNavOpen);
    } else {
      // Desktop: toggle sidebar collapse
      setIsSidebarCollapsed(!isSidebarCollapsed);
    }
  };

  useEffect(() => {
    if (!loading) {
      if (!user) {
        router.push('/');
      } else if (!hasVisitedLanding) {
        // If user is signed in but hasn't visited landing page, redirect them
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  // Removed NextEvent fetching/rendering per request

  const handleRSVP = (status: 'going' | 'interested' | 'not_going') => {
    setRsvpStatus(status);
    console.log('RSVP status updated:', status);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !hasVisitedLanding) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="flex w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out`}>
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Dashboard Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
            <div className="max-w-7xl mx-auto w-full">
              {/* Row A removed: Next Event card no longer shown */}

              {/* Row B - Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 w-full">
                <QRCheckinCard mode="scan" userId={user.uid} />
                <ProgressSummary 
                  styles={['salsa', 'bachata', 'cumbia']}
                  data={{}}
                />
                <LatestPhotos 
                  thumbnails={[]}
                  onOpenGallery={() => console.log('Open gallery')}
                />
                <AddCalendarCard />
              </div>

              {/* Row C - Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 w-full">
                <JourneyLineChart data={[]} />
                <SkillMixDonut data={[]} />
              </div>

              {/* Row E - Event History */}
              <div className="mb-4 sm:mb-6 w-full">
                <EventHistory items={[]} />
              </div>

              {/* Row F - Bay Area Network Events */}
              <div className="mb-4 sm:mb-6 w-full">
                <BayAreaNetworkEvents />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
