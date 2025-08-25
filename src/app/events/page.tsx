'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SalsaCalEvents from '../components/SalsaCalEvents';
import EventHistory from '../components/EventHistory';
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
  const [nextEvent, setNextEvent] = useState<SalsaEvent | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'interested' | 'not_going'>('going');

  // Function to handle when events are loaded from SalsaCalEvents
  const handleEventsLoaded = (events: SalsaEvent[]) => {
    if (events.length > 0) {
      setNextEvent(events[0]); // First event is the next upcoming event
    }
  };

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

  const viewEventDetails = () => {
    if (nextEvent) {
      // Create a Google Calendar event creation URL with event details
      const startDate = nextEvent.start.toISOString().slice(0, 16).replace(/:/g, '');
      const endDate = nextEvent.end.toISOString().slice(0, 16).replace(/:/g, '');
      
      const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(nextEvent.title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(nextEvent.location || '')}&details=${encodeURIComponent(nextEvent.description || '')}`;
      window.open(googleCalendarUrl, '_blank');
    }
  };

  const addToCalendar = () => {
    if (nextEvent) {
      // Create ICS file for download
      const icsContent = [
        'BEGIN:VCALENDAR',
        'VERSION:2.0',
        'PRODID:-//SalsaCal//Salsa @ Cal Events//EN',
        'BEGIN:VEVENT',
        `UID:${nextEvent.id}`,
        `DTSTART:${nextEvent.start.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `DTEND:${nextEvent.end.toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
        `SUMMARY:${nextEvent.title}`,
        nextEvent.location ? `LOCATION:${nextEvent.location}` : '',
        nextEvent.description ? `DESCRIPTION:${nextEvent.description}` : '',
        'END:VEVENT',
        'END:VCALENDAR'
      ].filter(line => line !== '').join('\r\n');

      const blob = new Blob([icsContent], { type: 'text/calendar' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${nextEvent.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}.ics`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }
  };

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
      
      <div className="flex flex-row w-full overflow-hidden relative z-10">
        {/* Sidebar - Only show for logged-in users */}
        {user && <Sidebar />}
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 w-full">
          {/* TopBar - Only show for logged-in users */}
          {user ? (
            <TopBar user={user} />
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
          <main className="flex-1 p-3 sm:p-4 md:p-6 overflow-x-hidden">
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
                
                {/* Guest User Prompt */}
                {!user && (
                  <div className="mt-4 p-3 sm:p-4 bg-brand-maroon/20 border border-brand-maroon rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User size={18} className="text-brand-gold flex-shrink-0" />
                      <div className="min-w-0 flex-1">
                        <p className="text-brand-gold font-medium text-sm sm:text-base">Guest User</p>
                        <p className="text-brand-sand text-xs sm:text-sm">
                          Sign in to RSVP for events, track your progress, and access the full dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Event Section */}
              {nextEvent && (
                <div className="mb-6 sm:mb-8 w-full">
                  <h2 className="text-xl sm:text-2xl font-semibold text-brand-gold mb-4">Next Event</h2>
                  <div className="bg-brand-charcoal p-4 sm:p-6 rounded-xl2 shadow-card border border-brand-maroon w-full">
                    {/* Event Header */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-xl sm:text-2xl font-bold text-brand-gold mb-2 break-words">{nextEvent.title}</h3>
                        <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-brand-sand text-sm sm:text-base">
                          <div className="flex items-center space-x-2">
                            <Calendar size={16} />
                            <span>{formatDate(nextEvent.start)}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Clock size={16} />
                            <span>{formatTime(nextEvent.start)} - {formatTime(nextEvent.end)}</span>
                          </div>
                          {nextEvent.location && (
                            <div className="flex items-center space-x-2">
                              <MapPin size={16} />
                              <span className="break-words">{nextEvent.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-maroon/20 text-brand-gold self-start sm:self-auto flex-shrink-0">
                        Upcoming
                      </span>
                    </div>

                    {/* RSVP Section - Only show for logged-in users */}
                    {user && (
                      <>
                        <div className="border-t border-brand-maroon pt-4 mb-4">
                          <h4 className="text-base sm:text-lg font-semibold text-brand-gold mb-3">RSVP Status</h4>
                          <div className="flex flex-wrap gap-2 sm:gap-3">
                            {[
                              { value: 'going', label: 'Going', icon: CheckCircle, color: 'text-green-400' },
                              { value: 'interested', label: 'Interested', icon: HelpCircle, color: 'text-yellow-400' },
                              { value: 'not_going', label: 'Not Going', icon: XCircle, color: 'text-red-400' },
                            ].map((option) => {
                              const Icon = option.icon;
                              const isSelected = rsvpStatus === option.value;
                              
                              return (
                                <button
                                  key={option.value}
                                  onClick={() => handleRSVP(option.value as any)}
                                  className={`
                                    flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 text-sm sm:text-base flex-shrink-0
                                    ${isSelected 
                                      ? 'border-brand-gold bg-brand-gold/20 text-brand-gold' 
                                      : 'border-brand-maroon text-brand-sand hover:border-brand-gold hover:text-brand-gold'
                                    }
                                    focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal
                                  `}
                                >
                                  <Icon size={16} className={option.color} />
                                  <span>{option.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4 border-t border-brand-maroon">
                      <button 
                        onClick={viewEventDetails}
                        className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                      >
                        <ExternalLink size={16} />
                        <span>View Details</span>
                      </button>
                      <button 
                        onClick={addToCalendar}
                        className="px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 flex items-center justify-center sm:justify-start space-x-2 text-sm sm:text-base"
                      >
                        <Calendar size={16} />
                        <span>Download Calendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* All Upcoming Events */}
              <div className="mb-6 sm:mb-8 w-full">
                <h2 className="text-xl sm:text-2xl font-semibold text-brand-gold mb-4">All Upcoming Events</h2>
                <SalsaCalEvents maxEvents={10} onEventsLoaded={handleEventsLoaded} />
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
                <div className="mt-6 sm:mt-8 p-4 sm:p-6 bg-gradient-to-tr from-accentFrom/20 to-accentTo/20 border border-brand-maroon rounded-xl2 text-center w-full">
                  <h3 className="text-xl sm:text-2xl font-bold text-brand-gold mb-3">Ready to Join?</h3>
                  <p className="text-brand-sand mb-4 sm:mb-6 text-sm sm:text-base">
                    Sign in to access your personalized dashboard, RSVP for events, and track your dance progress!
                  </p>
                  <button
                    onClick={signIn}
                    className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl2 font-semibold text-base sm:text-lg shadow-card hover:shadow-glow transition-all duration-300"
                  >
                    Sign In with Google
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
