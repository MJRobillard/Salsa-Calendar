'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SalsaCalEvents from '../components/SalsaCalEvents';
import EventHistory from '../components/EventHistory';
import BottomNavigation from '../components/BottomNavigation';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, HelpCircle, ExternalLink, User, LogIn } from 'lucide-react';

interface SalsaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}

export default function EventsPage() {
  const { user, loading, signIn } = useFirebase();
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

  // Removed next event selection from events list per request

  const handleRSVP = async (status: 'going' | 'interested' | 'not_going') => {
    if (!user) {
      // Prompt guest to sign in for RSVP functionality
      if (confirm('You need to sign in to RSVP for events. Would you like to sign in now?')) {
        signIn();
      }
      return;
    }
    
    setRsvpStatus(status);
    // Here you could save to Firebase or other backend
    console.log('RSVP status updated:', status);
  };

  // Removed viewEventDetails for Next Event

  // Removed addToCalendar for Next Event

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-paper flex items-center justify-center">
        <div className="text-brand-gold text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#000000] via-[#0b1939] to-[#000000] text-white overflow-x-hidden relative">
      {/* Subtle overlay gradient for depth */}
      <div className="absolute inset-0 bg-gradient-to-tr from-brand-maroon/5 via-transparent to-brand-gold/5 pointer-events-none"></div>
      
      <div className="flex w-full overflow-hidden relative z-10">
        {/* Sidebar - Only show for logged-in users */}
        {user && (
          <Sidebar 
            isOpen={isMobileNavOpen} 
            onToggle={() => setIsMobileNavOpen(false)}
            isCollapsed={isSidebarCollapsed}
            onCollapseToggle={toggleSidebar}
          />
        )}
        
        {/* Main Content */}
        <div className="flex flex-col min-w-0 w-full pt-topbar transition-all duration-300 ease-in-out">
          {/* TopBar - Only show for logged-in users */}
          {user ? (
            <TopBar 
              user={user} 
              onSidebarToggle={toggleSidebar}
              isSidebarCollapsed={isSidebarCollapsed}
              isMobileNavOpen={isMobileNavOpen}
            />
          ) : (
            <header className="bg-brand-charcoal border-b border-brand-maroon px-3 sm:px-6 py-3 sm:py-4">
              <div className="flex items-center justify-between min-w-0">
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg sm:text-xl font-semibold text-brand-gold">Events</h2>
                  <p className="text-xs sm:text-sm text-brand-sand">Public events calendar</p>
                </div>
                <div className="flex items-center space-x-2 sm:space-x-4 ml-2 flex-shrink-0">
                  <button
                    onClick={() => router.push('/')}
                    className="px-2 sm:px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors text-sm sm:text-base"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={signIn}
                    className="flex items-center space-x-2 px-3 sm:px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 text-sm sm:text-base"
                  >
                    <LogIn size={16} />
                    <span className="hidden sm:inline">Sign In</span>
                    <span className="sm:hidden">Sign In</span>
                  </button>
                </div>
              </div>
            </header>
          )}
          
          {/* Events Content */}
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden pb-20 md:pb-6">
            <div className="max-w-7xl mx-auto w-full">
              {/* Page Header */}
              <div className="mb-6 sm:mb-8 w-full">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-gold mb-2">Events</h1>
                <p className="text-brand-sand text-base sm:text-lg">
                  {user 
                    ? 'Stay updated with all Salsa @ Cal events and activities'
                    : 'Browse upcoming Salsa @ Cal events. Sign in to RSVP and access your dashboard!'
                  }
                </p>
                
                {/* Guest User Info */}
                {!user && (
                  <div className="mt-4 p-3 sm:p-4 bg-brand-maroon/10 border border-brand-maroon/40 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User size={18} className="text-brand-gold flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-brand-gold font-medium text-sm sm:text-base">Welcome, Guest!</p>
                        <p className="text-brand-sand text-xs sm:text-sm">
                          Browse events freely. Sign in to RSVP, track progress, and access your personal dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Event section removed */}

              {/* All Upcoming Events */}
              <div className="mb-6 sm:mb-8 w-full">
                <h2 className="text-xl sm:text-2xl font-semibold text-brand-gold mb-4">All Upcoming Events</h2>
                <SalsaCalEvents maxEvents={10} />
              </div>

              {/* Event History - Only show for logged-in users */}
              {user && (
                <div className="mb-6 sm:mb-8 w-full">
                  <h2 className="text-xl sm:text-2xl font-semibold text-brand-gold mb-4">Event History</h2>
                  <EventHistory 
                    items={[
                      { date: '2024-01-22', type: 'lesson', role: 'lead', location: 'Hearst Gym' },
                      { date: '2024-01-15', type: 'social', role: 'follow', location: 'Greek Theatre' },
                      { date: '2024-01-08', type: 'lesson', role: 'lead', location: 'Hearst Gym' }
                    ]}
                  />
                </div>
              )}

              {/* Guest User CTA */}
              {!user && (
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-tr from-accentFrom/10 to-accentTo/10 border border-brand-maroon/40 rounded-xl2 text-center w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-gold mb-3">Want More Features?</h3>
                  <p className="text-brand-sand mb-4 sm:mb-6 text-sm sm:text-base">
                    Sign in to RSVP for events, track your dance progress, and access your personal dashboard!
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <button
                      onClick={signIn}
                      className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl2 font-semibold text-base sm:text-lg shadow-card hover:shadow-glow transition-all duration-300"
                    >
                      Sign In with Google
                    </button>
                    <a
                      href="/dashboard"
                      className="bg-gradient-to-tr from-brand-maroon/20 to-brand-maroon/40 text-brand-gold px-6 sm:px-8 py-3 sm:py-4 rounded-xl2 font-semibold text-base sm:text-lg border border-brand-gold/40 hover:border-brand-gold/60 transition-all duration-300"
                    >
                      Explore Dashboard
                    </a>
                  </div>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
      
      {/* Bottom Navigation for Mobile */}
      <BottomNavigation />
    </div>
  );
}
