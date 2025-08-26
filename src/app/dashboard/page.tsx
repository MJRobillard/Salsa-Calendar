'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NextEventCard from '../components/NextEventCard';
import QRCheckinCard from '../components/QRCheckinCard';
import ProgressSummary from '../components/ProgressSummary';
import LatestPhotos from '../components/LatestPhotos';
import JourneyLineChart from '../components/JourneyLineChart';
import SkillMixDonut from '../components/SkillMixDonut';
import EventHistory from '../components/EventHistory';
import ICAL from 'ical.js';

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
  const [nextEvent, setNextEvent] = useState<SalsaEvent | null>(null);
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

  // Fetch events when component mounts
  useEffect(() => {
    if (user && hasVisitedLanding) {
      fetchEvents();
    }
  }, [user, hasVisitedLanding]);

  const fetchEvents = async () => {
    try {
      const response = await fetch('/api/calendar');
      
      if (!response.ok) {
        if (response.status === 500) {
          console.error('Calendar service temporarily unavailable');
          return;
        } else {
          console.error(`Failed to fetch events (${response.status})`);
          return;
        }
      }
      
      const icsData = await response.text();
      const parsedEvents = parseICSEvents(icsData);
      
      // Sort by start date and take the next upcoming event
      const sortedEvents = parsedEvents
        .filter(event => event.start > new Date())
        .sort((a, b) => a.start.getTime() - b.start.getTime());
      
      if (sortedEvents.length > 0) {
        setNextEvent(sortedEvents[0]);
      }
    } catch (err) {
      console.error('Error fetching events:', err);
    }
  };

  const parseICSEvents = (icsData: string): SalsaEvent[] => {
    try {
      const jcalData = ICAL.parse(icsData);
      const comp = new ICAL.Component(jcalData);
      const vevents = comp.getAllSubcomponents('vevent');
      
      return vevents.map(vevent => {
        const event = new ICAL.Event(vevent);
        return {
          id: event.uid,
          title: event.summary || 'Untitled Event',
          start: event.startDate.toJSDate(),
          end: event.endDate.toJSDate(),
          location: event.location,
          description: event.description
        };
      });
    } catch (error) {
      console.error('Error parsing ICS data:', error);
      return [];
    }
  };

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
              {/* Row A - Next Event */}
              <div className="mb-4 sm:mb-6 w-full">
                {nextEvent ? (
                  <NextEventCard 
                    event={{
                      title: nextEvent.title,
                      start: nextEvent.start,
                      location: nextEvent.location || 'TBD',
                      type: 'lesson'
                    }}
                    rsvpStatus={rsvpStatus}
                    onRSVP={handleRSVP}
                  />
                ) : (
                  <div className="w-full">
                    <div className="bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] p-6 rounded-xl border border-brand-gold">
                      <div className="text-center">
                        <h3 className="text-xl font-semibold text-brand-gold mb-2">No Upcoming Events</h3>
                        <p className="text-brand-sand">Check back later for upcoming Salsa @ Cal events!</p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Row B - 3 Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 w-full">
                <QRCheckinCard mode="scan" userId={user.uid} />
                <ProgressSummary 
                  styles={['salsa', 'bachata', 'cumbia']}
                  data={{}}
                />
                <LatestPhotos 
                  thumbnails={[]}
                  onOpenGallery={() => console.log('Open gallery')}
                />
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
