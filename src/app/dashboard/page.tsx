'use client'

import React from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import NextEventCard from '../components/NextEventCard';
import QRCheckinCard from '../components/QRCheckinCard';
import ProgressSummary from '../components/ProgressSummary';
import LatestPhotos from '../components/LatestPhotos';
import JourneyLineChart from '../components/JourneyLineChart';
import SkillMixDonut from '../components/SkillMixDonut';
import EventHistory from '../components/EventHistory';


export default function DashboardPage() {
  const { user, loading, hasVisitedLanding } = useFirebase();
  const router = useRouter();

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
    <div className="min-h-screen bg-gradient-to-br from-brand-charcoal via-brand-paper to-brand-charcoal text-white overflow-x-hidden relative">
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
                <NextEventCard 
                  event={{
                    title: "Beginner Salsa Class",
                    start: new Date(Date.now() + 86400000), // Tomorrow
                    location: "Hearst Gymnasium",
                    type: "lesson"
                  }}
                  rsvpStatus="going"
                  onRSVP={() => console.log('RSVP clicked')}
                />
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
