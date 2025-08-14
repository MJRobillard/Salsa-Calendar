'use client'

import React, { useState, useEffect } from 'react';
import { useFirebase } from '../contexts/FirebaseContext';
import { useRouter } from 'next/navigation';
import Sidebar from '../components/Sidebar';
import TopBar from '../components/TopBar';
import SalsaCalEvents from '../components/SalsaCalEvents';
import EventHistory from '../components/EventHistory';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, HelpCircle, ExternalLink } from 'lucide-react';

interface SalsaEvent {
  id: string;
  title: string;
  start: Date;
  end: Date;
  location?: string;
  description?: string;
}

export default function EventsPage() {
  const { user, loading } = useFirebase();
  const router = useRouter();
  const [nextEvent, setNextEvent] = useState<SalsaEvent | null>(null);
  const [rsvpStatus, setRsvpStatus] = useState<'going' | 'interested' | 'not_going'>('going');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/');
    }
  }, [user, loading, router]);

  // Function to handle when events are loaded from SalsaCalEvents
  const handleEventsLoaded = (events: SalsaEvent[]) => {
    if (events.length > 0) {
      setNextEvent(events[0]); // First event is the next upcoming event
    }
  };

  const handleRSVP = async (status: 'going' | 'interested' | 'not_going') => {
    setRsvpStatus(status);
    // Here you could save to Firebase or other backend
    console.log('RSVP status updated:', status);
  };

  const viewEventDetails = () => {
    if (nextEvent) {
      // Open Google Calendar with the specific event
      const eventUrl = `https://calendar.google.com/calendar/u/0/r?cid=salsaatcal@gmail.com&date=${nextEvent.start.toISOString().split('T')[0].replace(/-/g, '')}`;
      window.open(eventUrl, '_blank');
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
          
          {/* Events Content */}
          <main className="flex-1 p-6">
            <div className="max-w-7xl mx-auto">
              {/* Page Header */}
              <div className="mb-8">
                <h1 className="text-4xl font-bold text-brand-gold mb-2">Events</h1>
                <p className="text-brand-sand text-lg">Stay updated with all Salsa @ Cal events and activities</p>
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

                    {/* RSVP Section */}
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
                        <span>Add to Calendar Now</span>
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

              {/* Event History */}
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
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
