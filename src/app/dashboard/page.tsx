'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import BottomNavigation from '../components/BottomNavigation';
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

  // State for data from MongoDB
  const [progressData, setProgressData] = useState({});
  const [thumbnails, setThumbnails] = useState<string[]>([]);
  const [attendanceData, setAttendanceData] = useState([]);
  const [styleData, setStyleData] = useState([]);
  const [eventHistory, setEventHistory] = useState([]);
  const [loadingData, setLoadingData] = useState(true);

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
        router.push('/');
      }
    }
  }, [user, loading, hasVisitedLanding, router]);

  // Fetch data from MongoDB
  useEffect(() => {
    const fetchDashboardData = async () => {
      if (!user) return;
      
      try {
        setLoadingData(true);
        const response = await fetch('/api/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${await user.getIdToken()}`,
            'Content-Type': 'application/json',
          },
        });
        
        if (response.ok) {
          const data = await response.json();
          setProgressData(data.progressData || {});
          setThumbnails(data.thumbnails || []);
          setAttendanceData(data.attendanceData || []);
          setStyleData(data.styleData || []);
          setEventHistory(data.eventHistory || []);
        } else {
          console.error('Failed to fetch dashboard data');
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoadingData(false);
      }
    };

    fetchDashboardData();
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  if (!user || !hasVisitedLanding) {
    return null;
  }

  return (
    <div className="min-h-screen relative bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden">
      {/* Background with blurred salsa dance photo */}
      <div className="absolute inset-0">
        <Image 
          src="/dance_classes.png" 
          alt="Salsa dancing background" 
          fill
          className="object-cover opacity-20"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-br from-[#000000]/80 via-[#0b1939]/60 to-[#000000]/80"></div>
      </div>
      
      <div className="flex w-full overflow-hidden relative z-10">
        {/* Sidebar */}
        <Sidebar 
          isOpen={isMobileNavOpen} 
          onToggle={() => setIsMobileNavOpen(false)}
          isCollapsed={isSidebarCollapsed}
          onCollapseToggle={toggleSidebar}
        />
        
        {/* Main Content */}
        <div className={`flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out ${isSidebarCollapsed ? 'md:ml-0' : 'md:ml-64'}`}>
          <TopBar 
            user={user} 
            onSidebarToggle={toggleSidebar}
            isSidebarCollapsed={isSidebarCollapsed}
            isMobileNavOpen={isMobileNavOpen}
          />
          
          {/* Dashboard Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-6 sm:mb-8">
                <h1 className="text-3xl sm:text-4xl font-bold text-brand-gold mb-2">Dashboard</h1>
                <p className="text-brand-sand text-lg">Welcome back, {user.displayName || 'Dancer'}!</p>
              </div>

              {/* Dashboard Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6 sm:space-y-8">
                  {/* QR Check-in Card */}
                  <QRCheckinCard 
                    mode="show" 
                    userId={user.uid} 
                  />
                  
                  {/* Progress Summary */}
                  <ProgressSummary 
                    styles={['LA Style', 'Bachata', 'Salsa']}
                    data={progressData}
                  />
                  
                  {/* Latest Photos */}
                  <LatestPhotos 
                    thumbnails={thumbnails}
                  />
                  
                  {/* Add Calendar Card */}
                  <AddCalendarCard />
                </div>

                {/* Right Column */}
                <div className="space-y-6 sm:space-y-8">
                  {/* Journey Line Chart */}
                  <JourneyLineChart 
                    data={attendanceData}
                  />
                  
                  {/* Skill Mix Donut */}
                  <SkillMixDonut 
                    data={styleData}
                  />
                  
                  {/* Event History */}
                  <EventHistory 
                    items={eventHistory}
                  />
                </div>
              </div>

              {/* Bay Area Network Events */}
              <div className="mt-8 sm:mt-12">
                <BayAreaNetworkEvents />
              </div>
            </div>
          </main>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
}