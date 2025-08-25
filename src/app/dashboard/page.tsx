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
      
      <div className="flex flex-row w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          <TopBar user={user} />
          
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
                  <div className="golden-border">
                    <div className="bg-darkBg p-6 rounded-xl">
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
                  data={{
                    salsa: { sessions: 12, minutes: 480 },
                    bachata: { sessions: 8, minutes: 320 },
                    cumbia: { sessions: 4, minutes: 160 }
                  }}
                />
                <LatestPhotos 
                  thumbnails={[
                    '/placeholder1.jpg',
                    '/placeholder2.jpg',
                    '/placeholder3.jpg'
                  ]}
                  onOpenGallery={() => console.log('Open gallery')}
                />
              </div>

              {/* Row C - Charts */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-6 w-full">
                <JourneyLineChart 
                  data={[
                    { date: '2024-01-01', attended: true },
                    { date: '2024-01-08', attended: true },
                    { date: '2024-01-15', attended: false },
                    { date: '2024-01-22', attended: true }
                  ]}
                />
                <SkillMixDonut 
                  data={[
                    { style: 'salsa', minutes: 480 },
                    { style: 'bachata', minutes: 320 },
                    { style: 'cumbia', minutes: 160 }
                  ]}
                />
              </div>

              {/* Row E - Event History */}
              <div className="mb-4 sm:mb-6 w-full">
                <EventHistory 
                  items={[
                    { date: '2024-01-22', type: 'lesson', role: 'lead', location: 'Hearst Gym' },
                    { date: '2024-01-15', type: 'social', role: 'follow', location: 'Greek Theatre' },
                    { date: '2024-01-08', type: 'lesson', role: 'lead', location: 'Hearst Gym' }
                  ]}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
