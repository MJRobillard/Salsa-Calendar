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
  const { user, loading } = useFirebase();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return null; // Will redirect
  }

  return (
    <div className="min-h-screen bg-brand-paper text-white">
      <div className="flex">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col">
          <TopBar user={user} />
          
          {/* Dashboard Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Row A - Next Event */}
              <div className="mb-6">
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
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
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
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
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
              <div className="mb-6">
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
