'use client'

import React, { useState } from 'react';
import { Calendar, MapPin, Clock, CheckCircle, XCircle, HelpCircle } from 'lucide-react';

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
      <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
        <div className="text-center py-8">
          <Calendar size={48} className="text-brand-sand mx-auto mb-4 opacity-50" />
          <h3 className="text-xl font-semibold text-brand-gold mb-2">No Upcoming Events</h3>
          <p className="text-brand-sand">Check back later for new events!</p>
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

  return (
    <div className="bg-brand-charcoal p-6 rounded-xl2 shadow-card border border-brand-maroon">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-2xl font-bold text-brand-gold mb-2">{event.title}</h3>
          <div className="flex items-center space-x-4 text-brand-sand">
            <div className="flex items-center space-x-2">
              <Calendar size={16} />
              <span>{formatDate(event.start)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock size={16} />
              <span>{formatTime(event.start)}</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin size={16} />
              <span>{event.location}</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-sm font-medium bg-brand-maroon/20 ${getEventTypeColor(event.type)}`}>
          {getEventTypeLabel(event.type)}
        </span>
      </div>

      {/* RSVP Section */}
      <div className="border-t border-brand-maroon pt-4">
        <h4 className="text-lg font-semibold text-brand-gold mb-3">RSVP Status</h4>
        <div className="flex flex-wrap gap-3">
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
                  flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200
                  ${isSelected 
                    ? 'border-brand-gold bg-brand-gold/20 text-brand-gold' 
                    : 'border-brand-maroon text-brand-sand hover:border-brand-gold hover:text-brand-gold'
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
      <div className="flex justify-end space-x-3 mt-4 pt-4 border-t border-brand-maroon">
        <button className="px-4 py-2 text-brand-sand hover:text-brand-gold transition-colors">
          View Details
        </button>
        <button className="px-4 py-2 bg-gradient-to-tr from-accentFrom to-accentTo text-white rounded-lg hover:shadow-glow transition-all duration-300">
          Add to Calendar
        </button>
      </div>
    </div>
  );
}
