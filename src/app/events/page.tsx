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
    <div className="min-h-screen bg-brand-paper text-white">
      <div className="flex">
        {/* Sidebar - Only show for logged-in users */}
        {user && <Sidebar />}
        
        {/* Main Content */}
        <div className={`flex-1 flex flex-col ${user ? '' : 'ml-0'}`}>
          {/* TopBar - Only show for logged-in users */}
          {user ? (
            <TopBar user={user} />
          ) : (
            <header className="bg-brand-charcoal border-b border-brand-maroon px-6 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-brand-gold">Events</h2>
                  <p className="text-sm text-brand-sand">Public events calendar</p>
                </div>
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.push('/')}
                    className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors"
                  >
                    Back to Home
                  </button>
                  <button
                    onClick={signIn}
                    className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300"
                  >
                    <LogIn size={16} />
                    <span>Sign In</span>
                  </button>
                </div>
              </div>
            </header>
          )}
          
          {/* Events Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand-gold mb-2">Events</h1>
                <p className="text-brand-sand text-lg">
                  {user 
                    ? 'Stay updated with all Salsa @ Cal events and activities'
                    : 'Browse upcoming Salsa @ Cal events. Sign in to RSVP and access your dashboard!'
                  }
                </p>
                
                {/* Guest User Prompt */}
                {!user && (
                  <div className="mt-4 p-4 bg-brand-maroon/20 border border-brand-maroon rounded-lg">
                    <div className="flex items-center space-x-3">
                      <User size={20} className="text-brand-gold" />
                      <div>
                        <p className="text-brand-gold font-medium">Guest User</p>
                        <p className="text-brand-sand text-sm">
                          Sign in to RSVP for events, track your progress, and access the full dashboard.
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Next Event Section */}
              {nextEvent && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-brand-gold mb-4">Next Event</h2>
                  <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
                    {/* Event Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold text-brand-gold mb-2">{nextEvent.title}</h3>
                        <div className="flex items-center space-x-4 text-brand-sand">
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
                              <span>{nextEvent.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-full text-sm font-medium bg-brand-maroon/20 text-brand-gold">
                        Upcoming
                      </span>
                    </div>

                    {/* RSVP Section - Only show for logged-in users */}
                    {user && (
                      <>
                        <div className="border-t border-brand-maroon pt-4 mb-4">
                          <h4 className="text-lg font-semibold text-brand-gold mb-3">RSVP Status</h4>
                          <div className="flex flex-wrap gap-3">
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
                                    flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
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
                    <div className="flex justify-end space-x-3 pt-4 border-t border-brand-maroon">
                      <button 
                        onClick={viewEventDetails}
                        className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors flex items-center space-x-2"
                      >
                        <ExternalLink size={16} />
                        <span>View Details</span>
                      </button>
                      <button 
                        onClick={addToCalendar}
                        className="px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 flex items-center space-x-2"
                      >
                        <Calendar size={16} />
                        <span>Download Calendar</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* All Upcoming Events */}
              <div className="mb-8">
                <h2 className="text-2xl font-semibold text-brand-gold mb-4">All Upcoming Events</h2>
                <SalsaCalEvents maxEvents={10} onEventsLoaded={handleEventsLoaded} />
              </div>

              {/* Event History - Only show for logged-in users */}
              {user && (
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-brand-gold mb-4">Event History</h2>
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
                <div className="mt-8 p-6 bg-gradient-to-tr from-accentFrom/20 to-accentTo/20 border border-brand-maroon rounded-xl2 text-center">
                  <h3 className="text-2xl font-bold text-brand-gold mb-3">Ready to Join?</h3>
                  <p className="text-brand-sand mb-6">
                    Sign in to access your personalized dashboard, RSVP for events, and track your dance progress!
                  </p>
                  <button
                    onClick={signIn}
                    className="bg-gradient-to-tr from-accentFrom to-accentTo text-white px-8 py-4 rounded-xl2 font-semibold text-lg shadow-card hover:shadow-glow transition-all duration-300"
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
