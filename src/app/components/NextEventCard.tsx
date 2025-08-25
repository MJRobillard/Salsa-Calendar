'use client'

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, HelpCircle, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

interface Event {
  title: string;
  start: Date;
  location: string;
  type: 'lesson' | 'social' | 'performance';
}

interface NextEventCardProps {
  event?: Event;
  rsvpStatus?: 'going' | 'interested' | 'not_going';
  onRSVP?: (status: 'going' | 'interested' | 'not_going') => void;
}

const rsvpOptions = [
  { value: 'going', label: 'Going', icon: CheckCircle, color: 'text-green-400' },
  { value: 'interested', label: 'Interested', icon: HelpCircle, color: 'text-yellow-400' },
  { value: 'not_going', label: 'Not Going', icon: XCircle, color: 'text-red-400' },
] as const;

export default function NextEventCard({ event, rsvpStatus, onRSVP }: NextEventCardProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  if (!event) {
    return (
      <div className="golden-border w-full">
        <div className="bg-darkBg p-4 sm:p-6 rounded-xl">
          <div className="text-center py-6 sm:py-8">
            {/* Logo - Clickable to dashboard */}
            <div className="flex justify-center mb-4 sm:mb-6">
              <Link href="/dashboard" className="hover:scale-105 transition-transform duration-200">
                <div className="relative w-16 h-16 sm:w-20 sm:h-20">
                  <Image 
                    src="/logo.png" 
                    alt="Salsa Club Logo" 
                    fill
                    className="drop-shadow-lg"
                  />
                </div>
              </Link>
            </div>
            
            <h3 className="text-lg sm:text-xl font-semibold text-brand-gold mb-2">No Upcoming Events</h3>
            <p className="text-brand-sand text-sm sm:text-base">Check back later for new events!</p>
          </div>
        </div>
      </div>
    );
  }

  const handleRSVP = async (status: 'going' | 'interested' | 'not_going') => {
    if (!onRSVP) return;
    
    setIsUpdating(true);
    try {
      await onRSVP(status);
    } finally {
      setIsUpdating(false);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { 
      hour: 'numeric', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'lesson': return 'text-blue-400';
      case 'social': return 'text-purple-400';
      case 'performance': return 'text-pink-400';
      default: return 'text-brand-sand';
    }
  };

  const getEventTypeLabel = (type: string) => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  const openEventInGoogleCalendar = (event: Event) => {
    // Create a Google Calendar event creation URL
    const startDate = event.start.toISOString().slice(0, 16).replace(/:/g, '');
    const endDate = new Date(event.start.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16).replace(/:/g, ''); // Default 1 hour duration
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  const addToGoogleCalendar = (event: Event) => {
    // Create a Google Calendar event creation URL (same as view details for now)
    const startDate = event.start.toISOString().slice(0, 16).replace(/:/g, '');
    const endDate = new Date(event.start.getTime() + 60 * 60 * 1000).toISOString().slice(0, 16).replace(/:/g, ''); // Default 1 hour duration
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(event.title)}&dates=${startDate}/${endDate}&location=${encodeURIComponent(event.location)}`;
    window.open(googleCalendarUrl, '_blank');
  };

  return (
    <div className="golden-border w-full">
      <div className="bg-darkBg p-4 sm:p-6 rounded-xl">
        {/* Logo in top-right corner */}
        <div className="relative flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 space-y-3 sm:space-y-0">
          <div className="flex-1 min-w-0">
            <h3 className="text-xl sm:text-2xl font-bold text-brand-gold mb-2 break-words">{event.title}</h3>
            <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 text-brand-sand text-sm sm:text-base">
              <div className="flex items-center space-x-2 min-w-0">
                <Calendar size={16} className="flex-shrink-0" />
                <span className="truncate">{formatDate(event.start)}</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <Clock size={16} className="flex-shrink-0" />
                <span className="truncate">{formatTime(event.start)}</span>
              </div>
              <div className="flex items-center space-x-2 min-w-0">
                <MapPin size={16} className="flex-shrink-0" />
                <span className="truncate break-words">{event.location}</span>
              </div>
            </div>
          </div>
          
          {/* Logo - Clickable to dashboard */}
          <Link href="/dashboard" className="ml-0 sm:ml-4 flex-shrink-0 hover:scale-105 transition-transform duration-200 self-start sm:self-auto">
            <div className="relative w-12 h-12 sm:w-16 sm:h-16">
              <Image 
                src="/logo.png" 
                alt="Salsa Club Logo" 
                fill
                className="drop-shadow-lg"
              />
            </div>
          </Link>
          
          <span className={`px-3 py-1 rounded-full text-sm font-medium bg-brand-maroon/20 ${getEventTypeColor(event.type)} self-start sm:self-auto flex-shrink-0`}>
            {getEventTypeLabel(event.type)}
          </span>
        </div>

        {/* RSVP Section */}
        <div className="relative border-t border-brand-maroon/30 pt-4">
          <h4 className="text-base sm:text-lg font-semibold text-brand-gold mb-3">RSVP Status</h4>
          <div className="flex flex-wrap gap-2 sm:gap-3">
            {rsvpOptions.map((option) => {
              const Icon = option.icon;
              const isSelected = rsvpStatus === option.value;
              const isDisabled = isUpdating;
              
              return (
                <button
                  key={option.value}
                  onClick={() => handleRSVP(option.value)}
                  disabled={isDisabled}
                  className={`
                    flex items-center space-x-2 px-3 sm:px-4 py-2 rounded-lg border transition-all duration-200 backdrop-blur-sm text-sm sm:text-base flex-shrink-0
                    ${isSelected 
                      ? 'border-brand-gold bg-brand-gold/20 text-brand-gold shadow-lg' 
                      : 'border-brand-maroon/50 text-brand-sand hover:border-brand-gold hover:text-brand-gold hover:bg-brand-maroon/10'
                    }
                    ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
                    focus:outline-none focus:ring-2 focus:ring-brand-gold focus:ring-offset-2 focus:ring-offset-brand-charcoal
                  `}
                >
                  <Icon size={16} className={option.color} />
                  <span>{option.label}</span>
                  {isUpdating && isSelected && (
                    <div className="w-4 h-4 border-2 border-brand-gold border-t-transparent rounded-full animate-spin"></div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="relative flex flex-col sm:flex-row sm:justify-end space-y-2 sm:space-y-0 sm:space-x-3 mt-4 pt-4 border-t border-brand-maroon/30">
          <button 
            onClick={() => openEventInGoogleCalendar(event)}
            className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors flex items-center justify-center sm:justify-start space-x-2 backdrop-blur-sm hover:bg-brand-maroon/10 rounded-lg text-sm sm:text-base"
          >
            <ExternalLink size={16} />
            <span>View Details</span>
          </button>
          <button 
            onClick={() => addToGoogleCalendar(event)}
            className="px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300 transform hover:scale-105 text-sm sm:text-base"
          >
            Download Calendar
          </button>
        </div>
      </div>
    </div>
  );
}
